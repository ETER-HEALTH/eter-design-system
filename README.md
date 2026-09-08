# @eter/design-system

Design system de **ETER** (Healthcare Technology Platform): tokens de marca, tema claro/oscuro, logos y componentes React.

Repositorio: https://github.com/ETER-HEALTH/eter-design-system

> **Alcance de la 0.2.x: paquete de tokens.** Lo que hoy es adoptable en producción es la capa de
> tokens (`./theme.css`, `./tokens`) y los logos (`./assets/logos/*`). **Los componentes React y el
> preset de Tailwind todavía no lo son** — ver [Estado de los componentes](#estado-de-los-componentes).
> Las apps que consumen el paquete (Interfazdelmedico, Interfazdelpaciente) importan `theme.css` y
> mantienen sus propios componentes; no borres sus espejos locales todavía.

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

**Acceso.** npm resuelve esta dependencia como `ssh://git@github.com/…` sea cual sea la forma del
spec (así la normaliza `hosted-git-info`). Un runner de CI no tiene llave SSH, así que la app
consumidora tiene que reescribir esa URL a HTTPS antes de instalar:

```bash
git config --global --add \
  "url.https://github.com/ETER-HEALTH/eter-design-system.insteadOf" \
  "ssh://git@github.com/ETER-HEALTH/eter-design-system"
```

La reescritura hace falta **siempre**: el problema es el esquema `ssh`, no el permiso. Este
repositorio es **publico**, asi que no lleva credencial y no hace falta ningun secret. Si alguna vez
volviera a ser privado, la misma linea con credencial
(`https://x-access-token:$TOKEN@github.com/…`, PAT fine-grained de lectura de contenido) lo resuelve.

**Etiquetas.** `#v0.2.0` es una etiqueta de git, no un artefacto inmutable: el lockfile de la app
fija el SHA, así que `npm ci` es reproducible, pero mover una etiqueta haría que un `npm i` trajera
otro código bajo la misma versión. **Las etiquetas publicadas no se mueven** — un cambio es una
etiqueta nueva y subir el pin en cada app.

Detalle de migracion desde espejos locales: ver [MIGRATION.md](./MIGRATION.md).

## Uso basico

El tema entra una sola vez, en el entry de estilos de la app y **antes** de su propio CSS, para que
la app pueda sobrescribir lo que necesite:

```ts
import "@eter/design-system/theme.css";
import "./styles/globals.css";
```

A partir de ahí se usan las variables CSS (`var(--primary)`, `bg-card`, `text-muted-foreground`…).
Tokens en TypeScript, para lo que no es CSS —validadores de contraste, generadores, previews—:

```ts
import tokens, { primitives, semantic, contrast } from "@eter/design-system/tokens";
```

Logos:

```ts
import logoUrl from "@eter/design-system/assets/logos/eter-logo.svg";
```

Componentes (`import { Button } from "@eter/design-system"`): la API existe, pero lee antes
[Estado de los componentes](#estado-de-los-componentes).

### Preset de Tailwind

`@eter/design-system/tailwind.preset` es un preset de **Tailwind v3** (`presets`, `content`,
`darkMode: ["class"]`). Las apps ETER están en **Tailwind v4**, donde ese formato no se usa: los
tokens se registran con `@theme` en el CSS de la app apuntando a las variables de `theme.css`. El
preset se conserva para consumidores en v3; en v4 **no lo cablees**.

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

## Estado de los componentes

**No adoptables todavía.** Los 13 componentes están escritos con hex literales en `className` — 280
en total, cero `var()`, cero uso de las utilidades del propio preset. Consecuencias medidas:

- **No siguen el tema.** `Button variant="outline"` es `bg-white text-[#000000]`: blanco sobre
  página negra en modo oscuro. Lo mismo en `Card`, `Input`, `Modal`, `Tabs`, `SidebarNavigation`.
- **Ignoran el color de la organización.** En Interfazdelmedico el primario lo configura cada
  organización en runtime sobre `--primary`; `Button variant="primary"` pinta `bg-[#a20eff]` fijo.
- **Contradicen a los tokens de este mismo paquete.** `destructive` usa `#ef4444`; el `theme.css` de
  aquí al lado lo declara `#d4183d`.
- **Rebotarían en la CI de las apps.** Interfazdelmedico corre `check:colors`, que prohíbe color
  literal donde hay token.

Es decir: adoptarlos hoy sería un retroceso frente a lo que las apps ya tienen. El trabajo pendiente
es reescribirlos contra `var(--token)` — mismo API público, mismos nombres de variante — y recién
entonces migrar app por app.

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
