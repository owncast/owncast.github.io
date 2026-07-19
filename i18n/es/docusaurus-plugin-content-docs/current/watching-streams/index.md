---
id: mirando-flujos
title: Mirando en televisores y dispositivos
slug: /mirando-flujos
sidebar_label: Resumen y Métodos Genéricos
hide_title: true
sidebar_position: 1
tags:
  - mirando
  - tv
  - televisión
  - dispositivos
  - streaming
  - iptv
  - m3u8
description: Resumen de todos los dispositivos y plataformas soportados para ver flujos de Owncast en televisores y dispositivos de streaming.
---

Hay numerosas maneras de ver transmisiones en vivo de Owncast en muchos dispositivos diferentes. Esta sección proporciona guías detalladas para cada plataforma y tipo de dispositivo soportado.

:::note
La mayoría de las aplicaciones listadas aquí no son proporcionadas, respaldadas ni soportadas por Owncast. Deberías tomar tus propias decisiones sobre qué aplicaciones instalar. Los productos listados son sugerencias que han sido probadas y se ha encontrado que funcionan con Owncast. Aquellos construidos y proporcionados por Owncast deben ser vistos como proyectos secundarios para ayudar a los espectadores.
:::

## Métodos de Acceso Rápido

### Cualquier Reproductor de Video o Hardware Existente

Owncast soporta estándares de streaming de video, por lo que puedes usar cualquier reproductor de video que soporte HLS (HTTP Live Streaming) para ver flujos. Esto significa que muchas aplicaciones de reproducción de video existentes, piezas de hardware, y televisores inteligentes pueden reproducir flujos de Owncast ya.

Instala o abre cualquier aplicación de reproducción de video para tu plataforma y usa la URL `https://your-owncast-server.com/hls/stream.m3u8` para acceder al flujo directamente. Esto incluye simplemente poner esa URL en el navegador Safari en un iPhone, o enviando `https://your-owncast-server.com` como un enlace en un iMessage a un amigo, ellos podrán reproducir el flujo directamente en el mensaje.

### Navegando el Directorio

Si tu aplicación tiene lo que a menudo se llama "IPTV" o soporte M3U, puedes navegar el directorio directamente añadiendo `https://owncast.directory/api/iptv` a la aplicación. No todas las aplicaciones soportan esto.

## Guías Específicas por Dispositivo

### Cajas y Dispositivos de Streaming

- **[Apple TV](/docs/watching-streams/apple-tv)** - Owncasts para tvOS, VLC o AirPlay
- **[Roku](/docs/watching-streams/roku)** - Owncasts para Roku o AirPlay
- **[Amazon Fire TV](/docs/watching-streams/amazon-fire-tv)** - VLC para Fire TV
- **[Google TV](/docs/watching-streams/google-tv)** - VLC para Android TV

## Configuración Recomendada

Para la mejor experiencia, recomendamos:

1. **Dispositivo de streaming dedicado** (Apple TV, Fire TV, Roku) y una aplicación de streaming en lugar de aplicaciones de TV inteligente incorporadas
2. **VLC** como una solución universal para la mayoría de las plataformas
3. **Aplicaciones nativas de Owncast** cuando estén disponibles para tu plataforma
4. **Casting/AirPlay** desde dispositivos móviles cuando las aplicaciones directas no estén disponibles

## ¿Necesitas ayuda?

Si tienes problemas con alguno de estos métodos, únete a nuestro chat comunitario para asistencia.
