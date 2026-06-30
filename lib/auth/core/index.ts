// Core Auth Module
// Export all auth utilities from a single entry point

// Types
export * from "./types";

// Configuration
export {
  AUTH_CONFIG,
  getCallbackUrl,
  validateProviderConfig,
  getAvailableProviders,
} from "./config";

// Token Management
export {
  createAccessToken,
  createRefreshToken,
  createOTT,
  verifyAuthToken,
  createSessionJWT,
} from "./token";

// User Management
export {
  syncUser,
  getUserById,
  getUserByEmail,
  serializeUser,
} from "./user";

// Session Management
export {
  getSession,
  readRefreshToken,
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
  signOut,
  createCorsResponse,
  createSessionResponse,
  createLogoutResponse,
} from "./session";

// Middleware
export {
  authMiddleware,
  withAuth,
  authHandlers,
} from "./middleware";

// Error Handling
export {
  createErrorResponse,
  logAuthError,
  handleAuthError,
} from "./errors";
