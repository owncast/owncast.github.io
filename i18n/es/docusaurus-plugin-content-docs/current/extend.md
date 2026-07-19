---
title: Formas de extender Owncast
description: Construya sobre Owncast con complementos que se ejecutan dentro del servidor, o con APIs web y webhooks para el código que ejecute en otra parte.
---

Hay dos formas de construir sobre Owncast, y la correcta depende de dónde se ejecute su código.

[**Complementos**](/docs/plugins) se ejecutan dentro del servidor Owncast. El servidor los carga en tiempo de ejecución, los enjaula y les entrega eventos a medida que ocurren: mensajes de chat, inicio y detención de transmisión, actividad en el fediverso y solicitudes HTTP. Un complemento puede agregar su propia interfaz de administración y servir puntos finales sin que usted aloje nada por separado. Aproveche un complemento cuando el comportamiento pertenezca al servidor, como un bot de chat, una regla de moderación o un panel de administración personalizado.

[**APIs web y webhooks**](/docs/api) conectan Owncast con el código que ejecuta en otro lugar. [Webhooks](/docs/api/webhooks) envían eventos a su aplicación cuando algo sucede en la transmisión. Las APIs web permiten que su aplicación envíe acciones nuevamente, como publicar un mensaje de chat, autenticado con un token de acceso. Aproveche estos cuando ya ejecute un servicio, cuando esté conectando Owncast a una herramienta de terceros, o cuando la integración deba vivir fuera del servidor.

Ambos pueden ejecutarse al mismo tiempo, reaccionando a los mismos eventos. Owncast también habla ActivityPub, así que su servidor se federará con el fediverso sin ningún código adicional.
