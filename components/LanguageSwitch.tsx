'use client';

import { useLanguage } from '@/i18n';
import { cn } from '@/utils/cn';

type Code = 'es' | 'en';

/** Banderas en SVG: los emojis de bandera no se ven en Windows. */
function Flag({ code }: { code: Code }) {
  return (
    <svg
      viewBox="0 0 24 16"
      width="24"
      height="16"
      aria-hidden="true"
      className="ring-chalk/30 shrink-0 rounded-[3px] ring-1"
    >
      {code === 'es' ? (
        <>
          <rect width="24" height="16" fill="#c60b1e" />
          <rect y="4" width="24" height="8" fill="#ffc400" />
        </>
      ) : (
        <>
          <rect width="24" height="16" fill="#fff" />
          {[0, 2, 4, 6, 8, 10, 12, 14].map((y) => (
            <rect key={y} y={y * (16 / 15)} width="24" height={16 / 15} fill="#b22234" />
          ))}
          <rect width="11" height="8.6" fill="#3c3b6e" />
          {[2.2, 5.5, 8.8, 4, 7.3, 3.2, 6.6, 9.9].map((x, i) => (
            <circle key={i} cx={x} cy={i < 3 ? 2 : i < 5 ? 4.4 : 6.8} r="0.55" fill="#fff" />
          ))}
        </>
      )}
    </svg>
  );
}

const OPTIONS: { code: Code; label: string; name: string }[] = [
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'en', label: 'EN', name: 'English' },
];

/** Interruptor de idioma con las dos opciones siempre visibles y su bandera. */
export default function LanguageSwitch() {
  const { lang, toggleLang } = useLanguage();

  return (
    <div
      role="group"
      aria-label={lang === 'es' ? 'Idioma' : 'Language'}
      className="border-chalk/25 flex min-h-11 items-center gap-1 rounded-full border p-1"
    >
      {OPTIONS.map(({ code, label, name }) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={active}
            aria-label={name}
            onClick={() => !active && toggleLang()}
            className={cn(
              'focus-visible:ring-flare flex min-h-9 items-center gap-2 rounded-full px-2.5 text-sm font-semibold transition-colors duration-150 focus-visible:ring-4 focus-visible:outline-none md:px-3',
              active ? 'bg-chalk text-ink' : 'text-chalk-soft hover:text-chalk',
            )}
          >
            <Flag code={code} />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
