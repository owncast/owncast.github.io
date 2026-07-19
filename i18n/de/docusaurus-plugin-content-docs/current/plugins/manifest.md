---
title: Manifestreferenz
description: Jedes Feld, das dein Plugin-Manifest enthalten kann, mit Beispielen.
sidebar_position: 3
sidebar_label: Manifest
toc_min_heading_level: 2
toc_max_heading_level: 3
tags:
  - Plugins
  - Manifest
  - Referenz
  - Konfiguration
---

Jedes Plugin hat eine `plugin.manifest.json`-Datei im Root-Verzeichnis. Dies ist die Quelle der Wahrheit für die Identität des Plugins, die Berechtigungen, die es benötigt, die Netzwerkziele, die es anrufen darf, die Verwaltungsseiten, zu denen es beiträgt, und die Aktionsschaltflächen, die es zur Viewer-Oberfläche hinzufügt.

Das Manifest ist das, was ein Administrator prüft, bevor er das Plugin installiert. Der Host analysiert es zur Ladezeit und setzt jede Deklaration durch. Nichts im kompilierten Plugin kann eine Fähigkeit gewähren, die das Manifest nicht angefordert hat.

:::info[Verfügbar in jedem SDK]
Das Manifest ist einfaches JSON, das das Plugin für den Host beschreibt, unabhängig von der Sprache, in der du den Code geschrieben hast. Für die sprachspezifischen Details siehe die **[JavaScript](/docs/plugins/sdks/javascript)** oder **[Python](/docs/plugins/sdks/python)** SDK-Referenz.
:::

## Minimales Manifest

```json
{
  "api": "1",
  "name": "Mein Plugin",
  "version": "0.1.0",
  "description": "Kurze Beschreibung für Administratoren",
  "permissions": []
}
```

`api`, `name` und `version` sind erforderlich. Alles andere ist optional und nur erforderlich, wenn du die entsprechende Funktion verwendest.

## Felder auf oberster Ebene

| Feld               | Typ                                                          | Erforderlich | Beschreibung                                                                                                                                                                                                                         |
| ------------------ | ------------------------------------------------------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `api`              | String                                                       | Ja           | Version des Manifest-Schemas. Derzeit `"1"`.                                                                                                                                                         |
| `name`             | String                                                       | Ja           | Benutzerfreundlicher Anzeigename, der in Verwaltungslisten und Registrierungskarten angezeigt wird. Beispiel: `"Awesome Echo Bot"`.                                                  |
| `slug`             | String                                                       | Nein         | Kanonische Kennung (URL-Präfix, Konfigurationsnamespace, Dateiname). Automatisch vom `name` abgeleitet, wenn weggelassen. Siehe unten.                            |
| `version`          | String                                                       | Ja           | Die Version deines Plugins. Semver empfohlen. Muss mit dem übereinstimmen, was zur Ladezeit von der Runtime gemeldet wird.                                                           |
| `description`      | String                                                       | Nein         | Eine ein Satz lange Zusammenfassung, die der Administrator in der Pluginliste und während der Installation sieht.                                                                                                    |
| `permissions`      | String[] | Nein         | Liste der Berechtigungen, die dein Plugin benötigt. Siehe [Berechtigungen](/docs/plugins/permissions).                                                                                               |
| `config`           | Objekt                                                       | Nein         | Admin-konfigurierbare Einstellungen, die dein Plugin zur Laufzeit liest. Siehe [Konfiguration](/docs/plugins/configuration).                                                                         |
| `bot`              | Objekt                                                       | Nein         | Chatbot-Konfiguration. Siehe [`bot`](#bot-chat-bot-identity).                                                                                                                                        |
| `network`          | Objekt                                                       | Nein         | Ausgehende HTTP-Whitelist, erforderlich, wenn `network.fetch` gewährt wird. Siehe unten.                                                                                                             |
| `actions`          | Object[] | Nein         | Aktionsschaltflächen, die zur Viewer-Oberfläche hinzugefügt werden sollen. Siehe [UI: Aktionsschaltflächen](/docs/plugins/ui#action-buttons).                                        |
| `admin`            | Objekt                                                       | Nein         | Administrationsseiten, die zur Owncast-Admin-Oberfläche hinzugefügt werden sollen. Siehe [UI: Administrationsseiten](/docs/plugins/ui#admin-pages).                                  |
| `styles`           | String[] | Nein         | CSS-Dateien, die in die Viewer-Seite eingebettet sind. Siehe [`styles`](#styles-css-injection).                                                                                                      |
| `scripts`          | String[] | Nein         | JavaScript-Dateien, die in die Viewer-Seite eingebettet sind. Siehe [`scripts`](#scripts-javascript-injection).                                                                                      |
| `extraPageContent` | Objekt                                                       | Nein         | Ein Objekt, das einen Slug und eine optionale HTML-Datei deklariert, die dem Block für zusätzlichen Inhalt des Viewers vorangestellt wird. Siehe [`extraPageContent`](#extrapagecontent-html-block). |
| `tabs`             | Object[] | Nein         | Tabs der Viewer-Seite, die das Plugin zusätzlich zu den integrierten Tabs beisteuert. Siehe [`tabs`](#tabs-viewer-page-tabs).                                                                        |

### `name` und `slug`

`name` ist der benutzerfreundliche Anzeigename. Er kann beliebige Zeichen enthalten, einschließlich Leerzeichen und Satzzeichen, und ist das, was die Administratoren in der Pluginliste sehen, was auf Registrierungsdurchsichtkarten angezeigt wird, und die Standard-Chatbot-Identität.

`slug` ist die kanonische Kennung. Es steuert:

- Das URL-Präfix des Plugins: `/plugins/<slug>/...`
- Der Konfigurations- (Schlüssel-Werte-Speicher) Namespace
- Der Dateiname des gebauten Artefakts (`<slug>.ocpkg`)
- Der Primärschlüssel im Plugin-Register

Slugs sind Kleinbuchstaben, Ziffern und Bindestriche, beginnen mit einem Buchstaben, bis zu 64 Zeichen. Das SDK leitet einen automatisch von `name` ab, wenn `slug` weggelassen wird: Leerzeichen und Satzzeichen werden zu einzelnen Bindestrichen zusammengefasst, Buchstaben in Kleinbuchstaben. `"Awesome Echo Bot"` wird zu `awesome-echo-bot`. Pinne `slug` explizit, wenn die automatische Ableitung nicht deinen Wünschen entspricht, oder wenn dein Anzeigename Zeichen außerhalb von ASCII verwendet (`"Café Helper"` würde ansonsten `caf-helper` ergeben).

Vermeide es, den Slug nach der Veröffentlichung zu ändern: Die Umbenennung wird für Administratoren wie ein anderes Plugin aussehen, mit einem neuen Konfigurationsspeicher. Das Ändern von `name` (nur Anzeige) ist sicher. Es ändert nicht die Identität.

### `bot`: Chatbot-Identität

Plugins, die in den Chat posten (unter Verwendung von `owncast.chat.send`), erscheinen unter einem Chatbot-Benutzer. Standardmäßig erscheint der Bot unter dem angezeigten `name` des Plugins. Überschreibe das mit `bot.displayName`:

```json
{
  "name": "Stream Sidekick",
  "bot": {
    "displayName": "Sidekick"
  }
}
```

Im Chat postet der Bot als "Sidekick" statt als "Stream Sidekick". Beim ersten Laden des Plugins stellt Owncast einen persistierenden Chat-Benutzer bereit, der auf dem `slug` des Plugins basiert (damit die Bot-Identität bei Neuinstallationen und Änderungen des Anzeige-Namens erhalten bleibt).

`bot.displayName` ist nur für Plugins relevant, die die Berechtigung `chat.send` haben. Es wird andernfalls ignoriert.

### `config`: Admin-konfigurierbare Einstellungen

Deklariere typisierte Einstellungen hier, und Owncast rendert ein bearbeitbares Formular dafür im Admin, das dein Plugin zur Laufzeit mit `owncast.config.get` liest. Jeder Eintrag hat einen `type` (`string`, `number` oder `boolean`), einen `default` und eine `description`:

```json
{
  "config": {
    "greeting": { "type": "string", "default": "welcome!", "description": "Nachricht beim ersten Beitreten" },
    "cooldownMs": { "type": "number", "default": 2000, "description": "Cooldown für Benutzer pro Befehl" },
    "modOnly": { "type": "boolean", "default": false, "description": "Auf Moderatoren beschränken" }
  }
}
```

Vollständige Abdeckung, einschließlich wie das Formular gerendert wird, Credential-Masking, Validierung und wo Überschreibungen gespeichert werden, in [Konfiguration](/docs/plugins/configuration).

## `permissions`

Jeder Eintrag schaltet einen Teil der Host-APIs frei. Der Host lehnt Aufrufe zu einer Methode ab, deren Berechtigung du nicht deklariert hast.

```json
{
  "permissions": ["chat.send", "storage.kv", "network.fetch"]
}
```

Siehe [die Berechtigungsreferenz](/docs/plugins/permissions) für die vollständige Liste der Bezeichner und was jeder gewährt.

## `network`: ausgehende HTTP-Whitelist

`network.fetch` ist durch eine explizite Whitelist von Hostnamen gesperrt. Wenn du `network.fetch` in `permissions` deklarierst, benötigst du auch ein Feld `network.allowedHosts`, das die Hosts auflistet, die du aufrufen wirst:

```json
{
  "permissions": ["network.fetch"],
  "network": {
    "allowedHosts": ["api.discord.com", "*.weather.com"]
  }
}
```

Einträge sind Hostnamen-Globs. Bare Namen wie `api.discord.com` entsprechen genau. `*` ist ein Wildcard-Segment, sodass `*.weather.com` mit `api.weather.com` und `data.weather.com` übereinstimmt, aber nicht mit `weather.com` selbst oder `evil.com`.

Das Wildcard `"*"` entspricht jedem Host, aber du musst es explizit schreiben:

```json
{
  "network": { "allowedHosts": ["*"] }
}
```

Das ist beabsichtigt. Administratoren, die das Manifest überprüfen, sehen den Umfang, den sie gewähren. Die meisten Plugins sollten stattdessen die spezifischen Hosts auflisten, die sie aufrufen.

Der Host lehnt das Laden ab, wenn `network.fetch` gewährt wird, ohne dass ein `allowedHosts`-Eintrag vorhanden ist.

## `actions`: Aktionsschaltflächen

Aktionsschaltflächen sind klickbare Einträge, die Owncast unter dem Stream anzeigt. Während dein Plugin aktiviert ist, fügt der Host seine Einträge der Liste hinzu, die Owncast bereits anzeigt.

```json
{
  "permissions": ["ui.modify", "http.serve"],
  "actions": [
    {
      "title": "Chat-Overlay",
      "description": "Öffne das Live-Chat-Overlay",
      "url": "/",
      "icon": "/star.png",
      "color": "#3b82f6"
    },
    {
      "title": "Fehlerverfolgung",
      "url": "https://github.com/example/my-plugin/issues",
      "openExternally": true
    },
    {
      "title": "Über diesen Stream",
      "html": "<p>Live jeden Wochentag um 20:00 UTC.</p>"
    }
  ]
}
```

Jeder Eintrag:

| Feld           | Typ          | Anmerkungen                                                                                                                     |
| -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `title`        | String       | Erforderlich. Die Schaltflächenbeschriftung.                                                    |
| `url`          | String       | Entweder eine absolute `https://...`-URL oder ein Pfad. Wechselwirkung mit `html`.              |
| `html`         | String       | Roh-HTML, das in einem Inline-Modul gerendert wird. Wechselwirkung mit `url`.                   |
| `icon`         | String       | Optionale Bild-URL, die auf der Schaltfläche angezeigt wird. Die gleichen Pfadregeln wie `url`. |
| `color`        | String       | Optionale hex-Farbe für den Hintergrund der Schaltfläche.                                                       |
| `Beschreibung` | Zeichenfolge | Optional. Im Modalfenster angezeigt, das sich für URL-basierte Aktionen öffnet.                 |
| `offenExtern`  | boolesch     | Wenn `wahr`, öffnet sich die URL in einem neuen Tab anstelle eines Inline-Modals.                               |

Regeln, die der Host zur Ladezeit durchsetzt:

- Die Berechtigung `ui.modify` ist erforderlich. Ohne sie wird das Manifest abgelehnt.
- Genau eines von `url` oder `html` pro Eintrag.
- Relative URLs (und Icons), die mit `/` beginnen, werden automatisch mit dem Namensraum Ihres Plugins vorangestellt. `"/"` wird zu `/plugins/my-plugin/`. `"/star.png"` wird zu `/plugins/my-plugin/star.png`. Sichert Ihnen das Hardcoding Ihres Plugin-Namens.
- URLs (und Icons), die in Ihren Namensraum aufgelöst werden, benötigen `http.serve`, da Sie derjenige sind, der sie bereitstellt.
- URLs (und Icons), die auf den Namensraum eines anderen Plugins zeigen, werden abgelehnt. Fängt Tippfehler ab und verhindert, dass ein Plugin die UI eines anderen bewirbt.

Vollständige Abdeckung in [UI: Aktionsschaltflächen](/docs/plugins/ui#action-buttons).

## `admin`: Admin-Seiten

Plugins können Seiten registrieren, die in der Owncast-Admin-UI unter **Plugins** angezeigt werden:

```json
{
  "permissions": ["http.serve"],
  "admin": {
    "pages": [
      { "title": "Einstellungen", "path": "/admin", "icon": "gear" }
    ]
  }
}
```

Jeder Eintrag:

| Feld    | Typ          | Hinweise                                                                                                                                                    |
| ------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `titel` | Zeichenfolge | Erforderlich. Das Tab-Etikett, das in der Admin-UI angezeigt wird.                                                          |
| `path`  | Zeichenfolge | Erforderlich. Ein Pfad-Globb unter dem Namensraum Ihres Plugins (zum Beispiel `"/admin"`, `"/admin/*"`). |
| `icon`  | Zeichenfolge | Optional. Ein kurzer semantischer Name (`gear`, `wrench`, `user` usw.).                  |

Anfragen unter `/plugins/<your-slug>/<path>`, die einem deklarierten Globb entsprechen, sind vom Host auth-gated: nicht authentifizierte Anfragen erhalten einen `401`, bevor Ihr Plugin-Code ausgeführt wird. Vollständige Abdeckung in [UI: Admin-Seiten](/docs/plugins/ui#admin-pages).

## `styles`: CSS-Injektion

Eine Liste von CSS-Dateien, die das Plugin zur Ansichtseite beiträgt. Der Inhalt jeder Datei wird in denselben `<style>`-Block eingefügt, den Owncast bereits für das benutzerdefinierte CSS der Admins verwendet, sodass Plugins die Seite thematisieren können, ohne dass jeder Beitrag sein eigenes `<link>`-Tag benötigt.

```json
{
  "permissions": ["ui.modify"],
  "styles": ["theme.css", "overrides.css"]
}
```

Pfadregeln entsprechen den URLs von Aktionsschaltflächen:

- Einfache Pfade wie `"theme.css"` werden automatisch mit dem Namensraum Ihres Plugins vorangestellt.
- Einzel-Schnecken-Pfade wie `"/theme.css"` erhalten dasselbe Treatment.
- Vollqualifizierte `/plugins/<your-slug>/...`-Pfad gibt weiter.
- Pfade im Namensraum eines anderen Plugins werden abgelehnt.
- `http://` und `https://` URLs werden abgelehnt. Bündeln Sie externe Assets (Schriften, Bilder) und verweisen Sie darauf mit `@font-face` oder `url(...)` aus Ihrem CSS, damit ein Admin, der das Manifest überprüft, jede Datei sieht, die auf ihrer Seite landet.
- Jeder Eintrag muss mit `.css` enden.

Benötigt nur `ui.modify` (das Plugin malt innerhalb des Owncast-Chromes). `http.serve` ist nicht erforderlich: die Bytes jeder Datei werden aus `assets/` gelesen und direkt in `customStyles` auf `/api/config` eingefügt, nicht unter einer URL bereitgestellt. Der Host erzeugt einen `/* plugin: <your-slug> ... */` Kommentar vor jedem Beitrag, sodass ein Leser eine Regel dem Plugin zuordnen kann, das sie bereitgestellt hat.

Für CSS, das von Plugin-Status abhängt, gibt ein `onPageStyles` Handler es zur Anfragezeit zurück, ohne dass ein Manifestfeld benötigt wird. Seine Ausgabe wird nach diesen statischen Dateien an `customStyles` angehängt.

Vollständige Abdeckung in [UI: Viewer-Stylesheets](/docs/plugins/ui#viewer-stylesheets).

## `scripts`: JavaScript-Injektion

Eine Liste von JavaScript-Dateien, die das Plugin zur Ansichtseite beiträgt. Der Inhalt jeder Datei wird an dieselbe Antwort angehängt, aus der das benutzerdefinierte JavaScript der Admins bereits kommt (`/customjavascript`), sodass Plugins die Seite erweitern können, ohne dass jeder Beitrag sein eigenes `<script>`-Tag benötigt.

```json
{
  "permissions": ["ui.modify"],
  "scripts": ["client.js"]
}
```

Pfadregeln und erforderliche Berechtigungen entsprechen `styles`, die auf `.js`-Dateien angewendet werden (nur `ui.modify` wird benötigt, und der Host liest von `assets/` und fügt in `/customjavascript` ein). Wickeln Sie Ihr Skript in ein IIFE, sodass keine Deklarationen auf oberster Ebene mit dem JavaScript des Admins oder anderen Plugins in Konflikt stehen. Der Host erzeugt einen `// plugin: <your-slug> ...` Kommentar vor jedem Beitrag und wickelt jeden Beitrag in einen try/catch, sodass ein Laufzeitfehler eines Plugins nicht die anderen unterbricht.

Für JavaScript, das von Plugin-Status abhängt, gibt ein `onPageScripts` Handler es zur Anfragezeit zurück, ohne dass ein Manifestfeld benötigt wird. Seine Ausgabe wird nach diesen statischen Dateien an `/customjavascript` angehängt.

Vollständige Abdeckung in [UI: Viewer-Skripte](/docs/plugins/ui#viewer-scripts).

## `extraPageContent`: HTML-Block

Ein Objekt, das einen HTML-Block zum Ergänzungsbereich des Betrachters beiträgt, der über den Prosa des Admins auf `/api/config` vorangestellt wird.

```json
{
  "permissions": ["ui.modify"],
  "extraPageContent": { "slug": "banner", "content": "content.html" }
}
```

| Feld      | Typ          | Hinweise                                                                                                                                                                                                                                                               |
| --------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `slug`    | Zeichenfolge | Erforderlich, wenn `content` weggelassen wird (der Host übergibt es an `onPageContent`). Sonst optional. Kleinbuchstaben, Ziffern und Bindestriche, beginnend mit einem Buchstaben.                 |
| `content` | Zeichenfolge | Optional. Relativer Pfad zu einer statischen HTML-Datei in `assets/`. Wenn vorhanden, werden die Bytes dieser Datei direkt eingefügt. Wenn weggelassen, ruft der Host stattdessen `onPageContent` auf. |

**Statisch** (mit `content`): Der Host liest die Datei zur Anfragezeit und fügt die Bytes ein. Gleiche Pfadregeln wie `styles` und `scripts`, die auf einen einzelnen `.html` Eintrag angewendet werden. Plugin-HTML umgeht den Markdown-Prozessor, sodass Tags und Attribute so durchgelassen werden, wie sie geschrieben wurden.

**Dynamisch** (ohne `content`): Implementieren Sie `onPageContent({ slug, user? })` in Ihrem Plugin, um HTML zur Anfragezeit zurückzugeben. Verwenden Sie dies, wenn der Inhalt für jeden Ansehen variieren oder auf Live-Daten basieren soll (z. B. personalisierte Begrüßungen oder aktuelle Stream-Statistiken). `user` ist die Chat-Identität des Zuschauers, sofern authentifiziert.

Benötigt `ui.modify`. `http.serve` ist nicht erforderlich, da das HTML in die Konfigurationsantwort eingefügt wird und nicht als URL bereitgestellt wird. Jeder Beitrag wird mit einem `<!-- plugin: <your-slug> ... -->` Kommentar umwickelt, sodass ein Leser das Markup zuordnen kann.

Vollständige Abdeckung in [UI: Zusätzlicher Seiteninhalt](/docs/plugins/ui#extra-page-content).

## `tabs`: Viewer-Seiten-Registerkarten

Eine Liste von Tabs, die das Plugin zur Registerkartenzeile der Viewer-Seite beiträgt (neben den eingebauten **Über**- und **Follower**-Tabs). Jeder Eintrag benötigt `title`. `content` ist optional, und `slug` ist nur erforderlich, wenn `content` weggelassen wird (ansonsten wird es aus `title` abgeleitet).

```json
{
  "permissions": ["ui.modify"],
  "tabs": [
    { "title": "Musik",    "slug": "music",    "content": "music.html" },
    { "title": "Zeitplan", "slug": "schedule", "content": "schedule.html" }
  ]
}
```

Jeder Eintrag hat:

| Feld      | Hinweise                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`   | Erforderlich. Das auf der Registerkarte angezeigte Etikett.                                                                                                                                                                                                                                                                                                                       |
| `slug`    | Erforderlich, wenn `content` weggelassen wird (ansonsten von `title` abgeleitet). Stabiler Bezeichner, der an `onTabContent` übergeben wird, wenn der Host gerenderte HTML anfordert. Kleinbuchstaben, Ziffern und Bindestriche, beginnend mit einem Buchstaben. Muss innerhalb der Registerkarten des Plugins eindeutig sein. |
| `content` | Optional. Relativer Pfad zu einer HTML-Datei unter `assets/`. Gleiche Pfadregeln wie `extraPageContent` (automatisch mit Ihrem Namensraum vorangestellt, plattformübergreifende Pfade und `http(s)://` URLs abgelehnt, muss mit `.html` enden). Wenn weggelassen, ruft der Host stattdessen `onTabContent` auf.                |

Benötigt `ui.modify`. `http.serve` ist nicht erforderlich: das HTML jeder Registerkarte wird aus `assets/` gelesen und in das `pluginTabs[]` Array auf `/api/config` eingefügt. Die Viewer-Seite ordnet jeden Eintrag einer Registerkarte zu, deren Body das HTML direkt rendert.

Vollständige Abdeckung in [UI: Viewer-Seiten-Registerkarten](/docs/plugins/ui#viewer-page-tabs).

## Manifest-zu-Laufzeit-Vertrag

Wenn Ihr Plugin geladen wird, analysiert der Host das Manifest und fordert die Laufzeit dazu auf, sich selbst zu registrieren. Es vergleicht die beiden und lehnt das Laden ab, wenn sie sich nicht einig sind über:

- `slug` (der kanonische Bezeichner)
- `version`
- Jede Berechtigung, die die Laufzeit verwendet und die nicht im Manifest deklariert ist

Sie schreiben die Registrierung nicht selbst: das SDK generiert sie aus den Handlern, die Sie definieren (siehe Ihre [SDK-Referenz](/docs/plugins) für Informationen dazu, wie Handler in Ihrer Sprache deklariert werden). Zu wissen, dass dieser Vertrag existiert, ist nützlich beim Debuggen. Ein Fehler "Berechtigung zur Laufzeit angefordert, nicht im Manifest deklariert" bedeutet, dass Sie einen Handler hinzugefügt haben, der eine Berechtigung benötigt, die Sie vergessen haben aufzulisten.

## Vollständiges Beispiel

Ein nicht triviales Manifest, das die meisten Funktionen nutzt:

```json
{
  "api": "1",
  "name": "Stream Sidekick",
  "slug": "stream-sidekick",
  "version": "0.2.0",
  "description": "Beträge für Discord zu Beginn des Streams, zeigt einen Overlay an und fügt einen Spendenknopf hinzu.",
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
    "displayName": "Begleiter"
  },
  "network": {
    "allowedHosts": ["api.discord.com", "*.example.com"]
  },
  "actions": [
    {
      "title": "Spenden",
      "url": "https://example.com/donate",
      "openExternally": true
    }
  ],
  "admin": {
    "pages": [
      { "title": "Einstellungen des Begleiters", "path": "/admin", "icon": "gear" }
    ]
  },
  "styles": ["sidekick.css"],
  "scripts": ["sidekick.js"],
  "extraPageContent": { "slug": "intro", "content": "intro.html" },
  "tabs": [
    { "title": "Zeitplan", "slug": "schedule", "content": "schedule.html" }
  ]
}
```
