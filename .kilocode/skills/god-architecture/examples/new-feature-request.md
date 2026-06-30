# Example: Adding a New Auth Feature

**User Request:** "I want to add a new authentication feature with Supabase and MFA to my Next.js app."

**god-architecture Workflow:**

1. **Analysis:**
   - Tech Stack: Next.js 15, React 19, Supabase Auth.
   - Current Patterns: Using `src/lib/auth.ts` for auth helpers.

2. **Architecture Decision:**
   - Use Supabase Auth Helpers for Next.js.
   - Implement MFA using Supabase's native MFA API.

3. **Implementation Blueprint:**
   - Create `src/app/(auth)/mfa/page.tsx`
   - Update `src/middleware.ts` to enforce MFA.
   - Add `src/services/auth.service.ts` for MFA logic.

4. **Automation:**
   - Run `scripts/generate-diagrams.sh` to update project structure visualization.
   - Update `CHANGELOG.md` via `scripts/automation.py`.
