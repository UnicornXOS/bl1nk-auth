# Changelog — god-architecture skill

## [2.1.0] - 2026-03-06

### Added
- `scripts/env-check.sh` — Startup hook ตรวจ tool availability (tree, rg, jq, git, fd, wc) พร้อม fallback strategy
- `scripts/deep-scan.sh` — Phase 1 scanner อัตโนมัติ ใช้ tool ที่ดีที่สุดที่มี → output `god-arch-scan-report.md`
- `scripts/backup.sh` — สร้าง git snapshot / stash ก่อนทำการเปลี่ยนแปลงใดๆ พร้อม rollback guide
- `scripts/find-duplicates.sh` — ตรวจหา duplicate code, dead code, unused exports ด้วย jscpd + ts-prune + unimported + rg
- `scripts/benchmark.sh` — วัด build time, bundle size, test duration ก่อน/หลัง เพื่อยืนยัน performance improvement
- `references/tauri.md` — Tauri 2 + Rust architecture guide
- `references/svelte.md` — SvelteKit architecture guide (2026)
- `references/nestjs.md` — NestJS + TypeORM/Prisma architecture guide
- `references/go.md` — Go + Gin/Echo architecture guide
- `templates/tauri-template.md` — Boilerplate structure สำหรับ Tauri 2 project
- `templates/sveltekit-template.md` — Boilerplate structure สำหรับ SvelteKit project
- `templates/nestjs-template.md` — Boilerplate structure สำหรับ NestJS project
- `templates/go-template.md` — Boilerplate structure สำหรับ Go API project

### Changed
- `SKILL.md` — เพิ่ม STARTUP HOOK section บังคับรัน env-check + deep-scan ก่อน Phase 1
- `SKILL.md` — Phase 1 อ้างอิง deep-scan.sh แทนพิมพ์ command ซ้ำ
- `SKILL.md` — ลบ `version` field ออกจาก frontmatter
- `SKILL.md` — เพิ่ม stack references table ครอบคลุม 7 stacks
- `scripts/test-skill.sh` — อัปเดต tests ครอบ env-check + deep-scan (19 tests)

### Fixed
- Phase 2 Confirmation Gate บังคับชัดเจนขึ้น — ห้าม AI ข้ามไป Phase 3 โดยไม่ได้รับการยืนยัน

---

## [2.0.0] - 2026-03-05

### Added
- Phase 0-4 workflow พร้อม Confirmation Gate
- ADR (Architecture Decision Record) format พร้อม evidence-based rationale
- TodoList format บังคับ rationale + checkpoint ทุก task
- Glossary section สำหรับ beginner mode
- Code snippet annotation standard (comment "ทำไม" ทุกส่วน)
- Delivery Rules 6 ข้อ

### Changed
- SKILL.md เขียนใหม่ทั้งหมด จาก v1

---

## [1.0.0] - 2026-03-05

### Added
- Initial release
- Next.js / Vue / FastAPI references
- generate-diagrams.sh, automation.py

---

## [2.2.0] - 2026-03-06

### Added
- `references/react.md` — React 19 + Vite SPA architecture guide (feature-based structure, React 19 patterns, anti-patterns)
- `references/typescript.md` — TypeScript 5.7 guide (branded types, discriminated unions, Zod integration, tsconfig แนะนำ)
- `references/monorepo.md` — Turborepo 2 + pnpm workspaces guide (pipeline config, shared packages, remote cache)
- `references/dart-flutter.md` — Flutter 3.27 + Dart 3.6 guide (Clean Architecture, Riverpod patterns, Freezed)
- `templates/AGENTS.md` — AGENTS.md template สำหรับโปรเจกต์

### Changed
- `SKILL.md` — Reference Files table อัปเดตครอบ 12 stacks ทั้งหมด
- `SKILL.md` — เพิ่ม react.md, typescript.md, monorepo.md, dart-flutter.md ใน trigger conditions

---

## [4.0.0] - 2026-03-21

### Added
- `references/ai-tools.md` — MCP servers, Claude Code hooks, context file conventions, agent workflow patterns
- `references/dev-tooling.md` — Biome, Vitest, Playwright, cspell, markdownlint-cli2, EditorConfig, husky, mobile-first CSS rules
- `scripts/mcp-detect.sh` — ตรวจ MCP tools ที่ติดตั้ง + แนะนำ tools ที่เหมาะกับโปรเจกต์
- `scripts/generate-workflow.sh` — สร้าง workflow.md, TODO.md, CLAUDE.md, .claude/settings.json อัตโนมัติ
- `scripts/check-context.sh` — Hook ตรวจ context staleness + docs conflict + TODO.md rules
- `templates/workflow-template.md` — Template สำหรับ workflow.md
- `templates/TODO-template.md` — Template สำหรับ TODO.md (append-only rules)
- `templates/context-template.md` — Template สำหรับ CLAUDE.md

### Changed
- SKILL.md เขียนใหม่เป็น v4 — เพิ่ม Phase 0 (MCP + Context Detection) และ Phase 5 (Workflow Setup)
- เพิ่ม **Verify-Before-Trust** rule — ห้ามเชื่อ docs > 30 วันโดยไม่ cross-check
- เพิ่ม **ask_user enforcement** — บังคับถาม user ก่อนทุก architectural decision
- เพิ่ม **Mobile-first UI rule** ในทุก TodoList item ที่เกี่ยวกับ UI
- เพิ่ม **TODO.md append-only rule** — ห้าม override
- เพิ่ม **Delivery Rules** จาก 6 → 10 ข้อ
- Startup Hook table อัปเดตครอบ mcp-detect.sh, check-context.sh, generate-workflow.sh
- Reference table แยกเป็น Core References + Stack References + Templates
