'use client';

import Image from 'next/image';
import { m } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/i18n';
import type { ProjectItem } from '@/types';
import { BigTitle, EASE } from './ui';

interface Shot {
  src: string;
  width: number;
  height: number;
}

/** Captura que cambia con el tema: oscura por defecto, clara con el tema claro. */
function ThemedShot({
  shot,
  alt,
  sizes,
  className = '',
}: {
  shot: Shot;
  alt: string;
  sizes: string;
  className?: string;
}) {
  return (
    <>
      <Image
        src={`/projects/${shot.src}-oscuro.webp`}
        alt={alt}
        width={shot.width}
        height={shot.height}
        sizes={sizes}
        className={`shot-dark h-auto w-full ${className}`}
      />
      <Image
        src={`/projects/${shot.src}.webp`}
        alt={alt}
        width={shot.width}
        height={shot.height}
        sizes={sizes}
        className={`shot-light h-auto w-full ${className}`}
      />
    </>
  );
}

const DESKTOP = { width: 1800, height: 1125 };
const PHONE = { width: 1000, height: 2164 };

function MedilenyMedia({ project }: { project: ProjectItem }) {
  const alt = (i: number) => project.shots[i] ?? project.title;

  return (
    <div className="relative">
      <div className="ring-chalk/20 bg-ground overflow-hidden rounded-2xl shadow-2xl ring-1">
        <div className="bg-ground-deep ring-chalk/10 flex items-center gap-1.5 px-4 py-3 ring-1 ring-inset">
          <span className="bg-chalk/25 size-2.5 rounded-full" />
          <span className="bg-chalk/25 size-2.5 rounded-full" />
          <span className="bg-chalk/25 size-2.5 rounded-full" />
        </div>
        <ThemedShot
          shot={{ src: 'medileny-mesas', ...DESKTOP }}
          alt={alt(0)}
          sizes="(min-width: 768px) 58vw, 92vw"
        />
      </div>

      <div className="ring-ground-deep bg-ground absolute -right-2 -bottom-8 w-[24%] overflow-hidden rounded-[1.4rem] shadow-2xl ring-4 md:-right-6 md:-bottom-12">
        <ThemedShot
          shot={{ src: 'medileny-movil-mesas', ...PHONE }}
          alt={alt(4)}
          sizes="(min-width: 768px) 14vw, 24vw"
        />
      </div>

      <ul className="mt-6 grid grid-cols-3 gap-3 md:mt-8 md:gap-5">
        {(
          [
            ['medileny-cocina', 1],
            ['medileny-caja', 2],
            ['medileny-cobro', 3],
          ] as const
        ).map(([src, i]) => (
          <li key={src} className="ring-chalk/20 bg-ground overflow-hidden rounded-xl ring-1">
            <ThemedShot
              shot={{ src, ...DESKTOP }}
              alt={alt(i)}
              sizes="(min-width: 768px) 19vw, 30vw"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

const RENTAMAQ_SHOTS = ['explorar', 'lista', 'ficha', 'cuenta'] as const;

function RentamaqMedia({ project }: { project: ProjectItem }) {
  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
      {RENTAMAQ_SHOTS.map((name, i) => (
        <li
          key={name}
          className={`ring-chalk/20 bg-ground overflow-hidden rounded-[1.6rem] shadow-2xl ring-1 ${
            i % 2 === 1 ? 'md:translate-y-10' : ''
          }`}
        >
          <Image
            src={`/projects/rentamaq-${name}.webp`}
            alt={project.shots[i] ?? project.title}
            width={720}
            height={1192}
            sizes="(min-width: 768px) 16vw, 44vw"
            className="h-auto w-full"
          />
        </li>
      ))}
    </ul>
  );
}

function ProjectCase({ project, cta, flip }: { project: ProjectItem; cta: string; flip: boolean }) {
  return (
    <m.li
      className="bg-ground-deep ring-chalk/15 grid gap-10 p-5 py-12 ring-1 ring-inset md:grid-cols-12 md:items-center md:gap-14 md:p-14 md:py-20"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, ease: EASE }}
    >
      <div
        className={`flex flex-col gap-6 md:col-span-5 ${flip ? 'md:order-2 md:col-start-8' : ''}`}
      >
        {project.highlight && (
          <p className="bg-ground text-flare w-fit rounded-full px-3 py-1 text-sm font-semibold tracking-wider uppercase">
            {project.highlight}
          </p>
        )}
        <h3 className="display text-[15vw] md:text-[5.4vw]">{project.title}</h3>
        <p className="text-chalk max-w-[46ch] text-lg leading-relaxed md:text-xl">
          {project.description}
        </p>
        <p className="text-chalk-soft text-base font-medium md:text-lg">
          {project.tags.join('  /  ')}
        </p>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-chalk text-ink focus-visible:ring-flare hover:bg-flare inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition-colors duration-300 focus-visible:ring-4 focus-visible:outline-none"
          >
            {cta}
            <ArrowUpRight aria-hidden="true" size={20} strokeWidth={2.4} />
          </a>
        )}
      </div>

      <div
        className={`md:col-span-7 ${flip ? 'md:order-1 md:col-start-1' : ''} ${
          project.slug === 'medileny' ? 'pb-8 md:pb-12' : 'pb-0 md:pb-10'
        }`}
      >
        {project.slug === 'medileny' ? (
          <MedilenyMedia project={project} />
        ) : (
          <RentamaqMedia project={project} />
        )}
      </div>
    </m.li>
  );
}

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="px-5 py-24 sm:px-8 md:px-12 md:py-40">
      <BigTitle>{t.projects.title}</BigTitle>
      <ul className="-mx-5 mt-12 flex flex-col gap-px sm:-mx-8 md:-mx-12 md:mt-20">
        {t.projects.items.map((project, i) => (
          <ProjectCase
            key={project.slug}
            project={project as ProjectItem}
            cta={t.projects.cta}
            flip={i % 2 === 1}
          />
        ))}
      </ul>
    </section>
  );
}
