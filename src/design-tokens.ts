// ETER Design System — Design Tokens
// Healthcare Technology Platform
//
// SSOT de tokens para ETER: este paquete (`@eter/design-system`).
//
//  - `primitives`: valores de marca invariantes (púrpura, lima, neutros). La fuente de verdad es
//    este paquete; las apps los consumen o copian desde aquí.
//  - `semantic`: paleta claro/oscuro (superficies, texto, bordes, estados clínicos, gráficas).
//    La fuente de verdad es también este paquete (`design-tokens.ts` + `styles/theme.css`).
//    Las apps (p. ej. Interfazdelmedico) importan o alinean su CSS a estos valores — no al revés.
//    Se valida contra WCAG 2.1 AA en ambos temas; los umbrales en vigor están en `contrast`.
//
// Los valores `color-mix(...)` son fórmulas, no hex: se derivan del propio primario/acento
// mezclado contra la superficie del tema, así que re-resuelven solos al invertir el tema y
// siguen al primario que una organización configure en runtime.

export const primitives = {
  // Brand primitives
  "eter-purple-50": "#f5e6ff",
  "eter-purple-100": "#e8ccff",
  "eter-purple-200": "#d199ff",
  "eter-purple-300": "#b966ff",
  "eter-purple-400": "#b033ff",
  "eter-purple-500": "#a20eff",
  "eter-purple-600": "#8a0cdb",
  "eter-purple-700": "#710ab7",
  "eter-purple-800": "#590893",
  "eter-purple-900": "#40066f",

  "eter-lime-50": "#f7fbcc",
  "eter-lime-100": "#eef699",
  "eter-lime-200": "#ddf066",
  "eter-lime-300": "#cce833",
  "eter-lime-400": "#c4e62e",
  "eter-lime-500": "#c1e328",
  "eter-lime-600": "#a8c820",
  "eter-lime-700": "#8fad18",
  "eter-lime-800": "#769210",
  "eter-lime-900": "#5d7708",

  // Neutral scale — hex fijos: valores de marca invariantes, nunca superficies ni texto de
  // interfaz (para eso están los tokens semánticos, que siguen al tema).
  "neutral-0": "#ffffff",
  "neutral-50": "#fafafa",
  "neutral-100": "#f7f7f7",
  "neutral-200": "#e1e1e1",
  "neutral-300": "#c8c8c8",
  "neutral-400": "#aaaaaa",
  "neutral-500": "#777777",
  "neutral-600": "#555555",
  "neutral-700": "#333333",
  "neutral-800": "#1a1a1a",
  "neutral-900": "#000000",
} as const;

/**
 * Paleta semántica por tema. Claves = nombres de las variables CSS de `styles/theme.css`
 * (sin `--`). `dark` sólo lista lo que se redefine: las primitivas de marca, el par sólido del
 * lima (relleno de marca → texto congelado) y las fórmulas `color-mix` que re-resuelven solas
 * contra las superficies oscuras no aparecen.
 */
export const semantic = {
  light: {
    // Superficies. Página gris muy claro; tarjeta y popover blancos — en claro la elevación la
    // dan sombra y borde.
    background: "oklch(0.985 0 0)",
    foreground: "oklch(0.145 0 0)",
    card: "#ffffff",
    "card-foreground": "oklch(0.145 0 0)",
    popover: "#ffffff",
    "popover-foreground": "oklch(0.145 0 0)",
    "surface-overlay": "rgba(0, 0, 0, 0.48)",

    secondary: "oklch(0.95 0.0058 264.53)",
    "secondary-foreground": "#030213",
    muted: "#ececf0",
    // 4.5:1 sobre página, tarjeta y fondo tenue — manda el peor caso.
    "muted-foreground": "oklch(0.5 0.015 285)",
    accent: "#e9ebef",
    "accent-foreground": "#030213",

    // Acción de borrar — no es un estado clínico (para eso está `critical`).
    destructive: "#d4183d",
    "destructive-foreground": "#ffffff",

    // `border` es decorativo; `input` es el borde de controles de formulario (WCAG 1.4.11,
    // 3:1 contra el relleno del campo y contra la superficie). `ring` es el anillo de foco (3:1).
    border: "oklch(0.89 0 0)",
    input: "oklch(0.62 0 0)",
    "input-background": "#f3f3f5",
    "switch-background": "oklch(0.65 0 0)",
    ring: "oklch(0.55 0 0)",

    // Marca: sólido + tenue derivado con color-mix contra la superficie del tema.
    "eter-primary": "var(--eter-purple-500)",
    "eter-primary-hover": "var(--eter-purple-600)",
    "eter-primary-active": "var(--eter-purple-700)",
    "eter-primary-foreground": "#ffffff",
    "eter-primary-subtle": "color-mix(in oklab, var(--eter-primary) 15%, var(--card))",
    "eter-primary-border": "color-mix(in oklab, var(--eter-primary) 42%, var(--card))",
    "eter-primary-subtle-foreground": "color-mix(in oklab, var(--eter-primary) 76%, var(--foreground))",

    // Acento lima (IA/insight). El par sólido está congelado (relleno de marca invariante →
    // texto invariante); el tenue sí sigue al tema vía color-mix.
    "accent-lime": "var(--eter-lime-500)",
    "accent-lime-foreground": "oklch(0.145 0 0)",
    "accent-lime-subtle": "color-mix(in oklab, var(--accent-lime) 18%, var(--card))",
    "accent-lime-border": "color-mix(in oklab, var(--accent-lime) 82%, var(--foreground))",
    "accent-lime-subtle-foreground": "color-mix(in oklab, var(--accent-lime) 35%, var(--foreground))",

    // Estados clínicos: sólido (`x` + `x-foreground`) y tenue (`x-subtle` + su foreground +
    // `x-border`). La tenue sustituye al patrón `-50`/`-700`.
    success: "oklch(0.52 0.13 155)",
    "success-foreground": "oklch(1 0 0)",
    "success-subtle": "oklch(0.95 0.04 155)",
    "success-subtle-foreground": "oklch(0.4 0.11 155)",
    "success-border": "oklch(0.8 0.09 155)",

    warning: "oklch(0.55 0.13 70)",
    "warning-foreground": "oklch(1 0 0)",
    "warning-subtle": "oklch(0.96 0.04 85)",
    "warning-subtle-foreground": "oklch(0.42 0.1 65)",
    "warning-border": "oklch(0.82 0.1 80)",

    info: "oklch(0.52 0.16 250)",
    "info-foreground": "oklch(1 0 0)",
    "info-subtle": "oklch(0.96 0.03 250)",
    "info-subtle-foreground": "oklch(0.42 0.14 250)",
    "info-border": "oklch(0.82 0.08 250)",

    critical: "oklch(0.52 0.2 25)",
    "critical-foreground": "oklch(1 0 0)",
    "critical-subtle": "oklch(0.96 0.02 25)",
    "critical-subtle-foreground": "oklch(0.44 0.18 25)",
    "critical-border": "oklch(0.82 0.09 25)",

    // Barra lateral
    sidebar: "oklch(0.985 0 0)",
    "sidebar-foreground": "oklch(0.145 0 0)",
    "sidebar-primary": "var(--eter-primary)",
    "sidebar-primary-foreground": "#ffffff",
    "sidebar-accent": "oklch(0.97 0 0)",
    "sidebar-accent-foreground": "oklch(0.205 0 0)",
    "sidebar-border": "oklch(0.922 0 0)",
    "sidebar-ring": "oklch(0.55 0 0)",

    // Series de gráfica: 3:1 contra tarjeta, separadas en matiz (daltonismo).
    "chart-1": "oklch(0.55 0.2 264)",
    "chart-2": "oklch(0.52 0.13 165)",
    "chart-3": "oklch(0.53 0.2 25)",
    "chart-4": "oklch(0.55 0.17 305)",
    "chart-5": "oklch(0.52 0.12 75)",
  },

  dark: {
    // Escalera de superficies: página < barra lateral < tarjeta < popover. En oscuro las
    // sombras no se ven; la elevación la da la luminosidad.
    background: "oklch(0.145 0 0)",
    foreground: "oklch(0.985 0 0)",
    card: "oklch(0.235 0 0)",
    "card-foreground": "oklch(0.985 0 0)",
    popover: "oklch(0.28 0 0)",
    "popover-foreground": "oklch(0.985 0 0)",

    secondary: "oklch(0.31 0 0)",
    "secondary-foreground": "oklch(0.985 0 0)",
    muted: "oklch(0.31 0 0)",
    "muted-foreground": "oklch(0.72 0 0)",
    accent: "oklch(0.31 0 0)",
    "accent-foreground": "oklch(0.985 0 0)",

    destructive: "oklch(0.55 0.19 25)",
    "destructive-foreground": "oklch(0.99 0.01 25)",

    border: "oklch(0.35 0 0)",
    input: "oklch(0.55 0 0)",
    "input-background": "oklch(0.26 0 0)",
    "switch-background": "oklch(0.52 0 0)",
    ring: "oklch(0.62 0 0)",

    // Misma derivación que en claro con la proporción invertida (foreground casi blanco).
    // `eter-primary-subtle` y `eter-primary-border` no se redefinen: sus fórmulas ya mezclan
    // contra la tarjeta oscura.
    "eter-primary-subtle-foreground": "color-mix(in oklab, var(--eter-primary) 48%, var(--foreground))",

    // Tenue del lima: el relleno baja de proporción (el lima es muy claro) y el texto sube.
    "accent-lime-subtle": "color-mix(in oklab, var(--accent-lime) 12%, var(--card))",
    "accent-lime-border": "color-mix(in oklab, var(--accent-lime) 34%, var(--card))",
    "accent-lime-subtle-foreground": "color-mix(in oklab, var(--accent-lime) 72%, var(--foreground))",

    // Estados clínicos: construcción invertida — sólido más luminoso con texto oscuro; tenue
    // apagado con texto claro.
    success: "oklch(0.62 0.14 155)",
    "success-foreground": "oklch(0.15 0.02 155)",
    "success-subtle": "oklch(0.3 0.05 155)",
    "success-subtle-foreground": "oklch(0.85 0.13 155)",
    "success-border": "oklch(0.45 0.09 155)",

    warning: "oklch(0.75 0.14 80)",
    "warning-foreground": "oklch(0.18 0.03 80)",
    "warning-subtle": "oklch(0.32 0.05 80)",
    "warning-subtle-foreground": "oklch(0.87 0.12 85)",
    "warning-border": "oklch(0.48 0.08 80)",

    info: "oklch(0.62 0.16 250)",
    "info-foreground": "oklch(0.15 0.02 250)",
    "info-subtle": "oklch(0.3 0.06 250)",
    "info-subtle-foreground": "oklch(0.84 0.11 250)",
    "info-border": "oklch(0.46 0.1 250)",

    critical: "oklch(0.6 0.2 25)",
    "critical-foreground": "oklch(0.15 0.02 25)",
    "critical-subtle": "oklch(0.3 0.07 25)",
    "critical-subtle-foreground": "oklch(0.85 0.12 25)",
    "critical-border": "oklch(0.46 0.12 25)",

    sidebar: "oklch(0.21 0 0)",
    "sidebar-foreground": "oklch(0.985 0 0)",
    "sidebar-accent": "oklch(0.31 0 0)",
    "sidebar-accent-foreground": "oklch(0.985 0 0)",
    "sidebar-border": "oklch(0.35 0 0)",
    "sidebar-ring": "oklch(0.62 0 0)",

    // Mismos matices que en claro, subidos en luminosidad para el fondo oscuro.
    "chart-1": "oklch(0.7 0.16 264)",
    "chart-2": "oklch(0.72 0.14 165)",
    "chart-3": "oklch(0.68 0.18 25)",
    "chart-4": "oklch(0.7 0.16 305)",
    "chart-5": "oklch(0.75 0.12 75)",
  },
} as const;

/**
 * Condiciones de contraste en vigor (WCAG 2.1 AA), medidas en AMBOS temas.
 * SSOT de umbrales: este paquete. Las apps ejecutan su propio check de tema en CI alineado
 * a estos valores (resumen declarativo compartido entre DS y consumidores).
 */
export const contrast = {
  standard: "WCAG 2.1 AA",
  validator: "@eter/design-system contrast thresholds (apps align check:theme to these)",
  thresholds: {
    /** Texto normal sobre su superficie (1.4.3). */
    text: 4.5,
    /** Texto grande: ≥18.66px, o ≥14px en negrita (1.4.3). */
    largeText: 3,
    /** Bordes de controles de formulario, anillo de foco y series de gráfica (1.4.11). */
    uiComponents: 3,
    /** Relleno tenue de estado contra la tarjeta: sólo que exista visualmente — la
     *  información la porta el texto interior, validado a 4.5:1. */
    subtleFillVsCard: 1.12,
    /** Borde de una variante tenue contra su propio relleno. */
    subtleBorderVsOwnFill: 1.3,
    /** Relleno de marca tenue contra la tarjeta. */
    primarySubtleVsCard: 1.1,
    /** Escalera de superficies — sólo en oscuro (en claro la elevación la dan sombra y borde). */
    darkSurfaceLadder: {
      cardVsBackground: 1.15,
      popoverVsCard: 1.1,
      sidebarVsBackground: 1.1,
    },
  },
  rules: [
    "Relleno y texto viajan juntos: si el relleno no sigue al tema (hex de marca, como el lima sólido), su texto tampoco se redefine en oscuro.",
    "Las variantes tenues se derivan con color-mix contra la superficie del tema, no como hex fijos: el mismo token invierte solo.",
    "Los `-subtle-foreground` cumplen 4.5:1 también sueltos sobre página y tarjeta, porque el texto de estado no siempre va sobre su relleno.",
    "`critical` es un estado clínico del paciente; `destructive` es la acción de borrar. No son intercambiables.",
    "El texto secundario (`muted-foreground`) se valida contra página, tarjeta y fondo tenue: manda el peor caso.",
    "Las cinco series de gráfica se separan en matiz, no sólo en luminosidad, para seguir distinguiéndose con daltonismo.",
  ],
} as const;

export const typography = {
  fontFamily: {
    primary: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"IBM Plex Mono", "SFMono-Regular", Consolas, monospace',
  },
  scale: {
    "display-xl": { fontSize: "56px", lineHeight: "64px", fontWeight: 700, letterSpacing: "-0.02em" },
    "display-lg": { fontSize: "48px", lineHeight: "56px", fontWeight: 700, letterSpacing: "-0.02em" },
    h1: { fontSize: "40px", lineHeight: "48px", fontWeight: 700, letterSpacing: "-0.015em" },
    h2: { fontSize: "32px", lineHeight: "40px", fontWeight: 700, letterSpacing: "-0.01em" },
    h3: { fontSize: "28px", lineHeight: "36px", fontWeight: 600, letterSpacing: "-0.005em" },
    h4: { fontSize: "24px", lineHeight: "32px", fontWeight: 600, letterSpacing: "0" },
    h5: { fontSize: "20px", lineHeight: "28px", fontWeight: 600, letterSpacing: "0" },
    "body-lg": { fontSize: "18px", lineHeight: "28px", fontWeight: 400, letterSpacing: "0" },
    "body-md": { fontSize: "16px", lineHeight: "24px", fontWeight: 400, letterSpacing: "0" },
    "body-sm": { fontSize: "14px", lineHeight: "20px", fontWeight: 400, letterSpacing: "0" },
    caption: { fontSize: "12px", lineHeight: "16px", fontWeight: 400, letterSpacing: "0" },
    label: { fontSize: "14px", lineHeight: "20px", fontWeight: 600, letterSpacing: "0" },
    button: { fontSize: "15px", lineHeight: "20px", fontWeight: 600, letterSpacing: "0" },
    overline: { fontSize: "12px", lineHeight: "16px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const },
  },
} as const;

export const spacing = {
  0: "0px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
} as const;

export const radius = {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  full: "999px",
} as const;

export const shadow = {
  sm: "0 1px 2px rgba(0,0,0,0.06)",
  md: "0 4px 12px rgba(0,0,0,0.08)",
  lg: "0 12px 32px rgba(0,0,0,0.12)",
  "focus-ring": "0 0 0 2px var(--eter-primary)",
} as const;

// Referencias a tokens, no hex fijos: un borde declarado aquí sigue al tema solo.
export const border = {
  subtle: "1px solid var(--border)",
  input: "1px solid var(--input)",
  brand: "1px solid var(--eter-primary)",
  focus: "2px solid var(--ring)",
} as const;

export const tokens = {
  primitives,
  semantic,
  contrast,
  typography,
  spacing,
  radius,
  shadow,
  border,
} as const;

export default tokens;
