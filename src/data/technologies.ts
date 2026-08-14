export interface Technology {
  name: string;
  icon: string;
  alt: string;
}

export const technologies: Technology[] = [
  { name: 'Java', icon: 'logos:java', alt: 'Java' },
  { name: 'TypeScript', icon: 'logos:typescript', alt: 'TypeScript' },
  { name: 'JavaScript', icon: 'logos:javascript', alt: 'JavaScript' },
  { name: 'Node.js', icon: 'logos:nodejs', alt: 'Node.js' },
  { name: 'Spring Boot', icon: 'logos:spring', alt: 'Spring Boot' },
  { name: 'MySQL', icon: 'logos:mysql', alt: 'MySQL' },
  { name: 'PostgreSQL', icon: 'logos:postgresql', alt: 'PostgreSQL' },
  { name: 'Astro', icon: 'logos:astro', alt: 'Astro' },
  { name: 'CSS', icon: 'logos:css-3', alt: 'CSS' },
  { name: 'HTML', icon: 'logos:html-5', alt: 'HTML' },
  { name: 'Git', icon: 'logos:git', alt: 'Git' },
  { name: 'Docker', icon: 'logos:docker-icon', alt: 'Docker' },
];
