---
title: ''
description: ''
unlisted: true
related:
  excludeFromAll: true
---

Consultez la console de développement de votre navigateur pour les erreurs de connexion websocket afin d'aider à diagnostiquer ce problème.

## Votre proxy ne prend peut-être pas en charge les websockets

Si vous utilisez un proxy devant votre instance Owncast, assurez-vous qu'il est configuré correctement pour prendre en charge les websockets. Par défaut, certains ne transmettent pas correctement le websocket. Lisez [la documentation de votre proxy](/docs/sslproxies/nginx) pour vous assurer que le support des websockets est configuré correctement pour prendre en charge le chat d'Owncast.

## Surcharge de socket incorrecte

Bien que la plupart des gens ne devraient jamais avoir besoin de changer l'URL de surcharge de socket dans les paramètres avancés de l'administration d'Owncast, si vous l'avez changé pour une raison quelconque en une valeur incorrecte, cela empêchera le chat de fonctionner.

Supprimez la valeur de surcharge de socket ou définissez-la sur la valeur correcte attendue pour votre instance Owncast pour résoudre ce problème.
