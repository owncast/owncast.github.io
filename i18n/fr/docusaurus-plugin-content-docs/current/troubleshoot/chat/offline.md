---
title: Le clavardage est hors ligne
description: ''
tags:
  - clavardage
  - hors ligne
---

Le clavardage n'est activé que lorsqu'un flux est actif. Ceci est pour arrêter les messages de clavardage indésirables des personnes lorsque aucun flux n'est en cours.

Si vous utilisez un proxy devant votre instance Owncast, assurez-vous qu'il est configuré correctement pour prendre en charge les websockets. Par défaut, certains ne transmettent pas correctement le websocket. Lisez [la documentation de votre proxy](/docs/sslproxies/nginx) pour vous assurer que le support des websockets est correctement configuré pour prendre en charge le clavardage Owncast.

