---
title: Plugins
description: Un aperçu des plugins Owncast, de ce qu'ils peuvent faire pour votre flux et de la façon d'en installer un depuis l'interface d'administration.
sidebar_position: 250
sidebar_label: Plugins
tags:
  - plugins
  - étendre
  - bots
  - superpositions
  - intégrations
---

Les plugins vous permettent d'ajouter un nouveau comportement à votre serveur Owncast sans écrire de code vous-même. Ce sont de petits modules complémentaires qui fonctionnent à l'intérieur d'Owncast et peuvent réagir au chat, aux téléspectateurs, aux événements de flux et au fediverse. Un plugin est livré sous la forme d'un fichier unique `.ocpkg` que vous téléchargez depuis l'interface d'administration.

Il est encore très tôt dans l'écosystème des plugins. L'API est nouvelle et évolutive, et il n'y a aujourd'hui que quelques plugins disponibles. Mais il y a beaucoup de choses que vous pouvez faire avec eux : bots de chat, superpositions de flux, intégrations personnalisées avec d'autres services et plus. Si vous avez une idée pour un plugin que vous aimeriez voir, partagez-la avec la [communauté](/chat?tab=community).

## Que peut faire un plugin ?

Un plugin peut :

- Ajouter un **bot de chat** qui répond aux commandes, poste des rappels ou élimine les spams.
- Ajouter une **superposition de flux** que vous pouvez intégrer dans OBS en tant que source de navigateur (superpositions de chat en direct, compteurs de téléspectateurs, alertes, etc.).
- **Connecter Owncast à d'autres services** comme Discord, le fediverse ou vos propres webhooks, de sorte que le fait de passer en direct ou qu'un nouveau follower déclenche quelque chose ailleurs.
- Ajouter des **boutons UI personnalisés** qui renvoient à votre magasin, votre page de dons, votre emploi du temps ou tout autre chose.

L'auteur du plugin décide de ce que fait son plugin. Vous décidez si vous souhaitez l'installer.

## Comment un plugin demande l'autorisation

Avant qu'un plugin ne puisse faire quoi que ce soit de sensible, il doit le déclarer. Lorsque vous installez un plugin, l'administration vous montre une liste de **permissions**, en langage clair, de chaque capacité que le plugin utilisera : des choses comme "Poster des messages de chat sous l'identité de bot propre du plugin" ou "Faire des requêtes HTTP sortantes vers d'autres services". Vous passez en revue cette liste et décidez si vous souhaitez activer le plugin.

![L'invite de permission qu'Owncast montre lorsque vous installez un plugin](/docs/img/plugins-permissions.png)

Si le plugin est ultérieurement mis à jour et demande **plus** d'accès qu'auparavant, Owncast met le plugin en pause et affiche un badge "nécessite une nouvelle approbation". Le plugin ne fonctionnera plus jusqu'à ce que vous examiniez les nouvelles permissions et les approuviez. Vos approbations existantes ne s'étendent jamais silencieusement.

## Installation d'un plugin

Ouvrez **Plugins** dans la barre latérale de l'administration. Il existe deux façons d'en ajouter un.

**Parcourir le catalogue.** L'onglet **Parcourir** affiche les plugins publiés dans le répertoire public. Chaque carte montre ce que fait le plugin, qui l'a construit et les permissions qu'il demande. Cliquez sur **Installer** sur l'un d'eux et Owncast le télécharge pour vous.

![Le catalogue de plugins dans l'onglet Parcourir de l'administration Owncast](/docs/img/plugins-browse.png)

**Téléchargez le vôtre.** Dans l'onglet **Installé**, cliquez sur **Télécharger le plugin** et choisissez un fichier `.ocpkg`. Utilisez ceci pour un plugin que vous avez construit vous-même ou obtenu d'un autre endroit que le catalogue.

Dans tous les cas, Owncast vous montre la liste des permissions du plugin et demande si vous souhaitez l'activer. Activez **Activé** pour le charger. Le plugin survit aux redémarrages, donc vous n'avez pas besoin de l'activer à nouveau après un redémarrage.

## Désactiver et supprimer

- **Désactiver** conserve le plugin installé mais l'empêche de s'exécuter. Revenez à **Activé** pour le charger à nouveau.
- **Désinstaller** supprime complètement le plugin. Depuis la page **Plugins**, cliquez sur l'icône de corbeille sur sa ligne et confirmez. Le fichier du plugin est supprimé du serveur et il cesse de faire quoi que ce soit immédiatement.

## Commandes de chat et `!help`

De nombreux plugins ajoutent des commandes de chat. Ce sont de courtes messages qui commencent par un préfixe, généralement `!`, qui indiquent à un plugin de faire quelque chose. L'exemple du Timer Bot ci-dessous ajoute `!remind`, `!countdown`, et quelques autres. Un téléspectateur tape la commande et le plugin répond dans le chat.

Vous n'avez pas besoin de mémoriser chaque offre de plugin. Owncast dispose d'une commande `!help` intégrée. Quiconque dans le chat peut taper `!help` (ou `!commands`) et Owncast répond avec un message unique répertoriant chaque commande de vos plugins activés, regroupées par plugin, chacune avec une courte description.

![Chat montrant la commande !help répertoriant et le plugin Timer Bot en cours d'utilisation](/docs/img/plugins-chat-help.png)

Quelques éléments à savoir sur `!help` :

- **Owncast construit la liste, pas un plugin.** Aucun plugin ne peut remplacer `!help`, et la liste reflète toujours exactement les commandes que vos plugins actuellement activés fournissent. Installez un plugin qui ajoute des commandes et elles apparaissent dans `!help` immédiatement. Désactivez-le et elles disparaissent.
- **Les plugins annoncent leurs propres commandes.** Un plugin déclare ses commandes et leurs descriptions, il n'y a donc rien à configurer de votre part. Les descriptions que vous voyez dans `!help` proviennent directement du plugin.
- **Les commandes des modérateurs restent cachées.** Les commandes qu'un plugin marque comme réservées aux modérateurs n'apparaissent dans `!help` que pour vos modérateurs.

## D'où viennent les plugins ?

Les plugins sont construits et partagés par leurs auteurs.

Lorsque vous installez un plugin tiers, la liste des **permissions** est votre limite de confiance. Si un plugin demande plus d'accès que ce à quoi vous vous attendez par rapport à ce qu'il prétend faire, cela vaut la peine de le revoir avant de l'activer.

## Vous voulez en construire un ?

La documentation complète pour les développeurs se trouve sur [Construire des plugins personnalisés](/docs/plugins).
