# Compact Car Hire Template

Next.js template for the Compact Car Hire site, built with React, Tailwind CSS, and shadcn/ui components.

## Requirements

- Node.js 20.9 or newer
- npm

## Setup

Install dependencies from the lockfile:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

The app will be available at:

```text
http://localhost:3000
```

## Templating

The reusable site data now lives in `lib/site-content.ts`.

Main-flow prompt files are read from the shared workspace `Prompts` folder, not from this template directory. For this template, keep these files in sync there:

- `Prompts/compactcarhire-template.txt`
- `Prompts/compactcarhire-template.images.txt`

Update this file when adapting the template:

- `siteConfig`: business name, legal name, phone number, location, nearby areas
- `serviceNavigation`: top-nav service links
- `servicePages`: page metadata, hero copy, vehicle cards, FAQs, and CTA content for each service

The route files in `app/` are now thin wrappers that simply select the relevant service definition from `lib/site-content.ts`.

## Useful Commands

Run a production build:

```bash
npm run build
```

Start the production server after building:

```bash
npm run start
```

Run ESLint:

```bash
npm run lint
```

Run TypeScript checks:

```bash
npm run typecheck
```

Format TypeScript and TSX files:

```bash
npm run format
```

## Adding UI Components

This project uses shadcn/ui. Add new components with:

```bash
npx shadcn@latest add button
```

Generated UI components are placed in `components/ui` and can be imported with the configured `@` alias:

```tsx
import { Button } from "@/components/ui/button";
```
