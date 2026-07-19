---
title: Complementos
description: Una visión general de los complementos de Owncast, lo que pueden hacer por tu transmisión y cómo instalar uno desde el administrador.
sidebar_position: 250
sidebar_label: Complementos
tags:
  - complementos
  - ampliar
  - bots
  - superposiciones
  - integraciones
---

Los complementos te permiten agregar un nuevo comportamiento a tu servidor Owncast sin necesidad de escribir código tú mismo. Son pequeños complementos que se ejecutan dentro de Owncast y pueden reaccionar al chat, a los espectadores, a los eventos de transmisión y al fediverso. Un complemento se entrega como un único archivo `.ocpkg` que puedes subir desde el administrador.

Es muy temprano en el ecosistema de complementos. La API es nueva y está en evolución, y solo hay unos pocos complementos disponibles hoy. Pero hay mucho que puedes hacer con ellos: bots de chat, superposiciones de transmisión, integraciones personalizadas con otros servicios y más. Si tienes una idea para un complemento que te gustaría ver, compártela con la [comunidad](/chat?tab=community).

## ¿Qué puede hacer un complemento?

Un complemento puede:

- Agregar un **bot de chat** que responda a comandos, publique recordatorios o elimine spam.
- Agregar una **superposición de transmisión** que puedes colocar en OBS como una fuente de navegador (superposiciones de chat en vivo, contadores de espectadores, alertas, etc.).
- **Conectar Owncast a otros servicios** como Discord, el fediverso o tus propios webhooks, para que ir en vivo o un nuevo seguidor dispare algo en otros lugares.
- Agregar **botones de interfaz de usuario personalizados** que enlazan a tu tienda, página de donaciones, horario o cualquier otra cosa.

El autor del complemento decide lo que hace su complemento. Tú decides si lo instalas.

## Cómo un complemento solicita permiso

Antes de que un complemento pueda hacer algo sensible, tiene que declararlo. Cuando instalas un complemento, el administrador te muestra una lista de **Permisos**, en un lenguaje sencillo, de cada capacidad que el complemento usará: cosas como "Publicar mensajes de chat como la identidad de bot del complemento" o "Realizar solicitudes HTTP salientes a otros servicios". Revisas esa lista y decides si habilitar el complemento.

![El aviso de permisos que Owncast muestra cuando instalas un complemento](/docs/img/plugins-permissions.png)

Si el complemento se actualiza más tarde y solicita **más** acceso que antes, Owncast pausa el complemento y muestra una insignia de "requiere nueva aprobación". El complemento no se ejecutará nuevamente hasta que revises los nuevos permisos y los apruebes. Tus aprobaciones existentes nunca se expanden en silencio.

## Instalando un complemento

Abre **Complementos** en la barra lateral del administrador. Hay dos maneras de agregar uno.

**Buscar en el catálogo.** La pestaña **Buscar** lista los complementos publicados en el directorio público. Cada tarjeta muestra lo que hace el complemento, quién lo construyó y los permisos que solicita. Haz clic en **Instalar** en cualquiera de ellos y Owncast lo descarga por ti.

![El catálogo de complementos en la pestaña Buscar del administrador de Owncast](/docs/img/plugins-browse.png)

**Sube el tuyo propio.** En la pestaña **Instalados**, haz clic en **Subir complemento** y selecciona un archivo `.ocpkg`. Usa esto para un complemento que construiste tú mismo o que obtuviste de otro lugar que no sea el catálogo.

De cualquier manera, Owncast te muestra la lista de permisos del complemento y pregunta si deseas habilitarlo. Activa **Habilitado** para cargarlo. El complemento sobrevive a los reinicios, por lo que no necesitas habilitarlo nuevamente después de un reinicio.

## Deshabilitando y eliminando

- **Deshabilitar** mantiene el complemento instalado pero detiene su ejecución. Activa **Habilitado** nuevamente para cargarlo otra vez.
- **Desinstalar** elimina el complemento por completo. Desde la página de **Complementos**, haz clic en el icono de papelera en su fila y confirma. El archivo del complemento se elimina del servidor y deja de hacer algo inmediatamente.

## Comandos de chat y `!help`

Muchos complementos añaden comandos de chat. Estos son mensajes cortos que comienzan con un prefijo, generalmente `!`, que le dicen a un complemento que haga algo. El ejemplo del Bot de Timer a continuación añade `!recordar`, `!cuenta regresiva` y algunos otros. Un espectador escribe el comando y el complemento responde en el chat.

No tienes que memorizar lo que cada complemento ofrece. Owncast tiene un comando `!help` incorporado. Cualquiera en el chat puede escribir `!help` (o `!comandos`) y Owncast responde con un único mensaje que enumera cada comando de tus complementos habilitados, agrupados por complemento, cada uno con una breve descripción.

![Chat mostrando el comando !help y el complemento Timer Bot en uso](/docs/img/plugins-chat-help.png)

Algunas cosas que vale la pena saber sobre `!help`:

- **Owncast construye la lista, no un complemento.** Ningún complemento puede anular `!help`, y la lista refleja siempre exactamente los comandos que tus complementos habilitados actualmente proporcionan. Instala un complemento que añade comandos y aparecerán en `!help` de inmediato. Desactívalo y desaparecerán.
- **Los complementos publicitan sus propios comandos.** Un complemento declara sus comandos y sus descripciones, por lo que no hay nada que configurar. Las descripciones que ves en `!help` provienen directamente del complemento.
- **Los comandos de moderador permanecen ocultos.** Los comandos que un complemento marca como solo para moderadores solo aparecen en `!help` para tus moderadores.

## ¿De dónde vienen los complementos?

Los complementos son construidos y compartidos por sus autores.

Cuando instalas un complemento de terceros, la lista de **Permisos** es tu límite de confianza. Si un complemento solicita más acceso del que esperarías por lo que dice que hace, eso merece una segunda mirada antes de habilitarlo.

## ¿Quieres construir uno?

La documentación completa para desarrolladores está en [Construir complementos personalizados](/docs/plugins).
