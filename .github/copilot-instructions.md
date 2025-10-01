# Copilot Instructions for AI Coding Agents

## Project Overview
This is a Next.js (TypeScript) web application for inventory management. The architecture is modular, with clear separation between UI components, business logic, context providers, and localization.

## Key Directories & Files
- `app/`: Next.js app router structure. Contains main pages and subpages (e.g., dashboard, products, sales, suppliers, statistics, connexion).
- `components/`: Reusable UI and dashboard components. Subfolders for dashboard and UI primitives.
- `contexts/`: React context providers (e.g., language context).
- `hooks/`: Custom React hooks (e.g., mobile detection, toast notifications).
- `lib/`: Business logic utilities (e.g., authentication, general utils).
- `locales/`: JSON files for i18n (English and French).
- `public/`: Static assets and images.
- `styles/`: Global CSS.

## Architecture & Patterns
- Uses Next.js App Router (`app/`), with each subfolder representing a route.
- UI components are highly composable and reside in `components/ui/`.
- Dashboard features are split into dedicated components in `components/dashboard/`.
- Context and hooks are used for cross-cutting concerns (e.g., language, mobile detection, toast notifications).
- Localization is handled via JSON files in `locales/`.
- No backend code present; focus is on frontend logic and UI.

## Developer Workflows
- **Install dependencies:** `pnpm install` (uses pnpm, not npm/yarn)
- **Run dev server:** `pnpm dev`
- **Build for production:** `pnpm build`
- **Start production server:** `pnpm start`
- **Lint:** `pnpm lint`
- **Format:** `pnpm format`
- No test scripts or test files detected; testing is not currently integrated.

## Project-Specific Conventions
- TypeScript is enforced throughout.
- CSS is managed globally via `styles/globals.css` and `app/globals.css`.
- Components follow a functional, stateless pattern.
- Context and hooks are used for state and side effects.
- Localization keys are referenced from `locales/`.
- Dashboard features are modular and isolated by domain.

## Integration Points
- No API or backend integration detected.
- No external service calls or environment variable usage found.
- All logic is client-side and static asset-based.

## Examples
- To add a new dashboard feature, create a component in `components/dashboard/` and a route in `app/dashboard/`.
- To add a new locale, create a JSON file in `locales/` and update context logic.
- To add a new UI primitive, use the pattern in `components/ui/`.

---

For questions or missing conventions, please ask for clarification or provide feedback to improve these instructions.