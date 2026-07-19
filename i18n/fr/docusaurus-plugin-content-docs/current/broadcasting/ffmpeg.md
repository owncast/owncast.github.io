---
title: ffmpeg
description: ffmpeg est un outil de ligne de commande de premier plan pour le traitement des vidéos.
sidebar_position: 80
---

La plupart des gens diffusent vers Owncast avec des logiciels comme [OBS](/docs/broadcasting/obs). Si vous préférez diffuser directement depuis la ligne de commande, ffmpeg peut capturer une caméra ou une carte de capture et l'envoyer à votre serveur via RTMP. C'est une méthode avancée et cela suppose que vous êtes à l'aise avec la ligne de commande.

L'exemple ci-dessous est pour **Linux**, capturant la caméra `/dev/video2` et le périphérique audio `hw:1,0` :

```bash
ffmpeg -f alsa -ac 2 -i hw:1,0 -thread_queue_size 64 \
  -f v4l2 -framerate 60 -video_size 1280x720 -input_format yuyv422 -i /dev/video2 \
  -c:v libx264 -preset veryfast -b:v 1984k -maxrate 1984k -bufsize 3968k \
  -vf "format=yuv420p" -g 60 -c:a aac -b:a 128k -ar 44100 \
  -f flv rtmp://<ip-de-votre-serveur>/live/<votre-clé-de-diffusion>
```

Que font les principales options :

- `-i /dev/video2` et `-i hw:1,0` : les entrées vidéo et audio. Ce sont les parties que vous modifiez pour votre matériel et votre plateforme (voir ci-dessous).
- `-c:v libx264 -preset veryfast` : encoder la vidéo avec x264. `veryfast` échappe à une certaine efficacité de compression pour une utilisation plus faible du CPU. Des préréglages plus lents apparaissent mieux avec le même bitrate mais utilisent plus de CPU.
- `-b:v 1984k -maxrate 1984k -bufsize 3968k` : viser un bitrate vidéo d'environ 1984 kbps et le limiter à ce niveau. Voir [choisir la qualité vidéo](/docs/video) pour choisir un bitrate pour votre contenu et votre vitesse de téléchargement.
- `-g 60` : émettre une image clé toutes les 60 images. À 60 ips, cela signifie une toutes les 2 secondes, ce dont Owncast a besoin pour segmenter le flux proprement. Réglez cela sur le double de votre fréquence d'images.
- `-c:a aac -b:a 128k -ar 44100` : audio AAC à 128 kbps et 44,1 kHz.
- `-f flv rtmp://.../live/<votre-clé-de-diffusion>` : envoyez le résultat à votre serveur Owncast. Gardez le chemin `/live/` et utilisez votre clé de diffusion.

## Entrées sur d'autres plateformes

Seules les options d'entrée changent entre les systèmes d'exploitation. Les options d'encodage et de sortie ci-dessus restent les mêmes.

**macOS** utilise `avfoundation`. Listez vos appareils, puis choisissez-les par index dans l'ordre `vidéo:audio` :

```bash
ffmpeg -f avfoundation -list_devices true -i ""
ffmpeg -f avfoundation -framerate 30 -i "0:0" ...
```

**Windows** utilise `dshow`. Listez vos appareils, puis choisissez-les par nom :

```bash
ffmpeg -list_devices true -f dshow -i dummy
ffmpeg -f dshow -i video="Votre Caméra":audio="Votre Microphone" ...
```

Pour la plupart des configurations, une application de diffusion dédiée est plus facile à utiliser que de maintenir une commande ffmpeg. Voir l'aperçu des [logiciels de diffusion](/docs/broadcasting) pour les options communes.
