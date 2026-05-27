export interface NavItem {
  id: string;
}

export const navigationItems: readonly NavItem[] = [
  { id: 'contact' },
  { id: 'projects' },
  { id: 'techs' },
  { id: 'skills' },
] as const;
