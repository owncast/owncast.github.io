---
unlisted: true
related:
  excludeFromAll: true
---

```mermaid
diagrama LR
    subgráfico Transmitiendo
        OBS[OBS / Software de Transmisión]
    fin

    subgráfico Owncast[Servidor Owncast]
        dirección TB
        RTMP[Ingesta RTMP]
        Codificador[Codificador de Video]
        Alto[Alta Calidad<br/>1080p @ 5000kbps]
        Medio[Calidad Media<br/>720p @ 2500kbps]
        Bajo[Baja Calidad<br/>480p @ 1000kbps]
        ServidorWeb[Servidor Web]
        RTMP --> Codificador
        Codificador --> Alto
        Codificador --> Medio
        Codificador --> Bajo
        Alto --> ServidorWeb
        Medio --> ServidorWeb
        Bajo --> ServidorWeb
    fin

    subgráfico Espectadores
        Escritorio[Escritorio<br/>Conexión Rápida]
        Tableta[Tableta<br/>WiFi]
        Móvil[Móvil<br/>Celular]
    fin

    OBS -->|Transmisión RTMP| RTMP
    ServidorWeb -->|HLS| Escritorio
    ServidorWeb -->|HLS| Tableta
    ServidorWeb -->|HLS| Móvil
```
