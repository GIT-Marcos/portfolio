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
│   ├── user-data.ts       ← ✏️ YOU EDIT THIS FILE (your JSON data)
│   └── portfolio.ts        ← Calls the mapper (DO NOT EDIT)
├── domain/
│   ├── entities/
│   │   └── portfolio.ts    ← Type definitions (DO NOT EDIT)
│   └── mappers/
│       └── portfolio-mapper.ts  ← Validates & transforms data (DO NOT EDIT)
├── features/
│   ├── contact/
│   │   └── ContactSection.tsx   ← Contact UI (DO NOT EDIT)
│   ├── projects/
│   │   ├── ProjectCard.tsx      ← Project card UI (DO NOT EDIT)
│   │   └── ProjectsSection.tsx  ← Project grid (DO NOT EDIT)
│   └── skills/
│       └── SkillsSection.tsx    ← Skills UI (DO NOT EDIT)
└── App.tsx                 ← Layout composition (DO NOT EDIT)
```

> **Golden Rule**: Only edit `src/data/user-data.ts`. Everything else is handled automatically.

---

## How Data Flows

```
user-data.ts (raw JSON)
       │
       ▼
portfolio-mapper.ts (validates URLs, checks types, handles missing fields)
       │
       ▼
portfolio.ts (clean domain entity)
       │
       ▼
App.tsx → ContactSection / ProjectsSection / SkillsSection
```

The **mapper layer** runs automatically every time the app builds. It:

- Validates all URLs (only `http://` and `https://` are accepted)
- Checks that `type` is either `"desktop"` or `"cloud"`
- Checks that `status` is either `"completed"` or `"in-development"`
- Safely handles any missing or optional fields
- Converts snake_case JSON keys to camelCase domain properties

You do **not** need to worry about the mapper. Just write valid JSON in `user-data.ts`.

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

| Field | Required | What Happens in the UI |
|---|---|---|
| `id` | ✅ Yes | Unique identifier. Must not repeat. Use `"p4"`, `"p5"`, etc. |
| `name` | ✅ Yes | Shown as the card title. |
| `type` | ✅ Yes | **Must be `"desktop"` or `"cloud"`**. Controls the card's glow color: `"cloud"` → blue glow, `"desktop"` → emerald/green glow. |
| `status` | ✅ Yes | **Must be `"completed"` or `"in-development"`**. If `"in-development"`, a yellow **WIP** badge appears. |
| `stack` | ✅ Yes | Array of technology names. Shown as colored pills on the card. |
| `description` | ✅ Yes | Shown as the card's body text. |
| `links` | ✅ Yes | Object with optional `github` and/or `demo` URLs. Use `{}` if no links. Icons appear only when a link is provided. |
| `technical_focus` | ❌ Optional | Array of strings. Shown as bullet points on the card. Omit entirely if not needed. |
| `features` | ❌ Optional | Array of strings. Shown as bullet points below technical focus. Omit entirely if not needed. |
| `is_ai_built` | ❌ Optional | Set to `true` to show a purple **AI-Optimized** badge. Omit or set `false` to hide it. |

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

| Field | Required | What Happens in the UI |
|---|---|---|
| `name` | ✅ Yes | Large heading at the very top of the page. |
| `role` | ✅ Yes | Subtitle under your name. |
| `focus` | ✅ Yes | Array of strings. Shown as rounded pills below the role. |
| `bio` | ✅ Yes | Paragraph text below the focus pills. |
| `email` | ✅ Yes | Clickable link with a mail icon. Opens the user's email client (`mailto:`). |
| `phone` | ❌ Optional | Clickable link with a phone icon. Opens the phone dialer (`tel:`). Remove the line entirely to hide it. |
| `location` | ❌ Optional | Shown with a map pin icon. Non-clickable. Remove the line entirely to hide it. |
| `availability` | ❌ Optional | Highlighted in **emerald green** with an animated pulsing dot. Remove the line entirely to hide it. |
| `links` | ❌ Optional | Social links shown as icon buttons. Remove the entire `links` object to hide the section. |

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

Skills are at the bottom of `src/data/user-data.ts`, inside the `skills` object.

### Full Skills Structure

```js
skills: {
  core: ["Java", "SQL", "Spring Boot", "Hibernate"],
  ai_tools: ["Prompt Engineering", "AI-Assisted Debugging"],
  testing: ["QA Manual", "Zephyr", "Jira"],
},
```

### What Each Group Does

| Group | UI Label | Pill Color |
|---|---|---|
| `core` | **Core** | Emerald / Green |
| `ai_tools` | **AI & Tooling** | Violet / Purple |
| `testing` | **Testing & QA** | Sky / Blue |

### Adding a Skill

Simply add a string to the relevant array:

```js
// Before
core: ["Java", "SQL", "Spring Boot", "Hibernate"],

// After — added "Kotlin"
core: ["Java", "SQL", "Spring Boot", "Hibernate", "Kotlin"],
```

### Removing a Skill

Delete the string from the array:

```js
// Before
testing: ["QA Manual", "Zephyr", "Jira"],

// After — removed "Zephyr"
testing: ["QA Manual", "Jira"],
```

If you empty an entire array (`[]`), that skill group will **not render at all**.

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

**Q: Can I add a new skill category (e.g., `devops`)?**
A: No — not without editing component files. The three categories (`core`, `ai_tools`, `testing`) are the only ones the Skills section renders. Adding a new category requires modifying `SkillsSection.tsx`.

**Q: Can I reorder the sections (e.g., put Skills before Projects)?**
A: No. The layout order (Contact → Projects → Skills) is a strict architectural contract enforced in `App.tsx`. Do not modify it.

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
