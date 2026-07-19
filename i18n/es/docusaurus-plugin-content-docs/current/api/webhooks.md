---
title: Webhooks
description: Aprenda a configurar y usar webhooks para recibir notificaciones sobre eventos en su servidor Owncast.
sidebar_position: 48
tags:
  - webhooks
  - integración
  - api
  - eventos
  - notificaciones
  - personalización
---

Owncast admite HTTP Webhooks para notificar a aplicaciones de terceros (como chatbots) sobre eventos en la transmisión. En otras palabras: los webhooks enviarán eventos a su código cuando ocurran cosas en su servidor Owncast.

A continuación se muestra una lista de eventos sobre los que puede recibir notificaciones.

| Tipo de evento                                                                                        | el webhook se activa cuando ...                                                      |
| :---------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| [CHAT](#chat)                                                                                         | un usuario envía un mensaje de chat                                                                                                  |
| [NAME_CHANGE](#name_change)                                                      | un usuario cambia su nombre de usuario                                                                                               |
| [USER_JOINED](#user_joined)                                                      | un usuario se une al chat                                                                                                            |
| [USER_PARTED](#user_parted)                                                      | la última conexión activa de un usuario se desconecta                                                                                |
| [STREAM_STARTED](#stream_started)                                                | se detecta una transmisión RTMP entrante                                                                                             |
| [STREAM_STOPPED](#stream_stopped)                                                | una transmisión RTMP entrante se desconecta (por ejemplo, OBS se detiene)                                         |
| [STREAM_TITLE_UPDATED](#stream_title_updated)               | el título de la transmisión se actualiza                                                                                             |
| [VISIBILITY-UPDATE](#visibility-update)                                                               | un mensaje de chat enviado anteriormente se vuelve visible/invisible (configurado por un administrador/moderador) |
| [FEDIVERSE_ENGAGEMENT_FOLLOW](#fediverse_engagement_follow) | un usuario de Fediverse sigue su servidor                                                                                            |

### Cómo aceptar webhooks

1. Visite `/admin/webhooks` en su servidor owncast.
2. Haga clic en `Crear Webhook`.
3. Introduzca la URL pública completa a un endpoint que pueda recibir este webhook.
4. Seleccione los eventos de los que desea recibir notificaciones.
5. Guarde este nuevo webhook.

### Su código

1. En cualquier idioma, en cualquier tipo de servidor web, cree un endpoint que acepte una solicitud HTTP `POST`. Aquí es donde Owncast enviará eventos.
2. Cada carga de evento tendrá una propiedad `type` que indica qué tipo de evento es y un objeto `eventData` que incluye propiedades específicas de ese evento.

### Verificando las solicitudes de webhook

Owncast no firma ni autentica las solicitudes de webhook. No hay ningún secreto compartido ni encabezado de firma, por lo que su endpoint no puede confirmar criptográficamente que una solicitud proviene de su servidor Owncast. Trate el endpoint como algo que cualquiera podría llamar y no lo conecte directamente a acciones que no desearía que un llamador no autenticado activara.

Si desea una protección básica, coloque un token difícil de adivinar en la URL del webhook que registre (por ejemplo `https://example.com/owncast-hook/9f3c...`) y rechace cualquier solicitud que llegue sin él.

### Webhooks de alto nivel

Los webhooks utilizan el método `HTTP POST` para enviar datos a un endpoint. El cuerpo de la solicitud del webhook es un `JSON` simple.
Por lo tanto, el encabezado ContentType de la solicitud es `application/json`. Cada cuerpo de webhook sigue una estructura JSON simple.

```json
{
  "type": "",
  "eventData": {}
}
```

donde

- **type** da información sobre el tipo de evento que es (uno de los tipos de la tabla anterior).
- **eventData** proporciona más información sobre el evento. La estructura de `eventData` es diferente para cada `type`.

Ejemplos de lo que se puede esperar en `eventData` para cada tipo de evento se indican a continuación.

## Ejemplos de Webhook

#### CHAT

```json
{
  "type": "CHAT",
  "eventData": {
    "user": {
      "id": "qSRQpeM7R",
      "displayName": "lazyDaisy",
      "displayColor": 182,
      "createdAt": "2021-08-12T07:51:37.470812684Z",
      "previousNames": ["lazyDaisy"],
      "nameChangedAt": "2022-09-19T12:33:59.42313245+02:00",
      "isBot": false,
      "authenticated": false
    },
    "clientId": 2,
    "body": "hola mundo \u003cimg class=\"emoji\" alt=\":beerparrot:\" title=\":beerparrot:\" src=\"/img/emoji/beerparrot.gif\"\u003e",
    "rawBody": "hola mundo \u003cimg class=\"emoji\" alt=\":beerparrot:\" title=\":beerparrot:\" src=\"/img/emoji/beerparrot.gif\"\u003e",
    "id": "j-rXteG7R",
    "visible": true,
    "timestamp": "2021-08-12T07:53:12.061982913Z"
  }
}
```

Nota: el campo `user` en el chat fue introducido con `v0.0.8`. Antes de `v0.0.8` se utilizaba un campo de cadena simple con el nombre `author`.

#### NAME_CHANGE

```json
{
  "type": "NAME_CHANGE",
  "eventData": {
    "type": "NAME_CHANGE",
    "id": "",
    "timestamp": "0001-01-01T00:00:00Z",
    "user": {
      "id": "qSRQpeM7R",
      "displayName": "NotSoLazyDaisy",
      "displayColor": 182,
      "createdAt": "2021-08-12T07:51:37.470812684Z",
      "previousNames": ["lazyDaisy"],
      "nameChangedAt": "2022-09-19T12:33:59.423278816+02:00",
      "isBot": false,
      "authenticated": false
    },
    "clientId": 2,
    "newName": "NotSoLazyDaisy"
  }
}
```

#### USER_JOINED

```json
{
  "type": "USER_JOINED",
  "eventData": {
    "id": "wAgcTeM7g",
    "timestamp": "2021-08-12T08:19:28.921355401Z",
    "user": {
      "id": "yFgco6M7R",
      "displayName": "laughing-cray",
      "displayColor": 257,
      "createdAt": "2021-08-12T08:19:28.759651178Z",
      "previousNames": ["laughing-cray"],
      "nameChangedAt": "0001-01-01T00:00:00Z",
      "isBot": false,
      "authenticated": false
    },
    "clientId": 2
  }
}
```

#### USER_PARTED

`USER_PARTED` se envía 10 segundos después de que se desconecta la última conexión activa de un usuario al chat. Si el usuario se reconecta durante ese tiempo, el evento se cancela. Deshabilitar los mensajes visibles de unión y salida solo oculta el mensaje en el chat; el webhook aún se envía.

```json
{
  "type": "USER_PARTED",
  "eventData": {
    "id": "Ws4gTeM7R",
    "timestamp": "2021-08-12T08:20:01.061982913Z",
    "user": {
      "id": "yFgco6M7R",
      "displayName": "laughing-cray",
      "displayColor": 257,
      "createdAt": "2021-08-12T08:19:28.759651178Z",
      "previousNames": ["laughing-cray"],
      "nameChangedAt": "0001-01-01T00:00:00Z",
      "isBot": false,
      "authenticated": false
    }
  }
}
```

#### STREAM_STARTED

```json
{
  "type": "STREAM_STARTED",
  "eventData": {
    "id": "WtokptnVR",
    "name": "Owncast",
    "streamTitle": "",
    "summary": "¡Bienvenido a su nuevo servidor Owncast! Esta descripción se puede cambiar en el administrador. Visite https://owncast.online/docs/configuration/ para obtener más información.",
    "timestamp": "2022-09-19T12:30:26.97907142+02:00"
  }
}
```

#### STREAM_STOPPED

```json
{
  "type": "STREAM_STOPPED",
  "eventData": {
    "id": "YP-aptn4g",
    "name": "Owncast",
    "streamTitle": "",
    "summary": "¡Bienvenido a su nuevo servidor Owncast! Esta descripción se puede cambiar en el administrador. Visite https://owncast.online/docs/configuration/ para obtener más información.",
    "timestamp": "2022-09-19T12:40:21.205872269+02:00"
  }
}
```

#### STREAM_TITLE_UPDATED

```json
{
  "type": "STREAM_TITLE_UPDATED",
  "eventData": {
    "id": "DmeikEf4Rz",
    "name": "Nuevo Servidor Owncast",
    "status": {
      "lastConnectTime": null,
      "lastDisconnectTime": "2024-10-24T22:35:05Z",
      "versionNumber": "0.1.3",
      "streamTitle": "Cambio de título de transmisión de prueba",
      "viewerCount": 0,
      "overallMaxViewerCount": 7,
      "sessionMaxViewerCount": 2,
      "online": false
    },
    "streamTitle": "Cambio de título de transmisión de prueba",
    "summary": "Este es un nuevo servidor de transmisión de video en vivo impulsado por Owncast.",
    "timestamp": "2023-03-27T21:50:10.121391094-07:00"
  }
}
```

#### VISIBILITY-UPDATE

```json
{
  "type": "VISIBILITY-UPDATE",
  "eventData": {
    "id": "zqGupt7VR",
    "MessageIDs": ["-Zzltt74g", "rvd2ppn4g"],
    "timestamp": "2022-09-19T12:44:28.225779601+02:00",
    "Visible": false
  }
}
```

- `MessageIDs` es una lista de IDs de mensajes que cambiaron su visibilidad.

#### FEDIVERSE_ENGAGEMENT_FOLLOW

```json
{
  "eventData": {
    "timestamp": "2026-04-13T19:17:12.528099886Z",
    "id": "AqilY4hDR",
    "name": "Seguidor de Prueba",
    "username": "testfollower@fake-mastodon.example.com",
    "image": "https://fake-mastodon.example.com/avatars/testfollower.png"
  },
  "type": "FEDIVERSE_ENGAGEMENT_FOLLOW"
}
```

- `eventData.id` es un ID de evento de webhook generado por Owncast. No es el ID de actor de Fediverse ni el ID de solicitud de seguimiento.
- `eventData.name` es el nombre de visualización del seguidor.
- `eventData.username` es el `user@domain` completo.
- `eventData.image` es la URL del avatar del seguidor.

### clientId vs. user.id

Cuando un usuario está conectado desde múltiples dispositivos (o múltiples navegadores) al mismo tiempo con el mismo nombre de usuario, Owncast diferencia entre sus sesiones con un `clientId`. Los usuarios pueden tener múltiples clientIds: un solo clientId representa una única conexión a Owncast.

`clientId` es un número, mientras que `user.id` puede contener caracteres en mayúsculas, minúsculas y numéricos.

### Pruebe webhooks en un entorno de desarrollo local

1. Inicie Owncast localmente (por ejemplo, a través de docker).
2. Visite `localhost:8080/admin`, autentíquese con el nombre de usuario: `admin` y la clave de transmisión predeterminada: `abc123`.
3. Navegue al bloque de menú "Integración" en el lado izquierdo, haga clic en "Webhooks" y luego en "Crear Webhook".
4. Establezca la dirección del Webhook para apuntar a su aplicación/integración (algo como: `http://localhost:8100/webhooks/incoming`).
5. Seleccione los tipos de eventos que desea recibir.
6. Presione "OK" para guardar el webhook.
7. Inicie su integración/aplicación escuchando en la dirección configurada anteriormente.
   1. Opcionalmente, inicie un proxy de interceptación (por ejemplo, Burp) si desea inspeccionar los mensajes HTTP de antemano.
8. Active eventos usted mismo (por ejemplo, escriba un mensaje en el chat, conecte/desconecte su software de transmisión a Owncast).

### Pruebe webhooks antes de escribir cualquier código

Si desea probar cómo funcionan los webhooks antes de escribir código, cree un endpoint de prueba en [RequestCatcher](https://requestcatcher.com/), y agregue la URL que le proporciona como un webhook en su administrador y vea cómo llegan las solicitudes.

### Pruebe webhooks desde una instancia de producción de Owncast

Si ya tiene una instancia de Owncast ejecutándose en producción, escuchando en la web, es posible que desee usar [ngrok](https://ngrok.com/) para tunelar solicitudes HTTP a su entorno de desarrollo local.
