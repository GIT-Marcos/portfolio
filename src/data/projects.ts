import type { Technology } from './technologies';
import type { ExternalLinkCategory } from './externalLinks';

export type ProjectCategory = 'freelance' | 'personal-academic';

export interface ProjectLink {
  label?: string;
  url: string;
  category: ExternalLinkCategory;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: Technology[];
  links: ProjectLink[];
  isWIP?: boolean;
  image: string;
  imageAlt: string;
  category: ProjectCategory;
}

export const projects: Project[] = [
  {
    id: 'sistema-gestion',
    title: 'Sistema de Gestión de Inventarios',
    description:
      'Aplicación web para control de stock, movimientos de entrada y salida, y reportes. Desarrollada con arquitectura MVC y base de datos relacional.',
    technologies: [
      { name: 'Java', icon: 'logos:java', alt: 'Java' },
      { name: 'Spring Boot', icon: 'logos:spring', alt: 'Spring Boot' },
      { name: 'MySQL', icon: 'logos:mysql', alt: 'MySQL' },
    ],
    links: [
      { url: 'https://github.com/placeholder/inventario', category: 'github' },
    ],
    image: '/placeholder.svg',
    imageAlt: 'Captura del sistema de gestión de inventarios',
    category: 'personal-academic',
  },
  {
    id: 'portfolio-web',
    title: 'Portfolio Personal',
    description:
      'Sitio web estático para presentación profesional, construido con Astro para máximo rendimiento y SEO.',
    technologies: [
      { name: 'Astro', icon: 'logos:astro', alt: 'Astro' },
      { name: 'TypeScript', icon: 'logos:typescript', alt: 'TypeScript' },
      { name: 'CSS', icon: 'logos:css-3', alt: 'CSS' },
    ],
    links: [
      { url: 'https://github.com/placeholder/portfolio', category: 'github' },
    ],
    isWIP: true,
    image: '/placeholder.svg',
    imageAlt: 'Captura del portfolio personal',
    category: 'personal-academic',
  },
  {
    id: 'api-rest',
    title: 'API REST de Servicios',
    description:
      'API RESTful con autenticación JWT, endpoints documentados y testing automatizado.',
    technologies: [
      { name: 'Node.js', icon: 'logos:nodejs', alt: 'Node.js' },
      { name: 'TypeScript', icon: 'logos:typescript', alt: 'TypeScript' },
      { name: 'PostgreSQL', icon: 'logos:postgresql', alt: 'PostgreSQL' },
    ],
    links: [
      { url: 'https://github.com/placeholder/api-rest', category: 'github' },
    ],
    isWIP: true,
    image: '/placeholder.svg',
    imageAlt: 'Captura de la API REST',
    category: 'freelance',
  },
];
