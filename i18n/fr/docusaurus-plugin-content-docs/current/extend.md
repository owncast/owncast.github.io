---
title: Moyens d'étendre Owncast
description: Construisez sur Owncast avec des plugins qui fonctionnent à l'intérieur du serveur, ou avec des API web et des webhooks pour du code que vous exécutez ailleurs.
---

Il existe deux façons de construire sur Owncast, et la bonne dépend de l'endroit où votre code s'exécute.

[**Plugins**](/docs/plugins) s'exécutent à l'intérieur du serveur Owncast. Le serveur les charge au moment de l'exécution, les isole, et leur passe des événements au fur et à mesure qu'ils se produisent : messages de chat, début et arrêt de flux, activité fediverse, et requêtes HTTP. Un plugin peut ajouter sa propre interface d'administration et servir des points d'entrée sans que vous ayez à héberger quoi que ce soit séparément. Faites appel à un plugin lorsque le comportement appartient au serveur, comme un bot de chat, une règle de modération, ou un panneau d'administration personnalisé.

[**APIs web et webhooks**](/docs/api) connectent Owncast à un code que vous exécutez ailleurs. [Webhooks](/docs/api/webhooks) envoient des événements à votre application lorsque quelque chose se produit sur le flux. Les APIs web permettent à votre application d'envoyer des actions, comme publier un message de chat, authentifiées par un jeton d'accès. Faites appel à ces options lorsque vous exécutez déjà un service, lorsque vous intégrez Owncast dans un outil tiers, ou lorsque l'intégration doit se faire en dehors du serveur.

Les deux peuvent fonctionner en même temps, réagissant aux mêmes événements. Owncast parle également ActivityPub, donc votre serveur se fédère avec le fediverse sans aucun code supplémentaire.
