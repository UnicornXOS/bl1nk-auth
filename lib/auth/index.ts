// bl1nk-auth Module
// Main entry point for authentication functionality

// Core exports
export * from "./core/types";
export * from "./core/config";
export * from "./core/token";
export * from "./core/user";
export * from "./core/session";
export * from "./core/middleware";
export * from "./core/errors";

// Provider exports
export {
  providers,
  callbackHandlers,
  getProvider,
  getCallbackHandler,
  getProviderNames,
} from "./providers";

// Individual provider exports
export { githubStrategy, githubCallbackHandler } from "./providers/github";
export { googleStrategy, googleCallbackHandler } from "./providers/google";
