# Portfolio SPA — Cyber-Minimalist

Personal portfolio for **Marcos**, built with React, TypeScript (strict mode), Vite, and TailwindCSS.

All UI data comes from a **single JSON source**. You never need to touch any component file to update your information. This guide explains exactly how.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Architecture Overview](#architecture-overview)
3. [How Data Flows](#how-data-flows)
4. [Adding a New Project](#adding-a-new-project)
5. [Editing Contact Information](#editing-contact-information)
6. [Updating Skills](#updating-skills)
7. [Field Reference](#field-reference)
8. [Common Mistakes to Avoid](#common-mistakes-to-avoid)
9. [FAQ](#faq)

---

## Quick Start

```bash
npm install
npm run dev      # Local development
npm run build    # Production build → dist/
```

---

## Architecture Overview

```
src/
├── data/
│   ├── user-data.ts          ← ✏️ YOU EDIT THIS FILE (your JSON data)
│   ├── navigation.ts         ← ✏️ YOU EDIT THIS FILE (nav section IDs — labels from sectionTitles)
│   ├── iconMap.ts            ← Shared tech→icon mappings (DO NOT EDIT manually)
│   ├── sectionTitles.ts      ← ✏️ YOU EDIT THIS FILE (section labels — nav + page sync automatically)
│   └── portfolio.ts          ← Calls the mapper (DO NOT EDIT)
├── domain/
│   ├── entities/
│   │   └── portfolio.ts      ← Type definitions (DO NOT EDIT)
│   └── mappers/
│       └── portfolio-mapper.ts  ← Validates & transforms data (DO NOT EDIT)
├── components/
│   └── nav/
│       └── SectionNav.tsx       ← Sticky navigation bar (DO NOT EDIT)
├── features/
│   ├── contact/
│   │   └── ContactSection.tsx   ← Contact UI (DO NOT EDIT)
│   ├── projects/
│   │   ├── ProjectCard.tsx      ← Project card UI (DO NOT EDIT)
│   │   └── ProjectsSection.tsx  ← Project grid (DO NOT EDIT)
│   ├── largetechs/
│   │   └── LargeTechsSection.tsx ← Tech badges (card style, DO NOT EDIT)
│   └── softskills/
│       └── SoftSkillsSection.tsx ← Habilidad badges (subtle style, DO NOT EDIT)
└── App.tsx                    ← Layout composition (DO NOT EDIT)
```

> **Golden Rule**: Edit `src/data/user-data.ts` for content, and `src/data/sectionTitles.ts` for section labels. Everything else is handled automatically.

---

## How Data Flows

```
user-data.ts (raw JSON — techs[], skills[] flat arrays)
       │
       ▼
portfolio-mapper.ts (validates URLs, checks types, maps flat skills)
       │
       ▼
portfolio.ts (clean domain entity — Skills { techs, habilidades })
       │
       ▼
App.tsx → ContactSection / ProjectsSection / LargeTechsSection / SoftSkillsSection
```

The **mapper layer** runs automatically every time the app builds. It:

- Validates all URLs (only `http://` and `https://` are accepted)
- Checks that `type` is either `"desktop"` or `"cloud"`
- Checks that `status` is either `"completed"` or `"in-development"`
- Safely handles any missing or optional fields
- Converts snake_case JSON keys to camelCase domain properties
- Maps `raw.techs` → `skills.techs` and `raw.skills` → `skills.habilidades`

You do **not** need to worry about the mapper. Just write valid JSON in `user-data.ts`.

### Navigation Data

The **sticky navigation bar** reads its labels from a shared source: `src/data/sectionTitles.ts`. Both the nav and the page sections use the same titles, so they stay in sync automatically.

```
sectionTitles.ts (single source — labels for all 4 sections)
       │
       ├─ navigation.ts → SectionNav.tsx (nav bar labels)
       ├─ ContactSection.tsx
       ├─ ProjectsSection.tsx
       ├─ LargeTechsSection.tsx
       └─ SoftSkillsSection.tsx
```

To change a section label, edit `sectionTitles.ts`. No other files need updating.

The **nav item order** is defined in `src/data/navigation.ts`. Each item's index in the array must match the position of its corresponding `<section>` in `App.tsx`.

```
navigation.ts (nav item array — IDs and order)
       │  (index position → section order in DOM)
       ▼
SectionNav.tsx → Highlights active section, scrolls on click
```

If you add a new page section, you must:
1. Add a new entry in `sectionTitles.ts`
2. Add a corresponding nav item to `navigation.ts` in the same position

---

## Adding a New Project

Open `src/data/user-data.ts` and find the `projects` array. Add a new object at the end.

### Step-by-Step

**Step 1** — Open `src/data/user-data.ts` in any text editor.

**Step 2** — Find the `projects: [...]` array.

**Step 3** — Add a comma after the last project's closing `}`, then paste your new project object.

**Step 4** — Save the file. The app rebuilds automatically (in dev mode) or on next `npm run build`.

### Minimal Project (Required Fields Only)

```js
{
  id: "p4",
  name: "My New Project",
  type: "cloud",
  status: "completed",
  links: {},
  stack: ["Node.js", "Express"],
  description: "A brief description of what this project does.",
  technical_focus: ["API Design"],
}
```

### Full Project (All Fields)

```js
{
  id: "p5",
  name: "AI Dashboard",
  type: "cloud",
  status: "in-development",
  is_ai_built: true,
  links: {
    github: "https://github.com/user/ai-dashboard",
    demo: "https://ai-dashboard.demo.com",
  },
  stack: ["React", "TypeScript", "TailwindCSS", "OpenAI API"],
  description: "Dashboard interactivo para visualización de métricas de IA.",
  technical_focus: ["Data Visualization", "Real-time Updates"],
  features: ["Live Charts", "Export to CSV"],
}
```

### What Each Field Does in the UI


| Field             | Required   | What Happens in the UI                                                                                                         |
| ----------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `id`              | ✅ Yes      | Unique identifier. Must not repeat. Use `"p4"`, `"p5"`, etc.                                                                   |
| `name`            | ✅ Yes      | Shown as the card title.                                                                                                       |
| `type`            | ✅ Yes      | **Must be `"desktop"` or `"cloud"`**. Controls the card's glow color: `"cloud"` → blue glow, `"desktop"` → emerald/green glow. |
| `status`          | ✅ Yes      | **Must be `"completed"` or `"in-development"`**. If `"in-development"`, a yellow **WIP** badge appears.                        |
| `stack`           | ✅ Yes      | Array of technology names. Shown as colored pills on the card.                                                                 |
| `description`     | ✅ Yes      | Shown as the card's body text.                                                                                                 |
| `links`           | ✅ Yes      | Object with optional `github` and/or `demo` URLs. Use `{}` if no links. Icons appear only when a link is provided.             |
| `technical_focus` | ❌ Optional | Array of strings. Shown as bullet points on the card. Omit entirely if not needed.                                             |
| `features`        | ❌ Optional | Array of strings. Shown as bullet points below technical focus. Omit entirely if not needed.                                   |
| `is_ai_built`     | ❌ Optional | Set to `true` to show a purple **AI-Optimized** badge. Omit or set `false` to hide it.                                         |


### Choosing `type` — Visual Impact

```
type: "cloud"    →  Blue border, blue glow on hover, blue stack pills
type: "desktop"  →  Green border, green glow on hover, green stack pills
```

Use `"cloud"` for web/API/cloud projects. Use `"desktop"` for local/desktop applications.

### Choosing `status` — Badge Behavior

```
status: "completed"       →  No badge (clean card)
status: "in-development"  →  Yellow "WIP" badge in top-right corner
```

### Adding Links

Links are **icon-only buttons** at the bottom of the card. They only appear when provided.

```js
// Both links
links: {
  github: "https://github.com/user/project",
  demo: "https://my-project.com",
}

// GitHub only
links: {
  github: "https://github.com/user/project",
}

// No links
links: {}
```

> ⚠️ URLs **must** start with `https://` or `http://`. Invalid URLs are silently ignored by the mapper.

---

## Editing Contact Information

Your contact info lives inside `personal_info.contact` in `src/data/user-data.ts`.

### Step-by-Step

**Step 1** — Open `src/data/user-data.ts`.

**Step 2** — Find the `personal_info` object at the top.

**Step 3** — Edit the values you want to change.

**Step 4** — Save the file.

### Full Contact Structure

```js
personal_info: {
  name: "Juan Carlos Fernández",
  role: "Analista de Sistemas / Backend Developer",
  focus: ["Java", "SQL", "Troubleshooting", "AI Engineering"],
  bio: "Your bio text here.",
  contact: {
    email: "your.email@example.com",
    phone: "+54 9 351 0000000",
    location: "Córdoba, Argentina",
    availability: "Open to work",
    links: {
      linkedin: "https://linkedin.com/in/yourprofile",
      github: "https://github.com/youruser",
      portfolio: "https://yourportfolio.com",
    },
  },
},
```

### What Each Field Does


| Field          | Required   | What Happens in the UI                                                                                  |
| -------------- | ---------- | ------------------------------------------------------------------------------------------------------- |
| `name`         | ✅ Yes      | Large heading at the very top of the page.                                                              |
| `role`         | ✅ Yes      | Subtitle under your name.                                                                               |
| `focus`        | ✅ Yes      | Array of strings. Shown as rounded pills below the role.                                                |
| `bio`          | ✅ Yes      | Paragraph text below the focus pills.                                                                   |
| `email`        | ✅ Yes      | Clickable link with a mail icon. Opens the user's email client (`mailto:`).                             |
| `phone`        | ❌ Optional | Clickable link with a phone icon. Opens the phone dialer (`tel:`). Remove the line entirely to hide it. |
| `location`     | ❌ Optional | Shown with a map pin icon. Non-clickable. Remove the line entirely to hide it.                          |
| `availability` | ❌ Optional | Highlighted in **emerald green** with an animated pulsing dot. Remove the line entirely to hide it.     |
| `links`        | ❌ Optional | Social links shown as icon buttons. Remove the entire `links` object to hide the section.               |


### Progressive Disclosure

The Contact Section uses **progressive disclosure**: fields only appear in the UI if they exist in the JSON. This means:

- If you remove `phone`, the phone row disappears — no empty space left behind.
- If you remove the entire `links` object, the social icon row disappears.
- If you remove `availability`, the green status indicator disappears.

To **hide a field**, simply delete the entire line from the JSON:

```js
// BEFORE — phone is visible
contact: {
  email: "user@email.com",
  phone: "+54 9 351 0000000",
  location: "Córdoba, Argentina",
}

// AFTER — phone is hidden
contact: {
  email: "user@email.com",
  location: "Córdoba, Argentina",
}
```

### Editing Social Links

You can include any combination of the three supported links:

```js
// All three
links: {
  linkedin: "https://linkedin.com/in/yourprofile",
  github: "https://github.com/youruser",
  portfolio: "https://yourportfolio.com",
}

// Only LinkedIn
links: {
  linkedin: "https://linkedin.com/in/yourprofile",
}

// Remove the entire links object to hide the social section
// (just delete the `links: { ... }` block)
```

> ⚠️ All URLs **must** start with `https://` or `http://`. Invalid URLs are silently removed by the mapper.

### Availability Highlight

When `availability` is set, it renders with a **pulsing green dot** and **emerald-colored text**. This draws attention to your current work status.

Common values:

```js
availability: "Open to work"
availability: "Available for freelance"
availability: "Currently employed"
```

---

## Updating Skills

Skills are at the bottom of `src/data/user-data.ts`, as two flat arrays.

### Full Skills Structure

```js
techs: [
  "Java", "SQL", "Spring", "Hibernate", "PostgreSQL", "Flyway",
  "Docker", "OpenCode AI Agent", "Jira",
  "Confluence", "C#", "CSS", "Git", "HTML",
  "Maven", "OpenAPI", "Postman", "React",
],
skills: [
  "Prompt Engineering", "AI-Assisted Debugging",
  "QA Manual", "Zephyr", "TestContainers",
],
```

### What Each Array Does


| Array    | UI Section    | Style          | Icons                         |
| -------- | ------------- | -------------- | ----------------------------- |
| `techs`  | **Tecnologías** | Large card badges | Auto-mapped from `iconMap.ts` |
| `skills` | **Habilidades** | Subtle badges    | No icons (soft skills only)   |


### Adding a Tech

Simply add the name to the `techs` array. If it has a matching icon in `src/data/iconMap.ts`, the icon appears automatically. If not, it renders as text-only.

### Adding a Skill

Add the string to the `skills` array.

### Removing an Item

Delete the string from the array:

```js
// Before
techs: ["Java", "SQL", "Spring", "Hibernate"],

// After — removed "Hibernate"
techs: ["Java", "SQL", "Spring"],
```

If you empty an entire array (`[]`), its corresponding section will **not render at all**.

---

## Customizing Navigation

The sticky navigation bar at the top of the page reads its items from `src/data/navigation.ts`. You can add, remove, or reorder nav items there.

> **Labels** are managed in `src/data/sectionTitles.ts`. If you only want to rename a section, edit `sectionTitles.ts`. If you want to add/remove/reorder sections, edit both `navigation.ts` and `sectionTitles.ts`.

### Step-by-Step

**Step 1** — Open `src/data/sectionTitles.ts` to add/edit/remove a section title.

**Step 2** — Open `src/data/navigation.ts` to add/edit/remove the corresponding nav item.

**Step 3** — Save both files.

### Adding a New Nav Item

```js
// Before — sectionTitles.ts
export const sectionTitles = {
  contact: 'Contacto',
  projects: 'Proyectos',
  techs: 'Tecnologías',
  skills: 'Habilidades',
} as const;

// After — added "Experience"
export const sectionTitles = {
  contact: 'Contacto',
  projects: 'Proyectos',
  techs: 'Tecnologías',
  experience: 'Experiencia',
  skills: 'Habilidades',
} as const;

// navigation.ts (labels reference sectionTitles)
import { sectionTitles } from './sectionTitles';

export const navigationItems = [
  { id: 'contact', label: sectionTitles.contact },
  { id: 'projects', label: sectionTitles.projects },
  { id: 'techs', label: sectionTitles.techs },
  { id: 'experience', label: sectionTitles.experience },
  { id: 'skills', label: sectionTitles.skills },
] as const;
```

> ⚠️ **Positional requirement**: The nav links to sections **by index** — the first nav item maps to the first `<section>` element in `App.tsx`, the second to the second `<section>`, and so on. If you add a nav item for a new section, you **must** also add the corresponding `<section>` tag in `App.tsx` at the same position. The order must match exactly.

### Renaming a Label

Edit `src/data/sectionTitles.ts`:

```js
{ id: 'skills', label: 'Habilidades' }  // → change 'Habilidades' to whatever you want
```

The navigation bar and the page section title will update automatically — they both read from the same source.

### Removing a Nav Item

Delete the corresponding entry from both `sectionTitles.ts` and `navigation.ts`. The nav will automatically adjust:

```js
// Before — sectionTitles.ts
export const sectionTitles = {
  contact: 'Contacto',
  projects: 'Proyectos',
  techs: 'Tecnologías',
  skills: 'Habilidades',
} as const;

// After — removed "techs"
export const sectionTitles = {
  contact: 'Contacto',
  projects: 'Proyectos',
  skills: 'Habilidades',
} as const;

// navigation.ts
export const navigationItems = [
  { id: 'contact', label: sectionTitles.contact },
  { id: 'projects', label: sectionTitles.projects },
  { id: 'skills', label: sectionTitles.skills },
] as const;
```

> ⚠️ If you remove a nav item, its corresponding `<section>` will no longer be reachable via the nav bar. The section itself will still render in the page unless you also remove it from `App.tsx`.

### Nav Item Fields

| Field   | Required   | Description                                              |
| ------- | ---------- | -------------------------------------------------------- |
| `id`    | ✅ Yes      | Unique identifier. Used as React key.                    |
| `label` | ✅ Yes      | Text shown in the sticky navigation bar.                 |

---

## Field Reference

### Project Type (Discriminated Union)

```
"desktop"  — Local/desktop applications (green theme)
"cloud"    — Web/API/cloud services (blue theme)
```

No other values are accepted. If an invalid value is provided, the mapper defaults to `"cloud"`.

### Project Status (Discriminated Union)

```
"completed"       — Finished project (no badge)
"in-development"  — Work in progress (yellow WIP badge)
```

No other values are accepted. If an invalid value is provided, the mapper defaults to `"completed"`.

### URL Rules

All URLs in `links` (both project and contact) must:

- Start with `https://` or `http://`
- Be a valid URL format

Examples:

```
✅ "https://github.com/user/repo"
✅ "http://localhost:3000"
❌ "github.com/user/repo"        (missing protocol)
❌ "not-a-url"                    (invalid format)
❌ ""                             (empty string)
```

Invalid URLs are **silently ignored** — the app will not crash, but the link won't appear.

---

## Common Mistakes to Avoid

### ❌ Don't edit component files

```
WRONG: Editing ProjectCard.tsx to change a project name
RIGHT: Editing user-data.ts to change the name field
```

### ❌ Don't use duplicate `id` values

```js
// WRONG — both have "p1"
{ id: "p1", name: "Project A", ... },
{ id: "p1", name: "Project B", ... },

// RIGHT — unique IDs
{ id: "p1", name: "Project A", ... },
{ id: "p4", name: "Project B", ... },
```

### ❌ Don't use invalid type or status values

```js
// WRONG
type: "web"
status: "done"

// RIGHT
type: "cloud"
status: "completed"
```

### ❌ Don't forget commas between array items or object properties

```js
// WRONG — missing comma after "Java"
stack: ["Java" "Spring Boot"]

// RIGHT
stack: ["Java", "Spring Boot"]
```

### ❌ Don't add links without the protocol

```js
// WRONG
github: "github.com/user/repo"

// RIGHT
github: "https://github.com/user/repo"
```

---

## FAQ

**Q: I added a project but it doesn't show up.**
A: Make sure your project object is inside the `projects: [...]` array, has all required fields (`id`, `name`, `type`, `status`, `stack`, `description`, `links`), and that `type` and `status` use the exact allowed values.

**Q: My link icon doesn't appear on the project card.**
A: Check that the URL starts with `https://` or `http://`. The mapper validates URLs and silently drops invalid ones.

**Q: I removed `phone` but the page looks broken.**
A: Make sure you didn't accidentally delete a comma or bracket. The JSON structure must remain valid JavaScript.

**Q: Can I add a new tech or skill?**
A: Yes — just add it to the `techs[]` or `skills[]` array in `user-data.ts`. If the tech name matches an entry in `iconMap.ts`, it renders with its icon. Otherwise it renders as text-only.

**Q: Can I reorder the sections (e.g., put Skills before Projects)?**
A: No. The layout order (Contact → Projects → Techs → Skills) is a strict architectural contract enforced in `App.tsx`. Do not modify it.

**Q: Can I add more social link types (e.g., Twitter/X)?**
A: No — not without editing component and type files. The supported contact links are `linkedin`, `github`, and `portfolio`. Adding more requires changes to the domain entities and `ContactSection.tsx`.

---

## Build & Deploy

```bash
npm run build
```

Output is generated in the `dist/` directory. Deploy its contents to any static hosting provider (Vercel, Netlify, GitHub Pages, etc.).

---

*Built with React + Vite + TypeScript + TailwindCSS · Designed with a Cyber-Minimalist aesthetic*