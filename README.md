# @eter/design-system

Design system de **ETER** (Healthcare Technology Platform): componentes React, tokens de marca y tema claro/oscuro.

Repositorio: https://github.com/ETER-HEALTH/eter-design-system

## Instalacion

Anade la dependencia apuntando al tag publicado:

```text
github:ETER-HEALTH/eter-design-system#v0.2.0
```

Ejemplo en `package.json`:

```json
{
  "dependencies": {
    "@eter/design-system": "github:ETER-HEALTH/eter-design-system#v0.2.0"
  }
}
```

Peers: `react` y `react-dom` >= 18.

Detalle de migracion desde espejos locales: ver [MIGRATION.md](./MIGRATION.md).

## Uso basico

```tsx
import { Button, Card, Badge } from "@eter/design-system";
import "@eter/design-system/theme.css";

export function Example() {
  return (
    <Card>
      <Badge variant="primary">ETER</Badge>
      <Button variant="primary">Guardar</Button>
    </Card>
  );
}
```

Tokens TypeScript:

```ts
import tokens, { primitives, semantic, contrast } from "@eter/design-system/tokens";
```

Preset de Tailwind:

```js
import eterPreset from "@eter/design-system/tailwind.preset";

export default {
  presets: [eterPreset],
  content: ["./src/**/*.{ts,tsx}"],
};
```

## Arquitectura de tokens

Fuente de verdad (SSOT): `src/design-tokens.ts` + `src/styles/theme.css` en **este** paquete.

### Marca (primitivas invariantes)

| Token | Hex | Uso |
| --- | --- | --- |
| `--eter-purple-500` / primary | `#a20eff` | Acciones principales, marca |
| `--eter-lime-500` / accent | `#c1e328` | AI / insights |

Escalas `eter-purple-50..900` y `eter-lime-50..900` mas neutros `neutral-0..900`.

### Semanticos (claro / oscuro)

Superficies (`background`, `card`, `popover`), texto (`foreground`, `muted-foreground`), bordes (`border`, `input`, `ring`), estados clinicos (`success`, `warning`, `info`, `critical`) y `destructive` (borrar — no es critico clinico).

Las variantes tenues usan `color-mix(...)` contra la superficie del tema para invertir solas.

Contraste: WCAG 2.1 AA en ambos temas; umbrales declarados en `contrast` dentro de `design-tokens.ts`.

## Componentes

Exportados desde `@eter/design-system`:

- **Actions:** Button
- **Feedback:** Alert, Badge, EmptyState
- **Data:** DataTable, ClinicalMetricCard
- **Forms:** Input, Select, Textarea
- **Layout:** Card (+ Header/Title/Description/Footer), Modal, PageHeader
- **Navigation:** SidebarNavigation, Tabs
- **Clinical:** PatientHeader

Convenciones de props y semantica de color: [`.design-sync/conventions.md`](./.design-sync/conventions.md).

## Marca / logos

Assets en `src/assets/logos/` (export `./assets/logos/*`):

- `eter-logo.svg` / `eter-logo-white.svg` — lockup
- `eter-wordmark.svg` / `-white` — wordmark
- `eter-isotype.svg` / `-white` — marca reducida
- `eter-favicon.svg` — favicon

Isotipo siempre `#a20eff` o blanco; wordmark negro en claro / blanco en oscuro.

## Documentacion relacionada

- [CHANGELOG.md](./CHANGELOG.md) — historial 0.1.0 (origen anidado) y 0.2.0 (extraccion SSOT)
- [MIGRATION.md](./MIGRATION.md) — como dejar de usar `src/components/eter` en Interfazdelmedico y otras apps
- [`.design-sync/conventions.md`](./.design-sync/conventions.md) — convenciones de uso

## Licencia

UNLICENSED — uso interno ETER HEALTH.
