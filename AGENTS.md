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
- CSS con BEM y variables CSS (`--color-primary`, `--color-text`, ...) en `src/styles/global.css`.
- Props de componentes con interfaces TypeScript exportadas.
- Datos estáticos en `src/data/`.
- Integración `@astrojs/sitemap` (ya instalada y configurada en `astro.config.mjs`).

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
