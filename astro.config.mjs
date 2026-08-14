// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [
    sitemap(),
    icon({
      include: {
        mdi: ['github', 'linkedin', 'email-outline', 'web', 'whatsapp', 'link-variant', 'arrow-right'],
        logos: ['java', 'typescript', 'javascript', 'nodejs', 'spring', 'mysql', 'postgresql', 'astro', 'css-3', 'html-5', 'git', 'docker-icon'],
      },
    }),
  ],
});