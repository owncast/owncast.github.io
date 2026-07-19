---
title: JavaScript SDK
description: 'Eigenes Owncast-Plugins in JavaScript oder TypeScript mit @owncast/plugin-sdk: Vorlagen, die definePlugin-API, die CLI und das Testszenario-Harness.'
sidebar_position: 2
sidebar_label: JavaScript
toc_min_heading_level: 2
toc_max_heading_level: 3
tags:
  - Plugins
  - SDK
  - JavaScript
  - TypeScript
  - Node.js
---

Das JavaScript SDK, [`@owncast/plugin-sdk`](https://www.npmjs.com/package/@owncast/plugin-sdk), ist der häufigste Weg, um ein Owncast-Plugin zu schreiben. Sie schreiben JavaScript oder TypeScript, und die CLI bündelt es in ein einzelnes installierbares Plugin, das sandboxed im Owncast-Server läuft. Wenn Sie sich zwischen diesem und dem Python SDK entscheiden, sehen Sie sich die [Plugin-Übersicht](/docs/plugins#two-sdks) an.

:::info[Neu in Owncast 0.3.0]
Die Plugin-SDKs sind brandneu in Owncast 0.3.0 und die API entwickelt sich weiter. Wenn Sie einen Fehler feststellen oder einen Vorschlag haben, öffnen Sie bitte ein [Problem](https://github.com/owncast/plugin-sdk/issues) oder [chatten Sie live mit der Community](/chat?tab=community).
:::

Diese Seite ist die spezifische Schicht für JavaScript: Vorlagen, `definePlugin`, die CLI und TypeScript. Handler, APIs, Berechtigungen und das Manifest funktionieren in beiden SDKs identisch und haben ihre eigenen Referenzseiten.

## Wie es auf die Referenzdokumentation abgebildet ist

Die gemeinsamen Referenznamen-APIs befinden sich in ihrer kanonischen Form, die die JavaScript-Form ist: Sie können sie unverändert lesen. Schnelle Orientierung:

| In der Referenz                                                                                             | In JavaScript                                                        |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Ein Handler definieren                                                                                      | eine Methode an `definePlugin({ ... })`                              |
| Handler für ein Ereignis (z.B. `chat.message.received`)  | `onChatMessage(msg)`: CamelCase, `on` + das Ereignis |
| Einen Host-API aufrufen (z.B. `owncast.chat.sendAction`) | identisch: `owncast.chat.sendAction(text)`           |
| Payload-Felder                                                                                              | CamelCase: `msg.user.displayName`, `msg.clientId`    |
| Ergebnis filtern                                                                                            | `filter.pass()` / `filter.modify(payload)` / `filter.drop(reason)`   |
| Sich über ein benutzerdefiniertes Ereignis anmelden                                                         | `on: { "my.event"(payload) { … } }`                                  |
| Bauen / Testen Sie Ihr Plugin                                                                               | `npm run package` / `npm test`                                       |

## Voraussetzungen

- Ein Owncast-Server, den Sie verwalten können, Version 0.3.0 oder neuer.
- Node.js 18 oder neuer (`node --version` zur Überprüfung).

## Ein neues Plugin anlegen

Sie installieren das SDK nicht von Hand. Ein Projekt mit `create-owncast-plugin` anlegen und die generierte `package.json` listet bereits `@owncast/plugin-sdk` als Abhängigkeit auf:

```sh
npx create-owncast-plugin@latest my-plugin
cd my-plugin
npm install     # ruft die Test- und Servierhilfen ab
```

Übergeben Sie den Slug, den Sie als Argument betrachten möchten. Das Gerüst verwendet ihn für den Verzeichnisnamen, den Ausgabedateinamen und das URL-Präfix. Slugs sind Kleinbuchstaben, Zahlen und Bindestriche, die mit einem Buchstaben beginnen.

Sie haben jetzt:

```text
my-plugin/
├── package.json
├── plugin.manifest.json     Anzeigename, Slug, Version, Berechtigungen
├── README.md                Wie man es erstellt, testet, paketiert und installiert
├── INSTRUCTIONS.md          Optional, als Tab im Admin gerendert
├── AGENTS.md                Hinweise für KI-Coding-Agenten
├── .agents/                 eine gebündelte Fähigkeit für KI-Coding-Agenten
├── src/
│   └── plugin.js            Ihr Code, mit einem Muster-Handler
└── __tests__/
    └── plugin.test.js       ein Muster-Szenariotest
```

`npm install` erstellt auch `node_modules/`. Keine dieser Dateien wird für Sie erstellt, aber Sie können ein `icon.png` (wird in der Admin-Pluginliste angezeigt), ein Verzeichnis `public/` (statische Dateien, die bei `/plugins/my-plugin/` bereitgestellt werden), und ein Verzeichnis `assets/` (Dateien, die der Host in Inlines für Manifestfelder bereitstellt) hinzufügen.

`npm install` führt einen Postinstallationsschritt aus, der die vorinstallierten Test- und Serviererbinärdateien abruft (den Szenarienrunner und den Entwicklungsserver). Das Erstellen und Pakete eines Plugins erfordert keinen Download. Diese Postinstallation ist der einzige Netzwerk-Schritt, und alles danach ist lokal.

## Ein Plugin schreiben

Ein Plugin ist das Objekt, das Sie an `definePlugin` übergeben. Definieren Sie eine Methode für jedes Ereignis, auf das Sie reagieren möchten: Das SDK leitet die Abonnementliste des Manifests von den vorhandenen Methoden ab, sodass es keine separate Liste gibt, die synchron gehalten werden muss.

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

Das Paket exportiert drei Dinge:

- **`definePlugin(handlers)`**: registriert Ihre Handler und gibt das Plugin-Objekt zum Export zurück.
- **`owncast`**: der Host-API-Namensraum (`owncast.chat.send(...)`, `owncast.kv.get(...)` und der Rest). Methodennamen sind **CamelCase**. Jeder Aufruf wird durch die entsprechende Berechtigung, die Sie in Ihrem Manifest deklarieren, gesteuert. Siehe die [APIs-Referenz](/docs/plugins/apis).
- **`filter`**: der Konstruktor für Filterergebnisse: `filter.pass()`, `filter.modify(payload)`, `filter.drop(reason)`. Wird nur von `filterChatMessage` verwendet.

Handlernamen sind CamelCase und entsprechen den Laufzeitevents, die in der [Handlers-Referenz](/docs/plugins/events) aufgelistet sind: `onChatMessage`, `filterChatMessage`, `onChatUserJoined`, `onStreamStarted`, `onTick`, `onFediverseFollow`, `onHttpRequest` usw. Payload-Felder sind ebenfalls CamelCase (`msg.user.displayName`, `msg.clientId`).

Neben den obersten Methoden nehmen zwei Handlergruppen einen Schlüssel und werden als geschachtelte Objekte übergeben: `on: { "my.event"(payload) {} }` für benutzerdefinierte Ereignisse und `onTabContent: { slug(ctx) {} }` / `onPageContent` für dynamische Viewer-Seiten. Zwei weitere benötigen keinen Schlüssel: `onPageStyles()` und `onPageScripts()` geben CSS und JavaScript zurück, die zur Anfragenzeit in die Viewer-Seite injiziert werden, gesteuert durch `ui.modify`. Und anstatt das Präfixparsing in `onChatMessage` manuell zu erstellen, können Sie eine `commands`-Tabelle deklarieren, die der eingebaute `!help` des Hosts automatisch aufnimmt. Beides wird für JavaScript auf den Themenseiten angezeigt: [Handler](/docs/plugins/events), [Befehle](/docs/plugins/commands), und [UI](/docs/plugins/ui).

## TypeScript

Das Paket enthält `index.d.ts`, sodass Sie Autocomplete und Typprüfung für jedes Ereignispayload und jede Host-API ohne zusätzliche Einrichtung erhalten. Nennen Sie Ihren Einstiegspunkt `src/plugin.ts` und die CLI kompiliert ihn auf die gleiche Weise:

```ts
import { definePlugin, owncast, filter, ChatMessage } from '@owncast/plugin-sdk';

export default definePlugin({
  onChatMessage(msg: ChatMessage) {
    owncast.chat.send(`echo: ${msg.body}`);
  },
});
```

Die Build-Prozedur erkennt `src/plugin.ts`, `src/plugin.js`, `plugin.ts` oder `plugin.js` in dieser Reihenfolge. Typen sind nur Deklarationen: Es gibt keinen separaten Kompilierungsschritt oder `tsconfig`, der erforderlich ist.

## Die CLI

Das SDK installiert eine `owncast-plugin` CLI, die über die `package.json`-Skripte bereitgestellt wird, die das Gerüst schreibt:

| Befehl                   | Skript            | Was es tut                                                                              |
| ------------------------ | ----------------- | --------------------------------------------------------------------------------------- |
| `owncast-plugin build`   | `npm run build`   | Bündelt `src/plugin.{js,ts}` in ein Zwischen-Bauartefakt                                |
| `owncast-plugin test`    | `npm test`        | Baut, und führt dann die Szenarien in `__tests__/` durch die echte Laufzeit aus         |
| `owncast-plugin serve`   | `npm run serve`   | Lokaler Entwicklungsserver unter `http://localhost:8080/plugins/<slug>/`                |
| `owncast-plugin package` | `npm run package` | Baut und bündelt alles in `<slug>.ocpkg`: die Datei, die Sie ausliefern |

```sh
npm run package   # erstellt my-plugin.ocpkg
npm test          # führt Ihre Szenarien aus
npm run serve     # iteriert gegen einen lokalen Entwicklungsserver
```

Die `.ocpkg` ist das einzige Verteilungsartefakt: Es enthält Ihr Manifest, den gebündelten Code, Ihre Verzeichnisse `public/` und `assets/`, und eine optionale `icon.png` und `INSTRUCTIONS.md`. Siehe [Paketierung & Verteilung](/docs/plugins/packaging) für den Inhalt und wie Sie es installieren.

In JavaScript führt `npm test` die Dateien `__tests__/*.test.js` aus, die `runScenarios` aufrufen (bauen Sie das Array mit Schleifen, Hilfsfunktionen und Fixtures), oder statische Dateien `__tests__/*.test.json`. Das vollständige Szenarien-Datenmodell und der lokale Entwicklungsserver (`npm run serve`) befinden sich auf der [Testseite](/docs/plugins/testing).

## Einschränkungen, die Sie kennen sollten

Die CLI bündelt Ihren Code in eine einzelne Datei, die in der Sandbox des Servers ausgeführt wird, nicht in Node. Diese Sandbox beeinflusst, wie Sie ein Plugin schreiben:

- **Verwenden Sie `owncast.http.fetch` für ausgehendes HTTP**, nicht das globale `fetch`, `axios` oder ein Paket, das Nodes `http` umwickelt. Der Netzwerkzugang erfolgt über die Host-API und wird durch die Berechtigung `network.fetch` gesteuert. Siehe die [APIs-Referenz](/docs/plugins/apis).
- **Nicht jedes npm-Paket funktioniert.** Pure-JavaScript-Pakete werden einwandfrei gebündelt. Alles, was das Node.js-Laufzeit erfordert, funktioniert nicht. Siehe [Drittanbieter-Bibliotheken](#third-party-libraries).

## Drittanbieterbibliotheken

:::caution[Lesen Sie dies, bevor Sie eine Abhängigkeit hinzufügen]
npm-Pakete funktionieren nur, wenn sie **reines JavaScript** sind. Ein Plugin läuft in einer Sandbox, nicht in Node, sodass ein Paket, das `fs`, `net`, `http`/`https`, `path`, `crypto`, `process` oder `child_process` berührt, sauber bündelt und dann bei der Ausführung des Codes einen Fehler auslöst.
:::

Ein Paket kann auch auf eine von Node integrierte Funktion auf einen nicht geprüften Pfad zugreifen, also testen Sie die Teile, die Sie verwenden. Für ausgehendes HTTP verwenden Sie [`owncast.http.fetch`](/docs/plugins/apis), nicht ein HTTP-Client-Paket.

Das Beispiel [`page-content-demo`](https://github.com/owncast/plugin-sdk/tree/main/examples/js/page-content-demo) verwendet das `mustache`-Paket auf diese Weise.

## Was sich im Paket befindet

- `index.js`: die Laufzeit mit `definePlugin`, Befehlshandlern, den `owncast.*`-Host-Wrappern und Filterhelfern.
- `index.d.ts`: TypeScript-Deklarationen für jedes Ereignispayload und jede Host-API.
- `testing.js`: die `runScenarios` / `runScenarioFiles`-Test-API.
- `bin/owncast-plugin`: die CLI (`build`, `test`, `serve`, `package`).
- `scripts/postinstall.js`: ruft während der Installation die vorinstallierten Test- und Servierhost-Binärdateien ab, verwendet von `npm test` und `npm run serve`.

## Wo Sie als Nächstes hingehen sollten

- [Handlers-Referenz](/docs/plugins/events): jedes Ereignis, auf das Sie sich anmelden können, und dessen Payload-Format.
- [APIs-Referenz](/docs/plugins/apis): jede `owncast.*`-Methode und die Berechtigung, die sie benötigt.
- [Testing](/docs/plugins/testing): das vollständige Szenariodatenmodell.
- [Paketierung & Verteilung](/docs/plugins/packaging): Erstellen des `.ocpkg` und deren Installation.
- [Beispiel-Plugins](https://github.com/owncast/plugin-sdk/tree/main/examples/js): eines pro Funktion, jedes ein vollständiger Ausgangspunkt, den Sie kopieren können.
- [SDK-Quellcode](https://github.com/owncast/plugin-sdk): das Paket `@owncast/plugin-sdk` und das Toolchain.
