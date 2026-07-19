---
title: ""
description: ""
unlisted: true
related:
  excludeFromAll: true
---

Visita [HLS Analyzer](https://hlsanalyzer.com/) para ayudar en la solución de problemas. Introduce la URL de tu stream cuando se te pida, es `<tu servidor>/hls/stream.m3u8`. Presiona _Analizar .m3u8_.

Toma nota de los siguientes valores:

**Descarga de segmento (seg)**: La cantidad de tiempo que tomó (en segundos) descargar un segmento de video. Si toma más tiempo descargar un segmento de video que la duración de cada segmento, tendrás buffering.

**Buffer del reproductor (seg)**: La cantidad de video reproducible (en segundos) disponible. Si esto llega a cero tendrás buffering.

**Interrupción (seg)**: La cantidad de tiempo que el reproductor no tuvo video disponible y pasó a modo buffering.
