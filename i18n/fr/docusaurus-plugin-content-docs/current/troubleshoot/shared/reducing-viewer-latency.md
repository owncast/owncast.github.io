---
title: ''
description: ''
unlisted: true
related:
  excludeFromAll: true
---

Essayez de diminuer le niveau de votre tampon de latence dans l'administration. Cela maintiendra l'utilisateur plus proche du direct, mais donnera au client moins de segments jouables, ce qui risque de **réduire la résilience aux erreurs** et aux problèmes de vitesse réseau. Si vous avez une machine capable de traiter la vidéo rapidement, vous pourrez descendre à seulement quelques secondes de latence, mais avec peu de marge d'erreur.

C'est à vous de décider si vous préférez des délais plus courts avec **moins de fiabilité** ou un flux plus fiable avec un délai supplémentaire.

## Avertissement pour le Passthrough Vidéo

Si vous utilisez le **Passthrough Vidéo** dans votre configuration vidéo, cela risque de **augmenter** votre latence. Parce que vous indiquez à Owncast de ne pas réencoder votre vidéo, il ne peut pas segmenter votre vidéo de manière optimale dans les morceaux de taille requise pour gérer votre latence. Si vous souhaitez vraiment optimiser la latence, vous devez absolument désactiver le Passthrough.

## Inconvénients

### Demandes réseau

Une latence plus faible se traduit par plus de segments vidéo plus petits à servir à vos spectateurs. Cela se traduit par plus de demandes web. Pas nécessairement plus de bande passante utilisée, mais simplement plus de demandes devant être servies par votre serveur.

### Tolérance d'erreur

Comme chaque segment de vidéo est plus petit, la tolérance à l'erreur en cas de coupures réseau, ou de demandes réseau rares échouant, se traduira par un mise en mémoire tampon pour le spectateur. Avec une latence plus grande, cela donne au spectateur plus de vidéos jouables en file d'attente pendant que la demande réseau est réessayée ou peut se rétablir.

### Considérations

Si vous êtes dans un scénario où vous payez pour un stockage d'objets ou un CDN où le nombre de demandes impacte votre facture, vous voudrez peut-être considérer les compromis entre une latence plus faible ou changer votre configuration d'infrastructure.
