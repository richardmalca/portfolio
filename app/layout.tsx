import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import { Bricolage_Grotesque, Geist } from 'next/font/google';
import MotionProvider from '@/components/MotionProvider';
import { LanguageProvider } from '@/i18n';
import type { Lang } from '@/types';
import './globals.css';

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-bricolage',
  display: 'block',
});

const sans = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0e0a0b' },
    { media: '(prefers-color-scheme: light)', color: '#f6f1f1' },
  ],
};

const baseUrl = 'https://richardmalca.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Richard Malca | Desarrollador Web Cajamarca - React, Next.js, Laravel',
    template: '%s | Richard Malca',
  },
  description:
    'Bach. Ingeniería de Sistemas - Universidad Nacional de Cajamarca. Desarrollador web y móvil especializado en React, Next.js, Laravel y Flutter. +5 proyectos entregados. Disponible para proyectos en Cajamarca y remoto.',
  keywords: [
    'Richard Malca',
    'desarrollador web Cajamarca',
    'programador Cajamarca',
    'sistemas UNC',
    'app en Cajamarca',
    'ingeniería de sistemas',
    'Universidad Nacional de Cajamarca',
    'web developer Peru',
    'React developer',
    'Next.js',
    'Laravel',
    'Flutter',
    'desarrollo web Perú',
    'página web Cajamarca',
    'aplicaciones móviles Perú',
  ],
  authors: [{ name: 'Richard Malca' }],
  creator: 'Richard Malca',
  publisher: 'Richard Malca',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    alternateLocale: 'en_US',
    siteName: 'Richard Malca - Desarrollador Web',
    title: 'Richard Malca | Desarrollador Web Cajamarca - React, Next.js, Laravel',
    description:
      'Bach. Ingeniería de Sistemas - UNC. Desarrollo web y móvil con React, Next.js, Laravel y Flutter. Conoce mis proyectos y contáctame.',
    url: baseUrl,
    countryName: 'Peru',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Richard Malca | Desarrollador Web Cajamarca',
    description:
      'Bach. Ingeniería de Sistemas - UNC. Desarrollo web y móvil con React, Next.js, Laravel y Flutter.',
  },
  alternates: { canonical: '/' },
  applicationName: 'Richard Malca',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${baseUrl}/#person`,
      name: 'Richard Malca',
      givenName: 'Richard',
      familyName: 'Malca Chuquimango',
      jobTitle: 'Full Stack Developer',
      image: `${baseUrl}/icon-512.png`,
      sameAs: ['https://github.com/richardmalca', 'https://linkedin.com/in/richardmalca'],
      description:
        'Bachiller en Ingeniería de Sistemas de la Universidad Nacional de Cajamarca. Especializado en desarrollo web con React, Next.js, Laravel y desarrollo móvil con Flutter y React Native.',
      email: 'malcarichard6@gmail.com',
      telephone: '+51 936 036 606',
      url: baseUrl,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Cajamarca',
        addressCountry: 'PE',
      },
      knowsAbout: [
        'React',
        'Next.js',
        'Laravel',
        'Flutter',
        'React Native',
        'TypeScript',
        'JavaScript',
        'MySQL',
        'PostgreSQL',
        'Docker',
      ],
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Universidad Nacional de Cajamarca',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      url: baseUrl,
      name: 'Richard Malca | Desarrollador Web Cajamarca',
      description:
        'Portfolio profesional de Richard Malca, Bach. Ingeniería de Sistemas - UNC. Desarrollo web y móvil.',
      publisher: { '@id': `${baseUrl}/#person` },
      inLanguage: ['es', 'en'],
    },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const initialLang = (cookieStore.get('portfolio-lang')?.value || 'es') as Lang;
  const savedTheme = cookieStore.get('portfolio-theme')?.value;
  const theme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : undefined;

  return (
    <html
      lang={initialLang}
      data-theme={theme}
      className={`${display.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <LanguageProvider initialLang={initialLang}>
          <MotionProvider>{children}</MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
