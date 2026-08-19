# CLAUDE.md

## Что это
Демо-сайт аренды авто **Comfort Auto Rent** (Алматы). Метод — **donor-swap**: клонируем донор-репо, меняем ТОЛЬКО текст/контент и палитру. Структуру не трогаем.

## Данные клиента
- Название: Comfort Auto Rent (на 2ГИС — Comfort_autorent)
- Категория: прокат авто — стандарт / эконом / авто с водителем
- Город: Алматы
- Телефон: +7 705 307 00 09
- WhatsApp: wa.me/77053070009
- Instagram: [IG_URL]  ← скинуть
- Адрес: БЦ Satpayev, ул. Ораза Жандосова, 45, каб. 205, 2 этаж, Бостандыкский р-н, Алматы, 050006
- Режим: ежедневно 09:00–24:00 (по 2ГИС) / на баннере «Круглосуточно 24/7» — уточнить, ставим 09:00–24:00
- Рейтинг: 5.0, подтверждён на 2ГИС (65 оценок, 35 отзывов)

## УТП (с баннера клиента — использовать как есть)
- Без залога
- Выдаём с 18 лет
- Гибкие условия для клиентов
- График 24/7
- Нет ограничения по пробегу

## Флот (реальные цены, KZT/сутки)
- Hyundai Accent 2022 — эконом — 20 000
- Volkswagen Polo 2022 — эконом — 20 000
- Kia Cerato 2020 — стандарт — 23 000
- Kia K5 2021 — комфорт — 35 000
- Lexus IS 250 F-Sport 2015 — комфорт+ — 35 000
- Lexus GS 250 2014 — комфорт+ — 35 000
- Hyundai Tucson 2023 4x4 2.5 — кроссовер — 38 000
> Это часть ассортимента. Оставить сетку расширяемой.

## Палитра (из лого — чёрный + зелёный)
- Anchor акцент: #5a9e3f (зелёный из лого; при подгонке пипеткой уточнить)
- Фон: #0a0a0a (cinema-black)
- Поверхности/карточки: #141414 – #181818
- Текст: off-white #e8e8e6 (НЕ #fff)
- Зелёный — дозированно: цены, активные кнопки, подчёркивания. Не заливать фоном.

## Дизайн-язык
- Строится по `DESIGN.md` (стиль Lamborghini: cinema-black, 0px радиусы, hard edges, ноль теней/градиентов, UPPERCASE-типографика, один акцент на экран, чередование тёмных/светлых секций).
- Подмены под клиента — в `DESIGN_ADAPT.md`: жёлтый → зелёный #5a9e3f, LamboType → Manrope.

## Шрифт
- **Manrope** — единственный. Веса 600–700 (hero/display), 400–500 (body).

## Стек
Next.js App Router + TS + Tailwind + Framer Motion + Vercel. Без Three.js.

## АБСОЛЮТНЫЕ ЗАПРЕТЫ (anti-slop)
- neon / violet / purple / фиолетовый (Material #c8a0f0, indigo #6366f1)
- gradient-кнопки
- симметричный центрированный hero
- floating card shadows (shadow-xl/2xl)
- чистый белый #fff на тёмном
- AI-тексты: "Добро пожаловать", "широкий спектр", "качество и надёжность", "надёжный партнёр", "инновационные решения"
- типовые анимации: fade-up на всё, bounce, pulse на кнопках, generic hover-scale

## Правило структуры
no structure changes — секции/порядок/позиции кнопок/места фото не двигаем.

## Stop-gates
1. Анти-слоп grep (prompt.md) — 0 совпадений.
2. npm run build — зелёный.
3. При 25% токенов — стоп, отчёт, ждать.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
