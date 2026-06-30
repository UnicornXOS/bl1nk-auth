// Backward compatibility - re-export from new auth module
// @deprecated Use @/lib/auth instead
export {
  getSession,
  getSession as auth,
  signOut,
  authHandlers,
  authMiddleware,
  withAuth,
  type AuthSession as Session,
} from "@/lib/auth/core";
