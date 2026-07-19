---
title: Configurar software de emisión
slug: /emisión
description: >-
  Cómo configurar tu software de emisión puede afectar la calidad y rendimiento de tu transmisión
sidebar_position: 1
sidebar_label: Visión general del software de emisión
tags:
  - emisión
  - rtmp
  - clave de transmisión
  - contraseña
  - obs
  - emisión
---

## Compatibilidad

En general, Owncast es compatible con cualquier software que use `RTMP` para transmitir a un servidor remoto. `RTMP` es lo que utilizan todos los principales servicios de transmisión en vivo, así que si actualmente estás usando uno de esos, es probable que puedas dirigir tu software existente a tu instancia de Owncast en su lugar.

Sin embargo, no hemos probado con todo. Así que si utilizas algo específico [nos encantaría saber qué software estás utilizando y los resultados](https://github.com/owncast/owncast/issues/new). Si te encuentras teniendo problemas, nos encantaría ayudarte a solucionar.

## Apuntando tu software a Owncast

La mayoría de los software de emisión tendrán una forma de especificar una ubicación "personalizada" como un punto final RTMP. En este caso, especificarías `rtmp://yourserver/live` como el destino RTMP, especificando tu clave de transmisión donde te lo pida. La clave de transmisión predeterminada es `abc123`, pero deberías cambiar esto inmediatamente después de configurar Owncast.

Si tu software no tiene un lugar para especificar una clave de transmisión, simplemente puedes agregarla a tu ubicación RTMP, por ejemplo: `rtmp://yourserver/live/abc123`.

## Cómo configuras tu software de emisión es importante

Querrás configurar tu software de emisión para que coincida con la mejor calidad que puedas ofrecer a tus espectadores. **Eso significa que si tu servidor Owncast solo puede manejar 720p@2500k, no deberías configurar tu software de emisión para enviar 1080p@6000k**. Cuanto más trabajo de conversión le pidas a Owncast, más recursos utilizará en tu servidor, haciendo aún más difícil ofrecer las mejores cualidades a tus espectadores.

Cada servidor, entorno, velocidad de red y capacidad de procesamiento es diferente. Solo porque _quieras_ ofrecer una calidad determinada, no significa que tu servidor pueda soportarlo.

Si te encuentras tratando de obtener un mejor rendimiento de Owncast, intenta configurar tu software de emisión a una calidad más baja, así como reducir la calidad en tu instancia de Owncast.

## Configuraciones de emisión

Las siguientes son algunas configuraciones sugeridas para un streaming de alta calidad que puedes establecer en tu software de emisión. Pero deberías tener en cuenta la más alta calidad que ofrecerás a tus espectadores, como se mencionó anteriormente. Continúa leyendo más sobre los valores.

### Resolución de video y calidad

| Resolución | Tasa de fotogramas | Tasa de bits |
| ---------- | ------------------ | ------------ |
| 1920x1080  | 60fps              | 5000k        |
| 1920x1080  | 30fps              | 4500k        |
| 1280x720   | 60fps              | 4000k        |
| 1280x720   | 30fps              | 3000k        |

### Resolución y tasa de fotogramas

La resolución se refiere al tamaño de un video en una pantalla, y la tasa de fotogramas se refiere a cuántos fotogramas por segundo se muestran. La resolución Full HD es típicamente 1080p, 60 fotogramas por segundo (fps). Transmitir a una resolución más alta como 1080p requiere una tasa de bits más alta, y una tasa de fotogramas más alta requiere más potencia de codificación. Si tienes el ancho de banda y la potencia de codificación tanto en tu computadora de emisión como en tu servidor Owncast para transmitir a 1080p, 60 fps, ¡genial! Si no, intenta con una de las otras configuraciones anteriores para optimizar la calidad y estabilidad de tu video.

### Tasa de bits

La tasa de bits es la cantidad de datos que envías a tu servidor Owncast cuando transmites. Una tasa de bits más alta ocupa más de tu ancho de banda de internet disponible. Aumentar tu tasa de bits puede mejorar la calidad de tu video, pero solo hasta cierto punto.

### Intervalo de fotogramas clave

Se sugiere que configures el ajuste de fotogramas clave de tu software de emisión en _2_ y **no** en `auto`.

### Configuraciones de audio

Configura tu software de emisión para enviar audio `AAC` a Owncast.

### Tasa de bits y calidad de audio

Al transmitir, también asegúrate de que la calidad de tu audio coincida con lo que estás transmitiendo. Si eres un stream enfocado en música, entonces puedes optar por una calidad más alta. Si solo estás hablando, entonces tal vez puedas permitirte una calidad más baja.

Owncast no volverá a codificar el audio, así que saldrá exactamente como se envía.

| Calidad  | Tasa de bits |
| -------- | ------------ |
| Baja     | 96kbps       |
| Media    | 128kbps      |
| Alta     | 192kbps      |
| Más alta | 256kbps      |
| Máxima   | 320kbps      |

## Bajando fotogramas

Lee más sobre cómo solucionar problemas de [Fotogramas perdidos](/docs/troubleshoot/dropped-frames) que se informan en tu software de emisión.

## Errores o desconexiones

Si tu software de emisión sigue desconectándose de Owncast, o tu transmisión se pierde a mitad del camino, lee [Tu transmisión sigue desconectándose](/docs/troubleshoot/stream-disconnect). Cubre las causas comunes: una red inestable, una tasa de bits más alta de lo que tu subida puede soportar, y problemas de ffmpeg en el servidor.

