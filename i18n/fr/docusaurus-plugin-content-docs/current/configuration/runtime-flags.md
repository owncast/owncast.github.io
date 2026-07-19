---
title: Configuration via les Drapeaux d'Exécution
description: >-
  La configuration se fait généralement via la page d'administration Owncast située sur votre serveur sous `/admin`, cependant, il existe un certain nombre de drapeaux d'exécution que vous pouvez définir lors du démarrage d'Owncast pour modifier son comportement.
sidebar_position: 100
sidebar_label: Configuration via les drapeaux d'exécution
---

La configuration se fait généralement via le site d'administration Owncast situé sur votre serveur sous `/admin`, cependant, il existe un certain nombre de drapeaux d'exécution que vous pouvez définir lors du démarrage d'Owncast pour modifier son comportement.

La plupart des administrateurs n'ont jamais besoin de cela. Utilisez l'interface administrateur pour une configuration normale. Les drapeaux ici sont principalement pour la récupération, comme réinitialiser un mot de passe administrateur perdu, ou pour des démarrages scriptés et automatisés.

Vous pouvez exécuter Owncast avec `--help` pour voir une liste complète des drapeaux d'exécution disponibles.

## Mot de passe Administrateur

Vous pouvez réinitialiser le mot de passe administrateur au démarrage via le drapeau `--adminpassword`. C'est la manière habituelle de récupérer l'accès si vous avez perdu votre mot de passe administrateur. Par exemple :

```bash
owncast --adminpassword monnouveaumotdepasse
```

## Clé de Stream

Vous pouvez définir une clé de stream temporaire au démarrage via le drapeau `--streamkey`. Par exemple :

```bash
owncast --streamkey macléstream
```

## Ports Personnalisés

Par défaut, Owncast exécutera un serveur web `http` sur le port `8080` et un serveur RTMP sur le port `1935`. Vous pouvez changer les ports dans l'admin. Vous devez redémarrer Owncast pour que ces changements prennent effet.

Vous pouvez également définir le port en ligne de commande via les drapeaux `--webserverport` et `--rtmpport` respectivement. Par exemple :

```bash
owncast --webserverport 9090 --rtmpport 2945
```

## Sauvegardes

Vous pouvez spécifier où les sauvegardes sont enregistrées via le drapeau `--backupdir`. Par exemple :

```bash
owncast --backupdir /chemin/vers/répertoire/sauvegarde
```