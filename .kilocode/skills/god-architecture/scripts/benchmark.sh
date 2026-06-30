#!/bin/bash
# benchmark.sh — วัด build/test/bundle performance ก่อนและหลัง
#
# Usage:
#   bash scripts/benchmark.sh baseline    # วัดก่อนแก้ไข (บันทึก baseline)
#   bash scripts/benchmark.sh compare     # วัดหลังแก้ไข + เปรียบเทียบ baseline
#   bash scripts/benchmark.sh full        # วัด + report ทันที (ไม่ต้องมี baseline)
#
# Output: god-arch-benchmark-report.md

set -euo pipefail

MODE="${1:-full}"
BASELINE_FILE=".god-arch-baseline.json"
REPORT_FILE="god-arch-benchmark-report.md"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Detect project type
IS_NEXT=$([ -f "next.config.js" ] || [ -f "next.config.ts" ] || [ -f "next.config.mjs" ] && echo "yes" || echo "no")
IS_VITE=$([ -f "vite.config.ts" ] || [ -f "vite.config.js" ] && echo "yes" || echo "no")
IS_NODE=$([ -f "package.json" ] && echo "yes" || echo "no")
IS_PYTHON=$([ -f "pyproject.toml" ] || [ -f "requirements.txt" ] && echo "yes" || echo "no")
IS_RUST=$([ -f "Cargo.toml" ] && echo "yes" || echo "no")
HAS_JQ=$(command -v jq &>/dev/null && echo "yes" || echo "no")

echo "╔══════════════════════════════════════════╗"
echo "║  ⚡ god-architecture — Benchmark Runner   ║"
echo "╚══════════════════════════════════════════╝"
echo ""
echo "Mode: $MODE | Time: $TIMESTAMP"
echo ""

# ───────────────────────────────────────────
# MEASURE FUNCTION
# ───────────────────────────────────────────
measure_time() {
    local label="$1"
    local cmd="$2"
    local start end elapsed
    start=$(date +%s%N 2>/dev/null || date +%s)
    if ! eval "$cmd" > /dev/null 2>&1; then
        return 1
    fi
    end=$(date +%s%N 2>/dev/null || date +%s)

    # ms calculation
    if [[ "$start" =~ [0-9]{13,} ]]; then
        elapsed=$(( (end - start) / 1000000 ))
        echo "${elapsed}ms"
    else
        elapsed=$(( end - start ))
        echo "${elapsed}s"
    fi
}

# ───────────────────────────────────────────
# COLLECT METRICS
# ───────────────────────────────────────────
collect_metrics() {
    echo ""
    echo "▶ Collecting metrics..."
    echo ""

    METRICS="{}"

    # --- TypeScript type check ---
    if [ "$IS_NODE" = "yes" ] && [ -f "tsconfig.json" ]; then
        echo "  ⏱  TypeScript typecheck..."
        TS_TIME=$(measure_time "tsc" "npx tsc --noEmit" 2>/dev/null || echo "skip")
        echo "     → $TS_TIME"
        METRICS=$(echo "$METRICS" | python3 -c "import sys,json; d=json.load(sys.stdin); d['ts_typecheck']='$TS_TIME'; print(json.dumps(d))" 2>/dev/null || echo "$METRICS")
    fi

    # --- Build time ---
    if [ "$IS_NEXT" = "yes" ]; then
        echo "  ⏱  Next.js build..."
        BUILD_TIME=$(measure_time "build" "npx next build" 2>/dev/null || echo "skip")
        echo "     → $BUILD_TIME"
        METRICS=$(echo "$METRICS" | python3 -c "import sys,json; d=json.load(sys.stdin); d['build_time']='$BUILD_TIME'; print(json.dumps(d))" 2>/dev/null || echo "$METRICS")
    elif [ "$IS_VITE" = "yes" ]; then
        echo "  ⏱  Vite build..."
        BUILD_TIME=$(measure_time "build" "npx vite build" 2>/dev/null || echo "skip")
        echo "     → $BUILD_TIME"
        METRICS=$(echo "$METRICS" | python3 -c "import sys,json; d=json.load(sys.stdin); d['build_time']='$BUILD_TIME'; print(json.dumps(d))" 2>/dev/null || echo "$METRICS")
        METRICS=$(echo "$METRICS" | python3 -c "import sys,json; d=json.load(sys.stdin); d['build_time']='$BUILD_TIME'; print(json.dumps(d))" 2>/dev/null || echo "$METRICS")
    elif [ "$IS_RUST" = "yes" ]; then
        echo "  ⏱  Cargo build..."
        BUILD_TIME=$(measure_time "build" "cargo build --release" 2>/dev/null || echo "skip")
        echo "     → $BUILD_TIME"
        METRICS=$(echo "$METRICS" | python3 -c "import sys,json; d=json.load(sys.stdin); d['build_time']='$BUILD_TIME'; print(json.dumps(d))" 2>/dev/null || echo "$METRICS")
        METRICS=$(echo "$METRICS" | python3 -c "import sys,json; d=json.load(sys.stdin); d['build_time']='$BUILD_TIME'; print(json.dumps(d))" 2>/dev/null || echo "$METRICS")
    fi

    # --- Test run ---
    if [ "$IS_NODE" = "yes" ]; then
        PKG_SCRIPTS=$(cat package.json 2>/dev/null | python3 -c "import sys,json; s=json.load(sys.stdin).get('scripts',{}); print(' '.join(s.keys()))" 2>/dev/null || echo "")
        if echo "$PKG_SCRIPTS" | grep -q "test"; then
            echo "  ⏱  Test suite..."
            TEST_TIME=$(measure_time "test" "npm test -- --passWithNoTests" 2>/dev/null || echo "skip")
            echo "     → $TEST_TIME"
            METRICS=$(echo "$METRICS" | python3 -c "import sys,json; d=json.load(sys.stdin); d['test_time']='$TEST_TIME'; print(json.dumps(d))" 2>/dev/null || echo "$METRICS")
        fi
    fi

    # --- Bundle size ---
    if [ "$IS_NEXT" = "yes" ] && [ -d ".next/static" ]; then
        BUNDLE_SIZE=$(du -sh .next/static 2>/dev/null | cut -f1 || echo "unknown")
        echo "  📦 Bundle size: $BUNDLE_SIZE"
        METRICS=$(echo "$METRICS" | python3 -c "import sys,json; d=json.load(sys.stdin); d['bundle_size']='$BUNDLE_SIZE'; print(json.dumps(d))" 2>/dev/null || echo "$METRICS")
    fi

    # --- Source code metrics ---
    if command -v wc &>/dev/null; then
        SRC_DIR=$([ -d "src" ] && echo "src" || echo ".")
        TOTAL_LINES=$(find "$SRC_DIR" \( -name "*.ts" -o -name "*.tsx" -o -name "*.py" -o -name "*.rs" \) \
            -not -path "*/node_modules/*" -not -name "*.d.ts" \
            | xargs wc -l 2>/dev/null | tail -1 | awk '{print $1}' || echo "unknown")
        TOTAL_FILES=$(find "$SRC_DIR" \( -name "*.ts" -o -name "*.tsx" -o -name "*.py" -o -name "*.rs" \) \
            -not -path "*/node_modules/*" -not -name "*.d.ts" \
            | wc -l | tr -d ' ' || echo "unknown")
        echo "  📄 Source: $TOTAL_FILES files, $TOTAL_LINES lines"
        METRICS=$(echo "$METRICS" | python3 -c "import sys,json; d=json.load(sys.stdin); d['total_lines']=$TOTAL_LINES; d['total_files']=$TOTAL_FILES; print(json.dumps(d))" 2>/dev/null || echo "$METRICS")
    fi

    # Add timestamp
    METRICS=$(echo "$METRICS" | python3 -c "import sys,json; d=json.load(sys.stdin); d['timestamp']='$TIMESTAMP'; print(json.dumps(d, indent=2))" 2>/dev/null || echo "$METRICS")

    echo "$METRICS"
}

# ───────────────────────────────────────────
# COMPARE + REPORT
# ───────────────────────────────────────────
write_report() {
    local current="$1"
    local baseline="${2:-}"

    cat > "$REPORT_FILE" << HEADER
# ⚡ Benchmark Report

> Generated by \`scripts/benchmark.sh\`
> Timestamp: $TIMESTAMP

HEADER

    if [ -n "$baseline" ] && [ "$baseline" != "{}" ]; then
        cat >> "$REPORT_FILE" << 'EOF'
## เปรียบเทียบ Before vs After

| Metric | Before (Baseline) | After | Change |
|--------|------------------|-------|--------|
EOF
        # Python comparison
        python3 - "$baseline" "$current" >> "$REPORT_FILE" << 'PYEOF'
import sys, json

def fmt_change(before, after):
    try:
        b = float(str(before).replace('ms','').replace('s','').replace('K','000'))
        a = float(str(after).replace('ms','').replace('s','').replace('K','000'))
        diff = ((a - b) / b) * 100 if b != 0 else 0
        arrow = "🟢 ↓" if diff < -2 else ("🔴 ↑" if diff > 2 else "⚪ ~")
        return f"{arrow} {diff:+.1f}%"
    except:
        return "—"

try:
    baseline = json.loads(sys.argv[1])
    current = json.loads(sys.argv[2])
    keys = set(list(baseline.keys()) + list(current.keys())) - {'timestamp'}
    for k in sorted(keys):
        b = baseline.get(k, '—')
        a = current.get(k, '—')
        change = fmt_change(b, a) if b != '—' and a != '—' else '—'
        print(f"| {k} | {b} | {a} | {change} |")
except Exception as e:
    print(f"| error | {e} | — | — |")
PYEOF
    else
        echo "## Current Metrics" >> "$REPORT_FILE"
        echo '```json' >> "$REPORT_FILE"
        echo "$current" >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
    fi

    echo "" >> "$REPORT_FILE"
    cat >> "$REPORT_FILE" << 'EOF'

---
## คำแนะนำ

- **🟢 ↓** = ดีขึ้น (ลดลง)
- **🔴 ↑** = แย่ลง (เพิ่มขึ้น) — ควรตรวจสอบ
- **⚪ ~** = ไม่เปลี่ยนแปลงนัย (±2%)

หาก build time หรือ bundle size เพิ่มขึ้น ให้รัน:
```bash
# Next.js bundle analyzer
ANALYZE=true npx next build

# Vite rollup visualizer
npx vite-bundle-visualizer
```
EOF
}

# ───────────────────────────────────────────
# MAIN
# ───────────────────────────────────────────
case "$MODE" in
    baseline)
        echo "📸 Recording baseline..."
        RESULT=$(collect_metrics | sed -n '/^{/,$p')
        echo "$RESULT" > "$BASELINE_FILE"
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "✅ Baseline บันทึกไว้ที่: $BASELINE_FILE"
        echo "   รัน 'bash scripts/benchmark.sh compare' หลังแก้โค้ด"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        ;;

    compare)
        if [ ! -f "$BASELINE_FILE" ]; then
            echo "❌ ไม่พบ baseline — รัน 'bash scripts/benchmark.sh baseline' ก่อน"
            exit 1
        fi
        echo "📊 Comparing against baseline..."
        BASELINE_DATA=$(cat "$BASELINE_FILE")
        CURRENT=$(collect_metrics | sed -n '/^{/,$p')
        write_report "$CURRENT" "$BASELINE_DATA"
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "✅ Compare report: $REPORT_FILE"
        cat "$REPORT_FILE"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        ;;

    full|*)
        echo "📊 Full benchmark (no baseline)..."
        CURRENT=$(collect_metrics | sed -n '/^{/,$p')
        write_report "$CURRENT"
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "✅ Benchmark report: $REPORT_FILE"
        cat "$REPORT_FILE"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        ;;
esac
