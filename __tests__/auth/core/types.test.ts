// Unit Tests for Auth Core Module
// Run with: npx jest __tests__/auth/core/types.test.ts
//
// Prerequisites:
// npm install --save-dev jest @types/jest ts-jest

import { AUTH_CONFIG, getAvailableProviders, getCallbackUrl } from "@/lib/auth/core/config";
import { createErrorResponse, handleAuthError, logAuthError } from "@/lib/auth/core/errors";
import { AuthError, AuthErrorCode } from "@/lib/auth/core/types";

// ────────────────────────────────────────────────
// Types Tests
// ────────────────────────────────────────────────
describe("Auth Types", () => {
  describe("AuthError", () => {
    it("should create an AuthError with correct properties", () => {
      const error = new AuthError(
        AuthErrorCode.MISSING_PARAMS,
        "Missing required parameters",
        400,
        "Additional detail",
      );

      expect(error.code).toBe(AuthErrorCode.MISSING_PARAMS);
      expect(error.message).toBe("Missing required parameters");
      expect(error.statusCode).toBe(400);
      expect(error.detail).toBe("Additional detail");
      expect(error.name).toBe("AuthError");
    });

    it("should serialize to JSON correctly", () => {
      const error = new AuthError(
        AuthErrorCode.INVALID_TOKEN,
        "Invalid token",
        401,
        "Token expired",
      );

      const json = error.toJSON();
      expect(json.error).toBe(AuthErrorCode.INVALID_TOKEN);
      expect(json.message).toBe("Invalid token");
      expect(json.detail).toBe("Token expired");
    });

    it("should not include detail in JSON if not provided", () => {
      const error = new AuthError(AuthErrorCode.AUTHENTICATION_FAILED, "Auth failed", 500);

      const json = error.toJSON();
      expect(json.detail).toBeUndefined();
    });
  });

  describe("AuthErrorCode enum", () => {
    it("should have all expected error codes", () => {
      expect(AuthErrorCode.MISSING_PARAMS).toBe("missing_params");
      expect(AuthErrorCode.INVALID_CLIENT).toBe("invalid_client");
      expect(AuthErrorCode.PROVIDER_NOT_CONFIGURED).toBe("provider_not_configured");
      expect(AuthErrorCode.UNSUPPORTED_PROVIDER).toBe("unsupported_provider");
      expect(AuthErrorCode.TOKEN_EXCHANGE_FAILED).toBe("token_exchange_failed");
      expect(AuthErrorCode.AUTHENTICATION_FAILED).toBe("authentication_failed");
      expect(AuthErrorCode.INVALID_TOKEN).toBe("invalid_token");
    });
  });
});

// ────────────────────────────────────────────────
// Config Tests
// ────────────────────────────────────────────────
describe("Auth Config", () => {
  describe("AUTH_CONFIG", () => {
    it("should have correct token expiration settings", () => {
      expect(AUTH_CONFIG.token.access.expiresIn).toBe("15m");
      expect(AUTH_CONFIG.token.refresh.expiresIn).toBe("7d");
      expect(AUTH_CONFIG.token.ott.expiresIn).toBe("1m");
    });

    it("should have correct cookie name", () => {
      expect(AUTH_CONFIG.cookie.refreshName).toBe("bl1nk_refresh");
    });
  });

  describe("getCallbackUrl", () => {
    it("should return correct callback URL", () => {
      const url = getCallbackUrl();
      expect(url).toContain("/api/oauth/callback");
    });
  });

  describe("getAvailableProviders", () => {
    it("should return array of provider names", () => {
      const providers = getAvailableProviders();
      expect(Array.isArray(providers)).toBe(true);
    });
  });
});

// ────────────────────────────────────────────────
// Error Handling Tests
// ────────────────────────────────────────────────
describe("Error Handling", () => {
  describe("createErrorResponse", () => {
    it("should create response from AuthError", () => {
      const error = new AuthError(AuthErrorCode.INVALID_TOKEN, "Token invalid", 401);
      const response = createErrorResponse(error);

      expect(response.status).toBe(401);
    });

    it("should create response from generic Error", () => {
      const error = new Error("Something went wrong");
      const response = createErrorResponse(error, 500);

      expect(response.status).toBe(500);
    });
  });

  describe("logAuthError", () => {
    it("should log error with context", () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();
      const error = new Error("Test error");

      logAuthError("test-context", error, { key: "value" });

      expect(consoleSpy).toHaveBeenCalledWith(
        "[auth:test-context] Error:",
        expect.objectContaining({
          message: "Test error",
          key: "value",
        }),
      );

      consoleSpy.mockRestore();
    });
  });
});
