---
title: ffmpeg
description: ffmpeg ist ein führendes Befehlszeilenwerkzeug zur Verarbeitung von Video.
sidebar_position: 80
---

Die meisten Menschen senden an Owncast mit Software wie [OBS](/docs/broadcasting/obs). Wenn Sie lieber direkt von der Befehlszeile streamen möchten, kann ffmpeg eine Kamera oder eine Capture-Karte erfassen und an Ihren Server über RTMP senden. Dies ist ein fortgeschrittener Weg und setzt voraus, dass Sie sich mit der Befehlszeile wohlfühlen.

Das folgende Beispiel gilt für **Linux**, das die Kamera `/dev/video2` und das ALSA-Audiogerät `hw:1,0` erfasst:

```bash
ffmpeg -f alsa -ac 2 -i hw:1,0 -thread_queue_size 64 \
  -f v4l2 -framerate 60 -video_size 1280x720 -input_format yuyv422 -i /dev/video2 \
  -c:v libx264 -preset veryfast -b:v 1984k -maxrate 1984k -bufsize 3968k \
  -vf "format=yuv420p" -g 60 -c:a aac -b:a 128k -ar 44100 \
  -f flv rtmp://<ip-of-your-server>/live/<your-streaming-key>
```

Was die Hauptoptionen tun:

- `-i /dev/video2` und `-i hw:1,0`: die Video- und Audioeingänge. Diese sind die Teile, die Sie für Ihre Hardware und Plattform ändern müssen (siehe unten).
- `-c:v libx264 -preset veryfast`: Video mit x264 encodieren. `veryfast` tauscht etwas Kompressionseffizienz gegen niedrigeren CPU-Verbrauch. Langsame Presets sehen besser aus bei der gleichen Bitrate, verbrauchen aber mehr CPU.
- `-b:v 1984k -maxrate 1984k -bufsize 3968k`: zielen Sie auf eine Video-Bitrate von etwa 1984 kbps und begrenzen Sie sie dort. Siehe [die Auswahl der Videoqualität](/docs/video), um eine Bitrate für Ihre Inhalte und Uploadgeschwindigkeit auszuwählen.
- `-g 60`: erzeugen Sie ein Schlüsselbild alle 60 Frames. Bei 60 fps ist das alle 2 Sekunden, was Owncast benötigt, um den Stream sauber zu segmentieren. Setzen Sie dies auf das Doppelte Ihrer Bildrate.
- `-c:a aac -b:a 128k -ar 44100`: AAC-Audio mit 128 kbps und 44,1 kHz.
- `-f flv rtmp://.../live/<your-streaming-key>`: senden Sie das Ergebnis an Ihren Owncast-Server. Behalten Sie den `/live/`-Pfad bei und verwenden Sie Ihren Streaming-Schlüssel.

## Eingänge auf anderen Plattformen

Nur die Eingabeflags ändern sich zwischen den Betriebssystemen. Die oben genannten Kodierungs- und Ausgabeoptionen bleiben gleich.

**macOS** verwendet `avfoundation`. Listen Sie Ihre Geräte auf, und wählen Sie sie dann nach Index in der Reihenfolge `video:audio`:

```bash
ffmpeg -f avfoundation -list_devices true -i ""
ffmpeg -f avfoundation -framerate 30 -i "0:0" ...
```

**Windows** verwendet `dshow`. Listen Sie Ihre Geräte auf, und wählen Sie sie dann nach Name:

```bash
ffmpeg -list_devices true -f dshow -i dummy
ffmpeg -f dshow -i video="Your Camera":audio="Your Microphone" ...
```

Für die meisten Setups ist eine dedizierte Broadcast-Anwendung einfacher als die Wartung eines ffmpeg-Befehls. Siehe die Übersicht über die [Broadcasting-Software](/docs/broadcasting) für die gängigen Optionen.
