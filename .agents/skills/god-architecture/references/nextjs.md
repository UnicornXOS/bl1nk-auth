# 📘 Next.js Architecture & Best Practices Guide (2026)

**เวอร์ชัน:** 2.0.0 (Updated for Next.js 15/16 & React 19)
**สำหรับ:** god-architecture Skill

## 🛠️ Tech Stack (Latest 2026)
- **Next.js:** ^15.0.0 - 16.0.0 (App Router)
- **React:** ^19.0.0
- **TypeScript:** ^5.7.0
- **Tailwind CSS:** ^4.0.0
- **ORM:** Prisma ^6.0.0 / Drizzle ^0.36.0
- **State:** Zustand ^5.0.0 / TanStack Query ^5.60.0
- **Validation:** Zod ^3.24.0

## 📁 Project Structure (Modular Architecture)
```text
src/
├── app/                 # App Router (Routes, Layouts, Server Components)
├── components/          # UI Components (Atomic Design or Feature-based)
│   ├── ui/              # Base UI (shadcn/ui)
│   └── shared/          # Shared Business Components
├── features/            # Feature-based Modules (Encapsulated Logic)
│   └── [feature-name]/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── types/
├── lib/                 # Core Utilities & Shared Config
├── hooks/               # Global Hooks
├── services/            # Global API/External Services
├── store/               # Global State Management
├── types/               # Global TypeScript Definitions
└── styles/              # Global CSS/Themes
```

## 🔗 Reference Links (10+)
1. [Next.js Official Documentation (Architecture)](https://nextjs.org/docs/architecture)
2. [Next.js App Router Best Practices (2026)](https://nextjs.org/docs/app/building-your-application/routing)
3. [React 19 Upgrade Guide & Patterns](https://react.dev/blog/2024/12/05/react-19)
4. [Tailwind CSS v4 Configuration & Performance](https://tailwindcss.com/docs/v4-beta)
5. [Prisma Best Practices for Next.js Server Components](https://www.prisma.io/docs/guides/other/nextjs)
6. [Zod Schema Validation & TypeScript Integration](https://zod.dev/?id=introduction)
7. [TanStack Query v5 Patterns for Next.js](https://tanstack.com/query/latest/docs/framework/react/guides/ssr)
8. [Zustand State Management Patterns (2026)](https://docs.pmnd.rs/zustand/getting-started/introduction)
9. [Shadcn UI Component Architecture](https://ui.shadcn.com/docs/architecture)
10. [Vercel Deployment & Performance Optimization](https://vercel.com/docs/concepts/next.js/overview)
11. [Vitest for Next.js Unit Testing Guide](https://vitest.dev/guide/)
12. [Cypress E2E Testing for Next.js Apps](https://docs.cypress.io/guides/component-testing/nextjs)
