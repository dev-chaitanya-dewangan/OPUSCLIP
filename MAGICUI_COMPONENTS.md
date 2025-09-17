# Adding MagicUI Components to Your Project

This project is configured to use MagicUI components through the shadcn CLI. Here's how to add more components:

## Prerequisites

Make sure you have `npx` available (comes with Node.js). The project is already configured with the MagicUI registry.

## Adding Components

To add any MagicUI component, use the following command:

```bash
npx shadcn@latest add @magicui/[component-name]
```

For example, to add the flickering grid component (which has already been added):

```bash
npx shadcn@latest add @magicui/flickering-grid
```

## Available MagicUI Components

You can browse the available components at: https://magicui.design

Some popular components include:
- `flickering-grid` - Added ✓
- `animated-beam` - Connects two or more elements with an animated beam
- `bento-grid` - Creates a bento grid layout
- `marquee` - Creates a scrolling marquee effect
- `grid-pattern` - Creates a grid pattern background
- `dot-pattern` - Creates a dot pattern background
- `confetti` - Adds confetti effects
- `blur-fade` - Adds blur and fade animations

## Adding Another Component Example

To add the animated beam component:

```bash
npx shadcn@latest add @magicui/animated-beam
```

The component will be added to `src/components/ui/` and can be imported like:

```tsx
import { AnimatedBeam } from "@/components/ui/animated-beam"
```

## Component Registry Configuration

Your project's `components.json` file is already configured with the MagicUI registry:

```json
{
  "registries": {
    "@magicui": "https://magicui.design/r/{name}.json"
  }
}
```

This configuration allows the shadcn CLI to fetch component information directly from MagicUI's registry.