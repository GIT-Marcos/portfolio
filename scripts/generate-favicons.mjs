import { readFile } from 'node:fs/promises';
import sharp from 'sharp';

const svg = await readFile('public/favicon.svg');
const sizes = [
  ['public/favicon-16x16.png', 16],
  ['public/favicon-32x32.png', 32],
  ['public/apple-touch-icon.png', 180],
];

for (const [out, size] of sizes) {
  await sharp(svg).resize(size, size).png().toFile(out);
  console.log(`Generado: ${out} (${size}x${size})`);
}