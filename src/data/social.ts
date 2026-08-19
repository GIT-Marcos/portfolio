import type { ExternalLink, ExternalLinkCategory } from './externalLinks';
import { contactUrls } from './profile';

export type SocialItem = ExternalLink;

export const socialItems: SocialItem[] = [
  {
    label: 'WhatsApp',
    url: contactUrls.whatsapp,
    icon: 'mdi:whatsapp',
    category: 'whatsapp',
    message: 'Hola Marcos, te contacto desde tu portfolio.',
  },
  { label: 'GitHub', url: 'https://github.com/placeholder', icon: 'mdi:github', category: 'github' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/placeholder', icon: 'mdi:linkedin', category: 'linkedin' },
  {
    label: 'Email',
    url: contactUrls.email,
    icon: 'mdi:email-outline',
    category: 'email',
    subject: 'Contacto desde tu portfolio',
    message: 'Hola Marcos, te contacto desde tu portfolio.',
  },
];

export function getSocialItems(...categories: ExternalLinkCategory[]): SocialItem[] {
  return socialItems.filter((item) => categories.includes(item.category));
}
