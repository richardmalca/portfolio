import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Richard Malca | Full Stack Developer',
    short_name: 'Richard Malca',
    description: 'Portfolio de Richard Malca, desarrollador web y móvil en Cajamarca, Perú.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0e0a0b',
    theme_color: '#0e0a0b',
    lang: 'es',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
