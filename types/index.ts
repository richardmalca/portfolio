export type Lang = 'en' | 'es';

export type Translations = typeof import('@/i18n/en').en;

export interface SkillCategory {
  titleKey: `about.skills.${string}`;
  skills: string[];
}

export interface NavItem {
  id: string;
  labelKey: `nav.${string}`;
}

export interface ProjectItem {
  slug: 'ecotrack' | 'municipalidad' | 'rentamaq' | 'cajamapp' | 'medileny';
  title: string;
  /** Resumen corto para la tarjeta del inicio. */
  description: string;
  highlight?: string;
  tags: string[];
  /** Repositorio público; si falta y `repoSoon` es true se avisa que viene pronto. */
  github?: string;
  repoSoon?: boolean;
  /** Sitio publicado en vivo. */
  demo?: string;
  /** Etiquetas de las pestañas de la galería (índice = `group` de cada captura). */
  groups?: string[];
  /** Descripción completa de la página del proyecto. */
  overview: string[];
  features: string[];
  /** Textos alternativos de la galería, en el mismo orden que `data/projects.ts`. */
  shots: string[];
}
