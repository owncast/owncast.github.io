---
title: Informations de connexion par défaut
description: Instructions pour se connecter à l'interface admin d'Owncast et les identifiants par défaut.
unlisted: true
related:
  excludeFromAll: true
---

L'interface admin peut être trouvée en naviguant à `/admin` sur votre serveur Owncast (par exemple, `https://owncast.example.com/admin`).

[Configurer votre logiciel de diffusion](/docs/broadcasting) pour diffuser sur votre serveur Owncast nécessite d'utiliser l'endpoint `/live` tout en fournissant la clé de stream. (par exemple, `rtmp://owncast.example.com/live` avec la clé de stream `abc123`). Si votre logiciel ne permet pas de spécifier la clé de stream séparément, vous devrez peut-être l'ajouter à l'URL comme `rtmp://owncast.example.com/live/abc123`.

## Identifiants par défaut

| Par défaut              | Valeur |
| ----------------------- | ------ |
| Nom d'utilisateur admin | admin  |
| Mot de passe admin      | abc123 |
| Clé de stream           | abc123 |

Ce sont les identifiants par défaut pour se connecter à l'interface admin d'Owncast et diffuser sur votre serveur Owncast. Il est fortement recommandé de changer ces valeurs immédiatement après votre première connexion pour assurer la sécurité de votre serveur.

## Étapes suivantes

1. Dirigez votre logiciel de diffusion vers votre nouveau serveur en utilisant `rtmp://yourserver/live` avec votre clé de stream. Si votre logiciel n'a pas de moyen de spécifier une clé de stream, utilisez l'url `rtmp://yourserver/live/streamkey` et utilisez votre clé de stream à la place.
2. Accédez à votre serveur dans votre navigateur web en visitant `http://yourserver:8080`.
3. Vous pouvez visiter le tableau de bord Admin à `http://yourserver:8080/admin` où vous pouvez vérifier les statistiques des visiteurs et du serveur, changer votre clé de stream, personnaliser le contenu affiché sur votre page, et plus encore. Pour vous connecter, utilisez le nom d'utilisateur `admin` et votre mot de passe admin (`abc123` par défaut).

**Remarque :** Votre clé de stream et votre mot de passe admin par défaut sont tous deux `abc123`, mais ce sont des paramètres séparés. La clé de stream est uniquement utilisée par votre logiciel de diffusion pour publier la vidéo. Ce n'est pas votre mot de passe admin.
