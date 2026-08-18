export type ExternalLinkCategory =
  | 'github'
  | 'website'
  | 'whatsapp'
  | 'email'
  | 'linkedin'
  | 'generic';

export interface ExternalLinkCategoryConfig {
  /** Descripción por defecto si el link no provee una */
  defaultLabel: string;
  defaultIcon: string;
}

export const externalLinkCategories: Record<
  ExternalLinkCategory,
  ExternalLinkCategoryConfig
> = {
  github:   { defaultLabel: 'GitHub',   defaultIcon: 'mdi:github' },
  website:  { defaultLabel: 'Sitio web', defaultIcon: 'mdi:web' },
  whatsapp: { defaultLabel: 'WhatsApp', defaultIcon: 'mdi:whatsapp' },
  email:    { defaultLabel: 'Email',    defaultIcon: 'mdi:email-outline' },
  linkedin: { defaultLabel: 'LinkedIn', defaultIcon: 'mdi:linkedin' },
  generic:  { defaultLabel: 'Enlace',   defaultIcon: 'mdi:link-variant' },
};

export interface ExternalLink {
  label?: string;
  url: string;
  category: ExternalLinkCategory;
  icon?: string;
  subject?: string;
  message?: string;
}

export function buildContactUrl(link: ExternalLink): string {
  const { url, category, subject, message } = link;

  if (category === 'email' && (subject || message)) {
    const params = new URLSearchParams();
    if (subject) params.set('subject', subject);
    if (message) params.set('body', message);
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${params.toString()}`;
  }

  if (category === 'whatsapp' && message) {
    const params = new URLSearchParams();
    params.set('text', message);
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${params.toString()}`;
  }

  return url;
}
