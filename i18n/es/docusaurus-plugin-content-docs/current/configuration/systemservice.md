---
title: Ejecutar Owncast como un servicio en segundo plano
description: >-
  Configura Owncast para que se ejecute como un servicio del sistema, comenzando automáticamente cuando tu servidor lo hace.
sidebar_position: 200
sidebar_label: Ejecutar Owncast como un servicio en segundo plano
---

Puedes ejecutar Owncast bajo [systemd](https://systemd.io/) para que se inicie automáticamente cuando tu máquina arranca y se reinicie automáticamente si falla. Esta página es para servidores Linux que ejecutan systemd. Si ejecutas Owncast en un contenedor, utiliza la política de reinicio de Docker `restart: unless-stopped` en su lugar (ver [Ejecutar Owncast en un contenedor](/docs/getting-started/install/container)). En macOS el equivalente es un agente `launchd`.

## Crear el archivo de servicio

Crea un archivo en `/etc/systemd/system/owncast.service` con lo siguiente. Cambia `WorkingDirectory`, `ExecStart`, `User`, y `Group` para que coincidan con la ubicación donde está instalado Owncast y la cuenta con la que debe ejecutarse.

```ini
[Unit]
Description=Owncast
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/owncast
ExecStart=/opt/owncast/owncast
User=owncast
Group=owncast
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

`WorkingDirectory` es la carpeta que contiene el binario `owncast` y su directorio `data/`. `ExecStart` es la ruta completa al binario. No ejecutes Owncast como `root`. Crea un usuario dedicado (por ejemplo, `sudo useradd --system --home-dir /opt/owncast owncast`) y apunta `User`/`Group` a él.

## Habilitar y comenzar

Recarga systemd para que reconozca el nuevo archivo, luego habilita y comienza el servicio en un solo paso:

```sh
sudo systemctl daemon-reload
sudo systemctl enable --now owncast
```

`enable --now` inicia Owncast inmediatamente y lo configura para que se inicie en cada arranque.

## Confirma que está en funcionamiento

```sh
systemctl status owncast
```

Deberías ver `active (running)`. Para seguir los registros en vivo:

```sh
journalctl -u owncast -f
```

Una vez que esté en ejecución, carga tu servidor en un navegador en el puerto `8080` para confirmar que está sirviendo.

## Aseguramiento (opcional)

El proyecto incluye un [archivo de servicio de muestra](https://github.com/owncast/owncast/blob/develop/contrib/owncast-sample.service) que agrega opciones de sandboxing de systemd:

```ini
ReadWritePaths=/opt/owncast
NoNewPrivileges=true
SecureBits=noroot
ProtectSystem=strict
ProtectHome=read-only
```

`ProtectSystem=strict` hace que la mayor parte del sistema de archivos sea de solo lectura, por lo que `ReadWritePaths` debe apuntar a tu directorio de Owncast o el servidor no podrá escribir en su `data/`. Agrega estos a la sección `[Service]` si los deseas.

:::tip

El [directorio contrib](https://github.com/owncast/owncast/tree/develop/contrib) contiene más ejemplos proporcionados por los usuarios (incluidas notas para Windows). Esos archivos son contribuidos por la comunidad y no están oficialmente soportados, pero son un buen punto de partida para configuraciones que esta página no cubre.

:::
