import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectPage from '@/components/ProjectPage';
import { PROJECT_SLUGS, isProjectSlug } from '@/data/projects';
import { es } from '@/i18n/es';

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = es.projects.items.find((item) => item.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${project.title} | Richard Malca`,
      description: project.description,
      url: `/projects/${slug}`,
      type: 'article',
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isProjectSlug(slug)) notFound();

  return <ProjectPage slug={slug} />;
}
