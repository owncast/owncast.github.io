---
title: Referencia del manifiesto
description: Cada campo que puede contener el manifiesto de tu complemento, con ejemplos.
sidebar_position: 3
sidebar_label: Manifiesto
toc_min_heading_level: 2
toc_max_heading_level: 3
tags:
  - complementos
  - manifiesto
  - referencia
  - configuración
---

Cada complemento tiene un archivo `plugin.manifest.json` en su raíz. Esta es la fuente de verdad para la identidad del complemento, los permisos que necesita, los destinos de red a los que se le permite llamar, las páginas de administración que contribuye, y los botones de acción que agrega a la interfaz del visualizador.

El manifiesto es lo que un administrador revisa antes de instalar el complemento. El host lo analiza en el tiempo de carga y hace cumplir cada declaración. Nada en el complemento compilado puede otorgar una capacidad que el manifiesto no pidió.

:::info[Disponible en cada SDK]
El manifiesto es un JSON sencillo que describe el complemento al host, independiente del lenguaje en que escribiste el código. Para detalles específicos del idioma, consulta la referencia de SDK de **[JavaScript](/docs/plugins/sdks/javascript)** o **[Python](/docs/plugins/sdks/python)**.
:::

## Manifiesto mínimo

```json
{
  "api": "1",
  "name": "Mi Complemento",
  "version": "0.1.0",
  "description": "Descripción corta para administradores",
  "permissions": []
}
```

`api`, `name`, y `version` son obligatorios. Todo lo demás es opcional y solo necesario cuando usas la función correspondiente.

## Campos de nivel superior

| Campo              | Tipo                                                         | Requerido | Descripción                                                                                                                                                                                                        |
| ------------------ | ------------------------------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `api`              | cadena                                                       | sí        | Versión del esquema del manifiesto. Actualmente `"1"`.                                                                                                                             |
| `name`             | cadena                                                       | sí        | Nombre que se muestra en listas de administradores y tarjetas de registro. Ejemplo: `"Bot Asombroso de Eco"`.                                                      |
| `slug`             | cadena                                                       | no        | Identificador canónico (prefijo de URL, espacio de nombres de configuración, nombre de archivo). Autogenerado de `name` si se omite. Ver abajo. |
| `version`          | cadena                                                       | sí        | La versión de tu complemento. Semver recomendado. Debe coincidir con lo que el tiempo de ejecución reporta al cargar.                                              |
| `description`      | cadena                                                       | no        | Resumen de una sola oración que el administrador ve en la lista de complementos y durante la instalación.                                                                                          |
| `permissions`      | cadena[] | no        | Lista de capacidades que tu complemento necesita. Ver [Permisos](/docs/plugins/permissions).                                                                                       |
| `config`           | objeto                                                       | no        | Configuraciones configurables por el administrador que tu complemento lee en tiempo de ejecución. Ver [Configuración](/docs/plugins/configuration).                                |
| `bot`              | objeto                                                       | no        | Configuración del chat-bot. Ver [`bot`](#bot-chat-bot-identity).                                                                                                                   |
| `network`          | objeto                                                       | no        | Lista blanca de HTTP salientes, requerida cuando se concede `network.fetch`. Ver abajo.                                                                                            |
| `actions`          | objeto[] | no        | Botones de acción que se agregan a la interfaz del visualizador. Ver [UI: Botones de acción](/docs/plugins/ui#action-buttons).                                     |
| `admin`            | objeto                                                       | no        | Páginas de administración que se añaden a la interfaz de administración de Owncast. Ver [UI: Páginas de administración](/docs/plugins/ui#admin-pages).             |
| `styles`           | cadena[] | no        | Archivos CSS incrustados en la página del visualizador. Ver [`styles`](#styles-css-injection).                                                                                     |
| `scripts`          | cadena[] | no        | Archivos JavaScript incrustados en la página del visualizador. Ver [`scripts`](#scripts-javascript-injection).                                                                     |
| `extraPageContent` | objeto                                                       | no        | Un objeto que declara un slug y un archivo HTML opcional que se prefiere al bloque de contenido extra del visualizador. Ver [`extraPageContent`](#extrapagecontent-html-block).    |
| `tabs`             | objeto[] | no        | Pestañas de la página del visualizador que el complemento contribuye junto con las pestañas integradas. Ver [`tabs`](#tabs-viewer-page-tabs).                                      |

### `name` y `slug`

`name` es el nombre de visualización legible por humanos. Puede contener cualquier carácter, incluidos espacios y puntuaciones, y es lo que los administradores ven en la lista de complementos, lo que aparece en las tarjetas de exploración de registros y la identidad predeterminada del chat-bot.

`slug` es el identificador canónico. Controla:

- El prefijo de URL del complemento: `/plugins/<slug>/...`
- El espacio de nombres de configuración (almacenamiento clave-valor)
- El nombre del archivo del artefacto construido (`<slug>.ocpkg`)
- La clave principal en el registro de complementos

Los slugs son letras minúsculas, dígitos y guiones, comenzando con una letra, hasta 64 caracteres. El SDK deriva uno de `name` automáticamente cuando se omite `slug`: los espacios y puntuaciones colapsan en guiones simples, letras en minúsculas. `"Bot Asombroso de Eco"` se convierte en `bot-asombroso-de-eco`. Fija `slug` explícitamente cuando la auto-derivación no es lo que deseas, o cuando tu nombre de visualización utiliza caracteres fuera de ASCII (`"Ayudante de Café"` de otro modo daría lugar a `ayudante-de-cafe`).

Evita cambiar el slug después del lanzamiento: el cambio de nombre parecerá un complemento diferente para los administradores, con un nuevo almacén de configuración. Cambiar `name` (solo visualización) es seguro. No cambia la identidad.

### `bot`: identidad del chat-bot

Los complementos que publican en el chat (usando `owncast.chat.send`) aparecen bajo un usuario del chat-bot. Por defecto, el bot aparece bajo el `name` de visualización del complemento. Sustituye eso con `bot.displayName`:

```json
{
  "name": "Compañero de Transmisión",
  "bot": {
    "displayName": "Compañero"
  }
}
```

En el chat, el bot publica como "Compañero" en lugar de "Compañero de Transmisión". La primera vez que se carga el complemento, Owncast provisiona un usuario de chat persistente claveado en el `slug` del complemento (por lo que la identidad del bot sobrevive reinstalaciones y cambios de nombre de visualización).

`bot.displayName` solo es relevante para los complementos que tienen el permiso `chat.send`. Se ignora de otra manera.

### `config`: configuraciones configurables por el administrador

Declara configuraciones tipadas aquí y Owncast renderiza un formulario editable para ellas en el administrador, que tu complemento lee en tiempo de ejecución con `owncast.config.get`. Cada entrada tiene un `type` (`string`, `number`, o `boolean`), un `default`, y una `description`:

```json
{
  "config": {
    "greeting": { "type": "string", "default": "bienvenido!", "description": "Mensaje de primerirse" },
    "cooldownMs": { "type": "number", "default": 2000, "description": "Descanso de comandos por usuario" },
    "modOnly": { "type": "boolean", "default": false, "description": "Restringido a moderadores" }
  }
}
```

Cobertura completa, incluyendo cómo se renderiza el formulario, enmascaramiento de credenciales, validación y dónde se almacenan los sobrescrituras, en [Configuración](/docs/plugins/configuration).

## `permissions`

Cada entrada desbloquea un fragmento de APIs del host. El host rechaza llamadas a un método cuyo permiso no declaraste.

```json
{
  "permissions": ["chat.send", "storage.kv", "network.fetch"]
}
```

Consulta [la referencia de permisos](/docs/plugins/permissions) para la lista completa de identificadores y lo que cada uno otorga.

## `network`: lista blanca de HTTP salientes

`network.fetch` está restringido por una lista de permitidos de nombres de host explícitos. Si declaras `network.fetch` en `permissions`, también necesitas un campo `network.allowedHosts` que enumere los hosts que llamarás:

```json
{
  "permissions": ["network.fetch"],
  "network": {
    "allowedHosts": ["api.discord.com", "*.weather.com"]
  }
}
```

Las entradas son comodines de nombres de host. Nombres simples como `api.discord.com` coinciden exactamente. `*` es un segmento comodín, por lo que `*.weather.com` coincide con `api.weather.com` y `data.weather.com` pero no con `weather.com` por sí mismo o `evil.com`.

El comodín `"*"` coincide con cualquier host, pero debes escribirlo explícitamente:

```json
{
  "network": { "allowedHosts": ["*"] }
}
```

Esto es intencional. Los administradores que revisan el manifiesto ven el alcance que están otorgando. La mayoría de los complementos deberían listar los hosts específicos que llaman en su lugar.

El host rechaza la carga si se concede `network.fetch` sin una entrada `allowedHosts`.

## `actions`: botones de acción

Los botones de acción son entradas clicables que Owncast muestra debajo de la transmisión. Mientras tu complemento esté habilitado, el host fusiona sus entradas en la lista que Owncast ya muestra.

```json
{
  "permissions": ["ui.modify", "http.serve"],
  "actions": [
    {
      "title": "Superposición de chat",
      "description": "Abrir la superposición de chat en vivo",
      "url": "/",
      "icon": "/star.png",
      "color": "#3b82f6"
    },
    {
      "title": "Rastreador de problemas",
      "url": "https://github.com/example/my-plugin/issues",
      "openExternally": true
    },
    {
      "title": "Acerca de esta transmisión",
      "html": "<p>En vivo cada día de la semana a las 8 p.m. UTC.</p>"
    }
  ]
}
```

Cada entrada:

| Campo            | Tipo     | Notas                                                                                                                   |
| ---------------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `title`          | cadena   | Requerido. La etiqueta del botón.                                                       |
| `url`            | cadena   | Ya sea una URL absoluta `https://...` o una ruta. Mutuamente exclusivo con `html`.      |
| `html`           | cadena   | HTML sin procesar renderizado en un modal en línea. Mutuamente exclusivo con `url`.     |
| `icon`           | cadena   | URL de imagen opcional que se muestra en el botón. Las mismas reglas de ruta que `url`. |
| `color`          | cadena   | Color hexadecimal opcional para el fondo del botón.                                                     |
| `description`    | cadena   | Opcional. Se muestra en el modal que se abre para acciones basadas en URL.              |
| `openExternally` | booleano | Si es `true`, la URL se abre en una nueva pestaña en lugar de un modal en línea.                        |

Reglas que el host aplica en el momento de carga:

- Se requiere permiso `ui.modify`. Sin él, el manifiesto es rechazado.
- Exactamente uno de `url` o `html` por entrada.
- Las URL relativas (y los iconos) que comienzan con `/` se prefijan automáticamente al espacio de nombres de tu plugin. `"/"` se convierte en `/plugins/my-plugin/`. `"/star.png"` se convierte en `/plugins/my-plugin/star.png`. Te evita codificar en duro el nombre de tu plugin.
- Las URL (y los iconos) que se resuelven en tu espacio de nombres requieren `http.serve`, dado que tú eres el que los sirve.
- Las URL (y los iconos) que apuntan al espacio de nombres de otro plugin son rechazados. Evita errores tipográficos y previene que un plugin publicite la interfaz de usuario de otro.

Cobertura completa en [UI: Botones de acción](/docs/plugins/ui#action-buttons).

## `admin`: páginas de administración

Los plugins pueden registrar páginas que aparecen en la interfaz de administración de Owncast bajo **Plugins**:

```json
{
  "permissions": ["http.serve"],
  "admin": {
    "pages": [
      { "title": "Configuraciones", "path": "/admin", "icon": "gear" }
    ]
  }
}
```

Cada entrada:

| Campo   | Tipo   | Notas                                                                                                                                                              |
| ------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `title` | cadena | Requerido. La etiqueta de la pestaña mostrada en la interfaz de administración.                                                    |
| `path`  | cadena | Requerido. Un patrón de ruta dentro del espacio de nombres de tu plugin (por ejemplo `"/admin"`, `"/admin/*"`). |
| `icon`  | cadena | Opcional. Un nombre semántico corto (`gear`, `wrench`, `user`, etc.).                           |

Las solicitudes bajo `/plugins/<your-slug>/<path>` que coinciden con cualquier patrón declarado requieren autorización por parte del host: las solicitudes no autenticadas obtienen un `401` antes de que se ejecute el código de tu plugin. Cobertura completa en [UI: Páginas de administración](/docs/plugins/ui#admin-pages).

## `styles`: inyección de CSS

Una lista de archivos CSS que el plugin contribuye a la página del visor. El contenido de cada archivo se inserta en el mismo bloque `<style>` que Owncast ya utiliza para el CSS personalizado del administrador, así que los plugins pueden personalizar la página sin que cada contribución necesite su propia etiqueta `<link>`.

```json
{
  "permissions": ["ui.modify"],
  "styles": ["theme.css", "overrides.css"]
}
```

Las reglas de ruta coinciden con las URL de los botones de acción:

- Las rutas simples como `"theme.css"` se prefijan automáticamente al espacio de nombres de tu plugin.
- Las rutas con una sola barra como `"/theme.css"` reciben el mismo tratamiento.
- Las rutas completamente calificadas `/plugins/<your-slug>/...` pasan sin cambios.
- Las rutas en el espacio de nombres de otro plugin son rechazadas.
- Las URL `http://` y `https://` son rechazadas. Agrupa activos externos (fuentes, imágenes) y refiérete a ellos con `@font-face` o `url(...)` desde dentro de tu CSS, para que un administrador que revisa el manifiesto vea cada archivo que aterrizará en su página.
- Cada entrada debe terminar en `.css`.

Requiere únicamente `ui.modify` (el plugin se pinta dentro del marco de Owncast). No se necesita `http.serve`: los bytes de cada archivo se leen de `assets/` y se insertan en `customStyles` en `/api/config`, no se sirven en una URL. El host emite un `/* plugin: <your-slug> ... */` comentario al frente de cada contribución para que un lector pueda atribuir una regla de vuelta al plugin que la envió.

Para CSS que depende del estado del plugin, un manejador `onPageStyles` lo devuelve en el momento de la solicitud, sin campo de manifiesto. Su salida se agrega a `customStyles` después de estos archivos estáticos.

Cobertura completa en [UI: Hojas de estilo del visor](/docs/plugins/ui#viewer-stylesheets).

## `scripts`: inyección de JavaScript

Una lista de archivos JavaScript que el plugin contribuye a la página del visor. El contenido de cada archivo se agrega a la misma respuesta de la que ya proviene el JavaScript personalizado del administrador (`/customjavascript`), de modo que los plugins pueden extender la página sin que cada contribución necesite su propia etiqueta `<script>`.

```json
{
  "permissions": ["ui.modify"],
  "scripts": ["client.js"]
}
```

Las reglas de ruta y permisos requeridos coinciden con `styles`, aplicados a archivos `.js` (solo se necesita `ui.modify`, y el host lee de `assets/` y los inserta en `/customjavascript`). Envuelve tu script en un IIFE para que las declaraciones a nivel superior no colisionen con el JavaScript del administrador o con otros plugins. El host emite un `// plugin: <your-slug> ...` comentario al frente de cada contribución y envuelve cada contribución en un bloque try/catch, de modo que un error en tiempo de ejecución de un plugin no pueda romper los demás.

Para JavaScript que depende del estado del plugin, un manejador `onPageScripts` lo devuelve en el momento de la solicitud, sin campo de manifiesto. Su salida se agrega a `/customjavascript` después de estos archivos estáticos.

Cobertura completa en [UI: Scripts del visor](/docs/plugins/ui#viewer-scripts).

## `extraPageContent`: bloque HTML

Un objeto que contribuye un bloque HTML al área de contenido adicional del visor, precedido por el texto del administrador en `/api/config`.

```json
{
  "permissions": ["ui.modify"],
  "extraPageContent": { "slug": "banner", "content": "content.html" }
}
```

| Campo     | Tipo   | Notas                                                                                                                                                                                                                                                                   |
| --------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `slug`    | cadena | Requerido solo cuando se omite `content` (el host lo pasa a `onPageContent`). Opcional de otro modo. Letras minúsculas, dígitos y guiones, comenzando con una letra.                                 |
| `content` | cadena | Opcional. Ruta relativa a un archivo HTML estático en `assets/`. Cuando está presente, los bytes de ese archivo se insertan directamente. Cuando se omite, el host llama a `onPageContent` en su lugar. |

**Estático** (con `content`): el host lee el archivo en el momento de la solicitud e inserta los bytes. Las mismas reglas de ruta que `styles` y `scripts`, aplicadas a una sola entrada `.html`. El HTML del plugin elude el procesador de markdown para que las etiquetas y atributos pasen tal como están escritos.

**Dinámico** (sin `content`): implementa `onPageContent({ slug, user? })` en tu plugin para devolver HTML en el momento de la solicitud. Usa esto cuando el contenido debe variar por espectador o basarse en datos en vivo (por ejemplo, saludos personalizados o estadísticas actuales del stream). `user` es la identidad de chat del espectador, presente cuando está autenticado.

Requiere `ui.modify`. `http.serve` no es requerido porque el HTML se inserta en la respuesta de configuración, no se sirve como una URL. Cada contribución está envuelta con un `<!-- plugin: <your-slug> ... -->` comentario para que un lector pueda atribuir el marcado de vuelta.

Cobertura completa en [UI: Contenido de página adicional](/docs/plugins/ui#extra-page-content).

## `tabs`: pestañas de la página del espectador

Una lista de pestañas que el plugin contribuye a la fila de pestañas de la página del espectador (junto a las pestañas incorporadas **Acerca de** y **Seguidores**). Cada entrada requiere `title`. `content` es opcional, y `slug` es requerido solo cuando se omite `content` (de lo contrario se deriva de `title`).

```json
{
  "permissions": ["ui.modify"],
  "tabs": [
    { "title": "Música",    "slug": "music",    "content": "music.html" },
    { "title": "Calendario", "slug": "schedule", "content": "schedule.html" }
  ]
}
```

Cada entrada tiene:

| Campo     | Notas                                                                                                                                                                                                                                                                                                                                                                                      |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `title`   | Requerido. La etiqueta mostrada en la pestaña.                                                                                                                                                                                                                                                                                                             |
| `slug`    | Requerido solo cuando se omite `content` (derivado de `title` de lo contrario). Identificador estable pasado a `onTabContent` cuando el host solicita HTML renderizado. Letras minúsculas, dígitos y guiones, comenzando con una letra. Debe ser único dentro de las pestañas del plugin.               |
| `content` | Opcional. Ruta relativa a un archivo HTML en `assets/`. Las mismas reglas de ruta que `extraPageContent` (prefijo automático a tu espacio de nombres, rutas cruzadas de plugins y URL `http(s)://` rechazadas, deben terminar en `.html`). Cuando se omite, el host llama a `onTabContent` en su lugar. |

Requiere `ui.modify`. `http.serve` no es requerido: el HTML de cada pestaña se lee de `assets/` y se inserta en el array `pluginTabs[]` en `/api/config`. La página del espectador mapea cada entrada a una pestaña cuyo cuerpo renderiza directamente el HTML.

Cobertura completa en [UI: Pestañas de la página del espectador](/docs/plugins/ui#viewer-page-tabs).

## Contrato de manifiesto a tiempo de ejecución

Cuando tu plugin se carga, el host analiza el manifiesto y le pide al tiempo de ejecución que se registre. Compara los dos y rechaza la carga si no están de acuerdo en:

- `slug` (el identificador canónico)
- `version`
- Cualquier permiso que el tiempo de ejecución usa y que no fue declarado en el manifiesto

No escribes el registro tú mismo: el SDK lo genera a partir de los manejadores que defines (consulta tu [referencia de SDK](/docs/plugins) para ver cómo se declaran los manejadores en tu lenguaje). Saber que existe este contrato es útil al depurar. Un error "permiso solicitado en tiempo de ejecución no declarado en el manifiesto" significa que agregaste un manejador que necesita un permiso que olvidaste listar.

## Ejemplo completo

Un manifiesto no trivial que utiliza la mayoría de las características:

```json
{
  "api": "1",
  "name": "Stream Sidekick",
  "slug": "stream-sidekick",
  "version": "0.2.0",
  "description": "Publica en Discord al inicio del stream, muestra una superposición y añade un botón de donar.",
  "permissions": [
    "chat.send",
    "chat.filter",
    "storage.kv",
    "http.serve",
    "http.sse",
    "network.fetch",
    "notifications.send",
    "ui.modify"
  ],
  "bot": {
    "displayName": "Sidekick"
  },
  "network": {
    "allowedHosts": ["api.discord.com", "*.example.com"]
  },
  "actions": [
    {
      "title": "Donar",
      "url": "https://example.com/donate",
      "openExternally": true
    }
  ],
  "admin": {
    "pages": [
      { "title": "Configuraciones del Sidekick", "path": "/admin", "icon": "gear" }
    ]
  },
  "styles": ["sidekick.css"],
  "scripts": ["sidekick.js"],
  "extraPageContent": { "slug": "intro", "content": "intro.html" },
  "tabs": [
    { "title": "Calendario", "slug": "schedule", "content": "schedule.html" }
  ]
}
```
