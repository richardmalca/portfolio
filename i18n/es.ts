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
    repoSoon: 'Repositorio próximamente',
    view: 'Ver proyecto',
    back: 'Todos los proyectos',
    overview: 'Sobre el proyecto',
    features: 'Qué incluye',
    stack: 'Tecnologías',
    gallery: 'Galería',
    next: 'Siguiente proyecto',
    close: 'Cerrar',
    noShots: 'Las capturas de este proyecto se agregarán pronto.',
    items: [
      {
        slug: 'ecotrack',
        title: 'EcoTrack App',
        description:
          'Sistema web y móvil para reciclaje inteligente. Presentado en el Hackathon InnovaTec 2024.',
        highlight: '1er Puesto',
        tags: ['React', 'Laravel', 'MySQL', 'Flutter'],
        repoSoon: true,
        overview: [
          'Sistema web y móvil para reciclaje inteligente. Presentado en el Hackathon InnovaTec 2024, donde obtuvo el 1er puesto.',
        ],
        features: [],
        shots: [],
      },
      {
        slug: 'municipalidad',
        title: 'Web Municipalidad',
        description:
          'Sitio web informativo para una municipalidad, con noticias y gestión de contenido.',
        tags: ['React', 'Next.js', 'PostgreSQL'],
        repoSoon: true,
        overview: [
          'Sitio web informativo para una municipalidad, con noticias y gestión de contenido.',
        ],
        features: [],
        shots: [],
      },
      {
        slug: 'rentamaq',
        title: 'Rentamaq',
        description:
          'App Android nativa para explorar, ofrecer y reservar maquinaria pesada en Cajamarca. Presentada en el Hackathon Cajamarca 2024.',
        highlight: 'Android',
        tags: ['Kotlin', 'Jetpack Compose', 'Room', 'MVVM'],
        github: 'https://github.com/richardmalca/rentamaq',
        overview: [
          'Rentamaq es una app Android nativa para explorar, ofrecer y reservar maquinaria pesada en Cajamarca. Fue presentada en el Hackathon Cajamarca 2024.',
          'Quien alquila busca la máquina que necesita, revisa su ficha con fotos referenciales y precios por hora y por día, y solicita una reserva. Quien ofrece publica su maquinaria, administra las solicitudes y lleva el mantenimiento de cada equipo.',
          'En esta versión los datos se guardan en el teléfono (Room sobre SQLite): los mensajes, pagos y reembolsos forman parte del flujo local, con validación de cruces de horario.',
        ],
        features: [
          'Explorar y filtrar maquinaria por tipo, con búsqueda y fichas con fotos referenciales.',
          'Perfil de ofertante: publicar anuncios con foto, bloquear fechas, registrar mantenimiento y exportar una ficha en PDF.',
          'Perfil de cliente: solicitar reservas con fechas y ventana de llegada, y revisar el importe antes de confirmar.',
          'Seguimiento de reservas con mensajes entre cliente y ofertante, registro de pagos y cálculo de reembolsos.',
          'Mapa referencial con OpenStreetMap.',
          'Android nativo con Kotlin, Jetpack Compose, MVVM y Room.',
        ],
        shots: [
          'Pantalla de inicio con maquinaria destacada',
          'Publicaciones recientes',
          'Resultados filtrados: cuatro retroexcavadoras',
          'Ficha de una excavadora con precios y mantenimiento',
          'Mi cuenta: iniciar sesión o crear cuenta',
        ],
      },
      {
        slug: 'cajamapp',
        title: 'CajamApp',
        description:
          'App móvil para explorar destinos turísticos en Cajamarca (proyecto académico).',
        tags: ['Kotlin', 'SQLite'],
        repoSoon: true,
        overview: ['App móvil para explorar destinos turísticos en Cajamarca. Proyecto académico.'],
        features: [],
        shots: [],
      },
      {
        slug: 'medileny',
        title: 'Pollería Medileny',
        description:
          'Sistema POS y ERP para una pollería con tres sucursales: salón en tiempo real, cocina, caja y roles. Para móvil y PC.',
        highlight: 'POS + ERP',
        tags: ['Laravel', 'React', 'Inertia', 'Tailwind', 'Reverb'],
        github: 'https://github.com/richardmalca/medileny-pos',
        overview: [
          'Sistema de punto de venta y gestión para la Pollería Medileny, con tres sucursales: Cajamarca, Baños del Inca y Bambamarca. Conecta al mozo, la cocina y la caja en un mismo flujo: el mozo toma el pedido, cocina lo prepara por etapas y caja lo cobra, con todo actualizándose en tiempo real.',
          'Está pensado primero para el celular del mozo y se adapta a la caja y a la cocina. En PC, las mesas, la carta y la cuenta conviven en un solo espacio de trabajo para hacer menos clics.',
          'Cada acción pide confirmación, avisa con un mensaje y permite deshacer cuando se puede. Cuenta con 211 pruebas automáticas y un modo oscuro pastel con contraste verificado.',
        ],
        features: [
          'Salón con zonas y mesas, cuentas abiertas con varias tandas, mesas que se pueden juntar o cambiar (solo dentro de la misma zona) y pedidos para llevar o delivery.',
          'Cocina con cuatro etapas (recibido, preparando, listo y entregado al mozo), avisos sonoros y tiempos de espera con colores.',
          'Caja con efectivo, Yape, Plin y tarjeta, vuelto en vivo, billetes que se suman, pagos repartidos entre medios, comprobante y cierre con arqueo.',
          'Tiempo real con Laravel Reverb y colas: los pedidos y los avisos llegan sin recargar.',
          'Roles de administración, caja, mozo y cocina, con permisos y datos separados por sucursal.',
          'Tablero con ventas por hora y por medio de pago, platos más vendidos y estado de cocina, adaptado a cada rol.',
          'Laravel 13, React 19, Inertia, Tailwind y SQLite; desplegado en Laravel Cloud.',
        ],
        shots: [
          'Salón con una cuenta abierta y la carta para agregar pedidos',
          'Tablero de inicio con ventas y KPIs',
          'Cocina con los pedidos por etapa',
          'Caja del día con totales por medio de pago',
          'Cobro en efectivo con vuelto',
          'Mesas en el celular',
          'Inicio en el celular',
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
