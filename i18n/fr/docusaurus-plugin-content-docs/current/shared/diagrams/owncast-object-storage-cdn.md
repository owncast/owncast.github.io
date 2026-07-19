---
unlisted: true
related:
  excludeFromAll: true
---

```mermaid
diagramme de flux LR
    sous-graphe Diffusion
        OBS[OBS / Logiciel de Diffusion]
    fin

    sous-graphe Owncast[Serveur Owncast]
        direction TB
        RTMP[Ingestion RTMP]
        Encodeur[Encodeur Vidéo]
        ServeurWeb[Serveur Web]
        RTMP --> Encodeur
    fin

    sous-graphe Stockage[Stockage d'Objets]
        S3[Fournisseur de Stockage]
    fin

    sous-graphe CDN[Réseau CDN]
        direction TB
        Edge1[Noeud de Bord<br/>Amérique du Nord]
        Edge2[Noeud de Bord<br/>Europe]
        Edge3[Noeud de Bord<br/>Asie]
    fin

    sous-graphe Spectateurs[Clients Vidéo]
        direction TB
        US[Spectateur US]
        EU[Spectateur UE]
        AS[Spectateur Asie]
    fin

    OBS -->|Flux RTMP| RTMP
    Encodeur -->|Télécharger Segments HLS| S3
    S3 -->|Origine| Edge1
    S3 -->|Origine| Edge2
    S3 -->|Origine| Edge3
    Edge1 -->|Vidéo HLS| US
    Edge2 -->|Vidéo HLS| EU
    Edge3 -->|Vidéo HLS| AS
```
