---
title: ActivityPub y el Protocolo Fediverse
description: Una referencia a nivel de protocolo para las actividades de ActivityPub que Owncast envía y recibe, para que puedas construir una aplicación del Fediverse que interopere con los servidores de Owncast.
sidebar_position: 50
sidebar_label: protocolo ActivityPub
toc_min_heading_level: 2
toc_max_heading_level: 3
tags:
  - activitypub
  - federación
  - fediverse
  - protocolo
  - mastodon
  - integración
  - nodeinfo
  - webfinger
---

# ActivityPub y el Protocolo Fediverse

Esta página documenta la implementación de [ActivityPub](https://www.w3.org/TR/activitypub/) dentro de Owncast a nivel de protocolo: qué actividades un servidor **envía**, qué **recibe**, cómo se identifica y cómo firma y verifica solicitudes. Está dirigido a desarrolladores que desean construir una aplicación del Fediverse que interopere con Owncast, ya sea que signifique seguir a un servidor Owncast desde otra plataforma, consumir sus notificaciones en vivo, o construir herramientas que entiendan las extensiones personalizadas de Owncast.

Si eres un operador de Owncast y solo deseas activar la federación, consulta [El Fediverse](/docs/social/the-fediverse) y [Habilitando funciones sociales](/docs/social#enabling-social-features) en su lugar. Esta página asume familiaridad con ActivityPub, ActivityStreams 2.0, JSON-LD y las Firmas HTTP.

## Modelo mental

Un servidor Owncast se federará como un **único actor** de tipo `Service`. Hay una cuenta por servidor (nombre de usuario predeterminado `live`), y representa el stream en sí en lugar de a una persona. Comparado con un servidor social de propósito general, el modelo es intencionadamente restringido:

- El actor **envía** publicaciones a sus seguidores (lo más importante, una notificación de "ir en vivo") y un "ping" de stream periódico.
- El actor **recibe** seguimientos, gustos, impulsos (anuncios) y un puñado de actividades de servidor a servidor, pero **no** acepta publicaciones o respuestas entrantes (se rechaza intencionadamente `Create`).
- Hay exactamente un usuario, no hay registro abierto, y la colección `following` siempre está vacía.

Todos los puntos finales de federación devuelven `405 Method Not Allowed` cuando la federación está desactivada, así que verifica eso primero si un servidor parece inaccesible.

## Descubrimiento

Una aplicación remota localiza y describe un actor de Owncast a través de los mecanismos estándar de descubrimiento bien conocidos.

### WebFinger

```
GET /.well-known/webfinger?resource=acct:{username}@{host}
```

El `resource` debe ser una URI `acct:` cuyo host coincida con el host configurado del servidor (de lo contrario, la solicitud se rechaza con `501`/`400`). La respuesta se sirve como `application/jrd+json`:

```json
{
  "subject": "acct:live@owncast.example.com",
  "aliases": ["https://owncast.example.com/federation/user/live"],
  "links": [
    {
      "rel": "self",
      "type": "application/activity+json",
      "href": "https://owncast.example.com/federation/user/live"
    },
    {
      "rel": "http://webfinger.net/rel/profile-page",
      "type": "text/html",
      "href": "https://owncast.example.com/federation/user/live"
    },
    {
      "rel": "http://webfinger.net/rel/avatar",
      "type": "image/png",
      "href": "https://owncast.example.com/logo/external"
    },
    {
      "rel": "alternate",
      "type": "application/x-mpegURL",
      "href": "https://owncast.example.com/hls/stream.m3u8"
    }
  ]
}
```

El enlace `self` es el IRI canónico del actor. Nota el enlace `alternate` específico de Owncast de tipo `application/x-mpegURL`: apunta directamente a la lista de reproducción HLS para el stream, lo que permite a los clientes descubrir el video en vivo sin raspar la interfaz web.

### host-meta

```
GET /.well-known/host-meta
```

Devuelve un documento XRD que apunta de vuelta al punto final de WebFinger, para clientes que inician desde host-meta:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0">
  <Link rel="lrdd" type="application/json"
        template="https://owncast.example.com/.well-known/webfinger?resource={uri}"/>
</XRD>
```

### NodeInfo

Owncast expone metadatos a nivel de servidor a través de [NodeInfo](https://nodeinfo.diaspora.software/) para que los rastreadores del Fediverse, directorios y sitios de estadísticas puedan describir la instancia.

**Descubrimiento de NodeInfo** — `GET /.well-known/nodeinfo`:

```json
{
  "links": [
    {
      "rel": "http://nodeinfo.diaspora.software/ns/schema/2.0",
      "href": "https://owncast.example.com/nodeinfo/2.0"
    }
  ]
}
```

**NodeInfo 2.0** — `GET /nodeinfo/2.0`:

```json
{
  "version": "2.0",
  "software": {
    "name": "owncast",
    "version": "0.2.x"
  },
  "protocols": ["activitypub"],
  "services": {
    "inbound": [],
    "outbound": []
  },
  "usage": {
    "users": {
      "total": 1,
      "activeMonth": 1,
      "activeHalfyear": 1
    },
    "localPosts": 42
  },
  "openRegistrations": false,
  "metadata": {
    "chat_enabled": true,
    "federation": {
      "username": "live",
      "featured_streams": 1
    }
  }
}
```

La mayor parte de esto es NodeInfo estándar, con algunas señales específicas de Owncast que vale la pena mencionar:

- **`software.name`** es siempre `owncast`. Esta es la forma más confiable de detectar que estás hablando con un servidor Owncast.
- **`usage.users.total`** es siempre `1` y **`openRegistrations`** es siempre `false` — una instancia de Owncast es un servidor de un solo actor, no una comunidad de múltiples usuarios.
- **`usage.localPosts`** es el conteo de actividades que el servidor ha enviado (notificaciones de ir en vivo y otros mensajes públicos), lo que es un proxy útil para cuán activo está el stream.
- **`metadata.chat_enabled`** refleja si el chat integrado de Owncast está habilitado.
- **`metadata.federation`** es el bloque específico de Owncast:
  - **`username`** es el nombre de usuario preferido del actor (predeterminado `live`). Combinado con el host, esto te da el handle `acct:` sin un viaje separado a WebFinger.
  - **`featured_streams`** indica la participación en el flujo de streams destacados / mini-directorio (ver [Pings de stream](#offer--stream-ping-outbound) a continuación). Un valor de `1` significa que el servidor anuncia su estado en vivo a los seguidores mediante actividades periódicas de `Offer`.

**x-nodeinfo2** — `GET /.well-known/x-nodeinfo2` proporciona la misma información en la forma alternativa [x-nodeinfo2](https://github.com/jaywink/xnodeinfo2) utilizada por algunos directorios, incluyendo un bloque `organization` (`name`, `contact`) y una cifra de usuario `activeWeek`. Aquí `services.inbound`/`services.outbound` son ambos `["activitypub"]`.

**API de instancia Mastodon** — `GET /api/v1/instance` devuelve una descripción de instancia compatible con Mastodon (`uri`, `title`, `short_description`, `description`, `version`, `thumbnail`, `stats`, y flags de registro) para que las herramientas conscientes de Mastodon puedan renderizar una tarjeta de instancia familiar. `stats.user_count` es `1`, `stats.status_count` es el conteo de publicaciones locales, y los registros/aprobaciones/invites están todos deshabilitados.

## El actor

```
GET /federation/user/{username}
Accept: application/activity+json
```

Solicitar el IRI del actor con un encabezado `Accept` de ActivityStreams devuelve el documento del actor. Owncast se representa a sí mismo como un **`Service`** (no como una `Person`). La forma es:

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    "https://w3id.org/security/v1"
  ],
  "type": "Service",
  "id": "https://owncast.example.com/federation/user/live",
  "preferredUsername": "live",
  "name": "Mi servidor Owncast",
  "summary": "Descripción del servidor / biografía",
  "url": "https://owncast.example.com/federation/user/live",
  "published": "2023-01-01T00:00:00Z",
  "manuallyApprovesFollowers": false,
  "discoverable": true,
  "inbox": "https://owncast.example.com/federation/user/live/inbox",
  "outbox": "https://owncast.example.com/federation/user/live/outbox",
  "followers": "https://owncast.example.com/federation/user/live/followers",
  "icon": {
    "type": "Image",
    "mediaType": "image/png",
    "url": "https://owncast.example.com/logo/external?uc=..."
  },
  "image": {
    "type": "Image",
    "url": "https://owncast.example.com/logo/external?uc=..."
  },
  "tag": [
    {
      "type": "Hashtag",
      "name": "#owncast",
      "href": "https://owncast.directory/tags/owncast"
    }
  ],
  "attachment": [
    {
      "type": "PropertyValue",
      "name": "Sitio web",
      "value": "<a href=\"...\">...</a>"
    }
  ],
  "publicKey": {
    "id": "https://owncast.example.com/federation/user/live#main-key",
    "owner": "https://owncast.example.com/federation/user/live",
    "publicKeyPem": "-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----"
  }
}
```

Puntos clave para una implementación interoperable:

- **El diseño del IRI del actor** es `{server}/federation/user/{username}`, y las colecciones cuelgan de él: `{actor}/inbox`, `{actor}/outbox`, `{actor}/followers`.
- **`following`** se solicita en `{actor}/following` pero siempre devuelve `404` — Owncast nunca expone una lista de seguimiento.
- **`manuallyApprovesFollowers`** refleja si el servidor está en modo de federación _privado_. Cuando `true`, las solicitudes de seguimiento no se aceptan automáticamente.
- **`discoverable`** siempre es `true` (usando la semántica del espacio de nombres `toot:`).
- La **clave pública** vive en `{actor}#main-key`, es una clave RSA-2048 en forma PEM (PKIX), y es lo que usas para verificar las firmas HTTP del servidor.

## Firmas HTTP

Owncast firma sus solicitudes salientes y verifica las entrantes usando el esquema de encabezado HTTP "Signature" ([draft-cavage HTTP signatures](https://datatracker.ietf.org/doc/html/draft-cavage-http-signatures), como se usa en todo el Fediverse).

### Verificando solicitudes que Owncast te envía

Cuando Owncast POSTea una actividad a tu inbox incluye:

- Un encabezado `Signature` con `keyId="{actor}#main-key"`, `algorithm="rsa-sha256"`, y la lista de `headers` firmados.
- Los encabezados firmados cubren `(request-target)`, `host`, `date` y `digest`.
- Un encabezado `Digest` que contiene el digest SHA-256 del cuerpo de la solicitud.
- `Content-Type: application/activity+json` y un `User-Agent` de la forma `{version}; https://owncast.online`.

Para verificar: obtén el actor en `keyId`, lee `publicKey.publicKeyPem`, y verifica tanto la firma como el digest del cuerpo.

### Firmando solicitudes que envías a Owncast

Owncast verifica la firma de cada actividad entregada a su inbox:

1. Analiza `keyId` y `algorithm` de tu encabezado `Signature`. El `keyId` **debe** ser una URL `https://`.
2. Resuelve tu actor y obtiene tu clave pública.
3. Verifica que el dominio propietario de tu clave **no** esté en la lista de dominios bloqueados de la instancia y que el propio actor no esté bloqueado.
4. Verifica la firma, probando el algoritmo declarado y luego volviendo a `rsa-sha256` y `rsa-sha512`.
5. Verifica el encabezado `Digest` contra el cuerpo de la solicitud.

En la práctica, esto significa: firmar `(request-target) host date digest` con una clave RSA, publicar esa clave en el campo `publicKey` de tu actor, incluir un `Digest` SHA-256, y servir tu actor a través de HTTPS.

## Actividades que Owncast envía (salientes)

Todas las actividades salientes se originan del actor del servidor y se entregan a los inboxes de los seguidores (prefiriendo `sharedInbox` donde un seguidor anuncie uno). Las actividades públicas están dirigidas a `https://www.w3.org/ns/activitystreams#Public` en `to` con la colección de seguidores en `cc`; en modo privado se dirigen solo a la colección de seguidores.

| Actividad | Objeto            | Cuando                                                                                               | Enviado a                                 |
| --------- | ----------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `Create`  | `Note`            | El stream se hace en vivo (el mensaje "ir en vivo"); otras publicaciones públicas | Seguidores (+ Público) |
| `Update`  | `Service`         | El perfil del servidor (nombre, avatar, resumen, etc.) cambios    | Seguidores                                |
| `Follow`  | actor IRI         | Un operador sigue a otro servidor Owncast (flujo de streams destacados)           | El servidor de destino                    |
| `Offer`   | URL del servidor  | Periódicamente mientras está en vivo, como un "ping" de stream                                       | Seguidores del directorio                 |
| `Accept`  | `Follow` entrante | En respuesta a un `Follow` recibido                                                                  | El seguidor                               |
| `Reject`  | `Follow` entrante | Cuando el operador elimina un directorio que estaba listando este servidor                           | Ese directorio                            |

### Crear / Nota — ir en vivo

La actividad más importante. Cuando el stream se hace en vivo, Owncast envía un `Create` envolviendo un `Note`. El `Note` contiene `content` HTML (el mensaje configurable de ir en vivo, el título del stream, enlaces de hashtags y un enlace de vuelta al servidor), etiquetas `Hashtag`, y — cuando está disponible — un archivo adjunto de `Image` con la vista previa del stream (`preview.gif` o `thumbnail.jpg`). Si el servidor está marcado como NSFW, la nota lleva `sensitive: true`. Los hashtags enlazan a `https://owncast.directory/tags/{tag}`, y un hashtag `#owncast` siempre se adjunta.

Esta es la actividad que más les importa a los consumidores: suscríbete siguiendo al actor, luego observa el inbox para actividades `Create`/`Note` que indiquen cuándo comienza un stream.

### Oferta / ping de stream (saliente)

Esta es una extensión de Owncast que admite la función de **streams destacados / mini-directorio**. Mientras está en vivo, el servidor envía periódicamente una actividad `Offer` cuyo `object` es la URL del servidor, llevando [metadatos personalizados de Owncast](#owncast-custom-namespace) (estado del stream, título, descripción, nombre del servidor, logo, etiquetas). Permite que un directorio receptor mantenga su lista de streams en vivo actualizada sin sondear. La señal que coincide fuera de línea es la actividad entrante [`Leave`](#server-to-server-activities). Owncast envía `Offer` y `Leave` solo a seguidores que se identificaron como un directorio (ver [el espacio de nombres personalizado](#owncast-custom-namespace)), nunca a seguidores ordinarios fanáticos.

### Actualizar, Seguir, Aceptar

- **`Update`** del actor `Service` se envía a los seguidores cuando cambian los metadatos del perfil del servidor, para que las cachés remotas se actualicen.
- **`Follow`** se envía cuando un operador sigue a otro servidor Owncast. El servidor luego espera un `Accept` (o `Reject`) de vuelta.
- **`Aceptar`** se envía automáticamente en respuesta a un `Seguir` entrante cuando el servidor está en modo público (auto-aprobar).

## Actividades que Owncast recibe (entrantes)

Entregue estos publicando una actividad firmada en la `bandeja de entrada` del actor. Owncast en cola, verifica la firma y envía cada uno.

| Actividad                           | Manejo                                                                                                                                                                                                                                                                                                                                                                                                                |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Seguir`                            | Almacena al seguidor; auto-aprueba y devuelve `Aceptar` en modo público (recibido para aprobación en modo privado). Un seguimiento que lleva el marcador `ns#directory` siempre se mantiene para aprobación manual independientemente del modo, y no emite el evento de seguimiento. De lo contrario, emite un evento `FediverseEngagementFollow`. |
| `Deshacer` → `Seguir`               | Elimina al seguidor.                                                                                                                                                                                                                                                                                                                                                                                  |
| `Me gusta`                          | Registra un compromiso contra un objeto local. Emite `FediverseEngagementLike`.                                                                                                                                                                                                                                                                                                       |
| `Anunciar`                          | Repostear/republicar un objeto local. Registra un compromiso y emite `FediverseEngagementRepost`.                                                                                                                                                                                                                                                                                     |
| `Aceptar` → `Seguir`                | Marca a un servidor remoto de Owncast que seguimos como aceptado (flujo de flujos destacados).                                                                                                                                                                                                                                                                                     |
| `Rechazar` → `Seguir`               | Marca nuestro seguimiento de un servidor remoto como rechazado.                                                                                                                                                                                                                                                                                                                                       |
| `Ofrecer`                           | Un ping de flujo desde otro servidor Owncast. Si lleva `streamStatus: "live"`, Owncast marca ese servidor como en línea en su tabla de servidores federados y almacena los metadatos transmitidos.                                                                                                                                                                                    |
| `Dejar`                             | El contraparte fuera de línea de `Ofrecer`: marca la transmisión del servidor remoto de Owncast como fuera de línea.                                                                                                                                                                                                                                                                  |
| `Actualizar` → `Persona`/`Servicio` | Actualiza los metadatos almacenados (nombre para mostrar, bandeja de entrada, bandeja compartida, avatar) para un seguidor existente.                                                                                                                                                                                                                                              |
| `Crear`                             | **No aceptado.** Owncast rechaza intencionadamente actividades `Crear` entrantes — no puedes publicar o responder en un servidor Owncast a través de ActivityPub.                                                                                                                                                                                                                     |

Dos guardias importantes:

- **Límite de edad de participación.** Las actividades `Me gusta` y `Anunciar` solo se registran si el objeto referenciado tiene no más de **36 horas** de antigüedad. Compromisos más antiguos son ignorados. Esto mantiene las notificaciones de compromiso atadas a transmisiones recientes.
- **Bloqueo y SSRF.** Las actividades entrantes de dominios/actores bloqueados son rechazadas durante la verificación de firma. Las entregas salientes rechazan URLs de bandeja de entrada no HTTPS e internas/loopback.

### Actividades de servidor a servidor

`Ofrecer`, `Dejar`, `Aceptar` y `Rechazar` forman juntos el protocolo de "flujos destacados" de Owncast a Owncast. Si estás construyendo un directorio o agregador que quiera participar, el patrón es:

1. Enviar un `Seguir` que establezca el marcador `ns#directory` (ver [el espacio de nombres personalizado](#owncast-custom-namespace)) al actor del servidor Owncast. El operador lo aprueba manualmente, luego espera un `Aceptar`.
2. Recibir actividades `Ofrecer` periódicamente (con metadatos de Owncast) mientras el servidor esté en vivo.
3. Reciba un `Dejar` cuando termine el flujo.

También puedes consumir solo las publicaciones estándar de `Crear`/`Nota` si no necesitas pings de presencia en tiempo real.

## Espacio de nombres personalizado de Owncast

Owncast agrega un pequeño conjunto de propiedades JSON-LD personalizadas bajo el espacio de nombres **`https://owncast.online/ns#`**. Las propiedades de metadatos de transmisión aparecen como campos adicionales de nivel superior en las actividades `Ofrecer` (y relacionadas de servidor a servidor) y permiten a un receptor poblar una entrada de directorio a partir de una sola actividad. El marcador `ns#directory` aparece en un `Seguir` e identifica al remitente como un directorio. Todos son opcionales y seguros de ignorar si solo te importa ActivityPub estándar.

| Propiedad                                     | Tipo             | Significado                                                                                                               |
| --------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `https://owncast.online/ns#streamStatus`      | cadena           | `"en vivo"` o `"fuera de línea"`. Siempre presente en actividades de servidor a servidor. |
| `https://owncast.online/ns#streamTitle`       | cadena           | Título actual de la transmisión, cuando se establece.                                                     |
| `https://owncast.online/ns#streamDescription` | cadena           | Resumen/descripción del servidor.                                                                         |
| `https://owncast.online/ns#serverName`        | cadena           | Nombre legible por humanos del servidor.                                                                  |
| `https://owncast.online/ns#logoUrl`           | cadena           | URL absoluta al logo del servidor.                                                                        |
| `https://owncast.online/ns#thumbnailUrl`      | cadena           | URL absoluta a la miniatura de la transmisión actual.                                                     |
| `https://owncast.online/ns#streamTags`        | array de cadenas | Etiquetas de metadatos del servidor.                                                                      |
| `https://owncast.online/ns#directory`         | booleano         | Establecido en `true` en un `Seguir` para identificar al remitente como directorio.                       |

Un directorio se identifica al establecer `ns#directory` en `true` en el `Seguir` que envía. Ese marcador, y solo ese marcador, hace que Owncast trate el seguimiento como un listado de directorio: mantiene el seguimiento para que el operador lo apruebe, y una vez aprobado, entrega el `Ofrecer` y los pings de transmisión `Dejar` a ese seguidor. Los campos de metadatos de transmisión anteriores son descriptivos solamente y no identifican un directorio por sí solos.

## Construyendo un directorio de flujos de Owncast

Las actividades de servidor a servidor que impulsan la propia característica de [flujos destacados](/docs/social/featured-streams) de Owncast están abiertas para que las consumas. Si deseas ejecutar un directorio o agregador que rastree qué servidores Owncast están en vivo, sigues a cada servidor de la manera en que lo haría cualquier actor de Fediverse y luego reaccionas a las señales de actividad que envía.

Para un ejemplo completo y executable, consulta el repositorio [owncast-directory-example](https://github.com/owncast/owncast-directory-example). Es una pequeña aplicación de Python que implementa todo en esta sección: un actor publicado, el seguimiento `ns#directory`, el manejo de `Ofrecer`/`Dejar`/`Rechazar`, y una página web que lista los servidores en vivo. Trátalo como un punto de partida en lugar de un servicio de producción.

Necesitas un actor publicado y solicitudes firmadas, lo mismo que cualquier seguidor (ver [Firmas HTTP](#http-signatures)). A partir de ahí:

1. Envía un `Seguir` firmado que establezca `https://owncast.online/ns#directory` en `true` (ver [el espacio de nombres personalizado](#owncast-custom-namespace)) al actor de cada servidor. Ese marcador te identifica como un directorio, lo que hace que el servidor entregue sus pings de transmisión a ti, y hace que estar listado sea opcional: un servidor Owncast siempre mantiene un seguimiento de directorio para que su operador lo apruebe manualmente, sin importar cómo esté configurada la privacidad de federación del servidor. No recibirás ningún estado hasta que el operador apruebe, así que espera que las entradas permanezcan pendientes hasta que cada una acepte. Un `Seguir` sin el marcador se trata como un seguimiento de fan ordinario: puede ser aceptado automáticamente, pero nunca recibirá los pings de `Ofrecer`/`Dejar`.
2. Mientras un servidor esté en vivo, publica un `Ofrecer` a tu bandeja de entrada aproximadamente cada 5 minutos, llevando los [metadatos personalizados de Owncast](#owncast-custom-namespace): estado de transmisión, título, descripción, nombre del servidor, logo, miniatura y etiquetas. Crea o actualiza la entrada del directorio de ese servidor a partir de esos campos.
3. Cuando la transmisión termine limpiamente, el servidor publica un `Dejar`. Marca la entrada como fuera de línea.
4. Si el operador del servidor elimina tu directorio de su lado, el servidor publica un `Rechazar` de tu `Seguir` original. Elimina la entrada: ya no estás autorizado para listar ese servidor, y dejará de enviarte pings.

No hay un flujo integrado para que un servidor Owncast solicite un lugar en tu directorio, así que ensamblar la lista es tarea de tu parte. Una manera simple de dejar que los operadores opten es poner un formulario de envío en tu directorio donde un operador ingrese la URL de su servidor. Tú y tu directorio decidís qué envíos listar y cuáles rechazar. Cuando aceptas uno, sigues a ese servidor de la misma manera que arriba. El operador aprueba el seguimiento, que un enviador espera hacer, y el flujo de seguimiento, aceptación y pings lista su transmisión.

Trata los pings como un latido. Si un servidor deja de enviar actividades `Ofrecer` sin un `Dejar`, porque falló, perdió conectividad o fue bloqueado, nada te dice activamente que se cayó. Expira cualquier entrada de la que no hayas tenido noticias en un par de intervalos de ping. El propio directorio de Owncast marca un par como fuera de línea después de dos pings perdidos, aproximadamente 11 minutos, y ejecuta esa verificación de obsolescencia una vez por minuto.

Algunas cosas que vale la pena hacer bien:

- Los campos de metadatos provienen del servidor remoto, así que trátalos como entradas no confiables. Limita las longitudes y confirma que cualquier URL sea `http` o `https` antes de representarla. El valor que puedes confiar es la URL del servidor que elegiste seguir, no el nombre que muestra el servidor.
- Las URLs de miniatura y logo son estables, así que el navegador las almacenará en caché. Agrega una consulta de rompimiento de caché cambiante cuando actualices una entrada si deseas que la vista previa se mantenga actual.
- No tienes que usar los pings en absoluto. Si solo necesitas saber que un servidor se volvió en vivo, en lugar de mantener una vista continua de quién está en vivo en este momento, sigue al actor y vigila las publicaciones de publicación de go-live de `Crear`/`Nota` como cualquier otro consumidor de Fediverse.

Para que tu servicio sea reconocido como un directorio, establece `https://owncast.online/ns#directory` en `true` en el `Seguir` que envíes. Un servidor que lo vea mantiene el seguimiento para su operador y, una vez aprobado, te envía sus pings de transmisión.

## Referencia de endpoint

Todas las rutas son relativas a la URL base del servidor. Cada endpoint devuelve `405` cuando la federación está deshabilitada.

| Ruta                                  | Método | Propósito                                                   |
| ------------------------------------- | ------ | ----------------------------------------------------------- |
| `/.well-known/webfinger`              | GET    | Resolver `acct:` → actor IRI                                |
| `/.well-known/host-meta`              | GET    | Puntero XRD a WebFinger                                     |
| `/.well-known/nodeinfo`               | GET    | Documento de descubrimiento de NodeInfo                     |
| `/nodeinfo/2.0`                       | GET    | Metadatos del servidor de NodeInfo 2.0      |
| `/.well-known/x-nodeinfo2`            | GET    | Metadatos del servidor x-nodeinfo2                          |
| /api/v1/instance                      | GET    | Descripción de instancia compatible con Mastodon            |
| /federation/user/{username}           | GET    | El documento del actor `Servicio`                           |
| /federation/user/{username}/inbox     | POST   | Entregar actividades al servidor                            |
| /federation/user/{username}/outbox    | GET    | Colección de actividades que ha enviado el servidor         |
| /federation/user/{username}/followers | GET    | Colección paginada de seguidores                            |
| /federation/user/{username}/following | GET    | Siempre `404` (sin lista de seguimiento) |
| /federation/{object-id}               | GET    | Obtener un solo objeto ActivityPub almacenado               |

## Construyendo una aplicación compatible — lista de verificación

Para seguir y consumir un flujo de Owncast desde tu propia aplicación:

1. **Resolver** el identificador con WebFinger (`acct:live@host`) para obtener el actor IRI, luego obtener el actor con `Accept: application/activity+json`.
2. **Publica tu propio actor** con una `publicKey`, servido sobre HTTPS, con un `inbox` accesible.
3. **Envía un `Follow` firmado** al inbox del actor. Firma `(request-target) host date digest` con RSA e incluye un `Digest` SHA-256.
4. **Maneja el `Accept`** que Owncast envía de vuelta a tu inbox (modo público) — o espera la aprobación manual (modo privado).
5. **Escucha los posts de inicio en vivo**: actividades de `Create`/`Note` que llegan a tu inbox te informan que el stream ha comenzado; el enlace WebFinger `alternate`/`application/x-mpegURL` te da la URL HLS para reproducir.
6. **Opcionalmente** actúa como un directorio: establece `https://owncast.online/ns#directory` en `true` en tu `Follow`, haz que el operador lo apruebe, luego consume las notificaciones de `Offer`/`Leave` y los metadatos `https://owncast.online/ns#*` para una actualización en tiempo real y entradas de directorio más completas.
7. **Verifica** la firma de todo lo que Owncast te envía con respecto a la `#main-key` del actor.

Recuerda que Owncast no aceptará respuestas o publicaciones (`Create` es rechazado) y no expone ninguna lista de `following`, así que diseña tu integración en torno a seguir + notificaciones + me gusta/impulsos en lugar de una conversación bidireccional.
