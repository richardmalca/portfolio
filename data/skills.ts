import type { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    titleKey: 'about.skills.frontend',
    skills: ['React', 'Next.js', 'HTML', 'CSS', 'JavaScript', 'Tailwind CSS'],
  },
  {
    titleKey: 'about.skills.backend',
    skills: ['Laravel (PHP)', 'Express.js (Node.js)', 'Microservices (Maven)'],
  },
  {
    titleKey: 'about.skills.mobile',
    skills: [
      'React Native',
      'Flutter',
      'FlutterFlow',
      'Dart',
      'Kotlin',
      'Jetpack Compose',
      'Java (Android Studio)',
    ],
  },
  {
    titleKey: 'about.skills.databases',
    skills: ['MySQL', 'SQLite', 'PostgreSQL'],
  },
  {
    titleKey: 'about.skills.tools',
    skills: ['Git', 'Scrum', 'Docker', 'REST API'],
  },
];
