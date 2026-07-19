---
title: Montrez d'où viennent vos spectateurs
description: Affichez des informations géographiques de haut niveau sur l'endroit d'où se connectent vos spectateurs actuels.
sidebar_position: 600
sidebar_label: Montrez d'où viennent vos spectateurs
---

Owncast peut afficher des informations géographiques de haut niveau sur vos spectateurs actuels si vous l'activez dans votre instance.

Votre serveur peut utiliser en option la [Base de données MaxMind GeoLite2](https://dev.maxmind.com/geoip/geolocate-an-ip/databases/). Si vous fournissez votre propre copie gratuite de la base de données, elle sera utilisée. Effectuez les étapes suivantes pour ajouter cette fonctionnalité.

1. [Créez un compte gratuit](https://www.maxmind.com/en/geolite2/signup) avec MaxMind.
2. Attendez un e-mail et suivez le lien vers votre compte.
3. Sous `Produits et abonnements de base de données`, cliquez sur `Télécharger des bases de données`.
4. Téléchargez `GeoLite2 City (GeoIP2 Binary .mmdb)`.
5. Décompressez le fichier et placez le fichier `GeoLite2-City.mmdb` dans le répertoire `data` de votre serveur Owncast. Créez ce répertoire si nécessaire.
6. Redémarrez votre service Owncast.

