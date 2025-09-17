# MagicUI Flickering Grid Component Usage Guide

The FlickeringGrid component has been successfully added to your project. This guide explains how to use it in your components.

## Component Location

The component is located at:
```
src/components/ui/flickering-grid.tsx
```

## Basic Usage

To use the FlickeringGrid component in any of your components:

```tsx
import { FlickeringGrid } from "@/components/ui/flickering-grid";

// In your JSX
<FlickeringGrid
  className="absolute inset-0 z-0"
  squareSize={4}
  gridGap={6}
  color="#60A5FA" // blue-400
  maxOpacity={0.5}
  flickerChance={0.1}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `squareSize` | number | 4 | Size of each square in the grid |
| `gridGap` | number | 6 | Gap between squares |
| `flickerChance` | number | 0.3 | Chance of a square flickering (0-1) |
| `color` | string | "rgb(0, 0, 0)" | Color of the squares |
| `width` | number | undefined | Fixed width of the grid |
| `height` | number | undefined | Fixed height of the grid |
| `className` | string | undefined | Additional CSS classes |
| `maxOpacity` | number | 0.3 | Maximum opacity for flickering effect |

## Example Implementations

### 1. Background Effect for Hero Section

```tsx
import { FlickeringGrid } from "@/components/ui/flickering-grid";

export function HeroSection() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <FlickeringGrid
        className="absolute inset-0 z-0"
        squareSize={3}
        gridGap={4}
        color="#3B82F6" // blue-500
        maxOpacity={0.3}
        flickerChance={0.05}
      />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-4xl font-bold text-white">Your Content Here</h1>
        <p className="text-lg text-white/80 mt-4">The flickering grid creates a subtle background effect</p>
      </div>
    </div>
  );
}
```

### 2. Card with Flickering Grid Background

```tsx
import { FlickeringGrid } from "@/components/ui/flickering-grid";

export function CardWithGrid() {
  return (
    <div className="relative rounded-xl border p-6 overflow-hidden">
      <FlickeringGrid
        className="absolute inset-0 -z-10"
        squareSize={2}
        gridGap={3}
        color="#10B981" // emerald-500
        maxOpacity={0.2}
        flickerChance={0.1}
      />
      <div className="relative z-10">
        <h3 className="text-xl font-semibold">Card Title</h3>
        <p className="mt-2">This card has a subtle flickering grid background effect.</p>
      </div>
    </div>
  );
}
```

### 3. Full Page Background

```tsx
import { FlickeringGrid } from "@/components/ui/flickering-grid";

export function PageWithGridBackground() {
  return (
    <div className="relative min-h-screen">
      <FlickeringGrid
        className="fixed inset-0 -z-10"
        squareSize={5}
        gridGap={8}
        color="#8B5CF6" // violet-500
        maxOpacity={0.4}
        flickerChance={0.2}
      />
      <div className="relative z-10 container py-12">
        <h1 className="text-3xl font-bold">Page Content</h1>
        <p className="mt-4">Your page content goes here, above the flickering grid.</p>
      </div>
    </div>
  );
}
```

## Integration Tips

1. **Z-Index Management**: Always use appropriate z-index values to ensure the grid appears behind your content (use negative z-index for the grid).

2. **Performance**: The flickering grid uses canvas for performance. It automatically pauses when not in view using IntersectionObserver.

3. **Responsive Design**: By default, the grid will fill its container. You can set fixed `width` and `height` props if needed.

4. **Color Customization**: Use any valid CSS color format (hex, rgb, rgba, hsl, etc.).

5. **Customization**: Adjust `flickerChance` and `maxOpacity` to control the intensity of the effect.

## Where to Use It

Based on your project structure, here are some components where the flickering grid could enhance the UI:

1. **Hero sections** - `hero-upload.tsx`
2. **Landing pages** - Add subtle background effects
3. **Feature sections** - To make cards more visually interesting
4. **Pricing pages** - `pricing-plans.tsx`
5. **Project showcases** - `project-card.tsx`, `project-grid.tsx`
6. **Workflow sections** - `workflow.tsx`
7. **Authentication pages** - Login/signup backgrounds

## Example: Enhancing the HeroUpload Component

You could modify your existing `HeroUpload` component to include a flickering grid background:

```tsx
// In src/components/hero-upload.tsx
import { FlickeringGrid } from "@/components/ui/flickering-grid";

export function HeroUpload() {
  return (
    <div className="container py-12 md:py-24 relative">
      <FlickeringGrid
        className="absolute inset-0 -z-10"
        squareSize={4}
        gridGap={6}
        color="#3B82F6" // blue-500
        maxOpacity={0.3}
        flickerChance={0.1}
      />
      {/* Rest of your existing component code */}
      <div className="mx-auto max-w-3xl text-center relative z-10">
        {/* Your content */}
      </div>
    </div>
  );
}
```

This would add a subtle flickering grid effect to your hero section, creating a more dynamic background while keeping your content readable and prominent.