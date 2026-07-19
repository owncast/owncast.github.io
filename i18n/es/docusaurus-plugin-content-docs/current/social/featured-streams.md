---
title: Flujos Destacados
description: Presenta otros flujos de Owncast en tu servidor para que los visitantes puedan descubrirlos, y ten tu propio flujo destacado en otros servidores.
sidebar_position: 4
sidebar_label: Flujos Destacados
tags:
  - flujos destacados
  - directorio
  - descubrimiento
  - federación
  - red
---

Los flujos destacados permiten que tu servidor muestre un pequeño directorio de otros flujos de Owncast. Los visitantes obtienen una pestaña **Destacados** en tu página principal que lista los servidores que presentas, con el estado en vivo o fuera de línea de cada uno. Le da a las personas un lugar al que ir cuando no estás transmitiendo y una forma de encontrar flujos relacionados.

Presentar es optativo en ambos lados. Tú eliges qué servidores presentar, y el otro operador decide si te permite presentarlos. Dos servidores pueden presentarse entre sí, pero cada lado aprueba al otro de manera independiente.

:::info[Nuevo en Owncast 0.3.0]
Los flujos destacados son una nueva función en Owncast 0.3.0. Si encuentras un error o tienes una sugerencia, por favor [abre un problema](https://github.com/owncast/owncast/issues) o [chatea en vivo con la comunidad](/chat?tab=community).
:::

## Antes de comenzar

Los flujos destacados funcionan sobre la misma federación que potencia las [características sociales](./index.mdx) de Owncast, así que:

- [Las características sociales deben estar habilitadas](./index.mdx#enabling-social-features) tanto en tu servidor como en el que deseas presentar.
- El otro servidor también debe ser Owncast, en una versión reciente que soporte flujos destacados.
- Debe ser accesible por HTTPS en el puerto estándar (443). Un servidor publicado en un puerto no estándar no puede ser presentado.

## Presentar otro flujo

1. En la barra lateral de administración, abre **Flujos Destacados**.
2. Haz clic en **Presentar Flujo en Vivo**.
3. Ingresa la dirección del servidor que deseas presentar, por ejemplo `https://otroservidor.ejemplo.com`.
4. Guardar.

<img src="/docs/img/admin-featured-streams.png" alt="La página de Flujos Destacados en el administrador, con un botón de Presentar Flujo en Vivo y pestañas para los flujos que presentas y los servidores que te presentan" width="80%" />

El servidor aparece en tu lista de inmediato con un estado de **Aprobación pendiente**, y aún no se mostrará a tus visitantes. Presentar un servidor le envía una solicitud, y el operador de ese servidor debe aprobarla antes de que la entrada se haga pública. Esto es lo que impide que alguien liste un servidor como destacado sin su consentimiento.

## Aprueba una solicitud para que te presenten

Cuando otro servidor te presenta, una solicitud aparece bajo **Flujos Destacados** en el administrador. El ítem **Flujos Destacados** en la barra lateral lleva una insignia con el número de solicitudes que te están esperando, para que las notes sin tener que ir a buscarlas. Aprueba una solicitud y ese servidor podría listar tu entrada en su directorio. Hasta que apruebes, el otro servidor muestra tu entrada como pendiente y la mantiene oculta de sus visitantes.

Aprobar una solicitud es independiente de tus seguidores regulares. Un servidor que te presenta no aparece en tu lista de Seguidores ni cuenta.

Puedes ver cada directorio que actualmente te presenta, y quitar cualquiera de ellos, en la pestaña **Te presentan** del administrador de Seguidores. Eliminar uno detiene el envío de tu estado de transmisión, así que tu entrada cae de ese directorio.

## Lo que ven tus visitantes

Una vez que un servidor que presentas ha aprobado la solicitud, aparece en la pestaña **Destacados** de tu página principal:

- Los servidores en vivo muestran una miniatura de la transmisión actual junto con su título, y se ordenan en la parte superior.
- Los servidores fuera de línea muestran el logo del servidor.
- Cada tarjeta muestra el nombre del servidor y su dirección y ofrece enlaces a ese servidor para que un visitante pueda ir a verlo.

La pestaña se actualiza aproximadamente una vez por minuto por sí sola, así que un servidor destacado que se pone en vivo o fuera de línea aparece sin que nadie tenga que recargar la página.

El estado de un servidor sigue lo que realmente está sucediendo en él:

- Se muestra como en vivo dentro de aproximadamente un minuto después de que inicia la transmisión.
- Regresa a fuera de línea tan pronto como termina esa transmisión.
- Si un servidor destacado desaparece sin terminar su transmisión de manera limpia, porque se bloqueó o perdió la conectividad, su entrada vuelve a caer en fuera de línea después de aproximadamente diez minutos.

## Dejar de presentar un flujo

En **Flujos Destacados**, haz clic en **Dejar de presentar** junto al servidor que ya no quieres listar. Se elimina de tu directorio y tus visitantes dejan de verlo.

## Construye tu propio directorio

Los flujos destacados están construidos sobre el soporte de ActivityPub de Owncast. Si prefieres construir tu propio directorio o agregador que rastree servidores Owncast en vivo en lugar de usar la pestaña Destacados integrada, consulta [Construyendo un directorio de flujos de Owncast](/docs/api/activitypub#building-a-directory-of-owncast-streams) en la referencia del protocolo ActivityPub.

Para un ejemplo completo y ejecutable, consulta el repositorio [owncast-directory-example](https://github.com/owncast/owncast-directory-example). Es una pequeña aplicación de referencia que sigue los servidores Owncast, rastrea cuáles están en vivo, toma envíos de operadores y sirve una página web que los lista. Es puramente una prueba de concepto y no está destinado para uso en producción, pero muestra cómo usar la API de ActivityPub para construir un directorio de flujos de Owncast.
