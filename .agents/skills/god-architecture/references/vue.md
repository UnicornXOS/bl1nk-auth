# 📗 Vue/Nuxt Architecture & Best Practices Guide (2026)

**เวอร์ชัน:** 2.0.0 (Updated for Nuxt 4 & Vue 3.6)
**สำหรับ:** god-architecture Skill

## 🛠️ Tech Stack (Latest 2026)
- **Nuxt:** ^4.0.0 (Stable)
- **Vue:** ^3.6.0
- **TypeScript:** ^5.7.0
- **Tailwind CSS:** ^4.0.0
- **State:** Pinia ^3.0.0 / TanStack Query (Vue) ^5.60.0
- **ORM:** Prisma ^6.0.0 / Drizzle ^0.36.0
- **Validation:** Zod ^3.24.0 / VeeValidate ^5.0.0

## 📁 Project Structure (Nuxt 4 Layers)
```text
my-nuxt-app/
├── app/                 # Main App Directory
│   ├── app.vue
│   ├── router.options.ts
│   └── ...
├── components/          # Auto-imported components
├── composables/         # Auto-imported logic
├── layouts/             # Page layouts
├── pages/               # File-based routing
├── server/              # Server-side logic (Nitro)
│   ├── api/
│   ├── middleware/
│   ├── routes/
│   └── utils/
├── layers/              # Nuxt Layers (Modularization)
│   └── base-ui/
│   └── auth-feature/
├── public/              # Static assets
└── types/               # TypeScript global types
```

## 🔗 Reference Links (10+)
1. [Nuxt 4 Official Documentation (Architecture)](https://nuxt.com/docs/4.x/guide/concepts/architecture)
2. [Vue 3.6 Composition API Best Practices](https://vuejs.org/guide/extras/composition-api-faq)
3. [Nuxt Layers for Enterprise Scale Architecture](https://nuxt.com/docs/guide/going-further/layers)
4. [Pinia v3 State Management Guide](https://pinia.vuejs.org/introduction.html)
5. [Nuxt Nitro Server Engine & API Design](https://nitro.unjs.io/guide)
6. [Vue Test Utils & Vitest for Vue 3](https://test-utils.vuejs.org/guide/)
7. [VeeValidate v5 Form Validation for Vue](https://vee-validate.logaretm.com/v4/)
8. [TanStack Query for Vue v5 Guide](https://tanstack.com/query/latest/docs/framework/vue/overview)
9. [Nuxt Security & Best Practices (2026)](https://nuxt.com/docs/getting-started/security)
10. [VueUse Library for Common Composables](https://vueuse.org/guide/)
11. [Nuxt Image & Asset Optimization](https://image.nuxt.com/usage/nuxt-picture)
12. [Nuxt I18n for Multi-language Apps](https://i18n.nuxtjs.org/getting-started)
