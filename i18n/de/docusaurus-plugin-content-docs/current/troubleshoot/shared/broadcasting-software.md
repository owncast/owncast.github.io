---
title: ''
description: ''
unlisted: true
related:
  excludeFromAll: true
---

Stellen Sie sicher, dass Ihr Broadcast-Computer zuverlässig Live-Video überträgt. Wenn Ihr eigener Computer oder die Netzwerkverbindung Schwierigkeiten hat, Video ins Internet zu streamen, werden die Zuschauer im Puffermodus feststecken. Reduzieren Sie die Bitrate, Auflösung und/oder Bildrate in Ihrer Broadcasting-Software auf dem Übertragungsgerät, falls erforderlich.

Beachten Sie alle verlorenen Frames und untersuchen Sie, was diese Verluste verursacht. Ist es Ihre lokale CPU oder GPU? Ist es Ihr lokales Netzwerk? Oder ist es der Owncast-Server, der sie aufgrund der Hardwareauslastung verliert?

Wenn beispielsweise Ihre [GPU auf Ihrem Broadcast-Computer ausgelastet ist](https://github.com/obsproject/obs-studio/wiki/GPU-overload-issues), kann sie nicht mit dem Rendern von Frames mithalten. Wenn Sie OBS verwenden, ist eine Möglichkeit, dies festzustellen, die "Stats" in der Anwendung zu betrachten und zu sehen, ob Sie "Rendering Lag" erleben.
