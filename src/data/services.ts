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
    'Desarrollo de software y diseño web a medida: sitios rápidos, accesibles y sistemas con lógica sólida. Trabajo freelance por proyecto o como analista en relación de dependencia. Si tiene un proyecto en mente, no dude en escribirme.',
  contactMessage: 'Hola Marcos, me interesa tu servicio de desarrollo web.',
  contactSubject: 'Consulta por servicios',
};

export const services: Service[] = [
  {
    title: 'Sitios web rápidos y accesibles',
    description:
      '¿Quiere una página que cargue al instante, se vea bien en cualquier dispositivo y sea comprensible para todos sus visitantes? Diseño y desarrollo sitios con Astro y TypeScript, optimizados para rendimiento, SEO y accesibilidad. Proceso por etapas con entregas puntuales.',
    image: '/services/web-development.svg',
    imageAlt: 'Maqueta de ventana de navegador mostrando el esqueleto de una landing page',
  },
  {
    title: 'Desarrollo backend Java',
    description:
      'APIs REST y lógica de negocio sólida con Java y programación orientada a objetos: diseño de bases de datos, implementación de servicios y pruebas automatizadas. Código mantenible, bien documentado y listo para integrarse con cualquier front-end.',
    image: '/services/software-development.svg',
    imageAlt: 'Ilustración de terminal con build de Maven exitoso y cilindro de base de datos',
  },
  {
    title: 'Análisis de sistemas y consultoría',
    description:
      'Levantamiento de requisitos, diseño de software y documentación técnica clara. Convierto una idea o un problema de negocio en una especificación accionable que su equipo pueda implementar, aplicando metodologías ágiles.',
    image: '/services/analisis-sistemas.svg',
    imageAlt: 'Ilustración de tablero ágil con columnas de pendiente, en curso y hecho',
  },
];
