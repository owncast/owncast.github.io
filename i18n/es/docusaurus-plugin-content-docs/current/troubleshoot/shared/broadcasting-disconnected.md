---
title: ""
description: ""
unlisted: true
related:
  excludeFromAll: true
---

1. Asegúrate de tener una versión compatible de ffmpeg en tu servidor Owncast. [Descargar ffmpeg 4.1.5 o superior](https://ffmpeg.org/download.html).
2. Mira los registros de tu owncast en la consola o en tu administración. Puede haber mensajes de error específicos que te indiquen qué puedes hacer a continuación.
3. Echa un vistazo a `transcoder.log` para obtener un registro detallado que puedes proporcionar al solicitar ayuda si no ves nada en los registros de Owncast.
4. Asegúrate de que tu copia de ffmpeg no fue instalada a través de paquetes Snap, ya que la contención del software distribuido por Snap no es compatible en este caso. Si ves el error `Error: unable to open display` en `transcoder.log`, este podría ser tu problema.
