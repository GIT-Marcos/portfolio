---
name: "react-tailwind-component"
description: "Guide for creating new UI components following the project's established patterns (functional components, cn(), TailwindCSS v4, lucide-react, progressive disclosure)."
triggers:
  - "create.*component"
  - "new component"
  - "\\.tsx"
  - "src/features/"
  - "interface.*Props"
  - "cn\\("
  - "tailwind"
---

## Component Patterns

- **Named exports only** — `export function ComponentName({ prop }: Props)`
- **No `export default`** — always named exports
- **Props interface** above the component: `interface ComponentNameProps { ... }`
- **No `React.FC` or `React.FunctionComponent`** — use direct function signature
- **Single responsibility** — each feature in its own `src/features/{name}/` directory

```typescript
interface MyComponentProps {
  items: ReadonlyArray<string>;
  type: SystemType;
}

export function MyComponent({ items, type }: MyComponentProps) {
  // ...
}
```

## `cn()` Utility

Import: `import { cn } from '@/utils/cn'`

Pattern: `cn('base-classes', condition && 'conditional', ternary ? 'a' : 'b')`

```typescript
// From ProjectCard.tsx
className={cn(
  'group relative rounded-xl border bg-slate-900/50 p-5',
  isCloud
    ? 'border-sky-500/20 hover:border-sky-500/40'
    : 'border-emerald-500/20 hover:border-emerald-500/40'
)}
```

- Never use string concatenation for conditional classes
- Always `cn()` for class merging

## TailwindCSS v4 Conventions

- **`@import "tailwindcss"`** in `index.css` (NOT `@tailwind` directives)
- **No `@apply`** — the codebase does not use it
- **Custom theme** in `@theme {}`:
  - `--font-mono: "JetBrains Mono", monospace`
  - `--color-background: #020617`
- **Design tokens**: use Tailwind defaults (slate, emerald, sky, violet, amber)
- **Dark theme is default**: `bg-slate-900/50` cards, `text-slate-100` headings, `text-slate-400` body
- **Grid layouts**: `grid gap-5 sm:grid-cols-2 lg:grid-cols-3`
- **Max width**: `max-w-5xl mx-auto`
- **Hover transitions**: `transition-colors`, `transition-all duration-300`
- **Card style**: `rounded-xl border bg-slate-900/50 p-5`

## Icon Usage (lucide-react)

```typescript
import { Github, ExternalLink } from 'lucide-react';

// Usage
<Github className="h-4 w-4 shrink-0" />
```

- Named imports from `'lucide-react'`
- Size via className: `h-4 w-4`, `h-5 w-5`
- Color via className: `text-sky-400`, `text-slate-500`
- Always add `shrink-0` in flex layouts
- Icons used in this codebase: `Mail`, `Phone`, `MapPin`, `Linkedin`, `Github`, `Globe`, `ExternalLink`

## Progressive Disclosure

Pre-compute booleans before render:

```typescript
// From ProjectCard.tsx
const hasLinks = github !== undefined || demo !== undefined;
const hasTechnicalFocus = technicalFocus !== undefined && technicalFocus.length > 0;

// Then in JSX:
{hasLinks && ( /* ... */ )}
{hasTechnicalFocus && ( /* ... */ )}
```

For optional single values: `{phone !== undefined && ( /* ... */ )}`
For empty arrays (sub-component): `if (items.length === 0) return null;`

## TypeScript Requirements

- **No `any`** — use `unknown` + type guards
- **`ReadonlyArray<T>`** for array props (not `T[]`)
- **Interfaces** for props/entity shapes
- **Path alias**: `@/domain/entities/portfolio` (or relative `../../domain/entities/portfolio`)
- Destructure props at the top of the component

## File Organization

```
src/features/{feature-name}/
  ├── {FeatureName}Section.tsx    # main section component
  └── {ComponentName}.tsx         # sub-component
```

- Import types from `@/domain/entities/portfolio`
- Import utilities from `@/utils/cn`
- Import icons from `'lucide-react'`

## Color Reference

| Accent | Usage | Hex/Tailwind |
|---|---|---|
| Sky (blue) | Cloud projects, Testing skill group | `text-sky-400`, `border-sky-500/20` |
| Emerald (green) | Desktop projects, Core skill group | `text-emerald-400`, `border-emerald-500/20` |
| Violet (purple) | AI & Tooling skill group | `text-violet-300`, `border-violet-500/20` |
| Amber (yellow) | WIP badge | `text-amber-400`, `border-amber-500/20` |
| Slate (gray) | Body text, muted elements | `text-slate-400`, `text-slate-500`, `border-slate-700` |
