---
id: regarder-des-flux
title: Regarder sur les téléviseurs et les appareils
slug: /regarder-des-flux
sidebar_label: Aperçu & Méthodes Génériques
hide_title: true
sidebar_position: 1
tags:
  - regarder
  - télé
  - télévision
  - appareils
  - streaming
  - iptv
  - m3u8
description: Aperçu de tous les appareils et plateformes pris en charge pour regarder les flux Owncast sur les téléviseurs et les appareils de streaming.
---

Il existe de nombreuses façons de regarder les flux en direct Owncast sur de nombreux appareils différents. Cette section fournit des guides détaillés pour chaque plateforme et type d'appareil pris en charge.

:::note
La plupart des applications répertoriées ici ne sont pas fournies, approuvées ou supportées par Owncast. Vous devez faire vos propres choix concernant les applications que vous installez. Les produits répertoriés sont des suggestions qui ont été testées et considérées comme fonctionnant avec Owncast. Ceux construits et fournis par Owncast doivent être considérés comme des projets secondaires pour aider les spectateurs.
:::

## Méthodes d’Accès Rapide

### Tout Lecteur Vidéo ou Matériel Existant

Owncast prend en charge les standards de streaming vidéo, vous pouvez donc utiliser n'importe quel lecteur vidéo qui prend en charge HLS (HTTP Live Streaming) pour regarder les flux. Cela signifie que de nombreuses applications de lecture vidéo existantes, matériels, et téléviseurs intelligents peuvent déjà lire les flux Owncast.

Installez ou ouvrez n'importe quelle application de lecture vidéo pour votre plateforme et utilisez l'URL `https://your-owncast-server.com/hls/stream.m3u8` pour accéder directement au flux. Cela inclut simplement le fait de mettre cette URL dans le navigateur Safari sur un iPhone, ou d'envoyer `https://your-owncast-server.com` en tant que lien dans un iMessage à un ami, ils pourront lire le flux directement dans le message.

### Parcourir le Répertoire

Si votre application dispose de ce que l'on appelle souvent un support "IPTV" ou M3U, vous pouvez parcourir le répertoire directement en ajoutant `https://owncast.directory/api/iptv` à l'application. Toutes les applications ne prennent pas en charge cela.

## Guides Spécifiques aux Appareils

### Boîtiers et Appareils de Streaming

- **[Apple TV](/docs/watching-streams/apple-tv)** - Owncasts pour tvOS, VLC ou AirPlay
- **[Roku](/docs/watching-streams/roku)** - Owncasts pour Roku ou AirPlay
- **[Amazon Fire TV](/docs/watching-streams/amazon-fire-tv)** - VLC pour Fire TV
- **[Google TV](/docs/watching-streams/google-tv)** - VLC pour Android TV

## Configuration Recommandée

Pour la meilleure expérience, nous recommandons :

1. **Appareil de streaming dédié** (Apple TV, Fire TV, Roku) et une application de streaming plutôt que des applications de smart TV intégrées
2. **VLC** comme solution universelle pour la plupart des plateformes
3. **Applications Native Owncast** lorsqu'elles sont disponibles pour votre plateforme
4. **Casting/AirPlay** depuis des appareils mobiles lorsque des applications directes ne sont pas disponibles

## Besoin d'aide ?

Si vous avez des problèmes avec l'une de ces méthodes, rejoignez notre chat communautaire pour obtenir de l'aide.
