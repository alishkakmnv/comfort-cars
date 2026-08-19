# DESIGN_ADAPT.md — Comfort Auto Rent (адаптация Lamborghini-стиля)

Базовый референс — `DESIGN.md` (Lamborghini). Берём ВСЮ его систему как есть, кроме двух подмен ниже. Всё остальное (0px радиусы, hard edges, никаких теней, никаких градиентов, чередование тёмных full-bleed и светлых секций, монументальная типографика UPPERCASE, один акцент на экран) — сохраняем один в один. Это идеальный анти-слоп каркас.

## ПОДМЕНА 1 — Акцентный цвет
Giallo yellow → зелёный из лого Comfort.
- `--color-giallo-vivo: #ffc000` → `--color-accent: #5a9e3f`  (уточнить пипеткой по лого)
- `--color-giallo-ombra: #917300` → `--color-accent-deep: #3f7a2b`  (hover/secondary)
- Правило то же: акцент максимум на ОДИН элемент на экран (обычно primary CTA). Не заливать зелёным всё.
- Neutrals (#202020 / #181818 / #000 / #fff / #f5f5f5 / бордеры) — БЕЗ изменений.

## ПОДМЕНА 2 — Шрифт
LamboType → **Manrope** (правило Azian: Manrope единственный).
- `--font-lambotype` → `--font-manrope: 'Manrope', ui-sans-serif, system-ui, sans-serif`
- ВАЖНО: Manrope НЕ рисуется в UPPERCASE так же брутально, как LamboType. Решение:
  - Заголовки/hero — оставляем `text-transform: uppercase`, но letter-spacing уменьшить до ~0.01–0.02em (2.76px на 120px LamboType = слишком широко для Manrope, будет разваливаться). Подобрать на глаз, чтобы держалось монолитом.
  - Вес: LamboType был 400 на всех размерах. Manrope тоньше по контуру — для hero/display взять **600–700**, для body 400–500. Иерархия по-прежнему через размер, но допускаем 2 веса (это осознанное отклонение от «single weight», иначе Manrope на 120px выглядит хило).
  - Размеры/line-height/scale из DESIGN.md — оставить.

## Что НЕ меняем (критично)
- 0px radius везде (кнопки, фото, карточки).
- Ноль теней, ноль градиентов, ноль glow.
- Разделение секций — только контрастом поверхностей и whitespace, не бордерами-тенями.
- Full-bleed фото машин edge-to-edge, 0px radius.
- Чередование: тёмный hero → светлая editorial-полоса → тёмный showcase флота → светлая story-сетка → тёмный футер.
- Ритм: 80px между секциями, 24px внутри.

## Маппинг контента на компоненты Lamborghini
- **Hero Stage** → тёмный full-bleed, фото топовой машины (Tucson 4x4 или Lexus). Hero-заголовок UPPERCASE Manrope 80–120px: напр. «АРЕНДА АВТО В АЛМАТЫ». Eyebrow сверху: «COMFORT AUTO RENT · 5.0 НА 2ГИС». Зелёная CTA снизу-слева: «ЗАБРОНИРОВАТЬ». Телефон снизу-справа.
- **Section Heading Block** → двухколоночный опенер: слева «НАШ ПАРК» 40–54px, справа ссылка «СМОТРЕТЬ ВСЕ →».
- **Three-Column Story Grid** / **Product Image Tile** → сетка флота. Каждая карточка: класс (10–12px, #7d7d7d, uppercase) → модель+год (16–27px uppercase) → цена «20 000 ₸/СУТКИ» → full-bleed фото машины 0px radius.
- **Event Banner** → блок УТП: без залога / с 18 лет / без ограничения пробега / 24-7. Светлая или тёмная полоса, зелёная CTA.
- **Top Navigation Bar** → фикс тёмный бар 64px, слева лого Comfort (белое), справа телефон + WhatsApp иконка.
- **Footer** → full-width тёмный: адрес (БЦ Satpayev, Жандосова 45), режим 09:00–24:00, телефон, соцсети.

## Итоговые токены (готовые к вставке)
```css
:root {
  --color-accent:      #5a9e3f;   /* было giallo-vivo */
  --color-accent-deep: #3f7a2b;   /* было giallo-ombra */
  --color-carbony:     #202020;
  --color-carbon-deep: #181818;
  --color-pure-black:  #000000;
  --color-canvas:      #ffffff;
  --color-marble:      #f5f5f5;
  --color-border-dark: #494949;
  --color-steel:       #7d7d7d;
  --color-ash:         #969696;
  --font-manrope: 'Manrope', ui-sans-serif, system-ui, -apple-system, sans-serif;
  /* scale/spacing/radius — из DESIGN.md без изменений, все radius = 0 */
}
```
