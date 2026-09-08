# ETER Design System — Sync Notes

## Re-sync command

```bash
cd /Users/german/eter-design-system
node .ds-sync/resync.mjs
```

## Build quirks

- **npm cache**: npm 11.17.0 defaults to `/Users/german/.npm/_cacache` which is root-owned. Always pass `--cache <tmp-dir>/npm-cache` to all npm commands inside `.ds-sync/`.
- **esbuild allow-scripts**: npm 11 blocks install scripts by default. On first install run `npm approve-scripts esbuild@0.28.1` inside `.ds-sync/` after the partial install, then `npm install` again.
- **No dist/tailwind**: The package ships no compiled Tailwind CSS — only `dist/tokens.css` (custom properties only). Tailwind utility classes must be compiled from source. The cssEntry `dist/eter-styles-full.css` was hand-built by combining: Google Fonts `@import url(...)` + Tailwind CLI output (content: `./src/**/*.{ts,tsx},./.design-sync/previews/**/*.tsx`) + the token vars from `dist/tokens.css` (strip its own @import line). This is a flat file with no local `@import`s.
- **CSS @import chain**: The converter copies the literal cssEntry bytes — local `@import` paths are NOT resolved/inlined. Always use a flat CSS file as `cssEntry`.
- **No build script**: The package uses `"main": "src/index.ts"` — TypeScript source directly. esbuild handles transpilation. Converter flag: `--entry ./src/index.ts`.
- **Playwright browsers**: Must set `PLAYWRIGHT_BROWSERS_PATH=~/.cache/ms-playwright` on every playwright invocation.

## Component overrides

Wide healthcare components need `cardMode: "column"` to avoid grid overflow:
- ClinicalMetricCard, DataTable, PageHeader, PatientHeader, Tabs → `cardMode: "column"`
- Modal → `cardMode: "single"`, viewport 800×560 (uses `position: fixed` overlay)

## Re-sync risk areas

- If Tailwind classes are added to new components, regenerate `dist/eter-styles-full.css` with the Tailwind CLI before re-syncing. Command:
  ```bash
  npx tailwindcss -i /dev/null -o dist/tailwind-compiled.css --content './src/**/*.{ts,tsx},./.design-sync/previews/**/*.tsx'
  ```
  Then rebuild the flat CSS combining Google Fonts @import + tailwind-compiled.css content + tokens.css vars (minus its @import line).
- If new components are added, create preview files in `.design-sync/previews/<Name>.tsx` and re-run the sync.

## Brand assets (hand-maintained)

`brand/` in the Claude Design project is NOT produced by `resync.mjs` — it is uploaded
straight from `src/assets/logos/` (flat: the six SVGs + `eter-logo.html`, the `@dsCard
group="Brand"` page). Relative refs inside the HTML are flat (`./eter-logo.svg`), so the
local folder and the remote `brand/` folder are byte-identical. After editing a logo,
re-upload those files; a resync does not touch them.
