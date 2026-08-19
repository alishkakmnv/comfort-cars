import type { ReactNode } from "react";

const base =
  "inline-flex items-center gap-4 uppercase transition-colors duration-200 ease-out";

/**
 * Единственный акцентный элемент на экран. Плоский зелёный блок,
 * hover — смена поверхности на accent-deep, не тень и не масштаб.
 */
export function AccentButton({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`${base} bg-accent px-6 py-4 text-label text-cinema hover:bg-accent-deep ${className ?? ""}`}
    >
      <span>{children}</span>
      <span aria-hidden="true" className="text-body leading-none">
        &#8594;
      </span>
    </a>
  );
}

/** Вторичное действие: ни заливки, ни рамки — якорь только стрелка. */
export function GhostLink({
  href,
  children,
  tone = "dark",
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const color =
    tone === "dark"
      ? "text-off-white hover:text-accent"
      : "text-carbony hover:text-accent-deep";

  return (
    <a
      href={href}
      className={`${base} text-label ${color} ${className ?? ""}`}
    >
      <span>{children}</span>
      <span aria-hidden="true" className="text-body leading-none">
        &#8594;
      </span>
    </a>
  );
}

/** Третичная кнопка средней тяжести: прозрачная заливка, хайрлайн-рамка. */
export function OutlinedButton({
  href,
  children,
  tone = "dark",
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const skin =
    tone === "dark"
      ? "border-border-dark text-off-white hover:border-off-white"
      : "border-ash text-carbony hover:border-carbony";

  return (
    <a
      href={href}
      className={`${base} border px-6 py-4 text-label ${skin} ${className ?? ""}`}
    >
      <span>{children}</span>
    </a>
  );
}

/** Мелкий надзаголовок: 10–12px, uppercase, приглушённый. */
export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={`text-label uppercase ${tone === "dark" ? "text-steel" : "text-steel"} ${className ?? ""}`}
    >
      {children}
    </p>
  );
}
