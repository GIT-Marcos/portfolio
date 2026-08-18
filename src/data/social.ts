import type { ExternalLinkCategory } from './externalLinks';

export interface SocialItem {
  name: string;
  url: string;
  icon: string;
  category: ExternalLinkCategory;
}

export const socialItems: SocialItem[] = [
  { name: 'WhatsApp', url: 'https://wa.me/5491100000000', icon: 'mdi:whatsapp', category: 'whatsapp' },
  { name: 'GitHub', url: 'https://github.com/placeholder', icon: 'mdi:github', category: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/placeholder', icon: 'mdi:linkedin', category: 'linkedin' },
  { name: 'Email', url: 'mailto:placeholder@email.com', icon: 'mdi:email-outline', category: 'email' },
];
