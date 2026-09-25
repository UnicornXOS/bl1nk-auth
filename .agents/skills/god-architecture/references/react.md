# 📘 React Architecture & Best Practices Guide (2026)

**เวอร์ชัน:** 1.0.0
**สำหรับ:** god-architecture Skill

## 🛠️ Tech Stack (Latest 2026)
- **React:** ^19.0.0
- **TypeScript:** ^5.7.0
- **Vite:** ^6.0.0 (bundler หลักสำหรับ SPA)
- **TanStack Router:** ^1.0.0 / React Router ^7.0.0
- **TanStack Query:** ^5.60.0
- **State:** Zustand ^5.0.0 / Jotai ^2.0.0
- **Styling:** Tailwind CSS ^4.0.0 / CSS Modules
- **Validation:** Zod ^3.24.0
- **Testing:** Vitest ^3.0.0 + React Testing Library ^16.0.0

## 📁 Project Structure (Feature-based)
```text
src/
├── assets/              # รูป, ฟอนต์, ไอคอน static
├── components/
│   ├── ui/              # Base UI (shadcn/ui หรือ custom)
│   └── shared/          # Shared Business Components
├── features/            # Feature-based Modules (แนะนำสำหรับโปรเจกต์ขนาดกลาง-ใหญ่)
│   └── [feature-name]/
│       ├── components/  # Components เฉพาะ feature
│       ├── hooks/       # Custom hooks ของ feature
│       ├── store/       # Zustand slice หรือ Jotai atoms
│       ├── api/         # API calls (TanStack Query)
│       └── types/       # TypeScript types/interfaces
├── hooks/               # Global Custom Hooks
├── lib/                 # Utilities, helpers, config
├── pages/ (หรือ routes/) # Route-level components
├── store/               # Global state
├── types/               # Global TypeScript types
└── styles/              # Global CSS / Tailwind config
```

## ⚡ React 19 Patterns ที่ควรรู้
- **Server Components:** ใช้ได้ใน Next.js เท่านั้น — Vite SPA ยังใช้ Client Components ทั้งหมด
- **`use()` hook:** อ่าน Promise หรือ Context โดยตรงใน render
- **Actions:** `useTransition` + async functions แทน event handlers สำหรับ mutation
- **`useOptimistic`:** Optimistic UI ในตัวโดยไม่ต้องพึ่ง library
- **Ref as prop:** ไม่ต้องใช้ `forwardRef` แล้ว — ส่ง `ref` เป็น prop ปกติได้เลย
- **`use client` / `use server`:** directive สำหรับ Next.js App Router

## 🔴 Anti-patterns ที่พบบ่อย
| Anti-pattern | วิธีแก้ |
|---|---|
| Prop drilling เกิน 3 ชั้น | ใช้ Context, Zustand, หรือ composition |
| useEffect fetch data | ใช้ TanStack Query แทน |
| Logic ใน component ยาวเกิน 200 บรรทัด | แยกเป็น custom hook |
| ใช้ index เป็น key ใน list | ใช้ unique ID จริง |
| State หลายตัวที่ update พร้อมกัน | รวมเป็น object เดียวหรือใช้ `useReducer` |

## 🔗 Reference Links
1. [React 19 Release & New Features](https://react.dev/blog/2024/12/05/react-19)
2. [TanStack Query v5 — Data Fetching Patterns](https://tanstack.com/query/latest/docs/framework/react/overview)
3. [TanStack Router — Type-safe Routing](https://tanstack.com/router/latest/docs/framework/react/overview)
4. [Zustand — Lightweight State Management](https://docs.pmnd.rs/zustand/getting-started/introduction)
5. [Jotai — Atomic State for React](https://jotai.org/docs/introduction)
6. [Vite 6 Configuration Guide](https://vite.dev/guide/)
7. [React Testing Library Best Practices](https://testing-library.com/docs/react-testing-library/intro/)
8. [Vitest — Fast Unit Testing](https://vitest.dev/guide/)
9. [Shadcn UI — Component System](https://ui.shadcn.com/docs)
10. [Bulletproof React — Project Architecture Guide](https://github.com/alan2207/bulletproof-react)
