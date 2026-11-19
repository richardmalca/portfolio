'use client';

import { m, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="bg-flare pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] origin-left"
    />
  );
}
