---
title: Enviar solicitudes a la API de Owncast
description: Utilice un token de acceso para enviar mensajes de chat, establecer el título del stream y realizar otras acciones a través de la API de Owncast.
sidebar_position: 48
sidebar_label: Enviar solicitudes
---

Actualmente admitimos las siguientes acciones que puede realizar a través de solicitudes desde su código.

| Evento                         |                                                                            Endpoint                                                                            |                    Alcance |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------: | -------------------------: |
| Mensaje de chat del sistema    |                     <a href="/api/latest/#tag/Integrations/paths/~1api~1integrations~1chat~1system/post">/api/integrations/chat/system</a>                     | `CAN_SEND_SYSTEM_MESSAGES` |
| Mensaje de chat estándar       |                       <a href="/api/latest/#tag/Integrations/paths/~1api~1integrations~1chat~1send/post">/api/integrations/chat/send</a>                       |        `CAN_SEND_MESSAGES` |
| Acción de chat                 |                     <a href="/api/latest/#tag/Integrations/paths/~1api~1integrations~1chat~1action/post">/api/integrations/chat/action</a>                     | `CAN_SEND_SYSTEM_MESSAGES` |
| Eliminar mensaje de chat       |          <a href="/api/latest/#tag/Integrations/paths/~1api~1integrations~1chat~1messagevisibility/post">/api/integrations/chat/messagevisibility</a>          |         `HAS_ADMIN_ACCESS` |
| Obtener historial de chat      |                             <a href="/api/latest/#tag/Integrations/paths/~1api~1integrations~1chat/get">/api/integrations/chat</a>                             |         `HAS_ADMIN_ACCESS` |
| Obtener clientes conectados    |                          <a href="/api/latest/#tag/Integrations/paths/~1api~1integrations~1clients/get">/api/integrations/clients</a>                          |         `HAS_ADMIN_ACCESS` |
| Establecer título del stream   |                      <a href="/api/latest/#tag/Integrations/paths/~1api~1integrations~1streamtitle/post">/api/integrations/streamtitle</a>                     |         `HAS_ADMIN_ACCESS` |
| mensaje del sistema al cliente | <a href="/api/latest/#tag/Integrations/paths/~1api~1integrations~1chat~1system~1client~1{clientId}/post">/api/integrations/chat/system/client/`{clientId}`</a> | `CAN_SEND_SYSTEM_MESSAGES` |

Visite la documentación de la API para cada endpoint para obtener más información sobre qué valores se esperan o se devolverán.

Su servidor Owncast solo aceptará acciones de solicitudes con un token de acceso válido. Siga los pasos a continuación para crear un token de acceso.

1. visite `/admin/access-tokens` en su servidor owncast.
2. Haga clic en `Crear token de acceso`.
3. Seleccione el alcance de los permisos que desea otorgar a este token.
4. Guarde este token de acceso.

### Su código

Envíe un `POST` autenticado con su token de acceso en el encabezado `Authorization` y un cuerpo JSON. Por ejemplo, para enviar un mensaje de chat del sistema:

```js
const res = await fetch("https://your.owncast.server/api/integrations/chat/system", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + YOUR_ACCESS_TOKEN,
  },
  body: JSON.stringify({ body: "este es un mensaje de chat del sistema" }),
});

const result = await res.json();
// { "success": true, "message": "sent" }
```

### Prueba enviar mensajes de chat

Cambia el siguiente comando `curl` para señalar la URL de su servidor y usar su token de autenticación con acceso a "mensaje del sistema". Se enviará un mensaje del sistema a su chat.

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOURAUTHTOKEN" \
  -d '{"body": "¡Soy un mensaje del sistema!"}' \
  https://your.owncast.server/api/integrations/chat/system
```

Una solicitud exitosa devuelve `200` con un cuerpo JSON:

```json
{ "success": true, "message": "sent" }
```

## Alcances

A cada token de acceso se le concede uno o más alcances que controlan lo que puede hacer. Los endpoints anteriores enumeran el alcance que cada uno requiere.

| Alcance                    | Concesiones                                                                                                                                                                                |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `CAN_SEND_MESSAGES`        | Enviar mensajes de chat estándar como el propio usuario del token.                                                                                                         |
| `CAN_SEND_SYSTEM_MESSAGES` | Enviar mensajes de chat como el sistema y enviar acciones de chat.                                                                                                         |
| `HAS_ADMIN_ACCESS`         | Acciones administrativas: leer el historial de chat, listar clientes conectados, establecer el título del stream y cambiar la visibilidad de los mensajes. |

## Respuestas y errores

| Estado | Significado                                                                                                                                           |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `200`  | La solicitud tuvo éxito. El cuerpo JSON tiene `success: true` y un breve `message`.                                   |
| `400`  | El cuerpo de la solicitud estaba mal formado. El cuerpo JSON tiene `success: false` y un `message`.                   |
| `401`  | El token de acceso falta, es inválido o no tiene el alcance que requiere el endpoint. El cuerpo es texto sin formato. |
| `500`  | El servidor encontró un error al manejar la solicitud.                                                                                |

Owncast no devuelve un `403` separado por un alcance insuficiente. Un token sin el alcance requerido es rechazado con `401`, lo mismo que un token faltante o inválido.
