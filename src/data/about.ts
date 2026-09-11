import { aboutAsciiArt, type AsciiArt } from '@data/ascii-art';

export interface AboutSection {
  title: string;
  body: string;
}

export interface AboutContent {
  heading: string;
  intro: string;
  sections: AboutSection[];
  cta: string;
  asciiArt: AsciiArt;
}

export const aboutContent: AboutContent = {
  heading: 'Sobre mí',
  intro:
    'Me apasiona la tecnología desde siempre y busco capitalizar esa pasión en soluciones que ayuden a los demás.',
  sections: [
    {
      title: 'Formación',
      body:
        'Técnico Superior en Análisis de Sistemas egresado del Instituto Superior Santo Domingo - ISSD. Tengo formación en en programación orientada a objetos, bases de datos, diseño de software, desarrollo web, inteligencia artificial y metodologías ágiles. Tengo un perfil general cercano a un full-stack aunque me considero más preparado en el sector back-end.',
    },
    {
      title: 'Enfoque',
      body:
        'Simplemente que la solución informática entregada sea provechosa para los clientes y los usuarios. Esto se logra teniendo bien claros los requisitos del usuario, entendiendo las necesidades del negocio y brindando un servicio que cumpla con las mejores prácticas del desarrollo de software.',
    },
    {
      title: 'Habilidades blandas',
      body:
        'Las ciencias tecnológicas están avanzando rápido y uno debe estar continuamente estudiándolas, el trabajo en equipo es una regla estándar en este rubro, y un sistema con problemas da problemas al usuario: capacidad de aprendizaje continuo, trabajo en equipo, comunicación efectiva, resolución de problemas son cualidades que siempre uno debe intentar mejorar si lo que busca es ser útil a un propósito sustancial como poblar el LinkedIn o pasar filtros ATS.',
    },
    {
      title: 'Inteligencia artificial - IA',
      body: 'Integro la IA en varias etapas durante el desarrollo para aumentar la productividad, automatizar procesos, varificaciones, entre otros. La inteligencia artificial es una más de varias herramientas con las que el desarrollador cuenta para cumplir su función y, es responsabilidad de este aplicarla de manera eficiente y en su justa medida. Si se usa por usar, sin controlar lo que la herramienta está haciendo, se terminarán generando más problemas, más costos y se pierde tiempo de trabajo en reparar los errores.'
    },
  ],
  cta:
    'Si usted tiene un proyecto en mente o busca un colaborador, no dude en contactarme.',
  asciiArt: aboutAsciiArt,
};
