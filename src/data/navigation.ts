import { sectionTitles } from './sectionTitles';

export interface NavItem {
  id: string;
  label: string;
}

export const navigationItems: readonly NavItem[] = [
  { id: 'contact', label: sectionTitles.contact },
  { id: 'projects', label: sectionTitles.projects },
  { id: 'techs', label: sectionTitles.techs },
  { id: 'skills', label: sectionTitles.skills },
] as const;
