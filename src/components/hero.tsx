import Image from "next/image";
import { contacts, fleet, formatPrice, priceRange } from "@/lib/site";
import { AccentButton, GhostLink } from "@/components/ui";
import { TextReveal, RuleDraw } from "@/components/reveal";

const stage = fleet.find((car) => car.slug === "hyundai-tucson-2023") ?? fleet[0];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-cinema pt-16"
    >
      {stage.photo ? (
        <>
          <Image
            src={stage.photo}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_42%]"
          />
          {/* вуаль, а не градиент: одна плоская плашка поверх кадра */}
          <div className="absolute inset-0 bg-cinema/58" />
        </>
      ) : null}

      <div className="container-page relative flex flex-1 flex-col justify-between pb-8 pt-12">
        <div className="max-w-[62ch] lg:max-w-[50%]">
          <TextReveal immediate className="mb-5">
            <p className="text-label uppercase text-steel">
              {contacts.brand} · {contacts.rating} на {contacts.reviewsSource}
            </p>
          </TextReveal>

          <h1 className="text-fluid-hero font-bold uppercase leading-[0.92] tracking-[0.005em] text-off-white">
            {/* {" "} между строками: CSS его схлопывает, а textContent
                и буфер обмена получают нормальные пробелы между словами */}
            <TextReveal as="span" immediate delay={0.08}>АРЕНДА</TextReveal>{" "}
            <TextReveal as="span" immediate delay={0.16}>АВТО В</TextReveal>{" "}
            <TextReveal as="span" immediate delay={0.24}>АЛМАТЫ</TextReveal>
          </h1>

          <TextReveal immediate delay={0.44} className="mt-6">
            <p className="max-w-[52ch] text-subheading text-ash">
              Без залога, с 18 лет, без лимита пробега. От{" "}
              {formatPrice(priceRange.from)} ₸ в сутки.
            </p>
          </TextReveal>
        </div>

        <div className="mt-10">
          <RuleDraw immediate className="mb-6 bg-border-dark" delay={0.5} />
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <AccentButton href={contacts.whatsapp}>ЗАБРОНИРОВАТЬ</AccentButton>
              <GhostLink href="#fleet">СМОТРЕТЬ ПАРК</GhostLink>
            </div>

            <div className="flex flex-col items-start gap-2 md:items-end">
              <a
                href={contacts.phoneHref}
                className="text-heading-sm font-bold uppercase text-off-white transition-colors duration-200 hover:text-accent"
              >
                {contacts.phoneHuman}
              </a>
              <p className="text-caption uppercase text-steel">
                Круглосуточно · {contacts.city}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
