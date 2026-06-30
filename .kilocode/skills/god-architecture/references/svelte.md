# 📘 SvelteKit Architecture Guide (2026)

**สำหรับ:** god-architecture Skill
**Stack:** SvelteKit 2.x, Svelte 5, TypeScript, Vite

## Tech Stack (2026)
- **SvelteKit:** ^2.0 (Svelte 5 runes)
- **Svelte:** ^5.0 (runes: `$state`, `$derived`, `$effect`)
- **TypeScript:** ^5.7
- **Styling:** Tailwind CSS v4 / UnoCSS
- **ORM:** Drizzle ORM / Prisma
- **Auth:** Lucia / Auth.js v5
- **Testing:** Vitest + Playwright

## Project Structure
```
src/
├── routes/
│   ├── +layout.svelte       # Root layout
│   ├── +layout.server.ts    # Server load (auth, session)
│   ├── +page.svelte         # Page component
│   ├── +page.server.ts      # Form actions + server load
│   └── api/[...]/
│       └── +server.ts       # REST API endpoints
├── lib/
│   ├── server/              # Server-only (DB, auth)
│   │   ├── db.ts
│   │   └── auth.ts
│   ├── components/          # Shared components
│   ├── stores/              # Svelte 5 runes stores
│   └── utils/
└── app.d.ts                 # TypeScript declarations
```

## Svelte 5 Runes Pattern
```typescript
// ใช้ $state แทน writable store
let count = $state(0)
let double = $derived(count * 2)
$effect(() => { console.log(count) })

// Component with TypeScript
interface Props { name: string; onClick: () => void }
let { name, onClick }: Props = $props()
```

## Data Loading Pattern
```typescript
// +page.server.ts — server-side load
export const load = async ({ locals, params }) => {
  const user = await db.user.findUnique({ where: { id: params.id } })
  return { user }
}

// Form Action
export const actions = {
  create: async ({ request, locals }) => {
    const data = await request.formData()
    // validate + save
    return { success: true }
  }
}
```

## Key Patterns
- **Server vs Client:** `+page.server.ts` = server only, `+page.svelte` = universal
- **Stores:** Svelte 5 runes แทน Svelte 4 stores สำหรับ local state
- **API routes:** `+server.ts` สำหรับ REST endpoints (GET/POST/PUT/DELETE)
- **Auth:** ตรวจ `locals.user` ใน `+layout.server.ts` เสมอ
