---
unlisted: true
related:
  excludeFromAll: true
---

```mermaid
diagrama de flujo LR
    subgrupo Transmisión
        OBS[OBS / Software de Transmisión]
    fin

    subgrupo Owncast[Servidor Owncast]
        dirección TB
        RTMP[Ingesta RTMP]
        Codificador[Codificador de Video]
        ServidorWeb[Servidor Web]
        RTMP --> Codificador
    fin

    subgrupo Almacenamiento[Almacenamiento de Objetos]
        S3[Proveedor de Almacenamiento]
    fin

    subgrupo Espectadores[Clientes de Video]
        dirección TB
        Navegador[Navegadores Web]
        Teléfono[Teléfonos Móviles]
        TV[Televisores Inteligentes]
    fin

    OBS -->|Transmisión RTMP| RTMP
    Codificador -->|Subir Segmentos HLS| S3
    S3 -->|Video HLS| Navegador
    S3 -->|Video HLS| Teléfono
    S3 -->|Video HLS| TV
```
