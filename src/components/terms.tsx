import { terms } from "@/lib/site";
import { SectionHeading } from "@/components/section-heading";
import { TextReveal, RuleDraw } from "@/components/reveal";

/** Светлая editorial-полоса: УТП с баннера клиента, строчный список с хайрлайнами. */
export function Terms() {
  return (
    <section id="terms" className="bg-marble py-20 lg:py-[100px]">
      <div className="container-page">
        <SectionHeading
          eyebrow="Условия"
          title={
            <>
              НА ЧЁМ МЫ
              <br />
              НЕ ЭКОНОМИМ
            </>
          }
          tone="light"
          link={{ href: "#how", label: "КАК АРЕНДОВАТЬ" }}
        />

        <ul className="mt-16">
          {terms.map((item, i) => (
            <li key={item.index}>
              <RuleDraw className="bg-ash" delay={i * 0.04} />
              <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-12 md:gap-6">
                <span className="text-caption uppercase text-steel md:col-span-1">
                  {item.index}
                </span>
                <h3 className="text-heading-sm font-bold uppercase text-carbony md:col-span-5">
                  <TextReveal as="span" delay={0.04}>
                    {item.title}
                  </TextReveal>
                </h3>
                <p className="max-w-[60ch] text-body text-anvil md:col-span-6">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
          <li>
            <RuleDraw className="bg-ash" />
          </li>
        </ul>
      </div>
    </section>
  );
}
