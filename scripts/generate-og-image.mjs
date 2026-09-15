import { readFile } from 'node:fs/promises';
import sharp from 'sharp';

const input = 'public/apple-touch-icon.png';
const output = 'public/og-image.jpg';
const WIDTH = 1200;
const HEIGHT = 630;
const BG_COLOR = '#0a0e0a';

const iconBuffer = await readFile(input);

const iconMetadata = await sharp(iconBuffer).metadata();

await sharp({
  create: {
    width: WIDTH,
    height: HEIGHT,
    channels: 4,
    background: BG_COLOR,
  },
})
  .composite([{
    input: iconBuffer,
    gravity: 'center',
    blend: 'over',
  }])
  .jpeg({ quality: 90 })
  .toFile(output);

console.log(`Generado: ${output} (${WIDTH}x${HEIGHT}) desde ${input} (${iconMetadata.width}x${iconMetadata.height})`);
