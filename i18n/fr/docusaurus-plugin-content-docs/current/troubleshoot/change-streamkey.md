---
title: Modifiez votre clé de streaming et le mot de passe administrateur
description: Modifiez la clé que vous utilisez pour le streaming et la connexion à votre compte administrateur.
unlisted: true
related:
  excludeFromAll: true
tags:
  - administrateur
  - clé
  - mot de passe
---

## L'administrateur

Vous pouvez définir le mot de passe administrateur et ajouter des clés de stream dans les paramètres du serveur.

<img src="/docs/img/admin-stream-keys.png" alt="L'onglet Clés de Stream de la page des paramètres du serveur, montrant la clé de stream par défaut et un bouton pour en ajouter d'autres" width="80%" />

## Clés de stream

### Drapeau de ligne de commande

Vous pouvez définir une seule clé de stream valide à l'exécution avec le drapeau de ligne de commande `--streamkey`. Exécutez Owncast avec `--help` pour voir toutes les options disponibles.

1. Arrêtez le service.
2. Exécutez `owncast --streamkey newkey`

Cela démarrera Owncast en utilisant votre nouvelle clé de stream.

## Mot de passe administrateur

Vous pouvez définir le mot de passe administrateur à l'exécution avec le drapeau de ligne de commande `--adminpassword`. Exécutez Owncast avec `--help` pour voir toutes les options disponibles.
