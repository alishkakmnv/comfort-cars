import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { contacts, priceRange, formatPrice } from "@/lib/site";

/** Единственный шрифт проекта. Веса: 400–500 body, 600–700 display. */
const manrope = Manrope({
  variable: "--font-manrope-src",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://comfort-auto-rent.kz"),
  title: `${contacts.brand} — аренда авто в Алматы без залога`,
  description: `Прокат авто в Алматы от ${formatPrice(priceRange.from)} ₸ в сутки. Без залога, выдаём с 18 лет, без ограничения пробега, график 24/7. ${contacts.phoneHuman}`,
  keywords: [
    "аренда авто Алматы",
    "прокат авто Алматы",
    "аренда машины без залога",
    "авто с водителем Алматы",
  ],
  openGraph: {
    type: "website",
    locale: "ru_KZ",
    siteName: contacts.brand,
    title: `${contacts.brand} — аренда авто в Алматы`,
    description: `Без залога, с 18 лет, без ограничения пробега. От ${formatPrice(priceRange.from)} ₸ в сутки.`,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${manrope.variable} h-full antialiased`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
