# Ruskin Chemipharm — Design System Specification

> **Version**: 1.0.0  
> **Status**: Official Reference  
> **Purpose**: This document codifies the design principles, color tokens, typography scales, component blueprints, and micro-interaction standards for Ruskin Chemipharm's web ecosystem to guarantee long-term visual harmony, accessibility, and high-end brand consistency.

---

## 1. Brand Philosophy & Aesthetic Foundations

Ruskin Chemipharm operates at the intersection of precision pharmaceutical manufacturing, global chemical sourcing, and regulatory excellence. The digital experience reflects:

- **Swiss-Precision Clinical Authority**: Legible, structured, and informative. High density of technical specifications (CAS, Pharmacopoeial grades, USDMF/CEP status) delivered with clean hierarchy.
- **Matte Luxury & Restraint**: Deep nautical navies, warm off-white cream backdrops, and subtle champagne gold accents. We deliberately avoid cheap "cyberpunk" glows, neon halos, or gimmicky gradients.
- **Micro-Interaction Polish**: Interfaces feel responsive and tactile with spring physics, purposeful loading states, and non-blocking navigational transitions.

---

## 2. Color Palette & Token System

All color tokens must be maintained across Tailwind classes and custom CSS variables.

### Primary Palette (Dark Luxury & Foundations)

| Token Name | Hex Code | Tailwind Equivalent / Usage | Context |
|---|---|---|---|
| **Abyss / Deep Dark** | `#071521` | `bg-[#071521]` | Deepest background layer, footer base, contrast containers |
| **Corporate Navy** | `#0B1E2E` | `bg-[#0B1E2E]` | Primary card background for dark-mode components & service cards |
| **Signature Navy** | `#12304A` | `bg-[#12304A]` / `text-[#12304A]` | Primary brand color, headers, dark buttons, text accents |
| **Warm Sand / Cream** | `#FAF7F2` | `bg-[#FAF7F2]` | Light-theme page backgrounds, modal form field wells, bento contrast |
| **Crisp White** | `#FFFFFF` | `bg-white` / `text-white` | Pure surface layers, light card containers |

### Accent Palette (Precious Metals & Status)

| Token Name | Hex Code | Tailwind Equivalent / Usage | Context |
|---|---|---|---|
| **Ruskin Gold (Primary)** | `#C79A4B` | `text-[#C79A4B]` / `bg-[#C79A4B]` | Primary brand accent, CTA buttons, active state indicators |
| **Ruskin Gold (Hover)** | `#B58A3E` | `hover:bg-[#B58A3E]` | Hover state for gold buttons and interactive badges |
| **Champagne Gold (Muted)**| `#E5C378` | `text-[#E5C378]` / `bg-[#C79A4B]/15` | Category badges, subtle borders, subheaders on dark navy |
| **Clinical Emerald** | `#059669` | `text-emerald-600` / `bg-emerald-500` | Verified DMF status, COA copied feedback, SLA compliance |

### Neutral & Slate Typography Scale

| Token Name | Hex Code | Usage |
|---|---|---|
| **Text Primary (Dark UI)** | `#F3F7FA` | Primary headings and labels on navy/abyss surfaces |
| **Text Primary (Light UI)**| `#12304A` | Primary headings and titles on white/cream surfaces |
| **Text Secondary** | `#5A7A8E` | Descriptive copy, subtitles, secondary metadata |
| **Text Muted / Placeholder**| `#7A93A8` / `#B0C4D4`| Input placeholders, disabled text, fine print disclaimer |
| **Hairline Dividers** | `rgba(255, 255, 255, 0.1)` | Subtle card borders on dark mode |
| **Hairline Dividers (Light)**| `rgba(18, 48, 74, 0.08)` | Dividers and table rows on light surfaces |

---

## 3. Typography Hierarchy

We utilize **Plus Jakarta Sans** for primary human-interface typography and **Inter** for technical/tabular data.

- **Display 1 (Hero Title)**: `text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08]`
- **Section Heading (H2)**: `text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#12304A]`
- **Card Heading (H3)**: `text-xl sm:text-2xl font-bold tracking-tight text-[#12304A]` or `text-white`
- **Section Eyebrow**: `text-xs uppercase font-extrabold tracking-widest text-[#C79A4B]` accompanied by a `w-8 h-[2px] bg-[#C79A4B]` accent rule.
- **Body Regular**: `text-sm sm:text-base text-[#5A7A8E] leading-relaxed`
- **Technical / Monospace**: `font-mono text-xs sm:text-sm font-semibold` (used for CAS numbers, batch lot codes).
- **Micro Badge**: `text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wide px-2.5 py-0.5 rounded-full`

---

## 4. Geometric Motifs & Visual Language

### The Benzene Hexagon
To symbolize pharmaceutical chemistry, hexagonal geometry is used for step badges, icon backgrounds, and regulatory seals.
```css
/* Hexagonal clip-path standard */
clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
```

### Corner Radii Guidelines
- Large containers & Hero Bento blocks: `rounded-[32px]` or `rounded-[36px]`
- Cards, Modals & Drawers: `rounded-3xl` (`24px`) or `rounded-2xl` (`16px`)
- Buttons & Badges: Pill shape `rounded-full`
- Form Input fields: `rounded-xl` (`12px`)

### Surface Glassmorphism
Navbar, sticky bars, and modal backdrops utilize:
```html
bg-white/90 backdrop-blur-md border border-white/20 shadow-sm
```
Dark surface backdrop:
```html
bg-[#0B1E2E]/80 backdrop-blur-md border border-white/10
```

---

## 5. Component Standards

### 5.1 Navbar (`src/app/components/Navbar.tsx`)
- **Container**: Floating frosted capsule (`rounded-full`) fixed at `top-4` with z-index `z-50`.
- **Active Tab Underline**: Utilizes Framer Motion's `layoutId="navbar-active-underline"` inside `link.active`.
  - Spring transition: `{ type: "spring", stiffness: 420, damping: 34 }`
  - Position: Decoupled from mouse hover events to prevent jitter and double-shifting.
- **Search Trigger**: Minimalist 40px circular icon button (`w-10 h-10 rounded-full`) with search icon. Perfectly matches the height of the primary "Request Quote" CTA pill without visual clutter, label collision, or raw keyboard shortcut glyphs.

### 5.2 Service Cards (`src/app/page.tsx` & `.service-card`)
- **Theme**: Matte luxury navy (`bg-[#0B1E2E]`) with crisp white hairline borders (`border-white/15`).
- **Strict Rule**: **No colored gold drop-shadows or outer gold glow rings.** Active/hover cards elevate with natural depth (`shadow-2xl`, `border-white/25`), not fluorescent glows.

### 5.3 Product & Catalog Cards (`src/app/products/page.tsx`)
- Cards present CAS Number, Grade, and DMF status prominently.
- Instant copyable CAS button with spring icon swap (`Copy` -> `Check` "Copied!").
- Action button triggers technical dossier modal.

### 5.4 Modals & Dialogs
- **Scroll Lock**: Whenever a modal opens, `document.body.style.overflow = "hidden"` is locked. Reverts to `"unset"` upon unmount.
- **Backdrop**: `bg-[#12304A]/30 backdrop-blur-[2px]` dismissible on click or via `Escape` key.
- **Opening Animation**:
  ```tsx
  initial={{ opacity: 0, scale: 0.92, y: 18 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.94, y: 12 }}
  transition={{ type: "spring", damping: 26, stiffness: 380 }}
  ```
- **Form Submission Flow**:
  1. *Submitting State*: Button shows `<Loader2 className="animate-spin" />` with feedback message (e.g., `"Transmitting Dossier Request..."`).
  2. *Success State*: Smooth transition to confirmation card with spring checkmark bounce:
     ```tsx
     <motion.div
       initial={{ scale: 0, rotate: -25 }}
       animate={{ scale: [0, 1.25, 1], rotate: [-25, 5, 0] }}
       transition={{ duration: 0.52, ease: "easeOut" }}
     >
     ```

### 5.5 Form Inputs & Custom Select (`src/app/components/CustomSelect.tsx`)
- Standard input classes:
  ```html
  w-full bg-[#FAF7F2] border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-[#12304A] text-xs placeholder-[#B0C4D4] focus:outline-none transition-colors
  ```
- Dropdowns must use the unified `CustomSelect` component (supporting both `light` and `dark` variants) to prevent operating system default select UI breakage.

---

## 6. Animation & Micro-Interaction Tokens

| Motion Type | Library | Settings / Parameters |
|---|---|---|
| **Modal Spring** | Framer Motion | `type: "spring", damping: 26, stiffness: 380` |
| **Card Hover** | Framer Motion | `whileHover={{ y: -4 }} transition={{ duration: 0.2 }}` |
| **Button Tap** | Framer Motion | `whileTap={{ scale: 0.97 }}` |
| **Active Underline** | Framer Motion | `layoutId="navbar-active-underline"` `stiffness: 420, damping: 34` |
| **Checkmark Entry** | Framer Motion | `scale: [0, 1.25, 1], rotate: [-25, 5, 0], duration: 0.52s` |
| **Continuous Marquee**| Framer Motion | `repeat: Infinity, ease: "linear", duration: 32s` |

---

## 7. Strict Anti-Patterns & "Don'ts"

1. **NO Neon Halos or Drop-Shadow Glows**: Never apply colored blur shadows (e.g. `rgba(199,154,75,0.4)` or `ring-[#C79A4B]`) around cards. Use border lightening (`border-white/25`) and neutral black shadows (`shadow-2xl`).
2. **NO Layout-Jittering Navbars**: Never bind layout indicator positions directly to mouse coordinate offsets (`offsetLeft` / `clientWidth`) on `mouseenter` without decoupling the persistent active route indicator.
3. **NO Unlocked Body Scroll in Modals**: Never allow the page behind an open modal to scroll or intercept wheel events.
4. **NO Default OS Select Pickers**: Never place unstyled `<select>` elements in public-facing marketing or quotation pages. Always use `<CustomSelect />`.
5. **NO Abrupt State Cuts**: Forms must never transition immediately to blank screens or un-animated alerts. Always show a micro-loading state (500–700ms) followed by spring-animated confirmation cards.
