---
title: SDK de Python
description: 'Escribe plugins de Owncast en Python con owncast-plugin-py: instala, los decoradores @plugin, la CLI de owncast-plugin-py y pruebas.'
sidebar_position: 3
sidebar_label: Python
toc_min_heading_level: 2
toc_max_heading_level: 3
tags:
  - plugins
  - sdk
  - python
---

El SDK de Python, `owncast-plugin-py`, te permite crear plugins de Owncast en **Python**. Escribes Python ordinario con decoradores. Un paso de construcción lo convierte en un solo plugin instalable que se ejecuta en un entorno seguro dentro del servidor Owncast: el mismo formato `.ocpkg` y conjunto completo de funciones que el [SDK de JavaScript](/docs/plugins/sdks/javascript), así que un plugin de Python es un compañero de primera clase de uno de JS.

:::info[Novedades en Owncast 0.3.0]
Los SDK de plugins son completamente nuevos en Owncast 0.3.0 y la API aún está evolucionando. Si encuentras un error o tienes una sugerencia, por favor [abre un problema](https://github.com/owncast/plugin-sdk/issues) o [chatea en vivo con la comunidad](/chat?tab=community).
:::

Esta página es la capa específica de Python: instala, los decoradores `@plugin`, la CLI de `owncast-plugin-py` y pruebas. Manejadores, APIs, permisos y el manifiesto funcionan igual en ambos SDK y tienen sus propias páginas de referencia.

## Cómo se mapea a la documentación de referencia

Los nombres de referencia compartidos manejadores y APIs en su forma canónica (camelCase). Para leerlo como Python, aplica una regla: **todo es `snake_case`.** Orientación rápida:

| En la referencia                                                                     | En Python                                                                                                                                                                 |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Define un manejador                                                                  | una función decorada con `@plugin.*`                                                                                                                                      |
| Manejador para un evento (por ejemplo, `chat.message.received`)   | `@plugin.on_chat_message`                                                                                                                                                 |
| Llama a una API del host (por ejemplo, `owncast.chat.sendAction`) | `owncast.chat.send_action(text)`: snake_case                                                                                         |
| Campos de carga útil (por ejemplo, `msg.user.displayName`)        | `msg.user.display_name`, `msg.client_id`. `msg.raw` para el diccionario crudo                                                                             |
| Resultado del filtro (`filter.pass()`)                            | `filter.pass_()` (guion bajo final: `pass` es una palabra clave). También `filter.modify(...)` / `filter.drop(reason)` |
| Suscribirse a un evento personalizado                                                | `@plugin.on("my.event")`                                                                                                                                                  |
| Construye / prueba tu plugin                                                         | `owncast-plugin-py package` / `owncast-plugin-py test`                                                                                                                    |

## Requisitos previos

- Un servidor Owncast que puedas administrar, versión 0.3.0 o más reciente.
- Python 3.8 o más reciente.

## Instalar

Empieza un proyecto con `new`, pasando el slug. `uvx` ejecuta el generador directamente desde PyPI sin instalar nada:

```sh
uvx owncast-plugin-py new my-plugin
cd my-plugin
```

Instala el SDK para obtener la CLI de `owncast-plugin-py` en tu PATH para los pasos de construcción, prueba, servicio y empaquetado:

```sh
uv tool install owncast-plugin-py      # o:  pip install owncast-plugin-py
```

Tienes un directorio listo para construir:

```text
my-plugin/
├── plugin.manifest.json     nombre, slug, versión, permisos
├── README.md                cómo construir, probar, empaquetar e instalar
├── INSTRUCTIONS.md          opcional, renderizado como una pestaña en el administrador
├── AGENTS.md                notas para agentes de codificación de IA
├── .agents/                 una habilidad empaquetada para agentes de codificación de IA
├── src/plugin.py            tu código, con un manejador de muestra
└── __tests__/*.test.json    una prueba de escenario de muestra
```

## Escribir un plugin

Importa `plugin`, `owncast`, y `filter`, y registra manejadores con decoradores. Cada decorador se suscribe a un evento. El SDK obtiene la lista de suscripciones del manifiesto a partir de los manejadores que defines.

```python
from owncast_plugin import plugin, owncast, filter


@plugin.on_chat_message
def greet(msg):
    name = msg.user.display_name if msg.user else "someone"
    owncast.chat.send(f"{name} dijo: {msg.body}")


@plugin.filter_chat_message
def block_spam(msg):
    return filter.drop("spam") if "spam" in msg.body else filter.pass_()
```

El módulo exporta tres cosas:

- **`plugin`**: el registro de decoradores. `@plugin.on_chat_message`, `@plugin.filter_chat_message`, `@plugin.on_stream_started`, `@plugin.on_tick`, `@plugin.on_fediverse_follow`, y el resto reflejan los eventos en tiempo de ejecución en la [referencia de manejadores](/docs/plugins/events). Dos requieren una clave: `@plugin.on("custom.event")` para eventos emitidos por el plugin y `@plugin.on_tab_content("slug")` / `@plugin.on_page_content("slug")` para HTML de página de visualizador dinámico. Dos no requieren clave: `@plugin.on_page_styles` y `@plugin.on_page_scripts` devuelven CSS y JavaScript inyectados en la página de visualizador en el momento de la solicitud, bajo `ui.modify`.
- **`owncast`**: el espacio de nombres de la API del host. Los nombres de los métodos son **`snake_case`** (`owncast.chat.send_action`, `owncast.kv.get_json`). Cada llamada está controlada por el permiso correspondiente declarado en tu manifiesto. Consulta la [referencia de APIs](/docs/plugins/apis).
- **`filter`**, resultados de filtro devueltos de un manejador `filter_chat_message`: `filter.pass_()` (guion bajo final, `pass` es una palabra clave de Python), `filter.modify(...)`, `filter.drop(reason)`.

Las cargas útiles son objetos atributo con accesores `snake_case` sobre el JSON de la red (`msg.body`, `msg.user.display_name`, `msg.client_id`). Usa `msg.raw` para el diccionario subyacente. Las llamadas del host que devuelven objetos JSON regresan como los mismos objetos atributo (`owncast.server.info().name`). Las listas regresan como listas de Python.

Dos más modismos de Python que vale la pena conocer, ambos documentados en su totalidad (con ejemplos de Python) en las páginas temáticas:

- **Enrutamiento HTTP**: los plugins con `http.serve` declaran rutas con decoradores: `@plugin.get/post/put/delete/patch(path)`, `@plugin.route(path, methods=[...])`, `@plugin.on_http_request(path)`, y un simple `@plugin.on_http_request` captura todo. Un manejador devuelve un `dict` (`{status, body, headers}`), un `str` (→ 200), o `None` (→ 204). Consulta [Sirviendo HTTP](/docs/plugins/http).
- **Comandos de chat**: `plugin.commands({...})` declara comandos con alias, control de moderador y tiempos de espera por usuario. El integrado `!help` los lista automáticamente. Consulta [Comandos de chat](/docs/plugins/commands).

## La CLI

Instalar el SDK te da `owncast-plugin-py`. Construyendo y empaquetando tu fuente y no necesitas compilador. Los comandos `test` y `serve` obtienen los binarios de host preconstruidos (el ejecutor de escenarios y el servidor de desarrollo) en su primer uso:

| Comando                               | Lo que hace                                                                                               |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `owncast-plugin-py new my-plugin`     | Genera un nuevo proyecto de plugin en `./my-plugin`                                                       |
| `owncast-plugin-py build my-plugin`   | Construye `src/plugin.py` (sin empaquetar)                                             |
| `owncast-plugin-py test my-plugin`    | Construye, luego ejecuta los escenarios de `__tests__/`                                                   |
| `owncast-plugin-py serve my-plugin`   | Servidor de desarrollo local (`-p/--port` para cambiar el puerto, predeterminado 8080) |
| `owncast-plugin-py package my-plugin` | Construye + empaqueta → `<slug>.ocpkg`: el archivo que envías                             |

```sh
owncast-plugin-py package my-plugin    # produce my-plugin.ocpkg
owncast-plugin-py test my-plugin
owncast-plugin-py serve my-plugin      # POST /_dev/chat para activar manejadores de eventos
```

El argumento del directorio predeterminado es `.`, así que puedes `cd` al proyecto y omitirlo. .ocpkg es el único artefacto de distribución. Consulta [Empaquetado y distribución](/docs/plugins/packaging) para lo que va dentro y cómo instalarlo.

## Restricciones a conocer

Algunas cosas sobre cómo se construyen los plugins de Python moldean cómo los escribes. Importas `owncast_plugin` normalmente para soporte de editor y pruebas unitarias. La construcción se encarga del resto.

- **Solo Pure-Python, y no `pip`.** No hay un paso `pip install`: agregas código de terceros copiando su fuente (Pure-Python) en tu proyecto. Dependencias con extensiones C (numpy, pandas, etc.) no se cargarán. Consulta [Bibliotecas de terceros](#third-party-libraries). Para HTTP saliente usa `owncast.http.fetch`, no `requests`.
- **No oscures nombres de la biblioteca estándar.** Un `def json(...)` de nivel superior (o cualquier otro nombre de stdlib) oscurece el módulo real y puede romper la construcción, y un archivo de módulo llamado como un módulo de stdlib (`src/json.py`) es ignorado a favor del real. Nómbralos `json_response` y cosas por el estilo.
- **La entrada no puede usar importaciones relativas.** En `src/plugin.py`, importa tus propios módulos de forma absoluta (`from helpers import ...`), no `from . import helpers`. Una importación relativa ahí falla la construcción, aunque las importaciones relativas dentro de los propios módulos de un paquete están bien.
- **`snake_case` en todas partes**, en contraste con el camelCase del SDK de JS: `send_action`, `get_json`, `msg.user.display_name`, `filter.pass_()`.

## Bibliotecas de terceros

No hay `pip install` y no hay `requirements.txt`. Una biblioteca de terceros funciona solo si es **Python puro y copias su fuente en `src/`**, donde se convierte en uno de tus propios módulos.

:::caution[pip install no hace nada]
Instalar un paquete en un virtualenv no afecta lo que envías, y `import requests` falla en tiempo de ejecución. Para usar una biblioteca, copia su fuente `.py` en `src/` (un solo módulo o un directorio de paquete) y luego imprtala.
:::

- **Las extensiones C nunca funcionan.** numpy, pandas, lxml, Pydantic v2, y cualquier otra cosa con código compilado no se cargarán.
- **Tú posees todo el árbol.** Si una biblioteca que copias importa otros paquetes de terceros, cópialos también, o elige uno más pequeño.
- **Usa `owncast.http.fetch` para HTTP saliente**, no `requests`.

La biblioteca estándar está disponible, siempre que el módulo sea Python puro (`json`, `re`, `datetime`, `base64`, etc.).

Por ejemplo, el ejemplo [`page-content-demo`](https://github.com/owncast/plugin-sdk/tree/main/examples/python/page-content-demo) necesita plantillas Mustache. En lugar de copiar un paquete de plantillas, envía un pequeño renderizador de Mustache-subconjunto propio.

## Pruebas

Las pruebas son archivos de escenario `__tests__/*.test.json` ejecutados con `owncast-plugin-py test`. El formato es **idéntico al SDK de JS**, así que un puerto de un plugin de Python puede reutilizar los escenarios de prueba de la versión de JS textualmente. Cada escenario despacha eventos / solicitudes HTTP y aserciones sobre efectos secundarios observados (`chatSends`, escrituras kv, respuestas HTTP, …).

```json
[
  {
    "name": "eco el mensaje",
    "events": [
      {
        "event": "chat.message.received",
        "payload": { "user": { "id": "u1", "displayName": "alice" }, "body": "hi" }
      }
    ],
    "expect": { "chatSends": ["alice dijo: hi"] }
  }
]
```

El modelo de datos completo del escenario (tipos de pasos, estado `given`, aserciones `expect`) está en la página de [Pruebas](/docs/plugins/testing). Ten en cuenta que el JSON del escenario usa los nombres de campo **wire** (camelCase: `displayName`, `clientId`), ya que describe eventos del host, no tu código Python.

## Estado

El tiempo de ejecución, la CLI de `owncast-plugin-py` (generar, construir, probar, servir, empaquetar), la API completa del host, el enrutamiento HTTP y el empaquetado `.ocpkg` funcionan todos hoy. Todos los plugins de ejemplo de JS tienen contrapartes de Python en [`examples/python/`](https://github.com/owncast/plugin-sdk/tree/main/examples/python).

## Dónde ir después

- [Referencia de manejadores](/docs/plugins/events): cada evento al que puedes suscribirte (lee nombres como `snake_case`).
- [Referencia de APIs](/docs/plugins/apis): cada método `owncast.*` y el permiso que necesita.
- [Pruebas](/docs/plugins/testing): el modelo de datos completo del escenario.
- [Empaquetado y distribución](/docs/plugins/packaging): construyendo el `.ocpkg` e instalándolo.
- [Ejemplos de plugins de Python](https://github.com/owncast/plugin-sdk/tree/main/examples/python): uno por característica, cada uno un punto de partida completo que puedes copiar.
- [Código fuente del SDK](https://github.com/owncast/plugin-sdk): el paquete y la cadena de herramientas `owncast-plugin-py`.
