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
        Codificador[Código de Video]
        ServidorWeb[Servidor Web]
        RTMP --> Codificador
    fin

    subgrupo Almacenamiento[Almacenamiento de Objetos]
        S3[Proveedor de Almacenamiento]
    fin

    subgrupo CDN[Red CDN]
        dirección TB
        Edge1[Nodo de Borde<br/>América del Norte]
        Edge2[Nodo de Borde<br/>Europa]
        Edge3[Nodo de Borde<br/>Asia]
    fin

    subgrupo Espectadores[Clientes de Video]
        dirección TB
        US[Espectador de EE.UU.]
        EU[Espectador de la UE]
        AS[Espectador de Asia]
    fin

    OBS -->|Transmisión RTMP| RTMP
    Codificador -->|Subir Segmentos HLS| S3
    S3 -->|Origen| Edge1
    S3 -->|Origen| Edge2
    S3 -->|Origen| Edge3
    Edge1 -->|Video HLS| US
    Edge2 -->|Video HLS| EU
    Edge3 -->|Video HLS| AS
```
