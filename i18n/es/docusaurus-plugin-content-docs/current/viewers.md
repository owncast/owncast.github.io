---
title: Muestra de dónde son tus espectadores
description: Muestra información geográfica de alto nivel sobre dónde se conectan tus espectadores actuales.
sidebar_position: 600
sidebar_label: Muestra de dónde son tus espectadores
---

Owncast puede mostrar información geográfica de alto nivel sobre tus espectadores actuales si lo habilitas en tu instancia.

Tu servidor puede utilizar opcionalmente la [Base de Datos GeoLite2 de MaxMind](https://dev.maxmind.com/geoip/geolocate-an-ip/databases/). Si proporcionas tu propia copia gratuita de la base de datos, se utilizará. Realiza lo siguiente para agregar esta función.

1. [Crea una cuenta gratuita](https://www.maxmind.com/en/geolite2/signup) con MaxMind.
2. Espera un correo electrónico y sigue el enlace a tu cuenta.
3. Bajo `Productos y Suscripciones de Bases de Datos`, haz clic en `Descargar Bases de Datos`.
4. Descarga `GeoLite2 City (GeoIP2 Binary .mmdb)`.
5. Descomprime el archivo y coloca el archivo `GeoLite2-City.mmdb` en el directorio `data` de tu servidor Owncast. Crea este directorio si es necesario.
6. Reinicia tu servicio Owncast.

