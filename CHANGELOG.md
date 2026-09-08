# Changelog

All notable changes to `@eter/design-system` are documented in this file.

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
