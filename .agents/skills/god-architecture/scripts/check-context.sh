#!/bin/bash
# check-context.sh — Hook ตรวจ context freshness + staleness
# รันโดย Claude Code hooks (UserPromptSubmit หรือ PostToolUse)
# Output: XML reminder ถ้าพบปัญหา (lightweight, ~50-100 tokens)
#
# Usage:
#   bash scripts/check-context.sh           # UserPromptSubmit mode
#   bash scripts/check-context.sh --post-tool  # PostToolUse mode

MODE="${1:-}"
STALE_DAYS=30
CRITICAL_DAYS=90
NOW=$(date +%s)

# Helper: วันที่แก้ล่าสุดของไฟล์
file_age_days() {
    local file="$1"
    if command -v git &>/dev/null && git rev-parse --is-inside-work-tree &>/dev/null 2>&1; then
        local last_commit
        last_commit=$(git log --follow -1 --format="%ct" "$file" 2>/dev/null || echo "")
        if [ -n "$last_commit" ]; then
            echo $(( (NOW - last_commit) / 86400 ))
            return
        fi
    fi
    # Fallback: file modification time
    if command -v stat &>/dev/null; then
        local mtime
        mtime=$(stat -c %Y "$file" 2>/dev/null || stat -f %m "$file" 2>/dev/null || echo "$NOW")
        echo $(( (NOW - mtime) / 86400 ))
    else
        echo "0"
    fi
}

REMINDERS=()
WARNINGS=()

# ───────────────────────────────────────────
# CHECK 1: Context files staleness
# ───────────────────────────────────────────
for ctx_file in "CLAUDE.md" "AGENTS.md" "workflow.md"; do
    if [ -f "$ctx_file" ]; then
        AGE=$(file_age_days "$ctx_file")
        if [ "$AGE" -gt "$CRITICAL_DAYS" ]; then
            WARNINGS+=("⚠️  $ctx_file อาจล้าสมัยมาก (${AGE} วัน) — ตรวจสอบและอัปเดตก่อนเชื่อถือ")
        elif [ "$AGE" -gt "$STALE_DAYS" ]; then
            REMINDERS+=("ℹ️  $ctx_file แก้ล่าสุดเมื่อ ${AGE} วันที่แล้ว — อาจไม่ทันสมัย")
        fi
    fi
done

# ───────────────────────────────────────────
# CHECK 2: TODO.md rules
# ───────────────────────────────────────────
if [ -f "TODO.md" ]; then
    if ! grep -q "ห้าม override\|RULES\|DO NOT" TODO.md 2>/dev/null; then
        REMINDERS+=("📋 TODO.md ไม่มี rules header — append เท่านั้น ห้าม override")
    fi
else
    REMINDERS+=("📋 TODO.md ไม่มี — ควรสร้างด้วย 'bash scripts/generate-workflow.sh'")
fi

# ───────────────────────────────────────────
# CHECK 3: ตรวจ docs conflict (package.json vs CLAUDE.md)
# ───────────────────────────────────────────
if [ -f "package.json" ] && [ -f "CLAUDE.md" ]; then
    # ดึง version จริงจาก package.json
    if command -v python3 &>/dev/null; then
        ACTUAL_NEXT=$(python3 -c "
import json
try:
    with open('package.json') as f:
        p = json.load(f)
    deps = {**p.get('dependencies',{}), **p.get('devDependencies',{})}
    print(deps.get('next',''))
except: print('')
" 2>/dev/null)
        
        if [ -n "$ACTUAL_NEXT" ]; then
            # ตรวจว่า CLAUDE.md อ้างถึง Next.js version ที่ถูกต้องไหม
            CLAUDE_NEXT=$(grep -o "Next\.js [0-9]*\.[0-9]*" CLAUDE.md 2>/dev/null | head -1 | grep -o "[0-9]*\.[0-9]*" || echo "")
            ACTUAL_MAJOR=$(echo "$ACTUAL_NEXT" | grep -o "[0-9]*" | head -1)
            CLAUDE_MAJOR=$(echo "$CLAUDE_NEXT" | grep -o "[0-9]*" | head -1)
            
            if [ -n "$CLAUDE_MAJOR" ] && [ -n "$ACTUAL_MAJOR" ] && [ "$CLAUDE_MAJOR" != "$ACTUAL_MAJOR" ]; then
                WARNINGS+=("⚠️  CLAUDE.md ระบุ Next.js $CLAUDE_NEXT แต่ package.json มี $ACTUAL_NEXT — ตรวจสอบ docs")
            fi
        fi
    fi
fi

# ───────────────────────────────────────────
# CHECK 4: PostToolUse — ตรวจ error จาก bash
# ───────────────────────────────────────────
if [ "$MODE" = "--post-tool" ]; then
    EXIT_CODE="${CLAUDE_TOOL_EXIT_CODE:-0}"
    if [ "$EXIT_CODE" != "0" ] && [ "$EXIT_CODE" != "" ]; then
        REMINDERS+=("🔴 Command ล่าสุด exit code=$EXIT_CODE — ควรตรวจสอบก่อนดำเนินการต่อ")
    fi
fi

# ───────────────────────────────────────────
# OUTPUT (XML format สำหรับ Claude Code hooks)
# ───────────────────────────────────────────
TOTAL=$((${#WARNINGS[@]} + ${#REMINDERS[@]}))

if [ $TOTAL -gt 0 ]; then
    echo "<god-arch-context-check>"
    
    if [ ${#WARNINGS[@]} -gt 0 ]; then
        echo "  <warnings>"
        for w in "${WARNINGS[@]}"; do
            escaped_w=${w//&/&amp;}
            escaped_w=${escaped_w//</&lt;}
            escaped_w=${escaped_w//>/&gt;}
            echo "    $escaped_w"
        done
        echo "  </warnings>"
    fi
    
    if [ ${#REMINDERS[@]} -gt 0 ]; then
        echo "  <reminders>"
        for r in "${REMINDERS[@]}"; do
            escaped_r=${r//&/&amp;}
            escaped_r=${escaped_r//</&lt;}
            escaped_r=${escaped_r//>/&gt;}
            echo "    $escaped_r"
        done
        echo "  </reminders>"
    fi
    
    echo "  <action>ตรวจสอบรายการด้านบนก่อนดำเนินการ ถ้าพบ docs stale ให้ถาม user ก่อน</action>"
    echo "</god-arch-context-check>"
fi

exit 0
