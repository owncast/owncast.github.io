---
unlisted: true
related:
  excludeFromAll: true
---

```mermaid
flux LR
    sous-graphe Diffusion
        OBS[OBS / Logiciel de diffusion]
    fin

    sous-graphe Owncast[Serveur Owncast]
        direction TB
        RTMP[Ingestion RTMP]
        Encodeur[Encodeur vidéo]
        ServeurWeb[Serveur Web]
        RTMP --> Encodeur
    fin

    sous-graphe Stockage[Stockage d'objets]
        S3[Fournisseur de stockage]
    fin

    sous-graphe Spectateurs[Clients vidéo]
        direction TB
        Navigateur[Navigateurs Web]
        Téléphone[Téléphones mobiles]
        TV[Téléviseurs intelligents]
    fin

    OBS -->|Flux RTMP| RTMP
    Encodeur -->|Télécharger des segments HLS| S3
    S3 -->|Vidéo HLS| Navigateur
    S3 -->|Vidéo HLS| Téléphone
    S3 -->|Vidéo HLS| TV
```
