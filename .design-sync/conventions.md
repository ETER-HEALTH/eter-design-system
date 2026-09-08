# ETER Design System — Usage Conventions

ETER is a healthcare-focused React component library. Named exports come from `@eter/design-system` (or `window.EterDesignSystem.*` in design-sync previews).

**SSOT for token values:** `src/design-tokens.ts`. Do not invent hexes here — document the CSS variable names and point at that file.

## Styling

**Tokens** — colors, radii, spacing, and shadows are exposed as CSS custom properties. Always reference them with `var()`:

```css
/* Brand primitives (from design-tokens.ts → primitives) */
--eter-purple-500: #a20eff;   /* brand primary solid */
--eter-purple-600: #8a0cdb;   /* primary hover */
--eter-purple-700: #710ab7;   /* primary active */
--eter-lime-500: #c1e328;     /* AI / insight accent */

/* Semantic (theme.css / semantic.light|dark) — prefer these in UI */
--eter-primary: var(--eter-purple-500);
--eter-primary-hover: var(--eter-purple-600);
--eter-primary-active: var(--eter-purple-700);
--eter-primary-foreground: #ffffff;
--accent-lime: var(--eter-lime-500);

--background / --foreground / --card / --muted-foreground / --border / --input / --ring
--success / --warning / --info / --critical   /* clinical states */
--destructive                                 /* delete actions — not clinical critical */
```

**Utility classes** — components are built with Tailwind. Compile utilities in the consuming app (or a flat CSS bundle for design-sync); this package ships source + token CSS, not a full Tailwind dist.

**Fonts** — Inter for UI text; IBM Plex Mono for data/values.

## No Provider Required

Components work standalone. No `ThemeProvider` or `DesignSystemProvider` is required.

## Component Groups

### Actions
- **Button** — `variant`: `primary | secondary | accent | outline | ghost | destructive`. `size`: `sm | md | lg`. Accepts `leftIcon`/`rightIcon` and `isLoading`.

### Feedback
- **Alert** — `variant`: `info | success | warning | error | clinical-warning | ai-suggestion`. Accepts `title`, `description`, `onAction` / `actionLabel`, `onDismiss`.
- **Badge** — `variant`: `neutral | primary | accent | success | warning | error | ai-insight`. `size`: `sm | md`. Optional `dot`.
- **EmptyState** — `icon`, `title`, `description`, `primaryAction` / `secondaryAction`.

### Data Display
- **DataTable** — `columns`, `data`, `loading`, `selectable`, `onRowSelect`.
- **ClinicalMetricCard** — `label`, `value`, `unit`, `status`: `normal | abnormal | critical | improving | ai-insight`, `trend`: `up | down | stable`.

### Forms
- **Input** / **Select** / **Textarea** — `label`, helper/error text, `state`: `default | success | error | disabled`.

### Layout
- **Card** (+ Header/Title/Description/Footer) — `variant`: `default | elevated | clinical | insight`.
- **Modal** — `open`, `onClose`, `size`: `sm | md | lg`, `variant`: `default | destructive`.
- **PageHeader** — title, description, eyebrow, breadcrumbs, actions, tabs.

### Navigation
- **SidebarNavigation** — items, sections, collapse, user block.
- **Tabs** — `variant`: `underline | pill | segmented`.

### Clinical
- **PatientHeader** — patient identity + status-derived badge.

## Clinical Color Semantics

Use semantic tokens, not raw Tailwind palette colors:

| Meaning | Token |
| --- | --- |
| active / normal | `--success` |
| critical (patient) | `--critical` |
| scheduled | `--eter-primary` |
| abnormal / warning | `--warning` |
| discharged / inactive | `--muted-foreground` |
| AI / insight | `--accent-lime` |
| delete action | `--destructive` (not `--critical`) |

## Brand Assets

Source of truth: `src/assets/logos/`.

- `eter-logo.svg` / `eter-logo-white.svg` — lockup (isotype + wordmark)
- `eter-wordmark.svg` / `-white` — wordmark only
- `eter-isotype.svg` / `-white` — mark for favicon/avatar/collapsed nav
- `eter-favicon.svg` — square canvas for favicons only

Rules: isotype always `#a20eff` (`--eter-purple-500` / `--eter-primary`) or white; wordmark black on light, white on dark. Min width 120px (lockup) / 24px (isotype). Clear space = one isotype height. No rotation, distortion, shadows, or CSS filters on dark — swap to `-white` assets.
