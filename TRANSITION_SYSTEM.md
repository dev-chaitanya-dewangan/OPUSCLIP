# Page Transition System

This document explains how to use the page transition system implemented in the Opus Clip application.

## Components

### RouteTransitionProvider
This is the main provider that manages transition state. It should be placed at the root of your application (in `app/layout.tsx`).

### TransitionLink
A wrapper around Next.js Link that triggers page transitions when clicked.

### useTransition
A hook that provides access to transition state and functions.

### PageTransitionWrapper
A component that wraps pages and applies transition animations.

## Usage

### 1. Setting up the Provider
The `RouteTransitionProvider` is already set up in `app/layout.tsx`. You don't need to do anything extra.

### 2. Using TransitionLink
Replace regular `Link` components with `TransitionLink`:

```jsx
import { TransitionLink } from '@/components/transition-link';

<TransitionLink href="/dashboard">
  Dashboard
</TransitionLink>
```

### 3. Using the useTransitionRouter Hook
For programmatic navigation with transitions:

```jsx
import { useTransitionRouter } from '@/hooks/use-transition-router';

export default function MyComponent() {
  const router = useTransitionRouter();
  
  const handleClick = () => {
    router.push('/dashboard');
  };
  
  return <button onClick={handleClick}>Go to Dashboard</button>;
}
```

### 4. Adding Navigation to Pages
To add navigation to a page, import and use the `ExpandableTabs` component:

```jsx
import { ExpandableTabs } from '@/components/expandable-tabs';
import { Home, Video, BarChart3, FileText, DollarSign, Image } from 'lucide-react';

<ExpandableTabs
  tabs={[
    { title: "Home", icon: Home, href: "/" },
    { title: "Videos", icon: Video, href: "/dashboard" },
    { title: "Analytics", icon: BarChart3, href: "/dashboard" },
    { title: "Reports", icon: FileText, href: "/dashboard" },
    { type: "separator" },
    { title: "Pricing", icon: DollarSign, href: "/pricing" },
    { title: "Gallery", icon: Image, href: "/dashboard" },
  ]}
  activeColor="text-accent"
  className="rounded-xl p-1"
/>
```

## Customization

### Transition Duration
The transition duration is set to 300ms. You can adjust this in:
- `src/components/route-transition-provider.tsx` (timeout value)
- `src/app/globals.css` (transition duration in CSS)

### Animation Curves
The easing function is `cubic-bezier(0.22, 1, 0.36, 1)`. You can modify this in `src/app/globals.css`.

### Reduced Motion
The system automatically respects the `prefers-reduced-motion` media query, falling back to simple opacity transitions.

## Disabling Transitions
To disable transitions for a specific link, use a regular Next.js Link component instead of TransitionLink.