'use client';

import { useRef } from 'react';
import { m, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useLanguage } from '@/i18n';
import { skillCategories } from '@/data/skills';
import { BigTitle, Reveal } from './ui';

function Word({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.58, 1]);
  return (
    <m.span style={{ opacity }} className="mr-[0.22em] inline-block">
      {word}
    </m.span>
  );
}

function Statement({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] });
  const words = text.split(' ');

  return (
    <p
      ref={ref}
      className="display text-[10.5vw] leading-[0.95] normal-case md:text-[6.4vw]"
      style={{ textTransform: 'none' }}
    >
      {words.map((word, i) => (
        <Word
          key={i}
          word={word}
          progress={scrollYProgress}
          range={[i / words.length, Math.min(1, (i + 1.5) / words.length)]}
        />
      ))}
    </p>
  );
}

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="px-5 py-24 sm:px-8 md:px-12 md:py-40">
      <BigTitle>{t.about.title}</BigTitle>

      <div className="mt-10 md:mt-16">
        <Statement text={t.about.highlight} />
      </div>

      <div className="text-chalk-soft mt-16 grid gap-6 text-lg leading-relaxed md:mt-24 md:grid-cols-2 md:gap-12 md:text-xl">
        <Reveal>
          <p className="max-w-[60ch]">{t.about.description1}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-[60ch]">{t.about.description2}</p>
        </Reveal>
      </div>

      <dl className="hairline mt-20 border-t md:mt-32">
        {skillCategories.map((cat) => {
          const key = cat.titleKey.split('.')[2] as keyof typeof t.about.skills;
          return (
            <Reveal
              key={cat.titleKey}
              className="hairline grid gap-3 border-b py-6 md:grid-cols-[18rem_1fr] md:gap-10 md:py-8"
            >
              <dt className="text-chalk-soft text-sm font-semibold md:pt-3 md:text-base">
                {t.about.skills[key]}
              </dt>
              <dd className="display text-[8.2vw] leading-[1] md:text-[3.4vw]">
                {cat.skills.join(' / ')}
              </dd>
            </Reveal>
          );
        })}
      </dl>
    </section>
  );
}
