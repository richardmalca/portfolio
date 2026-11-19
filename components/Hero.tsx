'use client';

import { ArrowDown } from 'lucide-react';
import { useLanguage } from '@/i18n';
import HeroScene from './HeroScene';

function Line({ children, delay }: { children: string; delay: string }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <span className="line-rise" style={{ '--d': delay } as React.CSSProperties}>
        {children}
      </span>
    </span>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const [first, ...rest] = 'Richard Malca'.split(' ');
  const d = (v: string) => ({ '--d': v }) as React.CSSProperties;

  return (
    <section
      id="hero"
      className="relative flex min-h-[100lvh] flex-col justify-end overflow-hidden px-5 pt-28 pb-8 sm:px-8 md:px-12"
    >
      <HeroScene />

      <div className="relative z-10">
        <p
          className="fade-up text-chalk-soft mb-5 max-w-[22ch] text-base sm:text-lg"
          style={d('0.6s')}
        >
          {t.hero.role}
          <br />
          {t.hero.location}
        </p>

        <h1 className="display text-[26vw] sm:text-[22vw] lg:text-[19vw]">
          <Line delay="0.05s">{first}</Line>
          <Line delay="0.18s">{rest.join(' ')}</Line>
        </h1>

        <div className="hairline mt-8 flex flex-col gap-6 border-t pt-5 sm:flex-row sm:items-end sm:justify-between">
          <p className="fade-up max-w-[30ch] text-xl leading-snug sm:text-2xl" style={d('0.8s')}>
            {t.hero.tagline}
          </p>

          <div className="fade-up flex items-center gap-3" style={d('0.9s')}>
            <a
              href="#projects"
              className="bg-chalk text-ink inline-flex min-h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold transition-transform duration-150 ease-[var(--ease-out-expo)] hover:opacity-85 active:scale-[0.97]"
            >
              {t.hero.ctaProjects}
              <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="hairline hover:bg-chalk/10 inline-flex min-h-12 items-center rounded-full border px-6 text-sm font-semibold transition-[transform,background-color] duration-150 ease-[var(--ease-out-expo)] active:scale-[0.97]"
            >
              {t.hero.ctaContact}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
