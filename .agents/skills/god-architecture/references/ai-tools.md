# 📘 AI Tools & Agent Workflow Reference (2026)

**สำหรับ:** god-architecture Skill
**ครอบคลุม:** MCP Servers, AI CLI tools, Agent patterns, Context file conventions

---

## 🤖 MCP (Model Context Protocol) Tools

### ตรวจสอบ MCP ที่ติดตั้งอยู่
```bash
# Claude Code
cat ~/.claude/settings.json 2>/dev/null | python3 -c "import sys,json; d=json.load(sys.stdin); [print(k) for k in d.get('mcpServers',{}).keys()]" 2>/dev/null

# หาไฟล์ config ทุกที่
find ~ -name "*.json" -path "*claude*" 2>/dev/null | head -5
find . -name ".mcp.json" -o -name "mcp.json" 2>/dev/null

# Codex / Gemini CLI
cat ~/.codex/config.json 2>/dev/null
cat ~/.gemini/config.json 2>/dev/null
```

### MCP Server Categories ที่ใช้บ่อย

| Category | Examples | ใช้สำหรับ |
|----------|---------|----------|
| **Filesystem** | `@modelcontextprotocol/server-filesystem` | อ่าน/เขียนไฟล์นอก sandbox |
| **Database** | Supabase MCP, PlanetScale MCP | Query DB โดยตรง |
| **Version Control** | GitHub MCP | PR, Issues, branch ops |
| **Search** | Brave Search, Tavily | Web research ใน agent |
| **Communication** | Slack MCP, Linear MCP | Team notifications |
| **Execution** | Modal MCP | Run code in cloud |
| **Memory** | `@mem0ai/mem0-memory-mcp` | Persistent agent memory |

### การใช้ MCP ใน Architecture Context
```json
// .mcp.json — project-level MCP config
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/project"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}" }
    }
  }
}
```

---

## 🛠️ AI CLI Tools

### Claude Code (Primary)
```bash
# Project-level settings
.claude/settings.json       # hooks, MCP servers, permissions
CLAUDE.md                   # Context injected every session
.claude/commands/           # Custom slash commands

# Hooks ที่สำคัญ
{
  "hooks": {
    "UserPromptSubmit": [{ "type": "command", "command": "bash .ai/hooks/on-start.sh" }],
    "PostToolUse": [{ "matcher": "Bash", "command": "bash .ai/hooks/on-bash.sh" }],
    "Stop": [{ "type": "command", "command": "bash .ai/hooks/on-stop.sh" }]
  }
}
```

### Gemini CLI
```bash
# Config location
~/.gemini/config.json       # API key, model settings
GEMINI.md                   # Context file (analogous to CLAUDE.md)
```

### Codex CLI
```bash
~/.codex/config.json        # Settings
AGENTS.md                   # Primary context file
```

### Shared Context File Convention

| ไฟล์ | Platform | หน้าที่ |
|------|---------|--------|
| `CLAUDE.md` | Claude Code | Primary context — rules, project overview |
| `AGENTS.md` | Codex, Multi-agent | Agent roles, workflow rules |
| `GEMINI.md` | Gemini CLI | Context สำหรับ Gemini |
| `.cursorrules` | Cursor IDE | AI coding rules |
| `.github/copilot-instructions.md` | GitHub Copilot | Copilot context |
| `workflow.md` | ทุก platform | กฎการทำงาน step-by-step |
| `TODO.md` | ทุก platform | Task tracking — ห้าม override |

---

## 🔄 Agent Workflow Patterns

### Pattern 1: Verify-Before-Trust (ห้ามเชื่อเอกสารเก่า)
```
1. อ่านเอกสาร (CLAUDE.md, README, docs/)
2. ตรวจสอบ freshness: git log --follow -1 [file] → ดูวันที่แก้ล่าสุด
3. ถ้า > 30 วัน → flag ว่า "อาจล้าสมัย"
4. Cross-check กับ package.json / actual code
5. รายงานความคลาดเคลื่อนก่อนดำเนินการ
```

### Pattern 2: Context File Lifecycle
```
Session Start:
  → อ่าน CLAUDE.md / AGENTS.md
  → ตรวจ freshness (git log)
  → ถ้าล้าสมัย → ask user ก่อน

Mid-Session (ทุก ~30 min หรือเมื่อเกิดปัญหา):
  → บันทึก progress ลง TODO.md
  → อัปเดต context ถ้าพบข้อมูลใหม่

Session End:
  → อัปเดต TODO.md (✓ done items)
  → อัปเดต CLAUDE.md ถ้ามี pattern ใหม่
  → สร้าง/อัปเดต tests
```

### Pattern 3: Ask User Triggers
ต้องใช้ ask_user (ไม่ใช่ assume) เมื่อ:
- เอกสาร conflict กับ code จริง
- ต้องตัดสินใจที่กระทบ architecture > 1 file
- พบ deprecation หรือ breaking change
- ไม่แน่ใจ scope ของงาน
- พบ duplicate logic ที่ต้อง consolidate

### Pattern 4: MCP Tool Priority
```
1. ใช้ MCP ที่มีก่อนเสมอ (filesystem, github, db)
2. ถ้าไม่มี MCP ที่เหมาะสม → ใช้ bash/python
3. ถ้า bash ไม่ได้ → อ่านจาก context
4. แจ้ง user ว่า MCP ไหนจะช่วยได้ถ้ายังไม่ได้ติดตั้ง
```

---

## 📋 Context File Quality Rules

### CLAUDE.md / AGENTS.md ที่ดี
```markdown
# Project: [Name]
<!-- Last updated: YYYY-MM-DD | Freshness: ✅ current / ⚠️ stale -->

## Quickstart
[คำสั่ง setup, run, test ที่ใช้จริง — ตรวจจาก package.json]

## Architecture Overview
[Link → docs/architecture.md หรือ workflow.md]

## Rules (AI MUST FOLLOW)
1. รัน `[lint command]` ก่อนทุก commit
2. มือถือก่อนเสมอ (mobile-first)
3. ห้าม override TODO.md
4. สร้าง test ทันทีหลังทำ feature เสร็จ

## Workflow
[Link → workflow.md]

## TODO
[Link → TODO.md]
```

### Context Index (สำหรับโปรเจกต์ใหญ่)
```markdown
<!-- docs/INDEX.md -->
| ไฟล์ | เนื้อหา | อัปเดตล่าสุด | สถานะ |
|------|--------|-------------|-------|
| CLAUDE.md | Project rules, quickstart | 2026-03-06 | ✅ |
| workflow.md | Step-by-step process | 2026-03-06 | ✅ |
| TODO.md | Task tracker | [auto-update] | ✅ |
| docs/architecture.md | System design | 2025-12-01 | ⚠️ stale |
| docs/api.md | API reference | 2026-01-15 | ⚠️ review |
```

---

## 🔗 Key References
1. [Claude Code Hooks Docs](https://docs.anthropic.com/claude-code/hooks)
2. [MCP Official Docs](https://modelcontextprotocol.io/docs)
3. [MCP Server Registry](https://github.com/modelcontextprotocol/servers)
4. [Claude Code Settings Reference](https://docs.anthropic.com/claude-code/settings)
5. [Gemini CLI Docs](https://github.com/google-gemini/gemini-cli)
