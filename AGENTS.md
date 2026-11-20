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
- Authenticated Session State:
  - Integrated with Better-Auth `useSession()` and `signOut()`.
  - When signed in, renders user profile card with user name, initial avatar circle, styled role badge pill (e.g. `SEEKER`, `RECRUITER`, `ADMIN`), and an interactive Sign Out button with `LogOut` icon.
  - Matches Figma `Seeker / Dashboard` and `Recruiter / Dashboard` top bar profile widget specification.
  - Fully responsive: mobile sheet drawer (`components/ui/sheet.tsx`) surfaces dedicated user profile header and mobile Sign Out button.
- Unauthenticated State:
  - Action triggers: "Sign In" link (`text-brand-light`), "Get Started" CTA button (`bg-brand`).

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
- **Atmospheric Globe & Trust Stat Cards (`Group 1` & `Frame 2147234448`)**:
  - Atmospheric curved blue globe (`app/images/globe.png`) centered in the background with layer positioning aligned to the content crest.
  - Heading across the globe: `"Assisting over 15,000 job seekers find their dream positions."` (`font-manrope text-2xl sm:text-3xl lg:text-[40px] text-white/90 text-center max-w-[620px]`).
  - 4 Stat Cards in a responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`):
    1. `50K` / `Active Jobs` with job search briefcase icon.
    2. `12K` / `Companies` with vertical bar chart icon.
    3. `2M` / `Job Seekers` with user search target icon.
    4. `97%` / `Satisfication Rate` with star outline icon.
  - Card styling: 16px corner radius (`rounded-2xl`), linear dark gradient background (`from-[#111115] via-[#0b0b0e] to-[#050507]`), 1px subtle stroke (`border-white/10`), 24px padding (`p-6 sm:p-7`), and 56px bold numbers.

### 3.3 Authentication Pages (`app/(auth)/sign-in/page.tsx` & `app/(auth)/sign-up/page.tsx`)
Designed to match the dark atmospheric space theme and Figma design tokens:
- **Atmospheric Background & Branding**:
  - Near-black `#010103` canvas with soft radial ambient glow (purple `#5c53fe` / magenta `#dc02ce` at top).
  - Centered navigation header with `HireLoop` logo (`app/images/logo.png`) and "Back to Home" link.
- **Dual Form Mode Toggle Tab**:
  - Top segmented tab toggle (`[ Sign In ]` / `[ Create Account ]`) allowing swift navigation between auth flows.
- **Role Selection Toggle (`Job Seeker`, `Recruiter`, `Admin`)**:
  - Interactive 3-way segmented role toggle with icons (`Briefcase` for Job Seeker, `Building2` for Recruiter, `ShieldCheck` for Admin).
  - Controls account type and adapts form labels, placeholders, and action buttons dynamically.
- **OAuth & Divider**:
  - Branded Google OAuth button ("Continue with Google" / "Sign up with Google") ready for Better-Auth client integration.
  - Centered "or continue with email" / "or register with email" divider.
- **Form Controls & Interactive Toggles**:
  - Email, name, password, and confirm password fields with Lucide icons (`Mail`, `Lock`, `User`, `Building2`, `ShieldCheck`).
  - Password visibility toggle (`Eye` / `EyeOff`) on all password inputs.
  - "Remember me on this device" checkbox toggle on Sign In.
  - "Terms of Service and Privacy Policy" agreement toggle on Sign Up with validation.
- **Better-Auth & MongoDB Integration (`lib/auth.ts`, `lib/auth-client.ts`, `app/api/auth/[...all]/route.ts`)**:
  - Connected Better-Auth server to MongoDB via `BETTER_AUTH_DB_URI` (`mongodb+srv://...`) and `@better-auth/mongo-adapter`.
  - Configured `hireloopdb` database with global client caching in development to prevent duplicate connection instances.
  - Added custom `user.additionalFields` schema supporting `role: { type: ["seeker", "recruiter", "employer", "admin"], defaultValue: "seeker", input: true, returned: true }`.
  - Configured typed client with `inferAdditionalFields<typeof auth>()`.
  - Connected `app/(auth)/sign-up/page.tsx` directly to `authClient.signUp.email`, passing selected `role` (`seeker`, `recruiter`, or `admin`), loading state spinner, error display alerts, success confirmation, and redirect to home.
  - Connected `app/(auth)/sign-in/page.tsx` directly to `authClient.signIn.email`, including credential authentication against MongoDB, rememberMe persistence, error alerts, loading state spinner, and redirect to home.
  - Both auth pages check active session via `useSession()` and automatically redirect authenticated users to the home page (`/`).

### 3.4 Brand Marquee (`components/brand-marquee.tsx`)
- Continuous animated marquee showcasing verified logos (`public/logos/`) for 12 global leaders (Google, Meta, Apple, Amazon, Netflix, Nvidia, Microsoft, Uber, Airbnb, Spotify, Adobe, Tesla).
- Smooth infinite CSS scroll (`@keyframes marquee`) with hover-pause, edge gradient fade masks (`[mask-image:linear-gradient(...)]`), and grayscale-to-color brightness transitions.

### 3.5 Featured Jobs (`components/featured-jobs.tsx`)
- Hand-picked opportunities grid matching dark space tokens with category filter chips (All, Engineering, Design, Product, AI).
- Job cards featuring company logos, location tags, salary ranges in Space Mono, interactive bookmark save states, and "Apply" triggers.
- Direct link to full job exploration (`/jobs`).

### 3.6 Platform Features (`components/features-section.tsx`)
- Animated via Framer Motion following `hireloop-resources/Framer-Motion-guide.md` (`fadeInUp`, `staggerContainer`, `whileInView`, `whileHover={{ y: -4 }}`).
- Showcases the 4 core platform capabilities:
  1. Smart Search & Filters
  2. Salary & Compensation Insights
  3. Top Verified Companies
  4. Saved Jobs & Pipeline Tracker

### 3.7 Call to Action (`components/cta-section.tsx`)
- High-impact curved wireframe background using `app/images/cta-bg.png` and radial purple/magenta ambient glow.
- Dual action triggers: "Browse All Jobs" (`/jobs`) and "Post a Job Free" (`/sign-up?role=recruiter`).
- Trust badges verifying free tier inclusion, recruiter vetting, and instant job alerts.

### 3.8 Footer (`components/footer.tsx`)
- Semantic footer with HireLoop branding and live pulsing system status ("All Systems Operational").
- Role-specific navigation columns for Job Seekers, Employers, and Company/Legal.

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
