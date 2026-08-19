import Image from "next/image";
import { contacts } from "@/lib/site";
import { RuleDraw } from "@/components/reveal";

const columns = [
  { label: "АДРЕС", lines: [contacts.addressShort, contacts.office, "Бостандыкский район, 050006"] },
  { label: "РЕЖИМ", lines: [contacts.hours, "Выдача и возврат в любое время"] },
];

export function SiteFooter() {
  return (
    <footer id="contacts" className="bg-carbon-deep py-20 lg:py-[100px]">
      <div className="container-page">
        <Image
          src="/brand/logo-full.png"
          alt={contacts.brand}
          width={1200}
          height={1200}
          sizes="200px"
          className="h-auto w-[180px]"
        />

        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-4">
          {columns.map((col) => (
            <div key={col.label}>
              <RuleDraw className="mb-6 bg-border-dark" />
              <p className="text-caption uppercase text-steel">{col.label}</p>
              <div className="mt-4 flex flex-col gap-1">
                {col.lines.map((line) => (
                  <p key={line} className="text-body text-ash">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}

          <div>
            <RuleDraw className="mb-6 bg-border-dark" />
            <p className="text-caption uppercase text-steel">СВЯЗЬ</p>
            <div className="mt-4 flex flex-col items-start gap-2">
              <a
                href={contacts.phoneHref}
                className="text-subheading font-semibold uppercase text-off-white transition-colors duration-200 hover:text-accent"
              >
                {contacts.phoneHuman}
              </a>
              <a
                href={contacts.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-label uppercase text-ash transition-colors duration-200 hover:text-off-white"
              >
                WHATSAPP
              </a>
              {contacts.instagram ? (
                <a
                  href={contacts.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-label uppercase text-ash transition-colors duration-200 hover:text-off-white"
                >
                  INSTAGRAM
                </a>
              ) : null}
            </div>
          </div>

          <div>
            <RuleDraw className="mb-6 bg-border-dark" />
            <p className="text-caption uppercase text-steel">ОЦЕНКА</p>
            <div className="mt-4">
              <p className="text-heading font-bold text-off-white">
                {contacts.rating}
              </p>
              <p className="mt-2 text-body text-ash">
                {contacts.reviewsSource}: {contacts.reviewCount} оценок,{" "}
                {contacts.reviewTextCount} отзывов
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <RuleDraw className="mb-6 bg-border-dark" />
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-caption uppercase text-steel">
              {contacts.brand} · {contacts.city}
            </p>
            <p className="text-caption uppercase text-steel">
              Цены указаны за сутки в тенге и действуют на момент обращения
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
