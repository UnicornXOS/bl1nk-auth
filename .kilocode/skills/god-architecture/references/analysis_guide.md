# Project Analysis Guide

This guide outlines the steps to perform a comprehensive project analysis for generating a Project Overview.

## 1. Initial Exploration
- Use `ls -R` or `tree` (if available) to get a high-level view of the directory structure.
- Identify the project type (e.g., Monorepo, SPA, Backend API) by looking for configuration files like `package.json`, `go.mod`, `pyproject.toml`, etc.

## 2. Tech Stack Identification
- **Frontend:** Check `dependencies` in `package.json` for frameworks (React, Vue, Next.js), styling (Tailwind, Styled Components), and state management (Zustand, Redux).
- **Backend:** Look for server frameworks (Express, FastAPI, NestJS) and database drivers/ORMs (Prisma, Drizzle, Mongoose).
- **Infrastructure:** Look for `Dockerfile`, `docker-compose.yml`, or CI/CD configs (`.github/workflows`).

## 3. Structure Mapping
- Group directories by their functional roles (e.g., `apps/`, `packages/`, `src/components/`, `src/services/`).
- For monorepos, identify the core packages and their relationships.

## 4. Architecture & Data Flow
- Trace a typical request/action:
  - **UI to DB:** Start from a component, see which hook/store it calls, then which service/API, and finally where the DB logic resides.
  - **API Request:** Trace from route definition to controller/handler to service to DB.
- Map layers to specific directories as shown in the template.

## 5. Best Practices
- **Be Concise:** Focus on the most important parts of the structure. Use `...` or wildcards for repetitive patterns.
- **Visual Clarity:** Use tables for tech stacks and architecture maps. Use code blocks for directory trees and data flow diagrams.
- **Accuracy:** Verify file paths before including them in the document.
