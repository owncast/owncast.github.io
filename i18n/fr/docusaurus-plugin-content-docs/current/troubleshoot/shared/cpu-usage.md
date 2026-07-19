---
title: ''
description: ''
unlisted: true
related:
  excludeFromAll: true
---

Si votre matériel est saturé, votre vidéo peut ne pas être traitée et livrée assez rapidement pour répondre aux exigences en temps réel des vidéos en direct.

Chaque qualité de sortie d'un flux ajoute une utilisation CPU significative et ralentit la génération globale des segments vidéo. Il est généralement conseillé de commencer avec une sortie, puis d'en ajouter d'autres, une à la fois, pour voir comment cela impacte votre utilisation CPU.

Si votre CPU est trop sollicité, voici quelques étapes que vous pouvez essayer pour résoudre ce problème.

1. Vous avez peut-être trop de sorties vidéo définies dans vos paramètres. Essayez de vous limiter à une seule sortie, puis progressez à partir de là.
2. Modifiez vos paramètres pour utiliser [moins de cpu](/docs/video/#cpu-usage).
3. Expérimentez en réduisant le débit binaire et la fréquence d'images de votre vidéo.
4. Si vous êtes passé à une seule sortie, que vous avez changé pour utiliser moins de cpu, et que vous avez expérimenté avec différentes qualités dans votre logiciel de diffusion, il est possible que le serveur sur lequel vous exécutez Owncast ne soit tout simplement pas assez puissant pour la tâche et que vous deviez essayer un environnement différent.
5. Pour votre qualité la plus élevée, faites correspondre le débit binaire de sortie de votre serveur Owncast exactement à ce que votre logiciel de diffusion envoie pour minimiser la charge de travail de votre serveur.
6. Si vous constatez que vous ne pouvez pas accomplir l'encodage de quelque sorte en raison de votre matériel serveur, vous pouvez essayer d'activer [le passthrough vidéo](/docs/video/#video-passthrough), où votre vidéo n'est pas ré-encodée. Cependant, cela peut ne pas être une solution dans tous les environnements et il y a souvent des effets secondaires. [En savoir plus](/docs/video/#video-passthrough).

En général, le moyen le plus simple d'économiser le CPU est de réduire la taille d'entrée, de réduire la taille de sortie, ou les deux.
