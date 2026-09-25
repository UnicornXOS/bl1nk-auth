#!/bin/bash
# generate-diagrams.sh - Auto-generate diagrams for god-architecture skill

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# 1. Project Tree
echo "Generating project tree..."
python3 "$SCRIPT_DIR/automation.py"
echo "Project tree saved to project-tree.txt"

# 2. Mermaid Diagrams (Architecture Workflow)
echo "Generating Mermaid architecture diagram..."
cat <<EOF > architecture.mmd
graph TD
    User[User Requirement] -->|Analyze| GodSkill[God-Architecture Skill]
    
    subgraph "Core Logic (SKILL.md)"
        GodSkill --> Analysis[Codebase Analysis]
        Analysis --> Decision[Architecture Decision]
        Decision --> Blueprint[Implementation Blueprint]
    end
    
    subgraph "Automation & Quality Control"
        Blueprint --> Automation[Scripts: Changelog, Hooks, Tree]
        Automation --> Testing[Test Execution]
        Testing --> Validation[Validation & Linter]
    end
    
    subgraph "Reference Stacks (2026)"
        Decision --> NextJS[Next.js 15/16 Stack]
        Decision --> Vue[Vue 3.6/Nuxt 4 Stack]
        Decision --> FastAPI[FastAPI 0.128+ Stack]
    end
    
    Validation -->|Success| Delivery[Final Deliverable]
    Validation -->|Failure| Fix[Auto-Fix / Correction]
    Fix --> Blueprint
EOF

# Render using the built-in manus-render-diagram tool
manus-render-diagram architecture.mmd architecture.png
echo "Mermaid architecture diagram saved to architecture.png"

# 3. Mermaid Workflow (Flexible Steps)
echo "Generating Mermaid workflow diagram..."
cat <<EOF > workflow.mmd
sequenceDiagram
    participant User
    participant Manus
    participant GodSkill
    participant Scripts
    
    User->>Manus: New Feature Request
    Manus->>GodSkill: Invoke God-Architecture
    GodSkill->>GodSkill: Analyze Codebase (Grep/Glob)
    GodSkill->>GodSkill: Consult References (2026 Stacks)
    GodSkill->>Manus: Suggest Architecture & Plan
    Manus->>Scripts: Run automation.py (Changelog/Hooks)
    Manus->>Scripts: Run generate-diagrams.sh
    Scripts-->>Manus: Artifacts Generated
    Manus->>User: Deliver Result with Diagrams
EOF

manus-render-diagram workflow.mmd workflow.png
echo "Mermaid workflow diagram saved to workflow.png"
