# 📘 Monorepo Architecture & Best Practices Guide (2026)

**เวอร์ชัน:** 1.0.0
**สำหรับ:** god-architecture Skill

## 🛠️ Tech Stack (Latest 2026)
- **Turborepo:** ^2.3.0 (task orchestration + caching)
- **pnpm workspaces:** ^9.0.0 (package manager — แนะนำ)
- **TypeScript:** ^5.7.0 (shared tsconfig)
- **Changesets:** ^2.27.0 (version management)
- **ESLint / Prettier:** shared config packages

## 📁 Turborepo Structure (แนะนำ)
```text
my-monorepo/
├── apps/
│   ├── web/             # Next.js frontend
│   ├── api/             # NestJS / Express backend
│   └── mobile/          # React Native / Flutter
├── packages/
│   ├── ui/              # Shared component library (React)
│   ├── config-eslint/   # Shared ESLint config
│   ├── config-typescript/ # Shared tsconfig
│   ├── db/              # Prisma / Drizzle schema + client
│   ├── types/           # Shared TypeScript types
│   └── utils/           # Shared utilities
├── turbo.json           # Pipeline configuration
├── pnpm-workspace.yaml  # Workspace definition
└── package.json         # Root package (private: true)
```

## ⚙️ turbo.json Pipeline

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    },
    "typecheck": {
      "dependsOn": ["^build"]
    }
  },
  "remoteCache": {
    "enabled": true
  }
}
```

## 📦 pnpm-workspace.yaml
```yaml
packages:
  - "apps/*"
  - "packages/*"
```

## 🔗 Internal Package ที่ถูกต้อง

### packages/ui/package.json
```json
{
  "name": "@repo/ui",
  "version": "0.0.0",
  "private": true,
  "exports": {
    ".": "./src/index.ts"
  }
}
```

### ใช้ใน apps/web
```json
{
  "dependencies": {
    "@repo/ui": "workspace:*",
    "@repo/types": "workspace:*"
  }
}
```

## 📐 Shared tsconfig Pattern
```json
// packages/config-typescript/base.json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "moduleResolution": "bundler",
    "skipLibCheck": true
  }
}

// apps/web/tsconfig.json
{
  "extends": "@repo/config-typescript/base.json",
  "compilerOptions": {
    "plugins": [{ "name": "next" }]
  }
}
```

## 🚀 Turborepo Remote Cache (Vercel)
```bash
# Login ครั้งแรก
npx turbo login

# Link กับ Vercel Remote Cache
npx turbo link

# Build พร้อม cache
pnpm turbo build
```

## 🔴 Anti-patterns ที่พบบ่อย
| Anti-pattern | วิธีแก้ |
|---|---|
| Copy-paste code ข้าม apps | สร้าง shared package แทน |
| ใช้ npm หรือ yarn แทน pnpm | pnpm workspaces จัดการ symlinks ดีกว่า |
| ไม่ set `dependsOn` ใน turbo.json | build order ผิด → runtime error |
| packages มี circular dependency | วาด dependency graph ก่อนแตก package |
| ไม่ใช้ Remote Cache | CI ช้าโดยไม่จำเป็น |

## 🔗 Reference Links
1. [Turborepo Official Docs](https://turbo.build/repo/docs)
2. [Turborepo Handbook — Structuring a Monorepo](https://turbo.build/repo/docs/handbook)
3. [pnpm Workspaces](https://pnpm.io/workspaces)
4. [Changesets — Versioning](https://github.com/changesets/changesets)
5. [Nx vs Turborepo Comparison (2026)](https://turbo.build/repo/docs/getting-started/monorepo-introduction)
6. [Vercel Remote Caching](https://vercel.com/docs/monorepos/turborepo)
7. [Creating a Shared UI Package](https://turbo.build/repo/docs/crafting-your-repository/creating-an-internal-package)
