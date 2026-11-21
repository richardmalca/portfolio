'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { en } from './en';
import { es } from './es';
import { getCookie, setCookie } from '@/utils/cookie';
import type { Lang, Translations } from '@/types';

interface LanguageContextType {
  lang: Lang;
  t: Translations;
  toggleLang: () => void;
}

const COOKIE_NAME = 'portfolio-lang';

function loadTranslations(lang: Lang): Translations {
  return lang === 'es' ? es : en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang: Lang;
}) {
  const [lang, setLang] = useState<Lang>(initialLang);

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next: Lang = prev === 'en' ? 'es' : 'en';
      try {
        setCookie(COOKIE_NAME, next);
        localStorage.setItem(COOKIE_NAME, next);
      } catch {}
      return next;
    });
  }, []);

  const t = loadTranslations(lang);

  useEffect(() => {
    try {
      const stored = (getCookie(COOKIE_NAME) || localStorage.getItem(COOKIE_NAME)) as
        Lang | undefined;
      if (stored && stored !== initialLang) {
        setTimeout(() => {
          setLang(stored);
        }, 0);
      }
    } catch {}
  }, [initialLang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
