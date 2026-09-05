#!/usr/bin/env node
// Builds the Aardling brand guide PDF from scripts/brand-guide.html.
//
// The template carries the prose and the layout; this script fills in the version
// from package.json and inlines every asset as a data URI, so the resulting HTML is
// self-contained and Chrome can print it without file:// access to neighbouring files.
//
// Output: aardling-brand-guide-v<version>.pdf at the package root.
//
//   npm run build:guide --workspace @aardling/aardling
//
// Chrome does the printing. This is macOS-only by default; set CHROME to the binary
// on any other platform.

import { readFileSync, writeFileSync, unlinkSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

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

const { version } = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));

const dataUri = (rel) => {
  const ext = rel.split(".").pop();
  const mime = MIME[ext];
  if (!mime) throw new Error(`No MIME type known for ${rel}`);
  const bytes = readFileSync(join(root, rel));
  return `data:${mime};base64,${bytes.toString("base64")}`;
};

// {{VERSION}}          the package version, e.g. 0.5.0
// {{TEXT:path}}        the file's contents verbatim (CSS, SVG markup to inline)
// {{DATA:path}}        the file as a data: URI
const template = readFileSync(join(here, "brand-guide.html"), "utf8");
const body = template.replace(
  /\{\{(VERSION|TEXT|DATA)(?::([^}]+))?\}\}/g,
  (_, kind, rel) => {
    if (kind === "VERSION") return version;
    if (kind === "TEXT") return readFileSync(join(root, rel), "utf8").trim();
    return dataUri(rel);
  },
);

// The template is a fragment — no doctype, no head — so it can also be published
// as-is by anything that supplies its own document skeleton.
const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"></head>
<body>
${body}
</body>
</html>
`;

// The intermediate lives in the temp directory, so an interrupted build leaves
// nothing behind in the package.
const htmlPath = join(tmpdir(), `aardling-brand-guide-v${version}.html`);
const pdfPath = join(root, `aardling-brand-guide-v${version}.pdf`);
writeFileSync(htmlPath, html);

if (!existsSync(CHROME)) {
  throw new Error(`Chrome not found at ${CHROME}. Set CHROME to its path.`);
}

try {
  execFileSync(
    CHROME,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      "--virtual-time-budget=10000",
      `--print-to-pdf=${pdfPath}`,
      `file://${htmlPath}`,
    ],
    { stdio: ["ignore", "ignore", "inherit"] },
  );
} finally {
  if (!process.env.KEEP_HTML) unlinkSync(htmlPath);
}

console.log(`Wrote ${pdfPath}`);
