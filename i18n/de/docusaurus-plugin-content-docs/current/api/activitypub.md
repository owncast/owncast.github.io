---
title: ActivityPub & Das Fediverse-Protokoll
description: Eine Protokollreferenz für die Aktivitäten von ActivityPub, die Owncast sendet und empfängt, damit Sie eine Fediverse-Anwendung entwickeln können, die mit Owncast-Servern interoperabel ist.
sidebar_position: 50
sidebar_label: ActivityPub-Protokoll
toc_min_heading_level: 2
toc_max_heading_level: 3
tags:
  - activitypub
  - federation
  - fediverse
  - protokoll
  - mastodon
  - integration
  - nodeinfo
  - webfinger
---

# ActivityPub & Das Fediverse-Protokoll

Diese Seite dokumentiert die [ActivityPub](https://www.w3.org/TR/activitypub/) Implementierung innerhalb von Owncast auf Protokollebene: welche Aktivitäten ein Server **sendet**, welche er **empfängt**, wie er sich identifiziert und wie er Anfragen signiert und verifiziert. Sie richtet sich an Entwickler, die eine Fediverse-Anwendung erstellen möchten, die mit Owncast interoperiert, egal ob das bedeutet, folgenden Owncast-Server von einer anderen Plattform, seine Live-Benachrichtigungen zu empfangen oder Tools zu bauen, die die benutzerdefinierten Erweiterungen von Owncast verstehen.

Wenn Sie ein Owncast-Betreiber sind und einfach nur die Föderation aktivieren möchten, sehen Sie sich stattdessen [Das Fediverse](/docs/social/the-fediverse) und [Aktivierung sozialer Funktionen](/docs/social#enabling-social-features) an. Diese Seite setzt Vertrautheit mit ActivityPub, ActivityStreams 2.0, JSON-LD und HTTP-Signaturen voraus.

## Mentales Modell

Ein Owncast-Server fungiert als **einzelner Akteur** vom Typ `Service`. Es gibt ein Konto pro Server (Standardbenutzername `live`), und es repräsentiert den Stream selbst und nicht eine Person. Im Vergleich zu einem allgemeinen sozialen Server ist das Modell absichtlich eng:

- Der Akteur **sendet** Posts an seine Follower (am wichtigsten, eine "Live-Benachrichtigung") und einen regelmäßigen Stream "Ping".
- Der Akteur **empfängt** Follows, Likes, Boosts (Ankündigungen) und eine Handvoll Server-zu-Server-Aktivitäten, akzeptiert jedoch **keine** eingehenden Posts oder Antworten (`Create` wird absichtlich abgelehnt).
- Es gibt genau einen Benutzer, keine offene Registrierung, und die `following` Sammlung ist immer leer.

Alle Föderationsendpunkte geben `405 Method Not Allowed` zurück, wenn die Föderation deaktiviert ist. Überprüfen Sie zuerst das, wenn ein Server unerreichbar erscheint.

## Entdeckung

Eine entfernte Anwendung lokalisiert und beschreibt einen Owncast-Akteur durch die standardisierten Mechanismen zur bekanntgemachten Entdeckung.

### WebFinger

```
GET /.well-known/webfinger?resource=acct:{username}@{host}
```

Die `resource` muss eine `acct:` URI sein, deren Host mit dem konfigurierten Host des Servers übereinstimmt (ansonsten wird die Anfrage mit `501`/`400` abgelehnt). Die Antwort wird als `application/jrd+json` bereitgestellt:

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

Der `self`-Link ist die kanonische Akteur-IRI. Beachten Sie den Owncast-spezifischen `alternate`-Link vom Typ `application/x-mpegURL`: Er verweist direkt auf die HLS-Playlist für den Stream, die es Clients ermöglicht, das Live-Video zu entdecken, ohne die Web-Benutzeroberfläche zu durchsuchen.

### host-meta

```
GET /.well-known/host-meta
```

Gibt ein XRD-Dokument zurück, das auf den WebFinger-Endpunkt verweist, für Clients, die von host-meta bootstrapen:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0">
  <Link rel="lrdd" type="application/json"
        template="https://owncast.example.com/.well-known/webfinger?resource={uri}"/>
</XRD>
```

### NodeInfo

Owncast stellt serverbezogene Metadaten über [NodeInfo](https://nodeinfo.diaspora.software/) zur Verfügung, damit Fediverse-Crawler, Verzeichnisse und Statistikseiten die Instanz beschreiben können.

**NodeInfo-Entdeckung** — `GET /.well-known/nodeinfo`:

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

Der größte Teil davon ist Standard-NodeInfo, mit ein paar Owncast-spezifischen Signalen, die es wert sind, hervorgehoben zu werden:

- **`software.name`** ist immer `owncast`. Dies ist der zuverlässigste Weg zu erkennen, dass Sie mit einem Owncast-Server sprechen.
- **`usage.users.total`** ist immer `1` und **`openRegistrations`** ist immer `false` — eine Owncast-Instanz ist ein Single-Aktor-Server, keine Multi-User-Community.
- **`usage.localPosts`** ist die Anzahl der Aktivitäten, die der Server gesendet hat (Live-Benachrichtigungen und andere öffentliche Nachrichten), was ein nützlicher Indikator dafür ist, wie aktiv der Stream ist.
- **`metadata.chat_enabled`** gibt an, ob der eingebaute Chat von Owncast aktiviert ist.
- **`metadata.federation`** ist der Owncast-spezifische Block:
  - **`username`** ist der bevorzugte Benutzername des Akteurs (Standard `live`). Zusammen mit dem Host gibt Ihnen Dies den `acct:`-Handle, ohne eine separate WebFinger-Rundreise.
  - **`featured_streams`** zeigt die Teilnahme am Featured-Streams / Mini-Verzeichnis-Flow an (siehe [Stream-Pings](#offer--stream-ping-outbound) unten). Ein Wert von `1` bedeutet, dass der Server seinen Live-Status gegenüber den Followern über regelmäßige `Offer`-Aktivitäten ankündigt.

**x-nodeinfo2** — `GET /.well-known/x-nodeinfo2` bietet die gleichen Informationen in der alternativen [x-nodeinfo2](https://github.com/jaywink/xnodeinfo2)-Form, die von einigen Verzeichnissen verwendet wird, einschließlich eines `organization`-Blocks (`name`, `contact`) und einer `activeWeek`-Benutzerzahl. Hier sind `services.inbound`/`services.outbound` beide `["activitypub"]`.

**Mastodon-Instanz-API** — `GET /api/v1/instance` gibt eine Mastodon-kompatible Instanzbeschreibung (`uri`, `title`, `short_description`, `description`, `version`, `thumbnail`, `stats` und Registrierungsflaggen) zurück, damit Mastodon-bewusste Tools eine vertraute Instanzkarte rendert. `stats.user_count` ist `1`, `stats.status_count` ist die lokale Beitragsanzahl, und Registrierungen/Genehmigungen/Einladungen sind alle deaktiviert.

## Der Akteur

```
GET /federation/user/{username}
Accept: application/activity+json
```

Die Anforderung zur Akteur-IRI mit einem ActivityStreams `Accept`-Header gibt das Akteursdokument zurück. Owncast repräsentiert sich selbst als ActivityStreams **`Service`** (nicht als `Person`). Die Form ist:

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    "https://w3id.org/security/v1"
  ],
  "type": "Service",
  "id": "https://owncast.example.com/federation/user/live",
  "preferredUsername": "live",
  "name": "Mein Owncast-Server",
  "summary": "Serverbeschreibung / Bio",
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
      "name": "Website",
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

Wichtige Punkte für eine interoperierende Implementierung:

- **Akteur IRI-Layout** ist `{server}/federation/user/{username}`, und die Sammlungen hängen davon ab: `{actor}/inbox`, `{actor}/outbox`, `{actor}/followers`.
- **`following`** wird bei `{actor}/following` angefordert, gibt jedoch immer `404` zurück — Owncast gibt niemals eine Follow-Liste bekannt.
- **`manuallyApprovesFollowers`** gibt an, ob der Server im _privaten_ Föderationsmodus ist. Wenn `true`, werden Follows nicht automatisch akzeptiert.
- **`discoverable`** ist immer `true` (unter Verwendung der `toot:` Namespace-Semantik).
- Der **öffentliche Schlüssel** befindet sich bei `{actor}#main-key`, ist ein RSA-2048-Schlüssel in PEM (PKIX)-Form und ist das, was Sie verwenden, um die HTTP-Signaturen des Servers zu verifizieren.

## HTTP-Signaturen

Owncast signiert sowohl seine ausgehenden Anfragen als auch verifiziert eingehende mithilfe des "Signature" HTTP-Header-Schemas ([draft-cavage HTTP signatures](https://datatracker.ietf.org/doc/html/draft-cavage-http-signatures), wie es im gesamten Fediverse verwendet wird).

### Anfragen verifizieren, die Owncast an Sie sendet

Wenn Owncast eine Aktivität an Ihren Posteingang POSTt, enthält es:

- Einen `Signature`-Header mit `keyId="{actor}#main-key"`, `algorithm="rsa-sha256"` und der unterschriebenen `headers`-Liste.
- Die signierten Header decken `(request-target)`, `host`, `date` und `digest` ab.
- Einen `Digest`-Header, der den SHA-256-Digest des Anfragekörpers enthält.
- `Content-Type: application/activity+json` und einen `User-Agent` der Form `{version}; https://owncast.online`.

Um zu verifizieren: Rufen Sie den Akteur bei `keyId` ab, lesen Sie `publicKey.publicKeyPem` und verifizieren Sie sowohl die Signatur als auch den Digest des Körpers.

### Anfragen signieren, die Sie an Owncast senden

Owncast verifiziert die Signatur jeder Aktivität, die an seinen Posteingang geliefert wird:

1. Es analysiert `keyId` und `algorithm` aus Ihrem `Signature`-Header. Die `keyId` **muss** eine `https://` URL sein.
2. Es löst Ihren Akteur auf und ruft Ihren öffentlichen Schlüssel ab.
3. Es überprüft, ob die Domain Ihres Schlüssels **nicht** auf der Blockliste der Instanz steht und ob der Akteur selbst nicht blockiert ist.
4. Es verifiziert die Signatur, indem es zunächst den angegebenen Algorithmus ausprobiert und dann auf `rsa-sha256` und `rsa-sha512` zurückgreift.
5. Es verifiziert den `Digest`-Header gegenüber dem Anfragekörper.

In der Praxis bedeutet dies: `(request-target) host date digest` mit einem RSA-Schlüssel signieren, diesen Schlüssel im `publicKey`-Feld Ihres Akteurs veröffentlichen, einen SHA-256 `Digest` einfügen und Ihren Akteur über HTTPS bedienen.

## Aktivitäten, die Owncast sendet (ausgehend)

Alle ausgehenden Aktivitäten stammen vom Server-Akteur und werden an die Posteingänge der Follower ausgeliefert (vorzugsweise `sharedInbox`, wenn ein Follower eine von uns angibt). Öffentliche Aktivitäten sind adressiert an `https://www.w3.org/ns/activitystreams#Public` in `to` mit der Follower-Sammlung in `cc`; im privaten Modus werden sie nur an die Follower-Sammlung adressiert.

| Aktivität | Objekt               | Wann                                                                                                | An                                         |
| --------- | -------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `Create`  | `Note`               | Der Stream wird live (die Nachricht „Live gehen“); andere öffentliche Posts      | Follower (+ Öffentlich) |
| `Update`  | `Service`            | Das Serverprofil (Name, Avatar, Zusammenfassung usw.) Änderungen | Follower                                   |
| `Follow`  | Akteur-IRI           | Ein Betreiber folgt einem anderen Owncast-Server (Featured-Streams-Flow)         | Der Zielserver                             |
| `Offer`   | Server-URL           | Regelmäßig während der Live-Übertragung, als Stream "Ping"                                          | Verzeichnis-Follower                       |
| `Accept`  | eingehendes `Follow` | Als Antwort auf ein erhaltenes `Follow`                                                             | Der Follower                               |
| `Reject`  | eingehendes `Follow` | Wenn der Betreiber ein Verzeichnis entfernt, das diesen Server aufgelistet hat                      | Dieses Verzeichnis                         |

### Erstellen / Notiz — Live gehen

Die wichtigste Aktivität. Wenn der Stream live geht, sendet Owncast eine `Create`, die eine `Note` umschließt. Die `Note` enthält HTML `content` (die konfigurierbare Live-Startnachricht, Streamtitel, Hashtags und einen Link zurück zum Server), `Hashtag`-Tags und — wenn verfügbar — einen `Image`-Anhang mit einer Stream-Vorschau (`preview.gif` oder `thumbnail.jpg`). Wenn der Server als NSFW gekennzeichnet ist, enthält die Notiz `sensitive: true`. Hashtags sind verlinkt zu `https://owncast.directory/tags/{tag}`, und ein `#owncast`-Hashtag wird immer angehängt.

Das ist die Aktivität, die die meisten Konsumenten interessiert: Abonnieren Sie, indem Sie den Akteur folgen, und beobachten Sie dann den Posteingang auf `Create`/`Note`-Aktivitäten, um zu wissen, wann ein Stream startet.

### Angebot / Stream-Ping (ausgehend)

Dies ist eine Owncast-Erweiterung, die die Funktion **featured-streams / mini-verzeichnis** unterstützt. Während der Live-Übertragung sendet der Server regelmäßig eine `Offer`-Aktivität, deren `object` die Server-URL ist und die [Owncast-spezifische Metadaten](#owncast-custom-namespace) enthält (Stream-Status, Titel, Beschreibung, Servername, Logo, Tags). Es ermöglicht einem empfangenden Verzeichnis, seine Liste der Live-Streams ohne Abfragen aktuell zu halten. Das übereinstimmende Offline-Signal ist die eingehende [`Leave`](#server-to-server-activities) Aktivität. Owncast sendet `Offer` und `Leave` nur an Follower, die sich als Verzeichnis identifiziert haben (siehe [den benutzerdefinierten Namespace](#owncast-custom-namespace)), niemals an normale Fan-Follower.

### Update, Follow, Accept

- **`Update`** des `Service`-Akteurs wird an Follower gesendet, wenn sich die Metadaten des Serverprofils ändern, sodass entfernte Caches aktualisiert werden.
- **`Follow`** wird gesendet, wenn ein Betreiber einem anderen Owncast-Server folgt. Der Server erwartet dann eine `Accept` (oder `Reject`) zurück.
- **`Akzeptieren`** wird automatisch als Antwort auf ein eingehendes `Folgen` gesendet, wenn der Server im öffentlichen (Auto-Bestätigungs-)Modus ist.

## Aktivitäten, die Owncast erhält (eingehend)

Liefern Sie diese, indem Sie eine signierte Aktivität an den Posteingang des Akteurs `inbox` senden. Owncast plant, signiert und versendet jede einzelne.

| Aktivität                           | Bearbeitung                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Folgen`                            | Speichert den Follower; genehmigt automatisch und gibt `Akzeptieren` im öffentlichen Modus zurück (in privatem Modus zurückgehalten, um genehmigt zu werden). Ein Folgen, das den Marker `ns#directory` trägt, wird unabhängig vom Modus immer zur manuellen Genehmigung zurückgehalten und gibt das Folgeereignis nicht aus. Sonst gibt es ein `FediverseEngagementFollow`-Ereignis aus. |
| `Rückgängig` → `Folgen`             | Entfernt den Follower.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `Gefällt mir`                       | Einen Engagement gegenüber einem lokalen Objekt aufzeichnen. Gibt `FediverseEngagementLike` aus.                                                                                                                                                                                                                                                                                                                             |
| `Ankündigen`                        | Boost/Repost eines lokalen Objekts. Aufzeichnet ein Engagement und gibt `FediverseEngagementRepost` aus.                                                                                                                                                                                                                                                                                                                     |
| `Akzeptieren` → `Folgen`            | Markiert einen entfernten Owncast-Server, dem wir gefolgt sind, als akzeptiert (Flow der hervorgehobenen Streams).                                                                                                                                                                                                                                                                                                        |
| `Ablehnen` → `Folgen`               | Markiert unser Folgen eines entfernten Servers als abgelehnt.                                                                                                                                                                                                                                                                                                                                                                                |
| `Angebot`                           | Ein Stream-Ping von einem anderen Owncast-Server. Wenn er `streamStatus: "live"` trägt, markiert Owncast diesen Server in seiner Tabelle der föderierten Server als online und speichert die gestreamten Metadaten.                                                                                                                                                                                                          |
| `Verlassen`                         | Das offline Pendant zu `Angebot`: markiert den Stream des entfernten Owncast-Servers als offline.                                                                                                                                                                                                                                                                                                                            |
| `Aktualisieren` → `Person`/`Dienst` | Aktualisiert gespeicherte Metadaten (Anzeigename, Posteingang, gemeinsamer Posteingang, Avatar) für einen bestehenden Follower.                                                                                                                                                                                                                                                                                           |
| `Erstellen`                         | **Nicht akzeptiert.** Owncast lehnt absichtlich eingehende `Erstellen`-Aktivitäten ab – Sie können nichts in einen Owncast-Server über ActivityPub posten oder darauf antworten.                                                                                                                                                                                                                                             |

Zwei wichtige Schutzmaßnahmen:

- **Engagement-Altersgrenze.** `Gefällt mir` und `Ankündigen`-Aktivitäten werden nur aufgezeichnet, wenn das referenzierte Objekt nicht älter als **36 Stunden** ist. Ältere Engagements werden ignoriert. Dies hält Engagement-Benachrichtigungen an aktuelle Streams gebunden.
- **Blockieren & SSRF.** Eingehende Aktivitäten von blockierten Domains/Akteuren werden während der Signaturverifizierung abgelehnt. Ausgehende Lieferungen lehnen nicht-HTTPS- und interne/Loopback-Posteingangs-URLs ab.

### Server-zu-Server-Aktivitäten

`Angebot`, `Verlassen`, `Akzeptieren` und `Ablehnen` bilden zusammen das Owncast-zu-Owncast-Protokoll für "hervorgehobene Streams". Wenn Sie ein Verzeichnis oder einen Aggregator erstellen, der teilnehmen möchte, lautet das Muster:

1. Senden Sie ein `Folgen`, das den Marker `ns#directory` setzt (siehe [den benutzerdefinierten Namensraum](#owncast-custom-namespace)) an den Akteur des Owncast-Servers. Der Betreiber genehmigt dies manuell und erwartet dann ein `Akzeptieren`.
2. Erhalten Sie regelmäßig `Angebot`-Aktivitäten (mit Owncast-Metadaten), während der Server live ist.
3. Erhalten Sie ein `Verlassen`, wenn der Stream endet.

Sie können auch nur die Standard `Erstellen`/`Notiz`-Go-Live-Posts konsumieren, wenn Sie keine Echtzeit-Loopback-Pings benötigen.

## Owncast benutzerdefinierter Namensraum

Owncast fügt eine kleine Menge benutzerdefinierter JSON-LD-Eigenschaften unter dem Namensraum **`https://owncast.online/ns#`** hinzu. Die Stream-Metadaten-Eigenschaften erscheinen als zusätzliche Top-Level-Felder in `Angebot` (und verwandten Server-zu-Server-)Aktivitäten und ermöglichen es einem Empfänger, einen Verzeichniseintrag aus einer einzigen Aktivität zu befüllen. Der Marker `ns#directory` erscheint auf einem `Folgen` und kennzeichnet den Absender als Verzeichnis. Alle sind optional und können ignoriert werden, wenn Sie sich nur für die Standard ActivityPub interessieren.

| Eigenschaft                                   | Typ               | Bedeutung                                                                                                  |
| --------------------------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------- |
| `https://owncast.online/ns#streamStatus`      | string            | `"live"` oder `"offline"`. Immer präsent bei Server-zu-Server-Aktivitäten. |
| `https://owncast.online/ns#streamTitle`       | string            | Aktueller Streamtitel, wenn eingestellt.                                                   |
| `https://owncast.online/ns#streamDescription` | string            | Serverzusammenfassung/Beschreibung.                                                        |
| `https://owncast.online/ns#serverName`        | string            | Menschenlesbarer Servername.                                                               |
| `https://owncast.online/ns#logoUrl`           | string            | Absolute URL zum Serverlogo.                                                               |
| `https://owncast.online/ns#thumbnailUrl`      | string            | Absolute URL zum aktuellen Stream-Thumbnails.                                              |
| `https://owncast.online/ns#streamTags`        | Array von Strings | Server-Metadaten-Tags.                                                                     |
| `https://owncast.online/ns#directory`         | boolean           | Auf `true` setzen bei einem `Folgen`, um den Absender als Verzeichnis zu kennzeichnen.     |

Ein Verzeichnis identifiziert sich, indem es `ns#directory` auf `true` bei dem `Folgen`, das es sendet, setzt. Dieser Marker, und nur dieser Marker, lässt Owncast das Folgen als Verzeichnisaufstellung behandeln: es hält das Folgen zur Genehmigung für den Betreiber zurück, und sobald genehmigt, liefert es die `Angebot`- und `Verlassen`-Stream-Pings an diesen Follower. Die oben genannten Stream-Metadatenfelder sind nur beschreibend und identifizieren nicht von sich aus ein Verzeichnis.

## Ein Verzeichnis von Owncast-Streams erstellen

Die Server-zu-Server-Aktivitäten, die die eigene Funktion der hervorgehobenen Streams von Owncast unterstützen, stehen zur Nutzung offen. Wenn Sie ein Verzeichnis oder einen Aggregator betreiben möchten, der verfolgt, welche Owncast-Server live sind, folgen Sie jedem Server so, wie es jeder Fediverse-Akteur tun würde, und reagieren Sie dann auf die Lebenssignals, die er sendet.

Für ein vollständiges, ausführbares Beispielverzeichnis siehe das [owncast-directory-example](https://github.com/owncast/owncast-directory-example) Repository. Es ist eine kleine Python-Anwendung, die alles in diesem Abschnitt implementiert: einen veröffentlichten Akteur, das `ns#directory`-Folgen, die Bearbeitung von `Angebot`/`Verlassen`/`Ablehnen` und eine Webseite, die die laufenden Server auflistet. Betrachten Sie es als Ausgangspunkt und nicht als Produktionsdienst.

Sie benötigen einen veröffentlichten Akteur und signierte Anfragen, genau wie jeder Follower (siehe [HTTP-Signaturen](#http-signatures)). Von dort:

1. Senden Sie ein signiertes `Folgen`, das `https://owncast.online/ns#directory` auf `true` setzt (siehe [den benutzerdefinierten Namensraum](#owncast-custom-namespace)) an den jeweiligen Akteur des Servers. Dieser Marker kennzeichnet Sie als Verzeichnis, das dafür sorgt, dass der Server seine Stream-Pings an Sie sendet, und es macht die Auflistung optional: Ein Owncast-Server hält ein Verzeichnis folgen immer für seinen Betreiber zurück, um es manuell zu genehmigen, unabhängig davon, wie die Federation-Privatsphäre des Servers konfiguriert ist. Sie erhalten keinen Status, bis der Betreiber genehmigt, also erwarten Sie, dass die Einträge ausstehend bleiben, bis jeder sich einträgt. Ein `Folgen` ohne den Marker wird als gewöhnliches Fan-Folgen behandelt: Es kann automatisch akzeptiert werden, wird jedoch niemals die `Angebot`/`Verlassen`-Pings empfangen.
2. Solange ein Server läuft, sendet er in etwa alle 5 Minuten ein `Angebot` in Ihren Posteingang, das die [Owncast-Benutzerdefinierten Metadaten](#owncast-custom-namespace): Stream-Status, Titel, Beschreibung, Servername, Logo, Thumbnail und Tags enthält. Erstellen oder aktualisieren Sie den Verzeichniseintrag dieses Servers aus diesen Feldern.
3. Wenn der Stream sauber endet, sendet der Server ein `Verlassen`. Markieren Sie den Eintrag als offline.
4. Wenn der Betreiber des Servers Ihr Verzeichnis von seiner Seite entfernt, sendet der Server eine `Ablehnen`-Antwort auf Ihr ursprüngliches `Folgen`. Löschen Sie den Eintrag: Sie sind nicht mehr berechtigt, diesen Server aufzulisten, und er wird Ihnen keine Pings mehr senden.

Es gibt keinen eingebauten Ablauf für einen Owncast-Server, um einen Platz in Ihrem Verzeichnis anzufordern, daher ist das Zusammenstellen der Liste Ihre Aufgabe. Eine einfache Möglichkeit, Betreibern die Zustimmung zu ermöglichen, besteht darin, ein Einreichformular in Ihr Verzeichnis zu stellen, in dem ein Betreiber seine Server-URL eingibt. Sie und Ihr Verzeichnis entscheiden, welche Einträge aufgelistet werden und welche abgelehnt werden. Wenn Sie einen akzeptieren, folgen Sie diesem Server wie oben beschrieben. Der Betreiber genehmigt das Folgen, was ein Einreicher erwarten kann, und der Flow von Folgen, akzeptieren und Ping führt zu ihrer Stream-Liste.

Betrachten Sie die Pings als einen Herzschlag. Wenn ein Server aufhört, `Angebot`-Aktivitäten ohne ein `Verlassen` zu senden, weil er abgestürzt ist, die Verbindung verloren hat oder durch eine Firewall blockiert wurde, sagt Ihnen nichts aktiv, dass er ausgefallen ist. Setzen Sie jedes Element, von dem Sie in mehreren Ping-Intervallen nichts gehört haben, ab. Owncasts eigenes Verzeichnis kennzeichnet einen Peer nach zwei versäumten Pings als offline, etwa nach 11 Minuten, und überprüft die Staleness alle Minute.

Einige Dinge, die es wert sind, richtig zu machen:

- Die Metadatenfelder stammen vom entfernten Server, behandeln Sie sie daher als unsichere Eingabe. Begrenzen Sie Längen und bestätigen Sie, dass jede URL `http` oder `https` ist, bevor Sie sie rendern. Der Wert, dem Sie vertrauen können, ist die Server-URL, die Sie ausgewählt haben, um ihr zu folgen, nicht der Anzeigename, den der Server sendet.
- Die Thumbnail- und Logo-URLs sind stabil, sodass der Browser sie cachen kann. Fügen Sie eine sich ändernde Cache-busting-Anfrage hinzu, wenn Sie einen Eintrag aktualisieren, wenn Sie möchten, dass die Vorschau aktuell bleibt.
- Sie müssen die Pings überhaupt nicht verwenden. Wenn Sie nur wissen müssen, dass ein Server live ist, anstatt ständig eine Ansicht darüber zu haben, wer gerade live ist, folgen Sie dem Akteur und achten Sie auf die Standard `Erstellen`/`Notiz`-Go-Live-Posts wie jeder andere Fediverse-Nutzer.

Um Ihren Dienst als Verzeichnis anerkannt zu werden, setzen Sie `https://owncast.online/ns#directory` auf `true` bei dem `Folgen`, das Sie senden. Ein Server, der es sieht, hält das Folgen für seinen Betreiber zurück und sendet Ihnen, sobald genehmigt, seine Stream-Pings.

## Endpunktverweisung

Alle Pfade sind relativ zur Basis-URL des Servers. Jeder Endpunkt gibt `405` zurück, wenn die Federation deaktiviert ist.

| Pfad                                  | Methode | Zweck                                                     |
| ------------------------------------- | ------- | --------------------------------------------------------- |
| `/.well-known/webfinger`              | GET     | Löst `acct:` → Akteur-IRI auf                             |
| `/.well-known/host-meta`              | GET     | XRD-Zeiger zu WebFinger                                   |
| `/.well-known/nodeinfo`               | GET     | NodeInfo-Entdeckungsdokument                              |
| `/nodeinfo/2.0`                       | GET     | NodeInfo 2.0 Server-Metadaten             |
| `/.well-known/x-nodeinfo2`            | GET     | x-nodeinfo2 Server-Metadaten                              |
| /api/v1/instance                      | GET     | Mastodon-kompatible Instanzbeschreibung                   |
| /federation/user/{username}           | GET     | Das `Service`-Akteursdokument                             |
| /federation/user/{username}/inbox     | POST    | Aktivitäten an den Server liefern                         |
| /federation/user/{username}/outbox    | GET     | Sammlung von Aktivitäten, die der Server gesendet hat     |
| /federation/user/{username}/followers | GET     | Paginierte Followersammlung                               |
| /federation/user/{username}/following | GET     | Immer `404` (keine Followerliste)      |
| /federation/{object-id}               | GET     | Abrufen eines einzelnen gespeicherten ActivityPub-Objekts |

## Eine kompatible Anwendung erstellen — Checkliste

Um einen Owncast-Stream von Ihrer eigenen Anwendung aus zu folgen und zu konsumieren:

1. **Lösen** Sie den Handle mit WebFinger (`acct:live@host`), um die Akteur-IRI zu erhalten, und holen Sie dann den Akteur mit `Accept: application/activity+json`.
2. **Veröffentlichen Sie Ihren eigenen Akteur** mit einem `publicKey`, der über HTTPS bereitgestellt wird, mit einem erreichbaren `inbox`.
3. **Senden Sie ein signiertes `Follow`** an das Postfach des Akteurs. Signieren Sie `(request-target) host date digest` mit RSA und fügen Sie einen SHA-256 `Digest` hinzu.
4. **Behandeln Sie die `Accept`-Nachricht**, die Owncast an Ihr Postfach sendet (öffentlicher Modus) – oder warten Sie auf die manuelle Genehmigung (privater Modus).
5. **Hören Sie auf Live-Beiträge**: `Create`/`Note`-Aktivitäten, die in Ihrem Postfach ankommen, teilen Ihnen mit, dass der Stream gestartet ist; der `alternate`/`application/x-mpegURL` WebFinger-Link gibt Ihnen die HLS-URL zum Abspielen.
6. **Optional** als Verzeichnis fungieren: Setzen Sie `https://owncast.online/ns#directory` auf `true` in Ihrem `Follow`, lassen Sie den Betreiber es genehmigen, und konsumieren Sie die `Offer`/`Leave`-Pings sowie die `https://owncast.online/ns#*`-Metadaten für Echtzeit-Live-Präsenz und reichhaltigere Verzeichniseinträge.
7. **Überprüfen Sie** die Signatur auf allem, was Owncast Ihnen sendet, gegen den `#main-key` des Akteurs.

Denken Sie daran, dass Owncast keine Antworten oder Beiträge akzeptiert (`Create` wird abgelehnt) und keine `following`-Liste anzeigt, gestalten Sie Ihre Integration also um Folgen + Benachrichtigungen + Likes/Boosts herum, anstatt um eine zweiseitige Konversation.
