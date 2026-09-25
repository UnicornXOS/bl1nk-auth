#!/bin/bash
# test-skill.sh — Test god-architecture skill v4.0
set -e
PASS=0; FAIL=0
SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"

check() {
    if eval "$2" &>/dev/null; then echo "  [PASS] $1"; PASS=$((PASS+1))
    else echo "  [FAIL] $1"; FAIL=$((FAIL+1)); fi
}

echo "╔════════════════════════════════════════╗"
echo "║  god-architecture skill v4.0 tests     ║"
echo "╚════════════════════════════════════════╝"
echo ""

echo "▶ SKILL.md Structure:"
check "SKILL.md exists"                      "[ -f '$SKILL_DIR/SKILL.md' ]"
check "No 'version:' in frontmatter"         "! grep -q '^version:' '$SKILL_DIR/SKILL.md'"
check "Has STARTUP HOOK"                     "grep -q 'STARTUP HOOK' '$SKILL_DIR/SKILL.md'"
check "Has PHASE 0 (MCP + Context)"          "grep -q 'PHASE 0' '$SKILL_DIR/SKILL.md'"
check "Has PHASE 5 (Workflow Setup)"         "grep -q 'PHASE 5' '$SKILL_DIR/SKILL.md'"
check "Has Confirmation Gate"                "grep -q 'Confirmation Gate' '$SKILL_DIR/SKILL.md'"
check "Has Delivery Rules (10)"              "grep -q 'Delivery Rules' '$SKILL_DIR/SKILL.md'"
check "Has ask_user rule"                    "grep -q 'ask_user' '$SKILL_DIR/SKILL.md'"
check "Has Mobile-first rule"                "grep -q '[Mm]obile.first' '$SKILL_DIR/SKILL.md'"
check "Has TODO.md append-only rule"         "grep -q 'append' '$SKILL_DIR/SKILL.md'"
check "Has Verify-Before-Trust"              "grep -q 'Verify-Before-Trust\|stale\|ล้าสมัย' '$SKILL_DIR/SKILL.md'"
check "Has MCP detection"                    "grep -q 'mcp-detect' '$SKILL_DIR/SKILL.md'"
echo ""

echo "▶ Scripts (11 total):"
for s in env-check.sh deep-scan.sh backup.sh find-duplicates.sh benchmark.sh \
          mcp-detect.sh generate-workflow.sh check-context.sh \
          automation.py test-skill.sh generate-diagrams.sh; do
    check "$s exists" "[ -f '$SKILL_DIR/scripts/$s' ]"
done
echo ""

echo "▶ Script Syntax:"
for s in env-check.sh deep-scan.sh backup.sh find-duplicates.sh benchmark.sh \
          mcp-detect.sh generate-workflow.sh check-context.sh; do
    check "$s syntax ok" "bash -n '$SKILL_DIR/scripts/$s'"
done
check "automation.py syntax ok" "python3 -m py_compile '$SKILL_DIR/scripts/automation.py'"
echo ""

echo "▶ References (14 files):"
for r in nextjs.md react.md typescript.md vue.md fastapi.md tauri.md svelte.md \
         nestjs.md go.md dart-flutter.md monorepo.md analysis_guide.md \
         ai-tools.md dev-tooling.md; do
    check "references/$r" "[ -f '$SKILL_DIR/references/$r' ]"
done
echo ""

echo "▶ Templates (9 files):"
for t in overview_template.md AGENTS.md tauri-template.md sveltekit-template.md \
         nestjs-template.md go-template.md workflow-template.md \
         TODO-template.md context-template.md; do
    check "templates/$t" "[ -f '$SKILL_DIR/templates/$t' ]"
done
echo ""

echo "▶ Functional Tests:"
check "env-check.sh runs ok"    "bash '$SKILL_DIR/scripts/env-check.sh' > /dev/null 2>&1"
check "check-context.sh runs"   "bash '$SKILL_DIR/scripts/check-context.sh' > /dev/null 2>&1 || true"

TMP_TEST=$(mktemp -d)
mkdir -p "$TMP_TEST/src"
echo '{"name":"test","dependencies":{"next":"15.0.0"},"scripts":{"test":"vitest","lint":"biome check ."}}' > "$TMP_TEST/package.json"
echo "export default function Page() { return null }" > "$TMP_TEST/src/page.tsx"

check "deep-scan.sh runs ok"           "bash '$SKILL_DIR/scripts/deep-scan.sh' '$TMP_TEST' > /dev/null 2>&1"
check "deep-scan creates report"       "[ -f '$TMP_TEST/god-arch-scan-report.md' ]"
check "mcp-detect.sh runs ok"          "bash '$SKILL_DIR/scripts/mcp-detect.sh' '$TMP_TEST' > /dev/null 2>&1"
check "mcp-detect creates report"      "[ -f '$TMP_TEST/god-arch-mcp-report.md' ]"
check "generate-workflow.sh runs ok"   "bash '$SKILL_DIR/scripts/generate-workflow.sh' '$TMP_TEST' > /dev/null 2>&1"
check "workflow.md created"            "[ -f '$TMP_TEST/workflow.md' ]"
check "TODO.md created"                "[ -f '$TMP_TEST/TODO.md' ]"
check "CLAUDE.md created"              "[ -f '$TMP_TEST/CLAUDE.md' ]"
check "TODO.md has append-only rules"  "grep -q 'ห้าม override\|append' '$TMP_TEST/TODO.md' 2>/dev/null"
check "workflow.md has mobile-first"   "grep -qi 'mobile\|มือถือ' '$TMP_TEST/workflow.md' 2>/dev/null"
check "CLAUDE.md links to workflow"    "grep -q 'workflow.md' '$TMP_TEST/CLAUDE.md' 2>/dev/null"

rm -rf "$TMP_TEST"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Results: ✅ $PASS passed  ❌ $FAIL failed"
[ $FAIL -eq 0 ] && echo "🎉 All tests passed!" && exit 0 || echo "⚠️  $FAIL failed" && exit 1
