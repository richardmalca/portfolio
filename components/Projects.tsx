'use client';

import { useRef, type ComponentType } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/i18n';
import type { ProjectItem } from '@/types';
import { BigTitle, EASE } from './ui';
import { ArtCity, ArtEco, ArtFood, ArtMap, ArtRent } from './ProjectArt';

interface Tile {
  Art: ComponentType;
  place: string;
  size: string;
  title: string;
  compact?: boolean;
}

const TILES: Tile[] = [
  {
    Art: ArtEco,
    place: 'md:col-span-12',
    size: 'min-h-[34rem] md:min-h-[42rem]',
    title: 'text-[17vw] md:text-[9vw]',
  },
  {
    Art: ArtCity,
    place: 'md:col-start-7 md:col-span-6 md:row-start-2',
    size: 'min-h-[30rem] md:min-h-[28rem]',
    title: 'text-[13vw] md:text-[4.6vw]',
  },
  {
    Art: ArtRent,
    place: 'md:col-start-1 md:col-span-6 md:row-start-2 md:row-span-2',
    size: 'min-h-[36rem] md:min-h-[48rem]',
    title: 'text-[15vw] md:text-[6.4vw]',
  },
  {
    Art: ArtMap,
    place: 'md:col-start-7 md:col-span-3 md:row-start-3',
    size: 'min-h-[30rem] md:min-h-[24rem]',
    title: 'text-[13vw] md:text-[3.2vw]',
    compact: true,
  },
  {
    Art: ArtFood,
    place: 'md:col-start-10 md:col-span-3 md:row-start-3',
    size: 'min-h-[30rem] md:min-h-[24rem]',
    title: 'text-[13vw] md:text-[3.2vw]',
    compact: true,
  },
];

function ProjectTile({ project, tile }: { project: ProjectItem; tile: Tile }) {
  const { Art } = tile;
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const artY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  }

  const body = (
    <>
      <div className="relative min-h-44 flex-1 overflow-hidden">
        <m.div style={{ y: artY }} className="absolute -inset-[8%]">
          <div className="h-full w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.05]">
            <Art />
          </div>
        </m.div>
        <div className="to-ground-deep absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent" />

        {project.highlight && (
          <p className="bg-ground text-flare absolute top-5 left-5 rounded-full px-3 py-1 text-sm font-semibold tracking-wider uppercase md:top-8 md:left-10">
            {project.highlight}
          </p>
        )}
        {project.github && (
          <span className="bg-chalk text-ink absolute top-5 right-5 grid h-11 w-11 place-items-center rounded-full transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:rotate-45 md:top-8 md:right-10">
            <ArrowUpRight aria-hidden="true" size={22} strokeWidth={2.2} />
          </span>
        )}
      </div>

      <div className="bg-ground-deep relative flex flex-col gap-4 p-5 pb-8 md:p-10">
        <h3 className={`display ${tile.title}`}>{project.title}</h3>
        <p
          className={`text-chalk max-w-[44ch] leading-relaxed ${
            tile.compact ? 'text-base md:text-lg' : 'text-lg md:text-2xl'
          }`}
        >
          {project.description}
        </p>
        <p className="text-chalk-soft text-base font-medium md:text-lg">
          {project.tags.join('  /  ')}
        </p>
      </div>
      <span className="spotlight" aria-hidden="true" />
    </>
  );

  const cls = `group relative flex flex-col overflow-hidden bg-ground-deep ring-1 ring-inset ring-chalk/15 ${tile.size}`;

  return (
    <m.li
      ref={ref}
      className={tile.place}
      initial={{ opacity: 0, clipPath: 'inset(8% 5% 8% 5%)' }}
      whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, amount: 'some', margin: '0px 0px 18% 0px' }}
      transition={{ duration: 1.1, ease: EASE }}
    >
      {project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onPointerMove={onPointerMove}
          className={`${cls} h-full w-full`}
        >
          {body}
        </a>
      ) : (
        <div onPointerMove={onPointerMove} className={`${cls} h-full w-full`}>
          {body}
        </div>
      )}
    </m.li>
  );
}

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="px-5 py-24 sm:px-8 md:px-12 md:py-40">
      <BigTitle>{t.projects.title}</BigTitle>
      <ul className="-mx-5 mt-12 grid sm:-mx-8 md:-mx-12 md:mt-20 md:grid-cols-12">
        {t.projects.items.map((project, i) => (
          <ProjectTile
            key={project.title}
            project={project as ProjectItem}
            tile={TILES[i % TILES.length]}
          />
        ))}
      </ul>
    </section>
  );
}
