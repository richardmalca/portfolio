'use client';

import { useState } from 'react';
import type { GalleryShot } from '@/data/projects';
import { useLanguage } from '@/i18n';
import ThemedShot from './ThemedShot';

interface Props {
  shots: GalleryShot[];
  alts: string[];
}

/** Recorrido de una app: un teléfono con las pantallas reales y una lista de pasos para cambiarlas. */
export default function PhoneWalkthrough({ shots, alts }: Props) {
  const { lang } = useLanguage();
  const [active, setActive] = useState(0);
  const next = () => setActive((i) => (i + 1) % shots.length);

  return (
    <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
      <div className="md:col-span-5">
        <button
          type="button"
          onClick={next}
          aria-label={lang === 'es' ? 'Siguiente pantalla' : 'Next screen'}
          className="ring-chalk/25 bg-ground focus-visible:ring-flare relative mx-auto block aspect-[720/1440] w-full max-w-[19rem] cursor-pointer overflow-hidden rounded-[2.2rem] shadow-2xl ring-1 transition-transform duration-200 ease-[var(--ease-out-expo)] focus-visible:ring-4 focus-visible:outline-none active:scale-[0.98] motion-reduce:transition-none"
        >
          {shots.map((shot, i) => (
            <span
              key={shot.src}
              aria-hidden={i !== active}
              className={`absolute inset-0 transition-opacity duration-300 ease-out motion-reduce:transition-none ${
                i === active ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <ThemedShot
                shot={shot}
                alt={i === active ? (alts[i] ?? '') : ''}
                fill
                sizes="(min-width: 768px) 19rem, 80vw"
              />
            </span>
          ))}
        </button>
        <p className="text-chalk-soft mt-5 text-center text-sm font-medium">
          {lang === 'es' ? 'Toca el teléfono o elige un paso' : 'Tap the phone or pick a step'}
        </p>
      </div>

      <ol className="flex flex-col gap-2 md:col-span-7">
        {shots.map((shot, i) => (
          <li key={shot.src}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-current={i === active ? 'step' : undefined}
              className={`focus-visible:ring-flare flex min-h-14 w-full items-center gap-4 rounded-2xl border px-4 py-3 text-left text-base font-medium transition-colors duration-200 focus-visible:ring-4 focus-visible:outline-none md:text-lg ${
                i === active
                  ? 'bg-chalk text-ink border-transparent'
                  : 'border-chalk/20 text-chalk hover:border-chalk/60'
              }`}
            >
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold ${
                  i === active ? 'bg-ink text-chalk' : 'bg-ground-deep text-chalk'
                }`}
              >
                {i + 1}
              </span>
              <span>{alts[i]}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
