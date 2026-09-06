/**
 * Generate the Aardling logo lockups.
 *
 * A lockup is the mark, its ground and its clear space flattened into one file,
 * for the places that cannot supply a ground or set `color`: an avatar upload,
 * a slide master, a print file, a partner's logo pack.
 *
 * The two masters in assets/logos/ stay the only place the outline lives. Every
 * file this writes is build output — never edit one by hand, edit this and re-run.
 *
 *   node scripts/build-lockups.mjs
 *
 * Deterministic: the same inputs always produce byte-identical output.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, unlinkSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const BRAND = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(BRAND, "assets/logos/lockups");

const colour = JSON.parse(readFileSync(join(BRAND, "tokens/tokens.json"), "utf8")).colour;

/** Clear space on all four sides, in mark units.
 *  The height of the icon logo — see guidelines/logos.md. The icon appears inside
 *  the logotype at 1:1, ink height 106.25, so one number serves both marks. */
const CLEAR = 106;

const readPaths = (file) =>
  [...readFileSync(join(BRAND, "assets/logos", file), "utf8")
    .matchAll(/<path d="(.*?)"/gs)].map((m) => m[1]);

const MARKS = {
  logotype: { paths: readPaths("aardling-logotype.svg"), w: 623, h: 131 },
  icon: { paths: readPaths("aardling-icon.svg"), w: 167, h: 107 },
};

/** Logotype keeps the mark's proportions; the icon canvas is squared, so one
 *  file serves an avatar upload without recropping. Squaring only adds air. */
const canvas = (mark) => {
  const { w, h } = MARKS[mark];
  return mark === "logotype" ? [w + 2 * CLEAR, h + 2 * CLEAR] : [w + 2 * CLEAR, w + 2 * CLEAR];
};

/** The gradient artwork, verbatim, with its own grain filter and ids. It is
 *  never recoloured or re-authored — a nested slice viewport crops it. */
const gradientInner = (name) => {
  const s = readFileSync(join(BRAND, "assets/images", `${name}.svg`), "utf8");
  return s.slice(s.indexOf(">", s.indexOf("<svg")) + 1, s.lastIndexOf("</svg>")).trim();
};

const markGroup = (mark, fill) => {
  const m = MARKS[mark];
  const [W, H] = canvas(mark);
  const paths = m.paths.map((d) => `\n    <path d="${d}" fill="${fill}"/>`).join("");
  return `  <g transform="translate(${(W - m.w) / 2} ${(H - m.h) / 2})">${paths}\n  </g>`;
};

const open = (W, H) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" ` +
  `height="${H}" role="img" aria-label="Aardling">`;

const solid = (mark, fg, bg) => {
  const [W, H] = canvas(mark);
  return `${open(W, H)}\n  <rect width="${W}" height="${H}" fill="${colour[bg]}"/>\n` +
    `${markGroup(mark, colour[fg])}\n</svg>\n`;
};

const gradient = (mark, fg, grad) => {
  const [W, H] = canvas(mark);
  return `${open(W, H)}\n  <svg x="0" y="0" width="${W}" height="${H}" ` +
    `viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">\n` +
    `${gradientInner(grad)}\n  </svg>\n${markGroup(mark, colour[fg])}\n</svg>\n`;
};

/* The approved pairs that carry a mark. guidelines/colour.md is the allowlist;
   guidelines/logos.md says which of those pairs a mark may be drawn in. */
const SOLID = [
  ["night-blue", "snow-white"],
  ["night-blue", "white"],
  ["snow-white", "night-blue"],
  ["night-blue", "lime-green"],
  ["night-blue", "yellow"],
  ["night-blue", "pink"],
  ["night-blue", "violet"],
];

/* Ocean Blue is a details colour. It needs a 24px cap height, which the icon
   logo never reaches, so it is drawn on the logotype only. */
const SOLID_LOGOTYPE_ONLY = [
  ["ocean-blue", "white"],
  ["ocean-blue", "snow-white"],
];

/* Knockout colour measured per gradient under the mark's own ink, not inherited. */
const GRADIENT = [
  ["white", "gradient-vesper"],
  ["white", "gradient-understory"],
  ["night-blue", "gradient-bloom"],
  ["night-blue", "gradient-harvest"],
];

mkdirSync(OUT, { recursive: true });
for (const f of readdirSync(OUT)) if (f.endsWith(".svg")) unlinkSync(join(OUT, f));

const written = [];
const emit = (name, body) => {
  writeFileSync(join(OUT, name), body);
  written.push(name);
};

for (const mark of ["logotype", "icon"]) {
  const pairs = mark === "logotype" ? [...SOLID, ...SOLID_LOGOTYPE_ONLY] : SOLID;
  for (const [fg, bg] of pairs) emit(`aardling-${mark}-${fg}-on-${bg}.svg`, solid(mark, fg, bg));
  for (const [fg, g] of GRADIENT) emit(`aardling-${mark}-${fg}-on-${g}.svg`, gradient(mark, fg, g));
}

console.log(`${written.length} lockups written to assets/logos/lockups/`);
for (const n of written.sort()) console.log(`  ${n}`);
