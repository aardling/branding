#!/usr/bin/env node
// Builds the Aardling brand guide PDF from the chapter fragments in scripts/guide/.
//
// The guide is eleven chapters. Each is rendered to its own PDF by Chrome and cached
// against a hash of the exact HTML that produced it, so a rebuild only re-renders the
// chapters whose input actually changed. pdf-lib merges the cached chapters back into
// one document. A chapter costs a second or two, so a full build is a handful of
// seconds and a one-chapter edit is about three. The imagery chapter carries almost
// all of the file's weight: Chrome rasterises the grain filters in the Bloom and
// Harvest gradients at print resolution.
//
// Output: aardling-brand-guide-v<version>.pdf at the package root.
//
//   npm run build:guide --workspace @aardling/brand-aardling
//
//   --status          say what is stale and why; render nothing
//   --check           as --status, but exit non-zero if anything is stale (prepublish)
//   --force           re-render every chapter
//   --section <id>    re-render one chapter, then merge
//   --monolithic      render the whole guide in one pass, the way this used to work
//   --out <path>      write the merged PDF somewhere else, and leave the manifest alone
//   --jobs <n>        chapters to render at once (default: 4)
//   KEEP_HTML=1       leave the expanded intermediate HTML in the temp directory
//
// Chrome does the printing. This is macOS-only by default; set CHROME to the binary
// on any other platform.

import {
  readFileSync,
  writeFileSync,
  unlinkSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
} from "node:fs";
import { spawn } from "node:child_process";
import { setTimeout } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve, basename } from "node:path";
import { tmpdir } from "node:os";
import { createHash } from "node:crypto";
import { PDFDocument } from "pdf-lib";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const GUIDE = join(here, "guide");
const CACHE = join(root, ".guide-cache");
const MANIFEST = join(GUIDE, "manifest.json");

// Bump when a change to this script alters what Chrome is asked to print. Every
// chapter then re-renders, because the cached PDFs no longer match this renderer.
const RENDERER = 1;

const CHROME =
  process.env.CHROME ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const MIME = {
  svg: "image/svg+xml",
  png: "image/png",
  webp: "image/webp",
  woff2: "font/woff2",
  ico: "image/x-icon",
};

// --- Arguments ---------------------------------------------------------------

const argv = process.argv.slice(2);
const flag = (name) => argv.includes(name);
const option = (name) => {
  const i = argv.indexOf(name);
  return i === -1 ? null : argv[i + 1];
};

const mode = flag("--check") ? "check" : flag("--status") ? "status" : "build";
const force = flag("--force");
const only = option("--section");
const monolithic = flag("--monolithic");
const outPath = option("--out");
const jobs = Math.max(1, Number(option("--jobs")) || 4);

const sha = (data) => createHash("sha256").update(data).digest("hex");

// --- Sources ------------------------------------------------------------------

const { version } = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));

const chapters = readdirSync(GUIDE)
  .filter((f) => /^\d\d-[a-z]+\.html$/.test(f))
  .sort()
  .map((file) => {
    const body = readFileSync(join(GUIDE, file), "utf8");
    return {
      id: file.replace(/^\d\d-|\.html$/g, ""),
      file,
      body,
      pages: (body.match(/<section class="page/g) || []).length,
    };
  });

if (!chapters.length) throw new Error(`No chapter fragments in ${GUIDE}`);

// Page counts come from the source, so every chapter's first folio — and the
// contents page's {{FOLIO:…}} references — are known before anything is rendered.
let folio = 1;
const folios = {};
for (const c of chapters) {
  c.folio = folio;
  folios[c.id] = folio;
  folio += c.pages;
}
const totalPages = folio - 1;

// --- Expansion ------------------------------------------------------------------
//
// {{VERSION}}          the package version, e.g. 0.7.0
// {{TEXT:path}}        the file's contents verbatim (CSS, SVG markup to inline)
// {{DATA:path}}        the file as a data: URI
// {{FOLIO:id}}         the page a chapter starts on
//
// Every referenced file is recorded, so a stale chapter can say which asset moved
// rather than only that something did.

const expand = (text, deps) =>
  text.replace(/\{\{(VERSION|TEXT|DATA|FOLIO)(?::([^}]+))?\}\}/g, (_, kind, ref) => {
    if (kind === "VERSION") return version;
    if (kind === "FOLIO") {
      if (!(ref in folios)) throw new Error(`{{FOLIO:${ref}}} names no chapter`);
      return String(folios[ref]);
    }
    const bytes = readFileSync(join(root, ref));
    if (deps) deps[ref] = sha(bytes);
    if (kind === "TEXT") return bytes.toString("utf8").trim();
    const mime = MIME[ref.split(".").pop()];
    if (!mime) throw new Error(`No MIME type known for ${ref}`);
    return `data:${mime};base64,${bytes.toString("base64")}`;
  });

const headDeps = {};
const head = expand(readFileSync(join(GUIDE, "head.html"), "utf8"), headDeps);
const headHash = sha(head);

// The fragments carry no doctype and no skeleton; this supplies both, and seeds the
// folio counter so a chapter printed on its own still numbers its pages correctly.
// The seed style comes after the head's own, so it wins the cascade.
const document_ = (bodies, startFolio) => `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"></head>
<body>
${head}
<style>body { counter-reset: folio ${startFolio - 1}; }</style>

<div class="sheet">
${bodies.join("\n")}
</div>
</body>
</html>
`;

for (const c of chapters) {
  c.deps = {};
  c.html = document_([expand(c.body, c.deps)], c.folio);
  c.hash = sha(`renderer:${RENDERER}\n${c.html}`);
  c.pdf = join(CACHE, `${c.id}.pdf`);
}

// --- Staleness --------------------------------------------------------------------

const manifest = existsSync(MANIFEST)
  ? JSON.parse(readFileSync(MANIFEST, "utf8"))
  : null;
const recorded = new Map((manifest?.chapters ?? []).map((c) => [c.id, c]));

// Why a chapter no longer matches what was rendered last time. Named causes beat
// "something changed" when the answer decides whether you sit through a re-render.
const reasons = (c) => {
  const was = recorded.get(c.id);
  if (!was) return ["not in the manifest"];
  if (was.hash === c.hash) return [];
  const why = [];
  if ((was.renderer ?? 0) !== RENDERER) why.push("the renderer changed");
  if (was.fragment !== sha(c.body)) why.push(c.file);
  if (was.head !== headHash) {
    const before = manifest.headDeps ?? {};
    const moved = [
      ...Object.keys(headDeps).filter((f) => before[f] !== headDeps[f]),
      ...Object.keys(before).filter((f) => !(f in headDeps)),
    ];
    why.push(...(moved.length ? moved : ["head.html"]));
  }
  for (const [path, hash] of Object.entries(c.deps)) {
    if (was.deps?.[path] !== hash) why.push(path);
  }
  for (const path of Object.keys(was.deps ?? {})) {
    if (!(path in c.deps)) why.push(`${path} (no longer used)`);
  }
  if (was.folio !== c.folio) why.push(`it moved to page ${c.folio}`);
  if (was.version !== version) why.push(`version ${was.version} → ${version}`);
  return why.length ? why : ["its rendered HTML changed"];
};

for (const c of chapters) {
  c.why = reasons(c);
  c.cached = existsSync(c.pdf);
  if (force) c.why = ["--force"];
  else if (only)
    c.why = c.id === only ? ["--section"] : c.cached ? [] : ["no cached PDF"];
  else if (!c.why.length && !c.cached) c.why = ["no cached PDF"];
  c.stale = c.why.length > 0;
}

if (only && !chapters.some((c) => c.id === only)) {
  throw new Error(
    `No chapter "${only}". Chapters: ${chapters.map((c) => c.id).join(", ")}`,
  );
}

const pdfName = `aardling-brand-guide-v${version}.pdf`;
const pdfPath = outPath ? resolve(outPath) : join(root, pdfName);

// --- status / check ------------------------------------------------------------------

if (mode === "status" || mode === "check") {
  const stale = chapters.filter((c) => c.stale);
  const problems = [];

  if (!manifest) problems.push("No manifest — the guide has never been built.");
  for (const c of stale) problems.push(`${c.id} — ${c.why.join(", ")}`);
  if (manifest && manifest.version !== version) {
    problems.push(`Manifest is v${manifest.version}, package is v${version}.`);
  }
  if (manifest && !existsSync(join(root, pdfName))) {
    problems.push(`${pdfName} is missing.`);
  } else if (manifest?.pdf && existsSync(join(root, pdfName))) {
    const actual = sha(readFileSync(join(root, pdfName)));
    if (actual !== manifest.pdf.sha256) {
      problems.push(`${pdfName} does not match the manifest.`);
    }
  }

  if (!problems.length) {
    console.log(`Brand guide is current: ${pdfName}, ${totalPages} pages.`);
    process.exit(0);
  }

  console.log("Brand guide is stale.");
  for (const p of problems) console.log(`  ${p}`);
  console.log("");
  console.log("  Run: npm run build:guide -w @aardling/brand-aardling");
  process.exit(mode === "check" ? 1 : 0);
}

// --- Rendering ----------------------------------------------------------------------

if (!existsSync(CHROME)) {
  throw new Error(`Chrome not found at ${CHROME}. Set CHROME to its path.`);
}
mkdirSync(CACHE, { recursive: true });

// Chrome gets a profile directory of its own, so a build never contends with — or
// writes into — the browser the user has open. The cost is that headless Chrome then
// prints the PDF in a couple of seconds and never exits. That happens with
// --headless=new and =old, with and without --virtual-time-budget, and with every
// first-run and background-service flag turned off; only the default profile exits
// cleanly, and using it is what made builds occasionally take minutes.
//
// So don't wait for Chrome. Wait for the PDF, and kill Chrome once it is complete.
// "Complete" is not a guess: a PDF is only parseable once its trailer and xref table
// are written, so a file that pdf-lib loads to the expected page count is finished.
const render = async (html, pdf, label, expectedPages) => {
  const slug = basename(pdf, ".pdf");
  const htmlPath = join(tmpdir(), `aardling-guide-${slug}.html`);
  const profile = join(tmpdir(), `aardling-guide-profile-${slug}`);
  writeFileSync(htmlPath, html);
  rmSync(pdf, { force: true });
  const started = Date.now();

  const chrome = spawn(
    CHROME,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      "--virtual-time-budget=10000",
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-background-networking",
      "--disable-component-update",
      "--disable-sync",
      "--disable-extensions",
      "--disable-default-apps",
      "--disable-crash-reporter",
      "--metrics-recording-only",
      "--mute-audio",
      `--user-data-dir=${profile}`,
      `--print-to-pdf=${pdf}`,
      `file://${htmlPath}`,
    ],
    { stdio: "ignore", detached: false },
  );

  let exited = null;
  chrome.on("exit", (code) => (exited = code ?? 0));

  // A PDF only parses once its trailer and xref are written, so this is a real
  // completion test rather than a guess about timing.
  const complete = async () => {
    if (!existsSync(pdf)) return false;
    try {
      const doc = await PDFDocument.load(readFileSync(pdf), { updateMetadata: false });
      return doc.getPageCount() === expectedPages;
    } catch {
      return false; // Still being written.
    }
  };

  try {
    for (;;) {
      if (await complete()) break;
      if (exited !== null) {
        // Chrome is gone, so the file is final. One last look, then give up.
        if (await complete()) break;
        throw new Error(
          `Chrome exited (${exited}) without writing ${expectedPages} pages for ${label}.`,
        );
      }
      if (Date.now() - started > 120_000) {
        throw new Error(`Timed out after 120s rendering ${label}.`);
      }
      await setTimeout(150);
    }
  } finally {
    if (exited === null) chrome.kill("SIGKILL");
    if (!process.env.KEEP_HTML) unlinkSync(htmlPath);
    rmSync(profile, { recursive: true, force: true });
  }

  const seconds = ((Date.now() - started) / 1000).toFixed(1);
  console.log(`  ${label.padEnd(12)} ${seconds}s`);
};

if (monolithic) {
  console.log(`Rendering all ${totalPages} pages in one pass…`);
  const html = document_(
    chapters.map((c) => expand(c.body, null)),
    1,
  );
  await render(html, pdfPath, "whole guide", totalPages);
  console.log(`Wrote ${pdfPath}`);
  process.exit(0);
}

const stale = chapters.filter((c) => c.stale);

// Merging is not free of consequence: pdf-lib stamps a new modification date, so a
// re-merge of unchanged chapters produces different bytes and leaves a 14 MB binary
// dirty in git for nothing. If the committed PDF already matches the manifest, stop.
if (!stale.length && !outPath) {
  const current =
    manifest?.pdf?.sha256 &&
    manifest.version === version &&
    existsSync(pdfPath) &&
    sha(readFileSync(pdfPath)) === manifest.pdf.sha256;
  if (current) {
    console.log(`Brand guide is already current: ${pdfName}, ${totalPages} pages.`);
    process.exit(0);
  }
}

if (!stale.length) {
  console.log(`Every chapter is current; merging ${chapters.length} cached chapters.`);
} else {
  console.log(`Rendering ${stale.length} of ${chapters.length} chapters:`);
  for (const c of stale) console.log(`  ${c.id} — ${c.why.join(", ")}`);
}

const queue = [...stale];
await Promise.all(
  Array.from({ length: Math.min(jobs, queue.length) }, async () => {
    for (let c = queue.shift(); c; c = queue.shift()) {
      await render(c.html, c.pdf, c.id, c.pages);
    }
  }),
);

// --- Merge ----------------------------------------------------------------------------

const merged = await PDFDocument.create();
for (const c of chapters) {
  const part = await PDFDocument.load(readFileSync(c.pdf));
  if (part.getPageCount() !== c.pages) {
    throw new Error(
      `${c.id} rendered ${part.getPageCount()} pages, expected ${c.pages}. ` +
        `The fragment's content no longer fits its pages.`,
    );
  }
  const pages = await merged.copyPages(part, part.getPageIndices());
  for (const p of pages) merged.addPage(p);
}

merged.setTitle(`Aardling brand guide v${version}`);
merged.setAuthor("Aardling");
merged.setSubject("Brand guidelines, tokens and assets for the Aardling brand.");
merged.setProducer("@aardling/brand-aardling");

const bytes = Buffer.from(await merged.save());
writeFileSync(pdfPath, bytes);

if (merged.getPageCount() !== totalPages) {
  throw new Error(`Merged ${merged.getPageCount()} pages, expected ${totalPages}.`);
}

// A verification build writes somewhere else and must not touch the manifest, the
// cached record of what the committed PDF was built from.
if (outPath) {
  console.log(`Wrote ${pdfPath} (${totalPages} pages) — manifest left alone.`);
  process.exit(0);
}

// Only one guide is tracked at a time; a version bump renames rather than accumulates.
for (const f of readdirSync(root)) {
  if (/^aardling-brand-guide-v.*\.pdf$/.test(f) && f !== pdfName) {
    unlinkSync(join(root, f));
    console.log(`Removed ${f}`);
  }
}

writeFileSync(
  MANIFEST,
  JSON.stringify(
    {
      renderer: RENDERER,
      version,
      pages: totalPages,
      headDeps,
      chapters: chapters.map((c) => ({
        id: c.id,
        file: c.file,
        folio: c.folio,
        pages: c.pages,
        renderer: RENDERER,
        version,
        hash: c.hash,
        fragment: sha(c.body),
        head: headHash,
        deps: c.deps,
      })),
      pdf: { file: pdfName, bytes: bytes.length, sha256: sha(bytes) },
    },
    null,
    2,
  ) + "\n",
);

const mb = (bytes.length / 1e6).toFixed(1);
console.log(`Wrote ${pdfPath} — ${totalPages} pages, ${mb} MB.`);
