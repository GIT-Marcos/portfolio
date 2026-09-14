# AGENTS.md

Portfolio personal para un desarrollador de software. Stack: Astro 7 (SSG) + TypeScript. Contenido del sitio en español. Estado actual: sitio navegable con 4 páginas (`/`, `/about`, `/projects`, `/services`), 10 componentes en `src/components/`, datos estáticos en `src/data/` y assets en `src/assets/{images,services}/`.

## Comandos

- `npm run dev` — servidor de desarrollo en `localhost:4321`
- `npm run build` — build de producción a `dist/` (única verificación que funciona out-of-the-box; además regenera `.astro/types.d.ts`)
- `npm run preview` — sirve `dist/` localmente
- `npm run astro check` — validar tipos
- `npm run icons` — regenera favicons (16x16, 32x32, apple-touch-icon) y actualiza `theme-color` en `layout.astro` desde `public/favicon.svg`. Ejecutar tras modificar el SVG fuente.
- No hay lint, formatter ni tests configurados.

**Node >= 22.12.0** (engines en `package.json`).

## Convenciones intencionadas del proyecto

Definidas en `.opencode/agent/astro-planner.md` — seguirlas al construir:
- Componentes `.astro` puros, sin framework UI.
- Arquitectura CSS normativa (tokens + `@layer` + scoped + BEM + nesting): ver sección "Estilos: arquitectura CSS". `global.css` es la única fuente de tokens.
- Props de componentes con interfaces TypeScript exportadas.
- Datos estáticos en `src/data/`.
- Integración `@astrojs/sitemap` (ya instalada y configurada en `astro.config.mjs`).
- Integración `astro-icon` con collections `mdi`, `logos`, `devicon`, `skill-icons` (definidas en `astro.config.mjs > integrations > icon.include`). Uso: `<Icon name="collection:name" />`. Iconos consumidos por los componentes; nunca añadir paquetes de iconos nuevos sin revisar esta lista primero.
- Tipografía cargada vía `@fontsource/{inter,jetbrains-mono}` desde el frontmatter de `src/layouts/layout.astro`. **No** añadir `<link>` a Google Fonts ni fuentes remotas: ya están bundleadas en CSS y el layout ya las importa.
- Assets de imagen y SVG en `src/assets/{images,services}/`, consumidos vía `<Image>` de `astro:assets` (ver `ImageCarousel.astro` como referencia). Las imágenes en `public/` son estáticas sin procesar (favicons).
- Scripts cliente en bloques `<script>` dentro del mismo `.astro` (patrón de `ImageCarousel.astro`): import directo (bundled = module/deferred), selectores por `data-*`, llamada de inicialización al final del bloque (`initAll()`). **No** usar eventos `astro:page-load` (no hay router). Interactividad propia sólo cuando HTML/CSS estático no baste.
- Imports con alias (`@layouts/`, `@components/`, `@data/`, `@assets/`): usar alias para imports que cruzan directorios. Imports `./` entre archivos del mismo directorio son aceptables. Rutas relativas con `../` están prohibidas. Paths configurados en `tsconfig.json`.
- **Navegación MPA pura** (sin `ClientRouter`): transiciones cross-document nativas vía `@view-transition { navigation: auto; }` en `global.css`. Los scripts cliente se inicializan con llamada directa (bundled = module/deferred). **No usar** eventos `astro:page-load`/`astro:after-swap` (requieren el router que ya no está).
- `prefetch` (de Astro 3.4+) está activado en `astro.config.mjs` con `prefetchAll: true` y `defaultStrategy: 'viewport'`: todos los `<a>` internos se prefetchan al entrar en viewport. No añadir scripts de prefetch manual ni atributos `data-astro-prefetch`.
- `vite.server.watch.ignored` está configurado en `astro.config.mjs` para ignorar archivos del sistema de Windows en `C:\` (`DumpStack.log.tmp`, `hiberfil.sys`, `pagefile.sys`, `swapfile.sys`) que rompen chokidar con `EINVAL`. Es un workaround específico de plataforma — **no eliminar** aunque parezca innecesario en macOS/Linux; los desarrolladores en Windows lo necesitan para que el dev server arranque.

## Estilos: arquitectura CSS

El sitio usa **CSS nativo sin dependencias**: no hay Tailwind, SCSS, CSS-in-JS, CSS Modules ni frameworks UI. Todo estilo se escribe a mano siguiendo esta arquitectura. Está definida por decisión de arquitectura; cualquier cambio estructural requiere un plan previo.

### Reglas de oro

1. **Todo valor de diseño vive en tokens.** Los únicos valores permitidos en componentes son `var(--…)` o valores estructurales puros (unidades de layout: `100%`, `auto`, `clamp()`, `1px`, `calc()`). NUNCA hardcodees un color, radio, sombra, tamaño de fuente o espaciado que tenga token equivalente.
   - **Excepción (ASCII arts):** el tamaño de fuente de los ASCII arts se declara como medida literal en el campo `fontSize` de `src/data/ascii-art*.ts` (tipo `AsciiFontSize`) y se aplica vía custom property inline `--ascii-font-size`, consumida en el CSS como `var(--ascii-font-size, var(--font-size-sm))`. Es un valor de contenido, no de diseño: cada arte necesita su propia escala según su ancho en columnas, por lo que no tiene token equivalente por definición.

2. **Tokens en `:root`, en la capa `tokens` de `src/styles/global.css`.** Escalas existentes:
   - Colores: `--color-*` (incl. `--color-primary`, `--color-text`, `--color-bg`, `--color-surface`, `--color-muted` y los de redes `--color-github`, `--color-linkedin`, …)
   - Tipografía: `--font-size-*`, `--font-family-sans`, `--font-family-mono`
   - Espaciado: `--spacing-*`
   - Formas: `--radius-*`, `--shadow-*`
   - Breakpoints (solo referencia, ver regla 7): `--breakpoint-sm` 640, `--breakpoint-md` 768, `--breakpoint-lg` 1024

3. **Cascada con `@layer`**: `global.css` declara `@layer reset, tokens, base;`. El reset universal (`*`, `img`, `a`), los tokens y los estilos base de `html`/`body` viven cada uno en su capa, en ese orden.

4. **Los estilos scoped de los componentes van SIN capa (unlayered).** Es deliberado: en CSS el código sin capa siempre gana a cualquier `@layer`, así los componentes tienen prioridad natural sobre lo global, sin `!important`. NO muevas estilos de componentes a capas.

5. **BEM para nombres de clase**: `bloque__elemento--modificador` (p.ej. `hero__title`, `link-button--github`). Un bloque = un componente; cada elemento lleva el prefijo de su bloque. No uses clases sueltas globales para estilizar componentes.

6. **CSS nesting obligatorio** en los `<style>` scoped: estados (`&:hover`) y media queries se escriben anidados dentro de su selector. NO uses bloques `@media` de nivel superior ni selectores de estado sueltos.

7. **Media queries con valores literales**: `@media (max-width: 768px)`. NUNCA uses `var(--breakpoint-*)` dentro de `@media` (CSS no lo soporta); los tokens de breakpoint solo documentan la escala.

8. **`global.css` es el único CSS global** y contiene exclusivamente reset + tokens + base. Se importa una sola vez en `src/layouts/layout.astro` con `import '../styles/global.css';` en el frontmatter. NUNCA uses `<style is:global>` ni imports CSS global desde páginas.

9. **No añadas dependencias de estilos** (Tailwind, SCSS, CSS-in-JS, CSS Modules) sin justificarlas en un plan: en este proyecto serían redundantes o contradictorias con la arquitectura.

10. **Prohibido `!important`.** Si dos reglas chocan, la causa es estructural (BEM, capa, o un valor hardcodeado que debía ser token): corrígela en origen, no tapes el síntoma.

## Instrucciones locales obligatorias

- `.opencode/agent/astro-planner.md` — agente de planificación que **nunca edita archivos** (solo crea planes; el agente Build ejecuta). Usarla solo como referencia de convenciones y proceso de planificación.
- `.opencode/command/commit.md` — commits conventional con vista previa y confirmación explícita; define qué es un breaking change (p.ej. cambios en `astro.config.mjs`, eliminación de rutas). No commitear sin seguir este flujo.
- `.opencode/opencode.jsonc` — MCPs configurados: docs de Astro + context7. Para cambios de Astro 7, consultar el MCP de docs de Astro (prevalece sobre la skill).

## Skills instaladas (`.agents/skills/`)

- `astro` — ayuda a construir componentes y páginas Astro
- `seo-aeo-best-practices` — SEO, Open Graph, sitemap, datos estructurados
- `web-design-guidelines` — revisión de UI contra Web Interface Guidelines
- `best-practices` — seguridad, compatibilidad, calidad de código
- `caveman-commit` — generador de mensajes de commit conventional ultra-concisos
- `find-skills` — descubrir e instalar nuevas skills

## Repo

- Es un repositorio git (`.git/` existe en la raíz). Estado verificado: `git status` funciona normalmente.
- `.opencode/` es un contexto npm independiente (package.json y lockfile propios, ambos gitignored): no instalar ahí dependencias de la app ni tocar `.opencode/node_modules`.
- `scripts/generate-favicons.mjs` (invocado por `npm run icons`) genera favicons a partir de `public/favicon.svg`. **No confundir** con la carpeta `scrips/` (typo de `scripts/`, actualmente vacía y pendiente de eliminar; no afecta a la build).
- `dist/` y `.astro/` están en `.gitignore` y se regeneran con `npm run build` y `npm run astro check` respectivamente.
