---
unlisted: true
related:
  excludeFromAll: true
---

```mermaid
flowchart LR
    subgraph Broadcasting
        OBS[OBS / Broadcasting Software]
    end

    subgraph Owncast[Owncast Server]
        direction TB
        RTMP[RTMP Ingest]
        Encoder[Video Encoder]
        WebServer[Web Server]
        RTMP --> Encoder --> WebServer
    end

    subgraph Viewers[Video Clients]
        direction TB
        Browser[Web Browsers]
        Phone[Mobile Phones]
        TV[Smart TVs]
        VLC[VLC / Media Players]
    end

    OBS -->|RTMP Stream| RTMP
    WebServer -->|HLS Video| Browser
    WebServer -->|HLS Video| Phone
    WebServer -->|HLS Video| TV
    WebServer -->|HLS Video| VLC
```
