# bl1nk-auth Development Guidelines

## Code Quality Standards

### File Extensions and Language Usage
- **TypeScript**: Use `.ts` for server-side logic, API routes, and utilities
- **JSX/TSX**: Use `.jsx` for React components, `.tsx` when TypeScript is needed
- **Consistent Extension Strategy**: API routes use `.ts`, UI components use `.jsx` unless requiring TypeScript features

### Import and Module Patterns
- **Path Aliases**: Always use `@/` prefix for internal imports (`@/lib/utils`, `@/components/ui/button`)
- **External Dependencies**: Import from package names directly (`import { NextRequest } from 'next/server'`)
- **Destructured Imports**: Prefer destructuring for multiple exports (`import { cn } from "@/lib/utils"`)
- **React Imports**: Use `import * as React from "react"` for comprehensive React usage

### Component Architecture Standards

#### UI Component Structure (5/5 files follow this pattern)
```javascript
// 1. Client directive when needed
"use client";

// 2. External imports
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

// 3. Internal imports with @/ alias
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// 4. Component implementation with data-slot attributes
function ComponentName({ className, ...props }) {
  return (
    <div
      data-slot="component-name"
      className={cn("base-classes", className)}
      {...props}
    />
  );
}

// 5. Named exports at bottom
export { ComponentName }
```

#### API Route Structure (2/2 API files follow this pattern)
```typescript
// 1. Next.js imports
import { NextRequest, NextResponse } from 'next/server';

// 2. Internal library imports
import { ENV } from '@/lib/env';
import { logger } from '@/lib/logger';

// 3. Runtime configuration
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// 4. Helper functions before main handler
function helperFunction() { /* implementation */ }

// 5. Main handler with comprehensive error handling
export async function POST(request: NextRequest): Promise<NextResponse> {
  // Implementation with proper error responses
}
```

### Styling and CSS Conventions

#### Tailwind CSS Usage (5/5 files demonstrate)
- **Conditional Classes**: Use template literals for dynamic styling
  ```javascript
  className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
  ```
- **Class Merging**: Always use `cn()` utility for combining classes
  ```javascript
  className={cn("base-classes", conditionalClasses, className)}
  ```
- **Responsive Design**: Use responsive prefixes (`md:grid-cols-2`, `sm:max-w-sm`)
- **Dark Mode**: Implement theme-aware styling with conditional classes

#### Component Styling Patterns
- **Data Attributes**: Use `data-slot`, `data-sidebar`, `data-state` for component identification
- **CSS Variables**: Leverage CSS custom properties (`--sidebar-width`, `--skeleton-width`)
- **Variant Systems**: Use `class-variance-authority` for component variants

### State Management Patterns

#### React Hooks Usage (4/5 files demonstrate)
- **useState**: For local component state with descriptive names
- **useEffect**: For side effects with proper cleanup
- **useCallback**: For memoized functions, especially event handlers
- **useMemo**: For expensive computations and object creation
- **Custom Hooks**: Extract reusable logic (`useIsMobile`, `useSidebar`)

#### Context Pattern (1/1 context file follows)
```javascript
const SidebarContext = React.createContext(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return context
}
```

### Error Handling and Validation

#### API Error Responses (2/2 API files implement)
- **Consistent Error Format**: Always return JSON with `error` field
- **HTTP Status Codes**: Use appropriate codes (400, 401, 429, 500, 503)
- **Rate Limiting**: Include rate limit headers in responses
- **Logging**: Use structured logging with context information

#### Input Validation and Sanitization (1/1 webhook file demonstrates)
- **Type Guards**: Implement runtime type checking functions
- **Input Sanitization**: Clean and validate user inputs before processing
- **Header Validation**: Verify required headers and authentication tokens

### TypeScript Patterns

#### Type Definitions (1/1 TypeScript file demonstrates)
- **Interface Definitions**: Use interfaces for object shapes
- **Union Types**: Define allowed values (`type LocaleCode = 'th' | 'en'`)
- **Generic Functions**: Implement reusable type-safe functions
- **Record Types**: Use `Record<K, V>` for key-value mappings

#### Type Safety Practices
- **Strict Configuration**: Enable strict mode in tsconfig.json
- **Explicit Return Types**: Define return types for functions
- **Optional Properties**: Use `?` for optional interface properties
- **Type Guards**: Implement runtime type checking

### Performance Optimization

#### Component Optimization (3/5 files implement)
- **React.memo**: Memoize components to prevent unnecessary re-renders
- **useMemo/useCallback**: Memoize expensive computations and functions
- **Lazy Loading**: Use dynamic imports for code splitting
- **Animation Libraries**: Use Framer Motion for smooth animations

#### Bundle Optimization
- **Tree Shaking**: Import only needed functions from libraries
- **Code Splitting**: Separate routes and components appropriately
- **Asset Optimization**: Optimize images and static assets

### Accessibility Standards

#### Semantic HTML (4/5 files demonstrate)
- **Proper Elements**: Use semantic HTML elements (`main`, `nav`, `button`)
- **ARIA Labels**: Include `aria-label` and `aria-disabled` attributes
- **Screen Reader Support**: Add `sr-only` classes for screen reader text
- **Keyboard Navigation**: Support keyboard interactions and focus management

#### Focus Management
- **Focus Indicators**: Implement visible focus states
- **Tab Index**: Use `tabIndex={-1}` for programmatic focus
- **Focus Trapping**: Implement focus trapping in modals and drawers

### Internationalization

#### Multi-language Support (1/1 theme file implements)
- **Locale Types**: Define supported locales as union types
- **Localized Content**: Store translations in structured objects
- **Fallback Strategy**: Implement fallback to default language
- **Helper Functions**: Create utilities for accessing localized text

### Development Workflow

#### File Organization
- **Feature-based Structure**: Group related components and utilities
- **Consistent Naming**: Use descriptive, consistent file and function names
- **Export Patterns**: Use named exports at file bottom
- **Import Organization**: Group imports by type (external, internal, relative)

#### Code Documentation
- **Inline Comments**: Explain complex logic and business rules
- **Function Documentation**: Document parameters and return values
- **Component Props**: Define clear prop interfaces
- **README Files**: Maintain comprehensive project documentation