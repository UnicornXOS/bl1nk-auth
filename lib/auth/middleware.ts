// Backward compatibility - re-export from new auth module
// @deprecated Use @/lib/auth instead
export {
  type AuthSession as Session,
  authHandlers,
  authMiddleware,
  getSession,
  getSession as auth,
  signOut,
  withAuth,
} from "@/lib/auth/core";
