#!/usr/bin/env node
/**
 * WaspCode — 3-D ASCII banner
 *
 * Three composited layers produce the 3-D effect:
 *   1. Shadow   – solid █ blocks, offset (+5 col, +3 row), near-black
 *   2. Depth    – four solid-block slices fading dark-amber → mid-amber, (+4→+1)
 *   3. Front    – original box-drawing art, per-row gradient gold → orange
 *
 * Usage:
 *   npx tsx banner.ts
 *   node --loader ts-node/esm banner.ts
 *   tsc banner.ts && node banner.js
 */

// ── ANSI helpers ──────────────────────────────────────────────────────────────
const E     = '\x1b';
const RESET = `${E}[0m`;
const BOLD  = `${E}[1m`;
const DIM   = `${E}[2m`;
const rgb   = (r: number, g: number, b: number) => `${E}[38;2;${r};${g};${b}m`;
const bgRgb = (r: number, g: number, b: number) => `${E}[48;2;${r};${g};${b}m`;
const move  = (row: number, col: number) => `${E}[${row};${col}H`;

// ── "WASPCODE" in FIGlet ANSI-Shadow style ────────────────────────────────────
//
//  W      A      S      P         C      O      D      E
//
const ART = [
  '██╗    ██╗ █████╗ ███████╗██████╗      ██████╗ ██████╗ ██████╗ ███████╗',
  '██║    ██║██╔══██╗██╔════╝██╔══██╗    ██╔════╝██╔═══██╗██╔══██╗██╔════╝',
  '██║ █╗ ██║███████║███████╗██████╔╝    ██║     ██║   ██║██║  ██║█████╗  ',
  '██║███╗██║██╔══██║╚════██║██╔═══╝     ██║     ██║   ██║██║  ██║██╔══╝  ',
  '╚███╔███╔╝██║  ██║███████║██║         ╚██████╗╚██████╔╝██████╔╝███████╗',
  ' ╚══╝╚══╝ ╚═╝  ╚═╝╚══════╝╚═╝          ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝',
];

// ── Cell type ─────────────────────────────────────────────────────────────────
interface Cell { char: string; r: number; g: number; b: number }

// ── Grid setup ────────────────────────────────────────────────────────────────
const SHADOW_COL = 5;   // column offset for shadow layer
const SHADOW_ROW = 3;   // row    offset for shadow layer
const DEPTH      = 4;   // number of depth extrusion slices

const artRows = ART.length;
// Use string spread to count codepoints correctly (box-drawing = 1 each)
const artCols = Math.max(...ART.map(l => [...l].length));

const GRID_ROWS = artRows + SHADOW_ROW + 2;
const GRID_COLS = artCols + SHADOW_COL + 2;

const grid: (Cell | null)[][] = Array.from(
  { length: GRID_ROWS },
  () => new Array<Cell | null>(GRID_COLS).fill(null),
);

/** Place a layer onto the grid. Later calls overwrite earlier ones. */
function place(
  lines:   string[],
  rowOff:  number,
  colOff:  number,
  colorFn: (row: number, artWidth: number) => [number, number, number],
  solid:   boolean,
): void {
  for (let r = 0; r < lines.length; r++) {
    const chars = [...lines[r]];              // proper codepoint iteration
    for (let c = 0; c < chars.length; c++) {
      if (chars[c] === ' ') continue;         // keep empty cells transparent
      const [rv, gv, bv] = colorFn(r, chars.length);
      grid[r + rowOff][c + colOff] = {
        char: solid ? '█' : chars[c],
        r: rv, g: gv, b: bv,
      };
    }
  }
}

// ── Layer 1: Shadow ───────────────────────────────────────────────────────────
// Very dark, hard-edged silhouette to simulate light from top-left.
place(ART, SHADOW_ROW, SHADOW_COL,
  () => [10, 7, 2],
  true,
);

// ── Layer 2: 3-D depth extrusion (4 slices, far → near) ──────────────────────
// Each slice is a solid-block copy shifted one cell closer to the front.
// Colour ramps from dark-brown (back) to mid-amber (just behind front).
for (let d = DEPTH; d >= 1; d--) {
  const t = (DEPTH - d) / DEPTH;             // 0 = farthest back, 1 = closest to front
  const dr = Math.round(60  + t * 80);       // 60  → 140
  const dg = Math.round(25  + t * 35);       // 25  → 60
  const db = 0;
  place(ART, d, d, () => [dr, dg, db], true);
}

// ── Layer 3: Front face ───────────────────────────────────────────────────────
// Box-drawing art with a per-row gradient:
//   row 0 → bright warm-white  [255, 240, 160]
//   row N → deep vivid-orange  [255,  95,   0]
place(ART, 0, 0,
  (row) => {
    const t  = row / Math.max(1, artRows - 1); // 0 → 1
    const rv = 255;
    const gv = Math.round(240 - t * 145);       // 240 → 95
    const bv = Math.round(160 - t * 160);       // 160 → 0
    return [rv, gv, bv];
  },
  false,
);

// ── Render grid to a string ───────────────────────────────────────────────────
function renderGrid(): string {
  const out: string[] = [];
  for (let r = 0; r < GRID_ROWS; r++) {
    let line = '';
    let prev = '';
    for (let c = 0; c < GRID_COLS; c++) {
      const cell = grid[r][c];
      if (!cell) {
        if (prev !== '') { line += RESET; prev = ''; }
        line += ' ';
      } else {
        const code = rgb(cell.r, cell.g, cell.b);
        if (code !== prev) { line += code; prev = code; }
        line += cell.char;
      }
    }
    out.push(line + RESET);
  }
  return out.join('\n');
}

// ── Decorative chrome ─────────────────────────────────────────────────────────
const TOTAL_WIDTH = GRID_COLS + 2;           // +2 for the side padding

/** A horizontal rule built from box-drawing characters. */
function rule(
  leftChar:   string,
  fillChar:   string,
  rightChar:  string,
  width:      number,
  color:      [number, number, number],
): string {
  return (
    rgb(...color) +
    leftChar +
    fillChar.repeat(width - 2) +
    rightChar +
    RESET
  );
}

const rulerColor:  [number, number, number] = [80,  55,  10];
const accentColor: [number, number, number] = [220, 160,  0];
const dimColor:    [number, number, number] = [90,  80,  60];

const topRule    = rule('╔', '═', '╗', TOTAL_WIDTH, rulerColor);
const midRule    = rule('╠', '─', '╣', TOTAL_WIDTH, rulerColor);
const bottomRule = rule('╚', '═', '╝', TOTAL_WIDTH, rulerColor);
const sideL      = rgb(...rulerColor) + '║' + RESET + ' ';
const sideR      = ' ' + rgb(...rulerColor) + '║' + RESET;

/** Pad a string to exactly `width` visible chars (codepoints, not bytes). */
function padLine(content: string, visibleLen: number, width: number): string {
  const pad = width - visibleLen - 2;       // -2 for the side borders' spaces
  return sideL + content + ' '.repeat(Math.max(0, pad)) + sideR;
}

// ── Tagline ───────────────────────────────────────────────────────────────────
const TAG_LABEL  = '  ⚡ ';
const TAG_TEXT   = 'The AI-powered CLI for developers who ship fast';
const TAG_SUFFIX = '  ';
const tagLine    =
  rgb(...accentColor) + BOLD + TAG_LABEL + RESET +
  rgb(200, 180, 120) + TAG_TEXT + RESET +
  TAG_SUFFIX;
const tagVisible = [...TAG_LABEL].length + [...TAG_TEXT].length + [...TAG_SUFFIX].length;

// ── Version badge ─────────────────────────────────────────────────────────────
const VER      = 'v0.1.0';
const verLeft  = rgb(40, 40, 40) + bgRgb(220, 160, 0) + BOLD + ' WaspCode ' + RESET;
const verRight = rgb(220, 160, 0) + bgRgb(30, 20, 5) + ` ${VER} ` + RESET;
const verLine  = verLeft + verRight;
const verVisible = ' WaspCode '.length + ` ${VER} `.length;

// ── Assemble output ───────────────────────────────────────────────────────────
function buildBanner(): string {
  const gridStr  = renderGrid();
  const gridLines = gridStr.split('\n');

  // Wrap each art line in the side borders
  const framedArt = gridLines.map(line => {
    const visLen = GRID_COLS;               // grid is always GRID_COLS wide
    return padLine(line, visLen, TOTAL_WIDTH);
  });

  const emptyRow  = padLine('', 0, TOTAL_WIDTH);

  const lines: string[] = [
    '',
    ' ' + topRule,
    ' ' + emptyRow,
    ...framedArt.map(l => ' ' + l),
    ' ' + emptyRow,
    ' ' + midRule,
    ' ' + padLine(tagLine, tagVisible, TOTAL_WIDTH),
    ' ' + padLine(verLine, verVisible, TOTAL_WIDTH),
    ' ' + emptyRow,
    ' ' + bottomRule,
    '',
  ];

  return lines.join('\n');
}

// ── Entry point ───────────────────────────────────────────────────────────────
process.stdout.write(buildBanner() + '\n');
