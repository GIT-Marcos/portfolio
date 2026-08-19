export interface Service {
  title: string;
  description: string;
  image: string;
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
    'Ofresco servicios como analista de sistemas y/o desarrollador de software. Disponible para trabajar freelance bajo demanda o en relación de dependencia. Si lo cree conveniente, escríbame.',
  contactMessage: 'Hola Marcos, me interesa tu servicio de desarrollo web.',
  contactSubject: 'Consulta por servicios',
};

export const services: Service[] = [
  {
    title: '¿Necesita un sitio web?',
    description:
      'Sitios web modernos, rápidos y accesibles con Astro y TypeScript: páginas institucionales, portfolios, landing pages y dashboards. Trabajo por etapas claras — análisis, diseño, implementación y validación — con comunicación constante y entregas a tiempo.',
    image: '/services/web-development.svg',
    imageAlt: 'Maqueta de ventana de navegador mostrando el esqueleto de una landing page',
  },
  {
    title: '¿Está buscando personal?',
    description:
      'Como analista de sistemas con foco en backend Java y programación orientada a objetos, cubro la parte que sostiene todo: análisis de requisitos, diseño, implementación de lógica de negocio, bases de datos y pruebas. Ideal para empresas o equipos que necesitan código mantenible y bien documentado.',
    image: '/services/software-development.svg',
    imageAlt: 'Ilustración de terminal con build de Maven exitoso y cilindro de base de datos',
  },
];
