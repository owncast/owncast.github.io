---
unlisted: true
related:
  excludeFromAll: true
---

```mermaid
flussdiagramm LR
    Untergraph Broadcasting
        OBS[OBS / Broadcast-Software]
    Ende

    Untergraph Owncast[Owncast-Server]
        Richtung TB
        RTMP[RTMP-Zugriff]
        Encoder[Video-Encoder]
        WebServer[Webserver]
        RTMP --> Encoder
    Ende

    Untergraph Storage[Objekt-Speicher]
        S3[Speicheranbieter]
    Ende

    Untergraph CDN[CDN-Netzwerk]
        Richtung TB
        Edge1[Edge-Knoten<br/>Nordamerika]
        Edge2[Edge-Knoten<br/>Europa]
        Edge3[Edge-Knoten<br/>Asien]
    Ende

    Untergraph Viewers[Video-Clients]
        Richtung TB
        US[US-Zuschauer]
        EU[EU-Zuschauer]
        AS[Asien-Zuschauer]
    Ende

    OBS -->|RTMP-Stream| RTMP
    Encoder -->|Upload HLS-Segmente| S3
    S3 -->|Ursprung| Edge1
    S3 -->|Ursprung| Edge2
    S3 -->|Ursprung| Edge3
    Edge1 -->|HLS-Video| US
    Edge2 -->|HLS-Video| EU
    Edge3 -->|HLS-Video| AS
```
