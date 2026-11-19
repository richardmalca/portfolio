'use client';

import { useEffect, useRef } from 'react';

const CODE = [
  { w: 46, i: 0, c: '#d4566a' },
  { w: 66, i: 1, c: '#f6f1f1' },
  { w: 38, i: 1, c: '#b7abad' },
  { w: 74, i: 2, c: '#f6f1f1' },
  { w: 52, i: 2, c: '#d4566a' },
  { w: 30, i: 1, c: '#b7abad' },
  { w: 60, i: 1, c: '#f6f1f1' },
  { w: 20, i: 0, c: '#d4566a' },
];

export default function HeroScene() {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const io = new IntersectionObserver(([entry]) => {
      el.dataset.paused = entry.isIntersecting ? 'false' : 'true';
    });
    io.observe(el);
    if (reduced) return () => io.disconnect();

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    let running = false;

    function tick() {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el!.style.setProperty('--ry', `${(cx * 24).toFixed(2)}deg`);
      el!.style.setProperty('--rx', `${(cy * -18).toFixed(2)}deg`);
      if (Math.abs(tx - cx) + Math.abs(ty - cy) > 0.002) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    }
    function kick() {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    }
    function onMove(e: PointerEvent) {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
      kick();
    }
    function onTilt(e: DeviceOrientationEvent) {
      if (e.gamma == null || e.beta == null) return;
      tx = Math.max(-1, Math.min(1, e.gamma / 35));
      ty = Math.max(-1, Math.min(1, (e.beta - 45) / 35));
      kick();
    }
    let scrollRaf = 0;
    function onScroll() {
      cancelAnimationFrame(scrollRaf);
      scrollRaf = requestAnimationFrame(() => {
        const p = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.9)));
        el!.style.setProperty('--sp', p.toFixed(3));
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('deviceorientation', onTilt, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      cancelAnimationFrame(scrollRaf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('deviceorientation', onTilt);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-[27%] left-1/2 aspect-square w-[min(88vw,50svh)] -translate-x-1/2 -translate-y-1/2 md:top-1/2 md:right-[6vw] md:left-auto md:w-[min(44vw,78svh)] md:translate-x-0"
    >
      <div ref={stage} data-paused="false" className="scene">
        <div className="scene-entry">
          <div className="scene-tilt">
            <div className="laptop-turn">
              <div className="laptop">
                <div className="shadow" />
                <div className="base">
                  <div className="keys" />
                  <div className="pad" />
                </div>
                <div className="lid">
                  <div className="lid-front">
                    <div className="screen">
                      <div className="screen-bar">
                        <i />
                        <i />
                        <i />
                      </div>
                      {CODE.map((line, n) => (
                        <span
                          key={n}
                          className="code-line"
                          style={
                            {
                              '--w': line.w,
                              '--i': line.i,
                              '--c': line.c,
                              '--n': n,
                            } as React.CSSProperties
                          }
                        />
                      ))}
                      <span className="code-caret" />
                    </div>
                  </div>
                  <div className="lid-back">
                    <span className="display">
                      RM<b>.</b>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
