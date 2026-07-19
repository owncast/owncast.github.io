---
title: Standardanmeldeinformationen
description: Anleitungen zum Anmelden an der Owncast-Admin-Oberfläche und zu den Standardanmeldeinformationen.
unlisted: true
related:
  excludeFromAll: true
---

Die Admin-Oberfläche ist zu finden, indem Sie zu `/admin` auf Ihrem Owncast-Server navigieren (z. B. `https://owncast.example.com/admin`).

[Konfigurieren Sie Ihre Broadcast-Software](/docs/broadcasting), um auf Ihren Owncast-Server zu streamen, erfordert, dass Sie den Endpunkt `/live` sowie den Stream-Schlüssel verwenden. (z. B. `rtmp://owncast.example.com/live` mit dem Stream-Schlüssel `abc123`). Wenn Ihre Software nicht zulässt, dass der Stream-Schlüssel separat angegeben wird, müssen Sie ihn möglicherweise an die URL anhängen, wie z. B. `rtmp://owncast.example.com/live/abc123`.

## Standardanmeldeinformationen

| Standard           | Wert   |
| ------------------ | ------ |
| Admin-Benutzername | admin  |
| Admin-Passwort     | abc123 |
| Stream-Schlüssel   | abc123 |

Dies sind die Standardanmeldeinformationen, um sich an der Owncast-Admin-Oberfläche anzumelden und auf Ihren Owncast-Server zu streamen. Es wird dringend empfohlen, dass Sie diese Werte sofort nach Ihrer ersten Anmeldung ändern, um die Sicherheit Ihres Servers zu gewährleisten.

## Nächste Schritte

1. Richten Sie Ihre Broadcast-Software auf Ihren neuen Server mit `rtmp://yourserver/live` und Ihrem Stream-Schlüssel aus. Wenn Ihre Software keine Möglichkeit hat, einen Stream-Schlüssel anzugeben, verwenden Sie die URL `rtmp://yourserver/live/streamkey` und verwenden Sie stattdessen Ihren Stream-Schlüssel.
2. Greifen Sie von Ihrem Webbrowser aus auf Ihren Server zu, indem Sie `http://yourserver:8080` besuchen.
3. Sie können das Admin-Dashboard unter `http://yourserver:8080/admin` besuchen, wo Sie Besucher- und Serverstatistiken überprüfen, Ihren Stream-Schlüssel ändern, den auf Ihrer Seite angezeigten Inhalt personalisieren und mehr können. Um sich anzumelden, verwenden Sie den Benutzernamen `admin` und Ihr Admin-Passwort (`abc123` standardmäßig).

**Hinweis:** Ihr Stream-Schlüssel und Ihr Admin-Passwort sind beide standardmäßig auf `abc123` eingestellt, sind jedoch separate Einstellungen. Der Stream-Schlüssel wird nur von Ihrer Broadcast-Software zum Veröffentlichen von Videos verwendet. Es ist nicht Ihr Admin-Passwort.
