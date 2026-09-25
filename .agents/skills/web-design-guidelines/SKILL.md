---
name: web-design-guidelines
description: >-
  Review UI code for Web Interface Guidelines compliance. Use when asked to
  "review my UI", "check accessibility", "audit design", "review UX", or "check
  my site against best practices".
metadata:
  author: vercel
  version: 1.0.0
  argument-hint: <file-or-pattern>
  category: development
  source:
    repository: 'https://github.com/vercel-labs/agent-skills'
    path: skills/web-design-guidelines
---

# Web Interface Guidelines

Review files for compliance with Web Interface Guidelines.

## How It Works

1. Fetch the latest guidelines from the source URL below
2. Read the specified files (or prompt user for files/pattern)
3. Check against all rules in the fetched guidelines
4. Output findings in the terse `file:line` format

## Guidelines Source

Fetch fresh guidelines before each review:

```
https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
```

Use WebFetch to retrieve the latest rules. The fetched content contains all the rules and output format instructions.

## Usage

When a user provides a file or pattern argument:
1. Fetch guidelines from the source URL above
2. Read the specified files
3. Apply all rules from the fetched guidelines
4. Output findings using the format specified in the guidelines

If no files specified, ask the user which files to review.

## Critical Accessibility & UI Component Invariants

Whenever writing or reviewing UI components, enforce the following patterns:

1. **Explicit Button Types**: Always add `type="button"` to non-submit `<button>` elements (e.g. `<button type="button">`) to prevent unintended form submission and Biome `useButtonType` lints.
2. **Label & Input Binding**: Always link `<label>` elements to input controls using explicit `htmlFor` and matching `id` attributes.
3. **Semantic HTML First**: Use `<button>`, `<section>`, `<nav>`, `<aside>`, `<ul>`/`<ol>` instead of `<div role="button">`, `<div role="region">`, or `<div role="list">`.
4. **Stable List Keys**: Never use array map indices as React keys (`key={index}`). Always use unique string identifiers (e.g. `key={item.id}` or `key={item.name}`).
5. **Inline SVG Titles**: Decorative inline SVGs should include appropriate `aria-hidden="true"` or title accessibility metadata.
