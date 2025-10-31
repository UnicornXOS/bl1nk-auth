## Brief overview
Project-specific guidelines for fixing TypeScript and module resolution errors in the bl1nkOS/bl1nk-auth Next.js project, based on recent build failures and compilation issues.

## Communication style
- Provide direct, technical responses without conversational fluff
- Focus on actionable fixes with clear explanations of what was changed and why
- Include verification steps to confirm fixes work

## Development workflow
- Address TypeScript compilation errors immediately when they block builds
- Test fixes by running build commands to ensure no regressions
- Fix syntax errors in API routes before addressing import issues
- Use Next.js build process to validate TypeScript configurations

## Coding best practices
- Use "react-jsx" in tsconfig.json for Next.js projects to properly handle JSX
- Ensure webhook route files have proper syntax and no duplicate function definitions
- Maintain clean import statements and resolve module not found errors by checking file existence
- Keep tsconfig.json configurations minimal and Next.js compatible

## Project context
- Next.js 15+ project with TypeScript and custom path mappings (@/*)
- Uses ES modules with specific JSX handling requirements
- API routes may have complex IP parsing logic that needs careful syntax review
- Build failures often stem from TypeScript configuration mismatches or syntax errors in route handlers

## Other guidelines
- When encountering "Cannot find module" errors, first verify file paths and tsconfig path mappings
- For JSX-related errors, check tsconfig.json jsx setting matches Next.js requirements
- Clean up duplicate code and malformed regex patterns in API handlers before committing