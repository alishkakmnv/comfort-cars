import type { ReactNode } from "react";
import { GhostLink } from "@/components/ui";
import { TextReveal } from "@/components/reveal";

/**
 * Сигнатурный опенер секции: двухколоночный ряд, заголовок слева,
 * ссылка-дескриптор справа. Разделение — whitespace, не бордер.
 */
export function SectionHeading({
  eyebrow,
  title,
  link,
  tone = "dark",
}: {
  eyebrow?: string;
  title: ReactNode;
  link?: { href: string; label: string };
  tone?: "dark" | "light";
}) {
  const titleColor = tone === "dark" ? "text-off-white" : "text-carbony";

  return (
    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? (
          <TextReveal className="mb-5">
            <p className="text-label uppercase text-steel">{eyebrow}</p>
          </TextReveal>
        ) : null}
        <h2
          className={`text-fluid-display font-bold uppercase leading-[1.13] tracking-[0.012em] ${titleColor}`}
        >
          <TextReveal as="span" delay={0.06}>
            {title}
          </TextReveal>
        </h2>
      </div>

      {link ? (
        <GhostLink href={link.href} tone={tone} className="shrink-0">
          {link.label}
        </GhostLink>
      ) : null}
    </div>
  );
}
