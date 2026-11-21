'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { useLanguage } from '@/i18n';
import { PROJECT_SLUGS, PROJECTS, type ProjectSlug } from '@/data/projects';
import type { ProjectItem } from '@/types';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollProgress from './ScrollProgress';
import WhatsAppButton from './WhatsAppButton';
import Gallery from './Gallery';
import PhoneWalkthrough from './PhoneWalkthrough';
import { ArtCity, ArtEco, ArtFood, ArtMap, ArtRent } from './ProjectArt';
import { BigTitle, Reveal } from './ui';

const ARTS = { eco: ArtEco, city: ArtCity, rent: ArtRent, map: ArtMap, food: ArtFood } as const;

export default function ProjectPage({ slug }: { slug: ProjectSlug }) {
  const { t } = useLanguage();
  const items = t.projects.items as ProjectItem[];
  const project = items.find((item) => item.slug === slug);
  if (!project) return null;

  const meta = PROJECTS[slug];
  const Art = ARTS[meta.art];
  const nextSlug = PROJECT_SLUGS[(PROJECT_SLUGS.indexOf(slug) + 1) % PROJECT_SLUGS.length];
  const next = items.find((item) => item.slug === nextSlug);
  const hasShots = meta.gallery.length > 0;

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <WhatsAppButton />
      <main className="px-5 pt-32 pb-24 sm:px-8 md:px-12 md:pt-44 md:pb-40">
        <Link
          href="/#projects"
          className="text-chalk-soft hover:text-chalk focus-visible:ring-flare inline-flex min-h-11 items-center gap-2 rounded-full text-base font-semibold transition-colors duration-300 focus-visible:ring-4 focus-visible:outline-none"
        >
          <ArrowLeft aria-hidden="true" size={20} />
          {t.projects.back}
        </Link>

        <header className="mt-6 flex flex-col gap-6 md:mt-10">
          {project.highlight && (
            <p className="bg-ground-deep text-flare w-fit rounded-full px-3 py-1 text-sm font-semibold tracking-wider uppercase">
              {project.highlight}
            </p>
          )}
          <BigTitle as="h1" className="display text-[15vw] md:text-[9vw]">
            {project.title}
          </BigTitle>
          <p className="text-chalk max-w-[52ch] text-xl leading-relaxed md:text-2xl">
            {project.description}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-chalk text-ink focus-visible:ring-flare hover:bg-flare inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition-colors duration-300 focus-visible:ring-4 focus-visible:outline-none"
              >
                {t.projects.cta}
                <ArrowUpRight aria-hidden="true" size={20} strokeWidth={2.4} />
              </a>
            )}
            {!project.github && project.repoSoon && (
              <p className="border-chalk/25 text-chalk-soft rounded-full border px-5 py-3 text-base font-medium">
                {t.projects.repoSoon}
              </p>
            )}
          </div>
        </header>

        {!hasShots && (
          <Reveal className="ring-chalk/15 relative mt-14 h-72 overflow-hidden ring-1 md:mt-20 md:h-[26rem]">
            <Art />
          </Reveal>
        )}

        <div className="mt-16 grid gap-12 md:mt-28 md:grid-cols-12 md:gap-16">
          <section className="md:col-span-7" aria-labelledby="overview">
            <h2 id="overview" className="display text-[9vw] md:text-[3.2vw]">
              {t.projects.overview}
            </h2>
            <div className="mt-6 flex flex-col gap-5">
              {project.overview.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-chalk max-w-[62ch] text-lg leading-relaxed md:text-xl"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <aside className="flex flex-col gap-10 md:col-span-5">
            <section aria-labelledby="stack">
              <h2 id="stack" className="display text-[7vw] md:text-[2vw]">
                {t.projects.stack}
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="border-chalk/25 text-chalk rounded-full border px-4 py-2 text-base font-semibold"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </section>

            {project.features.length > 0 && (
              <section aria-labelledby="features">
                <h2 id="features" className="display text-[7vw] md:text-[2vw]">
                  {t.projects.features}
                </h2>
                <ul className="mt-5 flex flex-col gap-4">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-chalk flex gap-3 text-base leading-relaxed md:text-lg"
                    >
                      <Check aria-hidden="true" size={20} className="text-flare mt-1 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </aside>
        </div>

        {hasShots ? (
          <section className="mt-20 md:mt-36" aria-labelledby="gallery">
            <h2 id="gallery" className="display mb-8 text-[11vw] md:mb-12 md:text-[5vw]">
              {t.projects.gallery}
            </h2>
            {meta.walkthrough ? (
              <PhoneWalkthrough shots={meta.gallery} alts={project.shots} />
            ) : (
              <Gallery shots={meta.gallery} alts={project.shots} />
            )}
          </section>
        ) : (
          <p className="text-chalk-soft mt-16 text-base md:mt-24 md:text-lg">
            {t.projects.noShots}
          </p>
        )}

        {next && (
          <Link
            href={`/projects/${next.slug}`}
            className="group border-chalk/20 hover:border-flare focus-visible:ring-flare mt-24 flex items-end justify-between gap-6 border-t pt-10 transition-colors duration-500 focus-visible:ring-4 focus-visible:outline-none md:mt-40"
          >
            <span className="flex flex-col gap-2">
              <span className="text-chalk-soft text-sm font-semibold tracking-wider uppercase">
                {t.projects.next}
              </span>
              <span className="display text-[11vw] md:text-[5vw]">{next.title}</span>
            </span>
            <span className="bg-chalk text-ink grid size-14 shrink-0 place-items-center rounded-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45">
              <ArrowUpRight aria-hidden="true" size={26} strokeWidth={2.2} />
            </span>
          </Link>
        )}
      </main>
      <Footer />
    </>
  );
}
