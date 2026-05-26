export interface NavItem {
  id: string;
  label: string;
}

export const navigationItems: readonly NavItem[] = [
  { id: 'contact', label: 'Contact' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
] as const;
