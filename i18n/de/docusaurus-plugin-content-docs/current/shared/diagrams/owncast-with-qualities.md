---
unlisted: true
related:
  excludeFromAll: true
---

```mermaid
flussdiagramm LR
    unterdiagramm Streaming
        OBS[OBS / Streaming-Software]
    ende

    unterdiagramm Owncast[Owncast-Server]
        richtung TB
        RTMP[RTMP-Eingang]
        Encoder[Video-Encoder]
        Hoch[Hohe Qualität<br/>1080p @ 5000kbps]
        Mittel[Mittlere Qualität<br/>720p @ 2500kbps]
        Niedrig[Niedrige Qualität<br/>480p @ 1000kbps]
        WebServer[Webserver]
        RTMP --> Encoder
        Encoder --> Hoch
        Encoder --> Mittel
        Encoder --> Niedrig
        Hoch --> WebServer
        Mittel --> WebServer
        Niedrig --> WebServer
    ende

    unterdiagramm Zuschauer
        Desktop[Desktop<br/>Schnelle Verbindung]
        Tablet[Tablet<br/>WiFi]
        Mobil[Mobil<br/>Mobilfunk]
    ende

    OBS -->|RTMP-Stream| RTMP
    WebServer -->|HLS| Desktop
    WebServer -->|HLS| Tablet
    WebServer -->|HLS| Mobil
```
