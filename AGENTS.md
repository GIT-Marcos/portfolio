# AGENTS.md — portfolio-final

## Golden Rule
- `src/data/user-data.ts` → edit for content changes
- `src/features/` → create new components, never modify existing ones
- `src/App.tsx` → orchestrate sections (editable)

## Commands
- `npm run dev` — Vite dev server with HMR
- `npm run build` — production build; outputs a **single HTML file** in `dist/` (via `vite-plugin-singlefile`)
- `npx tsc --noEmit` — typecheck (no npm script for this; no linter or test runner configured)

## Architecture
- `src/data/user-data.ts` → raw JSON source of truth (exports `rawUserData as const`)
- `src/domain/mappers/portfolio-mapper.ts` → validates, transforms, defaults (casts via `as unknown as Record<string, unknown>`)
- `src/data/portfolio.ts` → exports the mapped `portfolio` domain entity
- `src/data/iconMap.ts` → maps tech names to icon components (shared)
- `src/data/sectionTitles.ts` → single source of truth for section labels
- `src/features/{contact,projects,largetechs,softskills}/` → feature components (add new features in new dirs)
- `src/features/*/` → new sections created here as needed
- `src/App.tsx` → orchestrates sections in fixed order: Contact → Projects → Techs → Skills (do not reorder)

## Data Constraints
- `type`: only `"desktop"` or `"cloud"` (invalid defaults to `"cloud"`)
- `status`: only `"completed"` or `"in-development"` (invalid defaults to `"completed"`)
- All URLs must start with `http://` or `https://` (invalid URLs are silently dropped)
- Skills data: `techs` (flat array, 18 icon-mapped items) and `skills` (flat array, 5 habilidad items — no icons)
- Contact links: `linkedin`, `github`, `portfolio` only
- Project links: `github`, `demo` only

## Path Alias
`@/*` maps to `src/*` (configured in both `tsconfig.json` and `vite.config.ts`).

## Style & Conventions
- TailwindCSS v4 (`@import "tailwindcss"` in `index.css`), custom `@theme` with JetBrains Mono font
- `cn()` utility from `clsx` + `tailwind-merge` for class merging
- TypeScript strict mode with `noUnusedLocals` and `noUnusedParameters`
