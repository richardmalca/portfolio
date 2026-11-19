'use client';

import { useLanguage } from '@/i18n';
import { BigTitle, Reveal } from './ui';

export default function Certifications() {
  const { t } = useLanguage();

  return (
    <section id="certifications" className="px-5 py-24 sm:px-8 md:px-12 md:py-40">
      <BigTitle>{t.certifications.title}</BigTitle>

      <ul className="hairline mt-12 border-b md:mt-20">
        {t.certifications.items.map((item) => (
          <li key={item.title}>
            <Reveal>
              <div className="hairline grid gap-3 border-t py-7 md:grid-cols-[1fr_22rem] md:gap-12 md:py-10">
                <h3 className="display text-[9.5vw] leading-[0.95] md:text-[4.4vw]">
                  {item.title}
                </h3>
                <div className="text-chalk-soft flex flex-col justify-end text-base md:pb-1">
                  <p className="text-chalk font-semibold">{item.issuer}</p>
                  <p>{item.date}</p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
