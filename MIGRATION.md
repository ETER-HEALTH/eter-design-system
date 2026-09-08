# Migracion a @eter/design-system v0.2.0

Como pasar de espejos locales (`src/components/eter`, copias de tokens/CSS) a depender del repositorio standalone:

**`github:ETER-HEALTH/eter-design-system#v0.2.0`**

Aplica a **Interfazdelmedico** y a cualquier otra app ETER que haya copiado componentes o tokens del DS.

## Por que migrar

Hasta `0.1.0` el design system vivia anidado (o espejado) dentro de apps. Eso producia drift: hex distintos, convenciones desalineadas y fixes de contraste solo en un lado.

Desde `0.2.0`, **este repositorio es la SSOT** de:

- Primitivas de marca y tokens semanticos (`src/design-tokens.ts`)
- Variables CSS de tema (`src/styles/theme.css`)
- Componentes React publicos (`src/components/*`)
- Logos (`src/assets/logos/*`)
- Preset de Tailwind (`tailwind.config.js` via `@eter/design-system/tailwind.preset`)

## 1. Anadir la dependencia

Instala el paquete desde GitHub apuntando al tag `v0.2.0` del repo `ETER-HEALTH/eter-design-system`.

En `package.json`:

```json
{
  "dependencies": {
    "@eter/design-system": "github:ETER-HEALTH/eter-design-system#v0.2.0"
  }
}
```

Peers: `react` y `react-dom` >= 18.

## 2. Sustituir imports de espejos locales

**Antes (espejo en la app):**

```ts
import { Button } from "@/components/eter/Button";
```

**Despues (paquete):**

```ts
import { Button, Card, Badge } from "@eter/design-system";
```

Tokens:

```ts
import tokens from "@eter/design-system/tokens";
```

Tema CSS (una sola vez en el entry de estilos):

```ts
import "@eter/design-system/theme.css";
```

Logos:

```ts
import logoUrl from "@eter/design-system/assets/logos/eter-logo.svg";
```

## 3. Preset de Tailwind

```js
import eterPreset from "@eter/design-system/tailwind.preset";

export default {
  presets: [eterPreset],
  content: ["./src/**/*.{ts,tsx}", "./index.html"],
};
```

Incluye rutas del paquete en `content` si compilas clases usadas por componentes del DS (`node_modules/@eter/design-system/**/*.{ts,tsx}`).

## 4. Eliminar espejos

En Interfazdelmedico (y apps similares):

1. Reemplaza imports desde `src/components/eter/**` por `@eter/design-system`.
2. Elimina la carpeta espejo `src/components/eter/` (o el subtree `eter-design-system/` anidado) cuando no queden referencias.
3. Deja de copiar `design-tokens.ts` / fragmentos de `globals.css` del DS; importa `theme.css` y/o `tokens`.
4. Si tienes scripts `check:theme` locales, mantén el validador en la app pero alineado a los umbrales exportados en `contrast` de este paquete (SSOT).

## 5. Checklist

- [ ] Dependencia `github:ETER-HEALTH/eter-design-system#v0.2.0` instalada
- [ ] Ningun import a `src/components/eter/*`
- [ ] `theme.css` del paquete cargado una vez
- [ ] Preset Tailwind cableado
- [ ] Build + typecheck de la app en verde
- [ ] Spot-check visual light/dark (contraste WCAG 2.1 AA)

## 6. Pin de version

Prefiere el tag semver (`#v0.2.0`) frente a `#main` para builds reproducibles. Al publicar `v0.3.0+`, actualiza el pin y revisa este archivo / `CHANGELOG.md`.

## Ayuda

- Convenciones: [`.design-sync/conventions.md`](./.design-sync/conventions.md)
- Cambios: [`CHANGELOG.md`](./CHANGELOG.md)
- Repo: https://github.com/ETER-HEALTH/eter-design-system
