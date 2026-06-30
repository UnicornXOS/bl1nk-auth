#!/bin/bash
set -e

# --- Install pnpm globally ---
npm install -g pnpm

# --- Project dependencies ---
if [ -f "package.json" ]; then
    if [ -f "pnpm-lock.yaml" ]; then
        pnpm install
    elif [ -f "bun.lockb" ]; then
        bun install
    elif [ -f "yarn.lock" ]; then
        yarn install
    else
        npm install
    fi
fi

# --- Prisma generate (if schema exists) ---
if [ -f "prisma/schema.prisma" ]; then
    pnpm prisma generate
fi
