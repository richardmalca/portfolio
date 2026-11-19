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
  title: string;
  description: string;
  highlight?: string;
  tags: string[];
  github?: string;
  demo?: string;
}
