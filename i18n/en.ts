export const en = {
  nav: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    education: 'Education',
    certifications: 'Certifications',
    contact: 'Contact',
    menu: 'Menu',
    close: 'Close',
  },
  hero: {
    role: 'Bach. Systems Engineering',
    tagline: 'I build web and mobile solutions that make an impact.',
    location: 'Cajamarca, Peru',
    ctaProjects: 'View Projects',
    ctaContact: 'Contact Me',
  },
  about: {
    title: 'About Me',
    description1:
      'Systems Engineering graduate from Universidad Nacional de Cajamarca with experience in web and mobile development, database optimization, and agile project management.',
    description2:
      'I stand out in leadership, teamwork, and implementing innovative technological solutions. Committed to excellence and continuous learning to generate value in every project.',
    highlight: 'Full-Stack Developer focused on building impactful digital solutions.',
    skills: {
      frontend: 'Frontend',
      backend: 'Backend',
      mobile: 'Mobile Development',
      databases: 'Databases',
      tools: 'Tools & Methodologies',
    },
  },
  projects: {
    title: 'Featured Projects',
    cta: 'View on GitHub',
    items: [
      {
        slug: 'medileny',
        title: 'Pollería Medileny',
        description:
          'POS and ERP system for a three-branch chicken restaurant: real-time floor plan, kitchen by stages, split payments at the register, roles and reports. Designed for mobile and desktop.',
        highlight: 'POS + ERP',
        tags: ['Laravel', 'React', 'Inertia', 'Tailwind', 'Reverb'],
        github: 'https://github.com/richardmalca/medileny-pos',
        shots: [
          'Floor with an open account and the menu to add orders',
          'Kitchen with orders by stage',
          'Daily register with totals by payment method',
          'Cash payment with change',
          'Floor on a phone',
          'Home on a phone',
        ],
      },
      {
        slug: 'rentamaq',
        title: 'Rentamaq',
        description:
          'Native Android app to browse, list and book heavy machinery in Cajamarca: photos, calendar and maintenance, bookings, payments and refunds. Presented at the Cajamarca 2024 Hackathon.',
        highlight: 'Android',
        tags: ['Kotlin', 'Jetpack Compose', 'Room', 'MVVM'],
        github: 'https://github.com/richardmalca/rentamaq',
        shots: [
          'Home screen with featured machinery',
          'Recent listings',
          'Excavator listing with prices and maintenance',
          'My account',
        ],
      },
    ],
  },
  education: {
    title: 'Education',
    items: [
      {
        degree: 'Bach. Systems Engineering',
        institution: 'Universidad Nacional de Cajamarca',
        date: 'July 2024',
        description:
          '5-year program focused on software engineering, databases, and project management.',
      },
    ],
  },
  certifications: {
    title: 'Certifications',
    items: [
      {
        title: 'Course: Create My First Website',
        issuer: 'CódigoFacilito',
        date: 'January 2025',
      },
      {
        title: 'Professional Excel Update',
        issuer: 'Skill – Newmont Yanacocha',
        date: 'December 2023',
      },
    ],
  },
  contact: {
    headline: "Let's talk",
    description: "Have a project in mind? Let's build something great together.",
    form: {
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send Message',
    },
    email: 'malcarichard6@gmail.com',
    phone: '(51) 936 036 606',
    whatsapp: '51936036606',
  },
};
