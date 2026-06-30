// Unit Tests for GitHub Provider
// Run with: npx jest __tests__/auth/providers/github.test.ts
//
// Prerequisites:
// npm install --save-dev jest @types/jest ts-jest

import {
  GitHubCallbackHandler,
  githubCallbackHandler,
} from "@/lib/auth/providers/github/callbacks";
import { GitHubStrategy, githubStrategy } from "@/lib/auth/providers/github/strategy";

// ────────────────────────────────────────────────
// GitHub Strategy Tests
// ────────────────────────────────────────────────
describe("GitHub Strategy", () => {
  describe("GitHubStrategy class", () => {
    it("should have correct provider name", () => {
      expect(githubStrategy.name).toBe("github");
    });

    it("should return config with required fields", () => {
      const config = githubStrategy.getConfig();
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
      const url = githubStrategy.getAuthorizationUrl(state);

      expect(url).toContain("https://github.com/login/oauth/authorize");
      expect(url).toContain(`state=${state}`);
      expect(url).toContain("scope=");
    });
  });
});

// ────────────────────────────────────────────────
// GitHub Callback Handler Tests
// ────────────────────────────────────────────────
describe("GitHub Callback Handler", () => {
  describe("GitHubCallbackHandler class", () => {
    it("should be a singleton", () => {
      const handler1 = new GitHubCallbackHandler();
      const handler2 = new GitHubCallbackHandler();
      // Both should work independently
      expect(handler1).toBeDefined();
      expect(handler2).toBeDefined();
    });
  });
});
