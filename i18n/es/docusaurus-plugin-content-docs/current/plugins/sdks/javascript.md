---
title: SDK de JavaScript
description: 'Crea plugins de Owncast en JavaScript o TypeScript con @owncast/plugin-sdk: andamiaje, la API definePlugin, la CLI y el arnés de pruebas de escenarios.'
sidebar_position: 2
sidebar_label: JavaScript
toc_min_heading_level: 2
toc_max_heading_level: 3
tags:
  - plugins
  - sdk
  - javascript
  - typescript
  - nodejs
---

El SDK de JavaScript, [`@owncast/plugin-sdk`](https://www.npmjs.com/package/@owncast/plugin-sdk), es la forma más común de escribir un plugin de Owncast. Escribes en JavaScript o TypeScript, y la CLI lo agrupa en un único plugin instalable que se ejecuta en aislamiento dentro del servidor de Owncast. Si estás decidiendo entre esto y el SDK de Python, consulta la [visión general de plugins](/docs/plugins#two-sdks).

:::info[Novedades en Owncast 0.3.0]
Los SDK de plugins son completamente nuevos en Owncast 0.3.0 y la API aún está evolucionando. Si te encuentras con un error o tienes una sugerencia, por favor [abre un problema](https://github.com/owncast/plugin-sdk/issues) o [chatea en vivo con la comunidad](/chat?tab=community).
:::

Esta página es la capa específica de JavaScript: andamiaje, `definePlugin`, la CLI y TypeScript. Los controladores, APIs, permisos y el manifiesto funcionan igual en ambos SDK y tienen sus propias páginas de referencia.

## Cómo se relaciona con la documentación de referencia

Los nombres de referencia compartidos API están en su forma canónica, que es la forma de JavaScript: por lo que puedes leerlo tal cual. Orientación rápida:

| En la referencia                                                                                               | En JavaScript                                                      |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Define un controlador                                                                                          | un método en `definePlugin({ ... })`                               |
| Controlador para un evento (p. ej. `chat.message.received`) | `onChatMessage(msg)`: camelCase, `on` + el evento  |
| Llamar a una API de host (p. ej. `owncast.chat.sendAction`) | idéntico: `owncast.chat.sendAction(text)`          |
| Campos de carga útil                                                                                           | camelCase: `msg.user.displayName`, `msg.clientId`  |
| Resultado del filtro                                                                                           | `filter.pass()` / `filter.modify(payload)` / `filter.drop(reason)` |
| Suscribirse a un evento personalizado                                                                          | `on: { "my.event"(payload) { … } }`                                |
| Construir / probar tu plugin                                                                                   | `npm run package` / `npm test`                                     |

## Requisitos previos

- Un servidor Owncast que puedas administrar, versión 0.3.0 o más reciente.
- Node.js 18 o más reciente (`node --version` para verificar).

## Crear un nuevo plugin

No instalas el SDK a mano. Crea un proyecto con `create-owncast-plugin` y el `package.json` generado ya lista `@owncast/plugin-sdk` como una dependencia:

```sh
npx create-owncast-plugin@latest my-plugin
cd my-plugin
npm install     # obtiene los ayudantes de prueba y servir
```

Pasa el slug que deseas como argumento. El andamiaje lo usa para el nombre del directorio, el nombre del archivo de salida y el prefijo de la URL. Los slugs son letras minúsculas, dígitos y guiones, comenzando con una letra.

Ahora tienes:

```text
my-plugin/
├── package.json
├── plugin.manifest.json     nombre para mostrar, slug, versión, permisos
├── README.md                cómo construir, probar, empaquetar e instalarlo
├── INSTRUCTIONS.md          opcional, renderizada como una pestaña en el admin
├── AGENTS.md                notas para agentes de codificación de IA
├── .agents/                 una habilidad agrupada para agentes de codificación de IA
├── src/
│   └── plugin.js            tu código, con un controlador de muestra
└── __tests__/
    └── plugin.test.js       una prueba de escenario de muestra
```

`npm install` también crea `node_modules/`. Ninguno de estos se crea por ti, pero puedes agregar un `icon.png` (mostrado en la lista de plugins de administración), un directorio `public/` (archivos estáticos servidos en `/plugins/my-plugin/`), y un directorio `assets/` (archivos que el host incluye para los campos del manifiesto).

`npm install` ejecuta un paso de postinstalación que obtiene los binarios preconstruidos de prueba y servir (el ejecutor de escenarios y el servidor de desarrollo). Construir y empaquetar un plugin no necesita descarga. Esta postinstalación es el único paso de red, y todo lo demás es local.

## Escribe un plugin

Un plugin es el objeto que pasas a `definePlugin`. Define un método para cada evento al que deseas reaccionar: el SDK deriva la lista de suscripciones del manifiesto de los métodos presentes, por lo que no hay una lista separada que debas mantener en sincronía.

```js
const { definePlugin, owncast, filter } = require('@owncast/plugin-sdk');

module.exports = definePlugin({
  onChatMessage(msg) {
    owncast.chat.send(`echo: ${msg.body}`);
  },

  filterChatMessage(msg) {
    return msg.body.includes('spam') ? filter.drop('spam') : filter.pass();
  },
});
```

El paquete exporta tres cosas:

- **`definePlugin(handlers)`**: registra tus controladores y devuelve el objeto del plugin para exportar.
- **`owncast`**: el espacio de nombres de la API del host (`owncast.chat.send(...)`, `owncast.kv.get(...)`, y el resto). Los nombres de método son **camelCase**. Cada llamada está controlada por el permiso correspondiente que declares en tu manifiesto. Consulta la [referencia de APIs](/docs/plugins/apis).
- **`filter`**: el constructor para los resultados del filtro: `filter.pass()`, `filter.modify(payload)`, `filter.drop(reason)`. Usado solo desde `filterChatMessage`.

Los nombres de los controladores son camelCase y se mapean a los eventos de ejecución enumerados en la [referencia de controladores](/docs/plugins/events): `onChatMessage`, `filterChatMessage`, `onChatUserJoined`, `onStreamStarted`, `onTick`, `onFediverseFollow`, `onHttpRequest`, y así sucesivamente. Los campos de carga útil también son camelCase (`msg.user.displayName`, `msg.clientId`).

Más allá de los métodos de nivel superior, dos grupos de controladores toman una clave y se pasan como objetos anidados: `on: { "my.event"(payload) {} }` para eventos personalizados y `onTabContent: { slug(ctx) {} }` / `onPageContent` para páginas dinámicas de visualizadores. Dos más no toman clave: `onPageStyles()` y `onPageScripts()` devuelven CSS y JavaScript inyectados en la página del visualizador en el momento de la solicitud, controlados por `ui.modify`. Y en lugar de crear manualmente el análisis de prefijo en `onChatMessage`, puedes declarar una tabla de `commands` que el `!help` incorporado del host recoge automáticamente. Ambos se muestran para JavaScript en las páginas de tema: [Controladores](/docs/plugins/events), [Comandos](/docs/plugins/commands), y [UI](/docs/plugins/ui).

## TypeScript

El paquete envía `index.d.ts`, por lo que obtienes autocompletado y verificación de tipos en cada carga útil de evento y API de host sin configuración adicional. Nombrar tu entrada `src/plugin.ts` y la CLI lo compila de la misma manera:

```ts
import { definePlugin, owncast, filter, ChatMessage } from '@owncast/plugin-sdk';

export default definePlugin({
  onChatMessage(msg: ChatMessage) {
    owncast.chat.send(`echo: ${msg.body}`);
  },
});
```

La compilación detecta `src/plugin.ts`, `src/plugin.js`, `plugin.ts`, o `plugin.js` en ese orden. Los tipos son solo declaraciones: no hay un paso de compilación separado ni se requiere `tsconfig`.

## La CLI

El SDK instala un CLI de `owncast-plugin`, expuesto a través de los scripts `package.json` que escribe el andamiaje:

| Comando                  | Script            | Lo que hace                                                                                     |
| ------------------------ | ----------------- | ----------------------------------------------------------------------------------------------- |
| `owncast-plugin build`   | `npm run build`   | Agrupa `src/plugin.{js,ts}` en un artefacto de construcción intermedio                          |
| `owncast-plugin test`    | `npm test`        | Construye y luego ejecuta los escenarios de `__tests__/` a través del entorno de ejecución real |
| `owncast-plugin serve`   | `npm run serve`   | Servidor de desarrollo local en `http://localhost:8080/plugins/<slug>/`                         |
| `owncast-plugin package` | `npm run package` | Construye y agrupa todo en `<slug>.ocpkg`: el archivo que envías                |

```sh
npm run package   # produce my-plugin.ocpkg
npm test          # ejecuta tus escenarios
npm run serve     # itera contra un servidor de desarrollo local
```

El `.ocpkg` es el único artefacto de distribución: contiene tu manifiesto, el código empaquetado, tus directorios `public/` y `assets/`, y un opcional `icon.png` y `INSTRUCTIONS.md`. Consulta [Empaquetado y distribución](/docs/plugins/packaging) para lo que contiene y cómo instalarlo.

En JavaScript, `npm test` ejecuta archivos `__tests__/*.test.js` que llaman a `runScenarios` (construye la matriz con bucles, ayudantes y fixtures), o archivos `__tests__/*.test.json` estáticos. El modelo de datos completos de escenarios y el servidor de desarrollo local (`npm run serve`) están en la página de [Pruebas](/docs/plugins/testing).

## Restricciones a tener en cuenta

La CLI agrupa tu código en un solo archivo que se ejecuta dentro del sandbox del servidor, no en Node. Ese sandbox moldea cómo escribes un plugin:

- **Usa `owncast.http.fetch` para HTTP saliente**, no el global `fetch`, `axios`, o un paquete que envuelve el `http` de Node. El acceso a la red pasa a través de la API del host y está controlado por el permiso `network.fetch`. Consulta la [referencia de APIs](/docs/plugins/apis).
- **No todos los paquetes de npm funcionan.** Los paquetes de JavaScript puro se agrupan bien. Cualquier cosa que necesite el entorno de ejecución de Node.js no lo hace. Consulta [Bibliotecas de terceros](#third-party-libraries).

## Bibliotecas de terceros

:::caution[Lee esto antes de agregar una dependencia]
Los paquetes npm funcionan solo si son **JavaScript puro**. Un plugin se ejecuta en un sandbox, no en Node, por lo que un paquete que toque `fs`, `net`, `http`/`https`, `path`, `crypto`, `process`, o `child_process` se agrupa limpia y luego lanza un error cuando se ejecuta ese código.
:::

Un paquete también puede tocar un interno de Node en una ruta que nunca usas, así que prueba las partes que utilizas. Para HTTP saliente, usa [`owncast.http.fetch`](/docs/plugins/apis), no un paquete de cliente HTTP.

El ejemplo [`page-content-demo`](https://github.com/owncast/plugin-sdk/tree/main/examples/js/page-content-demo) utiliza el paquete `mustache` de esta manera.

## Qué hay en el paquete

- `index.js`: el tiempo de ejecución con `definePlugin`, controladores de comandos, los envoltorios de host `owncast.*` y ayudantes de filtro.
- `index.d.ts`: declaraciones de TypeScript para cada carga útil de evento y API de host.
- `testing.js`: la API de prueba `runScenarios` / `runScenarioFiles`.
- `bin/owncast-plugin`: la CLI (`build`, `test`, `serve`, `package`).
- `scripts/postinstall.js`: obtiene los binarios preconstruidos de prueba y servir en la instalación, usado por `npm test` y `npm run serve`.

## Adónde ir luego

- [Referencia de controladores](/docs/plugins/events): cada evento al que puedes suscribirte y su forma de carga útil.
- [Referencia de APIs](/docs/plugins/apis): cada método `owncast.*` y el permiso que necesita.
- [Pruebas](/docs/plugins/testing): el modelo completo de datos de escenarios.
- [Empaquetado y distribución](/docs/plugins/packaging): construyendo el `.ocpkg` e instalándolo.
- [Plugins de ejemplo](https://github.com/owncast/plugin-sdk/tree/main/examples/js): uno por función, cada uno un punto de partida completo que puedes copiar.
- [Código fuente del SDK](https://github.com/owncast/plugin-sdk): el paquete y herramienta `@owncast/plugin-sdk`.
