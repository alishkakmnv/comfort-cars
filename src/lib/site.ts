/**
 * Единственный источник контента. Данные — CLAUDE.md (Comfort Auto Rent, Алматы).
 * Компоненты не хардкодят ни телефон, ни цены.
 */

export const contacts = {
  brand: "Comfort Auto Rent",
  brandShort: "COMFORT",
  brandMark: "AUTO RENT",
  phoneHuman: "+7 705 307 00 09",
  phoneHref: "tel:+77053070009",
  whatsapp: "https://wa.me/77053070009",
  instagram: "https://www.instagram.com/comfort_autorent" as string | null,
  addressShort: "БЦ Satpayev, Ораза Жандосова, 45",
  addressFull:
    "БЦ Satpayev, ул. Ораза Жандосова, 45, каб. 205, 2 этаж, Бостандыкский район, Алматы, 050006",
  office: "Кабинет 205, 2 этаж",
  city: "Алматы",
  hours: "Круглосуточно, без выходных",
  hoursShort: "24/7",
  rating: "5.0",
  reviewsSource: "2ГИС",
  reviewCount: 65,
  reviewTextCount: 35,
} as const;

export type CarClass =
  | "ЭКОНОМ"
  | "СТАНДАРТ"
  | "КОМФОРТ"
  | "КОМФОРТ+"
  | "КРОССОВЕР";

export type Car = {
  slug: string;
  model: string;
  /** Короткое имя для конкретных CTA: «ЗАБРОНИРОВАТЬ ACCENT» */
  short: string;
  year: number;
  carClass: CarClass;
  /** KZT в сутки */
  price: number;
  /** Короткая техническая подпись — без маркетинга */
  spec: string;
  /** Файл в /public/fleet. null — фото ещё не обработано, рендерится плашка. */
  photo: string | null;
};

/** Часть ассортимента. Сетка расширяемая — добавление машины = ещё один объект. */
export const fleet: Car[] = [
  {
    slug: "hyundai-accent-2022",
    model: "Hyundai Accent",
    short: "ACCENT",
    year: 2022,
    carClass: "ЭКОНОМ",
    price: 20000,
    spec: "Автомат · Бензин · 5 мест",
    photo: "/fleet/hyundai-accent-2022.jpg",
  },
  {
    slug: "volkswagen-polo-2022",
    model: "Volkswagen Polo",
    short: "POLO",
    year: 2022,
    carClass: "ЭКОНОМ",
    price: 20000,
    spec: "Автомат · Бензин · 5 мест",
    photo: "/fleet/volkswagen-polo-2022.jpg",
  },
  {
    slug: "kia-cerato-2020",
    model: "Kia Cerato",
    short: "CERATO",
    year: 2020,
    carClass: "СТАНДАРТ",
    price: 23000,
    spec: "Автомат · Бензин · 5 мест",
    photo: "/fleet/kia-cerato-2020.jpg",
  },
  {
    slug: "kia-k5-2021",
    model: "Kia K5",
    short: "K5",
    year: 2021,
    carClass: "КОМФОРТ",
    price: 35000,
    spec: "Автомат · Бензин · 5 мест",
    photo: "/fleet/kia-k5-2021.jpg",
  },
  {
    slug: "lexus-is-250-f-sport-2015",
    model: "Lexus IS 250 F-Sport",
    short: "IS 250",
    year: 2015,
    carClass: "КОМФОРТ+",
    price: 35000,
    spec: "Автомат · Бензин · Задний привод",
    photo: "/fleet/lexus-is-250-f-sport-2015.jpg",
  },
  {
    slug: "lexus-gs-250-2014",
    model: "Lexus GS 250",
    short: "GS 250",
    year: 2014,
    carClass: "КОМФОРТ+",
    price: 35000,
    spec: "Автомат · Бензин · Задний привод",
    photo: "/fleet/lexus-gs-250-2014.jpg",
  },
  {
    slug: "hyundai-tucson-2023",
    model: "Hyundai Tucson 2.5",
    short: "TUCSON",
    year: 2023,
    carClass: "КРОССОВЕР",
    price: 38000,
    spec: "Автомат · Бензин · Полный привод 4x4",
    photo: "/fleet/hyundai-tucson-2023.jpg",
  },
];

/** УТП с баннера клиента — формулировки не переписываем. */
export const terms = [
  {
    index: "01",
    title: "БЕЗ ЗАЛОГА",
    body: "Машину отдаём без депозита. Не замораживаем деньги на карте и не держим наличные до конца аренды.",
  },
  {
    index: "02",
    title: "ВЫДАЁМ С 18 ЛЕТ",
    body: "Права от года — этого достаточно. Не отказываем из-за возраста, как это делают в половине прокатов города.",
  },
  {
    index: "03",
    title: "БЕЗ ЛИМИТА ПРОБЕГА",
    body: "Ездите по Алматы, на Чарын, Кольсай или в Бишкек. Километры не считаем и доплат за них не выставляем.",
  },
  {
    index: "04",
    title: "ГРАФИК 24/7",
    body: "Выдача и приём машины по договорённости в любое время — ночной рейс в аэропорт не проблема.",
  },
  {
    index: "05",
    title: "ГИБКИЕ УСЛОВИЯ",
    body: "Сутки, неделя, месяц, авто с водителем. Долгую аренду и корпоративные заявки считаем отдельно.",
  },
] as const;

export const steps = [
  {
    index: "01",
    title: "ЗВОНОК ИЛИ WHATSAPP",
    body: "Говорите даты и класс машины. Отвечаем, что свободно на эти числа и сколько выйдет по итогу — без скрытых строк.",
  },
  {
    index: "02",
    title: "УДОСТОВЕРЕНИЕ И ПРАВА",
    body: "Из документов — ИД-карта или паспорт и водительское удостоверение. Договор подписываем в офисе на Жандосова за 15 минут.",
  },
  {
    index: "03",
    title: "КЛЮЧИ",
    body: "Забираете в офисе или подвозим по городу и в аэропорт. Машина заправлена, помыта, с зимней резиной по сезону.",
  },
] as const;

export const priceRange = {
  from: Math.min(...fleet.map((c) => c.price)),
  to: Math.max(...fleet.map((c) => c.price)),
};

export function formatPrice(value: number): string {
  return value.toLocaleString("ru-RU").replace(/\u00a0/g, " ");
}
