// OAuth Providers
// Central export point for all authentication providers

export * from "./github";
export * from "./google";

import type { CallbackHandler, ProviderStrategy } from "@/lib/auth/core/types";
import { githubCallbackHandler, githubStrategy } from "./github";
import { googleCallbackHandler, googleStrategy } from "./google";

// ────────────────────────────────────────────────
// Provider Registry
// ────────────────────────────────────────────────
export const providers: Record<string, ProviderStrategy> = {
  github: githubStrategy,
  google: googleStrategy,
};

export const callbackHandlers: Record<string, CallbackHandler> = {
  github: githubCallbackHandler,
  google: googleCallbackHandler,
};

// ────────────────────────────────────────────────
// Get Provider Strategy
// ────────────────────────────────────────────────
export function getProvider(name: string): ProviderStrategy | null {
  return providers[name] ?? null;
}

// ────────────────────────────────────────────────
// Get Callback Handler
// ────────────────────────────────────────────────
export function getCallbackHandler(name: string): CallbackHandler | null {
  return callbackHandlers[name] ?? null;
}

// ────────────────────────────────────────────────
// Get Available Provider Names
// ────────────────────────────────────────────────
export function getProviderNames(): string[] {
  return Object.keys(providers);
}
