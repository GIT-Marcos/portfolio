export interface Technology {
  name: string;
  icon: string;
  iconSize?: number;
}

export const technologies: Technology[] = [
  { name: 'Java', icon: 'logos:java' },
  { name: 'TypeScript', icon: 'logos:typescript-icon' },
  { name: 'Tailwind',icon: 'tailwindcss-icon' },
  { name: 'Spring Boot', icon: 'logos:spring-icon' },
  { name: 'PostgreSQL', icon: 'logos:postgresql' },
  { name: 'CSS', icon: 'logos:css-3' },
  { name: 'Git', icon: 'logos:git' },
];
