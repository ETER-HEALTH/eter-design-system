# Changelog

All notable changes to `@eter/design-system` are documented in this file.

## [Unreleased]

### Changed

- **Alcance de la 0.2.x acotado a paquete de tokens.** `README.md` y `MIGRATION.md` decían que las
  apps debían sustituir sus espejos de `src/components/eter/` por los componentes de este paquete.
  No es cierto todavía: los 13 componentes están escritos con hex literales en `className` (280 en
  total, cero `var()`), así que no siguen el tema claro/oscuro, ignoran el `--primary` que configura
  cada organización en Interfazdelmedico y rebotarían en su guardia `check:colors`. Seguir esa guía
  habría sido un retroceso frente a lo que las apps ya tienen. La migración de componentes queda
  documentada como fase pendiente, con el orden correcto: reescribirlos aquí contra `var(--token)`,
  etiquetar, y recién entonces migrar app por app.
- **El preset de Tailwind se documenta como v3.** `tailwind.config.js` usa `presets`/`content`, que
  Tailwind v4 no consume; las dos apps ETER están en v4 y registran los tokens con `@theme` en su
  propio CSS. El paso 3 del checklist de migración no se podía completar en ninguna de las dos.
- **`MIGRATION.md` documenta el acceso desde CI**, que faltaba por completo: npm resuelve esta
  dependencia como `ssh://git@github.com/…` sea cual sea la forma del spec, y un runner no tiene
  llave SSH, así que sin reescribir la URL el `npm ci` de la app muere con
  «Permission denied (publickey)». Es lo que dejó en rojo las ramas de adopción de las dos apps.
- **Las etiquetas publicadas se declaran inmutables.** El lockfile de la app fija el SHA, pero mover
  una etiqueta haría que un `npm i` trajera otro código bajo la misma versión.

- **El repositorio pasa a público.** No contiene secretos ni lógica de negocio, y ser privado
  obligaba a un secret en la CI de cada app y a una llave o token en la máquina de cada persona.
  `README.md` y `MIGRATION.md` lo reflejan: la reescritura de URL sigue siendo obligatoria —el
  problema es el esquema `ssh`, no el permiso— pero ya no lleva credencial. La rama con
  `ETER_DS_TOKEN` se conserva en los workflows de las apps por si alguna vez volviera a ser privado.

## [0.2.0] — 2026-09-08

### Added

- Extracción del design system a repositorio GitHub independiente: [`ETER-HEALTH/eter-design-system`](https://github.com/ETER-HEALTH/eter-design-system).
- Este paquete pasa a ser la **fuente de verdad (SSOT)** de tokens semánticos y primitivos de marca (`src/design-tokens.ts`, `src/styles/theme.css`).
- Documentación de instalación/consumo: `README.md`, guía de migración `MIGRATION.md`, convenciones en `.design-sync/conventions.md`.
- Exports de paquete: `.`, `./tokens`, `./theme.css`, `./tailwind.preset`, `./assets/logos/*`.

### Changed

- Versión `0.2.0`, `private: true`, `"type": "module"`.
- Eliminadas dependencias de runtime `esbuild` y `ts-morph` (no formaban parte del DS publicado).
- Comentarios de SSOT en `design-tokens.ts`: ya no se describe como espejo de Interfazdelmedico.

### Notes

- Consumo recomendado vía Git: `github:ETER-HEALTH/eter-design-system#v0.2.0`.
- Las apps (p. ej. Interfazdelmedico) deben dejar de mantener espejos en `src/components/eter` y depender de este paquete. Ver `MIGRATION.md`.

## [0.1.0] — nested origin

### Added

- Origen anidado dentro de Interfazdelmedico como carpeta `eter-design-system/` / paquete `@eter/design-system@0.1.0`.
- Componentes React + tokens + assets de marca ETER (púrpura `#a20eff`, lima `#c1e328`).
- Skill `design-sync` y previews en `.design-sync/`.

### Notes

- En 0.1.0 la paleta semántica se trataba como reflejo de `interfazdelmedico/src/styles/globals.css`. A partir de 0.2.0 la dirección se invierte: este repo es SSOT.
