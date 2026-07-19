---
title: Cambia tu clave de transmisión y contraseña de administrador
description: Cambia la clave que utilizas para transmitir e iniciar sesión en tu administrador.
unlisted: true
related:
  excludeFromAll: true
tags:
  - administrador
  - clave
  - contraseña
---

## El administrador

Puedes establecer la contraseña de administrador y agregar claves de transmisión en la configuración del servidor.

<img src="/docs/img/admin-stream-keys.png" alt="La pestaña Claves de Transmisión de la página de configuración del servidor, mostrando la clave de transmisión predeterminada y un botón para agregar más" width="80%" />

## Claves de transmisión

### Opción de línea de comando

Puedes establecer una única clave de transmisión válida en tiempo de ejecución con la opción de línea de comando `--streamkey`. Ejecuta Owncast con `--help` para ver todas las opciones disponibles.

1. Detén el servicio de ejecución.
2. Ejecuta `owncast --streamkey newkey`

Esto iniciará Owncast utilizando tu nueva clave de transmisión.

## Contraseña de administrador

Puedes establecer la contraseña de administrador en tiempo de ejecución con la opción de línea de comando `--adminpassword`. Ejecuta Owncast con `--help` para ver todas las opciones disponibles.
