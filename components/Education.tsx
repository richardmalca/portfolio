'use client';

import Image from 'next/image';
import { useLanguage } from '@/i18n';
import { BigTitle, Reveal } from './ui';

export default function Education() {
  const { t } = useLanguage();

  return (
    <section id="education" className="px-5 py-24 sm:px-8 md:px-12 md:py-40">
      <BigTitle>{t.education.title}</BigTitle>

      <div className="mt-12 md:mt-20">
        {t.education.items.map((item) => (
          <Reveal key={item.degree}>
            <div className="hairline grid gap-6 border-t py-8 md:grid-cols-[1fr_22rem] md:gap-12 md:py-12">
              <div>
                <p className="text-chalk-soft mb-4 text-base">{item.date}</p>
                <h3 className="display text-[11.5vw] md:text-[5.6vw]">{item.degree}</h3>
              </div>
              <div className="flex flex-col justify-end gap-5 md:pb-2">
                <div className="flex items-center gap-4">
                  <span className="bg-chalk grid h-14 w-14 shrink-0 place-items-center rounded-full p-2">
                    <Image
                      src="/unc-logo.webp"
                      alt="Escudo de la Universidad Nacional de Cajamarca"
                      width={48}
                      height={48}
                      className="h-full w-full object-contain"
                    />
                  </span>
                  <p className="text-lg leading-snug font-semibold">{item.institution}</p>
                </div>
                {item.description && (
                  <p className="text-chalk-soft max-w-[40ch] text-base leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
