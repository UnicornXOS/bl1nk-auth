# Template: SvelteKit Project Structure

## สร้างโปรเจกต์ใหม่
```bash
npx sv create my-app --template minimal --types ts
cd my-app && npm install
```

## Directory Structure
```
my-app/
├── src/
│   ├── routes/
│   │   ├── +layout.svelte
│   │   ├── +layout.server.ts    # Auth check
│   │   ├── +page.svelte
│   │   ├── +page.server.ts
│   │   └── api/
│   │       └── [resource]/
│   │           └── +server.ts
│   ├── lib/
│   │   ├── server/              # $lib/server — server-only
│   │   │   ├── db.ts
│   │   │   └── auth.ts
│   │   ├── components/
│   │   └── utils/
│   └── app.d.ts                 # TypeScript ambient declarations
├── static/
├── svelte.config.js
└── vite.config.ts
```

## Ambient Types (app.d.ts)
```typescript
declare global {
  namespace App {
    interface Locals { user: User | null }
    interface PageData {}
    interface Error { message: string }
  }
}
```
