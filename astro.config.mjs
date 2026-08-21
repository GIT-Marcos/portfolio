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
        mdi: ['github', 'linkedin', 'email-outline', 'web', 'whatsapp', 'link-variant', 'arrow-right', 'map-marker-outline', 'magnify'],
        logos: ['java', 'typescript-icon', 'tailwindcss-icon', 'postgresql', 'css-3', 'git', 'react', 'spring-icon'],
      },
    }),
  ],
});
