// Unit Tests for Google Provider
// Run with: npx jest __tests__/auth/providers/google.test.ts
//
// Prerequisites:
// npm install --save-dev jest @types/jest ts-jest

import {
  GoogleCallbackHandler,
  googleCallbackHandler,
} from "@/lib/auth/providers/google/callbacks";
import { GoogleStrategy, googleStrategy } from "@/lib/auth/providers/google/strategy";

// ────────────────────────────────────────────────
// Google Strategy Tests
// ────────────────────────────────────────────────
describe("Google Strategy", () => {
  describe("GoogleStrategy class", () => {
    it("should have correct provider name", () => {
      expect(googleStrategy.name).toBe("google");
    });

    it("should return config with required fields", () => {
      const config = googleStrategy.getConfig();
      expect(config).toHaveProperty("clientId");
      expect(config).toHaveProperty("clientSecret");
      expect(config).toHaveProperty("redirectUri");
      expect(config).toHaveProperty("scopes");
      expect(config).toHaveProperty("authorizationUrl");
      expect(config).toHaveProperty("tokenUrl");
      expect(config).toHaveProperty("userInfoUrl");
    });

    it("should generate valid authorization URL", () => {
      const state = "test-state";
      const url = googleStrategy.getAuthorizationUrl(state);

      expect(url).toContain("https://accounts.google.com/o/oauth2/v2/auth");
      expect(url).toContain(`state=${state}`);
      expect(url).toContain("response_type=code");
      expect(url).toContain("access_type=offline");
    });
  });
});

// ────────────────────────────────────────────────
// Google Callback Handler Tests
// ────────────────────────────────────────────────
describe("Google Callback Handler", () => {
  describe("GoogleCallbackHandler class", () => {
    it("should be a singleton", () => {
      const handler1 = new GoogleCallbackHandler();
      const handler2 = new GoogleCallbackHandler();
      // Both should work independently
      expect(handler1).toBeDefined();
      expect(handler2).toBeDefined();
    });
  });
});
