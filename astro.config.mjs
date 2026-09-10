// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  // ── Vite watcher: ignorar archivos del sistema en raíz de Windows ──────────
  //
  // chokidar (file watcher de Vite) puede intentar observar la raíz del
  // volumen (C:\) cuando plugins registran módulos virtuales con rutas
  // absolutas. En Windows, C:\ contiene archivos del sistema bloqueados
  // por el kernel (DumpStack.log.tmp, hiberfil.sys, pagefile.sys,
  // swapfile.sys). lstat() sobre esos archivos devuelve EINVAL → crash.
  // Filtrarlos antes de que chokidar intente acceder a ellos.
  vite: {
    server: {
      watch: {
        ignored: (path) => {
          const normalized = path.replace(/\\/g, '/');
          if (/^[A-Z]:\/(?:DumpStack\.log\.tmp|hiberfil\.sys|pagefile\.sys|swapfile\.sys)$/i.test(normalized)) {
            return true;
          }
          if (normalized.includes('/node_modules/')) {
            return true;
          }
          return false;
        },
      },
    },
  },
  integrations: [
    sitemap(),
    icon({
      include: {
        mdi: ['github', 'linkedin', 'email-outline', 'web', 'whatsapp', 'link-variant', 'arrow-right', 'map-marker-outline', 'magnify'],
        logos: ['java', 'typescript-icon', 'tailwindcss-icon', 'postgresql', 'css', 'git', 'react', 'spring-icon', 'hibernate'],
        devicon: ['junit', 'sqlite'],
        'skill-icons': ['astro'],
      },
    }),
  ],
});
