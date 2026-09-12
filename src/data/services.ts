import type { ImageMetadata } from 'astro';
import webDevImg from '@assets/services/web-development.svg';
import softwareDevImg from '@assets/services/software-development.svg';
import aiDevImg from '@assets/services/ai-development.svg';
import analisisImg from '@assets/services/analisis-sistemas.svg';

export interface Service {
  title: string;
  description: string;
  image: ImageMetadata;
  imageAlt: string;
}

export interface ServicesPageContent {
  heading: string;
  intro: string;
  /** Mensaje y asunto para los botones de contacto del hero */
  contactMessage: string;
  contactSubject: string;
}

export const servicesPageContent: ServicesPageContent = {
  heading: 'Servicios',
  intro:
    'Desarrollo de software y diseño web estático a medida: sitios rápidos, accesibles y sistemas con lógica sólida. Disponible para trabajos freelance por proyecto o en relación de dependencia. Si tiene un proyecto en mente, no dude en escribirme.',
  contactMessage: 'Hola Marcos, te contacto desde tu portfolio.',
  contactSubject: 'Consulta por servicios',
};

export const services: Service[] = [
  {
    title: 'Sitios web rápidos y accesibles',
    description:
      '¿Quiere una página que cargue al instante, se vea bien en cualquier dispositivo y sea comprensible para todos sus visitantes? Diseño y desarrollo sitios con Astro y TypeScript, optimizados para rendimiento, SEO y accesibilidad. Proceso por etapas con entregas puntuales.',
    image: webDevImg,
    imageAlt: 'Maqueta de ventana de navegador mostrando el esqueleto de una landing page',
  },
  {
    title: 'Desarrollo backend Java',
    description:
      'APIs REST, lógica de negocio sólida y programación orientada a objetos. Desarrollo siguiendo las mejores prácticas y estándares en APIs, bases de datos e integración de servicios, siempre buscando un código mantenible, bien documentado y listo para integrarse con cualquier front-end.',
    image: softwareDevImg,
    imageAlt: 'Ilustración de terminal con build de Maven exitoso y cilindro de base de datos',
  },
  {
    title: 'Desarrollo e integración con inteligencia artificial',
    description:
      'Aplico esta tecnología en el desarrollo de código y en la optimización de procesos de trabajo buscando darle un uso consciente a las necesidades de cada situación.',
    image: aiDevImg,
    imageAlt: 'Terminal con código de integración de IA y diagrama de red neuronal',
  },
  {
    title: 'Análisis de sistemas y consultoría',
    description:
      'Levantamiento de requisitos, diseño de software y documentación técnica clara. Convierto una idea o un problema de negocio en una especificación accionable que pueda implementarse, aplicando metodologías ágiles.',
    image: analisisImg,
    imageAlt: 'Ilustración de tablero ágil con columnas de pendiente, en curso y hecho',
  },
];
