import type { Technology } from './technologies';
import type { ExternalLink } from './externalLinks';
import type { ImageMetadata } from 'astro';
import lufitImg1 from '@assets/images/1.png';
import lufitImg2 from '@assets/images/2.png';
import lufitImg3 from '@assets/images/3.png';
import superServiceImg1 from '@assets/images/s1.png';
import superServiceImg2 from '@assets/images/s2.png';
import superServiceImg3 from '@assets/images/s3.png';
import superServiceImg4 from '@assets/images/s4.png';
import superServiceImg5 from '@assets/images/s5.png';
import flashcardsImg1 from '@assets/images/f1.png';
import flashcardsImg2 from '@assets/images/f2.png';
import flashcardsImg3 from '@assets/images/f3.png';
import flashcardsImg4 from '@assets/images/f4.png';
import biblosImg1 from '@assets/images/b1.png';
import biblosImg2 from '@assets/images/b2.png';

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
      'Sitio web estático de asesorías y entrenamiento para mujeres. Integra lo necesario para un negocio: diseño personalizado, redes sociales, optimización para buscadores, SEO completo y diseño responsive.',
    technologies: [
      { name: 'Astro', icon: 'skill-icons:astro' },
      { name: 'TypeScript', icon: 'logos:typescript-icon' },
      { name: 'CSS', icon: 'logos:css' },
    ],
    links: [
      { url: 'https://ludmi-fit.netlify.app/', category: 'website', label: 'Ver sitio web' },
      { url: 'https://github.com/GIT-Marcos/lufit', category: 'github', label: 'Código fuente' },
    ],
    images: [
      { src: lufitImg1, alt: 'Captura de pantalla 1 del sitio LudmiFit' },
      { src: lufitImg2, alt: 'Captura de pantalla 2 del sitio LudmiFit' },
      { src: lufitImg3, alt: 'Captura de pantalla 3 del sitio LudmiFit' },
    ],
    category: 'freelance',
  },
  {
    id: 'biblos',
    title: 'Biblos - Sistema de gestión de back-up de biblioteca digital personal',
    description:
      'Sistema que permite generar los metadatos de fuentes guardadas en una biblioteca digital local. Tiene 2 partes: el agente que scanea un directorio y crea el archivo de base de datos, y el sitio web que permite subir para leer, editar metadatos y descargar el archivo modificado.',
    technologies: [
      { name: 'Java', icon: 'logos:java' },
      { name: 'SQLite', icon: 'devicon:sqlite' },
      { name: 'React', icon: 'logos:react' },
      { name: 'TypeScript', icon: 'logos:typescript-icon' },
      { name: 'CSS', icon: 'logos:css' },
    ],
    links: [
      { url: 'https://biblos-editor.vercel.app/', category: 'website', label: 'Ver sitio web' },
      { url: 'https://github.com/GIT-Marcos/biblos', category: 'github', label: 'Código fuente' },
    ],
    images: [
      { src: biblosImg1, alt: 'Lista de fuentas guardadas en la base de datos' },
      { src: biblosImg2, alt: 'Consola guardando fuentes' },
    ],
    category: 'personal-academic',
    isWIP: true,
  },
  {
    id: 'flashcards',
    title: 'Aplicación de estudio - Flashcards',
    description:
      'Aplicación web que permite al usuario estudiar usando el modelo de repetición espaciada SM-2. Permite crear mazos con tarjetas que el usuario debe memorizar y, en sesiones de estudio, este revisa las terjetas evaluando qué tanto pudo recordar.',
    technologies: [
      { name: 'Java', icon: 'logos:java' },
      { name: 'Spring Boot', icon: 'logos:spring-icon' },
      { name: 'PostgreSQL', icon: 'logos:postgresql' },
      { name: 'React', icon: 'logos:react' },
      { name: 'TypeScript', icon: 'logos:typescript-icon' },
      { name: 'Tailwind', icon: 'logos:tailwindcss-icon' },
    ],
    links: [
    { url: 'https://study-flashcards-web.vercel.app', category: 'website', label: 'Ver sitio web' },
      { url: 'https://github.com/GIT-Marcos/flashcards', category: 'github', label: 'Código fuente' },
    ],
    images: [
      { src: flashcardsImg1, alt: 'Lista de tarjetas dentro un mazo' },
      { src: flashcardsImg2, alt: 'Gráfico de estadísticas de reviews' },
      { src: flashcardsImg3, alt: 'Vista de lista de sesiones de estudio' },
      { src: flashcardsImg4, alt: 'Vista de login de la aplicación' },
    ],
    category: 'personal-academic',
    isWIP: true,
  },
  {
    id: 'super-service',
    title: 'Super Service',
    description:
      'Aplicación de escritorio empresarial para la gestión de taller mecánico. Permite gestionar órdenes de trabajo, repuestos, historial de ventas y más. Genera reportes con gráficos y estadísticas. Este fue el proyecto de fin de carrera.',
    technologies: [
      { name: 'Java/JavaFx', icon: 'logos:java' },
      { name: 'PostgreSQL', icon: 'logos:postgresql' },
      { name: 'Hibernate', icon: 'logos:hibernate' },
      { name: 'JUnit', icon: 'devicon:junit' },
    ],
    links: [
      {
        url: 'https://github.com/GIT-Marcos/super-service',
        category: 'github',
        label: 'Código fuente',
      },
    ],
    images: [
      { src: superServiceImg1, alt: 'Vista de productos del depósito' },
      { src: superServiceImg2, alt: 'Vista de carga de nueva venta' },
      { src: superServiceImg3, alt: 'Listado de services' },
      { src: superServiceImg4, alt: 'Reporte de ingresos por repuesto' },
      { src: superServiceImg5, alt: 'Detalles estadísticos de un cliente' },
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
