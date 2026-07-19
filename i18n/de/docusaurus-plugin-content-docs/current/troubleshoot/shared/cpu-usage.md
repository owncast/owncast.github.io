---
title: ''
description: ''
unlisted: true
related:
  excludeFromAll: true
---

Wenn Ihre Hardware ausgelastet ist, wird Ihr Video möglicherweise nicht schnell genug verarbeitet und geliefert, um den Echtzeitanforderungen von Live-Video gerecht zu werden.

Jede Ausgabequalität des Streams erhöht die CPU-Auslastung erheblich und verlangsamt die gesamte Erstellung von Video-Segmenten. Es wird allgemein empfohlen, mit einer Ausgabe zu beginnen und dann weitere nacheinander hinzuzufügen, um zu sehen, wie dies Ihre CPU-Auslastung beeinflusst.

Wenn Ihre CPU überbeansprucht wird, gibt es einige Schritte, die Sie versuchen können, um das zu beheben.

1. Möglicherweise haben Sie zu viele Videoausgaben in Ihren Einstellungen definiert. Versuchen Sie, sich auf eine einzige Ausgabe zu beschränken und von dort aus weiterzumachen.
2. Ändern Sie Ihre Einstellungen, um [weniger CPU](/docs/video/#cpu-usage) zu verwenden.
3. Experimentieren Sie mit der Reduzierung der Bitrate und der Bildrate Ihres Videos.
4. Wenn Sie auf eine einzige Ausgabe heruntergegangen sind, die CPU-Nutzung verringert haben und mit verschiedenen Qualitäten in Ihrer Broadcasting-Software experimentiert haben, könnte es sein, dass der Server, auf dem Sie Owncast ausführen, einfach nicht leistungsstark genug für die Aufgabe ist, und Sie möglicherweise versuchen müssen, eine andere Umgebung dafür zu nutzen.
5. Für die höchste Qualität sollten Sie sicherstellen, dass die Ausgabebitrate Ihres Owncast-Servers genau dem entspricht, was Ihre Broadcasting-Software sendet, um die Arbeitslast des Servers zu minimieren.
6. Wenn Sie feststellen, dass Sie aufgrund Ihrer Server-Hardware keine Art von Kodierung durchführen können, möchten Sie möglicherweise ausprobieren, [Video-Passthrough](/docs/video/#video-passthrough) zu aktivieren, bei dem Ihr Video nicht erneut kodiert wird. Dies könnte jedoch nicht in allen Umgebungen eine Lösung sein, und es gibt oft Nebenwirkungen. [Erfahren Sie mehr](/docs/video/#video-passthrough).

Im Allgemeinen ist der einfachste Weg, CPU zu sparen, die Eingangsgröße, die Ausgangsgröße oder beides zu verringern.
