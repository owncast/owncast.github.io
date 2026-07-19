---
title: Alojar activos públicos
description: Haz que tus propios archivos sean públicamente accesibles.
sidebar_position: 200
sidebar_label: Alojar activos públicos
---

Al crear un directorio `data/public` y colocar tus propios archivos allí, puedes servir cualquier activo que desees hacer públicamente accesible por cualquier razón.

Después, podrás acceder a estos activos a través de la ruta `/public` en tu servidor web de Owncast. Por ejemplo:

`https://stream.example.com/public/image.png`

`https://stream.example.com/public/style.css`

Algunos ejemplos de razones por las que podrías querer aprovechar esto:

- Hacer que una fuente CSS esté disponible para que la puedas referenciar en tu CSS personalizado.
- Tienes imágenes que deseas usar en el contenido de tu página.
- Algunos archivos arbitrarios que deseas que la gente descargue no tienen otro lugar donde ser alojados.
