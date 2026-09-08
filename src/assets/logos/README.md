# ETER — Logos

Fuente única de verdad de los assets de marca. SVG vectorial, sin `width`/`height`
fijos y con `viewBox` ajustado al contenido: se escalan con CSS (`width`, `height`)
sin márgenes fantasma.

| Archivo | Uso |
| --- | --- |
| `eter-logo.svg` | Logo principal (isotipo + wordmark). Por defecto, fondos claros. |
| `eter-logo-white.svg` | Logo principal en knockout blanco, fondos oscuros o foto. |
| `eter-wordmark.svg` | Wordmark púrpura, sin isotipo. |
| `eter-wordmark-white.svg` | Wordmark blanco. |
| `eter-isotype.svg` | Isotipo aislado: avatar, sidebar colapsado, loaders. |
| `eter-isotype-white.svg` | Isotipo blanco. |
| `eter-favicon.svg` | Isotipo en lienzo cuadrado. Sólo para favicons — ver abajo. |

`eter-logo.html` es la ficha de marca que se publica en Claude Design (grupo `Brand`).

## Reglas

- **Color** — isotipo siempre `#a20eff` (`--eter-primary`) o blanco. El wordmark en
  negro/`--eter-text` sobre claro, blanco sobre oscuro. Nunca otro color.
- **Tamaño mínimo** — logo completo 120 px de ancho; isotipo 24 px.
- **Área de respeto** — margen libre equivalente a la altura del isotipo alrededor
  del logo completo; 35 % del alto en el isotipo aislado.
- **Escalado proporcional** — no deformar, rotar, ni aplicar sombras o degradados.
- Sobre fondo oscuro usar siempre las variantes `-white`: el wordmark negro
  desaparece.

## Uso

```html
<img src="@eter/design-system/src/assets/logos/eter-logo.svg" alt="ETER" width="180">
```

```tsx
// Con bundler (Vite/webpack con loader de SVG como URL)
import eterLogo from "@eter/design-system/src/assets/logos/eter-logo.svg";

<img src={eterLogo} alt="ETER" className="h-8 w-auto" />;
```

En superficies con tema oscuro, alternar el asset (no filtrar con CSS):

```tsx
<img src={dark ? eterLogoWhite : eterLogo} alt="ETER" className="h-8 w-auto" />
```

## Favicons

`eter-isotype.svg` tiene el `viewBox` ajustado al contenido (1117 × 984, no cuadrado). Un favicon
necesita lienzo cuadrado, así que `eter-favicon.svg` es el mismo trazo centrado en un cuadrado de
1177 con ~30 unidades de aire. **No sustituye al isotipo** en UI: ahí sigue usándose
`eter-isotype.svg`, que no arrastra el margen.

Los tres archivos que consumen las apps —`favicon.svg`, `favicon.ico` (16/32/48/64) y
`apple-touch-icon.png` (180 px, isotipo púrpura sobre blanco porque iOS descarta la transparencia y
compondría sobre negro)— se generan desde este SVG y se copian a `public/` de cada app
(`interfazdelmedico`, `interfazdelpaciente`, `eterlandingpage`). Van en `public/` y no en `src/`
porque el navegador pide `/favicon.ico` por ruta fija, antes de ejecutar el bundle: un asset con
hash de Vite no puede responder a esa petición implícita.

Si cambia la marca: se cambia aquí primero y se re-exporta el set a las tres apps.
