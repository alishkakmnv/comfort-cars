import { contacts, fleet, formatPrice } from "@/lib/site";
import { CarPhoto } from "@/components/car-photo";
import { SectionHeading } from "@/components/section-heading";
import { FrameReveal, TextReveal } from "@/components/reveal";
import { AccentButton } from "@/components/ui";

/** Тёмный showcase парка. Сетка расширяемая — карточка строится из данных. */
export function FleetGrid() {
  return (
    <section id="fleet" className="bg-cinema py-20 lg:py-[100px]">
      <div className="container-page">
        <SectionHeading
          eyebrow="Эконом · Стандарт · Комфорт · Кроссовер"
          title="НАШ ПАРК"
          link={{ href: contacts.whatsapp, label: "УТОЧНИТЬ СВОБОДНЫЕ ДАТЫ" }}
        />

        <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {fleet.map((car, i) => (
            <a
              key={car.slug}
              href={contacts.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col"
            >
              <span className="text-caption uppercase text-steel">
                {car.carClass}
              </span>

              <h3 className="mt-3 text-heading-sm font-bold uppercase text-off-white">
                <TextReveal as="span" delay={0.04}>
                  {car.model} {car.year}
                </TextReveal>
              </h3>

              <span className="mt-3 text-heading font-bold uppercase text-off-white transition-colors duration-200 group-hover:text-accent">
                {formatPrice(car.price)} ₸
                <span className="text-label text-steel"> /СУТКИ</span>
              </span>

              <FrameReveal delay={0.08} className="mt-6">
                <CarPhoto car={car} priority={i < 3} />
              </FrameReveal>

              <span className="mt-5 flex items-center gap-3 text-label uppercase text-ash transition-colors duration-200 group-hover:text-off-white">
                {car.spec}
              </span>

              <span className="mt-4 flex items-center gap-4 text-label uppercase text-off-white transition-colors duration-200 group-hover:text-accent">
                ЗАБРОНИРОВАТЬ {car.short}
                <span aria-hidden="true" className="text-body leading-none">
                  &#8594;
                </span>
              </span>
            </a>
          ))}
        </div>

        <div className="mt-20 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[52ch] text-body text-ash">
            Это часть ассортимента. Нужна другая модель, минивэн или авто с
            водителем — спросите, подберём из ближайшего наличия.
          </p>
          <AccentButton href={contacts.phoneHref} className="self-start">
            ПОЗВОНИТЬ
          </AccentButton>
        </div>
      </div>
    </section>
  );
}
