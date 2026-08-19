import { contacts } from "@/lib/site";
import { AccentButton } from "@/components/ui";
import { TextReveal } from "@/components/reveal";

/** Event Banner: отдельная услуга клиента — авто с водителем и долгая аренда. */
export function DriverBanner() {
  return (
    <section className="bg-carbony py-20 lg:py-[100px]">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <TextReveal className="mb-6">
              <p className="text-label uppercase text-steel">
                АВТО С ВОДИТЕЛЕМ · ДОЛГАЯ АРЕНДА
              </p>
            </TextReveal>
            <h2 className="text-fluid-display-lg font-bold uppercase leading-none tracking-[0.01em] text-off-white">
              <TextReveal as="span" delay={0.06}>САДИТЕСЬ</TextReveal>
              <TextReveal as="span" delay={0.14}>НАЗАД</TextReveal>
            </h2>
          </div>

          <div className="flex flex-col justify-end gap-8 lg:col-span-5">
            <p className="max-w-[46ch] text-subheading text-ash">
              Встреча в аэропорту, переговоры, свадьба, командировка на неделю в
              Капчагай. Даём машину с водителем и считаем помесячно, если брать
              надолго.
            </p>
            <AccentButton href={contacts.whatsapp} className="self-start">
              РАССЧИТАТЬ СТОИМОСТЬ
            </AccentButton>
          </div>
        </div>
      </div>
    </section>
  );
}
