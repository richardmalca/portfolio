'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { useLanguage } from '@/i18n';
import { navItems } from '@/data/navigation';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { cn } from '@/utils/cn';
import ThemeToggle from './ThemeToggle';

const EASE = [0.16, 1, 0.3, 1] as const;
const SECTION_IDS = navItems.map((i) => i.id);

export default function Navbar() {
  const { t, lang, toggleLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const label = (id: string) => t.nav[id === 'hero' ? 'home' : (id as keyof typeof t.nav)];

  function go(id: string) {
    setOpen(false);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Desde la página de un proyecto, vuelve al inicio en esa sección.
      window.location.href = id === 'hero' ? '/' : `/#${id}`;
    }
  }

  const pill =
    'inline-flex min-h-11 items-center rounded-full border hairline px-4 text-sm font-semibold transition-[transform,background-color] duration-150 ease-[var(--ease-out-expo)] active:scale-[0.97] hover:bg-chalk/10';

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-3 transition-colors duration-300 sm:px-8 md:px-12',
          scrolled ? 'bg-ground hairline border-b' : 'bg-transparent',
        )}
      >
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            go('hero');
          }}
          className="display text-3xl"
          aria-label="RM. Richard Malca"
        >
          RM<span className="text-flare">.</span>
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {navItems.slice(1).map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={cn(
                'min-h-11 rounded-full px-4 text-sm font-medium transition-colors duration-150',
                activeId === item.id ? 'bg-chalk text-ink' : 'text-chalk-soft hover:text-chalk',
              )}
            >
              {label(item.id)}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className={cn(pill, 'w-11 justify-center px-0 md:w-auto md:px-4')} />
          <button
            onClick={toggleLang}
            className={pill}
            aria-label={lang === 'en' ? 'ES, Español' : 'EN, English'}
          >
            {lang === 'en' ? 'ES' : 'EN'}
          </button>
          <button
            onClick={() => setOpen(true)}
            className={cn(pill, 'md:hidden')}
            aria-expanded={open}
            aria-controls="menu-panel"
          >
            {t.nav.menu}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.menu}
            className="bg-ground-deep fixed inset-0 z-[60] flex flex-col px-5 pt-4 pb-8 md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="flex justify-end">
              <button onClick={() => setOpen(false)} className={pill}>
                {t.nav.close}
              </button>
            </div>
            <ul className="mt-auto flex flex-col">
              {navItems.map((item, i) => (
                <m.li
                  key={item.id}
                  className="hairline border-t"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.12 + i * 0.05 }}
                >
                  <button
                    onClick={() => go(item.id)}
                    className={cn(
                      'display w-full py-3 text-left text-[13vw]',
                      activeId === item.id ? 'text-flare' : 'text-chalk',
                    )}
                  >
                    {label(item.id)}
                  </button>
                </m.li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
