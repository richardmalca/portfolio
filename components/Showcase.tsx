'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { GalleryShot } from '@/data/projects';
import { useLanguage } from '@/i18n';
import ThemedShot from './ThemedShot';

interface Props {
  shots: GalleryShot[];
  alts: string[];
  groups: string[];
}

/** Marco de ventana de navegador alrededor de una captura de escritorio. */
function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="ring-chalk/20 bg-ground overflow-hidden rounded-xl shadow-2xl ring-1 md:rounded-2xl">
      <div className="bg-ground-deep ring-chalk/10 flex items-center gap-1.5 px-4 py-3 ring-1 ring-inset">
        <span className="bg-chalk/25 size-2.5 rounded-full" />
        <span className="bg-chalk/25 size-2.5 rounded-full" />
        <span className="bg-chalk/25 size-2.5 rounded-full" />
      </div>
      {children}
    </div>
  );
}

/**
 * Galería con muchas capturas: pestañas por grupo, una captura grande enmarcada,
 * y una tira de miniaturas para saltar entre ellas.
 */
export default function Showcase({ shots, alts, groups }: Props) {
  const { lang } = useLanguage();
  const [group, setGroup] = useState(0);
  const [pos, setPos] = useState(0);

  const entries = useMemo(() => shots.map((shot, index) => ({ shot, index })), [shots]);
  const list = useMemo(
    () => entries.filter((e) => (e.shot.group ?? 0) === group),
    [entries, group],
  );
  const current = list[Math.min(pos, list.length - 1)];
  const isPhone = current.shot.kind === 'phone';

  const step = (delta: number) =>
    setPos((p) => (Math.min(p, list.length - 1) + delta + list.length) % list.length);
  const pick = (g: number) => {
    setGroup(g);
    setPos(0);
  };

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') step(1);
        if (e.key === 'ArrowLeft') step(-1);
      }}
    >
      <div
        role="tablist"
        aria-label={lang === 'es' ? 'Tipo de pantalla' : 'Screen type'}
        className="flex flex-wrap gap-2"
      >
        {groups.map((label, g) => {
          const count = entries.filter((e) => (e.shot.group ?? 0) === g).length;
          return (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={g === group}
              onClick={() => pick(g)}
              className={`focus-visible:ring-flare min-h-11 rounded-full border px-5 text-base font-semibold transition-colors duration-200 focus-visible:ring-4 focus-visible:outline-none ${
                g === group
                  ? 'bg-chalk text-ink border-transparent'
                  : 'border-chalk/25 text-chalk hover:border-chalk/60'
              }`}
            >
              {label}
              <span className="ml-2 text-sm font-medium opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="relative mt-6 md:mt-8">
        <div
          key={current.shot.src}
          className="shot-fade mx-auto"
          style={{ maxWidth: isPhone ? '20rem' : '80rem' }}
        >
          {isPhone ? (
            <div className="ring-chalk/25 bg-ground overflow-hidden rounded-[2.2rem] shadow-2xl ring-1">
              <ThemedShot
                shot={current.shot}
                alt={alts[current.index] ?? ''}
                sizes="20rem"
                priority
              />
            </div>
          ) : (
            <BrowserFrame>
              <ThemedShot
                shot={current.shot}
                alt={alts[current.index] ?? ''}
                sizes="(min-width: 1280px) 80rem, 94vw"
                priority
              />
            </BrowserFrame>
          )}
        </div>
      </div>

      <div className="mx-auto mt-5 flex max-w-[80rem] items-center justify-between gap-4">
        <p className="text-chalk min-w-0 text-base font-medium md:text-lg" aria-live="polite">
          <span className="text-chalk-soft mr-2 tabular-nums">
            {Math.min(pos, list.length - 1) + 1}/{list.length}
          </span>
          {alts[current.index]}
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label={lang === 'es' ? 'Anterior' : 'Previous'}
            className="bg-chalk text-ink focus-visible:ring-flare grid size-11 place-items-center rounded-full transition-transform duration-150 focus-visible:ring-4 focus-visible:outline-none active:scale-95"
          >
            <ArrowLeft aria-hidden="true" size={20} />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label={lang === 'es' ? 'Siguiente' : 'Next'}
            className="bg-chalk text-ink focus-visible:ring-flare grid size-11 place-items-center rounded-full transition-transform duration-150 focus-visible:ring-4 focus-visible:outline-none active:scale-95"
          >
            <ArrowRight aria-hidden="true" size={20} />
          </button>
        </div>
      </div>

      <ul className="no-scrollbar mx-auto mt-5 flex max-w-[80rem] snap-x gap-3 overflow-x-auto pb-2">
        {list.map((entry, i) => {
          const active = entry === current;
          const phone = entry.shot.kind === 'phone';
          return (
            <li key={entry.shot.src} className="shrink-0 snap-start">
              <button
                type="button"
                onClick={() => setPos(i)}
                aria-label={alts[entry.index]}
                aria-current={active}
                className={`focus-visible:ring-flare bg-ground block overflow-hidden rounded-lg ring-2 transition-[box-shadow,opacity] duration-200 focus-visible:outline-none ${
                  phone ? 'w-16' : 'w-36 md:w-44'
                } ${active ? 'ring-flare' : 'ring-chalk/15 opacity-70 hover:opacity-100'}`}
              >
                <ThemedShot shot={entry.shot} alt="" sizes="11rem" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
