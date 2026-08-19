import Image from "next/image";
import { contacts } from "@/lib/site";

function WhatsAppGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      <path d="M3.5 20.5 4.9 16A8.2 8.2 0 1 1 8 19.1l-4.5 1.4Z" />
      <path d="M9 8.6c.3-.7.6-.7.9-.7h.7c.2 0 .5 0 .8.6l.9 2c.1.3.1.5 0 .7l-.5.7c-.2.2-.3.4-.1.7a7 7 0 0 0 3 2.7c.3.1.5.1.7-.1l.7-.8c.2-.2.4-.2.7-.1l1.9 1c.3.2.4.4.4.6v.7c0 .4-.2.9-.9 1.2-.7.3-1.7.4-3.2-.2a11.4 11.4 0 0 1-5.9-5.8c-.5-1.4-.4-2.5-.1-3.2Z" />
    </svg>
  );
}

const nav = [
  { href: "#fleet", label: "ПАРК" },
  { href: "#terms", label: "УСЛОВИЯ" },
  { href: "#how", label: "КАК АРЕНДОВАТЬ" },
  { href: "#contacts", label: "КОНТАКТЫ" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 bg-carbon-deep">
      <div className="container-page flex h-full items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-3 leading-none">
          <Image
            src="/brand/logo-mark.png"
            alt=""
            width={399}
            height={120}
            priority
            className="h-7 w-auto"
          />
          <span className="flex items-baseline gap-2">
            <span className="text-subheading font-bold uppercase tracking-[0.06em] text-off-white">
              {contacts.brandShort}
            </span>
            <span className="hidden text-caption uppercase text-steel sm:inline">
              {contacts.brandMark}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-label uppercase text-ash transition-colors duration-200 hover:text-off-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <a
            href={contacts.phoneHref}
            className="text-label uppercase text-off-white transition-colors duration-200 hover:text-accent"
          >
            {contacts.phoneHuman}
          </a>
          <a
            href={contacts.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Написать в WhatsApp"
            className="flex h-8 w-8 items-center justify-center border border-border-dark text-off-white transition-colors duration-200 hover:border-off-white"
          >
            <WhatsAppGlyph />
          </a>
        </div>
      </div>
    </header>
  );
}
