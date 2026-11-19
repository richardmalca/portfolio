'use client';

import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/i18n';

export default function Footer() {
  const { t, lang } = useLanguage();
  const es = lang === 'es';

  const links = [
    { label: 'GitHub', href: 'https://github.com/richardmalca' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/richardmalca' },
    { label: 'WhatsApp', href: `https://wa.me/${t.contact.whatsapp}` },
    { label: es ? 'Correo' : 'Email', href: `mailto:${t.contact.email}` },
  ];

  return (
    <footer className="hairline overflow-hidden border-t px-5 pt-12 sm:px-8 md:px-12 md:pt-16">
      <ul className="flex flex-wrap gap-x-10 gap-y-2 md:gap-x-16">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group hover:text-flare inline-flex min-h-12 items-center gap-2 text-2xl font-semibold transition-colors duration-150 md:text-4xl"
            >
              {l.label}
              <ArrowUpRight
                aria-hidden="true"
                className="h-[0.8em] w-[0.8em] transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </li>
        ))}
      </ul>

      <div className="hairline text-chalk-soft mt-10 flex flex-col gap-3 border-t py-6 text-base sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} Richard Malca · {t.hero.location}
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-chalk hover:text-flare inline-flex min-h-11 items-center gap-2 self-start font-semibold transition-colors duration-150 sm:self-auto"
        >
          {es ? 'Volver arriba' : 'Back to top'}
          <ArrowUp size={18} aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
