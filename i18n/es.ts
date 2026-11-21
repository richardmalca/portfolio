export const es = {
  nav: {
    home: 'Inicio',
    about: 'Sobre Mí',
    projects: 'Proyectos',
    education: 'Educación',
    certifications: 'Certificaciones',
    contact: 'Contacto',
    menu: 'Menú',
    close: 'Cerrar',
  },
  hero: {
    role: 'Bach. Ingeniería de Sistemas',
    tagline: 'Construyo soluciones web y móviles que generan impacto.',
    location: 'Cajamarca, Perú',
    ctaProjects: 'Ver Proyectos',
    ctaContact: 'Contáctame',
  },
  about: {
    title: 'Sobre Mí',
    description1:
      'Bachiller en Ingeniería de Sistemas egresado de la Universidad Nacional de Cajamarca, con experiencia en desarrollo de aplicaciones web y móviles, optimización de bases de datos y gestión de proyectos con metodologías ágiles.',
    description2:
      'Me destaco en liderazgo, trabajo en equipo y la implementación de soluciones tecnológicas innovadoras. Comprometido con la excelencia y el aprendizaje continuo para generar valor en cada proyecto.',
    highlight: 'Desarrollador Full-Stack enfocado en crear soluciones digitales de impacto.',
    skills: {
      frontend: 'Frontend',
      backend: 'Backend',
      mobile: 'Desarrollo Móvil',
      databases: 'Bases de Datos',
      tools: 'Herramientas y Metodologías',
    },
  },
  projects: {
    title: 'Proyectos Destacados',
    cta: 'Ver en GitHub',
    items: [
      {
        slug: 'medileny',
        title: 'Pollería Medileny',
        description:
          'Sistema POS y ERP para una pollería con tres sucursales: salón con mesas en tiempo real, cocina por etapas, caja con pagos repartidos, roles y reportes. Diseñado para móvil y PC.',
        highlight: 'POS + ERP',
        tags: ['Laravel', 'React', 'Inertia', 'Tailwind', 'Reverb'],
        github: 'https://github.com/richardmalca/medileny-pos',
        shots: [
          'Salón con una cuenta abierta y la carta para agregar pedidos',
          'Cocina con los pedidos por etapa',
          'Caja del día con totales por medio de pago',
          'Cobro en efectivo con vuelto',
          'Mesas en el celular',
          'Inicio en el celular',
        ],
      },
      {
        slug: 'rentamaq',
        title: 'Rentamaq',
        description:
          'App Android nativa para explorar, ofrecer y reservar maquinaria pesada en Cajamarca: fotos, calendario y mantenimiento, reservas, pagos y reembolsos. Presentada en el Hackathon Cajamarca 2024.',
        highlight: 'Android',
        tags: ['Kotlin', 'Jetpack Compose', 'Room', 'MVVM'],
        github: 'https://github.com/richardmalca/rentamaq',
        shots: [
          'Pantalla de inicio con maquinaria destacada',
          'Publicaciones recientes',
          'Ficha de una excavadora con precios y mantenimiento',
          'Mi cuenta',
        ],
      },
    ],
  },
  education: {
    title: 'Educación',
    items: [
      {
        degree: 'Bach. Ingeniería de Sistemas',
        institution: 'Universidad Nacional de Cajamarca',
        date: 'Julio 2024',
        description:
          'Programa de 5 años enfocado en ingeniería de software, bases de datos y gestión de proyectos.',
      },
    ],
  },
  certifications: {
    title: 'Certificaciones',
    items: [
      {
        title: 'Curso: Crear mi Primera Página Web',
        issuer: 'CódigoFacilito',
        date: 'Enero 2025',
      },
      {
        title: 'Actualización en Excel Profesional',
        issuer: 'Skill – Newmont Yanacocha',
        date: 'Diciembre 2023',
      },
    ],
  },
  contact: {
    headline: 'Hablemos',
    description: '¿Tienes un proyecto en mente? Construyamos algo grandioso juntos.',
    form: {
      name: 'Nombre',
      email: 'Correo',
      message: 'Mensaje',
      send: 'Enviar Mensaje',
    },
    email: 'malcarichard6@gmail.com',
    phone: '(51) 936 036 606',
    whatsapp: '51936036606',
  },
};
