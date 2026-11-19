'use client';

import type { ComponentType } from 'react';
import { m } from 'framer-motion';
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
    size: 'min-h-[30rem] md:min-h-[38rem]',
    title: 'text-[17vw] md:text-[11vw]',
  },
  {
    Art: ArtCity,
    place: 'md:col-start-7 md:col-span-6 md:row-start-2',
    size: 'min-h-[26rem] md:min-h-[24rem]',
    title: 'text-[13vw] md:text-[4.6vw]',
  },
  {
    Art: ArtRent,
    place: 'md:col-start-1 md:col-span-6 md:row-start-2 md:row-span-2',
    size: 'min-h-[32rem] md:min-h-[44rem]',
    title: 'text-[15vw] md:text-[7vw]',
  },
  {
    Art: ArtMap,
    place: 'md:col-start-7 md:col-span-3 md:row-start-3',
    size: 'min-h-[24rem] md:min-h-[20rem]',
    title: 'text-[13vw] md:text-[3.2vw]',
    compact: true,
  },
  {
    Art: ArtFood,
    place: 'md:col-start-10 md:col-span-3 md:row-start-3',
    size: 'min-h-[24rem] md:min-h-[20rem]',
    title: 'text-[13vw] md:text-[3.2vw]',
    compact: true,
  },
];

function ProjectTile({ project, tile }: { project: ProjectItem; tile: Tile }) {
  const { Art } = tile;

  const body = (
    <>
      <div className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]">
        <Art />
      </div>
      <div className="from-ground via-ground/75 absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t to-transparent" />

      {project.highlight && (
        <p className="text-flare absolute top-5 left-5 text-sm font-semibold tracking-wider uppercase md:top-8 md:left-10">
          {project.highlight}
        </p>
      )}
      {project.github && (
        <ArrowUpRight
          aria-hidden="true"
          size={34}
          strokeWidth={2.2}
          className="text-chalk absolute top-5 right-5 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1 group-hover:-translate-y-1 md:top-8 md:right-10"
        />
      )}

      <div className="relative mt-auto flex flex-col gap-4 p-5 pb-8 md:p-10">
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
    </>
  );

  const cls = `group relative flex overflow-hidden bg-ground-deep ring-1 ring-inset ring-chalk/15 ${tile.size}`;

  return (
    <m.li
      className={tile.place}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 'some', margin: '0px 0px 18% 0px' }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      {project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`${cls} h-full w-full`}
        >
          {body}
        </a>
      ) : (
        <div className={`${cls} h-full w-full`}>{body}</div>
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
