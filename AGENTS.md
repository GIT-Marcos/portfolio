# AGENTS.md

Portfolio personal para un desarrollador de software. Stack: Astro 7 (SSG) + TypeScript. Estado inicial: scaffold `minimal` de Astro sin contenido real. Contenido del sitio en español.

## Comandos

- `npm run dev` — servidor de desarrollo en `localhost:4321`
- `npm run build` — build de producción a `dist/` (única verificación que funciona out-of-the-box; además regenera `.astro/types.d.ts`)
- `npm run preview` — sirve `dist/` localmente
- `npm run astro check` validar tipos
- No hay lint, formatter ni tests configurados.

**Node >= 22.12.0** (engines en `package.json`).

## Convenciones intencionadas del proyecto

Definidas en `.opencode/agent/astro-planner.md` — seguirlas al construir:
- Componentes `.astro` puros, sin framework UI.
- Arquitectura CSS normativa (tokens + `@layer` + scoped + BEM + nesting): ver sección "Estilos: arquitectura CSS". `global.css` es la única fuente de tokens.
- Props de componentes con interfaces TypeScript exportadas.
- Datos estáticos en `src/data/`.
- Integración `@astrojs/sitemap` (ya instalada y configurada en `astro.config.mjs`).
- Imports con alias (`@layouts/`, `@components/`, `@data/`, `@assets/`): usar alias para imports que cruzan directorios. Imports `./` entre archivos del mismo directorio son aceptables. Rutas relativas con `../` están prohibidas. Paths configurados en `tsconfig.json`.

## Estilos: arquitectura CSS

El sitio usa **CSS nativo sin dependencias**: no hay Tailwind, SCSS, CSS-in-JS, CSS Modules ni frameworks UI. Todo estilo se escribe a mano siguiendo esta arquitectura. Está definida por decisión de arquitectura; cualquier cambio estructural requiere un plan previo.

### Reglas de oro

1. **Todo valor de diseño vive en tokens.** Los únicos valores permitidos en componentes son `var(--…)` o valores estructurales puros (unidades de layout: `100%`, `auto`, `clamp()`, `1px`, `calc()`). NUNCA hardcodees un color, radio, sombra, tamaño de fuente o espaciado que tenga token equivalente.

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

- El directorio **aún no es un repositorio git** (no hay `.git`): `git status`/`git commit` fallarán hasta `git init`.
- `.opencode/` es un contexto npm independiente (package.json y lockfile propios, ambos gitignored): no instalar ahí dependencias de la app ni tocar `.opencode/node_modules`.
