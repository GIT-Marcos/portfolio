export interface SocialItem {
  name: string;
  url: string;
  icon: string;
}

export const socialItems: SocialItem[] = [
  { name: 'GitHub', url: 'https://github.com/placeholder', icon: 'mdi:github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/placeholder', icon: 'mdi:linkedin' },
  { name: 'Email', url: 'mailto:placeholder@email.com', icon: 'mdi:email-outline' },
];
