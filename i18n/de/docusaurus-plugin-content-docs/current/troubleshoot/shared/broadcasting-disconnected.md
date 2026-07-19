---
title: ''
description: ''
unlisted: true
related:
  excludeFromAll: true
---

1. Stellen Sie sicher, dass Sie eine unterstützte Version von ffmpeg auf Ihrem Owncast-Server haben. [Laden Sie ffmpeg 4.1.5 oder höher herunter](https://ffmpeg.org/download.html).
2. Schauen Sie sich Ihre Owncast-Protokolle in der Konsole oder Ihrem Admin-Bereich an. Es kann spezifische Fehlermeldungen geben, die Ihnen sagen, was Sie als Nächstes tun können.
3. Werfen Sie einen Blick auf `transcoder.log` für detaillierte Protokolle, die Sie beim Fragen um Hilfe bereitstellen können, falls Sie in den Owncast-Protokollen nichts sehen.
4. Stellen Sie sicher, dass Ihre Kopie von ffmpeg nicht über Snap-Pakete installiert wurde, da die Sandbox von Snap-distribuierter Software in diesem Fall nicht kompatibel ist. Wenn Sie den Fehler `Error: unable to open display` in `transcoder.log` sehen, könnte das Ihr Problem sein.
