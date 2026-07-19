---
title: ""
description: ""
unlisted: true
related:
  excludeFromAll: true
---

Höhere Videoqualität bedeutet größere Videogrößen, die länger zum Herunterladen benötigen.

Wie zitiert aus dem [OBS Wiki](https://github.com/obsproject/obs-studio/wiki/Stream-Buffering-Issues/d65033b24e4a4c81c87323f05a59c12f78de620b):

\> Dies ist ein sehr häufiger Fehler, den neue Streamer machen. Streamer neigen dazu, so viel Bitrate zu verwenden, wie sie im Upload zur Verfügung haben, ohne zu berücksichtigen, wie sich das auf ihre Zuschauer auswirken könnte. Natürlich verstehen wir, dass Sie möchten, dass Ihr Stream gut aussieht. Die Erhöhung Ihrer Bitrate ist eine einfache Möglichkeit, dies zu erreichen, aber sie muss im angemessenen Rahmen liegen.
\>

> **Letztendlich, während Ihr 1080p 60fps 9mb/s Stream großartig aussieht und 3 Personen ihn problemlos ansehen können, könnte Ihr Streaming-Anbieter oder der Rest Ihrer Zuschauer sehr wohl Probleme haben.**

Reduzieren Sie die Bitrate und die Bildrate Ihrer Videoausgabevarianten in Owncast, und passen Sie dann Ihre höchste Qualität an das an, was Sie in Ihrer Broadcasting-Software senden.

Je größer jedes Videosegment ist, desto länger dauert es, es herunterzuladen. Allgemein gesagt, wenn Sie die Qualität Ihres Videos (in Bitrate und/oder Auflösung) verringern, verringern Sie wahrscheinlich die Zeit, die zum Herunterladen benötigt wird, wodurch die Wahrscheinlichkeit von Puffern für Ihr Publikum reduziert wird.

**Wenn Sie die Bildrate und/oder Bitrate auf Ihrem Server verringern, sollten Sie auch das reduzieren, was Sie in Ihrer Broadcasting-Software an Owncast senden.** Das hilft, weil:\*\*

1. Es verringert die Menge des Netzwerkverkehrs, den Ihre Internetverbindung nutzt, und verringert die Wahrscheinlichkeit, dass Ihr Upstream ein Engpass beim Streaming ist.
2. Es verringert die Menge an Daten, die in Owncast geladen werden.
3. Je weniger Kommunikationsarbeit innerhalb von Owncast stattfinden muss, desto schneller sind die Dinge.

**Nachteil**: Die Reduzierung Ihrer Video-Bildrate und/oder Bitrate kann die Qualität Ihres Streams für einige Inhalte merklich verringern.

## Bildrate

Die Verringerung der Bildrate Ihres Videos ist oft eine einfache Möglichkeit, Puffern zu reduzieren. FPS bedeutet "Bilder pro Sekunde", daher gibt es, wenn Sie die Bildrate Ihres Videos von 60fps auf 30fps reduzieren, buchstäblich nur halb so viele Bilder, die Ihre Zuschauer herunterladen müssen, was die Menge an Videodaten halbiert.

**Nachteil**: Die Reduzierung der Bildrate kann die Qualität Ihres Streams für einige Inhalte sichtbar verringern.
