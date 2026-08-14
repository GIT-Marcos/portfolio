import type { ExternalLink } from './externalLinks';

export interface Service {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  contacts: ExternalLink[];
}

export interface ServicesPageContent {
  heading: string;
  intro: string;
}

const contactLinks: ExternalLink[] = [
  { label: 'Email', url: 'mailto:placeholder@email.com', category: 'email' },
  { label: 'WhatsApp', url: 'https://wa.me/0000000000000', category: 'whatsapp' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/placeholder', category: 'linkedin' },
];

export const servicesPageContent: ServicesPageContent = {
  heading: 'Servicios',
  intro:
    'Ofrezco desarrollo de software de forma freelance y también como trabajo convencional: desde sitios web rápidos y accesibles hasta sistemas con lógica de negocio sólida. Elijo la tecnología según el problema, no al revés.',
};

export const services: Service[] = [
  {
    title: 'Desarrollo web freelance',
    description:
      'Sitios web modernos, rápidos y accesibles con Astro y TypeScript: páginas institucionales, portfolios, landing pages y dashboards. Trabajo por etapas claras — análisis, diseño, implementación y validación — con comunicación constante y entregas a tiempo.',
    image: '/placeholder.svg',
    imageAlt: 'Ilustración de desarrollo web freelance',
    contacts: contactLinks,
  },
  {
    title: 'Desarrollo de software en general',
    description:
      'Como analista de sistemas con foco en backend Java y programación orientada a objetos, cubro la parte que sostiene todo: análisis de requisitos, diseño, implementación de lógica de negocio, bases de datos y pruebas. Ideal para empresas o equipos que necesitan código mantenible y bien documentado.',
    image: '/placeholder.svg',
    imageAlt: 'Ilustración de desarrollo de software',
    contacts: contactLinks,
  },
];
