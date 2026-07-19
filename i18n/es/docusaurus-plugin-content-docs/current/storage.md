---
title: Utiliza el Almacenamiento de Objetos para Ahorrar Ancho de Banda
description: Utiliza un proveedor de almacenamiento externo para distribuir tu transmisión de video de Owncast.
sidebar_position: 500
sidebar_label: Utiliza almacenamiento de objetos para ahorrar ancho de banda
---

En lugar de servir video directamente desde tu servidor personal, puedes usar un proveedor de almacenamiento compatible con S3 para descargar los requisitos de ancho de banda y almacenamiento a otro lugar. Esto no es para el almacenamiento permanente de grabaciones o propósitos de archivo, solo para transmisiones en vivo.

Para aprender más sobre cómo tu ancho de banda puede verse afectado por la configuración de tu video y cómo usar el almacenamiento de objetos podría ayudar en algunos casos de uso, visita la página de [recursos y requisitos](/docs/resources-requirements/).

Si tu proveedor de almacenamiento es compatible con S3, probablemente funcionará con Owncast. Lee la documentación de tu proveedor para aprender a configurar un cubo de almacenamiento de objetos, habilitar CORS, hacer los archivos públicos y obtener las credenciales necesarias para proporcionar a tu configuración de Owncast.

## Configuración

<img src="/docs/img/admin-object-storage.png" alt="La pestaña de Almacenamiento de Objetos S3 de la página de configuración del Servidor, con campos para el endpoint, clave de acceso, clave secreta, cubo y región" width="75%" />

1. Visita la página de configuración de tu servidor Owncast en el administrador y visualiza la configuración de Almacenamiento de Objetos.
2. Habilítalo.
3. Visita a tu proveedor de almacenamiento y crea un nuevo cubo.
4. Introduce el nombre del cubo, la clave de acceso, la clave secreta y el endpoint que la interfaz de tu proveedor de almacenamiento de objetos te dio en la configuración de Owncast. Estos tienen que ser correctos, así que revísalos. Contacta al soporte de tu proveedor de almacenamiento si no estás seguro de cuáles son estos.
5. Asegúrate de que tu cubo sea accesible públicamente y que cualquiera pueda leer archivos de él. Algunos proveedores de almacenamiento pueden configurar tu cubo como privado por defecto, así que puede que necesites cambiar esta configuración.
6. Si tu proveedor de almacenamiento requiere que configures algún tipo de política de [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) para que tus archivos puedan ser accedidos, asegúrate de hacerlo. Visita la documentación de tu proveedor de almacenamiento de objetos para aprender cómo configurar tu política de CORS, ya que es diferente para cada proveedor. Generalmente es una buena idea permitir todos los orígenes, pero puedes restringirlo a tu servidor de Owncast si tienes una necesidad específica de hacerlo, y no anticipas usar tu transmisión en otras páginas web. Si tu transmisión no está funcionando y el registro de errores de la consola de tu navegador muestra errores sobre `CORS` o `Access-Control-Allow-Origin`, este es probablemente el problema. Esto es muy común, así que asegúrate de que tu bucket esté configurado correctamente.

### Configuraciones opcionales

La mayoría de las personas no necesitarán tocar estas configuraciones, pero están disponibles si las necesitas.

- **ACL**: Si se te requiere especificar una opción específica de control de acceso al subir archivos, puedes especificarlo aquí. Consulta la documentación de tu proveedor de almacenamiento de objetos.
- **Prefijo de ruta**: Si deseas almacenar tus archivos en un subdirectorio dentro de tu bucket, puedes especificarlo aquí. Por ejemplo, si deseas almacenar tus archivos en una carpeta llamada `mystream`, ingresarías `mystream` aquí. Esto solo es útil si estás usando un solo bucket para múltiples propósitos, o tienes múltiples servidores Owncast apuntando al mismo bucket.
- **Configuración de estilo de ruta**: Algunos proveedores de almacenamiento, como Oracle Cloud Objects, requieren que la opción de configuración de "estilo de ruta" esté habilitada. Consulta la documentación de tu proveedor de almacenamiento para saber si esto es requerido.

