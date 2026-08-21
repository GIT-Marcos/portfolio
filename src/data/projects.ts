import type { Technology } from './technologies';
import type { ExternalLink } from './externalLinks';
import type { ImageMetadata } from 'astro';
import lufitImg1 from '@assets/images/1.png';
import lufitImg2 from '@assets/images/2.png';
import lufitImg3 from '@assets/images/3.png';

export type ProjectCategory = 'freelance' | 'personal-academic';

export interface ProjectImage {
  src: ImageMetadata;
  alt: string;
}

export type ProjectLink = ExternalLink;

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
    id: 'ludmi-fit',
    title: 'LudmiFit — Sitio web de servicios de entrenamiento personalizado',
    description:
      'Sitio web de asesorías de entrenamiento personalizado para mujeres, con planes de entrenamiento, seguimiento por WhatsApp, SEO completo y diseño responsive. Desarrollado con Astro y desplegado en Netlify.',
    technologies: [
      /*{ name: 'Astro', icon: 'logos:astro' }, */
      { name: 'TypeScript', icon: 'logos:typescript-icon' },
      { name: 'CSS', icon: 'logos:css' },
    ],
    links: [
      { url: 'https://ludmi-fit.netlify.app/', category: 'website', label: 'Ver sitio en vivo' },
      { url: 'https://github.com/GIT-Marcos/lufit', category: 'github', label: 'Código fuente' },
    ],
    isWIP: true,
    images: [
      { src: lufitImg1, alt: 'Captura de pantalla 1 del sitio LudmiFit' },
      { src: lufitImg2, alt: 'Captura de pantalla 2 del sitio LudmiFit' },
      { src: lufitImg3, alt: 'Captura de pantalla 3 del sitio LudmiFit' },
    ],
    category: 'freelance',
  },
  {
    id: 'biblocat',
    title: 'Sistema de gestión de back-up de biblioteca digital personal',
    description:
      'Sistema que permite llevar un inventario de una biblioteca digital y gestionar etiquetas para las fuentes.',
    technologies: [
      { name: 'Java', icon: 'logos:java' },
      { name: 'Spring Boot', icon: 'logos:spring-icon' },
      { name: 'PostgreSQL', icon: 'logos:postgresql' },
    ],
    links: [
      { url: 'asd', category: 'website', label: 'Sitio' },
      { url: 'https://github.com/GIT-Marcos/biblocat', category: 'github', label: 'Código fuente' },
    ],
    images: [
      { src: lufitImg1, alt: 'Vista principal del sistema de gestión de inventarios' },
      { src: lufitImg2, alt: 'Vista de reportes del sistema de gestión de inventarios' },
      { src: lufitImg3, alt: 'Vista de movimientos de entrada y salida del inventario' },
    ],
    category: 'personal-academic',
  },
  {
    id: 'portfolio-web',
    title: 'Portfolio Personal',
    description:
      'Portfolio personal desarrollado con Astro 7 (SSG) y TypeScript, con arquitectura CSS nativa (BEM + tokens), sistema de componentes modulares y despliegue estático. Incluye secciones de perfil, proyectos, servicios y sobre mí.',
    technologies: [
      /*{ name: 'Astro', icon: 'logos:astro' }, */
      { name: 'TypeScript', icon: 'logos:typescript-icon' },
      { name: 'CSS', icon: 'logos:css' },
    ],
    links: [
      { url: 'https://github.com/placeholder/portfolio', category: 'github' },
    ],
    images: [
      { src: lufitImg1, alt: 'Vista principal del portfolio con presentación profesional' },
      { src: lufitImg2, alt: 'Sección de proyectos del portfolio' },
    ],
    category: 'personal-academic',
  },
  {
    id: 'flashcards',
    title: 'Aplicación para estudiar - Flashcards',
    description:
      'Aplicación web que permite al usuario estudiar usando el modelo de repetición espaciada SM-2.',
    technologies: [
      { name: 'Java', icon: 'logos:java' },
      { name: 'Spring Boot', icon: 'logos:spring-icon' },
      { name: 'PostgreSQL', icon: 'logos:postgresql' },
      { name: 'React', icon: 'logos:react' },
      { name: 'TypeScript', icon: 'logos:typescript-icon' },
      { name: 'Tailwind', icon: 'logos:tailwindcss-icon' },
    ],
    links: [
      { url: 'https://github.com/placeholder/portfolio', category: 'github' },
    ],
    images: [
      { src: lufitImg1, alt: 'Vista principal del portfolio con presentación profesional' },
      { src: lufitImg2, alt: 'Sección de proyectos del portfolio' },
    ],
    category: 'personal-academic',
  },
];

export interface ProjectsPageContent {
  heading: string;
  intro: string;
}

export const projectsPageContent: ProjectsPageContent = {
  heading: 'Proyectos',
  intro:
    'Sitios web, APIs y sistemas construidos con tecnologías modernas. Una selección de proyectos que he creado desde el análisis, pasando por el diseño y la implementación del software.',
};
