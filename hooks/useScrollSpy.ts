'use client';

import { useState, useEffect } from 'react';

export function useScrollSpy(sectionIds: string[], offset = 100): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    let ticking = false;

    function handleScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const viewportTop = offset;
          const viewportBottom = window.innerHeight;
          let currentActive = sectionIds[0] ?? '';
          let maxVisibleHeight = -1;

          for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              const overlapTop = Math.max(rect.top, viewportTop);
              const overlapBottom = Math.min(rect.bottom, viewportBottom);
              const visibleHeight = overlapBottom > overlapTop ? overlapBottom - overlapTop : 0;

              if (visibleHeight > maxVisibleHeight && visibleHeight > 0) {
                maxVisibleHeight = visibleHeight;
                currentActive = id;
              }
            }
          }

          if (currentActive) {
            setActiveId(currentActive);
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [sectionIds, offset]);

  return activeId;
}
