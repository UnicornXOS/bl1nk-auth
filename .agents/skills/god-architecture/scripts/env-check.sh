#!/bin/bash
# env-check.sh — Startup hook สำหรับ god-architecture skill
# รันทันทีเมื่อเริ่มใช้สกิล ก่อน Phase 1 ทุกครั้ง
# Output: รายงาน tool availability + fallback strategy

set -euo pipefail

# ───────────────────────────────────────────
# TOOL DETECTION
# ───────────────────────────────────────────

TOOLS_AVAILABLE=()
TOOLS_MISSING=()
SCAN_STRATEGY=""

echo "╔══════════════════════════════════════════╗"
echo "║  🔍 god-architecture — Environment Check ║"
echo "╚══════════════════════════════════════════╝"
echo ""

# --- Directory Listing ---
echo "▶ Directory Tools:"
if command -v tree &>/dev/null; then
    TOOLS_AVAILABLE+=("tree")
    TREE_CMD="tree -L 3 -I 'node_modules|.git|.next|.nuxt|dist|build|__pycache__'"
    echo "  ✅ tree     → $TREE_CMD"
else
    TOOLS_MISSING+=("tree")
    TREE_CMD="find . -maxdepth 3 -not -path '*/node_modules/*' -not -path '*/.git/*' -not -path '*/.next/*' | sort"
    echo "  ⚠️  tree     → fallback: find (ช้ากว่าเล็กน้อย)"
fi

# --- Search ---
echo ""
echo "▶ Search Tools:"
if command -v rg &>/dev/null; then
    TOOLS_AVAILABLE+=("ripgrep")
    RG_CMD="rg"
    echo "  ✅ ripgrep  → rg (เร็วกว่า grep ~10x)"
elif command -v grep &>/dev/null; then
    TOOLS_MISSING+=("ripgrep")
    RG_CMD="grep -r"
    echo "  ⚠️  ripgrep  → fallback: grep -r (ช้ากว่าในโปรเจกต์ใหญ่)"
else
    TOOLS_MISSING+=("ripgrep" "grep")
    RG_CMD=""
    echo "  ❌ search   → ไม่มี search tool เลย! การวิเคราะห์จะไม่ครบถ้วน"
fi

# --- JSON processing ---
echo ""
echo "▶ Data Processing:"
if command -v jq &>/dev/null; then
    TOOLS_AVAILABLE+=("jq")
    echo "  ✅ jq       → พร้อมใช้งาน (parse package.json, tsconfig.json)"
else
    TOOLS_MISSING+=("jq")
    echo "  ⚠️  jq       → fallback: python3 -c \"import json\" หรืออ่านดิบ"
fi

# --- Git ---
echo ""
echo "▶ Version Control:"
if command -v git &>/dev/null; then
    TOOLS_AVAILABLE+=("git")
    IS_GIT_REPO=$(git rev-parse --is-inside-work-tree 2>/dev/null && echo "yes" || echo "no")
    if [ "$IS_GIT_REPO" = "yes" ]; then
        GIT_BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
        GIT_LAST=$(git log --oneline -1 2>/dev/null || echo "no commits")
        echo "  ✅ git      → repo พบ | branch: $GIT_BRANCH"
        echo "              → last commit: $GIT_LAST"
    else
        echo "  ✅ git      → พร้อมใช้ แต่ directory นี้ไม่ใช่ git repo"
    fi
else
    TOOLS_MISSING+=("git")
    echo "  ⚠️  git      → ไม่พบ (ไม่สามารถดู blame, log, diff ได้)"
fi

# --- wc / awk สำหรับ file size analysis ---
echo ""
echo "▶ File Analysis:"
if command -v wc &>/dev/null; then
    TOOLS_AVAILABLE+=("wc")
    echo "  ✅ wc       → ใช้นับบรรทัดหาไฟล์ขนาดใหญ่"
else
    TOOLS_MISSING+=("wc")
    echo "  ⚠️  wc       → fallback: python3"
fi

if command -v fd &>/dev/null; then
    TOOLS_AVAILABLE+=("fd")
    echo "  ✅ fd       → ใช้แทน find (เร็วกว่า)"
else
    echo "  ℹ️  fd       → ไม่พบ (ใช้ find แทน — ปกติ)"
fi

# --- Python / Node (สำหรับ fallbacks) ---
echo ""
echo "▶ Runtime Fallbacks:"
if command -v python3 &>/dev/null; then
    PY_VER=$(python3 --version 2>&1)
    echo "  ✅ python3  → $PY_VER"
elif command -v python &>/dev/null; then
    PY_VER=$(python --version 2>&1)
    echo "  ✅ python   → $PY_VER"
else
    echo "  ⚠️  python   → ไม่พบ (บาง fallback จะใช้ไม่ได้)"
fi

if command -v node &>/dev/null; then
    NODE_VER=$(node --version 2>&1)
    echo "  ✅ node     → $NODE_VER"
fi

# ───────────────────────────────────────────
# STRATEGY SUMMARY
# ───────────────────────────────────────────

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 Strategy สำหรับ Phase 1 (Deep Reconnaissance):"
echo ""

# Export env vars สำหรับ deep-scan.sh
export GOD_ARCH_TREE_CMD="$TREE_CMD"
export GOD_ARCH_RG_CMD="${RG_CMD:-grep -r}"
export GOD_ARCH_HAS_JQ=$(command -v jq &>/dev/null && echo "1" || echo "0")
export GOD_ARCH_HAS_GIT=$(command -v git &>/dev/null && echo "1" || echo "0")

# Determine scan quality level
MISSING_COUNT=${#TOOLS_MISSING[@]}
if [ $MISSING_COUNT -eq 0 ]; then
    echo "  🟢 Full Scan Mode — เครื่องมือครบ ผลลัพธ์แม่นยำสูงสุด"
    SCAN_STRATEGY="full"
elif [ $MISSING_COUNT -le 2 ]; then
    echo "  🟡 Partial Scan Mode — ขาด: ${TOOLS_MISSING[*]}"
    echo "     → จะใช้ fallback commands แทน"
    SCAN_STRATEGY="partial"
else
    echo "  🔴 Minimal Scan Mode — ขาดเครื่องมือหลาย:"
    echo "     ${TOOLS_MISSING[*]}"
    echo "     → ผลการวิเคราะห์อาจไม่ครบถ้วน — แนะนำติดตั้ง ripgrep + jq"
    SCAN_STRATEGY="minimal"
fi

echo ""
if [ ${#TOOLS_MISSING[@]} -gt 0 ]; then
    echo "💡 ติดตั้ง missing tools:"
    for t in "${TOOLS_MISSING[@]}"; do
        case $t in
            "tree")     echo "   brew install tree  |  apt install tree  |  winget install tree" ;;
            "ripgrep")  echo "   brew install ripgrep  |  apt install ripgrep  |  cargo install ripgrep" ;;
            "jq")       echo "   brew install jq  |  apt install jq  |  winget install jqlang.jq" ;;
        esac
    done
    echo ""
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ env-check เสร็จสิ้น — พร้อมเข้า Phase 1"
echo ""

# Export strategy สำหรับ script อื่นๆ
export GOD_ARCH_SCAN_STRATEGY="$SCAN_STRATEGY"
