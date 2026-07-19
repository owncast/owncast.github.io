---
title: Broadcast-Software einrichten
slug: /broadcasting
description: >-
  Wie Sie Ihre Broadcast-Software konfigurieren, kann die Qualität und Leistung Ihres Streams beeinflussen
sidebar_position: 1
sidebar_label: Überblick über Broadcast-Software
tags:
  - Streaming
  - rtmp
  - Streaming-Schlüssel
  - Passwort
  - obs
  - Broadcasting
---

## Kompatibilität

Im Allgemeinen ist Owncast mit jeder Software kompatibel, die `RTMP` verwendet, um an einen Remote-Server zu senden. `RTMP` ist das, was alle großen Live-Streaming-Dienste verwenden, also wenn Sie derzeit einen dieser Dienste verwenden, können Sie wahrscheinlich Ihre vorhandene Software an Ihre Owncast-Instanz richten.

Wir haben jedoch nicht mit allem getestet. Wenn Sie also etwas Bestimmtes verwenden, [würden wir gerne hören, welche Software Sie verwenden und welche Ergebnisse Sie erzielen](https://github.com/owncast/owncast/issues/new). Wenn Sie Probleme haben, würden wir Ihnen gerne bei der Fehlersuche helfen.

## Ihre Software auf Owncast ausrichten

Die meisten Broadcast-Software wird eine Möglichkeit haben, einen "benutzerdefinierten" Standort als RTMP-Endpunkt anzugeben. In diesem Fall würden Sie `rtmp://yourserver/live` als RTMP-Ziel angeben und Ihren Streaming-Schlüssel dort, wo es verlangt wird. Der Standard-Streaming-Schlüssel ist `abc123`, aber Sie sollten dies sofort ändern, nachdem Sie Owncast eingerichtet haben.

Wenn Ihre Software keinen Ort hat, um einen Streaming-Schlüssel anzugeben, können Sie ihn einfach an Ihre RTMP-Position anhängen, zum Beispiel: `rtmp://yourserver/live/abc123`.

## Wie Sie Ihre Broadcast-Software konfigurieren, ist wichtig

Sie sollten Ihre Broadcast-Software so konfigurieren, dass sie die höchste Qualität bietet, die Sie Ihren Zuschauern bieten können. **Das bedeutet, dass Sie Ihre Broadcast-Software nicht so konfigurieren sollten, dass sie 1080p@6000k sendet, wenn Ihr Owncast-Server nur 720p@2500k verarbeiten kann.** Je mehr Konvertierungsarbeit Sie Owncast abverlangen, desto mehr Ressourcen wird es auf Ihrem Server verwenden, wodurch es noch schwieriger wird, die besten Qualitäten für Ihre Zuschauer anzubieten.

Jeder Server, jede Umgebung, jede Netzwerkgeschwindigkeit und jede Verarbeitungskapazität ist anders. Nur weil Sie _wollen_, eine bestimmte Qualität anzubieten, bedeutet das nicht, dass Ihr Server dies unterstützen kann.

Wenn Sie versuchen, eine bessere Leistung aus Owncast herauszuholen, dann versuchen Sie, Ihre Broadcast-Software auf eine niedrigere Qualität einzustellen sowie die Qualität in Ihrer Owncast-Instanz zu verringern.

## Broadcasting-Einstellungen

Die folgenden sind einige empfohlene Einstellungen für einen hochwertigen Stream, die Sie in Ihrer Broadcast-Software festlegen können. Aber Sie sollten die höchste Qualität berücksichtigen, die Sie Ihren Zuschauern anbieten, wie oben erwähnt. Lesen Sie weiter über die Werte.

### Videoauflösung und Qualität

| Auflösung | Bildrate | Bitrate |
| --------- | -------- | ------- |
| 1920x1080 | 60fps    | 5000k   |
| 1920x1080 | 30fps    | 4500k   |
| 1280x720  | 60fps    | 4000k   |
| 1280x720  | 30fps    | 3000k   |

### Auflösung und Bildrate

Die Auflösung bezieht sich auf die Größe eines Videos auf einem Bildschirm, und die Bildrate bezieht sich darauf, wie viele Bilder pro Sekunde angezeigt werden. Full HD-Auflösung beträgt typischerweise 1080p, 60 Bilder pro Sekunde (fps). Streaming in einer höheren Auflösung wie 1080p erfordert eine höhere Bitrate, und eine höhere Bildrate benötigt mehr Codierungskapazität. Wenn Sie die Bandbreite und Codierungskapazität sowohl auf Ihrem Broadcasting-Computer als auch auf Ihrem Owncast-Server haben, um in 1080p, 60 fps zu streamen, großartig! Wenn nicht, versuchen Sie eine der anderen oben genannten Einstellungen, um die Videoqualität und Stabilität zu optimieren.

### Bitrate

Die Bitrate ist die Menge an Daten, die Sie an Ihren Owncast-Server senden, wenn Sie streamen. Eine höhere Bitrate benötigt mehr Ihrer verfügbaren Internetbandbreite. Die Erhöhung Ihrer Bitrate kann die Videoqualität verbessern, aber nur bis zu einem bestimmten Punkt.

### Keyframe-Intervall

Es wird empfohlen, die Keyframe-Einstellung Ihrer Broadcast-Software auf _2_ und **nicht** auf `auto` zu setzen.

### Audioeinstellungen

Stellen Sie Ihre Broadcast-Software so ein, dass sie Owncast `AAC`-Audio sendet.

### Audio-Bitrate und Qualität

Stellen Sie beim Streamen sicher, dass Ihre Audioqualität mit dem, was Sie streamen, übereinstimmt. Wenn Sie einen musikfokussierten Stream haben, dann gehen Sie vielleicht höher. Wenn Sie nur sprechen, dann können Sie vielleicht auch tiefer gehen.

Owncast wird Audio nicht neu codieren, also wird es genau so ausgegeben, wie es gesendet wird.

| Qualität | Bitrate |
| -------- | ------- |
| Niedrig  | 96kbps  |
| Mittel   | 128kbps |
| Hoch     | 192kbps |
| Höher    | 256kbps |
| Höchste  | 320kbps |

## Bildübertragungsaussetzer

Lesen Sie mehr über die Fehlersuche bei [Eingefrorene Bilder](/docs/troubleshoot/dropped-frames), die in Ihrer Broadcast-Software gemeldet werden.

## Fehler oder Unterbrechungen

Wenn Ihre Broadcast-Software ständig die Verbindung zu Owncast trennt oder Ihr Stream mitten drin abbricht, lesen Sie [Ihr Stream trennt sich ständig](/docs/troubleshoot/stream-disconnect). Es behandelt die häufigen Ursachen: ein instabiles Netzwerk, eine höhere Bitrate als Ihre Upload-Geschwindigkeit unterstützen kann und ffmpeg-Probleme auf dem Server.

