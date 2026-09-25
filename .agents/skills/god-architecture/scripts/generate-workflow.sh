#!/bin/bash
# generate-workflow.sh — สร้าง workflow.md, TODO.md, CLAUDE.md (ถ้าไม่มี)
# รันหลังจาก deep-scan และ Phase 2 confirmation
#
# Usage:
#   bash scripts/generate-workflow.sh [project_path]

set -uo pipefail
PROJECT_PATH="$(cd "${1:-.}" && pwd)"
TIMESTAMP=$(date '+%Y-%m-%d')
SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "╔══════════════════════════════════════════╗"
echo "║  📋 god-architecture — Workflow Generator ║"
echo "╚══════════════════════════════════════════╝"
echo ""
cd "$PROJECT_PATH"

# ───────────────────────────────────────────
# DETECT project info
# ───────────────────────────────────────────
PROJECT_NAME=$(basename "$(pwd)")
INSTALL_CMD="pnpm install --frozen-lockfile"
DEV_CMD="pnpm dev"
LINT_CMD="pnpm lint"
TEST_CMD="pnpm test"
CHECK_CMD="pnpm check"
E2E_CMD=""

# Detect package manager
if [ -f "pnpm-lock.yaml" ]; then PM="pnpm"
elif [ -f "yarn.lock" ]; then PM="yarn"
elif [ -f "bun.lockb" ]; then PM="bun"
elif [ -f "package.json" ]; then PM="npm"
elif [ -f "pyproject.toml" ] || [ -f "requirements.txt" ]; then PM="pip/uv"
elif [ -f "Cargo.toml" ]; then PM="cargo"
else PM="unknown"
fi

# Detect scripts from package.json
if [ -f "package.json" ] && command -v python3 &>/dev/null; then
    SCRIPTS=$(python3 -c "
import json
with open('package.json') as f:
    p = json.load(f)
s = p.get('scripts', {})
print('INSTALL_CMD=' + ('$PM install --frozen-lockfile' if '$PM' != 'npm' else 'npm ci'))
print('DEV_CMD=' + ('$PM run dev' if 'dev' in s else ''))
print('LINT_CMD=' + ('$PM run lint' if 'lint' in s else ''))
print('TEST_CMD=' + ('$PM run test' if 'test' in s else ''))
print('CHECK_CMD=' + ('$PM run check' if 'check' in s else '$PM run lint \\&\\& $PM run typecheck'))
print('E2E_CMD=' + ('$PM run test:e2e' if 'test:e2e' in s else ''))
" 2>/dev/null || echo "")
    if [ -n "$SCRIPTS" ]; then
        while IFS='=' read -r key value; do
            case "$key" in
                INSTALL_CMD) INSTALL_CMD="$value" ;;
                DEV_CMD) DEV_CMD="$value" ;;
                LINT_CMD) LINT_CMD="$value" ;;
                TEST_CMD) TEST_CMD="$value" ;;
                CHECK_CMD) CHECK_CMD="$value" ;;
                E2E_CMD) E2E_CMD="$value" ;;
            esac
        done <<< "$SCRIPTS"
    fi
fi

# Detect playwright — only set E2E_CMD if not already detected from scripts
HAS_PLAYWRIGHT=$(grep -l "playwright" package.json 2>/dev/null | wc -l | tr -d ' ' || echo "0")
if [ "${HAS_PLAYWRIGHT:-0}" -gt 0 ] && [ -z "${E2E_CMD:-}" ]; then
    E2E_CMD="${PM} test:e2e"
fi

echo "  Project: $PROJECT_NAME"
echo "  PM: $PM | Install: $INSTALL_CMD"
echo "  Lint: $LINT_CMD | Test: $TEST_CMD"
echo ""

# ───────────────────────────────────────────
# STEP 1: สร้าง workflow.md
# ───────────────────────────────────────────
echo "▶ [1/4] Generating workflow.md..."

if [ -f "workflow.md" ]; then
    echo "  ⚠️  workflow.md มีอยู่แล้ว — skipping (ใช้ --force เพื่อ overwrite)"
else
    sed \
        -e "s/\[Project Name\]/$PROJECT_NAME/g" \
        -e "s/\[DATE\]/$TIMESTAMP/g" \
        -e "s|\[INSTALL_COMMAND\]|$INSTALL_CMD|g" \
        -e "s|\[DEV_COMMAND\]|$DEV_CMD|g" \
        -e "s|\[LINT_COMMAND\]|$LINT_CMD|g" \
        -e "s|\[TYPECHECK_COMMAND\]|${PM} typecheck|g" \
        -e "s|\[TEST_COMMAND\]|$TEST_CMD|g" \
        -e "s|\[CHECK_COMMAND\]|$CHECK_CMD|g" \
        -e "s|\[E2E_COMMAND\]|${E2E_CMD:-"# ไม่มี E2E setup"}|g" \
        "$SKILL_DIR/templates/workflow-template.md" > workflow.md
    echo "  ✅ Created: workflow.md"
fi

# ───────────────────────────────────────────
# STEP 2: สร้าง TODO.md (ถ้าไม่มี)
# ───────────────────────────────────────────
echo "▶ [2/4] Setting up TODO.md..."

if [ -f "TODO.md" ]; then
    echo "  ✅ TODO.md มีอยู่แล้ว — ไม่ override (append เท่านั้น)"
    # ตรวจว่ามี rules header ไหม ถ้าไม่มีให้ prepend
    if ! grep -q "ห้าม override" TODO.md 2>/dev/null; then
        TMPFILE=$(mktemp)
        cat > "$TMPFILE" << 'TODOHDR'
<!--
  RULES (AI MUST READ):
  - ห้าม override file นี้ทั้งหมด ใช้ append เท่านั้น
  - ห้ามลบ item ที่มีอยู่
  STATUS: [ ] ยังไม่ทำ | [~] กำลังทำ | [×] เสร็จ | [←] รอก่อน
-->

TODOHDR
        cat TODO.md >> "$TMPFILE"
        mv "$TMPFILE" TODO.md
        echo "  ✅ Added rules header to existing TODO.md"
    fi
else
    sed \
        -e "s/\[Project Name\]/$PROJECT_NAME/g" \
        "$SKILL_DIR/templates/TODO-template.md" > TODO.md
    echo "  ✅ Created: TODO.md"
fi

# ───────────────────────────────────────────
# STEP 3: สร้าง/อัปเดต CLAUDE.md
# ───────────────────────────────────────────
echo "▶ [3/4] Setting up CLAUDE.md..."

if [ -f "CLAUDE.md" ]; then
    echo "  ⚠️  CLAUDE.md มีอยู่แล้ว"
    # ตรวจ freshness
    LAST_MODIFIED=$(git log --follow -1 --format="%ar" CLAUDE.md 2>/dev/null || echo "unknown")
    echo "     Last modified: $LAST_MODIFIED"
    
    # เพิ่ม link ไป workflow.md ถ้ายังไม่มี
    if ! grep -q "workflow.md" CLAUDE.md 2>/dev/null; then
        echo "" >> CLAUDE.md
        echo "## 🔄 Workflow" >> CLAUDE.md
        echo "→ ดูกฎการทำงานทั้งหมด: [workflow.md](./workflow.md)" >> CLAUDE.md
        echo "" >> CLAUDE.md
        echo "## 📋 TODO" >> CLAUDE.md
        echo "→ Task tracker: [TODO.md](./TODO.md) (ห้าม override)" >> CLAUDE.md
        echo "  ✅ Added workflow + TODO links to CLAUDE.md"
    fi
    
    # อัปเดต Last updated timestamp
    if grep -q "Last updated:" CLAUDE.md 2>/dev/null; then
        sed -i "s/Last updated: .*/Last updated: $TIMESTAMP/" CLAUDE.md 2>/dev/null || true
    fi
else
    # สร้าง CLAUDE.md ใหม่จาก template
    sed \
        -e "s/\[Project Name\]/$PROJECT_NAME/g" \
        -e "s/\[DATE\]/$TIMESTAMP/g" \
        -e "s|\[INSTALL_COMMAND\]|$INSTALL_CMD|g" \
        -e "s|\[DEV_COMMAND\]|$DEV_CMD|g" \
        -e "s|\[CHECK_COMMAND\]|$CHECK_CMD|g" \
        -e "s|\[TEST_COMMAND\]|$TEST_CMD|g" \
        "$SKILL_DIR/templates/context-template.md" > CLAUDE.md
    echo "  ✅ Created: CLAUDE.md"
fi

# ───────────────────────────────────────────
# STEP 4: สร้าง Claude Code hooks config
# ───────────────────────────────────────────
echo "▶ [4/4] Setting up .claude/settings.json hooks..."

mkdir -p .claude

if [ -f ".claude/settings.json" ]; then
    echo "  ⚠️  .claude/settings.json มีอยู่แล้ว — ไม่ overwrite"
else
    cat > .claude/settings.json << HOOKEOF
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "bash \"$SKILL_DIR/scripts/check-context.sh\""
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash \"$SKILL_DIR/scripts/check-context.sh\" --post-tool"
          }
        ]
      }
    ]
  }
}
HOOKEOF
    echo "  ✅ Created: .claude/settings.json (hooks configured)"
fi

# ───────────────────────────────────────────
# STEP 5: Copy check-context.sh hook script
# ───────────────────────────────────────────
echo "▶ [+] Copying hook scripts..."

mkdir -p scripts
if [ ! -f "scripts/check-context.sh" ]; then
    cp "$SKILL_DIR/scripts/check-context.sh" scripts/check-context.sh
    chmod +x scripts/check-context.sh
    echo "  ✅ Copied: scripts/check-context.sh"
else
    echo "  ✅ scripts/check-context.sh มีอยู่แล้ว"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Workflow generation เสร็จสิ้น"
echo ""
echo "📁 Files created/updated:"
[ -f "workflow.md" ]        && echo "   ✅ workflow.md"
[ -f "TODO.md" ]            && echo "   ✅ TODO.md"
[ -f "CLAUDE.md" ]          && echo "   ✅ CLAUDE.md"
[ -f ".claude/settings.json" ] && echo "   ✅ .claude/settings.json"
echo ""
echo "💡 Next steps:"
echo "   1. เปิด workflow.md และปรับ commands ให้ตรงกับโปรเจกต์"
echo "   2. รัน 'bash scripts/mcp-detect.sh' เพื่อตรวจ MCP tools"
echo "   3. อัปเดต CLAUDE.md > Tech Stack section"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
