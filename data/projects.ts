export const PROJECT_SLUGS = [
  'ecotrack',
  'municipalidad',
  'rentamaq',
  'cajamapp',
  'medileny',
] as const;

export type ProjectSlug = (typeof PROJECT_SLUGS)[number];

export type ArtKey = 'eco' | 'city' | 'rent' | 'map' | 'food';

/** Una captura de la galería. `themed` = existe versión clara y oscura (`-oscuro`). */
export interface GalleryShot {
  src: string;
  kind: 'desktop' | 'phone';
  themed?: boolean;
  width: number;
  height: number;
}

export interface ProjectMeta {
  slug: ProjectSlug;
  /** Ilustración de la tarjeta cuando el proyecto aún no tiene capturas reales. */
  art: ArtKey;
  /** Portada con fotos reales en la tarjeta del inicio. */
  cover?:
    | { kind: 'photo'; src: string; themed?: boolean; position: string }
    | { kind: 'phones'; srcs: string[] };
  /** Capturas reales; el texto alternativo de cada una está en `i18n` (`shots`). */
  gallery: GalleryShot[];
  /** Muestra la galería como recorrido interactivo de una app móvil. */
  walkthrough?: boolean;
}

const DESKTOP = { kind: 'desktop', width: 1800, height: 1125 } as const;
const PHONE_WEB = { kind: 'phone', width: 1000, height: 2164 } as const;
const CAJAMAPP = { kind: 'phone', width: 720, height: 1440 } as const;
const PHONE_APP = { kind: 'phone', width: 720, height: 1192 } as const;

export const PROJECTS: Record<ProjectSlug, ProjectMeta> = {
  ecotrack: { slug: 'ecotrack', art: 'eco', gallery: [] },
  municipalidad: { slug: 'municipalidad', art: 'city', gallery: [] },
  rentamaq: {
    slug: 'rentamaq',
    art: 'rent',
    cover: { kind: 'phones', srcs: ['rentamaq-explorar', 'rentamaq-lista', 'rentamaq-ficha'] },
    gallery: [
      { src: 'rentamaq-explorar', ...PHONE_APP },
      { src: 'rentamaq-lista', ...PHONE_APP },
      { src: 'rentamaq-resultados', ...PHONE_APP },
      { src: 'rentamaq-ficha', ...PHONE_APP },
      { src: 'rentamaq-cuenta', ...PHONE_APP },
    ],
  },
  cajamapp: {
    slug: 'cajamapp',
    art: 'map',
    cover: { kind: 'phones', srcs: ['cajamapp-explorar', 'cajamapp-ficha', 'cajamapp-mapa'] },
    walkthrough: true,
    gallery: [
      { src: 'cajamapp-explorar', ...CAJAMAPP },
      { src: 'cajamapp-filtro', ...CAJAMAPP },
      { src: 'cajamapp-ficha', ...CAJAMAPP },
      { src: 'cajamapp-detalle', ...CAJAMAPP },
      { src: 'cajamapp-ruta', ...CAJAMAPP },
      { src: 'cajamapp-mapa', ...CAJAMAPP },
      { src: 'cajamapp-favoritos', ...CAJAMAPP },
    ],
  },
  medileny: {
    slug: 'medileny',
    art: 'food',
    cover: { kind: 'photo', src: 'medileny-mesas', themed: true, position: 'object-left-top' },
    gallery: [
      { src: 'medileny-mesas', themed: true, ...DESKTOP },
      { src: 'medileny-dashboard', themed: true, ...DESKTOP },
      { src: 'medileny-cocina', themed: true, ...DESKTOP },
      { src: 'medileny-caja', themed: true, ...DESKTOP },
      { src: 'medileny-cobro', themed: true, ...DESKTOP },
      { src: 'medileny-movil-mesas', themed: true, ...PHONE_WEB },
      { src: 'medileny-movil-inicio', themed: true, ...PHONE_WEB },
    ],
  },
};

export function isProjectSlug(value: string): value is ProjectSlug {
  return (PROJECT_SLUGS as readonly string[]).includes(value);
}
