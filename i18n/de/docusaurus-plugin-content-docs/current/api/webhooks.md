---
title: Webhooks
description: Erfahren Sie, wie Sie Webhooks einrichten und verwenden, um über Ereignisse auf Ihrem Owncast-Server benachrichtigt zu werden.
sidebar_position: 48
tags:
  - Webhooks
  - Integration
  - API
  - Ereignisse
  - Benachrichtigungen
  - Anpassung
---

Owncast unterstützt HTTP-Webhooks, um Drittanbieteranwendungen (wie Chatbots) über Ereignisse im Stream zu benachrichtigen. Mit anderen Worten: Webhooks senden Ereignisse an Ihren Code, wenn auf Ihrem Owncast-Server Dinge geschehen.

Das Folgende ist eine Liste von Ereignissen, über die Sie benachrichtigt werden können.

| Ereignistyp                                                                                           | Webhook wird ausgelöst, wenn ...                                              |
| :---------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| [CHAT](#chat)                                                                                         | Benutzer sendet eine Chatnachricht                                                                                            |
| [NAME_CHANGE](#name_change)                                                      | Benutzer ändert ihren Benutzernamen                                                                                           |
| [USER_JOINED](#user_joined)                                                      | Benutzer tritt dem Chat bei                                                                                                   |
| [USER_PARTED](#user_parted)                                                      | Die letzte aktive Chatverbindung eines Benutzers wird getrennt                                                                |
| [STREAM_STARTED](#stream_started)                                                | Ein eingehender RTMP-Stream wird erkannt                                                                                      |
| [STREAM_STOPPED](#stream_stopped)                                                | Ein eingehender RTMP-Stream wird getrennt (z.B. OBS stoppt)                |
| [STREAM_TITLE_UPDATED](#stream_title_updated)               | Der Titel des Streams wird aktualisiert                                                                                       |
| [VISIBILITY-UPDATE](#visibility-update)                                                               | Eine zuvor gesendete Chatnachricht wird sichtbar/unsichtbar (von einem Administrator/Moderator festgelegt) |
| [FEDIVERSE_ENGAGEMENT_FOLLOW](#fediverse_engagement_follow) | Ein Fediverse-Benutzer folgt Ihrem Server                                                                                     |

### So akzeptieren Sie Webhooks

1. Besuchen Sie `/admin/webhooks` auf Ihrem Owncast-Server.
2. Klicken Sie auf `Webhook erstellen`.
3. Geben Sie die vollständige öffentliche URL zu einem Endpunkt ein, der diesen Webhook empfangen kann.
4. Wählen Sie die Ereignisse aus, über die Sie benachrichtigt werden möchten.
5. Speichern Sie diesen neuen Webhook.

### Ihr Code

1. Erstellen Sie in jeder Sprache, auf jedem Webserver einen Endpunkt, der eine HTTP-`POST`-Anfrage akzeptiert. Hier wird Owncast Ereignisse senden.
2. Jede Ereignis-Payload hat eine `type`-Eigenschaft, die angibt, um welchen Ereignistyp es sich handelt, und ein `eventData`-Objekt, das spezifische Eigenschaften dieses Ereignisses enthält.

### Webhook-Anfragen verifizieren

Owncast signiert oder authentifiziert keine Webhook-Anfragen. Es gibt kein gemeinsames Geheimnis und keinen Signatur-Header, sodass Ihr Endpunkt nicht kryptographisch bestätigen kann, dass eine Anfrage von Ihrem Owncast-Server stammt. Behandeln Sie den Endpunkt so, als könnte ihn jeder aufrufen, und verbinden Sie ihn nicht direkt mit Aktionen, die Sie nicht möchten, dass ein nicht authentifizierter Aufrufer auslöst.

Wenn Sie eine einfache Guard möchten, fügen Sie einen schwer zu erratenden Token in die Webhook-URL ein, die Sie registrieren (zum Beispiel `https://example.com/owncast-hook/9f3c...`) und lehnen Sie jede Anfrage ab, die ohne ihn eintrifft.

### Hochlevelige Webhooks

Webhooks verwenden die Methode `HTTP POST`, um Daten an einen Endpunkt zu übertragen. Der Anfragekörper des Webhooks ist einfaches `JSON`.
Daher ist der ContentType-Header für die Anfrage `application/json`. Jeder Webhook-Körper folgt einer einfachen JSON-Struktur.

```json
{
  "type": "",
  "eventData": {}
}
```

wo

- **type** gibt Informationen darüber, um welches Ereignis es sich handelt (einer der Typen aus der obigen Tabelle).
- **eventData** gibt weitere Informationen zu dem Ereignis. Die Struktur von `eventData` ist für jeden `type` unterschiedlich.

Beispiele, was für jedes Ereignis zu erwarten ist, befinden sich unten.

## Webhook-Beispiele

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
    "body": "Hallo Welt \u003cimg class=\"emoji\" alt=\":beerparrot:\" title=\":beerparrot:\" src=\"/img/emoji/beerparrot.gif\"\u003e",
    "rawBody": "Hallo Welt \u003cimg class=\"emoji\" alt=\":beerparrot:\" title=\":beerparrot:\" src=\"/img/emoji/beerparrot.gif\"\u003e",
    "id": "j-rXteG7R",
    "visible": true,
    "timestamp": "2021-08-12T07:53:12.061982913Z"
  }
}
```

Hinweis: Das Feld `user` im Chat wurde mit `v0.0.8` eingeführt. Vor `v0.0.8` wurde ein einfaches String-Feld mit dem Namen `author` verwendet.

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

`USER_PARTED` wird 10 Sekunden nach der Trennung der letzten aktiven Chatverbindung eines Benutzers gesendet. Wenn der Benutzer in dieser Zeit wieder verbindet, wird das Ereignis abgebrochen. Das Deaktivieren sichtbarer Beitritts- und Austrittsnachrichten versteckt nur die Nachricht im Chat; der Webhook wird weiterhin gesendet.

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
    "summary": "Willkommen auf Ihrem neuen Owncast-Server! Diese Beschreibung kann im Adminbereich geändert werden. Besuchen Sie https://owncast.online/docs/configuration/, um mehr zu erfahren.",
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
    "summary": "Willkommen auf Ihrem neuen Owncast-Server! Diese Beschreibung kann im Adminbereich geändert werden. Besuchen Sie https://owncast.online/docs/configuration/, um mehr zu erfahren.",
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
    "name": "Neuer Owncast-Server",
    "status": {
      "lastConnectTime": null,
      "lastDisconnectTime": "2024-10-24T22:35:05Z",
      "versionNumber": "0.1.3",
      "streamTitle": "Test-Stream-Titeländerung",
      "viewerCount": 0,
      "overallMaxViewerCount": 7,
      "sessionMaxViewerCount": 2,
      "online": false
    },
    "streamTitle": "Test-Stream-Titeländerung",
    "summary": "Dies ist ein neuer Live-Video-Streaming-Server, betrieben von Owncast.",
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

- `MessageIDs` ist eine Liste von IDs von Nachrichten, deren Sichtbarkeit geändert wurde.

#### FEDIVERSE_ENGAGEMENT_FOLLOW

```json
{
  "eventData": {
    "timestamp": "2026-04-13T19:17:12.528099886Z",
    "id": "AqilY4hDR",
    "name": "Test Follower",
    "username": "testfollower@fake-mastodon.example.com",
    "image": "https://fake-mastodon.example.com/avatars/testfollower.png"
  },
  "type": "FEDIVERSE_ENGAGEMENT_FOLLOW"
}
```

- `eventData.id` ist eine von Owncast generierte Webhook-Ereignis-ID. Es ist nicht die Fediverse-Schauspieler-ID oder die Follow-Anforderungs-ID.
- `eventData.name` ist der Anzeigename des Followers.
- `eventData.username` ist der vollständige `user@domain`-Handle.
- `eventData.image` ist die URL zum Avatar des Followers.

### clientId vs. user.id

Wenn sich ein Benutzer von mehreren Geräten (oder mehreren Browsern) zur gleichen Zeit mit demselben Benutzernamen verbindet, unterscheidet Owncast zwischen ihren Sitzungen mit einer `clientId`. Benutzer können mehrere clientIds haben - eine einzelne clientId entspricht einer einzelnen Verbindung zu Owncast.

`clientId` ist eine Zahl, während `user.id` Groß-, Kleinbuchstaben und Ziffern enthalten kann.

### Webhooks in einer lokalen Entwicklungsumgebung testen

1. Starten Sie Owncast lokal (z.B. über Docker).
2. Besuchen Sie `localhost:8080/admin`, authentifizieren Sie sich mit Benutzername: `admin` und dem Standard-Streaming-Key: `abc123`.
3. Navigieren Sie zum Menüblock "Integration" auf der linken Seite, klicken Sie auf "Webhooks", dann auf "Webhook erstellen".
4. Setzen Sie die Webhook-Adresse auf Ihre Anwendung/Integration (etwas wie: `http://localhost:8100/webhooks/incoming`).
5. Wählen Sie die Typen von Ereignissen aus, die Sie empfangen möchten.
6. Drücken Sie "OK", um den Webhook zu speichern.
7. Starten Sie Ihre Integration/Anwendung, die auf der zuvor konfigurierten Adresse lauscht.
   1. Optional können Sie einen Abfang-Proxy (z.B. Burp) starten, wenn Sie die HTTP-Nachrichten vorher inspizieren möchten.
8. Triggern Sie die Ereignisse selbst (z.B. schreiben Sie eine Nachricht in den Chat, verbinden/trennen Sie Ihre Streaming-Software von Owncast).

### Webhooks testen, bevor Sie Code schreiben

Wenn Sie testen möchten, wie Webhooks funktionieren, bevor Sie Code schreiben, erstellen Sie einen Testendpunkt bei [RequestCatcher](https://requestcatcher.com/), und fügen Sie die URL, die Sie bekommen, als Webhook in Ihrem Administrator hinzu und sehen Sie die Anfragen durchkommen.

### Webhooks aus einer Produktionsinstanz von Owncast testen

Wenn Sie bereits eine Owncast-Instanz in der Produktion betreiben, die mit dem World Wide Web verbunden ist, möchten Sie vielleicht [ngrok](https://ngrok.com/) verwenden, um HTTP-Anfragen an Ihre lokale Entwicklungsumgebung zu tunneln.
