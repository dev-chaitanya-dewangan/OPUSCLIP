# AI Design System Guidelines

## Overview
This document provides instructions for how the AI should use our design system when implementing features or components. Our design system is based on shadcn/ui with Radix UI primitives, Tailwind CSS for styling, and follows a component-driven architecture.

## Component Patterns

### 1. UI Component Structure
- All UI components are located in `src/components/ui/`
- These are base components that follow shadcn/ui patterns
- Components use `cva` (Class Variance Authority) for variants
- All components should use the `cn()` utility for combining class names

### 2. Custom Component Structure
- Custom components are located in `src/components/`
- These are feature-specific components that may compose UI components
- Components should be atomic and reusable where possible

### 3. Naming Conventions
- Component files should use kebab-case (e.g., `button.tsx`, `hero-upload.tsx`)
- Component names should use PascalCase (e.g., `Button`, `HeroUpload`)
- Exported components should match the file name

### 4. Component Implementation Guidelines

#### Props
- Define clear prop interfaces that extend native HTML attributes when appropriate
- Use TypeScript interfaces for props with clear documentation
- Provide default values for optional props

#### Styling
- Use Tailwind CSS classes exclusively
- Utilize the `cn()` function for combining class names
- Leverage the `cva` utility for components with multiple variants
- Follow the existing color palette defined in Tailwind config

#### Composition
- Compose components using existing UI components when possible
- Use the `asChild` pattern from Radix UI for flexible component composition
- Prefer render props or compound components for complex interactions

### 5. File Organization

```
src/
├── app/                 # Next.js app router files
├── components/
│   ├── ui/             # Base UI components (buttons, cards, etc.)
│   ├── editor/         # Editor-specific components
│   └── [feature]/      # Feature-specific components
├── lib/                # Utility functions and shared logic
├── hooks/              # Custom React hooks
└── ...
```

## Available UI Components

The following UI components are available in `src/components/ui/`:

- Button (`button.tsx`)
- Card (`card.tsx`)
- Dialog (`dialog.tsx`)
- Input (`input.tsx`)
- Label (`label.tsx`)
- Checkbox (`checkbox.tsx`)
- Radio Group (`radio-group.tsx`)
- Select (`select.tsx`)
- Switch (`switch.tsx`)
- Textarea (`textarea.tsx`)
- Badge (`badge.tsx`)
- Skeleton (`skeleton.tsx`)
- Toaster (`toaster.tsx`)

## Utility Functions

The `src/lib/utils.ts` file contains several utility functions:

- `cn(...inputs: ClassValue[])` - Combines class names with clsx and tailwind-merge
- `delay(ms: number)` - Creates a promise that resolves after a delay
- `uid(prefix: string)` - Generates a unique ID with optional prefix
- `timecode(seconds: number)` - Converts seconds to HH:MM:SS format
- `safeLocalStorageGet(key, defaultValue)` - Safely retrieves from localStorage
- `safeLocalStorageSet(key, value)` - Safely stores in localStorage

## Implementation Process

When implementing new components or features, follow these steps:

1. **Check Existing Components**: First, review existing UI components in `src/components/ui/` to see if the required functionality already exists.

2. **Component Composition**: If possible, compose new components using existing UI components rather than building from scratch.

3. **Follow Established Patterns**: Look at similar components in `src/components/` to understand the implementation patterns used in this project.

4. **Use Utility Functions**: Leverage the utility functions in `src/lib/utils.ts` rather than writing custom solutions.

5. **TypeScript First**: Always use TypeScript with proper typing for props and return values.

6. **Accessibility**: Ensure components follow accessibility best practices, especially when using Radix UI primitives.

## Styling Guidelines

- Use Tailwind CSS classes exclusively for styling
- Utilize the existing color palette defined in the Tailwind configuration
- Follow mobile-first responsive design principles
- Use consistent spacing with the existing spacing scale
- Prefer utility classes over custom CSS unless absolutely necessary

## Animation and Interactions

- Use Framer Motion for complex animations (`framer-motion` is already installed)
- For simple transitions, use Tailwind CSS built-in transitions
- Follow established interaction patterns in existing components

## Testing

- For complex components, consider adding test files (`.test.tsx`)

## Import Aliases

The project uses the following import aliases:

- `@/components` for `src/components`
- `@/components/ui` for `src/components/ui`
- `@/lib` for `src/lib`
- `@/hooks` for `src/hooks`
- `@/lib/utils` for utility functions

Always use these aliases rather than relative paths when possible.