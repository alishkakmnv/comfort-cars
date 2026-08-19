/**
 * Обработка фото машин: карточки 2ГИС -> чистые кадры одного аспекта.
 *
 *   1. положить исходники в raw-photos/
 *   2. сопоставить файл с моделью в raw-photos/fleet.map.json
 *   3. npm run fleet
 *   4. в src/lib/site.ts проставить photo: "/fleet/<slug>.jpg"
 *
 * Что делает:
 *   - находит фотозону карточки (панель с подписью и полоса прокрутки внизу
 *     идеально однородны по краям — фото шумит, по этому и режем);
 *   - срезает боковые стрелки карусели;
 *   - кадрирует в 16:10 вокруг автомобиля и нормализует до 1600px, mozjpeg 82.
 * Ничего поверх кадра не рисует — ни подписей, ни watermark.
 */

import { readdir, readFile, mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "raw-photos");
const OUT = path.join(ROOT, "public", "fleet");
const MAP = path.join(SRC, "fleet.map.json");

const TARGET_W = 1600;
const ASPECT = 16 / 10;
const TARGET_H = Math.round(TARGET_W / ASPECT);

/** Стрелка карусели сидит у левого края фотозоны — режем только там, где она есть. */
const SIDE_CUT = { left: 0, right: 0.01 };
/** Доля высоты фотозоны, на которой стоит центр автомобиля. */
const DEFAULT_FOCUS = 0.58;

/**
 * Фотозона карточки: самый длинный непрерывный участок строк, у которых
 * краевые полосы дают разброс яркости. Панель и скроллбар по краям плоские.
 */
async function findPhotoBand(file) {
  const { data, info } = await sharp(file)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const band = Math.max(4, Math.round(width * 0.05));

  const noisy = new Array(height);
  for (let y = 0; y < height; y++) {
    const vals = [];
    for (let x = 0; x < band; x++) {
      const i = (y * width + x) * channels;
      vals.push((data[i] + data[i + 1] + data[i + 2]) / 3);
      const j = (y * width + (width - 1 - x)) * channels;
      vals.push((data[j] + data[j + 1] + data[j + 2]) / 3);
    }
    const m = vals.reduce((a, b) => a + b, 0) / vals.length;
    const sd = Math.sqrt(vals.reduce((a, b) => a + (b - m) ** 2, 0) / vals.length);
    noisy[y] = sd > 4;
  }

  let best = { start: 0, len: 0 };
  let cur = -1;
  for (let y = 0; y <= height; y++) {
    if (y < height && noisy[y]) {
      if (cur < 0) cur = y;
    } else if (cur >= 0) {
      if (y - cur > best.len) best = { start: cur, len: y - cur };
      cur = -1;
    }
  }

  // Тёмное небо/фон у краёв обрывают детектор раньше времени — карточки 2ГИС
  // сверстаны одинаково, поэтому подтягиваем низ до типичной границы фотозоны.
  const typicalBottom = Math.round(height * 0.805);
  const bottom = Math.max(best.start + best.len, typicalBottom);

  return { width, height, top: best.start, bottom: Math.min(bottom, height) };
}

async function processOne(file, slug, opts) {
  const input = path.join(SRC, file);
  const band = await findPhotoBand(input);

  const cut = { ...SIDE_CUT, ...(opts.side ?? {}) };
  const left = Math.round(band.width * cut.left);
  const right = Math.round(band.width * cut.right);
  const width = band.width - left - right;

  const top = band.top + (opts.trimTop ?? 0);
  const height = band.bottom - top - (opts.trimBottom ?? 0);

  // кадр 16:10 внутри фотозоны, центрированный на автомобиле
  const cropH = Math.min(height, Math.round(width / ASPECT));
  const focus = opts.focus ?? DEFAULT_FOCUS;
  const cropTop = Math.min(
    top + height - cropH,
    Math.max(top, Math.round(top + height * focus - cropH / 2)),
  );

  const outFile = path.join(OUT, `${slug}.jpg`);

  await sharp(input)
    .extract({ left, top: cropTop, width, height: cropH })
    .resize(TARGET_W, TARGET_H, { fit: "cover" })
    .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(outFile);

  const { size } = await stat(outFile);
  console.log(
    `OK       ${slug}.jpg  из «${file}»  фотозона ${band.top}..${band.bottom}  ` +
      `кадр ${width}x${cropH} @y${cropTop}  ${(size / 1024).toFixed(0)} KB`,
  );
}

async function main() {
  if (!existsSync(MAP)) {
    console.error(`Нет ${MAP}. Нужен файл вида { "снимок.png": "hyundai-accent-2022" }.`);
    process.exit(1);
  }
  await mkdir(OUT, { recursive: true });

  const map = JSON.parse(await readFile(MAP, "utf8"));
  const files = (await readdir(SRC)).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));

  let done = 0;
  for (const file of files) {
    const entry = map[file];
    if (!entry) {
      console.log(`ПРОПУСК  ${file} — нет в fleet.map.json`);
      continue;
    }
    const slug = typeof entry === "string" ? entry : entry.slug;
    const opts = typeof entry === "string" ? {} : entry;
    try {
      await processOne(file, slug, opts);
      done += 1;
    } catch (err) {
      console.error(`ОШИБКА   ${file}: ${err.message}`);
    }
  }

  console.log(`\nГотово: ${done}. Выход: public/fleet/`);
}

main();
