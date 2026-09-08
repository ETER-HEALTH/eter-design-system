/** @type {import('tailwindcss').Config} */
/** Preset compartido — consumir vía `@eter/design-system/tailwind.preset`. */
export default {
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        "eter-purple": {
          50: "#f5e6ff",
          100: "#e8ccff",
          200: "#d199ff",
          300: "#b966ff",
          400: "#b033ff",
          500: "#a20eff",
          600: "#8a0cdb",
          700: "#710ab7",
          800: "#590893",
          900: "#40066f",
        },
        "eter-lime": {
          50: "#f7fbcc",
          100: "#eef699",
          200: "#ddf066",
          300: "#cce833",
          400: "#c4e62e",
          500: "#c1e328",
          600: "#a8c820",
          700: "#8fad18",
          800: "#769210",
          900: "#5d7708",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "sans-serif"],
        mono: ['"IBM Plex Mono"', '"SFMono-Regular"', "Consolas", "monospace"],
      },
      borderRadius: {
        4: "4px",
        8: "8px",
        12: "12px",
        16: "16px",
        24: "24px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.06)",
        md: "0 4px 12px rgba(0,0,0,0.08)",
        lg: "0 12px 32px rgba(0,0,0,0.12)",
        "focus-purple": "0 0 0 2px #a20eff",
      },
      spacing: {
        18: "72px",
      },
    },
  },
  plugins: [],
};
