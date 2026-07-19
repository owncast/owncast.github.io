---
title: Python SDK
description: 'Schreiben Sie Owncast-Plugins in Python mit owncast-plugin-py: installation, die Dekoratoren @plugin, die CLI owncast-plugin-py und Tests.'
sidebar_position: 3
sidebar_label: Python
toc_min_heading_level: 2
toc_max_heading_level: 3
tags:
  - Plugins
  - SDK
  - Python
---

Das Python SDK, `owncast-plugin-py`, ermöglicht es Ihnen, Owncast-Plugins in **Python** zu erstellen. Sie schreiben gewöhnliches Python mit Dekoratoren. Ein Build-Schritt verwandelt es in ein einzelnes installierbares Plugin, das innerhalb des Owncast-Servers in einer Sandbox ausgeführt wird: dasselbe `.ocpkg`-Format und das volle Funktionsspektrum wie das [JavaScript SDK](/docs/plugins/sdks/javascript), sodass ein Python-Plugin ein gleichwertiger Partner eines JS-Plugins ist.

:::info[Neu in Owncast 0.3.0]
Die Plugin-SDKs sind brandneu in Owncast 0.3.0, und die API entwickelt sich immer noch weiter. Wenn Sie auf einen Fehler stoßen oder einen Vorschlag haben, bitte [öffnen Sie ein Problem](https://github.com/owncast/plugin-sdk/issues) oder [chatten Sie live mit der Community](/chat?tab=community).
:::

Diese Seite ist die Python-spezifische Schicht: Installation, die Dekoratoren `@plugin`, die CLI `owncast-plugin-py` und Tests. Handler, APIs, Berechtigungen und das Manifest funktionieren in beiden SDKs gleich und haben ihre eigenen Referenzseiten.

## Wie es in die Referenzdokumente passt

Die gemeinsamen Referenznamen von Handlern und APIs in ihrer kanonischen (camelCase) Form. Um es als Python zu lesen, wenden Sie eine Regel an: **alles ist `snake_case`.** Schnelle Orientierung:

| In der Referenz                                                                                                 | In Python                                                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Definieren Sie einen Handler                                                                                    | eine mit `@plugin.*` dekorierte Funktion                                                                                                                            |
| Handler für ein Ereignis (z.B. `chat.message.received`)      | `@plugin.on_chat_message`                                                                                                                                           |
| Rufen Sie eine Host-API auf (z.B. `owncast.chat.sendAction`) | `owncast.chat.send_action(text)`: snake_case                                                                                   |
| Payload-Felder (z.B. `msg.user.displayName`)                 | `msg.user.display_name`, `msg.client_id`. `msg.raw` für das rohe dict.                                                              |
| Filterergebnis (`filter.pass()`)                                                             | `filter.pass_()` (trailing `_`: `pass` ist ein Schlüsselwort). Auch `filter.modify(...)` / `filter.drop(reason)` |
| Abonnieren Sie ein benutzerdefiniertes Ereignis                                                                 | `@plugin.on("my.event")`                                                                                                                                            |
| Bauen / Testen Sie Ihr Plugin                                                                                   | `owncast-plugin-py package` / `owncast-plugin-py test`                                                                                                              |

## Voraussetzungen

- Ein Owncast-Server, den Sie verwalten können, Version 0.3.0 oder neuer.
- Python 3.8 oder neuer.

## Installieren

Erstellen Sie ein Projekt mit `new`, indem Sie den Slug übergeben. `uvx` führt den Scaffolder direkt von PyPI aus, ohne etwas zu installieren:

```sh
uvx owncast-plugin-py new my-plugin
cd my-plugin
```

Installieren Sie das SDK, um die CLI `owncast-plugin-py` in Ihren PATH für die Schritte Bauen, Testen, Bereitstellen und Paketieren zu erhalten:

```sh
uv tool install owncast-plugin-py      # oder:  pip install owncast-plugin-py
```

Sie erhalten ein bereit zum Bauen Verzeichnis:

```text
my-plugin/
├── plugin.manifest.json     Name, Slug, Version, Berechtigungen
├── README.md                wie man es baut, testet, paketiert und installiert
├── INSTRUCTIONS.md          optional, wird als Registerkarte im Admin gerendert
├── AGENTS.md                Hinweise für KI-Coding-Agenten
├── .agents/                 eine gebündelte Fähigkeit für KI-Coding-Agenten
├── src/plugin.py            Ihr Code, mit einem Beispiel-Handler
└── __tests__/*.test.json    ein Beispiel-Szenariotest
```

## Schreiben Sie ein Plugin

Importieren Sie `plugin`, `owncast` und `filter`, und registrieren Sie Handler mit Dekoratoren. Jeder Dekorator abonniert ein Ereignis. Das SDK leitet die Abonnentenliste des Manifests davon ab, welche Handler Sie definieren.

```python
from owncast_plugin import plugin, owncast, filter


@plugin.on_chat_message
def greet(msg):
    name = msg.user.display_name if msg.user else "jemand"
    owncast.chat.send(f"{name} sagte: {msg.body}")


@plugin.filter_chat_message
def block_spam(msg):
    return filter.drop("spam") if "spam" in msg.body else filter.pass_()
```

Das Modul exportiert drei Dinge:

- **`plugin`**: das Dekorator-Register. `@plugin.on_chat_message`, `@plugin.filter_chat_message`, `@plugin.on_stream_started`, `@plugin.on_tick`, `@plugin.on_fediverse_follow` und der Rest spiegeln die Laufzeitevents in der [Handlerreferenz](/docs/plugins/events) wider. Zwei benötigen einen Schlüssel: `@plugin.on("custom.event")` für plugin-emittierte Ereignisse und `@plugin.on_tab_content("slug")` / `@plugin.on_page_content("slug")` für die dynamische HTML-Viewer-Seite. Zwei benötigen keinen Schlüssel: `@plugin.on_page_styles` und `@plugin.on_page_scripts` geben CSS und JavaScript zurück, die zur Anfragezeit in die Viewer-Seite injiziert werden, getrennt von `ui.modify`.
- **`owncast`**: der Host-API-Namespace. Methodennamen sind **`snake_case`** (`owncast.chat.send_action`, `owncast.kv.get_json`). Jeder Aufruf ist an die entsprechende Berechtigung gebunden, die Sie in Ihrem Manifest deklarieren. Siehe die [APIs-Referenz](/docs/plugins/apis).
- **`filter`**, filtert Ergebnisse, die von einem `filter_chat_message`-Handler zurückgegeben werden: `filter.pass_()` (trailing underscore, `pass` ist ein Python-Schlüsselwort), `filter.modify(...)`, `filter.drop(reason)`.

Payloads sind Attributobjekte mit `snake_case`-Zugriffsnamen über das Wire-JSON (`msg.body`, `msg.user.display_name`, `msg.client_id`). Verwenden Sie `msg.raw` für das zugrunde liegende dict. Hostaufrufe, die JSON-Objekte zurückgeben, kommen als dieselben Attributobjekte zurück (`owncast.server.info().name`). Listen kommen als Python-Listen zurück.

Zwei weitere Python-Idiome, die es wert sind, bekannt zu sein, werden beide umfassend dokumentiert (mit Python-Beispielen) auf den Fachseiten:

- **HTTP-Routing**: Plugins mit `http.serve` deklarieren Routen mit Dekoratoren: `@plugin.get/post/put/delete/patch(path)`, `@plugin.route(path, methods=[...])`, `@plugin.on_http_request(path)` und ein bloßes `@plugin.on_http_request`, das alles abfängt. Ein Handler gibt ein `dict` zurück (`{status, body, headers}`), ein `str` (→ 200) oder `None` (→ 204). Siehe [HTTP-Dienste](/docs/plugins/http).
- **Chat-Befehle**: `plugin.commands({...})` deklariert Befehle mit Aliassen, Moderator-Gating und pro Benutzer Cooldowns. Der integrierte `!help` listet sie automatisch auf. Siehe [Chat-Befehle](/docs/plugins/commands).

## Die CLI

Die Installation des SDK gibt Ihnen `owncast-plugin-py`. Bauen und Paketieren bündelt Ihren Quellcode und benötigt keinen Compiler. Die Befehle `test` und `serve` holen sich beim ersten Gebrauch die vorkompilierten Host-Binärdateien (der Szenario-Läufer und der Entwicklungsserver):

| Befehl                                | Was es tut                                                                                               |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `owncast-plugin-py new my-plugin`     | Erstellen Sie ein neues Plugin-Projekt in `./my-plugin`                                                  |
| `owncast-plugin-py build my-plugin`   | Bauen Sie `src/plugin.py` (ohne Verpackung)                                           |
| `owncast-plugin-py test my-plugin`    | Bauen Sie dann die Szenarien von `__tests__/` aus                                                        |
| `owncast-plugin-py serve my-plugin`   | Lokaler Entwicklungsserver (`-p/--port` zum Ändern des Ports, standardmäßig auf 8080) |
| `owncast-plugin-py package my-plugin` | Build + Bundle → `<slug>.ocpkg`: die Datei, die Sie versenden                            |

```sh
owncast-plugin-py package my-plugin    # produziert my-plugin.ocpkg
owncast-plugin-py test my-plugin
owncast-plugin-py serve my-plugin      # POST /_dev/chat zum Steuern der Ereignis-Handler
```

Das Verzeichnisargument ist standardmäßig auf `.` eingestellt, sodass Sie in das Projekt `cd` gehen können und es weglassen können. Die `.ocpkg` ist das einzige Distributionsartefakt. Siehe [Verpackung & Verteilung](/docs/plugins/packaging) für Inhalte und Installationsanweisungen.

## Einschränkungen, die Sie kennen sollten

Einige Dinge darüber, wie Python-Plugins gebaut werden, beeinflussen, wie Sie sie schreiben. Sie importieren `owncast_plugin` normalerweise für Editor-Unterstützung und Unit-Tests. Der Build kümmert sich um den Rest.

- **Nur reines Python und kein `pip`.** Es gibt keinen `pip install` Schritt: Sie fügen Drittanbieter-Code hinzu, indem Sie dessen (reinen Python-) Quellcode in Ihr Projekt kopieren. Abhängigkeiten mit C-Erweiterungen (numpy, pandas und dergleichen) laden nicht. Siehe [Drittanbieter-Bibliotheken](#third-party-libraries). Für ausgehendes HTTP verwenden Sie `owncast.http.fetch`, nicht `requests`.
- **Schattieren Sie keine Namen aus der Standardbibliothek.** Eine top-level `def json(...)` (oder ein anderer stdlib-Name) schattet das echte Modul und kann den Build unterbrechen, und eine Moduldatei, die nach einem stdlib-Modul benannt ist (`src/json.py`), wird zugunsten des echten ignoriert. Nennen Sie sie `json_response` und dergleichen.
- **Der Eingang kann keine relativen Importe verwenden.** In `src/plugin.py` importieren Sie Ihre eigenen Module absolut (`from helpers import ...`), nicht `from . import helpers`. Ein relativer Import dort schlägt fehl, obwohl relative Importe innerhalb der Module eines Pakets in Ordnung sind.
- **Überall `snake_case`**, im Gegensatz zu camelCase des JS SDK: `send_action`, `get_json`, `msg.user.display_name`, `filter.pass_()`.

## Drittanbieter-Bibliotheken

Es gibt kein `pip install` und keine `requirements.txt`. Eine Drittanbieterbibliothek funktioniert nur, wenn sie **reines Python ist und Sie ihren Quellcode in `src/` kopieren**, wo sie zu einem Ihrer eigenen Module wird.

:::caution[`pip install` macht nichts]
Das Installieren eines Pakets in einem virtuellen Umfeld hat keine Auswirkung auf das, was versendet wird, und `import requests` schlägt zur Laufzeit fehl. Um eine Bibliothek zu verwenden, kopieren Sie deren `.py`-Quellcode nach `src/` (ein einzelnes Modul oder ein Paketverzeichnis) und importieren Sie es.
:::

- **C-Erweiterungen funktionieren niemals.** numpy, pandas, lxml, Pydantic v2 und alles andere mit kompiliertem Code wird nicht geladen.
- **Sie besitzen den gesamten Baum.** Wenn eine Bibliothek, die Sie einfügen, andere Drittanbieterpakete importiert, kopieren Sie diese ebenfalls, oder wählen Sie eine kleinere aus.
- **Verwenden Sie `owncast.http.fetch` für ausgehendes HTTP**, nicht `requests`.

Die Standardbibliothek ist verfügbar, solange das Modul reines Python ist (`json`, `re`, `datetime`, `base64` und dergleichen).

Zum Beispiel benötigt das [`page-content-demo`](https://github.com/owncast/plugin-sdk/tree/main/examples/python/page-content-demo) Beispiel eine Mustache-Vorlagendatei. Statt ein Vorlagenpaket zu kopieren, versendet es einen kleinen Mustache-Subset-Renderer.

## Tests

Tests sind `__tests__/*.test.json`-Szenario-Dateien, die mit `owncast-plugin-py test` ausgeführt werden. Das Format ist **identisch mit dem des JS SDK**, sodass ein Python-Port eines Plugins die Testszenarien der JS-Version unverändert wiederverwenden kann. Jedes Szenario dispatches Ereignisse / HTTP-Anfragen und beansprucht auf beobachtete Nebeneffekte (`chatSends`, kv-Schreibungen, HTTP-Antworten, …).

```json
[
  {
    "name": "echoes the message",
    "events": [
      {
        "event": "chat.message.received",
        "payload": { "user": { "id": "u1", "displayName": "alice" }, "body": "hi" }
      }
    ],
    "expect": { "chatSends": ["alice sagte: hi"] }
  }
]
```

Das vollständige Szenariodatenmodell (Schrittarten, `given`-Zustand, `expect`-Assertions) finden Sie auf der Seite [Testing](/docs/plugins/testing). Beachten Sie, dass das Szenario-JSON die **Draht**-Feldnamen (camelCase: `displayName`, `clientId`) verwendet, da es Hostereignisse beschreibt und nicht Ihren Python-Code.

## Status

Die Laufzeit, die `owncast-plugin-py`-CLI (Scaffold, Build, Test, Serve, Package), die vollständige Host-API, HTTP-Routing und `.ocpkg`-Verpackung funktionieren alle heute. Alle JS-Beispielplugins haben Python-Entsprechungen unter [`examples/python/`](https://github.com/owncast/plugin-sdk/tree/main/examples/python).

## Wohin Sie als Nächstes gehen können

- [Handlerreferenz](/docs/plugins/events): jedes Ereignis, auf das Sie sich abonnieren können (lesen Sie Namen als `snake_case`).
- [APIs-Referenz](/docs/plugins/apis): jede `owncast.*`-Methode und die Berechtigung, die sie benötigt.
- [Testing](/docs/plugins/testing): das vollständige Szenariodatenmodell.
- [Verpackung & Verteilung](/docs/plugins/packaging): Bauen des `.ocpkg` und Installation.
- [Python-Beispielplugins](https://github.com/owncast/plugin-sdk/tree/main/examples/python): eines pro Funktion, jedes ein vollständiger Ausgangspunkt, den Sie kopieren können.
- [SDK-Quellcode](https://github.com/owncast/plugin-sdk): das `owncast-plugin-py`-Paket und das Toolchain.
