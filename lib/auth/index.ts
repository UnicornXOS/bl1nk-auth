// bl1nk-auth Module
// Main entry point for authentication functionality

export * from "./core/config";
export * from "./core/errors";
export * from "./core/middleware";
export * from "./core/session";
export * from "./core/token";
// Core exports
export * from "./core/types";
export * from "./core/user";

// Provider exports
export {
  callbackHandlers,
  getCallbackHandler,
  getProvider,
  getProviderNames,
  providers,
} from "./providers";

// Individual provider exports
export { githubCallbackHandler, githubStrategy } from "./providers/github";
export { googleCallbackHandler, googleStrategy } from "./providers/google";
