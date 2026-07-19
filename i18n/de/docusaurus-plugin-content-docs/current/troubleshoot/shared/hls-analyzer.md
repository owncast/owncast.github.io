---
title: ""
description: ""
unlisted: true
related:
  excludeFromAll: true
---

Besuchen Sie [HLS Analyzer](https://hlsanalyzer.com/), um bei der Fehlersuche zu helfen. Geben Sie Ihre Stream-URL ein, wenn Sie dazu aufgefordert werden, sie lautet `<yourserver>/hls/stream.m3u8`. Drücken Sie _Analysieren .m3u8_.

Achten Sie auf die folgenden Werte:

**Segmentdownload (Sekunden)**: Die Zeit, die benötigt wurde (in Sekunden), um ein Segment Video herunterzuladen. Wenn es länger dauert, ein Segment Video herunterzuladen, als es dauert, wird es zu Pufferung kommen.

**Player-Puffer (Sekunden)**: Die Menge an abspielbarem Video (in Sekunden), die verfügbar ist. Wenn dies Null erreicht, wird es zu Pufferung kommen.

**Ausfallzeit (Sekunden)**: Die Zeit, in der der Player kein verfügbares Video hatte und in die Pufferung ging.
