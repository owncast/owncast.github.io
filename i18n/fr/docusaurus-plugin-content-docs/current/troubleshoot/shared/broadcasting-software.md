---
title: ""
description: ""
unlisted: true
related:
  excludeFromAll: true
---

Assurez-vous que votre ordinateur de diffusion diffuse de la vidéo en direct de manière fiable. Si votre propre ordinateur ou connexion réseau a du mal à envoyer la vidéo sur Internet, alors les spectateurs seront bloqués dans un état de mise en mémoire tampon. Réduisez le débit binaire, la résolution et/ou la fréquence d'images dans votre logiciel de diffusion sur l'appareil de diffusion si nécessaire.

Notez les images perdues et investigatez ce qui cause ces pertes. Est-ce votre CPU ou GPU local ? Est-ce votre réseau local ? Ou est-ce le serveur Owncast qui les perd à cause de l'utilisation du matériel ?

Si, par exemple, votre [GPU sur votre ordinateur de diffusion est à pleine capacité](https://github.com/obsproject/obs-studio/wiki/GPU-overload-issues), alors il ne peut pas suivre le rendu des images. Si vous utilisez OBS, un moyen de déterminer cela est de regarder les "Statistiques" dans l'application et de voir si vous rencontrez des "Retards de rendu".
