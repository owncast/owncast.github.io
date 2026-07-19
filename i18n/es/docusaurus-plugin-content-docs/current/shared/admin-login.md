---
title: Información de inicio de sesión predeterminada
description: Instrucciones para iniciar sesión en la interfaz de administración de Owncast y credenciales predeterminadas.
unlisted: true
related:
  excludeFromAll: true
---

La interfaz de administración se puede encontrar navegando a `/admin` en su servidor Owncast (por ejemplo, `https://owncast.example.com/admin`).

[Configurar su software de transmisión](/docs/broadcasting) para transmitir a su servidor Owncast requiere que utilice el punto final `/live` junto con proporcionar la clave de transmisión. (por ejemplo, `rtmp://owncast.example.com/live` con la clave de transmisión `abc123`). Si su software no permite especificar la clave de transmisión por separado, es posible que deba agregarla a la URL como `rtmp://owncast.example.com/live/abc123`.

## Credenciales predeterminadas

| Predeterminado                     | Valor  |
| ---------------------------------- | ------ |
| Nombre de usuario de administrador | admin  |
| Contraseña de administrador        | abc123 |
| Clave de transmisión               | abc123 |

Estas son las credenciales predeterminadas para iniciar sesión en la interfaz de administración de Owncast y transmitir a su servidor Owncast. Se recomienda encarecidamente que cambie estos valores inmediatamente después de su primer inicio de sesión para garantizar la seguridad de su servidor.

## Próximos pasos

1. Dirija su software de transmisión a su nuevo servidor usando `rtmp://yourserver/live` con su clave de transmisión. Si su software no tiene una forma de especificar una clave de transmisión, use la URL `rtmp://yourserver/live/streamkey` y use su clave de transmisión en su lugar.
2. Acceda a su servidor en su navegador web visitando `http://yourserver:8080`.
3. Puede visitar el panel de administración en `http://yourserver:8080/admin`, donde puede verificar estadísticas de visitantes y del servidor, cambiar su clave de transmisión, personalizar el contenido mostrado en su página, y más. Para iniciar sesión, use el nombre de usuario `admin` y su contraseña de administrador (`abc123` por defecto).

**Nota:** Su clave de transmisión y su contraseña de administrador ambos son `abc123` por defecto, pero son configuraciones separadas. La clave de transmisión se utiliza solo por su software de transmisión para publicar video. No es su contraseña de administrador.
