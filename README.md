# Qoves Frontend

Marketing landing page for the Qoves facial analysis platform, built with Next.js 16 App Router.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2.6 (App Router) |
| Language | TypeScript 5 |
| Styling | SCSS Modules (`src/styles/` variables + mixins) |
| Animation | GSAP 3 + ScrollTrigger |
| Charts | Recharts 3 |
| React | 19.2.4 |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, global styles
│   ├── page.tsx            # Page composition (section order)
│   └── globals.scss
├── components/
│   ├── sections/
│   │   ├── HeroSection/    # Hero with GSAP step animations + MotionPath
│   │   ├── FacialAnalysis/ # Analysis UI: dot grid, bell curve, melanin bar, symmetry, facial thirds
│   │   ├── FAQ/            # Accordion FAQ
│   │   └── Philosophy/     # Sticky video background, insecurity + consider sections
│   └── ui/
│       └── BeforeAfterSlider/
└── styles/
    ├── _variables.scss     # Color, font, breakpoint tokens
    └── _mixins.scss        # container, respond(), label helpers
```

## Sections

### HeroSection
Animated hero with a 4-step process list. GSAP ScrollTrigger drives step highlighting; MotionPathPlugin handles any path-based animations.

### FacialAnalysis
Static data visualization panel showing what a Qoves report looks like:
- **Dot grid** — 10×10 quad grid, hover-activated quadrant highlight
- **Bell curve** — Recharts `ComposedChart` with shaded tail and reference dot marking user position
- **Melanin bar** — Gradient color scale with floating label and "You" indicator
- **Symmetry panel** — Horizontal reference lines (Ideal / You / Average)
- **Facial Thirds** — Three-column horizontal bar chart
- **Lip smoothness** — Linear track with percentage indicator

All panels animate in on scroll (GSAP `from` with `x`/`y` + `opacity`).

### FAQ
Accordion-style FAQ section.

### Philosophy
Two-part section over a sticky looping video background:

- **Insecurity** — "Will analyzing my face make me insecure?" heading + three lifestyle/cultural/genetic factor cards
- **Consider** — Centered heading text slides up on scroll; left and right glass cards slide in from opposite sides

A single `backdrop-filter` overlay (gradient mask) spans both sub-sections to produce seamless progressive blur over the video without a visible seam.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

## Key Conventions

- **SCSS Modules** — every component has a co-located `.module.scss`; shared tokens live in `src/styles/`
- **`@include container`** — standard max-width + horizontal padding mixin used for all content widths
- **`@include respond(md)`** — breakpoint mixin for responsive overrides
- **No `overflow: hidden` on sticky parents** — Chrome breaks `backdrop-filter` compositing when a sticky ancestor has `overflow: hidden`
- **GSAP context** — all ScrollTrigger animations are scoped with `gsap.context()` and cleaned up on unmount via `ctx.revert()`
