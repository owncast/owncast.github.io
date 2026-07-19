---
unlisted: true
related:
  excludeFromAll: true
---

```mermaid
Flussdiagramm LR
    Teilgraph Broadcasting
        OBS[OBS / Broadcast-Software]
    Ende

    Teilgraph Owncast[Owncast-Server]
        Richtung TB
        RTMP[RTMP-Ingest]
        Encoder[Video-Encoder]
        WebServer[Webserver]
        RTMP --> Encoder --> WebServer
    Ende

    Teilgraph Zuschauer[Video-Clients]
        Richtung TB
        Browser[Webbrowser]
        Phone[Handys]
        TV[Smart-TVs]
        VLC[VLC / Mediaplayer]
    Ende

    OBS -->|RTMP-Stream| RTMP
    WebServer -->|HLS-Video| Browser
    WebServer -->|HLS-Video| Phone
    WebServer -->|HLS-Video| TV
    WebServer -->|HLS-Video| VLC
```
