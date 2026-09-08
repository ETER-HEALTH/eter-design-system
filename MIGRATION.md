# Migracion a @eter/design-system v0.2.0

Como pasar de espejos locales (copias de tokens y de fragmentos de `globals.css`) a depender del
repositorio standalone:

**`github:ETER-HEALTH/eter-design-system#v0.2.0`**

Aplica a **Interfazdelmedico**, **Interfazdelpaciente** y a cualquier otra app ETER que haya copiado
tokens del DS.

> **Esta guia cubre la capa de tokens, que es lo que hoy es adoptable.** La migracion de los
> componentes React esta descrita al final como fase pendiente: **no** sustituyas todavia los
> espejos de `src/components/eter/` por los componentes del paquete. El porque, medido, esta en
> [README.md → Estado de los componentes](./README.md#estado-de-los-componentes).

## Por que migrar

Hasta `0.1.0` el design system vivia anidado (o espejado) dentro de apps. Eso producia drift real,
no hipotetico: los arreglos de contraste WCAG del portal medico (`--muted-foreground`, `--input` con
borde visible, la rampa de graficas) nunca llegaron a la app del paciente, que siguio con
`#f59e0b` como serie de grafica (2.1:1 sobre blanco) y `--muted-foreground: #777777` (4.48:1, por
debajo de AA).

Desde `0.2.0`, **este repositorio es la SSOT** de:

- Primitivas de marca y tokens semanticos (`src/design-tokens.ts`)
- Variables CSS de tema (`src/styles/theme.css`)
- Logos (`src/assets/logos/*`)
- Componentes React publicos (`src/components/*`) — **SSOT declarada, adopcion pendiente**
- Preset de Tailwind v3 (`tailwind.config.js` via `@eter/design-system/tailwind.preset`)

## 1. Anadir la dependencia

En `package.json`:

```json
{
  "dependencies": {
    "@eter/design-system": "github:ETER-HEALTH/eter-design-system#v0.2.0"
  }
}
```

Peers: `react` y `react-dom` >= 18.

**Acceso en CI.** npm resuelve la dependencia como `ssh://git@github.com/…` sea cual sea la forma
del spec, y un runner no tiene llave SSH: hay que reescribir la URL antes de `npm ci`, o el job
muere con `git@github.com: Permission denied (publickey)`.

```yaml
- name: Resolver @eter/design-system por HTTPS
  env:
    DS_TOKEN: ${{ secrets.ETER_DS_TOKEN }}
  run: |
    repo="github.com/ETER-HEALTH/eter-design-system"
    if [ -n "$DS_TOKEN" ]; then
      base="https://x-access-token:${DS_TOKEN}@${repo}"
      git config --global --add "url.${base}.insteadOf" "https://${repo}"
    else
      base="https://${repo}"
    fi
    for ssh in "ssh://git@${repo}" "git@github.com:ETER-HEALTH/eter-design-system"; do
      git config --global --add "url.${base}.insteadOf" "$ssh"
    done
```

`--add` no es opcional: son varios valores del mismo `insteadOf` y sin el cada uno reemplaza al
anterior. `ETER_DS_TOKEN` hace falta mientras este repositorio sea privado; cuando pase a publico se
borra el secret y el paso cae solo a HTTPS anonimo, sin tocar el workflow.

## 2. Cargar el tema

Una sola vez, en el entry de estilos y **antes** del CSS propio de la app, para que la app pueda
sobrescribir lo que necesite:

```ts
import "@eter/design-system/theme.css";
import "./styles/globals.css";
```

## 3. Vaciar el espejo de tokens

En el `globals.css` de la app, borra todo lo que ahora vive en `theme.css`: primitivas de marca
(`--eter-purple-*`, `--eter-lime-*`, `--neutral-*`), superficies, texto, bordes, estados clinicos,
`--destructive` y las series de grafica, en **ambos** temas.

Lo que se queda en la app:

- Puentes a shadcn/ui (`--primary`, `--radius`) y alias legacy propios.
- El registro `@theme` de Tailwind v4.
- Overrides deliberados, **documentados uno por uno**.

### Ojo con la cascada al sobrescribir

`:root` y `.dark` tienen la misma especificidad, y el CSS de la app se importa **despues** del
paquete. Un token que la app re-ancle en su `:root` a un valor que no cambia con el tema —un hex, o
`var(--eter-purple-50)`— le gana al `.dark` del paquete y se cuela en modo oscuro. Cada token
re-anclado en `:root` necesita su contrapartida en `.dark`.

No pasa con los alias que apuntan a otro token semantico (`--status-error: var(--critical)`): esos
se resuelven en el punto de uso.

Interfazdelpaciente tiene una prueba que fija justamente eso
(`src/styles/__tests__/theme-tokens.test.ts`); vale la pena copiarla.

### Si la app genera CSS a partir de la paleta

Cualquier script que emita una paleta clara —capas de compatibilidad, bloques de impresion tipo
`.eter-paper`— tiene que **leerla de `node_modules/@eter/design-system/src/styles/theme.css`**, no
mantener su propia copia: si no, la vista de papel acaba con colores distintos a los de la app.

## 4. Preset de Tailwind (solo v3)

```js
import eterPreset from "@eter/design-system/tailwind.preset";

export default {
  presets: [eterPreset],
  content: ["./src/**/*.{ts,tsx}", "./index.html"],
};
```

**En Tailwind v4 no se cablea.** Ahi los tokens se registran con `@theme` en el CSS de la app,
apuntando a las variables de `theme.css`. Las apps ETER estan en v4.

## 5. Checklist (tokens)

- [ ] Dependencia `github:ETER-HEALTH/eter-design-system#v0.2.0` instalada
- [ ] Paso de reescritura de URL en cada workflow que corra `npm ci`
- [ ] `theme.css` del paquete cargado una vez, antes del CSS de la app
- [ ] Sin hex de marca ni paleta semantica duplicada en `globals.css`
- [ ] Cada override de `:root` tiene su contrapartida en `.dark`
- [ ] Build + typecheck + pruebas de la app en verde
- [ ] Spot-check visual light/dark (contraste WCAG 2.1 AA)

## 6. Fase pendiente: componentes

Todavia **no** aplica. Los componentes de este paquete estan escritos con hex literales en
`className` (280, cero `var()`), asi que no siguen el tema, ignoran el primario por organizacion y
rebotarian en el guardia `check:colors` de Interfazdelmedico. Detalle en
[README.md → Estado de los componentes](./README.md#estado-de-los-componentes).

El orden correcto es:

1. Reescribir los componentes de este paquete contra `var(--token)`, sin cambiar su API publica.
2. Publicar la etiqueta correspondiente.
3. Recien entonces, en cada app: sustituir imports de `src/components/eter/*` por
   `@eter/design-system` **de uno en uno**, y anadir las rutas del paquete al escaneo de clases de
   Tailwind (`@source '../node_modules/@eter/design-system/src/**/*.{ts,tsx}'` en v4, `content` en
   v3) — antes de eso ese escaneo solo compila utilidades muertas.
4. Borrar el espejo local cuando no queden referencias.

## 7. Pin de version

Prefiere el tag semver (`#v0.2.0`) frente a `#main` para builds reproducibles. **Las etiquetas
publicadas no se mueven**: el lockfile de la app fija el SHA, pero mover una etiqueta haria que un
`npm i` trajera otro codigo bajo la misma version. Un cambio es una etiqueta nueva y subir el pin en
cada app.

## Ayuda

- Convenciones: [`.design-sync/conventions.md`](./.design-sync/conventions.md)
- Cambios: [`CHANGELOG.md`](./CHANGELOG.md)
- Repo: https://github.com/ETER-HEALTH/eter-design-system
