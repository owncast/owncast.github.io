---
title: Sichern Sie Ihre Streaming-Daten und Konfiguration
description: Owncast erstellt regelmäßige Sicherungen Ihrer Daten, die wiederhergestellt werden können.
sidebar_position: 1100
sidebar_label: Sichern Sie Ihre Streaming-Daten und Konfiguration
---

Owncast wird regelmäßig eine Sicherung Ihrer Daten erstellen. Es befindet sich in Ihrem `backup`-Verzeichnis als `owncastdb.bak`. Sie können dies zu Ihren normalen System-Sicherungen hinzufügen, um Ihre Owncast-Daten sicher zu halten.

## Wiederherstellen

Das Wiederherstellen einer Owncast-Sicherungsdatei bringt Sie zurück zu dem Zeitpunkt, an dem die Sicherung erstellt wurde. Dies ist nützlich, wenn Sie Daten auf einen anderen Computer übertragen möchten, aus irgendeinem Grund in der Zeit zurückgehen möchten oder es ein Problem gibt, das Sie lösen möchten.

:::warning
Das Wiederherstellen ersetzt Ihre aktuelle Datenbank durch den Inhalt der Sicherung. Alles, was sich seit der Erstellung der Sicherung geändert hat, geht verloren. Wenn Sie die aktuellen Daten möglicherweise benötigen, kopieren Sie sie an einen sicheren Ort, bevor Sie die Wiederherstellung durchführen.
:::

1. Stoppen Sie die Ausführung von Owncast.
2. Führen Sie aus Ihrem Owncast-Verzeichnis `./owncast --restoreDatabase <backupfile>` aus.
3. Starten Sie Owncast wie gewohnt neu. Es wird die wiederhergestellten Daten verwenden.
