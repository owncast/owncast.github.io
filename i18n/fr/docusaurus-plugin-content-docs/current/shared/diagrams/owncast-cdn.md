---
unlisted: true
related:
  excludeFromAll: true
---

```mermaid
graph LR
    sous-graphe Diffusion
        OBS[OBS / Logiciel de diffusion]
    fin

    sous-graphe Owncast[Serveur Owncast]
        direction TB
        RTMP[RTMP Ingest]
        Encodeur[Encodeur vidéo]
        ServeurWeb[Serveur Web]
        RTMP --> Encodeur --> ServeurWeb
    fin

    sous-graphe CDN[Réseau CDN]
        direction TB
        Edge1[Nœud de bord<br/>Amérique du Nord]
        Edge2[Nœud de bord<br/>Europe]
        Edge3[Nœud de bord<br/>Asie]
    fin

    sous-graphe Spectateurs[Clients vidéo]
        direction TB
        US[Spectateur US]
        UE[Spectateur UE]
        AS[Spectateur Asie]
    fin

    OBS -->|Flux RTMP| RTMP
    ServeurWeb -->|Origine| Edge1
    ServeurWeb -->|Origine| Edge2
    ServeurWeb -->|Origine| Edge3
    Edge1 -->|Vidéo HLS| US
    Edge2 -->|Vidéo HLS| UE
    Edge3 -->|Vidéo HLS| AS
```
