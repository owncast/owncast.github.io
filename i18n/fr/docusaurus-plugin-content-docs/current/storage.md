---
title: Utilisez le stockage d'objets pour économiser de la bande passante
description: Utilisez un fournisseur de stockage externe pour distribuer votre flux vidéo Owncast.
sidebar_position: 500
sidebar_label: Utilisez le stockage d'objets pour économiser de la bande passante
---

Au lieu de diffuser des vidéos directement depuis votre serveur personnel, vous pouvez utiliser un fournisseur de stockage compatible S3 pour alléger la bande passante et les exigences de stockage ailleurs. Cela n'est pas destiné au stockage permanent d'enregistrements ou à des fins d'archivage, mais seulement pour des flux en direct.

Pour en savoir plus sur la façon dont votre bande passante peut être affectée par votre configuration vidéo et comment l'utilisation de stockage d'objets pourrait aider dans certains cas d'utilisation, visitez la page [ressources et exigences](/docs/resources-requirements/).

Si votre fournisseur de stockage est compatible avec S3, il fonctionne probablement avec Owncast. Lisez la documentation de votre fournisseur pour savoir comment configurer un bucket de stockage d'objets, activer CORS, rendre les fichiers publics et obtenir les identifiants nécessaires à fournir dans votre configuration Owncast.

## Configuration

<img src="/docs/img/admin-object-storage.png" alt="L'onglet de stockage d'objets S3 des paramètres du serveur, avec des champs pour le point de terminaison, la clé d'accès, la clé secrète, le bucket et la région" width="75%" />

1. Visitez la page de configuration de votre serveur Owncast dans l'administration et visualisez les paramètres de stockage d'objets.
2. Activez-le.
3. Visitez votre fournisseur de stockage et créez un nouveau bucket.
4. Entrez le nom du bucket, la clé d'accès, la clé secrète et le point de terminaison que l'interface de votre fournisseur de stockage d'objets vous a fournis dans les paramètres d'Owncast. Ceci doit être correct, vérifiez-les donc deux fois. Contactez le support de votre fournisseur de stockage si vous n'êtes pas sûr de ce que c'est.
5. Assurez-vous que votre bucket est accessible au public et que tout le monde peut lire les fichiers qui s'y trouvent. Certains fournisseurs de stockage peuvent définir votre bucket comme privé par défaut, vous devrez donc peut-être modifier ce paramètre.
6. Si votre fournisseur de stockage exige que vous configuriez une sorte de [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) pour que vos fichiers soient accessibles, assurez-vous de le faire. Visitez la documentation de votre fournisseur de stockage d'objets pour apprendre à configurer votre politique CORS, car elle varie selon chaque fournisseur. Il est généralement conseillé de permettre tous les origines, mais vous pouvez le restreindre à votre serveur Owncast si vous avez un besoin spécifique de le faire, et que vous ne prévoyez pas d'utiliser votre flux sur d'autres pages Web. Si votre flux ne fonctionne pas et que le journal des erreurs de la console de votre navigateur affiche des erreurs concernant `CORS` ou `Access-Control-Allow-Origin`, cela est probablement le problème. C'est souvent très courant, alors assurez-vous que votre bucket est correctement configuré.

### Paramètres optionnels

La plupart des gens n'auront pas besoin de modifier ces paramètres, mais ils sont disponibles si vous en avez besoin.

- **ACL** : Si vous êtes tenu de spécifier une option de contrôle d'accès spécifique lors du téléchargement de fichiers, vous pouvez la spécifier ici. Référez-vous à la documentation de votre fournisseur de stockage d'objets.
- **Préfixe de chemin** : Si vous souhaitez stocker vos fichiers dans un sous-répertoire au sein de votre bucket, vous pouvez le spécifier ici. Par exemple, si vous souhaitez stocker vos fichiers dans un dossier appelé `mystream`, vous devez entrer `mystream` ici. C'est uniquement utile si vous utilisez un seul bucket à des fins multiples, ou si vous avez plusieurs serveurs Owncast pointant vers le même bucket.
- **Configuration de style de chemin** : Certains fournisseurs de stockage, comme Oracle Cloud Objects, exigent que l'option de configuration "style de chemin" soit activée. Référez-vous à la documentation de votre fournisseur de stockage pour savoir si cela est requis.

