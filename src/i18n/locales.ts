export type Locale = 'es' | 'en';

export const translations = {
  es: {
    'section.contact': 'Contacto',
    'section.projects': 'Proyectos',
    'section.techs': 'Tecnologías',
    'section.skills': 'Habilidades',

    'aria.copyEmail': 'Copiar email',
    'aria.workInProgress': 'Trabajo en progreso',
    'aria.aiBuilt': 'Construido con asistencia de IA',
    'aria.githubRepo': '{name} — Repositorio de GitHub',
    'aria.liveDemo': '{name} — Demo en vivo',
    'aria.backToTop': 'Volver al inicio',
    'aria.sectionNav': 'Navegación de secciones',
    'aria.themeToggle': 'Cambiar a modo claro/oscuro',

    'badge.wip': 'WIP',
    'badge.aiOptimized': 'AI-Optimized',

    'footer.copyright': '© 2026 {name}',
    'footer.builtWith': 'Construido con React + TypeScript + Vite',
    'footer.source': 'Código fuente',
  },
  en: {
    'section.contact': 'Contact',
    'section.projects': 'Projects',
    'section.techs': 'Technologies',
    'section.skills': 'Skills',

    'aria.copyEmail': 'Copy email',
    'aria.workInProgress': 'Work in progress',
    'aria.aiBuilt': 'Built with AI assistance',
    'aria.githubRepo': '{name} — GitHub Repository',
    'aria.liveDemo': '{name} — Live Demo',
    'aria.backToTop': 'Back to top',
    'aria.sectionNav': 'Section navigation',
    'aria.themeToggle': 'Switch theme',

    'badge.wip': 'WIP',
    'badge.aiOptimized': 'AI-Optimized',

    'footer.copyright': '© 2026 {name}',
    'footer.builtWith': 'Built with React + TypeScript + Vite',
    'footer.source': 'Source',
  },
} as const;

export type TranslationKey = keyof typeof translations.es;
