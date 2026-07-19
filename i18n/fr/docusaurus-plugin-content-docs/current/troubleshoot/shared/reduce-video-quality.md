---
title: ''
description: ''
unlisted: true
related:
  excludeFromAll: true
---

Une vidéo de qualité supérieure signifie des tailles de vidéo plus importantes qui prennent plus de temps à télécharger.

Comme cité dans le [Wiki d'OBS](https://github.com/obsproject/obs-studio/wiki/Stream-Buffering-Issues/d65033b24e4a4c81c87323f05a59c12f78de620b):

\> C'est une erreur très courante que font les nouveaux streamers. Les streamers ont tendance à utiliser autant de bitrate qu'ils ont en upload, sans tenir compte de la manière dont cela pourrait affecter leurs spectateurs. Bien sûr, nous comprenons que vous voulez que votre stream ait l'air bien. Augmenter votre bitrate est un moyen simple d'y parvenir, mais cela doit être raisonnable.
\>

> **Au final, bien que votre stream 1080p 60fps 9mb/s puisse avoir l'air glorieux, et que 3 personnes puissent le regarder sans problème, soit votre fournisseur de stream, soit le reste de vos téléspectateurs pourrait très bien avoir des problèmes.**

Réduisez le bitrate et le framerate de vos variantes de sortie vidéo dans Owncast, puis faites correspondre votre qualité la plus élevée à ce que vous envoyez dans votre logiciel de diffusion.

Plus chaque segment de vidéo est grand, plus il faut de temps pour télécharger. Donc, en général, si vous diminuez la qualité de votre vidéo (en bitrate et/ou en résolution), vous êtes susceptible de diminuer le temps nécessaire au téléchargement, réduisant donc la probabilité de mise en mémoire tampon pour votre audience.

**Lorsque vous diminuez le framerate et/ou le bitrate sur votre serveur, vous devez également diminuer ce que vous envoyez à Owncast dans votre logiciel de diffusion.** Cela aide parce que:\*\*

1. Cela diminue la quantité de trafic réseau que votre connexion Internet utilise, réduisant le risque que votre upload devienne un goulot d'étranglement lors de la diffusion.
2. Cela réduit la quantité de données qui sont ingérées dans Owncast.
3. Moins il y a de travail de conversation qui doit avoir lieu dans Owncast, plus les choses avancent rapidement.

**Inconvénient** : Réduire votre framerate et/ou votre bitrate peut diminuer de manière notable la qualité de votre stream pour certains contenus.

## Framerate

Diminuer le framerate de votre vidéo est souvent un moyen facile de réduire la mise en mémoire tampon. FPS signifie "frames per second" (images par seconde), donc si vous réduisez le framerate de votre vidéo de 60fps à 30fps, il y a littéralement deux fois moins d'images de vidéo à télécharger pour vos spectateurs, réduisant ainsi la quantité de données vidéo de moitié.

**Inconvénient** : Réduire le framerate peut visiblement diminuer la qualité de votre stream pour certains contenus.
