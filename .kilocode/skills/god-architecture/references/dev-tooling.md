# 📘 Dev Tooling & Quality Reference (2026)

**สำหรับ:** god-architecture Skill
**ครอบคลุม:** Linters, Formatters, Spellcheck, Testing tools, Editor config, Script conventions

---

## 🔧 Dev Dependencies ที่แนะนำตาม Project Type

### TypeScript / JavaScript (ทุกโปรเจกต์)

| Tool | Package | หน้าที่ |
|------|---------|--------|
| **Biome** | `@biomejs/biome` | Lint + Format ในตัวเดียว (แทน ESLint+Prettier) — เร็วกว่า 10x |
| **ESLint** | `eslint` + plugins | ใช้ถ้า ecosystem ต้องการ plugin เฉพาะ |
| **Prettier** | `prettier` | Format เท่านั้น ถ้าไม่ใช้ Biome |
| **TypeScript** | `typescript` | ต้องมีเสมอ |
| **Vitest** | `vitest` | Unit/Integration test (เร็วกว่า Jest) |
| **Playwright** | `@playwright/test` | E2E test — ใช้สำหรับ UI flows |
| **cspell** | `cspell` | Code spell check — จับ typo ใน code/comments |
| **markdownlint-cli2** | `markdownlint-cli2` | ตรวจ Markdown docs quality |
| **lint-staged** | `lint-staged` | รัน linter เฉพาะ staged files |
| **husky** | `husky` | Git hooks manager |
| **knip** | `knip` | Dead code + unused dependencies |
| **lefthook** | `lefthook` | Git hooks (เบากว่า husky, ใช้ YAML) |

### Python

| Tool | Package | หน้าที่ |
|------|---------|--------|
| **ruff** | `ruff` | Lint + Format (แทน flake8+black) — เร็วมาก |
| **mypy** | `mypy` | Type checking |
| **pytest** | `pytest` | Testing |
| **pytest-cov** | `pytest-cov` | Coverage |
| **pre-commit** | `pre-commit` | Git hooks |

### Rust

| Tool | ใช้อย่างไร | หน้าที่ |
|------|-----------|--------|
| **clippy** | `cargo clippy` | Linting |
| **rustfmt** | `cargo fmt` | Formatting |
| **cargo-nextest** | `cargo nextest run` | Fast test runner |
| **cargo-audit** | `cargo audit` | Security audit |

---

## ⚙️ EditorConfig (.editorconfig)

ต้องมีทุกโปรเจกต์ — บังคับ indent/encoding ข้าม IDE:

```ini
# .editorconfig
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 2

[*.{py,rs}]
indent_size = 4

[Makefile]
indent_style = tab

[*.md]
trim_trailing_whitespace = false
```

---

## 📜 Package.json Scripts Convention

```json
{
  "scripts": {
    "dev": "...",
    "build": "...",
    "start": "...",
    
    "lint": "biome check .",
    "lint:fix": "biome check --write .",
    "format": "biome format --write .",
    "typecheck": "tsc --noEmit",
    
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:e2e": "playwright test",
    "test:coverage": "vitest run --coverage",
    
    "spell": "cspell '**/*.{ts,tsx,md,json}' --no-progress",
    "docs:lint": "markdownlint-cli2 '**/*.md' '#node_modules'",
    
    "check": "pnpm lint && pnpm typecheck && pnpm spell",
    "check:all": "pnpm check && pnpm test",
    "prepare": "husky"
  }
}
```

> **กฎ:** ต้องมี `check` script ที่รัน lint + typecheck เสมอ ใช้เป็น pre-commit gate

---

## 🪝 Git Hooks Setup (Husky + lint-staged)

```bash
# Setup
pnpm add -D husky lint-staged
npx husky init

# .husky/pre-commit
pnpm lint-staged

# .husky/pre-push
pnpm check:all
```

```json
// package.json — lint-staged config
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": ["biome check --write", "biome format --write"],
    "*.{md}": ["markdownlint-cli2 --fix"],
    "*.{ts,tsx}": ["bash -c 'tsc --noEmit'"]
  }
}
```

---

## 🧪 Testing Conventions

### File Naming
```
src/
├── features/auth/
│   ├── auth.service.ts
│   ├── auth.service.test.ts      # Unit test — colocate กับ source
│   └── auth.e2e.spec.ts          # E2E spec ถ้ามี
└── __tests__/                    # Integration tests
    └── auth.integration.test.ts
```

### Test Script Execution Order (บังคับ)
```bash
# ก่อนเริ่มงานทุกครั้ง
pnpm install --frozen-lockfile    # ติดตั้ง deps ตาม lockfile
pnpm check                        # lint + typecheck
pnpm test                         # unit tests

# หลังทำงานเสร็จทุกครั้ง
pnpm test                         # ต้อง pass ก่อน commit
pnpm test:e2e                     # ถ้ามี UI changes
```

---

## 📱 Mobile-First UI Rules

ทุก UI component ต้องสร้างจาก mobile ขึ้นไปเสมอ:

```css
/* ✅ ถูก — mobile-first */
.container { width: 100%; padding: 1rem; }
@media (min-width: 768px) { .container { max-width: 768px; } }
@media (min-width: 1280px) { .container { max-width: 1280px; } }

/* ❌ ผิด — desktop-first */
.container { max-width: 1280px; }
@media (max-width: 768px) { .container { width: 100%; } }
```

```typescript
// Tailwind breakpoints (mobile-first)
// sm: 640px | md: 768px | lg: 1024px | xl: 1280px | 2xl: 1536px
// ใช้ className ปกติ = mobile, เพิ่ม prefix = larger screen

// ✅ ถูก
<div className="flex flex-col md:flex-row gap-4">
// ❌ ผิด
<div className="flex flex-row max-md:flex-col gap-4">
```

---

## 📚 cspell Configuration

```json
// cspell.json
{
  "version": "0.2",
  "language": "en",
  "words": [
    "fastapi", "zustand", "jotai", "drizzle", "prisma",
    "tauri", "riverpod", "monorepo", "turborepo", "supabase",
    "biome", "vitest", "lefthook", "knip"
  ],
  "ignorePaths": ["node_modules", "dist", ".next", "*.lock"],
  "ignoreRegExpList": [
    "[A-Z]{3,}",
    "0x[0-9a-fA-F]+",
    "(?:[a-z]+_[a-z]+)+"
  ]
}
```

---

## 🔗 Key References
1. [Biome — Fast Linter & Formatter](https://biomejs.dev/guides/getting-started/)
2. [Vitest — Next-Gen Testing](https://vitest.dev/guide/)
3. [Playwright — E2E Testing](https://playwright.dev/docs/intro)
4. [cspell — Code Spell Checker](https://cspell.org/configuration/)
5. [markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2)
6. [Husky — Git Hooks](https://typicode.github.io/husky/)
7. [lint-staged](https://github.com/lint-staged/lint-staged)
8. [Knip — Dead Code Finder](https://knip.dev/guides/getting-started)
9. [EditorConfig](https://editorconfig.org/)
10. [Ruff — Python Linter](https://docs.astral.sh/ruff/)
