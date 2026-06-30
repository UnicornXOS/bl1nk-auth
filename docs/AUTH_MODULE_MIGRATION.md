# Auth Module Migration Guide

## Overview

This guide documents the refactoring of the authentication module in bl1nk-auth. The new structure provides a centralized auth core module with provider-specific implementations, making it easier to maintain and extend with new OAuth providers.

## New Structure

```text
lib/auth/
├── core/
│   ├── index.ts          # Main exports
│   ├── types.ts          # Types and interfaces
│   ├── config.ts         # Auth configuration
│   ├── token.ts          # Token management
│   ├── user.ts           # User management
│   ├── session.ts        # Session management
│   ├── middleware.ts      # Auth middleware
│   └── errors.ts         # Error handling
├── providers/
│   ├── index.ts          # Provider registry
│   ├── github/
│   │   ├── index.ts      # Provider exports
│   │   ├── strategy.ts   # GitHub OAuth strategy
│   │   └── callbacks.ts  # GitHub callback handler
│   └── google/
│       ├── index.ts      # Provider exports
│       ├── strategy.ts   # Google OAuth strategy
│       └── callbacks.ts  # Google callback handler
├── index.ts              # Main auth module export
├── middleware.ts         # Backward compatibility (deprecated)
├── jwt.ts                # Backward compatibility (deprecated)
└── roles.ts              # User roles (unchanged)
```

## Import Changes

### Before (Old)

```typescript
import { auth, signOut } from "@/lib/auth/middleware";
import { createAccessToken, verifyToken } from "@/lib/auth/jwt";
```

### After (New)

```typescript
// Recommended: Import from main auth module
import { getSession, signOut, createAccessToken, verifyAuthToken } from "@/lib/auth";

// Or import from specific modules
import { getSession, signOut } from "@/lib/auth/core/session";
import { createAccessToken, verifyAuthToken } from "@/lib/auth/core/token";
```

## Backward Compatibility

The old import paths are still supported with deprecation warnings:

- `@/lib/auth/middleware` - Re-exports from `@/lib/auth/core`
- `@/lib/auth/jwt` - Re-exports from `@/lib/auth/core/token`

**Note:** The `auth()` function is now aliased to `getSession()` for backward compatibility.

## Adding a New Provider

### 1. Create Provider Directory

```bash
mkdir -p lib/auth/providers/newprovider
```

### 2. Create Strategy File

```typescript
// lib/auth/providers/newprovider/strategy.ts
import type { ProviderConfig, ProviderStrategy, UserProfile } from "@/lib/auth/core/types";

export class NewProviderStrategy implements ProviderStrategy {
  name = "newprovider";

  getConfig(): ProviderConfig {
    return {
      clientId: process.env.NEWPROVIDER_CLIENT_ID ?? "",
      clientSecret: process.env.NEWPROVIDER_CLIENT_SECRET ?? "",
      redirectUri: "https://yourdomain.com/api/oauth/callback",
      scopes: ["email", "profile"],
      authorizationUrl: "https://newprovider.com/oauth/authorize",
      tokenUrl: "https://newprovider.com/oauth/token",
      userInfoUrl: "https://newprovider.com/api/user",
    };
  }

  getAuthorizationUrl(state: string): string {
    const config = this.getConfig();
    const params = new URLSearchParams({
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      scope: config.scopes.join(" "),
      state,
    });
    return `${config.authorizationUrl}?${params.toString()}`;
  }

  async exchangeCode(code: string): Promise<string> {
    // Implement token exchange
  }

  async fetchProfile(accessToken: string): Promise<UserProfile> {
    // Implement profile fetching
  }
}

export const newProviderStrategy = new NewProviderStrategy();
```

### 3. Create Callback Handler

```typescript
// lib/auth/providers/newprovider/callbacks.ts
import type { CallbackHandler, CallbackResult, OAuthState } from "@/lib/auth/core/types";
import { syncUser } from "@/lib/auth/core/user";
import { createOTT } from "@/lib/auth/core/token";
import { newProviderStrategy } from "./strategy";

export class NewProviderCallbackHandler implements CallbackHandler {
  async handle(code: string, state: OAuthState): Promise<CallbackResult> {
    try {
      const accessToken = await newProviderStrategy.exchangeCode(code);
      const profile = await newProviderStrategy.fetchProfile(accessToken);
      const user = await syncUser(profile);
      const ott = await createOTT({ sub: user.id, email: user.email ?? "" });
      
      const redirectUrl = new URL(state.ret);
      redirectUrl.searchParams.set("ott", ott);

      return {
        success: true,
        profile,
        redirectUrl: redirectUrl.toString(),
      };
    } catch (error) {
      return {
        success: false,
        error: /* handle error */,
      };
    }
  }
}

export const newProviderCallbackHandler = new NewProviderCallbackHandler();
```

### 4. Create Index File

```typescript
// lib/auth/providers/newprovider/index.ts
export { NewProviderStrategy, newProviderStrategy } from "./strategy";
export { NewProviderCallbackHandler, newProviderCallbackHandler } from "./callbacks";
```

### 5. Register Provider

```typescript
// lib/auth/providers/index.ts
import { newProviderStrategy, newProviderCallbackHandler } from "./newprovider";

export const providers: Record<string, ProviderStrategy> = {
  github: githubStrategy,
  google: googleStrategy,
  newprovider: newProviderStrategy,  // Add here
};

export const callbackHandlers: Record<string, CallbackHandler> = {
  github: githubCallbackHandler,
  google: googleCallbackHandler,
  newprovider: newProviderCallbackHandler,  // Add here
};
```

### 6. Update Environment Variables

Add to your `.env` file:

```bash
NEWPROVIDER_CLIENT_ID=your_client_id
NEWPROVIDER_CLIENT_SECRET=your_client_secret
```

## API Routes

The existing API routes remain unchanged:

- `GET /api/login?provider=xxx&client=xxx&return=xxx` - Initiate OAuth flow
- `GET /api/oauth/callback` - Handle OAuth callback
- `POST /api/session/exchange` - Exchange OTT for JWT
- `POST /api/session/refresh` - Refresh access token
- `POST /api/session/logout` - Sign out
- `GET /api/auth/[...nextauth]` - Get current session

## Testing

Run unit tests:

```bash
npm test -- __tests__/auth/
```

## Error Handling

The new module provides structured error handling:

```typescript
import { AuthError, AuthErrorCode, handleAuthError } from "@/lib/auth";

// Throw structured errors
throw new AuthError(
  AuthErrorCode.TOKEN_EXCHANGE_FAILED,
  "Failed to exchange code",
  500,
  "Additional details"
);

// Handle errors in routes
try {
  // ... auth logic
} catch (error) {
  return handleAuthError("context", error);
}
```

## Environment Variables

See `.env.example` for all required and optional environment variables.

## Rollback Instructions

If you need to rollback:

1. The old files (`lib/auth/middleware.ts`, `lib/auth/jwt.ts`, `lib/auth/roles.ts`) still exist with backward compatibility
2. API routes continue to work with the same signatures
3. No database schema changes were made

## Support

For questions or issues, please refer to:

- `ARCHITECTURE.md` - Overall architecture documentation
- `docs/setup/oauth.md` - OAuth setup guide
