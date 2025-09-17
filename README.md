# OpusClip Clone

A modern video editing platform that transforms long videos into engaging short-form content for social media platforms.

## Features

- **AI-Powered Editing**: Automatically clips and optimizes your content
- **Responsive Design**: Works on all devices from mobile to desktop
- **Multi-Format Export**: Export to various social media platforms
- **Real-time Preview**: See your edits as you make them
- **Keyboard Shortcuts**: Efficient editing with familiar shortcuts

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
├── hooks/           # Custom React hooks
├── lib/             # Core business logic and utilities
└── types/           # TypeScript type definitions
```

## Available Pages

- **Home**: Marketing page with upload options
- **Dashboard**: Project management interface
- **Editor**: Video editing workspace
- **Onboarding**: User onboarding flow
- **Pricing**: Plan selection and billing

## Technologies Used

- **Next.js 15** with App Router
- **React 19** with Server Components
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Zustand** for state management
- **Framer Motion** for animations
- **Radix UI** for accessible components

## Development

### Linting

```bash
npm run lint
```

### Building

```bash
npm run build
```

### Testing

```bash
npm run test
```

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)