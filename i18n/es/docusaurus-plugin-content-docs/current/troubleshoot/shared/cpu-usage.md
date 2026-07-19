---
title: ''
description: ''
unlisted: true
related:
  excludeFromAll: true
---

Si tu hardware está al máximo, es posible que tu video no se procese y entregue lo suficientemente rápido para mantenerse al día con los requisitos en tiempo real de video en vivo.

Cada calidad de salida de transmisión añade un uso significativo de CPU y ralentiza la generación total de segmentos de video. Se recomienda comenzar con una salida, y luego añadir adicionales, una a la vez, para ver cómo impacta en el uso de tu CPU.

Si tu CPU está sobreutilizada, aquí hay algunos pasos que puedes intentar para resolver esto.

1. Es posible que tengas demasiadas salidas de video definidas en tu configuración. Intenta limitarte a una sola salida, y a partir de ahí.
2. Cambia tus ajustes para usar [menos cpu](/docs/video/#cpu-usage).
3. Experimenta reduciendo la tasa de bits y la frecuencia de imágenes de tu video.
4. Si has reducido a una sola salida, cambiado a usar menos cpu, y experimentado con diferentes calidades en tu software de transmisión, es posible que el servidor en el que estás ejecutando Owncast simplemente no sea lo suficientemente potente para la tarea y que necesites intentar un entorno diferente para ejecutar esto.
5. Para tu mayor calidad, ajusta la tasa de bits de salida de tu servidor Owncast exactamente a lo que tu software de transmisión está enviando para minimizar la cantidad de trabajo que tu servidor tiene que hacer.
6. Si descubres que no puedes realizar ningún tipo de codificación debido a tu hardware del servidor, es posible que desees experimentar habilitando [video passthrough](/docs/video/#video-passthrough), donde tu video no es re-codificado. Sin embargo, esto puede no ser una solución en todos los entornos y a menudo hay efectos secundarios. [Lee más](/docs/video/#video-passthrough).

En general, la forma más fácil de ahorrar CPU es disminuir el tamaño de entrada, disminuir el tamaño de salida, o ambos.
