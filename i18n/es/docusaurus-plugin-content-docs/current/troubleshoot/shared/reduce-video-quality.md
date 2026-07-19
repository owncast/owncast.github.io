---
title: ""
description: ""
unlisted: true
related:
  excludeFromAll: true
---

Un video de mayor calidad significa tamaños de video más grandes que tardan más en descargarse.

Como se cita de la [Wiki de OBS](https://github.com/obsproject/obs-studio/wiki/Stream-Buffering-Issues/d65033b24e4a4c81c87323f05a59c12f78de620b):

\> Este es un error muy común que cometen los nuevos streamers. Los streamers tienden a usar tanto bitrate como tienen disponible para subir, sin importar cómo eso pueda afectar a sus espectadores. Por supuesto, entendemos que quieres que tu stream se vea bien. Aumentar tu bitrate es una forma sencilla de lograrlo, pero debe ser razonable.
\>

> **Al final, aunque tu stream de 1080p 60fps 9mb/s pueda verse glorioso, y 3 personas pueden verlo sin problemas, es muy posible que tu proveedor de streaming o el resto de tus espectadores tengan problemas.**

Reduce el bitrate y la tasa de fotogramas de tus variantes de salida de video en Owncast, y luego ajusta tu calidad más alta a lo que estás enviando en tu software de transmisión.

Cuanto más grande sea cada segmento de video, más tardará en descargarse. Así que, en general, si disminuyes la calidad de tu video (en bitrate y/o resolución) es probable que disminuyas la cantidad de tiempo que tarda en descargarse, lo que reduce la probabilidad de almacenamiento en búfer para tu audiencia.

**Al disminuir la tasa de fotogramas y/o el bitrate en tu servidor, también debes disminuir lo que envías a Owncast en tu software de transmisión.** Esto ayuda porque:\*\*

1. Disminuye la cantidad de tráfico de red que está utilizando tu conexión a internet, reduciendo la posibilidad de que tu ancho de banda superior sea un cuello de botella en la transmisión.
2. Disminuye la cantidad de datos que se están ingresando en Owncast.
3. Cuanto menos trabajo conversacional necesite tener lugar dentro de Owncast, más rápido serán las cosas.

**Desventaja**: Reducir tu tasa de fotogramas y/o bitrate de video puede disminuir notablemente la calidad de tu transmisión para algunos contenidos.

## Tasa de fotogramas

Disminuir la tasa de fotogramas de tu video es, a menudo, una forma fácil de reducir el almacenamiento en búfer. FPS significa "fotogramas por segundo", por lo tanto, si reduces la tasa de fotogramas de tu video de 60fps a 30fps, hay literalmente la mitad de fotogramas de video para que tus espectadores los descarguen, reduciendo a la mitad la cantidad de datos de video.

**Desventaja**: Reducir la tasa de fotogramas puede disminuir visiblemente la calidad de tu transmisión para algunos contenidos.
