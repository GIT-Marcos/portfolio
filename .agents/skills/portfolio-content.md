---
name: "portfolio-content"
description: "Guide edits to src/data/user-data.ts with validation rules, field constraints, and the golden rule that all other files are read-only."
triggers:
  - "user-data\\.ts"
  - "personal_info"
  - "projects\\["
  - "skills:"
  - "src/data/"
  - "add.*project"
  - "update.*portfolio"
  - "change.*(bio|name|role|contact)"
instructions: |
  You are editing the portfolio content. Follow the golden rule strictly.
---

## Golden Rule

Only edit `src/data/user-data.ts`. UI components under `src/features/` and `src/App.tsx` are **read-only**. Domain types in `src/domain/entities/portfolio.ts` and mapper in `src/domain/mappers/portfolio-mapper.ts` are also **read-only**.

## Raw Data Structure

```typescript
export const rawUserData = {
  personal_info: {
    name: string,                   // required
    role: string,                   // required
    focus: string[],                // required
    bio: string,                    // required
    contact: {
      email: string,                // required
      phone?: string,               // optional — remove line to hide
      location?: string,            // optional — remove line to hide
      availability?: string,        // optional — remove line to hide
      links?: {
        linkedin?: string,          // optional — http/https only
        github?: string,            // optional — http/https only
        portfolio?: string,         // optional — http/https only
      },
    },
  },
  projects: [
    {
      id: string,                   // required — unique per project
      name: string,                 // required
      type: "desktop" | "cloud",    // required — controls card glow color
      status: "completed" | "in-development",  // required
      links: {
        github?: string,            // optional — http/https only
        demo?: string,              // optional — http/https only
      },
      stack: string[],              // required
      description: string,          // required
      technical_focus?: string[],   // optional — empty hides section
      features?: string[],          // optional — empty hides section
      is_ai_built?: boolean,        // optional — defaults to false
    },
  ],
  skills: {
    core: string[],                 // green group
    ai_tools: string[],             // purple group
    testing: string[],              // blue group
    // NO other groups render
  },
} as const;
```

## Field Constraints

| Field | Allowed Values | Default | Notes |
|---|---|---|---|
| `type` | `"desktop"` or `"cloud"` | `"cloud"` | blue glow = cloud, green glow = desktop |
| `status` | `"completed"` or `"in-development"` | `"completed"` | `"in-development"` shows yellow WIP badge |
| URLs | Must start with `http://` or `https://` | silently dropped | Applies to all `links` fields |
| skill groups | `core`, `ai_tools`, `testing` | — | No other groups render in UI |
| contact links | `linkedin`, `github`, `portfolio` | — | Other keys are ignored |
| project links | `github`, `demo` | — | Other keys are ignored |

## Mapper Defaults

- Invalid `type` → defaults to `'cloud'`
- Invalid `status` → defaults to `'completed'`
- Invalid/empty URLs → silently dropped (link doesn't appear)
- Missing optional fields → omitted from domain entity
- Empty skill arrays → skill group doesn't render
- `is_ai_built` → `false` unless explicitly `true`
- Missing `email` → fallback `'not-provided@email.com'`

## Progressive Disclosure

To hide a UI element, **remove the field entirely** from the JSON:

| Remove this | Hides |
|---|---|
| `phone` line | Phone link |
| `location` line | Location display |
| `availability` line | "Open to work" badge |
| `links: { ... }` entirely | Social link icons row |
| `technical_focus: [...]` (or empty `[]`) | Technical focus bullet list |
| `features: [...]` (or empty `[]`) | Features bullet list |
| A skill group array (empty `[]`) | That skill group column |

## Common Mistakes to Avoid

- Duplicate `id` values across projects
- Invalid `type` or `status` strings (typos)
- Forgetting commas between object properties
- URLs missing `http://` or `https://` prefix
- Adding unsupported skill groups (e.g., `devops`, `databases`)
- Adding unsupported link types (e.g., `twitter`, `youtube`)
- Editing files outside `user-data.ts`

## Commands

```bash
npm run dev       # dev server with HMR
npm run build     # single-file production build to dist/
npx tsc --noEmit  # typecheck
```
