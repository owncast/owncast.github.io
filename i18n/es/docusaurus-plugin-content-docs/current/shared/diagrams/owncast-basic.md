---
unlisted: true
related:
  excludeFromAll: true
---

```mermaid
diagrama de flujo LR
    subgrafo Difusión
        OBS[OBS / Software de Difusión]
    fin

    subgrafo Owncast[Servidor Owncast]
        dirección TB
        RTMP[Ingesta RTMP]
        Codificador[Codificador de Video]
        ServidorWeb[Servidor Web]
        RTMP --> Codificador --> ServidorWeb
    fin

    subgrafo Espectadores[Clientes de Video]
        dirección TB
        Navegador[Navegadores Web]
        Teléfono[Teléfonos Móviles]
        TV[Smart TVs]
        VLC[VLC / Reproductores de Medios]
    fin

    OBS -->|Flujo RTMP| RTMP
    ServidorWeb -->|Video HLS| Navegador
    ServidorWeb -->|Video HLS| Teléfono
    ServidorWeb -->|Video HLS| TV
    ServidorWeb -->|Video HLS| VLC
```
