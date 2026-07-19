---
title: ""
description: ""
unlisted: true
related:
  excludeFromAll: true
---

Si vous utilisez un stockage externe, assurez-vous de pouvoir télécharger sur ce service de stockage assez rapidement. Sinon, le retard dans l'arrivée de vos fichiers chez le fournisseur de stockage que tout le monde utilise pour visionner la vidéo provoquera des mises en mémoire tampon.

Si vous avez une connexion de téléchargement lente, ou si vous téléchargez sur un service de stockage externe qui est trop éloigné, ou qui n'est pas optimisé pour des téléchargements rapides, vous pourriez rencontrer un problème où il faut trop de temps pour télécharger les segments vidéo, ce qui signifie qu'ils ne seront finalement pas disponibles assez rapidement pour être utilisés.

1. Déterminez s'il existe un autre point de terminaison pour votre service de stockage qui pourrait être géographiquement plus proche de vous.
2. Utilisez un service de stockage qui est aussi proche (physiquement et logiquement) de l'emplacement de votre instance Owncast. Par exemple, si vous êtes sur une machine AWS, utilisez un seau S3 dans la même région. Si vous êtes sur Digital Ocean, essayez DO Spaces. Mais peut-être ne pas utiliser DO Spaces si vous êtes sur une machine Linode, utilisez plutôt Linode Object Storage. Exécutez owncast avec `--enableVerboseLogging` pour voir si vous recevez des avertissements de téléchargement lent.
3. Essayez d'augmenter votre vitesse de téléchargement auprès de votre fournisseur de serveur.
4. Découvrez si votre service de stockage propose quelque chose comme [l'Accélération de Transfert d'AWS](https://docs.aws.amazon.com/AmazonS3/latest/dev/transfer-acceleration.html) pour (possiblement) essayer d'augmenter la vitesse des téléchargements.
5. Réduisez la qualité de votre vidéo afin que les segments vidéo soient plus petits et prennent moins de temps à télécharger.
