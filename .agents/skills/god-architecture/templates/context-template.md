# [Project Name] — CLAUDE.md

<!--
  Context file สำหรับ AI agents
  Last updated: [DATE] | Reviewed: [DATE]
  Freshness: ✅ current
  
  UPDATE TRIGGERS:
  - เมื่อ tech stack เปลี่ยน
  - เมื่อมี workflow rule ใหม่
  - เมื่อ docs อ้างอิงล้าสมัย
  - ทุก 30 วัน (ตรวจ freshness)
-->

## ⚡ Quickstart

```bash
# Install
[INSTALL_COMMAND]

# Dev server
[DEV_COMMAND]

# Check (lint + typecheck)
[CHECK_COMMAND]

# Test
[TEST_COMMAND]
```

---

## 🏗️ Architecture

→ ดูรายละเอียด: [workflow.md](./workflow.md)
→ Stack: [ระบุ tech stack หลัก]
→ Structure: [monorepo / single-app / fullstack]

```text
[PROJECT_ROOT]/
├── [dir1]/     # [หน้าที่]
├── [dir2]/     # [หน้าที่]
└── [file]      # [หน้าที่]
```

---

## 📏 Rules (AI MUST FOLLOW)

> อ่านและปฏิบัติตามทุกข้อ ไม่มีข้อยกเว้น

1. **Mobile-first** — UI ทุกชิ้นเริ่มจาก mobile ก่อนเสมอ
2. **ห้าม override TODO.md** — append เท่านั้น
3. **Test ก่อน commit** — `[TEST_COMMAND]` ต้องผ่าน
4. **สร้าง test ทันที** หลังทำ feature/fix เสร็จ
5. **อัปเดต docs** หลัง test ผ่านทุกครั้ง
6. **ถาม user** ถ้าไม่แน่ใจ scope หรือพบ conflict
7. **ไม่สร้างไฟล์ขยะ** — ทุกไฟล์ต้องมี reference

---

## 🛠️ Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Runtime | [Node/Python/Rust] | [version] |
| Framework | [Next.js/FastAPI/etc] | [version] |
| Database | [Supabase/Postgres/etc] | [version] |
| Testing | [Vitest/pytest/etc] | [version] |
| Lint/Format | [Biome/ESLint/Ruff] | [version] |

---

## 🔧 MCP Tools Available

<!-- อัปเดตเมื่อ MCP tools เปลี่ยน -->
```bash
# ตรวจ MCP ที่ติดตั้ง
bash scripts/mcp-detect.sh
```

| MCP Server | ใช้สำหรับ | สถานะ |
|-----------|---------|-------|
| [name] | [purpose] | ✅ / ⚠️ |

---

## 📚 Docs Index

→ **workflow.md** — กฎการทำงาน, session start/end sequence  
→ **TODO.md** — Task tracker (ห้าม override)  
→ **[docs/architecture.md]** — System design (อัปเดต: [DATE])  
→ **[docs/api.md]** — API reference (อัปเดต: [DATE])  

---

## ⚠️ Known Issues / Caveats

<!-- บันทึก gotchas, workarounds, หรือ known limitations -->
