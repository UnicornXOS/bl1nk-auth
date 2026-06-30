# Development & Testing Tools Setup Plan

This document provides a comprehensive setup plan for integrating development and testing tools into the bl1nk-auth Next.js project.

---

## Table of Contents

1. [Overview](#overview)
2. [Tool Summary](#tool-summary)
3. [Phase 1: Biome Setup](#phase-1-biome-setup)
4. [Phase 2: EditorConfig Setup](#phase-2-editorconfig-setup)
5. [Phase 3: Knip Setup](#phase-3-knip-setup)
6. [Phase 4: Changesets Setup](#phase-4-changesets-setup)
7. [Phase 5: Playwright Setup](#phase-5-playwright-setup)
8. [Workflow Integration](#workflow-integration)
9. [CI/CD Pipeline](#cicd-pipeline)
10. [Team Onboarding Checklist](#team-onboarding-checklist)

---

## Overview

This plan integrates five essential development tools to improve code quality, consistency, and testing coverage:

| Tool | Purpose | Priority |
|------|---------|----------|
| Biome | Fast formatter & linter (replaces ESLint + Prettier) | High |
| EditorConfig | Consistent coding styles across editors | High |
| Knip | Dead code detection & unused dependencies | Medium |
| Changesets | Version management & changelog generation | Medium |
| Playwright | E2E testing & visual regression | High |

---

## Phase 1: Biome Setup

Biome is a fast, all-in-one toolchain that replaces ESLint and Prettier with better performance.

### Installation

```bash
pnpm add -D @biomejs/biome
```

### Configuration File: `biome.json`

Create at project root:

```json
{
  "$schema": "https://biomejs.dev/schemas/2.0.0/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "complexity": {
        "noExtraBooleanCast": "error",
        "noMultipleSpacesInRegularExpressionLiterals": "error",
        "noUselessCatch": "error",
        "noUselessThisAlias": "error",
        "noUselessTypeConstraint": "error",
        "noWith": "error"
      },
      "correctness": {
        "noConstAssign": "error",
        "noConstantCondition": "warn",
        "noEmptyCharacterClassInRegex": "error",
        "noEmptyPattern": "error",
        "noGlobalObjectCalls": "error",
        "noInvalidConstructorSuper": "error",
        "noNewSymbol": "error",
        "noNonoctalDecimalEscape": "error",
        "noPrecisionLoss": "error",
        "noSelfAssign": "error",
        "noSetterReturn": "error",
        "noSwitchDeclarations": "error",
        "noUndeclaredVariables": "error",
        "noUnreachable": "error",
        "noUnreachableSuper": "error",
        "noUnsafeFinally": "error",
        "noUnsafeOptionalChaining": "error",
        "noUnusedImports": "error",
        "noUnusedLabels": "error",
        "noUnusedPrivateClassMembers": "error",
        "noUnusedVariables": "error",
        "useIsNan": "error",
        "useValidForDirection": "error",
        "useYield": "error"
      },
      "style": {
        "noNamespace": "error",
        "useAsConstAssertion": "error",
        "useBlockStatements": "off",
        "useConsistentArrayType": {
          "level": "error",
          "options": { "syntax": "shorthand" }
        },
        "useForOf": "error",
        "useShorthandFunctionType": "error"
      },
      "suspicious": {
        "noAsyncPromiseExecutor": "error",
        "noCatchAssign": "error",
        "noClassAssign": "error",
        "noCompareNegZero": "error",
        "noControlCharactersInRegex": "error",
        "noDebugger": "error",
        "noDoubleEquals": "error",
        "noDuplicateCase": "error",
        "noDuplicateClassMembers": "error",
        "noDuplicateObjectKeys": "error",
        "noDuplicateParameters": "error",
        "noEmptyBlockStatements": "warn",
        "noExplicitAny": "warn",
        "noExtraNonNullAssertion": "error",
        "noFallthroughSwitchClause": "error",
        "noFunctionAssign": "error",
        "noGlobalAssign": "error",
        "noImportAssign": "error",
        "noMisleadingCharacterClass": "error",
        "noMisleadingInstantiator": "error",
        "noPrototypeBuiltins": "error",
        "noRedeclare": "error",
        "noShadowRestrictedNames": "error",
        "noUnsafeDeclarationMerging": "error",
        "noUnsafeNegation": "error",
        "useGetterReturn": "error",
        "useValidTypeof": "error"
      }
    }
  },
  "formatter": {
    "enabled": true,
    "formatWithErrors": false,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineEnding": "lf",
    "lineWidth": 100,
    "attributePosition": "auto"
  },
  "javascript": {
    "formatter": {
      "jsxQuoteStyle": "double",
      "quoteProperties": "asNeeded",
      "trailingCommas": "es5",
      "semicolons": "always",
      "arrowParentheses": "always",
      "bracketSpacing": true,
      "bracketSameLine": false,
      "quoteStyle": "single",
      "attributePosition": "auto"
    }
  },
  "json": {
    "formatter": {
      "trailingCommas": "none"
    }
  },
  "files": {
    "ignore": [
      "node_modules",
      ".next",
      "out",
      "build",
      "coverage",
      "playwright-report",
      "test-results",
      "*.min.js",
      "*.min.css",
      "pnpm-lock.yaml"
    ]
  }
}
```

### Package.json Scripts

Add to `scripts`:

```json
{
  "scripts": {
    "format": "biome format --write .",
    "format:check": "biome format .",
    "lint:biome": "biome lint .",
    "lint:biome:fix": "biome lint --write .",
    "check": "biome check .",
    "check:fix": "biome check --write ."
  }
}
```

### Migration from ESLint

1. Run both tools in parallel initially
2. Gradually disable overlapping ESLint rules
3. Keep `next lint` for Next.js-specific rules
4. Remove ESLint after validation period

---

## Phase 2: EditorConfig Setup

EditorConfig ensures consistent coding styles across different editors and IDEs.

### Configuration File: `.editorconfig`

Create at project root:

```ini
# EditorConfig - https://editorconfig.org

root = true

# Default settings for all files
[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true
max_line_length = 100

# Markdown files
[*.md]
trim_trailing_whitespace = false
max_line_length = off

# YAML files
[*.{yml,yaml}]
indent_size = 2

# JSON files
[*.json]
indent_size = 2

# TypeScript/JavaScript
[*.{ts,tsx,js,jsx,mjs,cjs}]
indent_size = 2
quote_type = single

# CSS/SCSS
[*.{css,scss,sass}]
indent_size = 2

# Prisma schema
[*.prisma]
indent_size = 2

# Shell scripts
[*.sh]
indent_size = 2
shell_variant = bash

# Makefile
[Makefile]
indent_style = tab

# Docker
[Dockerfile*]
indent_size = 2

# Lock files (don't modify)
[{pnpm-lock.yaml,package-lock.json,yarn.lock}]
indent_size = 2
insert_final_newline = false
```

### IDE Extensions

Team members should install:
- **VS Code**: EditorConfig for VS Code
- **JetBrains**: Built-in support
- **Vim/Neovim**: editorconfig-vim

---

## Phase 3: Knip Setup

Knip finds unused files, dependencies, and exports in your project.

### Installation

```bash
pnpm add -D knip
```

### Configuration File: `knip.json`

Create at project root:

```json
{
  "$schema": "https://unpkg.com/knip@5/schema.json",
  "entry": [
    "app/**/*.{ts,tsx}",
    "pages/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "lib/**/*.ts",
    "scripts/**/*.ts"
  ],
  "project": [
    "**/*.{ts,tsx,js,jsx}"
  ],
  "ignore": [
    "**/*.d.ts",
    "**/*.test.ts",
    "**/*.spec.ts",
    "playwright/**",
    ".next/**",
    "node_modules/**"
  ],
  "ignoreDependencies": [
    "@types/*",
    "autoprefixer",
    "postcss",
    "tailwindcss",
    "tailwindcss-animate",
    "tw-animate-css",
    "prisma",
    "tsx"
  ],
  "ignoreBinaries": [
    "prisma",
    "tsx"
  ],
  "next": {
    "entry": [
      "app/**/page.{ts,tsx}",
      "app/**/layout.{ts,tsx}",
      "app/**/route.{ts,tsx}",
      "app/**/loading.{ts,tsx}",
      "app/**/error.{ts,tsx}",
      "app/**/not-found.{ts,tsx}",
      "middleware.{ts,tsx}"
    ]
  },
  "rules": {
    "files": "warn",
    "dependencies": "error",
    "devDependencies": "warn",
    "optionalPeerDependencies": "off",
    "unlisted": "warn",
    "binaries": "warn",
    "unresolved": "error",
    "exports": "warn",
    "types": "warn",
    "duplicates": "error"
  }
}
```

### Package.json Scripts

```json
{
  "scripts": {
    "knip": "knip",
    "knip:fix": "knip --fix",
    "knip:watch": "knip --watch"
  }
}
```

### Usage

```bash
# Run analysis
pnpm knip

# Auto-fix safe issues
pnpm knip:fix

# Watch mode during development
pnpm knip:watch
```

---

## Phase 4: Changesets Setup

Changesets manages versioning and changelog generation for releases.

### Installation

```bash
pnpm add -D @changesets/cli
pnpm changeset init
```

### Configuration File: `.changeset/config.json`

```json
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.0/schema.json",
  "changelog": [
    "@changesets/changelog-github",
    { "repo": "UnicornXOS/bl1nk-auth" }
  ],
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "restricted",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": [],
  "___experimentalUnsafeOptions_WILL_CHANGE_IN_PATCH": {
    "onlyUpdatePeerDependentsWhenOutOfRange": true
  }
}
```

### Install Changelog Generator

```bash
pnpm add -D @changesets/changelog-github
```

### Package.json Scripts

```json
{
  "scripts": {
    "changeset": "changeset",
    "changeset:add": "changeset add",
    "changeset:version": "changeset version",
    "changeset:publish": "changeset publish",
    "changeset:status": "changeset status"
  }
}
```

### Workflow

1. **Create changeset** when making changes:
   ```bash
   pnpm changeset:add
   ```

2. **Select change type**:
   - `patch`: Bug fixes (0.0.X)
   - `minor`: New features (0.X.0)
   - `major`: Breaking changes (X.0.0)

3. **Version bump** before release:
   ```bash
   pnpm changeset:version
   ```

4. **Publish** (if applicable):
   ```bash
   pnpm changeset:publish
   ```

---

## Phase 5: Playwright Setup

Playwright provides end-to-end testing with screenshot capturing for visual regression.

### Installation

```bash
pnpm add -D @playwright/test
pnpm exec playwright install
```

### Configuration File: `playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './playwright/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'playwright-report/results.json' }],
    ['list']
  ],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
  snapshotDir: './playwright/snapshots',
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 100,
      threshold: 0.2,
    },
  },
});
```

### Directory Structure

```
playwright/
  tests/
    auth.spec.ts
    dashboard.spec.ts
    home.spec.ts
  fixtures/
    test-fixtures.ts
  snapshots/
    (auto-generated screenshots)
  utils/
    helpers.ts
```

### Example Test: `playwright/tests/auth.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/auth');
    await expect(page).toHaveTitle(/bl1nk/i);
    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
  });

  test('should show validation errors for empty form', async ({ page }) => {
    await page.goto('/auth');
    await page.getByRole('button', { name: /sign in/i }).click();
    await expect(page.getByText(/required/i)).toBeVisible();
  });

  test('visual regression - login page', async ({ page }) => {
    await page.goto('/auth');
    await expect(page).toHaveScreenshot('login-page.png');
  });
});
```

### Example Test: `playwright/tests/home.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/bl1nk/i);
  });

  test('visual regression - home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveScreenshot('home-page.png', {
      fullPage: true,
    });
  });

  test('responsive - mobile view', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page).toHaveScreenshot('home-mobile.png');
  });
});
```

### Package.json Scripts

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:report": "playwright show-report",
    "test:e2e:update-snapshots": "playwright test --update-snapshots"
  }
}
```

### Visual Regression Workflow

1. **Capture baseline** screenshots:
   ```bash
   pnpm test:e2e:update-snapshots
   ```

2. **Run tests** to compare:
   ```bash
   pnpm test:e2e
   ```

3. **Review failures** in report:
   ```bash
   pnpm test:e2e:report
   ```

4. **Update snapshots** when changes are intentional:
   ```bash
   pnpm test:e2e:update-snapshots
   ```

---

## Workflow Integration

### Daily Development Workflow

```
1. Pull latest changes
   └── git pull origin main

2. Install dependencies
   └── pnpm install

3. Start development
   └── pnpm dev

4. Before committing
   ├── pnpm check:fix          # Biome format & lint
   ├── pnpm knip               # Check for dead code
   └── pnpm test:e2e           # Run E2E tests

5. Create changeset (if needed)
   └── pnpm changeset:add

6. Commit & push
   ├── git add .
   └── git commit -m "feat: description"
```

### Pre-commit Hook (Optional)

Install husky and lint-staged:

```bash
pnpm add -D husky lint-staged
pnpm exec husky init
```

Create `.husky/pre-commit`:

```bash
#!/bin/sh
pnpm lint-staged
```

Add to `package.json`:

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      "biome check --write --no-errors-on-unmatched"
    ],
    "*.{json,md,yml,yaml}": [
      "biome format --write --no-errors-on-unmatched"
    ]
  }
}
```

---

## CI/CD Pipeline

### GitHub Actions: `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  CI: true

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm check
      - run: pnpm knip

  test-e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm exec playwright install --with-deps
      - run: pnpm test:e2e
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30

  build:
    runs-on: ubuntu-latest
    needs: [lint, test-e2e]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
```

---

## Team Onboarding Checklist

### New Developer Setup

- [ ] Install Node.js 20+
- [ ] Install pnpm: `npm install -g pnpm`
- [ ] Clone repository
- [ ] Run `pnpm install`
- [ ] Install Playwright browsers: `pnpm exec playwright install`
- [ ] Install IDE extensions:
  - [ ] EditorConfig
  - [ ] Biome
  - [ ] Playwright Test for VSCode

### IDE Configuration (VS Code)

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "biomejs.biome",
  "[typescript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[javascript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[json]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "editor.codeActionsOnSave": {
    "source.organizeImports.biome": "explicit",
    "quickfix.biome": "explicit"
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

Create `.vscode/extensions.json`:

```json
{
  "recommendations": [
    "biomejs.biome",
    "editorconfig.editorconfig",
    "ms-playwright.playwright",
    "prisma.prisma"
  ]
}
```

---

## Summary

| Tool | Command | Frequency |
|------|---------|-----------|
| Biome | `pnpm check:fix` | Every commit |
| EditorConfig | Auto (IDE) | Always active |
| Knip | `pnpm knip` | Weekly / before release |
| Changesets | `pnpm changeset:add` | Per feature/fix |
| Playwright | `pnpm test:e2e` | Before merge / CI |

This setup ensures code quality, consistency, and reliable testing across the entire development lifecycle.
