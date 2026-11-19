'use client';

import { Fragment, useRef, type ElementType, type ReactNode } from 'react';
import { m, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { cn } from '@/utils/cn';

export const EASE = [0.16, 1, 0.3, 1] as const;

const IN_VIEW = { once: true, amount: 'some', margin: '0px 0px 18% 0px' } as const;

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={IN_VIEW}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </m.div>
  );
}

export function BigTitle({
  children,
  as: Tag = 'h2',
  className,
}: {
  children: string;
  as?: ElementType;
  className?: string;
}) {
  const words = children.split(' ');
  let index = 0;

  return (
    <m.div initial="hidden" whileInView="visible" viewport={IN_VIEW}>
      <Tag aria-label={children} className={cn('display text-[17vw] md:text-[12vw]', className)}>
        {words.map((word, wi) => (
          <Fragment key={wi}>
            <span
              aria-hidden="true"
              className="inline-block overflow-hidden pb-[0.06em] align-bottom"
            >
              {Array.from(word).map((letter) => {
                const i = index++;
                return (
                  <m.span
                    key={i}
                    className="inline-block"
                    custom={i}
                    variants={{
                      hidden: { y: '105%' },
                      visible: (n: number) => ({
                        y: 0,
                        transition: { duration: 0.9, ease: EASE, delay: n * 0.035 },
                      }),
                    }}
                  >
                    {letter}
                  </m.span>
                );
              })}
            </span>
            {wi < words.length - 1 && ' '}
          </Fragment>
        ))}
      </Tag>
    </m.div>
  );
}

export function Magnetic({
  children,
  className,
  strength = 0.3,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  function onMove(e: React.PointerEvent) {
    if (reduced || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <m.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn('inline-block', className)}
    >
      {children}
    </m.div>
  );
}
