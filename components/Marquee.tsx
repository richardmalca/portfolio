'use client';

import { useRef, type ComponentType } from 'react';
import { useMotionValueEvent, useScroll, useSpring, useVelocity } from 'framer-motion';
import { Coffee, RefreshCcw, Webhook, Workflow } from 'lucide-react';
import {
  siApachemaven,
  siAndroidstudio,
  siCss,
  siDart,
  siDocker,
  siExpress,
  siFlutter,
  siGit,
  siHtml5,
  siJavascript,
  siJetpackcompose,
  siKotlin,
  siLaravel,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siReact,
  siSqlite,
  siTailwindcss,
} from 'simple-icons';

type Glyph = { path: string } | ComponentType<{ size?: number; strokeWidth?: number }>;
interface Item {
  name: string;
  glyph: Glyph;
}

const brand = (name: string, icon: { path: string }): Item => ({ name, glyph: icon });

const ROWS: Item[][] = [
  [
    brand('React', siReact),
    brand('Next.js', siNextdotjs),
    brand('HTML', siHtml5),
    brand('CSS', siCss),
    brand('JavaScript', siJavascript),
    brand('Tailwind', siTailwindcss),
    brand('Laravel', siLaravel),
    brand('PHP', siPhp),
    brand('Node.js', siNodedotjs),
    brand('Express', siExpress),
    brand('Maven', siApachemaven),
  ],
  [
    brand('Kotlin', siKotlin),
    brand('Jetpack Compose', siJetpackcompose),
    brand('Android Studio', siAndroidstudio),
    { name: 'Java', glyph: Coffee },
    brand('Flutter', siFlutter),
    brand('Dart', siDart),
    brand('React Native', siReact),
    { name: 'FlutterFlow', glyph: Workflow },
    brand('MySQL', siMysql),
    brand('SQLite', siSqlite),
    brand('PostgreSQL', siPostgresql),
    brand('Git', siGit),
    brand('Docker', siDocker),
    { name: 'Scrum', glyph: RefreshCcw },
    { name: 'REST API', glyph: Webhook },
  ],
];

function Logo({ glyph }: { glyph: Glyph }) {
  const Icon = 'path' in glyph ? null : glyph;
  return (
    <span className="hairline grid h-14 w-14 shrink-0 place-items-center rounded-full border md:h-20 md:w-20">
      {Icon ? (
        <Icon size={32} strokeWidth={1.8} />
      ) : (
        <svg viewBox="0 0 24 24" className="fill-chalk h-7 w-7 md:h-10 md:w-10" aria-hidden="true">
          <path d={(glyph as { path: string }).path} />
        </svg>
      )}
    </span>
  );
}

export default function Marquee({ row = 0, reverse = false }: { row?: 0 | 1; reverse?: boolean }) {
  const items = ROWS[row];
  const track = useRef<HTMLDivElement>(null);
  const velocity = useSpring(useVelocity(useScroll().scrollY), { stiffness: 90, damping: 30 });

  useMotionValueEvent(velocity, 'change', (v) => {
    const animation = track.current?.getAnimations()[0];
    if (animation) animation.playbackRate = 1 + Math.min(Math.abs(v) / 450, 7);
  });

  const strip = (
    <ul className="flex shrink-0 items-center gap-10 pr-10 md:gap-16 md:pr-16" aria-hidden="true">
      {items.map((it) => (
        <li key={it.name} className="flex items-center gap-4 md:gap-6">
          <Logo glyph={it.glyph} />
          <span className="display text-[11vw] whitespace-nowrap md:text-[5.5vw]">{it.name}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="hairline overflow-hidden border-y py-6 md:py-9" role="presentation">
      <div ref={track} className={`marquee flex w-max ${reverse ? 'marquee-reverse' : ''}`}>
        {strip}
        {strip}
      </div>
    </div>
  );
}
