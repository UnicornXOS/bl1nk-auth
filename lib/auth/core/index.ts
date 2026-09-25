// Core Auth Module
// Export all auth utilities from a single entry point

// Configuration
export {
  AUTH_CONFIG,
  getAvailableProviders,
  getCallbackUrl,
  validateProviderConfig,
} from "./config";
// Error Handling
export {
  createErrorResponse,
  handleAuthError,
  logAuthError,
} from "./errors";
// Middleware
export {
  authHandlers,
  authMiddleware,
  withAuth,
} from "./middleware";
// Session Management
export {
  clearRefreshTokenCookie,
  createCorsResponse,
  createLogoutResponse,
  createSessionResponse,
  getSession,
  readRefreshToken,
  setRefreshTokenCookie,
  signOut,
} from "./session";
// Token Management
export {
  createAccessToken,
  createOTT,
  createRefreshToken,
  createSessionJWT,
  verifyAuthToken,
} from "./token";
// Types
export * from "./types";
// User Management
export {
  getUserByEmail,
  getUserById,
  serializeUser,
  syncUser,
} from "./user";
