# AGENTS.md — portfolio-final

## Golden Rule
Only edit `src/data/user-data.ts` for content changes. UI components under `src/features/` and `src/App.tsx` are read-only.

## Commands
- `npm run dev` — Vite dev server with HMR
- `npm run build` — production build; outputs a **single HTML file** in `dist/` (via `vite-plugin-singlefile`)
- `npx tsc --noEmit` — typecheck (no npm script for this; no linter or test runner configured)

## Architecture
- `src/data/user-data.ts` → raw JSON source of truth (exports `rawUserData as const`)
- `src/domain/mappers/portfolio-mapper.ts` → validates, transforms, defaults (casts via `as unknown as Record<string, unknown>`)
- `src/data/portfolio.ts` → exports the mapped `portfolio` domain entity
- `src/features/{contact,projects,skills}/` → read-only UI components
- `src/App.tsx` → fixed layout order: Contact → Projects → Skills (do not reorder)

## Data Constraints
- `type`: only `"desktop"` or `"cloud"` (invalid defaults to `"cloud"`)
- `status`: only `"completed"` or `"in-development"` (invalid defaults to `"completed"`)
- All URLs must start with `http://` or `https://` (invalid URLs are silently dropped)
- Skill groups: `core` (green), `ai_tools` (purple), `testing` (blue) — no other groups render
- Contact links: `linkedin`, `github`, `portfolio` only
- Project links: `github`, `demo` only

## Path Alias
`@/*` maps to `src/*` (configured in both `tsconfig.json` and `vite.config.ts`).

## Style & Conventions
- TailwindCSS v4 (`@import "tailwindcss"` in `index.css`), custom `@theme` with JetBrains Mono font
- `cn()` utility from `clsx` + `tailwind-merge` for class merging
- TypeScript strict mode with `noUnusedLocals` and `noUnusedParameters`
