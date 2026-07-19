---
unlisted: true
related:
  excludeFromAll: true
---

```mermaid
flussdiagramm LR
    untergraph Übertragung
        OBS[OBS / Übertragungssoftware]
    ende

    untergraph Owncast[Owncast-Server]
        richtung TB
        RTMP[RTMP-Eingang]
        Encoder[Video-Encoder]
        WebServer[Web-Server]
        RTMP --> Encoder --> WebServer
    ende

    untergraph CDN[CDN-Netzwerk]
        richtung TB
        Edge1[Edge-Knoten<br/>Nordamerika]
        Edge2[Edge-Knoten<br/>Europa]
        Edge3[Edge-Knoten<br/>Asien]
    ende

    untergraph Zuschauer[Video-Clients]
        richtung TB
        US[US-Zuschauer]
        EU[EU-Zuschauer]
        AS[Asien-Zuschauer]
    ende

    OBS -->|RTMP-Stream| RTMP
    WebServer -->|Ursprung| Edge1
    WebServer -->|Ursprung| Edge2
    WebServer -->|Ursprung| Edge3
    Edge1 -->|HLS-Video| US
    Edge2 -->|HLS-Video| EU
    Edge3 -->|HLS-Video| AS
```
