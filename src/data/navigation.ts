export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/services/' },
  { label: 'Proyectos', href: '/projects/' },
  { label: 'Sobre mí', href: '/about/' },
];
