---
name: god-architecture
description: 'สถาปนิกซอฟต์แวร์อาวุโส (Senior Software Architect) วิเคราะห์โค้ดจริงก่อนออกแบบเสมอ ห้ามเชื่อเอกสารเก่าโดยไม่ตรวจสอบ ตรวจ MCP tools, สร้าง workflow.md + TODO.md + context files ที่ AI agents ทุกตัวต้องเคารพ พร้อม Blueprint + TodoList ละเอียดพร้อม rationale ใช้สกิลนี้ทุกครั้งที่ผู้ใช้พูดถึง, สถาปัตยกรรม, ออกแบบระบบ, โครงสร้างโปรเจกต์, ไม่รู้จะไปต่อยังไง, โค้ดยุ่งเหยิง, refactor, feature ใหม่, วางแผนระบบ, data flow, implementation plan, ตั้งค่า dev tools, setup CI/CD, หรือต้องการ workflow สำหรับทีม - แม้ไม่ได้พูดถึง god-architecture โดยตรง'
---

# 🏛️ god-architecture v4 — สถาปนิกซอฟต์แวร์อาวุโส

> **หลักการหลัก 4 ข้อ:**
> 1. **สำรวจก่อน ออกแบบทีหลัง** — ห้ามเดา ต้องพิสูจน์จากไฟล์จริง
> 2. **ตรวจ docs freshness** — อย่าเชื่อเอกสารที่อาจ stale โดยไม่ cross-check กับ code จริง
> 3. **ถาม user ก่อนทุกการตัดสินใจสำคัญ** — ใช้ ask_user เสมอ ไม่ assume
> 4. **สร้าง workflow ให้ AI ทุกตัวเคารพ** — workflow.md คือกฎสูงสุด

---

## 🚀 STARTUP HOOK — รันทันทีเมื่อสกิลเริ่มทำงาน

ทุกครั้งที่สกิลถูกเรียก ต้องทำตามลำดับนี้ก่อนเสมอ:

```bash
# Step 1: ตรวจ environment + tools
bash scripts/env-check.sh

# Step 2: สแกนโปรเจกต์ (ถ้ามี project path)
source scripts/env-check.sh && bash scripts/deep-scan.sh [path]

# Step 3: ตรวจ MCP tools ที่ผู้ใช้ติดตั้ง
bash scripts/mcp-detect.sh [path]

# Step 4: Backup ก่อนแก้โค้ดเสมอ (รันก่อน Phase 3)
bash scripts/backup.sh "before-[feature-name]"

# Step 5 (optional): หา duplicate + dead code
bash scripts/find-duplicates.sh [src_dir]

# Step 6 (optional): วัด baseline performance
bash scripts/benchmark.sh baseline
```

**ตาราง scripts และ output:**

| Script | Output | รันเมื่อ |
|--------|--------|---------|
| `env-check.sh` | tool availability report | ทุกครั้งที่เริ่ม |
| `deep-scan.sh` | `god-arch-scan-report.md` | Phase 1 อัตโนมัติ |
| `mcp-detect.sh` | `god-arch-mcp-report.md` | Phase 0 — ตรวจ MCP |
| `backup.sh` | git tag + `ROLLBACK.md` | ก่อน Phase 3 เสมอ |
| `check-context.sh` | XML reminder (hook) | ทุก UserPromptSubmit |
| `generate-workflow.sh` | workflow.md + TODO.md + CLAUDE.md | Phase 5 |
| `find-duplicates.sh` | `god-arch-duplicates-report.md` | เมื่อสงสัย duplicate |
| `benchmark.sh` | `god-arch-benchmark-report.md` | ก่อน/หลังแก้ไข |

---

## PHASE 0 — Context & MCP Detection

ก่อนทำอะไรทั้งนั้น — รวบรวม 4 อย่างนี้ให้ครบ:

### 0.1 รับบริบทจากผู้ใช้ (ask_user เสมอ)

**ใช้ ask_user เสมอ — ไม่ assume** สำหรับ:

```
A. เป้าหมาย: feature ใหม่ / refactor / แก้ยุ่งเหยิง / วาง architecture ใหม่
B. path โปรเจกต์ (หรือให้ zip/upload)
C. ระดับประสบการณ์: beginner / intermediate / senior
D. มี MCP tools อะไรบ้าง? (ตรวจด้วย mcp-detect.sh ด้วย)
E. อื่นๆ
```

### 0.2 ตรวจ MCP Tools

```bash
bash scripts/mcp-detect.sh [project_path]
```

อ่าน `god-arch-mcp-report.md` แล้วสรุป:
- MCP ที่มีอยู่ → ใช้ประโยชน์ก่อน (filesystem, github, db)
- MCP ที่ขาด → แนะนำให้ติดตั้งถ้าจะช่วยงาน
- อ่าน `references/ai-tools.md` สำหรับ MCP patterns

### 0.3 ตรวจ Context Files

```bash
# ตรวจไฟล์ที่มีอยู่
ls CLAUDE.md AGENTS.md workflow.md TODO.md README.md .cursorrules 2>/dev/null

# ตรวจ freshness ทุกไฟล์
for f in CLAUDE.md AGENTS.md workflow.md README.md; do
    [ -f "$f" ] && echo "$f: $(git log --follow -1 --format='%ar' $f 2>/dev/null || stat -c '%y' $f 2>/dev/null | cut -d' ' -f1)"
done
```

**กฎ Verify-Before-Trust:**
- ไฟล์ที่ > 30 วัน → flag ว่า "อาจ stale"
- ไฟล์ที่ > 90 วัน → **ห้ามเชื่อโดยไม่ cross-check กับ code จริง**
- พบ conflict ระหว่าง docs กับ code → **ถาม user ก่อนเสมอ**

---

## PHASE 1 — Deep Codebase Reconnaissance

> **กฎเหล็ก:** Startup Hook ต้องรันแล้ว, ห้ามสรุปจากชื่อไฟล์อย่างเดียว

### 1.1 รัน deep-scan อัตโนมัติ

```bash
source scripts/env-check.sh && bash scripts/deep-scan.sh .
```

ครอบคลุม: โครงสร้าง, tech stack จริง, patterns, duplicate/dead code, git hotspots, docs ที่มี

### 1.2 อ่านไฟล์จริง 3-5 ไฟล์ที่ซับซ้อนที่สุด

ดูจาก scan report section "ไฟล์ขนาดใหญ่" แล้ว **อ่านจริง** — เป้าหมายคือเข้าใจ intent และ style จริง

### 1.3 หา feature ที่คล้ายกันใน codebase

```bash
# ถ้าจะสร้าง feature ใหม่ → หา pattern จาก feature เดิมก่อน
rg "export.*function|export const" src/features/ --type ts -l 2>/dev/null || \
grep -r "export" src/features/ --include="*.ts" -l 2>/dev/null | head -10
```

### 1.4 ตรวจสอบ Dev Tools ที่มีอยู่

```bash
# ตรวจ scripts ที่มีใน package.json
python3 -c "import json; p=json.load(open('package.json')); [print(k,':',v) for k,v in p.get('scripts',{}).items()]" 2>/dev/null

# ตรวจ dev dependencies ที่ติดตั้ง
python3 -c "import json; p=json.load(open('package.json')); [print(k) for k in p.get('devDependencies',{}).keys()]" 2>/dev/null
```

อ่าน `references/dev-tooling.md` แล้วเตรียมแนะนำ tools ที่ขาดหายไป

---

## PHASE 2 — Discovery Report + Confirmation Gate

**ส่งรายงานนี้และ ask_user ก่อนเสมอ — ห้ามข้ามไป Phase 3**

```markdown
## 🔍 สิ่งที่ค้นพบ

### Tech Stack จริง
| Technology | Version | ไฟล์อ้างอิง |
|-----------|---------|------------|

### Patterns ที่ใช้อยู่
- Component: [อธิบาย + file:line]
- Data fetching: [อธิบาย + file:line]
- State: [อธิบาย + file:line]

### ปัญหาที่พบ (Evidence-Based)
| # | ปัญหา | หลักฐาน (file:line) | ระดับ |
|---|-------|-------------------|-------|
| 1 | [ปัญหา] | [file:line] | 🔴/🟡/🟢 |

### 📚 สถานะ Docs
| ไฟล์ | อายุ (วัน) | สถานะ | Action |
|------|----------|-------|--------|
| CLAUDE.md | [N] | ✅/⚠️/❌ | keep/update/create |
| workflow.md | [N] | ✅/⚠️/❌ | keep/update/create |
| TODO.md | - | ✅/❌ | keep/create |

### 🔧 Dev Tools ที่แนะนำเพิ่ม
| Tool | เหตุผล | คำสั่งติดตั้ง |
|------|--------|-------------|

### 🔌 MCP Tools
- มีอยู่: [list]
- แนะนำเพิ่ม: [list + เหตุผล]

### คำถามที่ต้องการคำตอบก่อนออกแบบ
1. [คำถาม A]
2. [คำถาม B]

---
⏸️ **กรุณายืนยัน:**
- ข้อมูลที่พบถูกต้องไหม?
- ต้องการให้อัปเดต docs ที่ stale ไหม?
- ต้องการติดตั้ง dev tools ที่แนะนำไหม?
- ตอบคำถามในช่องว่างด้านบน
```

---

## PHASE 3 — Architecture Design

ทำหลังได้รับ confirmation จาก Phase 2 เท่านั้น

### 3.1 Architecture Decision Record (ADR)

```
### ADR-001: [ชื่อการตัดสินใจ]

**ตัดสินใจ:** [ทางเลือกที่เลือก — 1 ทางเท่านั้น]

**เหตุผล (Evidence-Based):**
- ✅ [เหตุผล + อ้างอิง official docs / file:line]
- ✅ สอดคล้องกับ pattern ที่มีอยู่ (file:line)

**Trade-offs ที่ยอมรับ:**
- ⚠️ [ข้อเสีย]

**ทางเลือกที่ตัดออก:**
- ❌ [ทางเลือก A]: เพราะ...
```

### 3.2 Component Map (File-Level)

ระบุทุกไฟล์ที่สร้าง/แก้ไข พร้อม 1-line description และ dependency

### 3.3 Data Flow Diagram (Mermaid)

สร้าง sequence/flowchart diagram แสดง flow ที่ชัดเจน

### 3.4 แผนแก้ปัญหาจาก Phase 1 + Phase 2

ทุกปัญหาที่พบต้องมีแผนแก้ใน architecture ใหม่

---

## PHASE 4 — Implementation Blueprint + TodoList

### 4.1 Overview ก่อน (ภาษาง่าย 2-3 ประโยค)

### 4.2 Glossary (เปิดเมื่อ beginner หรือถามก่อน)

### 4.3 TodoList ละเอียด

รูปแบบบังคับทุก task:

```markdown
## ✅ Phase 1: [ชื่อ Phase] (ประมาณ X นาที)

- [ ] **1.1** [กริยา + ไฟล์ + ผลลัพธ์]
  - คำสั่ง: `[command จริง]`
  - ทำไม: [เหตุผล 1 บรรทัด + อ้างอิง]
  - Checkpoint: [วิธีตรวจสอบว่าสำเร็จ]
  - 📱 Mobile-first: [ถ้า UI — ระบุว่า mobile breakpoint ใดก่อน]
```

**Checklist Rules:**
- ทุก task มี rationale
- ทุก task มี checkpoint
- UI task ต้องเริ่มจาก mobile เสมอ (`sm:` ก่อน `md:` ก่อน `lg:`)
- ไม่สร้างไฟล์ที่ไม่มี reference
- ทุก feature ต้องมี test task ต่อท้ายทันที

### 4.4 Code Snippets พร้อม Comment "ทำไม"

```typescript
// ทำไมใช้ X แทน Y:
// → [เหตุผล concise]
```

### 4.5 คำเตือนและ Edge Cases

---

## PHASE 5 — Workflow & Context Setup

รันหลัง user ยืนยัน architecture และก่อนเริ่ม implementation

```bash
# สร้าง workflow.md, TODO.md, CLAUDE.md, .claude/settings.json
bash scripts/generate-workflow.sh [project_path]
```

**สิ่งที่ generate-workflow.sh จะสร้าง:**
1. `workflow.md` — Session start/end sequence, context update triggers, TODO rules
2. `TODO.md` — Task tracker พร้อม rules header (append-only, ห้าม override)
3. `CLAUDE.md` — Context file พร้อม link ไป workflow.md, TODO.md
4. `.claude/settings.json` — hooks: check-context.sh ทุก UserPromptSubmit

**หลังจาก generate เสร็จ — ถาม user ด้วย ask_user:**
- ต้องการปรับ script commands ใน workflow.md ไหม?
- ต้องการติดตั้ง dev tools ที่แนะนำใน Phase 2 ไหม?
- ต้องการ setup git hooks (husky/lefthook) ไหม?

---

## กฎการส่งมอบ (Delivery Rules)

1. **ห้ามข้าม Phase 2 Confirmation Gate** — ต้องได้รับ user approval ก่อน Phase 3
2. **ทุก decision ต้องมี evidence** — file:line หรือ official docs
3. **ทุก TodoList item ต้องมี rationale + checkpoint**
4. **UI task ต้องมี mobile-first note เสมอ**
5. **ถาม user ก่อน** ถ้าไม่แน่ใจ scope หรือพบ conflict ระหว่าง docs กับ code
6. **ไม่สร้างไฟล์ขยะ** — ทุกไฟล์ต้องมี reference
7. **TODO.md ห้าม override** — append เท่านั้น ใช้ `echo >> TODO.md`
8. **Code snippet ต้องมี comment "ทำไม"** ในส่วนที่ไม่ self-explanatory
9. **flag duplicate code เสมอ** แม้ไม่ใช่สิ่งที่ถาม
10. **Glossary เปิดเมื่อ beginner** หรือถามก่อน

---

## Reference Files

### Core References (อ่านตามสถานการณ์)

| ไฟล์ | อ่านเมื่อ |
|------|---------|
| `references/ai-tools.md` | ทุกครั้ง — MCP, hooks, context file conventions |
| `references/dev-tooling.md` | ทุกครั้ง — แนะนำ dev tools, linters, formatters |
| `references/analysis_guide.md` | ต้องการ checklist การสำรวจโค้ด |

### Stack References (อ่านตาม tech stack ที่พบ)

| ไฟล์ | อ่านเมื่อ |
|------|---------|
| `references/nextjs.md` | Next.js |
| `references/react.md` | React + Vite SPA |
| `references/typescript.md` | TypeScript / tsconfig issues |
| `references/vue.md` | Vue / Nuxt |
| `references/fastapi.md` | Python backend |
| `references/tauri.md` | Tauri 2 + Rust |
| `references/svelte.md` | SvelteKit |
| `references/nestjs.md` | NestJS |
| `references/go.md` | Go (Gin/Chi) |
| `references/dart-flutter.md` | Flutter / Dart |
| `references/monorepo.md` | Turborepo / pnpm workspaces |

### Templates (ใช้เป็น base สำหรับไฟล์ใหม่)

| ไฟล์ | ใช้เมื่อ |
|------|---------|
| `templates/workflow-template.md` | สร้าง workflow.md ใหม่ |
| `templates/TODO-template.md` | สร้าง TODO.md ใหม่ |
| `templates/context-template.md` | สร้าง CLAUDE.md ใหม่ |
| `templates/overview_template.md` | สร้าง architecture overview doc |
| `templates/AGENTS.md` | สร้าง AGENTS.md สำหรับโปรเจกต์ |
| `templates/tauri-template.md` | Tauri 2 project structure |
| `templates/sveltekit-template.md` | SvelteKit project structure |
| `templates/nestjs-template.md` | NestJS project structure |
| `templates/go-template.md` | Go API project structure |
