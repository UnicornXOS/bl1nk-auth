# Migration Guide - bl1nk-auth Refactoring

## Quick Reference

### Import Path Changes

Use this table to update your imports if you're working on a feature branch:

| Old Path | New Path | Component Type |
|----------|----------|----------------|
| `@/components/auth/*` | `@/components/features/auth/*` | Authentication |
| `@/components/dashboard/*` | `@/components/features/dashboard/*` | Dashboard |
| `@/components/marketing/*` | `@/components/features/marketing/*` | Marketing |
| `@/components/docs/*` | `@/components/features/docs/*` | Documentation |
| `@/components/common/Site*` | `@/components/layout/Site*` | Layout |
| `@/components/common/TopNav` | `@/components/layout/TopNav` | Layout |
| `@/components/common/ui/DashboardShell` | `@/components/layout/DashboardShell` | Layout |
| `@/components/common/ui/ThemeToggle` | `@/components/layout/ThemeToggle` | Layout |
| `@/components/common/ui/ThemeProvider` | `@/components/providers/ThemeProvider` | Provider |
| `@/components/common/ui/Accessibility*` | `@/components/layout/Accessibility*` | Layout |
| `@/components/common/ui/GlassCard` | `@/components/shared/GlassCard` | Shared |
| `@/components/common/ui/FeatureCard` | `@/components/shared/FeatureCard` | Shared |
| `@/components/common/ui/IOS26*` | `@/components/shared/IOS26*` | Shared |
| `@/components/common/ui/LiquidLogo` | `@/components/shared/LiquidLogo` | Shared |
| `@/components/common/ui/PageTransition` | `@/components/shared/PageTransition` | Shared |
| `@/components/common/ui/DynamicWidget` | `@/components/shared/DynamicWidget` | Shared |
| `@/components/common/ui/Biometric*` | `@/components/features/auth/Biometric*` | Auth |

### Removed Files

These files were removed because they were duplicates or unused:

| Removed File | Reason | Replacement |
|--------------|--------|-------------|
| `/tailwind.config.js` | Duplicate | Use `/tailwind.config.ts` |
| `/styles/globals.css` | Unused duplicate | Use `/app/globals.css` |
| `/components/common/Sidebar.tsx` | Unused | Use shadcn `/components/ui/sidebar.tsx` |
| `/components/common/IconSidebar.tsx` | Unused | Use shadcn `/components/ui/sidebar.tsx` |
| `/components/common/ui/sidebar.tsx` | Unused | Use shadcn `/components/ui/sidebar.tsx` |
| `/components/ui/use-mobile.tsx` | Duplicate | Use `/hooks/use-mobile.ts` |
| `/components/ui/use-toast.ts` | Duplicate | Use `/hooks/use-toast.ts` |
| `/app/api/oauth/auth-callback/route.ts` | Empty placeholder | Use `/app/api/oauth/callback/route.ts` |

---

## Step-by-Step Migration

### If You're Working on a Feature Branch

Follow these steps to update your branch:

#### Step 1: Backup Your Changes

```bash
# Create a backup branch
git checkout your-feature-branch
git checkout -b your-feature-branch-backup

# Return to your working branch
git checkout your-feature-branch
```

#### Step 2: Merge/Rebase Main

```bash
# Option A: Merge main (recommended for most cases)
git merge main

# Option B: Rebase on main (for clean history)
git rebase main
```

#### Step 3: Fix Import Conflicts

If you have merge conflicts in import statements:

**Before (your branch):**
```typescript
import { LoginForm } from '@/components/auth/login-form'
import GlassCard from '@/components/common/ui/GlassCard'
import { AdminStats } from '@/components/dashboard/admin-stats'
```

**After (update to new paths):**
```typescript
import { LoginForm } from '@/components/features/auth/login-form'
import GlassCard from '@/components/shared/GlassCard'
import { AdminStats } from '@/components/features/dashboard/admin-stats'
```

#### Step 4: Search and Replace

Use your editor's search-and-replace feature:

**VS Code / Cursor:**
1. Press `Cmd/Ctrl + Shift + F` (global search)
2. Enable regex mode (.*) button
3. Use these patterns:

```
# Find auth imports
Find:    from ['"]@/components/auth/
Replace: from '@/components/features/auth/

# Find dashboard imports
Find:    from ['"]@/components/dashboard/
Replace: from '@/components/features/dashboard/

# Find marketing imports
Find:    from ['"]@/components/marketing/
Replace: from '@/components/features/marketing/

# Find common/ui imports
Find:    from ['"]@/components/common/ui/
Replace: from '@/components/shared/

# Find common layout imports
Find:    from ['"]@/components/common/(Site|TopNav)
Replace: from '@/components/layout/$1
```

#### Step 5: Handle Special Cases

Some components moved to different categories:

```typescript
// ThemeProvider moved to providers
- import { ThemeProvider } from '@/components/common/ui/ThemeProvider'
+ import { ThemeProvider } from '@/components/providers/ThemeProvider'

// Biometric components moved to auth features
- import BiometricAuth from '@/components/common/ui/BiometricAuth'
+ import BiometricAuth from '@/components/features/auth/BiometricAuth'

// DashboardShell moved to layout
- import { DashboardShell } from '@/components/common/ui/DashboardShell'
+ import { DashboardShell } from '@/components/layout/DashboardShell'
```

#### Step 6: Update Removed File References

If your code references removed files:

```typescript
// Old (removed files)
- import Sidebar from '@/components/common/Sidebar'
- import IconSidebar from '@/components/common/IconSidebar'
- import { useIsMobile } from '@/components/ui/use-mobile'

// New (use these instead)
+ import { Sidebar } from '@/components/ui/sidebar'  // shadcn sidebar
+ import { useIsMobile } from '@/hooks/use-mobile'
```

#### Step 7: Test Your Changes

```bash
# Run the build
npm run build

# Start dev server
npm run dev

# Check for errors
# Visit your feature pages and test functionality
```

---

## Common Migration Scenarios

### Scenario 1: You Added New Auth Components

**Your branch:**
```typescript
// components/auth/magic-link.tsx
import { LoginForm } from './login-form'
import GlassCard from '@/components/common/ui/GlassCard'
```

**After migration:**
```bash
# Move your file
git mv components/auth/magic-link.tsx components/features/auth/magic-link.tsx

# Update imports in the file
import { LoginForm } from './login-form'  # Still works (same directory)
import GlassCard from '@/components/shared/GlassCard'
```

### Scenario 2: You Modified Dashboard Components

**Your branch:**
```typescript
// Modified: components/dashboard/admin-stats.tsx
```

**After migration:**
```bash
# The file moved to:
# components/features/dashboard/admin-stats.tsx

# Cherry-pick your changes:
git show your-commit:components/dashboard/admin-stats.tsx > temp.txt
# Manually merge changes into components/features/dashboard/admin-stats.tsx
```

### Scenario 3: You Created New Shared Components

**Your branch:**
```typescript
// components/common/ui/MyCard.tsx
```

**After migration:**
```bash
# Move to shared folder
git mv components/common/ui/MyCard.tsx components/shared/MyCard.tsx

# Update all imports in your codebase
- import MyCard from '@/components/common/ui/MyCard'
+ import MyCard from '@/components/shared/MyCard'
```

### Scenario 4: You Modified Tailwind Config

**Your branch:**
```javascript
// Modified: tailwind.config.js
```

**After migration:**
```bash
# tailwind.config.js was removed
# Merge your changes into tailwind.config.ts

# 1. View your changes
git show your-commit:tailwind.config.js

# 2. Manually add to tailwind.config.ts
# The new config already has all features merged
# Just add your specific customizations
```

---

## Automated Migration Script

Use this bash script to automatically update imports:

```bash
#!/bin/bash
# migrate-imports.sh

echo "Starting import migration..."

# Update auth imports
find . -type f \( -name "*.tsx" -o -name "*.ts" \) \
  -not -path "*/node_modules/*" \
  -not -path "*/.next/*" \
  -exec sed -i '' 's|@/components/auth/|@/components/features/auth/|g' {} +

# Update dashboard imports
find . -type f \( -name "*.tsx" -o -name "*.ts" \) \
  -not -path "*/node_modules/*" \
  -not -path "*/.next/*" \
  -exec sed -i '' 's|@/components/dashboard/|@/components/features/dashboard/|g' {} +

# Update marketing imports
find . -type f \( -name "*.tsx" -o -name "*.ts" \) \
  -not -path "*/node_modules/*" \
  -not -path "*/.next/*" \
  -exec sed -i '' 's|@/components/marketing/|@/components/features/marketing/|g' {} +

# Update docs imports
find . -type f \( -name "*.tsx" -o -name "*.ts" \) \
  -not -path "*/node_modules/*" \
  -not -path "*/.next/*" \
  -exec sed -i '' 's|@/components/docs/|@/components/features/docs/|g' {} +

# Update common/ui to shared
find . -type f \( -name "*.tsx" -o -name "*.ts" \) \
  -not -path "*/node_modules/*" \
  -not -path "*/.next/*" \
  -exec sed -i '' 's|@/components/common/ui/GlassCard|@/components/shared/GlassCard|g' {} +

find . -type f \( -name "*.tsx" -o -name "*.ts" \) \
  -not -path "*/node_modules/*" \
  -not -path "*/.next/*" \
  -exec sed -i '' 's|@/components/common/ui/IOS26|@/components/shared/IOS26|g' {} +

# Update layout imports
find . -type f \( -name "*.tsx" -o -name "*.ts" \) \
  -not -path "*/node_modules/*" \
  -not -path "*/.next/*" \
  -exec sed -i '' 's|@/components/common/Site|@/components/layout/Site|g' {} +

echo "Migration complete! Please review changes and test."
```

**Usage:**
```bash
chmod +x migrate-imports.sh
./migrate-imports.sh
```

---

## Verification Checklist

After migration, verify these items:

- [ ] **Build succeeds**: `npm run build` completes without errors
- [ ] **No import errors**: Check console for module resolution errors
- [ ] **All pages load**: Test each route manually
- [ ] **Auth works**: Test login/logout flow
- [ ] **Dashboard functions**: Verify all dashboard features
- [ ] **Styles intact**: Check that all styling looks correct
- [ ] **Theme toggle works**: Test light/dark mode switching
- [ ] **Mobile responsive**: Test on mobile viewport

---

## Rollback Instructions

If migration causes issues:

### Quick Rollback

```bash
# If you made a backup branch
git checkout your-feature-branch-backup
git branch -D your-feature-branch
git checkout -b your-feature-branch
```

### Partial Rollback

```bash
# Revert specific files
git checkout HEAD~1 -- path/to/problematic/file.tsx

# Or restore from backup
git show your-feature-branch-backup:path/to/file.tsx > path/to/file.tsx
```

---

## Getting Help

If you encounter issues:

1. **Check the logs**: Look for import errors in console
2. **Search this guide**: Use Cmd/Ctrl+F to find specific imports
3. **Compare with main**: Check how similar imports are done in main branch
4. **Ask for help**: Reach out to the team with specific error messages

---

## Additional Resources

- [REFACTORING_SUMMARY.md](./REFACTORING_SUMMARY.md) - Complete refactoring details
- [ARCHITECTURE.md](./ARCHITECTURE.md) - New architecture overview
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TS module resolution

---

**Last Updated:** January 28, 2026  
**Applies to:** Main branch post-refactoring
