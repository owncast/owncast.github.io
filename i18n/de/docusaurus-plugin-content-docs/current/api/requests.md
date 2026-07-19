---
title: Send Anfragen an die Owncast-API
description: Verwenden Sie ein Zugriffstoken, um Chat-Nachrichten zu senden, den Stream-Titel festzulegen und andere Aktionen über die Owncast-API auszuführen.
sidebar_position: 48
sidebar_label: Anfragen senden
---

Wir unterstützen derzeit die folgenden Aktionen, die Sie über Anfragen aus Ihrem Code durchführen können.

| Ereignis                      |                                                                            Endpunkt                                                                            |                    Bereich |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------: | -------------------------: |
| System-Chat-Nachricht         |                     <a href="/api/latest/#tag/Integrations/paths/~1api~1integrations~1chat~1system/post">/api/integrations/chat/system</a>                     | `CAN_SEND_SYSTEM_MESSAGES` |
| Standard-Chat-Nachricht       |                       <a href="/api/latest/#tag/Integrations/paths/~1api~1integrations~1chat~1send/post">/api/integrations/chat/send</a>                       |        `CAN_SEND_MESSAGES` |
| Chat-Aktion                   |                     <a href="/api/latest/#tag/Integrations/paths/~1api~1integrations~1chat~1action/post">/api/integrations/chat/action</a>                     | `CAN_SEND_SYSTEM_MESSAGES` |
| Chat-Nachricht entfernen      |          <a href="/api/latest/#tag/Integrations/paths/~1api~1integrations~1chat~1messagevisibility/post">/api/integrations/chat/messagevisibility</a>          |         `HAS_ADMIN_ACCESS` |
| Chatverlauf abrufen           |                             <a href="/api/latest/#tag/Integrations/paths/~1api~1integrations~1chat/get">/api/integrations/chat</a>                             |         `HAS_ADMIN_ACCESS` |
| Getrennte Clients abrufen     |                          <a href="/api/latest/#tag/Integrations/paths/~1api~1integrations~1clients/get">/api/integrations/clients</a>                          |         `HAS_ADMIN_ACCESS` |
| Stream-Titel festlegen        |                      <a href="/api/latest/#tag/Integrations/paths/~1api~1integrations~1streamtitle/post">/api/integrations/streamtitle</a>                     |         `HAS_ADMIN_ACCESS` |
| Systemnachricht an den Client | <a href="/api/latest/#tag/Integrations/paths/~1api~1integrations~1chat~1system~1client~1{clientId}/post">/api/integrations/chat/system/client/`{clientId}`</a> | `CAN_SEND_SYSTEM_MESSAGES` |

Besuchen Sie die API-Dokumentation für jeden Endpunkt, um mehr über die erwarteten oder zurückgegebenen Werte zu erfahren.

Ihr Owncast-Server akzeptiert nur Aktionen von Anfragen mit einem gültigen Zugriffstoken. Befolgen Sie die folgenden Schritte, um ein Zugriffstoken zu erstellen.

1. Besuchen Sie `/admin/access-tokens` auf Ihrem Owncast-Server.
2. Klicken Sie auf `Zugriffstoken erstellen`.
3. Wählen Sie den Umfang der Berechtigungen aus, die Sie diesem Token geben möchten.
4. Speichern Sie dieses Zugriffstoken.

### Ihr Code

Senden Sie einen authentifizierten `POST` mit Ihrem Zugriffstoken im Header `Authorization` und einem JSON-Body. Zum Beispiel, um eine System-Chat-Nachricht zu senden:

```js
const res = await fetch("https://your.owncast.server/api/integrations/chat/system", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + YOUR_ACCESS_TOKEN,
  },
  body: JSON.stringify({ body: "Dies ist eine System-Chat-Nachricht" }),
});

const result = await res.json();
// { "success": true, "message": "sent" }
```

### Testen Sie das Senden von Chatnachrichten

Ändern Sie den folgenden `curl`-Befehl, um auf Ihre Server-URL zu verweisen, und verwenden Sie Ihr Authentifizierungstoken mit "Systemnachricht"-Zugriff. Es sendet eine Systemnachricht in Ihren Chat.

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOURAUTHTOKEN" \
  -d '{"body": "Ich bin eine Systemnachricht!"}' \
  https://your.owncast.server/api/integrations/chat/system
```

Eine erfolgreiche Anfrage gibt `200` mit einem JSON-Body zurück:

```json
{ "success": true, "message": "sent" }
```

## Umfänge

Jedes Zugriffstoken erhält einen oder mehrere Bereiche, die kontrollieren, was es tun kann. Die oben genannten Endpunkte listen den Bereich auf, den jeder benötigt.

| Umfang                     | Gewährt                                                                                                                                                                          |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CAN_SEND_MESSAGES`        | Senden Sie Standard-Chatnachrichten als Benutzer des Tokens.                                                                                                     |
| `CAN_SEND_SYSTEM_MESSAGES` | Senden Sie Chatnachrichten als System und senden Sie Chataktionen.                                                                                               |
| `HAS_ADMIN_ACCESS`         | Administrative Aktionen: Chatverlauf lesen, verbundene Clients auflisten, den Streamtitel festlegen und die Sichtbarkeit der Nachrichten ändern. |

## Antworten und Fehler

| Status | Bedeutung                                                                                                                                                     |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `200`  | Die Anfrage war erfolgreich. Der JSON-Body hat `success: true` und eine kurze `message`.                                      |
| `400`  | Der Anfragetext war fehlerhaft. Der JSON-Body hat `success: false` und eine `message`.                                        |
| `401`  | Das Zugriffstoken fehlt, ist ungültig oder hat nicht den erforderlichen Umfang für den Endpunkt. Der Text ist einfacher Text. |
| `500`  | Der Server hat beim Verarbeiten der Anfrage einen Fehler aufgetreten.                                                                         |

Owncast gibt keinen separaten `403` für einen unzureichenden Umfang zurück. Ein Token ohne den erforderlichen Umfang wird mit `401` abgelehnt, genau wie ein fehlendes oder ungültiges Token.
