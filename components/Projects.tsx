'use client';

import { useRef, type ComponentType } from 'react';
import Link from 'next/link';
import { m, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/i18n';
import { PROJECTS } from '@/data/projects';
import type { ProjectItem } from '@/types';
import { BigTitle, EASE } from './ui';
import { ArtCity, ArtEco, ArtFood, ArtMap, ArtRent } from './ProjectArt';
import ThemedShot from './ThemedShot';

interface Tile {
  place: string;
  size: string;
  title: string;
  compact?: boolean;
}

const ARTS: Record<string, ComponentType> = {
  eco: ArtEco,
  city: ArtCity,
  rent: ArtRent,
  map: ArtMap,
  food: ArtFood,
};

const TILES: Tile[] = [
  {
    place: 'md:col-span-12',
    size: 'min-h-[34rem] md:min-h-[42rem]',
    title: 'text-[17vw] md:text-[9vw]',
  },
  {
    place: 'md:col-start-7 md:col-span-6 md:row-start-2',
    size: 'min-h-[30rem] md:min-h-[28rem]',
    title: 'text-[13vw] md:text-[4.6vw]',
  },
  {
    place: 'md:col-start-1 md:col-span-6 md:row-start-2 md:row-span-2',
    size: 'min-h-[36rem] md:min-h-[48rem]',
    title: 'text-[15vw] md:text-[6.4vw]',
  },
  {
    place: 'md:col-start-7 md:col-span-3 md:row-start-3',
    size: 'min-h-[30rem] md:min-h-[24rem]',
    title: 'text-[13vw] md:text-[3.2vw]',
    compact: true,
  },
  {
    place: 'md:col-start-10 md:col-span-3 md:row-start-3',
    size: 'min-h-[30rem] md:min-h-[24rem]',
    title: 'text-[13vw] md:text-[3.2vw]',
    compact: true,
  },
];

function ProjectTile({ project, tile, view }: { project: ProjectItem; tile: Tile; view: string }) {
  const meta = PROJECTS[project.slug];
  const Art = ARTS[meta.art];
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const artY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  }

  return (
    <m.li
      ref={ref}
      className={tile.place}
      initial={{ opacity: 0, clipPath: 'inset(8% 5% 8% 5%)' }}
      whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, amount: 'some', margin: '0px 0px 18% 0px' }}
      transition={{ duration: 1.1, ease: EASE }}
    >
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`${view}: ${project.title}`}
        onPointerMove={onPointerMove}
        className={`group bg-ground-deep ring-chalk/15 focus-visible:ring-flare relative flex h-full w-full flex-col overflow-hidden ring-1 ring-inset focus-visible:ring-4 focus-visible:outline-none ${tile.size}`}
      >
        <div className="relative min-h-44 flex-1 overflow-hidden">
          <m.div style={{ y: artY }} className="absolute -inset-[8%]">
            <div className="relative h-full w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.05]">
              {meta.cover?.kind === 'photo' ? (
                <ThemedShot
                  shot={{ ...meta.cover, width: 1, height: 1 }}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className={meta.cover.position}
                />
              ) : meta.cover?.kind === 'phones' ? (
                <div className="absolute inset-0 flex items-center justify-center gap-3 px-6 md:gap-5">
                  {meta.cover.srcs.map((src, i) => (
                    <div
                      key={src}
                      className={`ring-chalk/25 bg-ground relative aspect-[720/1192] w-[28%] overflow-hidden rounded-[1.4rem] shadow-2xl ring-1 ${
                        i === 1 ? 'translate-y-[8%]' : '-translate-y-[2%]'
                      }`}
                    >
                      <ThemedShot
                        shot={{ src, width: 1, height: 1 }}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 14vw, 30vw"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <Art />
              )}
            </div>
          </m.div>
          <div className="to-ground-deep absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent" />

          {project.highlight && (
            <p className="bg-ground text-flare absolute top-5 left-5 rounded-full px-3 py-1 text-sm font-semibold tracking-wider uppercase md:top-8 md:left-10">
              {project.highlight}
            </p>
          )}
          <span className="bg-chalk text-ink absolute top-5 right-5 grid h-11 w-11 place-items-center rounded-full transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:rotate-45 md:top-8 md:right-10">
            <ArrowUpRight aria-hidden="true" size={22} strokeWidth={2.2} />
          </span>
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
      </Link>
    </m.li>
  );
}

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="px-5 py-24 sm:px-8 md:px-12 md:py-40">
      <BigTitle>{t.projects.title}</BigTitle>
      <ul className="-mx-5 mt-12 grid sm:-mx-8 md:-mx-12 md:mt-20 md:grid-cols-12">
        {(t.projects.items as ProjectItem[]).map((project, i) => (
          <ProjectTile
            key={project.slug}
            project={project}
            tile={TILES[i % TILES.length]}
            view={t.projects.view}
          />
        ))}
      </ul>
    </section>
  );
}
