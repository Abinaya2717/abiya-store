# Design Brief: Abiya

## Purpose
Premium e-commerce platform for fashion, accessories, and electronics. Trust, clarity, and visual sophistication drive every decision. Blue theme conveys professionalism and confidence; minimal decoration prioritizes product discovery and checkout flow.

## Tone
Refined, accessible luxury. Not austere, not playful. Every detail signals quality—thoughtful spacing, intentional color contrast, refined typography.

## Differentiation
**Blue-first palette** with strategic accent usage on CTAs and hover states. **Layered depth** via borders and elevation rather than blur-based shadows. **Geometric typography** (Space Grotesk) paired with humanistic body font (General Sans) for warmth and approachability.

## Color Palette

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| **Primary** | oklch(0.55 0.15 255) | oklch(0.68 0.16 255) | Buttons, links, active states |
| **Secondary** | oklch(0.35 0.02 265) | oklch(0.28 0.02 265) | Sidebar, dark accents |
| **Accent** | oklch(0.62 0.18 260) | oklch(0.72 0.19 260) | Highlights, focus rings |
| **Destructive** | oklch(0.55 0.22 25) | oklch(0.65 0.19 22) | Delete, cancel, warnings |
| **Background** | oklch(0.99 0.01 75) | oklch(0.12 0.01 265) | Page background |
| **Foreground** | oklch(0.25 0.01 265) | oklch(0.95 0.01 280) | Body text, contrast |
| **Muted** | oklch(0.93 0.01 280) | oklch(0.22 0.01 265) | Secondary text, disabled |
| **Border** | oklch(0.92 0.01 280) | oklch(0.28 0.01 265) | Card borders, dividers |

## Typography
- **Display**: Space Grotesk (geometric, modern) — page headers, section titles
- **Body**: General Sans (humanistic, clean) — product descriptions, form labels, body copy
- **Mono**: Geist Mono — SKU codes, price details, technical copy

## Structural Zones

| Zone | Light | Dark | Purpose |
|------|-------|------|---------|
| **Header** | bg-card, border-b border-border | bg-card, border-b border-border | Navigation, logo, search, auth |
| **Sidebar** | bg-sidebar, border-r border-sidebar-border | bg-sidebar, border-r border-sidebar-border | Category filters, facets |
| **Main Content** | bg-background | bg-background | Product grid, checkout |
| **Card (Product)** | bg-card, border border-border, shadow-sm | bg-card, border border-border, shadow-sm | Product item, order card |
| **Footer** | bg-muted/50, border-t border-border | bg-muted/50, border-t border-border | Info, links, newsletter |

## Spacing & Rhythm
- **Density**: Comfortable spacing (16px gutters, 24px vertical rhythm) reduces cognitive load during browsing
- **Rhythm**: Alternating card/grid layouts for visual flow; consistent padding within cards (1rem)

## Component Patterns
- **Buttons**: Primary (solid blue), Secondary (outline), Ghost (transparent text). Rounded corners (8px), no shadows.
- **Cards**: Bordered with 1px border-border, subtle shadow-sm on hover, max 4px lift
- **Forms**: Input bg-input, border-border, focus:ring-2 ring-accent
- **Links**: text-primary, underline on hover, no color change

## Motion & Interaction
- **Transition**: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) — smooth, intentional
- **Hover**: Button opacity -10%, card shadow-sm → shadow-md
- **Focus**: ring-2 ring-accent on keyboard navigation

## Constraints
- No gradient backgrounds (depth via layers, not color gradients)
- No animated page elements on scroll (focus on content)
- Dark mode available; defaults to light mode preference

## Signature Detail
**Blue authority through careful accent placement**: Primary blue (#0F5FC4 equiv.) used ONLY on interactive elements—never on passive text or backgrounds. Creates visual hierarchy and trains users where to click without overwhelming the interface.
