'use client';

import type { ElementType, ReactNode } from 'react';
import { m } from 'framer-motion';
import { cn } from '@/utils/cn';

export const EASE = [0.16, 1, 0.3, 1] as const;

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
      viewport={{ once: true, amount: 'some', margin: '0px 0px 18% 0px' }}
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
  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 'some', margin: '0px 0px 18% 0px' }}
    >
      <Tag
        className={cn('display overflow-hidden pb-[0.06em] text-[17vw] md:text-[12vw]', className)}
      >
        <m.span
          className="block"
          variants={{ hidden: { y: '105%' }, visible: { y: 0 } }}
          transition={{ duration: 1, ease: EASE }}
        >
          {children}
        </m.span>
      </Tag>
    </m.div>
  );
}
