/**
 * Логотип с чёрной подложки -> PNG с прозрачным фоном.
 *
 *   npm run logo
 *
 * Лого нарисован светлыми элементами на чистом чёрном, то есть уже лежит
 * «премультиплицированным» на чёрный: alpha = яркость, цвет = pixel / alpha.
 * Так знак остаётся зелёно-белым на любой поверхности, без чёрного квадрата.
 *
 * Режет исходник на два ассета:
 *   logo-full.png — весь лок-ап (знак + COMFORT + AUTO RENT)
 *   logo-mark.png — только знак, для 64px-навбара
 */

import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "raw-photos", "Снимок экрана 2026-08-19 164752.png");
const OUT = path.join(ROOT, "public", "brand");

/** Пиксель темнее этого порога считаем фоном. */
const FLOOR = 14;

async function unpremultiply(input) {
  const { data, info } = await sharp(input)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.alloc(width * height * 4);

  for (let p = 0; p < width * height; p++) {
    const i = p * channels;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const a = Math.max(r, g, b);
    const o = p * 4;
    if (a <= FLOOR) {
      out[o] = out[o + 1] = out[o + 2] = out[o + 3] = 0;
      continue;
    }
    const k = 255 / a;
    out[o] = Math.min(255, Math.round(r * k));
    out[o + 1] = Math.min(255, Math.round(g * k));
    out[o + 2] = Math.min(255, Math.round(b * k));
    out[o + 3] = a;
  }

  return { raw: out, width, height };
}

/** Горизонтальные полосы контента, разделённые пустыми строками. */
function findBands({ raw, width, height }, minGap = 10) {
  const filled = [];
  for (let y = 0; y < height; y++) {
    let count = 0;
    for (let x = 0; x < width; x++) {
      if (raw[(y * width + x) * 4 + 3] > 24) count++;
    }
    filled.push(count > width * 0.01);
  }

  const bands = [];
  let start = -1, gap = 0;
  for (let y = 0; y <= height; y++) {
    if (y < height && filled[y]) {
      if (start < 0) start = y;
      gap = 0;
    } else if (start >= 0) {
      gap++;
      if (gap >= minGap || y === height) {
        bands.push({ top: start, bottom: y - gap + 1 });
        start = -1;
        gap = 0;
      }
    }
  }
  return bands;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const img = await unpremultiply(SRC);
  const { raw, width, height } = img;
  const base = { raw: { width, height, channels: 4 } };

  await sharp(raw, base)
    .trim({ threshold: 8 })
    .resize({ width: 1200, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, "logo-full.png"));

  const bands = findBands(img);
  console.log("полосы контента:", bands.map((b) => `${b.top}..${b.bottom}`).join("  "));

  const mark = bands[0];
  if (mark) {
    await sharp(raw, base)
      .extract({ left: 0, top: mark.top, width, height: mark.bottom - mark.top })
      .trim({ threshold: 8 })
      .resize({ width: 512, withoutEnlargement: true })
      .png({ compressionLevel: 9 })
      .toFile(path.join(OUT, "logo-mark.png"));
  }

  console.log("готово: public/brand/logo-full.png, logo-mark.png");
}

main();
