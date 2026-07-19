---
title: ffmpeg
description: ffmpeg es una herramienta de línea de comandos líder para procesar video.
sidebar_position: 80
---

La mayoría de las personas transmiten a Owncast con software como [OBS](/docs/broadcasting/obs). Si prefieres transmitir directamente desde la línea de comandos, ffmpeg puede capturar una cámara o una tarjeta de captura y enviarla a tu servidor a través de RTMP. Este es un camino avanzado y asume que te sientes cómodo en la línea de comandos.

El ejemplo a continuación es para **Linux**, capturando la cámara `/dev/video2` y el dispositivo de audio ALSA `hw:1,0`:

```bash
ffmpeg -f alsa -ac 2 -i hw:1,0 -thread_queue_size 64 \
  -f v4l2 -framerate 60 -video_size 1280x720 -input_format yuyv422 -i /dev/video2 \
  -c:v libx264 -preset veryfast -b:v 1984k -maxrate 1984k -bufsize 3968k \
  -vf "format=yuv420p" -g 60 -c:a aac -b:a 128k -ar 44100 \
  -f flv rtmp://<ip-de-tu-servidor>/live/<tu-clave-de-transmisión>
```

Qué hacen las opciones principales:

- `-i /dev/video2` y `-i hw:1,0`: las entradas de video y audio. Estas son las partes que cambias para tu hardware y plataforma (ver más abajo).
- `-c:v libx264 -preset veryfast`: codifica el video con x264. `veryfast` intercambia algo de eficiencia de compresión por un menor uso de CPU. Los presets más lentos se ven mejor a la misma tasa de bits pero utilizan más CPU.
- `-b:v 1984k -maxrate 1984k -bufsize 3968k`: apunta a una tasa de bits de video de aproximadamente 1984 kbps y la limita allí. Consulta [elegir calidad de video](/docs/video) para seleccionar una tasa de bits para tu contenido y velocidad de subida.
- `-g 60`: emite un fotograma clave cada 60 fotogramas. A 60 fps eso es uno cada 2 segundos, que es lo que Owncast necesita para segmentar la transmisión de manera limpia. Configúralo al doble de tu tasa de fotogramas.
- `-c:a aac -b:a 128k -ar 44100`: audio AAC a 128 kbps y 44.1 kHz.
- `-f flv rtmp://.../live/<tu-clave-de-transmisión>`: envía el resultado a tu servidor de Owncast. Mantén la ruta `/live/` y usa tu clave de transmisión.

## Entradas en otras plataformas

Solo los indicadores de entrada cambian entre sistemas operativos. Las opciones de codificación y salida anteriores se mantienen igual.

**macOS** usa `avfoundation`. Enumera tus dispositivos y luego elígelos por índice en el orden `video:audio`:

```bash
ffmpeg -f avfoundation -list_devices true -i ""
ffmpeg -f avfoundation -framerate 30 -i "0:0" ...
```

**Windows** usa `dshow`. Enumera tus dispositivos y luego elígelos por nombre:

```bash
ffmpeg -list_devices true -f dshow -i dummy
ffmpeg -f dshow -i video="Tu Cámara":audio="Tu Micrófono" ...
```

Para la mayoría de las configuraciones, una aplicación de transmisión dedicada es más fácil que mantener un comando de ffmpeg. Consulta la visión general del [software de transmisión](/docs/broadcasting) para las opciones comunes.
