#!/usr/bin/env node
// Builds the Aardling brand guide PDF from the chapter fragments in scripts/guide/.
//
// The guide is one document. Every chapter is expanded into a single HTML page and Chrome
// prints it in one pass, so an <a href="#colour"> on the contents page is a real link in
// the PDF — an anchor only resolves inside the document that holds it. The whole guide
// renders in about two seconds.
//
// It used to be rendered a chapter at a time, cached, and merged with pdf-lib. That made a
// cross-chapter link impossible, and it was not faster: a full per-chapter build took 6.8s
// against 2.2s for one pass, because the parallel Chrome processes cost more than the cache
// saved, and head.html — which every chapter depends on — invalidated all of them at once.
//
// Output: aardling-brand-guide-v<version>.pdf at the package root.
//
//   npm run build:guide --workspace @aardling/brand-aardling
//
//   --status          say what is stale and why; render nothing
//   --check           as --status, but exit non-zero if anything is stale (prepublish)
//   --force           render even when the guide is already current
//   --out <path>      write the PDF somewhere else, and leave the manifest alone
//   KEEP_HTML=1       leave the expanded intermediate HTML in the temp directory
//
// Chrome does the printing. This is macOS-only by default; set CHROME to the binary
// on any other platform.

import {
  readFileSync,
  writeFileSync,
  unlinkSync,
  existsSync,
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
const MANIFEST = join(GUIDE, "manifest.json");

// Bump when a change to this script alters what Chrome is asked to print, so a guide built
// by the previous renderer reports itself stale. 3: one document instead of merged chapters.
const RENDERER = 3;

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

for (const gone of ["--section", "--jobs", "--monolithic"]) {
  if (flag(gone)) {
    throw new Error(`${gone} no longer exists: the guide is always rendered in one pass.`);
  }
}

const mode = flag("--check") ? "check" : flag("--status") ? "status" : "build";
const force = flag("--force");
const outPath = option("--out");

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

// Every chapter opens on a page that carries its id, so the contents page — or any other
// page — can link to it with href="#<id>". The id is written in the fragment where a reader
// can see it, and checked here so a renamed file cannot quietly orphan its links.
for (const c of chapters) {
  const first = c.body.match(/<section class="page[^"]*"[^>]*>/)?.[0] ?? "";
  if (!first.includes(`id="${c.id}"`)) {
    throw new Error(`${c.file}: its first <section> needs id="${c.id}" (found ${first || "no section"}).`);
  }
}
for (const [, target] of chapters.flatMap((c) => [...c.body.matchAll(/href="#([^"]+)"/g)])) {
  if (!chapters.some((c) => c.id === target)) {
    throw new Error(`A link points at #${target}, and no chapter has that id.`);
  }
}

const headDeps = {};
const head = expand(readFileSync(join(GUIDE, "head.html"), "utf8"), headDeps);
const headHash = sha(head);

for (const c of chapters) {
  c.deps = {};
  c.expanded = expand(c.body, c.deps);
}

// The fragments carry no doctype and no skeleton; this supplies both. The folio counter
// starts at the cover and runs through every page.
const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"></head>
<body>
${head}
<div class="sheet">
${chapters.map((c) => c.expanded).join("\n")}
</div>
</body>
</html>
`;
const hash = sha(`renderer:${RENDERER}\n${html}`);

// --- Staleness --------------------------------------------------------------------

const manifest = existsSync(MANIFEST)
  ? JSON.parse(readFileSync(MANIFEST, "utf8"))
  : null;
const recorded = new Map((manifest?.chapters ?? []).map((c) => [c.id, c]));

// One render, but still reported per chapter: "web — 12-web.html, it moved to page 35"
// says what changed; "the guide changed" does not.
const reasons = (c) => {
  const was = recorded.get(c.id);
  if (!was) return ["not in the manifest"];
  const why = [];
  if (was.fragment !== sha(c.body)) why.push(c.file);
  for (const [path, h] of Object.entries(c.deps)) {
    if (was.deps?.[path] !== h) why.push(path);
  }
  for (const path of Object.keys(was.deps ?? {})) {
    if (!(path in c.deps)) why.push(`${path} (no longer used)`);
  }
  if (was.folio !== c.folio) why.push(`it moved to page ${c.folio}`);
  return why;
};

const problems = [];
if (!manifest) problems.push("No manifest — the guide has never been built.");
else {
  if ((manifest.renderer ?? 0) !== RENDERER) problems.push("The renderer changed.");
  if (manifest.version !== version) {
    problems.push(`Manifest is v${manifest.version}, package is v${version}.`);
  }
  if (manifest.head !== headHash) {
    const before = manifest.headDeps ?? {};
    const moved = [
      ...Object.keys(headDeps).filter((f) => before[f] !== headDeps[f]),
      ...Object.keys(before).filter((f) => !(f in headDeps)),
    ];
    problems.push(`head.html${moved.length ? ` — ${moved.join(", ")}` : ""} changed; every chapter uses it.`);
  }
  for (const c of chapters) {
    const why = reasons(c);
    if (why.length) problems.push(`${c.id} — ${why.join(", ")}`);
  }
  for (const id of recorded.keys()) {
    if (!chapters.some((c) => c.id === id)) problems.push(`${id} — no longer a chapter`);
  }
  // Anything the named causes miss — a renderer-irrelevant edit that still changes the
  // printed HTML — is caught by the document hash.
  if (!problems.length && manifest.hash !== hash) problems.push("The rendered HTML changed.");
}

const pdfName = `aardling-brand-guide-v${version}.pdf`;
const pdfPath = outPath ? resolve(outPath) : join(root, pdfName);
const committed = join(root, pdfName);

if (manifest && !existsSync(committed)) {
  problems.push(`${pdfName} is missing.`);
} else if (manifest?.pdf && sha(readFileSync(committed)) !== manifest.pdf.sha256) {
  problems.push(`${pdfName} does not match the manifest.`);
}

// --- status / check ------------------------------------------------------------------

if (mode === "status" || mode === "check") {
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

// Rebuilding a current guide is not free of consequence: the PDF carries a creation date,
// so identical input produces different bytes and leaves a 14 MB binary dirty in git.
if (!problems.length && !force && !outPath) {
  console.log(`Brand guide is already current: ${pdfName}, ${totalPages} pages.`);
  process.exit(0);
}

// --- Rendering ----------------------------------------------------------------------

if (!existsSync(CHROME)) {
  throw new Error(`Chrome not found at ${CHROME}. Set CHROME to its path.`);
}

// The per-chapter cache this script used to keep. Nothing reads it any more.
rmSync(join(root, ".guide-cache"), { recursive: true, force: true });

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
      // Chrome's PDF backend rasterises box-shadow blur poorly at 1x — visible
      // banding rather than a smooth blur. 2x fixes it; the file size cost is
      // negligible even for the grain-heavy imagery chapter.
      "--force-device-scale-factor=2",
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

console.log(`Rendering ${totalPages} pages in one pass…`);
if (problems.length) for (const p of problems) console.log(`  ${p}`);
await render(html, pdfPath, "whole guide", totalPages);

// Metadata is set on Chrome's own file. Loading and saving one document keeps its link
// annotations; copying its pages into a new document would drop them.
const pdf = await PDFDocument.load(readFileSync(pdfPath));
pdf.setTitle(`Aardling brand guide v${version}`);
pdf.setAuthor("Aardling");
pdf.setSubject("Brand guidelines, tokens and assets for the Aardling brand.");
pdf.setProducer("@aardling/brand-aardling");
const bytes = Buffer.from(await pdf.save());
writeFileSync(pdfPath, bytes);

// A verification build writes somewhere else and must not touch the manifest, the
// record of what the committed PDF was built from.
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

// Folios and page counts stay per chapter: /release takes the notes' page ranges from here.
writeFileSync(
  MANIFEST,
  JSON.stringify(
    {
      renderer: RENDERER,
      version,
      pages: totalPages,
      hash,
      head: headHash,
      headDeps,
      chapters: chapters.map((c) => ({
        id: c.id,
        file: c.file,
        folio: c.folio,
        pages: c.pages,
        fragment: sha(c.body),
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
