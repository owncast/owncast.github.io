---
title: Realiza una copia de seguridad de tus datos y configuración de transmisión
description: Owncast realiza copias de seguridad periódicas de tus datos que pueden ser restauradas.
sidebar_position: 1100
sidebar_label: Copia de seguridad de tus datos y configuración de transmisión
---

Owncast creará una copia de seguridad de tus datos periódicamente. Se puede encontrar en tu directorio `backup` como `owncastdb.bak`. Puedes añadir esto a tus copias de seguridad normales del sistema para mantener tus datos de Owncast a salvo.

## Restaurar

Restaurar un archivo de copia de seguridad de Owncast te llevará de vuelta al momento en que se creó la copia de seguridad. Esto es útil si deseas mover datos a otra máquina, quieres retroceder en el tiempo por alguna razón, o hay algún tipo de problema que estás buscando resolver.

:::warning
Restaurar reemplaza tu base de datos actual con el contenido de la copia de seguridad. Cualquier cosa que haya cambiado desde que se tomó la copia de seguridad se perderá. Si necesitas los datos actuales, cópialos en un lugar seguro antes de restaurar.
:::

1. Detén Owncast.
2. Desde tu directorio de Owncast, ejecuta `./owncast --restoreDatabase <archivo_de_copia>`.
3. Reinicia Owncast como lo harías normalmente. Estará utilizando los datos restaurados.
