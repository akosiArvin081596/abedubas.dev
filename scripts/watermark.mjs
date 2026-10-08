#!/usr/bin/env node
// Bakes the site's watermark into a photo: a faint diagonal "abedubas.dev"
// pattern across the whole image, so it can't be cropped out, plus a
// "© abedubas.dev" credit in the top right corner (clear of the slideshow's
// caption bar at the bottom).
//
// Usage: npm run watermark -- <clean.jpg> <out.jpg>
// Crop the photo to 4:5 first, keep the clean original out of the repo, and
// commit only the watermarked copy (public/images/hero/).

import sharp from "sharp";

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error("Usage: npm run watermark -- <clean.jpg> <out.jpg>");
  process.exit(1);
}

const FONT = "Helvetica Neue, Helvetica, Arial, sans-serif";

const { width, height } = await sharp(input).metadata();

// The pattern: rows of the domain, every other row offset by half a step,
// over an area large enough to cover the image once rotated.
const size = Math.round(width * 0.034);
const stepX = Math.round(size * 9.5);
const stepY = Math.round(size * 5.2);
const words = [];
for (let y = -height, row = 0; y < height * 2; y += stepY, row++) {
  const offset = (row % 2) * (stepX / 2);
  for (let x = -width; x < width * 2; x += stepX) {
    words.push(`<text x="${x + offset}" y="${y}">abedubas.dev</text>`);
  }
}

// White text with a faint dark outline, so it shows on light and dark areas.
const credit = Math.round(width * 0.032);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <g transform="rotate(-28 ${width / 2} ${height / 2})" font-family="${FONT}" font-size="${size}" font-weight="600" letter-spacing="1"
     fill="#ffffff" fill-opacity="0.17" stroke="#0b1120" stroke-opacity="0.16" stroke-width="${Math.max(1, size / 18)}">
    ${words.join("")}
  </g>
  <text x="${width - credit * 0.8}" y="${credit * 1.7}" text-anchor="end" font-family="${FONT}" font-size="${credit}" font-weight="700"
     fill="#ffffff" fill-opacity="0.85" stroke="#0b1120" stroke-opacity="0.35" stroke-width="${Math.max(1, credit / 14)}" paint-order="stroke">© abedubas.dev</text>
</svg>`;

await sharp(input)
  .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(output);

console.log(`Watermarked ${input} → ${output} (${width}×${height})`);
