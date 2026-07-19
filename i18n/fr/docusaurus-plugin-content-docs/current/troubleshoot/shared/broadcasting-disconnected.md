---
title: ""
description: ""
unlisted: true
related:
  excludeFromAll: true
---

1. Assurez-vous d'avoir une version prise en charge de ffmpeg sur votre serveur Owncast. [Télécharger ffmpeg 4.1.5 ou supérieur](https://ffmpeg.org/download.html).
2. Regardez vos journaux Owncast dans la console ou votre interface d'administration. Il peut y avoir des messages d'erreur spécifiques pour vous indiquer ce que vous pouvez faire ensuite.
3. Jetez un œil à `transcoder.log` pour des journaux détaillés que vous pouvez fournir lorsque vous demandez de l'aide si vous ne voyez rien dans les journaux Owncast.
4. Assurez-vous que votre copie de ffmpeg n'a pas été installée via des paquets Snap, car le sandboxing des logiciels distribués par Snap n'est pas compatible dans ce cas. Si vous voyez l'erreur `Error: unable to open display` dans `transcoder.log`, cela pourrait être votre problème.
