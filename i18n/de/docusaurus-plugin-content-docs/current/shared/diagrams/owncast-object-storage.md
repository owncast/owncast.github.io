---
unlisted: true
related:
  excludeFromAll: true
---

```mermaid
Flussdiagramm LR
    Untergraph Broadcasting
        OBS[OBS / Streaming-Software]
    Ende

    Untergraph Owncast[Owncast-Server]
        Richtung TB
        RTMP[RTMP-Eingang]
        Encoder[Video-Encoding]
        WebServer[Web-Server]
        RTMP --> Encoder
    Ende

    Untergraph Storage[Objektspeicher]
        S3[Speicheranbieter]
    Ende

    Untergraph Viewers[Video-Clients]
        Richtung TB
        Browser[Webbrowser]
        Phone[Mobiletelefone]
        TV[Smart-TVs]
    Ende

    OBS -->|RTMP-Stream| RTMP
    Encoder -->|HLS-Segmente hochladen| S3
    S3 -->|HLS-Video| Browser
    S3 -->|HLS-Video| Phone
    S3 -->|HLS-Video| TV
```
