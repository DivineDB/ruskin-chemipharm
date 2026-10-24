# Ruskin Chemipharm Project - Agent Guidelines & System Prompt

## Framework & Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React (`lucide-react`)
- **Animation**: Framer Motion (`framer-motion`)

## Design System & Design Tokens (Ruskin Chemipharm)

- **Background / Canvas**:
  - Primary Dark: Deep Navy `#0B1E2E` / `#071521`
  - Primary Light: Pure White `#FFFFFF` / Warm Cream `#FAF7F2`
- **Brand Identity**:
  - Primary Brand Navy: `#12304A`
  - Signature Warm Gold: `#C79A4B` (Hover: `#B58A3E`, Light Tint: `#E5C378`)
- **Typography & Text Colors**:
  - Light Backgrounds: Headings `#12304A`, Body `#5A7A8E`, Muted `#94A3B8`
  - Dark Backgrounds: Headings `#FFFFFF`, Body `#CBD5E1` (Slate-300), Muted `#94A3B8` (Slate-400)
- **Cards / Surfaces**:
  - Glassmorphic dark surfaces: `rgba(255, 255, 255, 0.05)` with `1px solid rgba(255, 255, 255, 0.1)`
  - Rounded corners: `rounded-[24px]` to `rounded-[28px]`
  - Photo Bento Cards: Gradient vignette anchored to bottom ~40% (`from-[#071521] via-[#071521]/70 via-42% to-transparent`) so the top ~60% of the image remains bright, natural, and visible.

## Section Header Design System (MANDATORY RULE)

Every major content section must adhere to the standardized 4-part header stack:

```tsx
<div className="space-y-3 text-left">
  {/* 1. Category Eyebrow with Gold Prefix Line */}
  <span className="inline-flex items-center gap-2 text-[#C79A4B] text-sm font-bold tracking-widest uppercase">
    <div className="w-8 h-[2px] bg-[#C79A4B]" />
    Section Category Name
    {/* If centered: add trailing <div className="w-8 h-[2px] bg-[#C79A4B]" /> */}
  </span>

  {/* 2. Main Heading with Gold Span Highlight */}
  <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#12304A] leading-tight tracking-tight">
    Lead Heading Text <span className="text-[#C79A4B]">Gold Highlight Phrase</span>
  </h2>

  {/* 3. SIGNATURE GOLD ACCENT BAR (CRITICAL: NEVER OMIT) */}
  <div className="w-16 h-[3px] rounded-full bg-[#C79A4B]" />
  {/* If centered: add mx-auto */}

  {/* 4. Descriptive Subtitle */}
  <p className="text-base text-[#5A7A8E] font-normal max-w-2xl lg:max-w-4xl leading-relaxed">
    Concise description expanding on the section scope.
  </p>
</div>
```

### Signature Accent Bar Guidelines:
- **Never remove** the `<div className="w-16 h-[3px] rounded-full bg-[#C79A4B]" />` bar from section headers. It is a signature visual anchor unifying the Ruskin Chemipharm design system.
- Always position it immediately below the `<h2>` and before the `<p>` description.
- For centered headers (e.g. Product Range, Global Reach), append `mx-auto` to the bar and center the eyebrow lines.

## Standing Instructions

- Project is UI-driven via Figma MCP integration.
- Keep code clean, modular, and fully typed in TypeScript.
- Mobile-first responsive layout using Tailwind CSS.
- Ensure premium visual aesthetics with smooth gradients and glassmorphism.
- **Brand History**: Founding year must always be **1984** (`Est. 1984`, `Founded in 1984`, `40+ Years Experience`).
- **Brand Geometry**: Use `HexIcon` (`<HexIcon size={...} bg="#C79A4B">`) for checkmarks, badges, and icon containers.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
