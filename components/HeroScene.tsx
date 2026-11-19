'use client';

import { useEffect, useRef } from 'react';

const RINGS = [
  { size: 100, spin: 'spin-x' },
  { size: 76, spin: 'spin-y' },
  { size: 52, spin: 'spin-z' },
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
            {RINGS.map((ring) => (
              <div
                key={ring.spin}
                className={`ring ${ring.spin}`}
                style={{ width: `${ring.size}%`, height: `${ring.size}%` }}
              />
            ))}
            <div className="core" />
          </div>
        </div>
      </div>
    </div>
  );
}
