import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Terms } from "@/components/terms";
import { FleetGrid } from "@/components/fleet-grid";
import { How } from "@/components/how";
import { DriverBanner } from "@/components/driver-banner";
import { SiteFooter } from "@/components/site-footer";
import { contacts, fleet, formatPrice } from "@/lib/site";

/** Разметка для поисковой выдачи — тот же источник данных, что и у страницы. */
function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: contacts.brand,
    telephone: contacts.phoneHuman,
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Ораза Жандосова, 45, каб. 205",
      addressLocality: contacts.city,
      postalCode: "050006",
      addressCountry: "KZ",
    },
    openingHours: "Mo-Su 00:00-23:59",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: contacts.rating,
      reviewCount: contacts.reviewCount,
    },
    makesOffer: fleet.map((car) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Car", name: `${car.model} ${car.year}` },
      price: car.price,
      priceCurrency: "KZT",
      description: `${formatPrice(car.price)} ₸ в сутки`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Terms />
        <FleetGrid />
        <How />
        <DriverBanner />
      </main>
      <SiteFooter />
      <StructuredData />
    </>
  );
}
