---
title: ""
description: ""
unlisted: true
related:
  excludeFromAll: true
---

Vea la consola de desarrollador de su navegador en busca de errores de conexión de websocket para ayudar a diagnosticar este problema.

## Su proxy puede no ser compatible con websockets

Si está utilizando un proxy frente a su instancia de Owncast, asegúrese de que esté configurado correctamente para soportar websockets. Por defecto, algunos no pasan correctamente el websocket. Lea [la documentación de su proxy](/docs/sslproxies/nginx) para asegurarse de que el soporte de websocket esté configurado correctamente para soportar el chat de Owncast.

## Anulación de socket incorrecta

Si bien la mayoría de las personas no deberían necesitar jamás cambiar la URL de anulación de socket en la configuración avanzada de administración de Owncast, si la cambió por alguna razón a un valor incorrecto, esto detendrá el funcionamiento del chat.

Elimine el valor de anulación de socket o configúrelo en su valor correcto esperado para su instancia de Owncast para solucionarlo.
