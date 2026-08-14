export interface AboutSection {
  title: string;
  body: string;
}

export interface AboutContent {
  heading: string;
  intro: string;
  sections: AboutSection[];
  cta: string;
}

export const aboutContent: AboutContent = {
  heading: 'Sobre mí',
  intro:
    'Analista de Sistemas graduado con enfoque en desarrollo de software y arquitectura de aplicaciones web. Me interesa construir soluciones limpias, mantenibles y escalables.',
  sections: [
    {
      title: 'Formación',
      body:
        'Técnico Superior en Análisis de Sistemas. Durante mi formación adquirí bases sólidas en programación orientada a objetos, bases de datos, metodologías ágiles y diseño de software.',
    },
    {
      title: 'Enfoque',
      body:
        'Me especializo en desarrollo backend y frontend con tecnologías modernas. Creo en el código limpio, la documentación clara y las soluciones pragmáticas por sobre las sobre-ingenierías.',
    },
    {
      title: 'Habilidades blandas',
      body:
        'Comunicación efectiva, trabajo en equipo, resolución de problemas y capacidad de aprendizaje continuo. Valoro la retroalimentación y la mejora continua.',
    },
  ],
  cta:
    'Si tenés un proyecto en mente o buscás colaboración, no dudes en contactarme.',
};
