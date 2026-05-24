---
name: "typescript-strict"
description: "Enforce TypeScript strict mode conventions including discriminated unions, no-any rules, @/ alias, and the mapper's type casting pattern."
triggers:
  - "\\.ts$"
  - "\\.tsx$"
  - "interface "
  - "type "
  - "as any"
  - "noUnused"
  - "strict.*true"
  - "Record<string"
  - "import.*from '@/'"
---

## Strict Mode Settings (tsconfig.json)

```json
{
  "strict": true,                    // all strict checks enabled
  "noUnusedLocals": true,            // error on unused local variables
  "noUnusedParameters": true,        // error on unused function params
  "noFallthroughCasesInSwitch": true // no implicit fallthrough
}
```

## Discriminated Unions

```typescript
export type SystemType = 'desktop' | 'cloud';
export type ProjectStatus = 'completed' | 'in-development';
```

- Guard functions in the mapper use strict literal comparison:
  ```typescript
  function isSystemType(value: unknown): value is SystemType {
    return value === 'desktop' || value === 'cloud';
  }
  ```
- **Never widen to `string`** — always use the literal union type
- Invalid values are handled by the mapper, not by widening

## `as unknown as Record<string, unknown>` Pattern

Used in `portfolio-mapper.ts` and `portfolio.ts` for safe JSON-to-domain casting:

```typescript
// portfolio.ts — entry point
export const portfolio = mapPortfolio(rawUserData as unknown as Record<string, unknown>);

// Sub-objects use the same pattern
const personalInfoRaw = (raw.personal_info ?? {}) as Record<string, unknown>;
```

- **Do NOT use `as any`** — this is the correct pattern
- Raw JSON `rawUserData` is intentionally untyped; the mapper is the single validation boundary
- TypeScript type predicates (`value is string`, `value is SystemType`) narrow from `unknown`

## No `any` Rule

The project has **zero** uses of `any`. Use these patterns instead:

| Instead of `any` | Use |
|---|---|
| `function fn(x: any)` | `function fn(x: unknown)` |
| `(x as any).prop` | `(x as Record<string, unknown>).prop` |
| `isString(x: any)` | `typeof x === 'string'` |
| `arr.filter(x => x)` | `arr.filter((x): x is string => typeof x === 'string')` |
| Union check | `value === 'a' \|\| value === 'b'` |

Exception: React event types are fine (e.g., `React.ChangeEvent<HTMLInputElement>`).

## `@/` Path Alias

Configured in `tsconfig.json` and `vite.config.ts`:

```typescript
// Prefer @/ for new files
import { Portfolio } from '@/domain/entities/portfolio';
import { cn } from '@/utils/cn';

// Relative imports are acceptable in existing files for consistency
import type { Project } from '../../domain/entities/portfolio';
```

## Type Definition Conventions

| What | Convention | Example |
|---|---|---|
| Data shapes | `interface` | `interface Project { ... }` |
| Union types | `type` alias | `type SystemType = 'desktop' \| 'cloud'` |
| Arrays | `ReadonlyArray<T>` | `stack: ReadonlyArray<string>` |
| Optional fields | `?` suffix | `technicalFocus?: ReadonlyArray<string>` |
| Props interface | `ComponentNameProps` | `interface ProjectCardProps` |
| Components | `export function` | `export function ProjectCard({ project }: ProjectCardProps)` |
| Constants/utilities | `export const` | `export const cn = ...` |

## Safe Access Patterns

```typescript
// Nullish coalescing
const contactRaw = (raw.contact ?? {}) as Record<string, unknown>;

// Optional chaining
if (links?.linkedin !== undefined) { /* ... */ }

// Array access is safe — mapper always returns arrays (possibly empty)
projects.map(p => ...)  // works even if empty

// Type narrowing with early returns
if (items.length === 0) return null;
```

## Type System Constraints

| Type | Allowed Keys |
|---|---|
| `ProjectLinks` | `github`, `demo` only |
| `ContactLinks` | `linkedin`, `github`, `portfolio` only |
| `Skills` | `core`, `aiTools`, `testing` only |
| `ContactInfo` | `email` required; `phone`, `location`, `availability`, `links` optional |
| `Project` | `id`, `name`, `type`, `status`, `links`, `stack`, `description` required; `technicalFocus`, `features`, `isAiBuilt` optional |
