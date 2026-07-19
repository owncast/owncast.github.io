---
title: ''
description: ''
unlisted: true
related:
  excludeFromAll: true
---

Versuchen Sie, Ihre Latenzpufferstufe im Admin zu verringern. Dies hält den Benutzer näher am Live-Stream, bietet dem Client jedoch weniger spielbare Segmente, was möglicherweise **die Fehlertoleranz** und Netzwerkgeschwindigkeitsprobleme **verringert**. Wenn Sie einen Computer haben, der Video schnell verarbeiten kann, können Sie möglicherweise auf nur noch einige Sekunden Latenz gelangen, allerdings mit wenig Spielraum für Fehler.

Es liegt an Ihnen, zu entscheiden, ob Sie niedrigere Verzögerungen bei **weniger Zuverlässigkeit** oder einen zuverlässigeren Stream mit zusätzlicher Verzögerung wünschen.

## Warnung für Video-Passthrough

Wenn Sie **Video-Passthrough** in Ihrer Videokonfiguration verwenden, wird dies wahrscheinlich die Latenz **erhöhen**. Da Sie Owncast mitteilen, Ihr Video nicht neu zu kodieren, kann es Ihr Video nicht optimal in die erforderlichen Segmentgrößen aufteilen, um Ihre Latenz zu verwalten. Wenn Sie die Latenz wirklich optimieren möchten, sollten Sie unbedingt Passthrough deaktivieren.

## Nachteile

### Netzwerkanfragen

Eine niedrigere Latenz führt zu mehr, kleineren Videosegmenten, die Ihren Zuschauern bereitgestellt werden. Das hat mehr Webanfragen zur Folge. Nicht unbedingt mehr Bandbreite wird verwendet, sondern einfach mehr Anfragen, die von Ihrem Server bedient werden müssen.

### Fehlertoleranz

Da jedes Videosegment kleiner ist, führt die Fehlertoleranz in Bezug auf Netzwerkproblemen oder das gelegentliche Fehlschlagen von Netzwerkrequests dazu, dass der Zuschauer puffert. Mit größerer Latenz hat der Zuschauer mehr spielbares Video bereit, während der Netzwerkrequest erneut versucht oder sich erholt.

### Überlegungen

Wenn Sie sich in einem Szenario befinden, in dem Sie für Objektspeicher oder ein CDN zahlen und die Anzahl der Anfragen Ihre Rechnung beeinflusst, sollten Sie die Kompromisse zwischen niedrigerer Latenz in Betracht ziehen oder Ihre Infrastrukturkonfiguration ändern.
