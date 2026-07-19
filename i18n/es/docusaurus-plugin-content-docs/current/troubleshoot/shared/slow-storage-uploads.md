---
title: ""
description: ""
unlisted: true
related:
  excludeFromAll: true
---

Si está utilizando almacenamiento externo, asegúrese de poder subir a este servicio de almacenamiento lo suficientemente rápido. De lo contrario, la demora en la llegada de sus archivos al proveedor de almacenamiento que todos están utilizando para ver el video causará almacenamiento en búfer.

Si tiene una conexión de carga lenta, o está subiendo a un servicio de almacenamiento externo que está demasiado lejos, o no está optimizado para cargas rápidas, puede encontrarse con un problema en el que tarda demasiado en subir los segmentos de video, lo que finalmente no los hace disponibles lo suficientemente rápido para ser utilizados.

1. Determine si hay otro punto final para su servicio de almacenamiento que pueda estar geográficamente más cerca de usted.
2. Utilice un servicio de almacenamiento que esté lo más cerca (física y lógicamente) posible de donde está su instancia de Owncast. Por ejemplo, si está en una máquina de AWS, use un bucket S3 en la misma región. Si está en Digital Ocean, pruebe DO Spaces. Pero tal vez no use DO Spaces si está en una máquina Linode, use en su lugar Linode Object Storage. Ejecute owncast con `--enableVerboseLogging` para ver si recibe alguna advertencia de carga lenta.
3. Intente aumentar su velocidad de carga desde su proveedor de servidores.
4. Descubra si su servicio de almacenamiento ofrece algo como [AWS's Transfer Acceleration](https://docs.aws.amazon.com/AmazonS3/latest/dev/transfer-acceleration.html) para (posiblemente) intentar aumentar la velocidad de las cargas.
5. Reduzca la calidad de su video para que los segmentos de video sean más pequeños y tarden menos en cargar.
