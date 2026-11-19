'use client';

import { Moon, Sun } from 'lucide-react';
import { useLanguage } from '@/i18n';
import { setCookie } from '@/utils/cookie';

export default function ThemeToggle({ className }: { className?: string }) {
  const { lang } = useLanguage();

  function toggle() {
    const root = document.documentElement;
    const current =
      root.dataset.theme ??
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    const next = current === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    try {
      setCookie('portfolio-theme', next);
    } catch {}
  }

  return (
    <button
      onClick={toggle}
      className={className}
      aria-label={lang === 'es' ? 'Cambiar tema claro u oscuro' : 'Switch light or dark theme'}
    >
      <Sun size={20} className="theme-sun" aria-hidden="true" />
      <Moon size={20} className="theme-moon" aria-hidden="true" />
      <span className="theme-sun-text ml-2">{lang === 'es' ? 'Claro' : 'Light'}</span>
      <span className="theme-moon-text ml-2">{lang === 'es' ? 'Oscuro' : 'Dark'}</span>
    </button>
  );
}
