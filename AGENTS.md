# Ruskin Chemipharm Project - Agent Guidelines & System Prompt

## Framework & Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React (`lucide-react`)
- **Animation**: Framer Motion (`framer-motion`)

## Design System & Design Tokens (Ruskin Chemipharm)

- **Background / Canvas**: Deep Navy `#12304A`
- **Brand Accent**: Warm Gold `#C79A4B`
- **Cards / Surfaces**: Dark Glassmorphism `rgba(255, 255, 255, 0.05)` with border `1px solid rgba(255, 255, 255, 0.1)`
- **Typography & Text Colors**:
  - Headings: `#FFFFFF`
  - Body Text: `#CBD5E1` (Slate-300)
  - Muted Text: `#94A3B8` (Slate-400)

## Standing Instructions

- Project is UI-driven via Figma MCP integration.
- Keep code clean, modular, and fully typed in TypeScript.
- Mobile-first responsive layout using Tailwind CSS.
- Ensure premium visual aesthetics with smooth gradients and glassmorphism.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
