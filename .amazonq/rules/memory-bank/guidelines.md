# bl1nk-auth Development Guidelines

## Code Quality Standards

### File Organization & Naming
- **Component Files**: Use PascalCase for React components (`Dashboard.jsx`, `AccessibilityProvider.tsx`)
- **Utility Files**: Use kebab-case for utilities and configurations (`route.ts`, `drawer.jsx`)
- **Directory Structure**: Group related components in logical directories (`ui/`, `marketing/`, `api/`)
- **File Extensions**: Use `.tsx` for TypeScript React components, `.ts` for TypeScript utilities, `.jsx` for JavaScript React components

### Import Conventions
- **Absolute Imports**: Use `@/` path alias consistently for internal imports
- **External Libraries**: Import external libraries first, followed by internal imports
- **Destructuring**: Use destructured imports for React hooks and utilities
- **Type Imports**: Separate type imports when using TypeScript

### Code Formatting Patterns
- **String Literals**: Use single quotes for JSX attributes, double quotes for regular strings
- **Template Literals**: Use template literals for dynamic strings and multi-line content
- **Semicolons**: Consistently use semicolons at statement ends
- **Trailing Commas**: Include trailing commas in multi-line objects and arrays

## Component Architecture Standards

### React Component Patterns
- **Functional Components**: Use functional components with hooks exclusively
- **Props Destructuring**: Destructure props in function parameters with default values
- **Component Composition**: Build reusable components through composition patterns
- **Forward Refs**: Use `React.forwardRef` for components that need ref forwarding

### State Management
- **Local State**: Use `useState` for component-local state management
- **Effect Hooks**: Use `useEffect` for side effects with proper dependency arrays
- **Custom Hooks**: Extract reusable logic into custom hooks (e.g., `useIsMobile`, `useAccessibility`)
- **Context Providers**: Use React Context for cross-component state sharing

### Styling Conventions
- **Tailwind CSS**: Use Tailwind utility classes for styling
- **Conditional Classes**: Use `cn()` utility function for conditional class application
- **CSS Variables**: Use CSS custom properties for dynamic styling (e.g., `--sidebar-width`)
- **Responsive Design**: Apply mobile-first responsive design patterns

## TypeScript Implementation

### Type Definitions
- **Interface Naming**: Use descriptive interface names ending with `Type` or `Props`
- **Optional Properties**: Use optional properties (`?`) appropriately in interfaces
- **Generic Types**: Use generic types for reusable component patterns
- **Type Guards**: Implement proper type checking and validation

### Error Handling
- **Try-Catch Blocks**: Wrap async operations in try-catch blocks
- **Error Typing**: Type errors as `Error` and access properties safely
- **Validation**: Use runtime validation with libraries like Zod
- **Fallback Values**: Provide sensible fallback values for optional data

## API Route Patterns

### Request Handling
- **Runtime Configuration**: Export `runtime` and `dynamic` configurations for API routes
- **HTTP Methods**: Use appropriate HTTP methods (GET, POST, PUT, DELETE)
- **Request Validation**: Validate request headers, body, and parameters
- **Response Formatting**: Return consistent JSON response structures

### Security Practices
- **Rate Limiting**: Implement rate limiting for public endpoints
- **Authentication**: Validate authentication tokens and secrets
- **Input Sanitization**: Sanitize and validate all user inputs
- **IP Resolution**: Properly resolve client IP addresses from headers

### Error Responses
- **Status Codes**: Use appropriate HTTP status codes (200, 400, 401, 429, 500)
- **Error Objects**: Return structured error objects with descriptive messages
- **Logging**: Log errors with contextual information for debugging

## Accessibility Implementation

### ARIA Standards
- **Semantic HTML**: Use semantic HTML elements where appropriate
- **ARIA Labels**: Provide `aria-label` attributes for interactive elements
- **Screen Reader Support**: Include screen reader only content with `sr-only` classes
- **Focus Management**: Implement proper focus management for interactive components

### User Preferences
- **System Preferences**: Respect system preferences (reduced motion, high contrast)
- **Local Storage**: Persist accessibility preferences in localStorage
- **Dynamic Classes**: Apply accessibility classes dynamically based on user settings
- **Voice Navigation**: Implement voice navigation features with speech synthesis

## Performance Optimization

### Component Optimization
- **Memoization**: Use `React.useMemo` and `React.useCallback` for expensive computations
- **Lazy Loading**: Implement lazy loading for large components and routes
- **Code Splitting**: Split code at route and component boundaries
- **Bundle Optimization**: Optimize bundle size through proper imports

### Data Handling
- **Efficient Updates**: Minimize re-renders through proper dependency management
- **Caching**: Implement appropriate caching strategies for API responses
- **Background Processing**: Use queue systems for background job processing
- **Resource Management**: Properly clean up resources in useEffect cleanup functions

## Testing & Quality Assurance

### Code Validation
- **TypeScript Strict Mode**: Use strict TypeScript configuration
- **ESLint Rules**: Follow ESLint configuration for code quality
- **Type Safety**: Ensure comprehensive type coverage
- **Runtime Validation**: Validate data at runtime boundaries

### Documentation Standards
- **Component Documentation**: Document component props and usage patterns
- **API Documentation**: Document API endpoints with request/response examples
- **Code Comments**: Use comments sparingly for complex business logic
- **README Files**: Maintain comprehensive README documentation