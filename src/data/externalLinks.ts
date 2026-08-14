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
}
