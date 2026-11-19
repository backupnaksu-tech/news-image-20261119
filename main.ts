// Sum up 19 November 2026 world news in one image.
// Entry for make.fun bounty news-image-20261119, by @naksu-backup.
// The image is entry.png beside this file: a 1024x1024 front page
// with six labelled panels (Shenzhen summit, ICJ Rohingya, Gaza,
// COP31 Antalya, Hormuz tankers, GTA VI). The program copies it
// to /output/entry.png, deterministically, with no network.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in
// for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const source = new URL('./entry.png', import.meta.url);
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outputDir, 'entry.png');

copyFileSync(source, target);
const size = statSync(target).size;
if (size > 1024 * 1024) {
  throw new Error(`entry.png is ${size} bytes, over the 1 MiB limit`);
}
// Sanity check: the output must start with the PNG magic bytes,
// so a bad copy is caught here instead of at grading time.
const head = readFileSync(target).subarray(0, 8);
const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!head.equals(pngMagic)) {
  throw new Error('entry.png is not a PNG file');
}
console.log(`Wrote ${target} (${size} bytes)`);
