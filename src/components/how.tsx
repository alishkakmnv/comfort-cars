import { contacts, steps } from "@/lib/site";
import { SectionHeading } from "@/components/section-heading";
import { TextReveal, RuleDraw } from "@/components/reveal";
import { GhostLink } from "@/components/ui";

/** Светлая story-сетка: три шага аренды. */
export function How() {
  return (
    <section id="how" className="bg-canvas py-20 lg:py-[100px]">
      <div className="container-page">
        <SectionHeading
          eyebrow="Порядок"
          title="ТРИ ШАГА ДО КЛЮЧЕЙ"
          tone="light"
          link={{ href: contacts.whatsapp, label: "НАПИСАТЬ В WHATSAPP" }}
        />

        <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-3">
          {steps.map((step, i) => (
            <article key={step.index} className="flex flex-col">
              <RuleDraw className="bg-ash" delay={i * 0.08} />
              <span className="mt-6 text-caption uppercase text-steel">
                ШАГ {step.index}
              </span>
              <h3 className="mt-3 text-heading-sm font-bold uppercase text-carbony">
                <TextReveal as="span" delay={0.06 + i * 0.06}>
                  {step.title}
                </TextReveal>
              </h3>
              <p className="mt-4 text-body text-anvil">{step.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-16">
          <RuleDraw className="mb-8 bg-ash" />
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="max-w-[58ch] text-body text-anvil">
              Офис — {contacts.addressShort}, {contacts.office}. На связи
              круглосуточно: выдаём и принимаем машину в любое время, включая
              ночные рейсы.
            </p>
            <GhostLink href="#contacts" tone="light" className="shrink-0">
              КОНТАКТЫ И АДРЕС
            </GhostLink>
          </div>
        </div>
      </div>
    </section>
  );
}
