---
title: Configurer le logiciel de diffusion
slug: /diffusion
description: >-
  La façon dont vous configurez votre logiciel de diffusion peut affecter la qualité et la performance de votre flux
sidebar_position: 1
sidebar_label: Aperçu du logiciel de diffusion
tags:
  - streaming
  - rtmp
  - clé de diffusion
  - mot de passe
  - obs
  - diffusion
---

## Compatibilité

En général, Owncast est compatible avec tout logiciel utilisant `RTMP` pour diffuser vers un serveur distant. `RTMP` est ce que tous les grands services de streaming en direct utilisent, donc si vous utilisez actuellement l'un de ces services, il est probable que vous puissiez pointer votre logiciel existant vers votre instance Owncast à la place.

Cependant, nous n'avons pas testé avec tout. Donc si vous utilisez quelque chose de spécifique, [nous aimerions savoir quel logiciel vous utilisez et les résultats](https://github.com/owncast/owncast/issues/new). Si vous rencontrez des problèmes, nous serions ravis de vous aider à résoudre ces problèmes.

## Orienter votre logiciel vers Owncast

La plupart des logiciels de diffusion auront un moyen de spécifier un emplacement "personnalisé" en tant que point de terminaison RTMP. Dans ce cas, vous devriez spécifier `rtmp://yourserver/live` comme destination RTMP, en spécifiant votre clé de diffusion là où cela est demandé. La clé de diffusion par défaut est `abc123`, mais vous devriez la changer immédiatement après la configuration d'Owncast.

Si votre logiciel n'a pas d'endroit pour spécifier une clé de diffusion, vous pouvez simplement l'ajouter à votre emplacement RTMP, par exemple : `rtmp://yourserver/live/abc123`.

## La façon dont vous configurez votre logiciel de diffusion est importante

Vous voudrez configurer votre logiciel de diffusion pour correspondre à la meilleure qualité que vous pouvez offrir à vos spectateurs. **Cela signifie que si votre serveur Owncast ne peut gérer que 720p@2500k, vous ne devriez pas configurer votre logiciel de diffusion pour envoyer 1080p@6000k**. Plus vous demandez à Owncast de faire de travail de conversion, plus il utilisera de ressources sur votre serveur, rendant encore plus difficile d'offrir les meilleures qualités à vos spectateurs.

Chaque serveur, environnement, vitesse réseau et capacité de traitement est différent. Juste parce que vous _voulez_ offrir une certaine qualité ne signifie pas que votre serveur peut le supporter.

Si vous essayez d'optimiser les performances d'Owncast, essayez de régler votre logiciel de diffusion à une qualité inférieure tout en réduisant également la qualité dans votre instance Owncast.

## Paramètres de diffusion

Voici quelques paramètres suggérés pour un flux de haute qualité que vous pouvez configurer dans votre logiciel de diffusion. Mais vous devez garder à l'esprit la meilleure qualité que vous offrirez à vos spectateurs, comme indiqué ci-dessus. Continuez à lire pour en savoir plus sur les valeurs.

### Résolution vidéo et qualité

| Résolution | Fréquence d'images | Débit binaire |
| ---------- | ------------------ | ------------- |
| 1920x1080  | 60fps              | 5000k         |
| 1920x1080  | 30fps              | 4500k         |
| 1280x720   | 60fps              | 4000k         |
| 1280x720   | 30fps              | 3000k         |

### Résolution et Fréquence d'images

La résolution fait référence à la taille d'une vidéo sur un écran, et la fréquence d'images fait référence à combien d'images par seconde sont affichées. La résolution Full HD est généralement de 1080p, 60 images par seconde (fps). Diffuser à une résolution plus élevée, comme 1080p, nécessite un débit binaire plus élevé, et une fréquence d'images plus élevée nécessite plus de puissance de codage. Si vous disposez de la bande passante et de la puissance de codage à la fois sur votre ordinateur de diffusion et votre serveur Owncast pour diffuser en 1080p, 60 fps, tant mieux ! Sinon, essayez l'un des autres paramètres ci-dessus pour optimiser la qualité et la stabilité de votre vidéo.

### Débit binaire

Le débit binaire est la quantité de données que vous envoyez à votre serveur Owncast lorsque vous diffusez. Un débit binaire plus élevé utilise plus de votre bande passante Internet disponible. Augmenter votre débit binaire peut améliorer la qualité de votre vidéo, mais seulement jusqu'à un certain point.

### Intervalle de keyframe

Il est suggéré de régler le paramètre de keyframe de votre logiciel de diffusion à _2_ et **pas** à `auto`.

### Paramètres audio

Réglez votre logiciel de diffusion pour envoyer de l'audio `AAC` à Owncast.

### Débit binaire et qualité audio

Lors du streaming, assurez-vous également de faire correspondre votre qualité audio à ce que vous diffusez. Si vous êtes un stream axé sur la musique, peut-être allez-vous plus haut. Si vous ne faites que parler, alors peut-être que vous pouvez vous permettre d'aller plus bas.

Owncast ne réencode pas l'audio, donc il sera diffusé exactement tel qu'il est envoyé.

| Qualité        | Débit binaire |
| -------------- | ------------- |
| Faible         | 96kbps        |
| Moyenne        | 128kbps       |
| Élevée         | 192kbps       |
| Plus Élevée    | 256kbps       |
| La Plus Élevée | 320kbps       |

## Perte de frames

Lisez-en plus sur le dépannage des [Frames perdues](/docs/troubleshoot/dropped-frames) signalées dans votre logiciel de diffusion.

## Erreurs ou déconnexions

Si votre logiciel de diffusion continue de se déconnecter d'Owncast, ou si votre flux est interrompu en cours de route, lisez [Votre flux se déconnecte constamment](/docs/troubleshoot/stream-disconnect). Cela couvre les causes courantes : un réseau instable, un débit binaire plus élevé que ce que votre upload peut supporter, et des problèmes avec ffmpeg sur le serveur.

