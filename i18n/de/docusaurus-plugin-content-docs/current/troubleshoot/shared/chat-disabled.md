---
title: ""
description: ""
unlisted: true
related:
  excludeFromAll: true
---

Überprüfen Sie die Entwicklertools Ihres Browsers auf Fehler bei der Websocket-Verbindung, um dieses Problem zu diagnostizieren.

## Ihr Proxy unterstützt möglicherweise keine Websockets

Wenn Sie einen Proxy vor Ihrer Owncast-Instanz verwenden, stellen Sie sicher, dass er ordnungsgemäß konfiguriert ist, um Websockets zu unterstützen. Standardmäßig übermitteln einige das Websocket nicht richtig. Lesen Sie die [Dokumentation Ihres Proxys](/docs/sslproxies/nginx), um sicherzustellen, dass die Unterstützung für Websockets korrekt eingerichtet ist, um den Owncast-Chat zu unterstützen.

## Ungültige Socket-Überschreibung

Während die meisten Benutzer die Socket-Überschreibungs-URL in den erweiterten Owncast-Admin-Einstellungen niemals ändern sollten, wird der Chat nicht funktionieren, wenn Sie sie aus irgendeinem Grund auf einen falschen Wert geändert haben.

Entfernen Sie den Wert der Socket-Überschreibung oder setzen Sie ihn auf den von Ihnen erwarteten korrekten Wert für Ihre Owncast-Instanz, um dies zu beheben.
