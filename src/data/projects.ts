import type { Technology } from './technologies';
import type { ExternalLinkCategory } from './externalLinks';

export type ProjectCategory = 'freelance' | 'personal-academic';

export interface ProjectImage {
  src: string;
  alt: string;
}

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
  images: ProjectImage[];
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
    images: [
      { src: '/placeholder.svg', alt: 'Vista principal del sistema de gestión de inventarios' },
      { src: '/placeholder.svg', alt: 'Vista de reportes del sistema de gestión de inventarios' },
      { src: '/placeholder.svg', alt: 'Vista de movimientos de entrada y salida del inventario' },
    ],
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
    images: [
      { src: '/placeholder.svg', alt: 'Captura del inicio del portfolio personal' },
      { src: '/placeholder.svg', alt: 'Captura de la sección de proyectos del portfolio' },
    ],
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
    images: [
      { src: '/placeholder.svg', alt: 'Captura de la documentación de la API REST' },
      { src: '/placeholder.svg', alt: 'Captura de los endpoints de la API REST' },
    ],
    category: 'freelance',
  },
];
