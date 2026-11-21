'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import type { GalleryShot } from '@/data/projects';
import { useLanguage } from '@/i18n';
import ThemedShot from './ThemedShot';

interface Props {
  shots: GalleryShot[];
  alts: string[];
}

/** Galería de capturas de un proyecto con visor ampliado (teclado y gestos básicos). */
export default function Gallery({ shots, alts }: Props) {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    opener.current?.focus();
  }, []);

  const step = useCallback(
    (delta: number) =>
      setOpen((current) =>
        current === null ? null : (current + delta + shots.length) % shots.length,
      ),
    [shots.length],
  );

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    }
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close, step]);

  const entries = shots.map((shot, index) => ({ shot, index }));
  const desktop = entries.filter((e) => e.shot.kind === 'desktop');
  const phones = entries.filter((e) => e.shot.kind === 'phone');

  function thumb({ shot, index }: (typeof entries)[number], sizes: string) {
    return (
      <button
        type="button"
        onClick={(e) => {
          opener.current = e.currentTarget;
          setOpen(index);
        }}
        aria-label={`${lang === 'es' ? 'Ampliar' : 'Enlarge'}: ${alts[index] ?? ''}`}
        className="ring-chalk/20 bg-ground focus-visible:ring-flare group block w-full cursor-zoom-in overflow-hidden rounded-xl ring-1 transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-2xl focus-visible:ring-4 focus-visible:outline-none md:rounded-2xl"
      >
        <ThemedShot shot={shot} alt={alts[index] ?? ''} sizes={sizes} />
      </button>
    );
  }

  const current = open === null ? null : shots[open];

  return (
    <>
      {desktop.length > 0 && (
        <ul className="grid gap-4 md:grid-cols-2 md:gap-6">
          {desktop.map((entry, i) => (
            <li key={entry.shot.src} className={i === 0 ? 'md:col-span-2' : ''}>
              {thumb(
                entry,
                i === 0 ? '(min-width: 768px) 80vw, 94vw' : '(min-width: 768px) 40vw, 94vw',
              )}
            </li>
          ))}
        </ul>
      )}

      {phones.length > 0 && (
        <ul
          className={`grid grid-cols-2 gap-4 md:flex md:flex-wrap md:gap-6 ${
            desktop.length > 0 ? 'mt-4 md:mt-6' : ''
          } ${desktop.length > 0 ? 'md:justify-center' : ''}`}
        >
          {phones.map((entry) => (
            <li key={entry.shot.src} className="md:w-[14.5rem]">
              {thumb(entry, '(min-width: 768px) 15rem, 46vw')}
            </li>
          ))}
        </ul>
      )}

      {current && open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alts[open]}
          className="bg-ink/92 fixed inset-0 z-[80] flex flex-col items-center justify-center p-4 backdrop-blur-sm md:p-10"
          onClick={close}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label={t.projects.close}
            className="bg-chalk text-ink focus-visible:ring-flare absolute top-4 right-4 grid size-12 place-items-center rounded-full focus-visible:ring-4 focus-visible:outline-none md:top-8 md:right-8"
          >
            <X aria-hidden="true" size={22} />
          </button>

          <div
            className="relative max-h-[78vh] w-full max-w-[min(94vw,90rem)] overflow-hidden rounded-2xl"
            style={{
              aspectRatio: `${current.width} / ${current.height}`,
              maxWidth: current.kind === 'phone' ? '24rem' : undefined,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <ThemedShot
              shot={current}
              alt={alts[open] ?? ''}
              sizes="100vw"
              fill
              className="object-contain"
            />
          </div>

          <p className="text-chalk mt-4 max-w-[60ch] text-center text-base md:text-lg">
            {alts[open]} · {open + 1}/{shots.length}
          </p>

          {shots.length > 1 && (
            <div className="mt-4 flex gap-3" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label={lang === 'es' ? 'Anterior' : 'Previous'}
                className="bg-chalk text-ink focus-visible:ring-flare grid size-12 place-items-center rounded-full focus-visible:ring-4 focus-visible:outline-none"
              >
                <ArrowLeft aria-hidden="true" size={22} />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label={lang === 'es' ? 'Siguiente' : 'Next'}
                className="bg-chalk text-ink focus-visible:ring-flare grid size-12 place-items-center rounded-full focus-visible:ring-4 focus-visible:outline-none"
              >
                <ArrowRight aria-hidden="true" size={22} />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
