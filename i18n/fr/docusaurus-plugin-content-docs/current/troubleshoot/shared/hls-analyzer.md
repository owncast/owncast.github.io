---
title: ''
description: ''
unlisted: true
related:
  excludeFromAll: true
---

Visitez [HLS Analyzer](https://hlsanalyzer.com/) pour aider à résoudre les problèmes. Saisissez votre URL de flux lorsque cela est demandé, c'est `<yourserver>/hls/stream.m3u8`. Appuyez sur _Analyser .m3u8_.

Prenez note des valeurs suivantes :

**Téléchargement de segment (sec)** : Le temps qu'il a fallu (en secondes) pour télécharger un segment de vidéo. S'il faut plus de temps pour télécharger un segment de vidéo que la durée de chaque segment, vous aurez un buffering.

**Buffer du lecteur (sec)** : La quantité de vidéo lisible (en secondes) disponible. Si cela atteint zéro, vous aurez un buffering.

**Interruption (sec)** : Le temps pendant lequel le lecteur n'avait pas de vidéo disponible et est passé en buffering.
