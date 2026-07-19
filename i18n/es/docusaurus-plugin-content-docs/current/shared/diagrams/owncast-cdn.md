---
unlisted: true
related:
  excludeFromAll: true
---

```mermaid
diagrama de flujo LR
    subgrafo Transmitiendo
        OBS[OBS / Software de Transmisión]
    fin

    subgrafo Owncast[Servidor Owncast]
        dirección TB
        RTMP[Ingesta RTMP]
        Codificador[Código Video]
        ServidorWeb[Servidor Web]
        RTMP --> Codificador --> ServidorWeb
    fin

    subgrafo CDN[Red CDN]
        dirección TB
        Edge1[Nodo de Borde<br/>América del Norte]
        Edge2[Nodo de Borde<br/>Europa]
        Edge3[Nodo de Borde<br/>Asia]
    fin

    subgrafo Espectadores[Clientes de Video]
        dirección TB
        US[Espectador US]
        EU[Espectador UE]
        AS[Espectador Asia]
    fin

    OBS -->|Flujo RTMP| RTMP
    ServidorWeb -->|Origen| Edge1
    ServidorWeb -->|Origen| Edge2
    ServidorWeb -->|Origen| Edge3
    Edge1 -->|Video HLS| US
    Edge2 -->|Video HLS| EU
    Edge3 -->|Video HLS| AS
```
