# Richard Malca | Portfolio

Bach. Ingeniería de Sistemas — Universidad Nacional de Cajamarca.

Portfolio personal bilingüe (es/en), mobile-first, con tipografía de gran formato y un giroscopio 3D hecho solo con CSS. Construido con **Next.js**, **Tailwind CSS v4** y **Framer Motion**.

## Stack

| Tecnología | Uso |
|---|---|
| Next.js 16 (App Router) | Framework |
| React 19 | UI |
| TypeScript | Tipado |
| Tailwind CSS v4 | Estilos y tokens de tema |
| Framer Motion (LazyMotion) | Animaciones de entrada y scroll |
| Lucide React + Simple Icons | Iconos y logos de tecnologías |
| Formspree | Formulario de contacto |

## Secciones

- **Inicio** — Nombre en gran formato y giroscopio 3D que reacciona al cursor, al giroscopio del móvil y al scroll
- **Sobre mí** — Texto con revelado por scroll y stack tecnológico
- **Proyectos** — Paneles de borde a borde con ilustraciones propias por proyecto
- **Educación y certificaciones**
- **Contacto** — Formulario con validación, sugerencia de dominios de correo y WhatsApp

## Características

- **i18n** — Español/Inglés con la preferencia guardada en cookie
- **Tema claro/oscuro** — Sin parpadeo: la elección guardada se resuelve en el servidor y, sin elección, se usa la preferencia del sistema
- **Responsive** — Diseñado primero para móvil
- **Accesibilidad** — Contraste AA, foco visible, `prefers-reduced-motion`
- **SEO** — Open Graph, sitemap, robots.txt y JSON-LD
- **Rendimiento** — Sin librerías 3D: el giroscopio usa CSS 3D y la cinta de tecnologías, una animación CSS

## Estructura

```
app/          Rutas, layout, estilos globales y metadatos
components/   Secciones y piezas de interfaz
data/         Navegación y tecnologías
hooks/        Hooks compartidos
i18n/         Textos en español e inglés
utils/        Cookies, validación y helpers
```

## Desarrollo

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # Producción
pnpm lint     # ESLint
```

## Licencia

MIT
