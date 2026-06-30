// Backward compatibility - re-export from new auth module
// @deprecated Use @/lib/auth/core/token instead
export {
  createAccessToken,
  createRefreshToken,
  verifyAuthToken as verifyToken,
} from "@/lib/auth/core/token";

export { AUTH_CONFIG as JWT_CONFIG } from "@/lib/auth/core/config";
