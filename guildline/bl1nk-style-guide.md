# bl1nk style guide

> เวอร์ชัน 1.3 · ดูแลโดย อาจารย์ (Dollawatt) · อัปเดตล่าสุด: 2026-03-21

---

## สารบัญ

1. [อัตลักษณ์แบรนด์และวิชวล](#1-อัตลักษณ์แบรนด์และวิชวล)
2. [มาตรฐาน UI/UX และ Component](#2-มาตรฐาน-uiux-และ-component)
3. [Code Style](#3-code-style)
4. [การเขียนและเอกสาร](#4-การเขียนและเอกสาร)
5. [Tooling & Dev Dependencies](#5-tooling--dev-dependencies)
6. [สคริปต์ Setup & Deployment](#6-สคริปต์-setup--deployment)
7. [การจัดการคุณภาพโค้ด](#7-การจัดการคุณภาพโค้ด)

---

## 1. อัตลักษณ์แบรนด์และวิชวล

### 1.1 ชื่อและ Prefix

| กฎ | ค่า |
|----|-----|
| ชื่อแบรนด์ | `bl1nk` (ตัวพิมพ์เล็ก ใช้ตัวเลข `1` แทนตัว `l`) |
| Prefix โปรเจกต์ | ทุกโปรเจกต์ต้องตั้งชื่อในรูปแบบ `bl1nk-<ชื่อ>` |
| โดเมน | `bl1nk.site` |

**ตัวอย่าง:** `bl1nk-note`, `bl1nk-trading-bot`, `bl1nk-agent-library`

---

### 1.2 Color Palette

ใช้ CSS variables เสมอ ห้าม hardcode ค่า hex โดยตรงนอกไฟล์ token

#### Primary — Teal

| Token | Hex | Tailwind | การใช้งาน |
|-------|-----|----------|-----------|
| `--color-brand-950` | `#042f2e` | `teal-950` | พื้นหลังหลัก (darkest) |
| `--color-brand-900` | `#134e4a` | `teal-900` | พื้นหลัง layout / sidebar |
| `--color-brand-800` | `#115e59` | `teal-800` | Surface / card |
| `--color-brand-700` | `#0f766e` | `teal-700` | Border / divider |
| `--color-brand-600` | `#0d9488` | `teal-600` | Hover state |
| `--color-brand-500` | `#14b8a6` | `teal-500` | Primary interactive |
| `--color-brand-400` | `#2dd4bf` | `teal-400` | Accent / highlight |
| `--color-brand-300` | `#5eead4` | `teal-300` | Icon / subtle accent |

#### Chart Colors — Teal Scale (900 → 400)

ใช้ลำดับนี้เสมอเมื่อแสดงข้อมูลในกราฟ:

```ts
export const CHART_COLORS = [
  '#134e4a', // teal-900 — series 1
  '#115e59', // teal-800 — series 2
  '#0f766e', // teal-700 — series 3
  '#0d9488', // teal-600 — series 4
  '#14b8a6', // teal-500 — series 5
  '#2dd4bf', // teal-400 — series 6
] as const
```

> **กฎ:** ห้ามใช้สีนอก teal scale ในกราฟ ยกเว้น semantic colors (success/warning/error)

#### Neutral & Semantic

```css
:root {
  /* Primary brand — Teal */
  --color-brand-950: #042f2e;
  --color-brand-900: #134e4a;
  --color-brand-800: #115e59;
  --color-brand-700: #0f766e;
  --color-brand-600: #0d9488;
  --color-brand-500: #14b8a6;
  --color-brand-400: #2dd4bf;
  --color-brand-300: #5eead4;

  /* Neutral */
  --color-surface:   #1a2e2d;   /* พื้นหลัง card/panel — teal tinted dark */
  --color-border:    #0f766e;   /* teal-700 */
  --color-muted:     #5eead4;   /* teal-300 — text รอง */

  /* Text */
  --color-text:      #f0fdfa;   /* teal-50 — text หลัก */
  --color-text-sub:  #99f6e4;   /* teal-200 — text รอง */

  /* Semantic */
  --color-success:   #4ade80;   /* green-400 */
  --color-warning:   #facc15;   /* yellow-400 */
  --color-error:     #f87171;   /* red-400 */
  --color-info:      #60a5fa;   /* blue-400 */
}
```

> **กฎ:** Light mode เป็น optional แต่ชื่อ token ต้องคงเดิม สร้าง `[data-theme="light"]` override เมื่อจำเป็น

---

### 1.3 Global Layout Background — Blur Effect

Layout ระดับ global ต้องใช้ glassmorphism เสมอ โดยใช้ระดับ blur 2–4 ตามตำแหน่ง:

| ระดับ | `backdrop-blur` Tailwind | blur px | การใช้งาน |
|-------|--------------------------|---------|-----------|
| blur-2 | `backdrop-blur-sm` | 4px | Topbar, toolbar overlay |
| blur-3 | `backdrop-blur-md` | 12px | Sidebar, drawer |
| blur-4 | `backdrop-blur-lg` | 16px | Modal, sheet, floating card |

```css
/* Sidebar (blur-3) */
.sidebar {
  background: rgba(19, 78, 74, 0.6);      /* teal-900 / 60% */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-right: 1px solid rgba(15, 118, 110, 0.4); /* teal-700 / 40% */
}

/* Modal (blur-4) */
.modal {
  background: rgba(17, 94, 89, 0.7);      /* teal-800 / 70% */
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(15, 118, 110, 0.4);
}
```

```tsx
// Tailwind — Topbar (blur-2)
<header className="sticky top-0 z-50 bg-teal-900/60 backdrop-blur-sm border-b border-teal-700/40" />

// Tailwind — Sidebar (blur-3)
<aside className="bg-teal-900/60 backdrop-blur-md border-r border-teal-700/40" />

// Tailwind — Modal / Card (blur-4)
<div className="bg-teal-800/70 backdrop-blur-lg rounded-xl border border-teal-700/40" />
```

> **กฎ:** ห้ามใช้ `background: solid` ใน global layout elements ต้องมี opacity + blur เสมอ

---

### 1.4 Typography

| บทบาท | ฟอนต์ | น้ำหนัก | ขนาด |
|-------|-------|---------|------|
| Display / H1 | `Geist` หรือ `Cal Sans` | 700 | `2.25rem` (36px) |
| หัวข้อ H2 | `Geist` | 600 | `1.5rem` (24px) |
| หัวข้อ H3 | `Geist` | 600 | `1.25rem` (20px) |
| หัวข้อ H4 | `Geist` | 500 | `1.125rem` (18px) |
| เนื้อหา Body | `Geist` | 400 | `0.875rem` (14px) |
| Code / Mono | `Geist Mono` | 400 | `0.8125rem` (13px) |
| Label / Caption | `Geist` | 500 | `0.75rem` (12px) |

**กฎ:**
- ใช้หัวข้อระดับ H1–H4 เท่านั้น ห้ามข้ามระดับ
- ห้ามใช้ `Inter`, `Roboto`, หรือ `Arial` ในโปรเจกต์ bl1nk
- Line height สำหรับ body: `1.6` | สำหรับ heading: `1.2`

---

### 1.5 Spacing & Radius

| Token | ค่า | การใช้งาน |
|-------|-----|-----------|
| `--radius-sm` | `0.375rem` | Badge, chip |
| `--radius-md` | `0.5rem` | Button, input |
| `--radius-lg` | `0.75rem` | Card, panel |
| `--radius-xl` | `1rem` | Modal, sheet |
| `--spacing-base` | `4px` | หน่วยฐาน (คูณ × 1–16) |

> shadcn/ui rounded style = `--radius: 0.5rem` ใน `globals.css`

---

### 1.6 Iconography

- Library: **Lucide React** (default)
- ขนาด: `16px` inline · `20px` standalone · `24px` large action
- Stroke width: `1.5`
- ห้ามผสม icon library ในโปรเจกต์เดียวกัน

---

## 2. มาตรฐาน UI/UX และ Component

### 2.1 Component Library

- **Base:** shadcn/ui พร้อม `rounded` style preset
- **Styling engine:** Tailwind CSS v4
- **State management:** Zustand (client) · React Query / TanStack Query (server)
- **Form:** React Hook Form + Zod

---

### 2.2 หลักการ Mobile-First (บังคับ)

> **กฎบังคับ:** ทุกการออกแบบต้องเริ่มจากหน้าจอมือถือก่อนเสมอ แล้วจึงขยายสู่หน้าจอขนาดใหญ่ขึ้น

#### ลำดับการออกแบบ

```
1. มือถือ (base / 0px+)     ← เริ่มที่นี่เสมอ
2. Tablet  (sm: 640px+)
3. Laptop  (md: 768px+ / lg: 1024px+)
4. Desktop (xl: 1280px+ / 2xl: 1536px+)
```

#### Breakpoint Reference

| Breakpoint | ขนาด | Tailwind prefix | การใช้งาน |
|-----------|------|----------------|-----------|
| base | 0px+ | (ไม่มี prefix) | **มือถือ — ออกแบบก่อนเสมอ** |
| sm | 640px+ | `sm:` | Tablet portrait |
| md | 768px+ | `md:` | Tablet landscape |
| lg | 1024px+ | `lg:` | Laptop |
| xl | 1280px+ | `xl:` | Desktop |
| 2xl | 1536px+ | `2xl:` | Wide screen |

#### ตัวอย่าง — Mobile-First

```tsx
// ✅ ถูกต้อง — เริ่มจาก mobile แล้ว override ขึ้นไป
<div className="
  flex flex-col gap-3 p-4
  sm:flex-row sm:gap-4 sm:p-6
  lg:gap-6 lg:p-8
">

// ❌ ผิด — เริ่มจาก desktop แล้วพยายาม override ลงมา
<div className="
  grid grid-cols-3 gap-8 p-12
  max-sm:grid-cols-1 max-sm:p-4
">
```

#### Navigation Pattern ตาม Breakpoint

| Breakpoint | Navigation |
|-----------|------------|
| base–md | Bottom navigation bar หรือ hamburger drawer |
| lg+ | Sidebar แบบ fixed หรือ collapsible |

---

### 2.3 Component Rules

```tsx
// ✅ ถูกต้อง — typed props, named export, ชัดเจนในหน้าที่
interface CardProps {
  title: string
  description?: string
  className?: string
}

export function Card({ title, description, className }: CardProps) {
  return (
    <div className={cn(
      'rounded-lg border border-teal-700/40 bg-teal-900/60 backdrop-blur-md p-4',
      className
    )}>
      <h3 className="text-base font-semibold text-teal-50">{title}</h3>
      {description && (
        <p className="text-sm text-teal-300 mt-1">{description}</p>
      )}
    </div>
  )
}

// ❌ ผิด — anonymous default export, ไม่มี types, inline style
export default ({ title, description }) => (
  <div style={{ padding: 16 }}>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
)
```

**กฎ:**
- 1 component ต่อ 1 ไฟล์
- ชื่อไฟล์ = ชื่อ component ในรูปแบบ `kebab-case.tsx`
- ใช้ `cn()` (clsx + tailwind-merge) สำหรับ conditional classes เสมอ
- ห้ามใช้ inline `style={{}}` ยกเว้นค่าที่ต้องคำนวณ runtime (เช่น ความกว้างกราฟ)

---

### 2.4 Layout System

```
app/
├── (root)/
│   └── layout.tsx          # Shell: sidebar (blur-3) + topbar (blur-2)
├── (auth)/
│   └── layout.tsx          # Auth shell: centered, blur-4 card
└── components/
    ├── ui/                 # shadcn primitives
    ├── shared/             # cross-feature components
    └── [feature]/          # feature-scoped components
```

- Max content width: `1280px` พร้อม `mx-auto px-4 sm:px-6 lg:px-8`
- ใช้ CSS Grid สำหรับ page layout · Flexbox สำหรับ component-level alignment
- ทุก layout element ระดับ global ต้องใช้ blur ตามข้อ 1.3

---

### 2.5 Accessibility (a11y)

- ทุก interactive element ต้องใช้ keyboard ได้ (`tab`, `enter`, `space`)
- รูปภาพต้องมี `alt` · รูปตกแต่ง: `alt=""`
- Color contrast ratio: ขั้นต่ำ **4.5:1** สำหรับ body text · **3:1** สำหรับ heading
- ใช้ semantic HTML elements (`<button>`, `<nav>`, `<main>`, `<section>`)
- `aria-label` จำเป็นสำหรับปุ่มที่มีแค่ไอคอน

---

### 2.6 Dark Mode

- Default theme: **dark**
- Token prefix: ใช้ `dark:` Tailwind variant สำหรับ override
- ห้ามใช้ `@media (prefers-color-scheme)` — ใช้ class-based toggling (`class="dark"` บน `<html>`)

---

## 3. Code Style

### 3.1 Language & Runtime

| Context | มาตรฐาน |
|---------|---------|
| Runtime | Node.js (latest LTS) |
| ภาษา | TypeScript (strict mode) |
| Frontend | Next.js (latest stable) |
| Backend / API | Next.js API Routes หรือ standalone Node.js |
| Scripting | Python (latest) |
| Desktop | Rust / Tauri |
| Package manager | `pnpm` (แนะนำ) · `npm` ใช้ได้ |

---

### 3.2 TypeScript Rules

```ts
// tsconfig.json — flags บังคับ
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

- **ห้ามใช้ `any`** — ใช้ `unknown` แล้ว narrow หรือกำหนด type ที่ถูกต้อง
- ใช้ `type` แทน `interface` สำหรับ union/intersection · ใช้ `interface` เมื่อต้องการ extend
- Export types อย่างชัดเจน: `export type { MyType }`
- ห้ามใช้ `!` non-null assertion ยกเว้นมีหลักฐานชัดเจน (ต้องเขียน comment อธิบาย)

```ts
// ✅ ถูกต้อง
const value: string = getValue() ?? 'default'

// ❌ ผิด
const value = getValue()!
```

---

### 3.3 Naming Conventions

| สิ่ง | รูปแบบ | ตัวอย่าง |
|-----|--------|---------|
| ไฟล์ (component) | `kebab-case.tsx` | `user-card.tsx` |
| ไฟล์ (util/hook) | `kebab-case.ts` | `use-auth.ts` |
| Component | `PascalCase` | `UserCard` |
| Hook | `camelCase` นำหน้าด้วย `use` | `useAuth` |
| Function | `camelCase` | `formatDate` |
| Constant | `SCREAMING_SNAKE_CASE` | `MAX_RETRY_COUNT` |
| Type / Interface | `PascalCase` | `UserProfile` |
| Env variable | `SCREAMING_SNAKE_CASE` | `DATABASE_URL` |

---

### 3.4 โครงสร้างไฟล์ (Next.js project)

```
bl1nk-<n>/
├── app/                    # App Router pages & layouts
├── components/             # UI components
│   ├── ui/                 # shadcn primitives (ห้ามแก้ไข)
│   └── shared/             # custom shared components
├── lib/                    # utilities, helpers, constants
├── hooks/                  # custom React hooks
├── types/                  # global TypeScript types
├── actions/                # Server Actions
├── api/                    # API route handlers (ถ้าแยกออกมา)
├── public/                 # static assets
├── docs/                   # API Reference, Setup Guide
│   ├── api-reference.md
│   ├── setup-guide.md
│   └── AGENTS.md
├── scripts/                # setup / maintenance scripts
├── .github/
│   └── workflows/          # CI/CD (GitHub Actions)
├── .coderabbit.yaml
├── AGENTS.md               # (root copy — จำเป็น)
└── README.md
```

---

### 3.5 Error Handling

```ts
// ✅ ใช้ Result pattern สำหรับ failure ที่คาดเดาได้
type Result<T, E = Error> =
  | { ok: true; data: T }
  | { ok: false; error: E }

// ✅ Typed API errors
class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number = 500
  ) {
    super(message)
    this.name = 'AppError'
  }
}

// ❌ ห้าม swallow errors แบบเงียบ
try {
  doSomething()
} catch (_) { /* ← ผิด */ }
```

---

### 3.6 CI/CD & Build

- **ใช้ remote build** ผ่าน GitHub Actions เสมอ หลีกเลี่ยง local build
- Linting: ESLint + Prettier ทุก PR
- Type checking: `tsc --noEmit` ใน CI pipeline
- Test runner: Vitest
- Deployment: Vercel (frontend) · GitHub Actions (targets อื่น)

```yaml
# .github/workflows/ci.yml — jobs บังคับ
jobs:
  lint:      # eslint + prettier check
  typecheck: # tsc --noEmit
  test:      # vitest run
  build:     # next build (หรือ cargo build สำหรับ Tauri)
```

---

## 4. การเขียนและเอกสาร

### 4.1 นโยบายภาษา

| Context | ภาษา |
|---------|------|
| UI copy, labels, ข้อความสำหรับผู้ใช้ | ภาษาไทย |
| Code comments (inline) | English |
| Commit messages | English |
| API Reference, README | English |
| AGENTS.md | English |
| Setup Guide | ภาษาไทย หรือ bilingual |

---

### 4.2 Commit Messages

รูปแบบ: `type(scope): คำอธิบายสั้น`

| Type | ใช้เมื่อ |
|------|---------|
| `feat` | เพิ่ม feature ใหม่ |
| `fix` | แก้ bug |
| `refactor` | จัดโค้ดใหม่ ไม่เปลี่ยน behavior |
| `docs` | เอกสารเท่านั้น |
| `chore` | Build, tooling, deps |
| `test` | Tests เท่านั้น |
| `style` | Formatting ไม่มี logic |
| `perf` | ปรับ performance |

```
feat(auth): add Google OAuth login
fix(dashboard): resolve chart render on mobile
docs(api): add rate limit section to reference
```

---

### 4.3 README.md — หัวข้อบังคับ

```markdown
# bl1nk-<n>

> คำอธิบายหนึ่งบรรทัด

## Overview
## Prerequisites
## Quick Start
## Environment Variables
## Scripts
## Architecture
## Contributing
## License
```

---

### 4.4 AGENTS.md — หัวข้อบังคับ

ทุกโปรเจกต์ bl1nk ต้องมี `AGENTS.md` ทั้งที่ root และใน `docs/`

```markdown
# AGENTS.md

## Project Overview
## Tech Stack
## Repository Structure
## Development Commands
## Architecture Notes
## Key Conventions
## Do NOT
## External Dependencies
```

**กฎสำหรับ AGENTS.md:**
- เขียนสำหรับ AI agents — ให้ชัดเจน ไม่ใช้ภาษาบรรยาย
- ใช้ bullet list และ code block ไม่ใช้ paragraph
- ระบุ command จริง (`pnpm dev`, `pnpm test`)
- ระบุชื่อ environment variable (ไม่ใส่ค่า)
- บันทึก convention ทุกอย่างที่ไม่ obvious

---

### 4.5 API Reference — หัวข้อบังคับ

```markdown
# API Reference

## Authentication
## Base URL
## Endpoints
  ### GET /resource
  - Description
  - Request parameters
  - Request body (schema)
  - Response (schema + example)
  - Error codes
## Error Codes (global)
## Rate Limits
## Changelog
```

---

### 4.6 Code Comments

```ts
// ✅ อธิบาย WHY ไม่ใช่ WHAT
// Retry สูงสุด 3 ครั้ง — upstream service อาจ return 503 ตอน deploy
const result = await retry(fetchData, { times: 3 })

// ❌ ห้ามบรรยายโค้ด
// Call fetchData และ retry 3 ครั้ง
const result = await retry(fetchData, { times: 3 })

// ✅ รูปแบบ TODO
// TODO(dollawatt): เปลี่ยนเป็น streaming เมื่อ API v2 พร้อม — ดู #142
```

---

## ภาคผนวก

### Checklist ส่งมอบโปรเจกต์

ทุกโปรเจกต์ bl1nk ต้องมีครบ:

- [ ] `README.md` (root)
- [ ] `AGENTS.md` (root + `docs/`)
- [ ] `docs/api-reference.md`
- [ ] `docs/setup-guide.md`
- [ ] `scripts/setup.sh` หรือ `scripts/setup.ps1`
- [ ] `.github/workflows/ci.yml`
- [ ] `.coderabbit.yaml`
- [ ] Environment variables บันทึกใน `.env.example`

---

### Tools Reference

| หมวด | เครื่องมือ |
|-----|-----------|
| Editor | VSCode, Cursor |
| Version control | GitHub |
| AI / LLM | Ollama (local), Gemini, GPT, Claude |
| Queue / Cache | Upstash (Redis) |
| Database | Supabase (PostgreSQL) |
| Error tracking | Sentry |
| Docs | GitBook |
| CI/CD | GitHub Actions |
| Deploy (frontend) | Vercel |

---

## 5. Tooling & Dev Dependencies

หมวดนี้กำหนดเครื่องมือมาตรฐานสำหรับ **การพัฒนา (dev)** และ **การตั้งค่า config dependencies** ในทุกโปรเจกต์ bl1nk

---

### 5.1 shadcn/ui — Component Installation

shadcn/ui ไม่ใช่ package ปกติ แต่เป็น **code generator** ที่ copy component เข้า codebase โดยตรง

#### การติดตั้งครั้งแรก

```bash
pnpm dlx shadcn@latest init
```

ตอบ prompt ดังนี้:

| ตัวเลือก | ค่า |
|---------|-----|
| Style | `New York` |
| Base color | `Neutral` (ปรับ teal ใน `globals.css` หลัง init) |
| CSS variables | `Yes` |
| Tailwind config path | `tailwind.config.ts` |
| Components alias | `@/components` |
| Utils alias | `@/lib/utils` |

#### การเพิ่ม component

```bash
# เพิ่มทีละ component
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card input dialog

# เพิ่มทั้งหมดในครั้งเดียว (ไม่แนะนำสำหรับ production — เพิ่มเฉพาะที่ใช้จริง)
pnpm dlx shadcn@latest add --all
```

#### ปรับ teal theme หลัง init

เปิด `app/globals.css` แล้วแทนที่ค่า default ด้วย teal token จากข้อ 1.2:

```css
@layer base {
  :root {
    --background: 178 95% 5%;          /* teal-950 */
    --foreground: 166 84% 95%;         /* teal-50  */
    --primary: 174 72% 40%;            /* teal-500 */
    --primary-foreground: 178 95% 5%;
    --secondary: 175 65% 25%;          /* teal-800 */
    --secondary-foreground: 166 84% 95%;
    --muted: 175 65% 25%;
    --muted-foreground: 167 85% 75%;   /* teal-300 */
    --accent: 173 80% 50%;             /* teal-400 */
    --accent-foreground: 178 95% 5%;
    --border: 174 70% 30%;             /* teal-700 */
    --ring: 173 80% 50%;
    --radius: 0.5rem;
  }
}
```

#### กฎ shadcn

- ห้ามแก้ไขไฟล์ใน `components/ui/` โดยตรง — ให้ wrap หรือ extend แทน
- อัปเดต component ผ่าน `shadcn@latest add <component>` เท่านั้น
- component ใหม่ทุกตัวต้องเพิ่มเข้า `components/ui/` เสมอ

---

### 5.2 Biome — Linter & Formatter

Biome ทำหน้าที่แทน ESLint + Prettier ในโปรเจกต์ bl1nk ทุกตัว

#### ติดตั้ง

```bash
pnpm add -D @biomejs/biome
pnpm biome init
```

#### config มาตรฐาน (`biome.json`)

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "files": {
    "ignoreUnknown": false,
    "ignore": ["node_modules", ".next", "dist", "build", ".turbo"]
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "correctness": {
        "noUnusedVariables": "error",
        "noUnusedImports": "error"
      },
      "suspicious": {
        "noExplicitAny": "error",
        "noConsoleLog": "warn"
      },
      "style": {
        "useConst": "error",
        "useTemplate": "error",
        "noNonNullAssertion": "warn"
      }
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "trailingCommas": "es5",
      "semicolons": "always"
    }
  }
}
```

#### Scripts ใน `package.json`

```json
{
  "scripts": {
    "lint": "biome lint --write .",
    "format": "biome format --write .",
    "check": "biome check --write ."
  }
}
```

#### กฎ Biome

- ใช้ `pnpm check` ก่อน commit เสมอ
- CI pipeline รัน `biome check` โดยไม่มี `--write` (read-only mode)
- ห้ามใช้ ESLint และ Prettier ร่วมกับ Biome ในโปรเจกต์เดียวกัน
- ถ้า Next.js ต้องการ `eslint-config-next` ให้ disable ส่วนที่ซ้อนทับ Biome

---

### 5.3 Knip — Dead Code & Unused Dependencies

Knip ตรวจจับ ไฟล์, export, และ dependency ที่ไม่ได้ใช้งาน

#### ติดตั้ง

```bash
pnpm add -D knip
```

#### config มาตรฐาน (`knip.json`)

```json
{
  "$schema": "https://unpkg.com/knip@latest/schema.json",
  "entry": [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "lib/**/*.{ts,tsx}",
    "hooks/**/*.{ts,tsx}",
    "actions/**/*.{ts,tsx}"
  ],
  "project": [
    "**/*.{ts,tsx}",
    "!node_modules/**",
    "!.next/**",
    "!dist/**"
  ],
  "ignoreDependencies": [
    "@types/*",
    "tailwindcss",
    "postcss",
    "autoprefixer"
  ],
  "ignoreExportsUsedInFile": true
}
```

#### Scripts ใน `package.json`

```json
{
  "scripts": {
    "knip": "knip",
    "knip:fix": "knip --fix"
  }
}
```

#### กฎ Knip

- รัน `pnpm knip` ก่อนทุก release เพื่อตรวจ dead code
- รัน `pnpm knip:fix` เฉพาะเมื่อมั่นใจว่าผลลัพธ์ถูกต้อง — ตรวจสอบก่อน commit
- เพิ่ม `knip` เข้า CI pipeline ในขั้นตอน `lint` หรือแยก job ต่างหาก
- ห้าม ignore export/dependency โดยไม่มีเหตุผล ให้เขียน comment ประกอบ

---

### 5.4 Config Editor — การจัดการ Config Dependencies

Config editor ในที่นี้หมายถึงแนวทางการจัดการ **config files** และ **dev dependencies** ให้สอดคล้องกันทั่วทั้งโปรเจกต์

#### ลำดับ Config Files ที่ต้องมี

```
bl1nk-<n>/
├── biome.json              # Linter + Formatter (แทน ESLint/Prettier)
├── knip.json               # Dead code detector
├── tailwind.config.ts      # Tailwind v4
├── tsconfig.json           # TypeScript (strict)
├── next.config.ts          # Next.js
├── components.json         # shadcn/ui
├── .env.example            # Environment variable template
├── .gitignore
└── .coderabbit.yaml        # Code review bot
```

#### Dev Dependencies มาตรฐาน (`package.json`)

```json
{
  "devDependencies": {
    "@biomejs/biome": "latest",
    "@types/node": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "knip": "latest",
    "typescript": "latest",
    "vitest": "latest",
    "@vitejs/plugin-react": "latest"
  },
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "tailwindcss": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest",
    "lucide-react": "latest",
    "zustand": "latest",
    "@tanstack/react-query": "latest"
  }
}
```

#### กฎ Config Dependencies

- ใช้ `latest` ใน `package.json` สำหรับ dev dependencies — pin เฉพาะเมื่อมี breaking change
- ทุก config file ต้องมี `$schema` ระบุ เพื่อให้ editor รองรับ autocomplete
- ห้ามเพิ่ม dev dependency โดยไม่มี config file คู่กัน (เช่น ติดตั้ง biome ต้องมี `biome.json`)
- ตรวจสอบ config conflicts ก่อน push: Biome vs ESLint, Prettier vs Biome

#### ลำดับการ Init โปรเจกต์ใหม่

```bash
# 1. สร้างโปรเจกต์
pnpm create next-app@latest bl1nk-<n> --typescript --tailwind --app --src-dir=false

# 2. เข้าโฟลเดอร์
cd bl1nk-<n>

# 3. ติดตั้ง shadcn
pnpm dlx shadcn@latest init

# 4. ติดตั้ง Biome
pnpm add -D @biomejs/biome && pnpm biome init

# 5. ติดตั้ง Knip
pnpm add -D knip

# 6. ติดตั้ง dev dependencies อื่น
pnpm add -D vitest @vitejs/plugin-react knip

# 7. ลบ ESLint (ถ้า Next.js สร้างมาให้)
pnpm remove eslint eslint-config-next
rm .eslintrc* eslint.config.*

# 8. ตั้งค่า config files ตามมาตรฐานข้างต้น

# 9. รัน check ครั้งแรก
pnpm check && pnpm knip
```

---

### 5.5 Tailwind CSS v4 — Config & Dark Theme

Tailwind v4 เปลี่ยนจาก `tailwind.config.js/ts` มาเป็น CSS-first config ทั้งหมด

#### ติดตั้ง

```bash
pnpm add tailwindcss @tailwindcss/vite
# หรือสำหรับ Next.js
pnpm add tailwindcss @tailwindcss/postcss postcss
```

#### config มาตรฐาน (`app/globals.css` — Tailwind v4)

```css
@import "tailwindcss";

@theme {
  /* Brand — Teal */
  --color-brand-950: #042f2e;
  --color-brand-900: #134e4a;
  --color-brand-800: #115e59;
  --color-brand-700: #0f766e;
  --color-brand-600: #0d9488;
  --color-brand-500: #14b8a6;
  --color-brand-400: #2dd4bf;
  --color-brand-300: #5eead4;
  --color-brand-200: #99f6e4;
  --color-brand-50:  #f0fdfa;

  /* Typography */
  --font-sans: 'Geist', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'Geist Mono', ui-monospace, monospace;

  /* Radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
}
```

> **กฎ:** ใน Tailwind v4 ไม่ต้องมี `tailwind.config.ts` อีกต่อไป ทุก theme config อยู่ใน `@theme {}` ใน CSS

#### Dark Theme High Contrast

Dark theme ของ bl1nk ใช้ **High Contrast** เป็นค่าเริ่มต้น — ต้องผ่านเกณฑ์ WCAG AA ทุก text element

```css
/* globals.css — dark high-contrast theme (default) */
@layer base {
  :root {
    color-scheme: dark;

    /* พื้นหลัง */
    --bg-base:      #042f2e;   /* teal-950 */
    --bg-surface:   #134e4a;   /* teal-900 */
    --bg-elevated:  #115e59;   /* teal-800 */

    /* ข้อความ — high contrast */
    --text-primary:  #f0fdfa;  /* teal-50  — contrast 14.5:1 บน bg-base */
    --text-secondary:#ccfbf1;  /* teal-100 — contrast 11.2:1 */
    --text-muted:    #5eead4;  /* teal-300 — contrast  5.8:1 (ผ่าน AA) */
    --text-disabled: #0f766e;  /* teal-700 — decorative เท่านั้น */

    /* Border */
    --border-subtle:  rgba(45, 212, 191, 0.15);  /* teal-400/15 */
    --border-default: rgba(45, 212, 191, 0.30);  /* teal-400/30 */
    --border-strong:  rgba(45, 212, 191, 0.55);  /* teal-400/55 */

    /* Interactive */
    --interactive-default: #14b8a6;  /* teal-500 */
    --interactive-hover:   #0d9488;  /* teal-600 */
    --interactive-active:  #0f766e;  /* teal-700 */
    --interactive-focus:   #2dd4bf;  /* teal-400 — focus ring */
  }
}
```

#### กฎ Dark High Contrast

| กฎ | รายละเอียด |
|----|-----------|
| ขั้นต่ำ text | Contrast ratio ≥ 4.5:1 (WCAG AA) สำหรับ body text ทุกขนาด |
| ขั้นต่ำ heading | Contrast ratio ≥ 3:1 สำหรับ text ≥ 18px |
| Text disabled | ≤ 3:1 ได้ — ต้องไม่ใช่ข้อมูลสำคัญ |
| Focus ring | ใช้ `--interactive-focus` (teal-400) เสมอ กว้าง ≥ 2px |
| ห้าม | ใช้ text สี `teal-600` หรือเข้มกว่า บนพื้น `teal-900` |

#### ตัวอย่าง — High Contrast Component

```tsx
// ✅ ผ่าน high contrast — teal-50 บน teal-950
<p className="text-teal-50 bg-brand-950">เนื้อหาหลัก</p>

// ✅ ผ่าน — teal-300 บน teal-950 (5.8:1)
<span className="text-teal-300">ข้อความรอง</span>

// ❌ ไม่ผ่าน — teal-700 บน teal-900 (1.3:1)
<span className="text-teal-700 bg-teal-900">ข้อความ</span>
```

---

### 5.6 Shelve — การจัดการ Environment Variables

Shelve ใช้สำหรับ sync `.env` files ข้าม machine และ environment โดยไม่ต้องแชร์ไฟล์ `.env` ตรงๆ

#### ติดตั้ง

```bash
pnpm add -D @shelve/cli
# หรือ global
pnpm add -g @shelve/cli
```

#### โครงสร้าง Environment

```
bl1nk-<n>/
├── .env                    # local dev (gitignored)
├── .env.example            # template สำหรับ dev ใหม่ (commit เข้า git)
├── .env.test               # สำหรับ vitest (gitignored)
└── shelve.config.ts        # Shelve configuration
```

#### config มาตรฐาน (`shelve.config.ts`)

```ts
import { defineConfig } from '@shelve/cli'

export default defineConfig({
  project: 'bl1nk-<n>',
  // environment mapping
  environments: {
    development: '.env',
    test:        '.env.test',
    production:  '.env.production',
  },
  // ตัวแปรที่ต้องมีในทุก environment
  required: [
    'DATABASE_URL',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
  ],
})
```

#### Scripts ใน `package.json`

```json
{
  "scripts": {
    "env:pull":   "shelve pull",
    "env:push":   "shelve push",
    "env:check":  "shelve check",
    "env:diff":   "shelve diff"
  }
}
```

#### กฎ Shelve / ENV

- ห้าม commit `.env`, `.env.local`, `.env.production` เด็ดขาด
- `.env.example` ต้องอัปเดตทุกครั้งที่เพิ่ม/ลบตัวแปร
- ตัวแปรทุกตัวต้องมี comment อธิบายใน `.env.example`
- ใช้ prefix ตาม service: `NEXT_PUBLIC_` (client), `DATABASE_` (db), `UPSTASH_` (cache)
- secret ห้ามใส่ใน `NEXT_PUBLIC_*` เด็ดขาด

```bash
# .env.example — รูปแบบมาตรฐาน
# ฐานข้อมูล
DATABASE_URL=postgresql://user:pass@host:5432/db

# Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=                    # รัน: openssl rand -base64 32

# Upstash Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Public (client-safe เท่านั้น)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

### 5.7 tsup — Package & Library Build

tsup ใช้สำหรับ build TypeScript library หรือ CLI tools ในโปรเจกต์ที่ไม่ใช่ Next.js app เช่น `bl1nk-sdk`, `bl1nk-cli`

#### ติดตั้ง

```bash
pnpm add -D tsup
```

#### config มาตรฐาน (`tsup.config.ts`)

```ts
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: false,           // minify เฉพาะ production release
  treeshake: true,
  outDir: 'dist',
  external: [],            // ระบุ peer dependencies ที่ไม่ต้อง bundle
  banner: {
    js: '"use client"',    // เพิ่มเฉพาะ React component library
  },
})
```

#### Scripts ใน `package.json`

```json
{
  "scripts": {
    "build":       "tsup",
    "build:watch": "tsup --watch",
    "build:prod":  "tsup --minify"
  },
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  },
  "main":  "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts"
}
```

#### กฎ tsup

- ใช้ tsup เฉพาะโปรเจกต์ประเภท **library / SDK / CLI** เท่านั้น
- Next.js app ใช้ `next build` ไม่ใช่ tsup
- ต้อง export ทั้ง `esm` และ `cjs` เสมอ เพื่อรองรับ environment ที่ต่างกัน
- `dts: true` บังคับ — ต้องมี type definitions ทุกครั้ง

---

### 5.8 Shiki — Syntax Highlighting

Shiki ใช้สำหรับ render code block ใน documentation, blog, และ UI ที่ต้องแสดงโค้ด

#### ติดตั้ง

```bash
pnpm add shiki
```

#### config มาตรฐาน

```ts
// lib/shiki.ts
import { createHighlighter } from 'shiki'

export const highlighter = await createHighlighter({
  themes: ['github-dark-high-contrast'],   // ใช้ high contrast สอดคล้อง dark theme
  langs: [
    'typescript', 'tsx', 'javascript', 'jsx',
    'bash', 'json', 'yaml', 'css', 'markdown',
    'python', 'rust', 'toml',
  ],
})

export function highlight(code: string, lang: string): string {
  return highlighter.codeToHtml(code, {
    lang,
    theme: 'github-dark-high-contrast',
  })
}
```

#### ใน React Component

```tsx
// components/shared/code-block.tsx
import { highlight } from '@/lib/shiki'

interface CodeBlockProps {
  code: string
  lang?: string
  filename?: string
}

export async function CodeBlock({ code, lang = 'typescript', filename }: CodeBlockProps) {
  const html = await highlight(code, lang)

  return (
    <div className="rounded-lg border border-teal-700/40 overflow-hidden">
      {filename && (
        <div className="px-4 py-2 bg-teal-900/80 border-b border-teal-700/40">
          <span className="text-xs text-teal-300 font-mono">{filename}</span>
        </div>
      )}
      <div
        className="p-4 bg-teal-950 text-sm overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
```

#### กฎ Shiki

- ใช้ theme `github-dark-high-contrast` เสมอ — สอดคล้องกับ dark high contrast theme
- สร้าง highlighter instance ครั้งเดียวแล้ว reuse (ห้ามสร้างใหม่ทุก render)
- ใน Next.js ใช้ Server Component สำหรับ CodeBlock — ไม่ต้องส่ง shiki ไปฝั่ง client
- รองรับภาษาเฉพาะที่ใช้จริง — ห้าม import ทุก language (bundle ใหญ่)

---

### 5.9 Render — Worker Deployment

Render ใช้สำหรับ deploy **Background Workers**, **Cron Jobs**, และ **API Services** ที่แยกออกจาก Next.js frontend

#### Use Cases ใน bl1nk

| โปรเจกต์ | Worker Type | บน Render |
|---------|------------|----------|
| `bl1nk-trading-bot` | Background Worker (gold/stock analysis) | Worker Service |
| `bl1nk-agent-library` | Queue processor | Worker Service |
| `bl1nk-sdk` | REST API | Web Service |
| Scheduled tasks | Cron job | Cron Job Service |

#### config มาตรฐาน (`render.yaml`)

```yaml
services:
  # Background Worker
  - type: worker
    name: bl1nk-<n>-worker
    runtime: node
    buildCommand: pnpm install && pnpm build
    startCommand: node dist/worker.js
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: bl1nk-db
          property: connectionString
    scaling:
      minInstances: 1
      maxInstances: 3

  # Cron Job
  - type: cron
    name: bl1nk-<n>-cron
    runtime: node
    buildCommand: pnpm install && pnpm build
    startCommand: node dist/cron.js
    schedule: "0 */6 * * *"    # ทุก 6 ชั่วโมง
    envVars:
      - key: NODE_ENV
        value: production
```

#### โครงสร้าง Worker Project

```
bl1nk-<worker>/
├── src/
│   ├── worker.ts           # entry point — Worker Service
│   ├── cron.ts             # entry point — Cron Job
│   ├── jobs/               # job handlers
│   ├── queues/             # queue definitions (Upstash QStash)
│   └── lib/                # shared utilities
├── tsup.config.ts          # build ด้วย tsup
├── render.yaml             # Render deployment config
└── .env.example
```

#### กฎ Render Worker

- ใช้ tsup build ก่อน deploy เสมอ — Render รัน `dist/worker.js`
- Worker ต้องมี graceful shutdown: จัดการ `SIGTERM` และ `SIGINT`
- ไม่มี HTTP server ใน pure worker — ใช้ Queue (Upstash QStash) แทน
- Log ทุก job ด้วย structured JSON: `{ jobId, status, duration, error }`
- ตั้ง `scaling.minInstances: 1` สำหรับ worker ที่ต้องทำงานตลอดเวลา

```ts
// src/worker.ts — graceful shutdown pattern
process.on('SIGTERM', async () => {
  console.log(JSON.stringify({ event: 'shutdown', reason: 'SIGTERM' }))
  await queue.close()
  process.exit(0)
})
```

---

### 5.10 ตารางสรุป Dev Tooling (อัปเดต)

| เครื่องมือ | บทบาท | Config file | แทนที่ |
|-----------|-------|------------|--------|
| **shadcn/ui** | Component generator | `components.json` | — |
| **Tailwind v4** | Utility CSS (CSS-first config) | `globals.css @theme` | `tailwind.config.ts` |
| **Biome** | Lint + Format | `biome.json` | ESLint + Prettier |
| **Knip** | Dead code + unused deps | `knip.json` | — |
| **Shelve** | ENV management & sync | `shelve.config.ts` | dotenv-vault |
| **tsup** | Library/CLI build | `tsup.config.ts` | tsc direct |
| **Shiki** | Syntax highlighting | `lib/shiki.ts` | Prism, Highlight.js |
| **Render** | Worker/Cron deployment | `render.yaml` | — |
| **Vitest** | Unit + Integration test | `vitest.config.ts` | Jest |
| **TypeScript** | Static type check | `tsconfig.json` | — |
| **GitHub Actions** | CI/CD | `.github/workflows/` | — |
| **CodeRabbit** | AI code review | `.coderabbit.yaml` | — |

---

## 6. สคริปต์ Setup & Deployment

### 6.1 Setup Script มาตรฐาน

ทุกโปรเจกต์ bl1nk ต้องมี `scripts/setup.sh` ที่รัน one-command แล้วพร้อม dev ได้ทันที

#### `scripts/setup.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail

# ────────────────────────────────────────────
# bl1nk project setup script
# ────────────────────────────────────────────

BOLD='\033[1m'
TEAL='\033[0;36m'
GREEN='\033[0;32m'
RED='\033[0;31m'
RESET='\033[0m'

log()     { echo -e "${TEAL}[bl1nk]${RESET} $1"; }
success() { echo -e "${GREEN}✓${RESET} $1"; }
error()   { echo -e "${RED}✗${RESET} $1"; exit 1; }

echo -e "\n${BOLD}${TEAL}bl1nk project setup${RESET}\n"

# 1. ตรวจ Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
  error "ต้องใช้ Node.js >= 20 (ปัจจุบัน: $(node -v))"
fi
success "Node.js $(node -v)"

# 2. ตรวจ pnpm
if ! command -v pnpm &> /dev/null; then
  log "ติดตั้ง pnpm..."
  npm install -g pnpm
fi
success "pnpm $(pnpm -v)"

# 3. ติดตั้ง dependencies
log "ติดตั้ง dependencies..."
pnpm install
success "dependencies ติดตั้งเสร็จแล้ว"

# 4. ตั้งค่า env
if [ ! -f ".env" ]; then
  log "สร้าง .env จาก .env.example..."
  cp .env.example .env
  success ".env สร้างแล้ว — แก้ไขค่าก่อนรัน"
else
  success ".env มีอยู่แล้ว"
fi

# 5. ตรวจสอบ env ที่จำเป็น
log "ตรวจสอบ environment variables..."
pnpm env:check || error "ENV ไม่ครบ — แก้ไข .env ก่อน"
success "ENV ครบถ้วน"

# 6. Type check
log "ตรวจสอบ TypeScript..."
pnpm typecheck
success "TypeScript ผ่าน"

# 7. Lint
log "ตรวจสอบ code quality..."
pnpm check
success "Biome check ผ่าน"

echo -e "\n${GREEN}${BOLD}✓ Setup เสร็จสิ้น${RESET} รัน ${TEAL}pnpm dev${RESET} เพื่อเริ่ม\n"
```

#### `scripts/setup.ps1` (Windows)

```powershell
# bl1nk project setup — Windows
$ErrorActionPreference = "Stop"

function Log($msg)     { Write-Host "[bl1nk] $msg" -ForegroundColor Cyan }
function Success($msg) { Write-Host "✓ $msg" -ForegroundColor Green }
function Err($msg)     { Write-Host "✗ $msg" -ForegroundColor Red; exit 1 }

Write-Host "`nbl1nk project setup`n" -ForegroundColor Cyan

# ตรวจ pnpm
if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
  Log "ติดตั้ง pnpm..."; npm install -g pnpm
}
Success "pnpm $(pnpm -v)"

# ติดตั้ง dependencies
Log "ติดตั้ง dependencies..."; pnpm install
Success "dependencies ติดตั้งเสร็จแล้ว"

# ตั้งค่า env
if (-not (Test-Path ".env")) {
  Log "สร้าง .env จาก .env.example..."
  Copy-Item ".env.example" ".env"
  Success ".env สร้างแล้ว — แก้ไขค่าก่อนรัน"
} else { Success ".env มีอยู่แล้ว" }

# Type check + lint
Log "ตรวจสอบ TypeScript..."; pnpm typecheck; Success "TypeScript ผ่าน"
Log "ตรวจสอบ code quality..."; pnpm check; Success "Biome check ผ่าน"

Write-Host "`n✓ Setup เสร็จสิ้น รัน pnpm dev เพื่อเริ่ม`n" -ForegroundColor Green
```

---

### 6.2 Scripts มาตรฐานใน `package.json`

```json
{
  "scripts": {
    // Development
    "dev":          "next dev --turbopack",
    "build":        "next build",
    "start":        "next start",
    "preview":      "next build && next start",

    // Code Quality
    "lint":         "biome lint --write .",
    "format":       "biome format --write .",
    "check":        "biome check --write .",
    "check:ci":     "biome check .",
    "typecheck":    "tsc --noEmit",

    // Testing
    "test":         "vitest run",
    "test:watch":   "vitest",
    "test:ui":      "vitest --ui",
    "test:coverage":"vitest run --coverage",

    // Dead code
    "knip":         "knip",
    "knip:fix":     "knip --fix",

    // ENV
    "env:pull":     "shelve pull",
    "env:push":     "shelve push",
    "env:check":    "shelve check",

    // Setup
    "setup":        "bash scripts/setup.sh",

    // Release
    "release":      "pnpm check:ci && pnpm typecheck && pnpm test && pnpm knip && pnpm build"
  }
}
```

---

### 6.3 CI/CD Pipeline มาตรฐาน

#### `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  quality:
    name: Code Quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: latest

      - uses: actions/setup-node@v4
        with:
          node-version: latest
          cache: pnpm

      - name: ติดตั้ง dependencies
        run: pnpm install --frozen-lockfile

      - name: Biome check
        run: pnpm check:ci

      - name: TypeScript
        run: pnpm typecheck

      - name: Knip (dead code)
        run: pnpm knip

  test:
    name: Test
    runs-on: ubuntu-latest
    needs: quality
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: latest }
      - uses: actions/setup-node@v4
        with: { node-version: latest, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm test

  build:
    name: Build
    runs-on: ubuntu-latest
    needs: [quality, test]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: latest }
      - uses: actions/setup-node@v4
        with: { node-version: latest, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
```

---

## 7. การจัดการคุณภาพโค้ด

### 7.1 ภาพรวม Quality Gates

ทุก code change ต้องผ่าน gate ทั้ง 5 ระดับก่อน merge:

```
commit → pre-commit hook → PR → CI pipeline → code review (CodeRabbit) → merge
           (Biome)           (lint+type+test+knip+build)   (automated)
```

---

### 7.2 Pre-commit Hook (Lefthook)

```bash
pnpm add -D lefthook
```

#### `lefthook.yml`

```yaml
pre-commit:
  parallel: true
  commands:
    biome:
      glob: "*.{ts,tsx,js,jsx,json}"
      run: pnpm biome check --write {staged_files}
      stage_fixed: true

    typecheck:
      run: pnpm typecheck

post-commit:
  commands:
    knip-warn:
      run: pnpm knip || echo "[warn] knip พบ dead code — รัน pnpm knip:fix"
```

---

### 7.3 Testing Standards

#### โครงสร้าง Test Files

```
src/
├── lib/
│   ├── utils.ts
│   └── utils.test.ts       # unit test อยู่คู่กับ source
├── components/
│   └── card/
│       ├── card.tsx
│       └── card.test.tsx
└── __tests__/              # integration tests
    └── api.test.ts
```

#### `vitest.config.ts`

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines:      80,
        functions:  80,
        branches:   70,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

#### กฎ Testing

| ระดับ | เครื่องมือ | Coverage target |
|-------|----------|----------------|
| Unit | Vitest | ≥ 80% lines |
| Component | Vitest + Testing Library | ≥ 70% branches |
| Integration | Vitest | critical paths |
| E2E | Playwright (optional) | happy paths |

- ทุก utility function ใน `lib/` ต้องมี unit test
- ทุก Server Action ต้องมี integration test
- ห้าม mock ทั้งหมด — mock เฉพาะ external services (API, DB)

---

### 7.4 Code Review Standards

#### CodeRabbit Config (`.coderabbit.yaml`)

```yaml
language: th
reviews:
  profile: assertive
  request_changes_workflow: true
  high_level_summary: true
  poem: false
  review_status: true
  collapse_walkthrough: false
  auto_review:
    enabled: true
    drafts: false
    base_branches:
      - main
      - develop
chat:
  auto_reply: true
```

#### Checklist PR ก่อน Request Review

```markdown
## PR Checklist

- [ ] `pnpm check:ci` ผ่าน (Biome)
- [ ] `pnpm typecheck` ผ่าน
- [ ] `pnpm test` ผ่าน ทุก test
- [ ] `pnpm knip` ไม่มี dead code ใหม่
- [ ] `pnpm build` สำเร็จ
- [ ] `.env.example` อัปเดตถ้าเพิ่ม ENV ใหม่
- [ ] `AGENTS.md` อัปเดตถ้า architecture เปลี่ยน
- [ ] ไม่มี `console.log` เหลือใน production code
- [ ] ไม่มี `any` type ใหม่
- [ ] ไม่มี `TODO` ค้างจากงานนี้ (ถ้ามีต้องมี issue reference)
```

---

### 7.5 Dependency Management

```bash
# ตรวจ outdated packages
pnpm outdated

# อัปเดต interactive
pnpm update --interactive --latest

# ตรวจ security vulnerabilities
pnpm audit

# ลบ dependencies ที่ไม่ใช้ (หลังรัน knip)
pnpm knip --fix
pnpm prune
```

#### กฎ Dependencies

- รัน `pnpm audit` ทุก sprint — fix `high` และ `critical` ก่อน release
- ห้าม pin exact version (`1.2.3`) — ใช้ `^1.2.3` หรือ `latest`
- เพิ่ม peer dependency ใน `peerDependencies` ไม่ใช่ `dependencies`
- ทุก dependency ใหม่ต้องมีเหตุผลชัดเจนใน PR description

---

*bl1nk Style Guide — ใช้ภายในเท่านั้น ข้อมูลและทรัพย์สินทางปัญญาทั้งหมดเป็นสิทธิ์ของ อาจารย์ (Dollawatt) แต่เพียงผู้เดียว*
