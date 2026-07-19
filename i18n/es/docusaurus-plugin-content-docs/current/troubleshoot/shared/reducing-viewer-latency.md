---
title: ''
description: ''
unlisted: true
related:
  excludeFromAll: true
---

Intenta disminuir tu nivel de búfer de latencia en el administrador. Esto mantendrá al usuario más cerca de lo en vivo, pero le dará al cliente menos segmentos jugables para trabajar, posiblemente **reduciendo la resiliencia ante errores** y problemas de velocidad de red. Si tienes una máquina que puede procesar video rápidamente, es posible que solo logres unos pocos segundos de latencia, pero con poco margen de error.

Eres tú quien debe decidir si prefieres menos retrasos sobre **menos fiabilidad** o un flujo más confiable con un retraso adicional.

## Advertencia para Passthrough de Video

Si estás utilizando **Passthrough de Video** en tu configuración de video, probablemente **aumentará** tu latencia. Porque le estás diciendo a Owncast que no vuelva a codificar tu video, no puede segmentar óptimamente tu video en los trozos de tamaño requeridos para gestionar tu latencia. Si realmente quieres optimizar la latencia, entonces debes desactivar absolutamente Passthrough.

## Desventajas

### Solicitudes de red

Una latencia más baja resulta en más segmentos de video más pequeños que se sirven a tus espectadores. Esto resulta en más solicitudes web. No necesariamente más ancho de banda utilizado, sino simplemente más solicitudes que necesitan ser atendidas por tu servidor.

### Tolerancia a errores

Debido a que cada segmento de video es más pequeño, la tolerancia a errores cuando se trata de errores de red, o de las raras solicitudes de red fallidas resultará en que el espectador se quede en búfer. Con mayor latencia, se le da al espectador más video jugable en cola para reproducirse mientras se vuelve a intentar la solicitud de red o se puede recuperar.

### Consideraciones

Si estás en un escenario donde estás pagando por almacenamiento de objetos o una CDN donde el número de solicitudes impacta tu factura, es posible que desees considerar las compensaciones de una menor latencia o cambiar la configuración de tu infraestructura.
