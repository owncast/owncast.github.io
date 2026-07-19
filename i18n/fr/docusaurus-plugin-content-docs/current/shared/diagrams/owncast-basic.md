---
unlisted: true
related:
  excludeFromAll: true
---

```mermaid
diagramme de flux LR
    sous-graphe Diffusion
        OBS[OBS / Logiciel de diffusion]
    fin

    sous-graphe Owncast[Serveur Owncast]
        direction TB
        RTMP[Ingestion RTMP]
        Encodeur[Encodeur vidéo]
        ServeurWeb[Serveur Web]
        RTMP --> Encodeur --> ServeurWeb
    fin

    sous-graphe Spectateurs[Clients vidéo]
        direction TB
        Navigateur[Navigateurs Web]
        Téléphone[Téléphones mobiles]
        TV[Téléviseurs intelligents]
        VLC[VLC / Lecteurs multimédias]
    fin

    OBS -->|Flux RTMP| RTMP
    ServeurWeb -->|Vidéo HLS| Navigateur
    ServeurWeb -->|Vidéo HLS| Téléphone
    ServeurWeb -->|Vidéo HLS| TV
    ServeurWeb -->|Vidéo HLS| VLC
```
