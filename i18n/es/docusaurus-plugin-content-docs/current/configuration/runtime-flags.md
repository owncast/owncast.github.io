---
title: Configuración a través de banderas de ejecución
description: >-
  La configuración generalmente se realiza a través de la página de administración de Owncast ubicada en su servidor bajo `/admin`, sin embargo, hay varias banderas de ejecución que puede establecer al iniciar Owncast para modificar su comportamiento.
sidebar_position: 100
sidebar_label: Configuración a través de banderas de ejecución
---

La configuración generalmente se realiza a través del sitio de administración de Owncast ubicado en su servidor bajo `/admin`, sin embargo, hay varias banderas de ejecución que puede establecer al iniciar Owncast para modificar su comportamiento.

La mayoría de los administradores nunca necesitan esto. Utilice la interfaz de administración para la configuración normal. Las banderas aquí son principalmente para recuperación, como restablecer una contraseña de administrador perdida, o para inicios automatizados y con guion.

Puede ejecutar Owncast con `--help` para ver una lista completa de las banderas de ejecución disponibles.

## Contraseña del administrador

Puede restablecer la contraseña del administrador al inicio a través de la bandera `--adminpassword`. Esta es la forma habitual de recuperar el acceso si ha perdido su contraseña de administrador. Por ejemplo:

```bash
owncast --adminpassword mynewpassword
```

## Clave de transmisión

Puede establecer una clave de transmisión temporal al inicio a través de la bandera `--streamkey`. Por ejemplo:

```bash
owncast --streamkey mystreamkey
```

## Puertos personalizados

Por defecto, Owncast ejecutará un servidor web `http` en el puerto `8080` y un servidor RTMP en el puerto `1935`. Puede cambiar los puertos en la administración. Debe reiniciar Owncast para que estos cambios tengan efecto.

También puede establecer el puerto en la línea de comando a través de las banderas `--webserverport` y `--rtmpport` respectivamente. Por ejemplo:

```bash
owncast --webserverport 9090 --rtmpport 2945
```

## Copias de seguridad

Puede especificar dónde se guardan las copias de seguridad a través de la bandera `--backupdir`. Por ejemplo:

```bash
owncast --backupdir /path/to/backup/directory
```