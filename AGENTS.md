<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# HireLoop Client — AI Agent Guide & Project Manual

> **Note for AI Agents**: Always keep this `AGENTS.md` file updated whenever architecture, design tokens, component structure, or conventions evolve. Strictly implement only requested features without generating unrequested pages, routes, or mockups.

---

## 1. Project Overview & Architecture

**HireLoop** is a modern, AI-native job discovery and career platform connecting top talent with world-class companies.

### Tech Stack
- **Framework**: Next.js 16.4.4 (App Router)
- **Library**: React 19.3.1
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`, `@import "tailwindcss"`, `@theme inline`)
- **Icons**: Lucide React (`lucide-react`)
- **UI Primitives**: Base UI (`@base-ui/react`), Class Variance Authority (`class-variance-authority`), `cn` utility (`clsx` + `tailwind-merge`)
- **Authentication**: Better-Auth (`better-auth`, `@better-auth/mongo-adapter`, MongoDB)
- **Theming**: `next-themes` (Dark mode default, attribute `class`, hotkey `d` for quick toggle in `components/theme-provider.tsx`)
- **Fonts**: Next Google Fonts (`Manrope`, `Space_Mono`, `Geist`, `Geist_Mono`)

---

## 2. Design System & Tokens (Figma Specification)

Extracted directly from `public/design/hireloop.fig` (Figma artboards: `Job Hunting Platform - PH (Shared)`):

### 2.1 Color Tokens
| Token | OKLCH / CSS Value | Description / Usage |
| :--- | :--- | :--- |
| `--background` | `oklch(0.165 0.006 285.7)` / `#0a0a0c` | Primary canvas background (dark space) |
| `--card` / `--popover` | `oklch(0.214 0.004 286.1)` / `#101010` | Floating surfaces, search container, cards |
| `--color-brand` | `oklch(0.561 0.244 277.4)` / `#5c53fe` | Primary brand purple / vibrant accent |
| `--color-brand-light` | `oklch(0.646 0.186 282.3)` | Lighter brand shade for text links & highlights |
| `--foreground` | `oklch(0.962 0.003 286.3)` / `#ffffff` | Primary text color |
| Muted Foreground | `rgba(255, 255, 255, 0.7)` | Subtitles, labels, secondary copy |
| Surface Stroke | `rgba(255, 255, 255, 0.1)` ~ `0.2` | Subtle borders for search bar, pill badges, cards |

### 2.2 Typography Tokens
- **`--font-manrope` (`font-manrope`)**:
  - Main Hero headline: 56px (Manrope Bold / weight 700)
  - Hero subheadline: 20px (Manrope Regular / weight 400)
  - Trending Position labels: 14px–16px (Manrope Regular)
- **`--font-space-mono` (`font-space-mono`)**:
  - Hero announcement badge: 20px (Space Mono Regular / weight 400)
  - Pricing & metadata tags: Space Mono
- **`--font-sans` (`font-sans`)**:
  - Primary UI, navigation, buttons, and system controls (`Geist`, `Satoshi`, `Inter`)

### 2.3 Brand Assets
- `app/images/logo.png`: HireLoop horizontal logo mark.
- `app/images/globe.png`: 1440px wide atmospheric curved blue Earth globe with purple atmosphere aura and starry particle field.
- `app/images/cta-bg.png`: Perspective grid curved wireframe background for call-to-action sections.

---

## 3. Implemented Components

### 3.1 Navbar (`components/navbar.tsx`)
- Container: `max-w-[1320px]`, floating card styling with `rounded-2xl bg-card`, responsive padding.
- Navigation items: Browse Jobs (`/jobs`), Company (`/company`), Pricing (`/pricing`).
- Action triggers: "Sign In" link (`text-brand-light`), "Get Started" CTA button (`bg-brand`).
- Mobile sheet drawer (`components/ui/sheet.tsx`) for viewports `< 768px`.

### 3.2 Hero Section (`components/hero.tsx`)
Pixel-accurate realization of Figma node `Frame 2147234456` and `Group 1`:
- **Announcement Badge (`Frame 2147234462`)**:
  - Centered glowing pill with flame/sparkle icon and label `"50,000+ new jobs this month"` in `font-space-mono`.
  - Flanked on both sides by subtle accent divider lines (`Line 2` & `Line 3`).
- **Main Headline & Subheadline (`Hero Section Title`)**:
  - Headline: `"Find Your Dream Job Today"` (`font-manrope font-bold text-4xl sm:text-5xl lg:text-[56px] text-white`).
  - Subtitle: `"HireLoop connects top talent with world-class companies. Browse thousands of curated opportunities and land your next role — faster."` (`font-manrope text-white/70 text-lg sm:text-xl max-w-[784px]`).
- **Dual Search Container (`Frame 1`)**:
  - Combined `max-w-[784px]` search bar with 1px border (`border-white/20`) and dark surface (`bg-[#101010]/90 backdrop-blur-md`).
  - Search input with `Search` icon: `"Job title, skill or company"`.
  - Subtle vertical divider.
  - Location input with `MapPin` icon: `"Location or Remote"`.
  - Quick action search button: 48x48px square with `bg-brand` and `Search` icon.
- **Trending Position Chips (`Frame 2147234453`)**:
  - Label: `"Trending Position"`.
  - Interactive pill chips: `"Product Designer"`, `"AI Engineering"`, `"Dev-ops Engineer"`.
- **Atmospheric Globe Background (`Group 1`)**:
  - Placed behind the hero text (`app/images/globe.png`), curving upwards with starry particle haze.

---

## 4. Coding Guidelines & Best Practices

1. **Strict Task Boundaries**:
   - Only build the requested components. Do not scaffold other pages, extra sections, or unrequested database connections unless explicitly requested.
2. **Next.js & Base UI Conventions**:
   - Always preserve the `<!-- BEGIN:nextjs-agent-rules -->` block at the top of this file.
   - When using Base UI Button with `render={<Link href="..." />} `, always pass `nativeButton={false}` to prevent nested interactive element warnings.
3. **Accessibility**:
   - Provide descriptive `aria-label`s on search inputs, icon buttons, and interactive chips.
   - Use semantic HTML: `<header>`, `<main>`, `<section>`, `<nav>`.
4. **Responsive Strategy**:
   - Mobile-first layout with smooth fluid transitions to tablet and desktop screens (`sm:`, `md:`, `lg:`).
