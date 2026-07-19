---
title: Streams recommandés
description: Mettez en avant d'autres streams Owncast sur votre serveur afin que les visiteurs puissent les découvrir et ayez votre propre stream mis en avant sur d'autres serveurs.
sidebar_position: 4
sidebar_label: Streams recommandés
tags:
  - streams recommandés
  - répertoire
  - découverte
  - fédération
  - réseau
---

Les streams recommandés permettent à votre serveur d'afficher un petit répertoire d'autres streams Owncast. Les visiteurs obtiennent un onglet **Mise en avant** sur votre page principale listant les serveurs que vous mettez en avant, avec le statut en direct ou hors ligne de chacun. Cela donne aux gens un endroit où aller lorsque vous ne diffusez pas et un moyen de trouver des streams connexes.

Le fait de mettre en avant est opt-in des deux côtés. Vous choisissez quels serveurs mettre en avant, et l'autre opérateur choisit s'il veut que vous le mettiez en avant. Deux serveurs peuvent se mettre en avant mutuellement, mais chaque côté approuve l'autre indépendamment.

:::info[Nouveau dans Owncast 0.3.0]
Les streams recommandés sont une toute nouvelle fonctionnalité dans Owncast 0.3.0. Si vous trouvez un bug ou avez une suggestion, veuillez [ouvrir un problème](https://github.com/owncast/owncast/issues) ou [discuter en direct avec la communauté](/chat?tab=community).
:::

## Avant de commencer

Les streams recommandés fonctionnent sur la même fédération qui alimente les [fonctionnalités sociales](./index.mdx) d'Owncast, donc :

- [Les fonctionnalités sociales doivent être activées](./index.mdx#enabling-social-features) à la fois sur votre serveur et sur celui que vous voulez mettre en avant.
- L'autre serveur doit également être Owncast, sur une version suffisamment récente pour prendre en charge les streams recommandés.
- Il doit être accessible via HTTPS sur le port standard (443). Un serveur publié sur un port non standard ne peut pas être mis en avant.

## Mettre en avant un autre stream

1. Dans la barre latérale d'administration, ouvrez **Streams recommandés**.
2. Cliquez sur **Mettre en avant un stream en direct**.
3. Entrez l'adresse du serveur que vous souhaitez mettre en avant, par exemple `https://otherserver.example.com`.
4. Enregistrer.

<img src="/docs/img/admin-featured-streams.png" alt="La page Streams recommandés dans l'administration, avec un bouton Mettre en avant un stream en direct et des onglets pour les streams que vous mettez en avant et les serveurs vous mettant en avant" width="80%" />

Le serveur apparaît dans votre liste tout de suite avec un statut **En attente d'approbation**, et il n'est pas encore visible pour vos visiteurs. Mettre en avant un serveur envoie une demande, et l'opérateur de ce serveur doit l'approuver avant que l'entrée ne soit mise en ligne. C'est ce qui empêche quiconque de lister un serveur comme recommandé sans son consentement.

## Approuver une demande pour vous mettre en avant

Lorsque l'autre serveur vous met en avant, une demande apparaît sous **Streams recommandés** dans l'administration. L'élément **Streams recommandés** dans la barre latérale porte un badge avec le nombre de demandes en attente, afin que vous les remarquiez sans avoir à les chercher. Approuver une demande et ce serveur peut vous inscrire dans son répertoire. Jusqu'à ce que vous approuviez, l'autre serveur affiche votre entrée comme en attente et la cache à ses visiteurs.

Approuver une demande est distinct de vos abonnés réguliers. Un serveur qui vous met en avant n'apparaît pas dans votre liste d'abonnés ni dans le compteur.

Vous pouvez voir chaque répertoire vous mettant actuellement en avant, et en retirer un, sous l'onglet **Vous mettant en avant** de l'administration des abonnés. Retirer un serveur cesse d'envoyer son statut de stream, donc votre entrée disparaît de ce répertoire.

## Ce que voient vos visiteurs

Une fois qu'un serveur que vous mettez en avant a approuvé la demande, il apparaît dans l'onglet **Mise en avant** de votre page principale :

- Les serveurs en direct affichent une miniature du stream actuel ainsi que son titre, et sont triés en haut.
- Les serveurs hors ligne affichent le logo du serveur.
- Chaque carte affiche le nom du serveur et son adresse et redirige vers ce serveur pour que le visiteur puisse aller regarder.

L'onglet se rafraîchit environ une fois par minute de lui-même, donc un serveur mis en avant qui devient en direct ou hors ligne apparaît sans que quiconque recharge la page.

Le statut d'un serveur reflète ce qui se passe réellement dessus :

- Il apparaît comme en direct dans environ une minute après le début du stream.
- Il revient en hors ligne dès que le stream se termine.
- Si un serveur mis en avant disparaît sans terminer son stream proprement, parce qu'il a planté ou perdu sa connectivité, son entrée revient en hors ligne après environ dix minutes.

## Cesser de mettre en avant un stream

Dans **Streams recommandés**, cliquez sur **Ne pas mettre en avant** à côté du serveur que vous ne voulez plus lister. Il est retiré de votre répertoire et vos visiteurs cessent de le voir.

## Créez votre propre répertoire

Les streams recommandés sont construits sur le support d'ActivityPub d'Owncast. Si vous préférez créer votre propre répertoire ou agrégateur qui suit les serveurs Owncast en direct plutôt que d'utiliser l'onglet Mis en avant intégré, voir [Construire un répertoire de streams Owncast](/docs/api/activitypub#building-a-directory-of-owncast-streams) dans la référence du protocole ActivityPub.

Pour un exemple complet et exécutable, voir le référentiel [owncast-directory-example](https://github.com/owncast/owncast-directory-example). C'est une petite application de référence qui suit les serveurs Owncast, suit ceux qui sont en direct, prend les soumissions des opérateurs et sert une page Web les listant. C'est purement une preuve de concept et n'est pas destiné à un usage en production, mais cela montre comment utiliser l'API ActivityPub pour construire un répertoire de streams Owncast.
