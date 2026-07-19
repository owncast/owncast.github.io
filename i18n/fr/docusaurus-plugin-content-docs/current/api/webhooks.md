---
title: Webhooks
description: Apprenez à configurer et à utiliser des webhooks pour être informé des événements sur votre serveur Owncast.
sidebar_position: 48
tags:
  - webhooks
  - intégration
  - api
  - événements
  - notifications
  - personnalisation
---

Owncast prend en charge les Webhooks HTTP pour notifier les applications tierces (comme les chatbots) des événements sur le flux. En d'autres termes : les Webhooks enverront des événements à votre code lorsque des choses se produisent sur votre serveur Owncast.

Ce qui suit est une liste des événements pour lesquels vous pouvez être informé.

| Type d'événement                                                                                      | le webhook se déclenche quand ...                                             |
| :---------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| [CHAT](#chat)                                                                                         | un utilisateur envoie un message de chat                                                                                      |
| [NAME_CHANGE](#name_change)                                                      | un utilisateur change son nom d'utilisateur                                                                                   |
| [USER_JOINED](#user_joined)                                                      | un utilisateur rejoint le chat                                                                                                |
| [USER_PARTED](#user_parted)                                                      | la dernière connexion active d'un utilisateur se déconnecte                                                                   |
| [STREAM_STARTED](#stream_started)                                                | un flux RTMP entrant est détecté                                                                                              |
| [STREAM_STOPPED](#stream_stopped)                                                | un flux RTMP entrant se déconnecte (par exemple, OBS s'arrête)                                             |
| [STREAM_TITLE_UPDATED](#stream_title_updated)               | le titre du flux est mis à jour                                                                                               |
| [VISIBILITY-UPDATE](#visibility-update)                                                               | un message de chat précédemment envoyé devient visible/invisible (défini par un administrateur/modérateur) |
| [FEDIVERSE_ENGAGEMENT_FOLLOW](#fediverse_engagement_follow) | un utilisateur du Fediverse suit votre serveur                                                                                |

### Comment accepter les webhooks

1. Visitez `/admin/webhooks` sur votre serveur owncast.
2. Cliquez sur `Créer un Webhook`.
3. Indiquez l'URL publique complète d'un point de terminaison capable de recevoir ce webhook.
4. Sélectionnez les événements pour lesquels vous souhaitez être informé.
5. Enregistrez ce nouveau webhook.

### Votre code

1. Dans n'importe quel langage, sur n'importe quel type de serveur web, créez un point de terminaison qui accepte une requête HTTP `POST`. C'est ici qu'Owncast enverra les événements.
2. Chaque charge utile d'événement aura une propriété `type` qui indique de quel type d'événement il s'agit, et un objet `eventData` qui inclut des propriétés spécifiques à cet événement.

### Vérification des requêtes de webhook

Owncast ne signe ni n'authentifie les requêtes de webhook. Il n'y a pas de secret partagé ni d'en-tête de signature, donc votre point de terminaison ne peut pas confirmer cryptographiquement qu'une requête provient de votre serveur Owncast. Traitez le point de terminaison comme quelque chose que n'importe qui pourrait appeler, et ne le connectez pas directement à des actions que vous ne voudriez pas qu'un appelant non authentifié déclenche.

Si vous voulez une protection de base, mettez un jeton difficile à deviner dans l'URL de webhook que vous enregistrez (par exemple `https://example.com/owncast-hook/9f3c...`) et rejetez toute demande qui arrive sans lui.

### Webhooks de haut niveau

Les webhooks utilisent la méthode `HTTP POST` pour pousser des données vers un point de terminaison. Le corps de la requête du webhook est du `JSON` brut.
Ainsi, l'en-tête ContentType pour la requête est `application/json`. Chaque corps de webhook suit une structure JSON simple.

```json
{
  "type": "",
  "eventData": {}
}
```

où

- **type** donne des informations sur quel type d'événement il s'agit (l'un des types dans le tableau ci-dessus).
- **eventData** donne plus d'informations sur l'événement. La structure de `eventData` est différente pour chaque `type`.

Des exemples de ce à quoi s'attendre pour chaque type d'événement se trouvent ci-dessous.

## Exemples de webhook

#### CHAT

```json
{
  "type": "CHAT",
  "eventData": {
    "user": {
      "id": "qSRQpeM7R",
      "displayName": "lazyDaisy",
      "displayColor": 182,
      "createdAt": "2021-08-12T07:51:37.470812684Z",
      "previousNames": ["lazyDaisy"],
      "nameChangedAt": "2022-09-19T12:33:59.42313245+02:00",
      "isBot": false,
      "authenticated": false
    },
    "clientId": 2,
    "body": "hello world \u003cimg class=\"emoji\" alt=\":beerparrot:\" title=\":beerparrot:\" src=\"/img/emoji/beerparrot.gif\"\u003e",
    "rawBody": "hello world \u003cimg class=\"emoji\" alt=\":beerparrot:\" title=\":beerparrot:\" src=\"/img/emoji/beerparrot.gif\"\u003e",
    "id": "j-rXteG7R",
    "visible": true,
    "timestamp": "2021-08-12T07:53:12.061982913Z"
  }
}
```

Note : le champ `user` dans le chat a été introduit avec `v0.0.8`. Avant `v0.0.8`, un simple champ chaîne avec le nom `author` était utilisé.

#### NAME_CHANGE

```json
{
  "type": "NAME_CHANGE",
  "eventData": {
    "type": "NAME_CHANGE",
    "id": "",
    "timestamp": "0001-01-01T00:00:00Z",
    "user": {
      "id": "qSRQpeM7R",
      "displayName": "NotSoLazyDaisy",
      "displayColor": 182,
      "createdAt": "2021-08-12T07:51:37.470812684Z",
      "previousNames": ["lazyDaisy"],
      "nameChangedAt": "2022-09-19T12:33:59.423278816+02:00",
      "isBot": false,
      "authenticated": false
    },
    "clientId": 2,
    "newName": "NotSoLazyDaisy"
  }
}
```

#### USER_JOINED

```json
{
  "type": "USER_JOINED",
  "eventData": {
    "id": "wAgcTeM7g",
    "timestamp": "2021-08-12T08:19:28.921355401Z",
    "user": {
      "id": "yFgco6M7R",
      "displayName": "laughing-cray",
      "displayColor": 257,
      "createdAt": "2021-08-12T08:19:28.759651178Z",
      "previousNames": ["laughing-cray"],
      "nameChangedAt": "0001-01-01T00:00:00Z",
      "isBot": false,
      "authenticated": false
    },
    "clientId": 2
  }
}
```

#### USER_PARTED

`USER_PARTED` est envoyé 10 secondes après la dernière connexion active d'un utilisateur se déconnecte. Si l'utilisateur se reconnecte pendant ce temps, l'événement est annulé. Désactiver les messages de bienvenue visibles pour les joins et les départs cache uniquement le message dans le chat ; le webhook est toujours envoyé.

```json
{
  "type": "USER_PARTED",
  "eventData": {
    "id": "Ws4gTeM7R",
    "timestamp": "2021-08-12T08:20:01.061982913Z",
    "user": {
      "id": "yFgco6M7R",
      "displayName": "laughing-cray",
      "displayColor": 257,
      "createdAt": "2021-08-12T08:19:28.759651178Z",
      "previousNames": ["laughing-cray"],
      "nameChangedAt": "0001-01-01T00:00:00Z",
      "isBot": false,
      "authenticated": false
    }
  }
}
```

#### STREAM_STARTED

```json
{
  "type": "STREAM_STARTED",
  "eventData": {
    "id": "WtokptnVR",
    "name": "Owncast",
    "streamTitle": "",
    "summary": "Bienvenue sur votre nouveau serveur Owncast ! Cette description peut être modifiée dans l'administrateur. Visitez https://owncast.online/docs/configuration/ pour en savoir plus.",
    "timestamp": "2022-09-19T12:30:26.97907142+02:00"
  }
}
```

#### STREAM_STOPPED

```json
{
  "type": "STREAM_STOPPED",
  "eventData": {
    "id": "YP-aptn4g",
    "name": "Owncast",
    "streamTitle": "",
    "summary": "Bienvenue sur votre nouveau serveur Owncast ! Cette description peut être modifiée dans l'administrateur. Visitez https://owncast.online/docs/configuration/ pour en savoir plus.",
    "timestamp": "2022-09-19T12:40:21.205872269+02:00"
  }
}
```

#### STREAM_TITLE_UPDATED

```json
{
  "type": "STREAM_TITLE_UPDATED",
  "eventData": {
    "id": "DmeikEf4Rz",
    "name": "Nouveau serveur Owncast",
    "status": {
      "lastConnectTime": null,
      "lastDisconnectTime": "2024-10-24T22:35:05Z",
      "versionNumber": "0.1.3",
      "streamTitle": "Changement de titre de flux de test",
      "viewerCount": 0,
      "overallMaxViewerCount": 7,
      "sessionMaxViewerCount": 2,
      "online": false
    },
    "streamTitle": "Changement de titre de flux de test",
    "summary": "Ceci est un nouveau serveur de streaming vidéo en direct alimenté par Owncast.",
    "timestamp": "2023-03-27T21:50:10.121391094-07:00"
  }
}
```

#### VISIBILITY-UPDATE

```json
{
  "type": "VISIBILITY-UPDATE",
  "eventData": {
    "id": "zqGupt7VR",
    "MessageIDs": ["-Zzltt74g", "rvd2ppn4g"],
    "timestamp": "2022-09-19T12:44:28.225779601+02:00",
    "Visible": false
  }
}
```

- `MessageIDs` est une liste d'IDs de messages dont la visibilité a été modifiée.

#### FEDIVERSE_ENGAGEMENT_FOLLOW

```json
{
  "eventData": {
    "timestamp": "2026-04-13T19:17:12.528099886Z",
    "id": "AqilY4hDR",
    "name": "Test Follower",
    "username": "testfollower@fake-mastodon.example.com",
    "image": "https://fake-mastodon.example.com/avatars/testfollower.png"
  },
  "type": "FEDIVERSE_ENGAGEMENT_FOLLOW"
}
```

- `eventData.id` est un ID d'événement webhook généré par Owncast. Ce n'est pas l'ID d'acteur Fediverse ou l'ID de demande de suivi.
- `eventData.name` est le nom affiché du follower.
- `eventData.username` est le handle complet `user@domain`.
- `eventData.image` est l'URL de l'avatar du follower.

### clientId vs. user.id

Lorsqu'un utilisateur est connecté depuis plusieurs appareils (ou plusieurs navigateurs) en même temps avec le même nom d'utilisateur, Owncast différencie ses sessions avec un `clientId`. Les utilisateurs peuvent avoir plusieurs clientIds - un seul clientId représente une seule connexion à Owncast.

`clientId` est un numéro, tandis que `user.id` peut contenir des caractères majuscules, minuscules et numériques.

### Tester les webhooks dans un environnement de développement local

1. Démarrez Owncast localement (par exemple via docker).
2. Visitez `localhost:8080/admin`, authentifiez-vous avec le nom d'utilisateur : `admin` et la clé de streaming par défaut : `abc123`.
3. Accédez au bloc de menu "Intégration" sur le côté gauche, cliquez sur "Webhooks", puis sur "Créer un Webhook".
4. Définissez l'adresse de webhook pour pointer vers votre application/intégration (quelque chose comme : `http://localhost:8100/webhooks/incoming`).
5. Sélectionnez les types d'événements que vous souhaitez recevoir.
6. Appuyez sur "OK" pour enregistrer le webhook.
7. Démarrez votre intégration/application à l'écoute sur l'adresse configurée précédemment.
   1. En option, démarrez un proxy d'interception (par exemple Burp) si vous souhaitez inspecter les messages HTTP au préalable.
8. Déclenchez vous-même des événements (par exemple, écrivez un message dans le chat, connectez/déconnectez votre logiciel de streaming à Owncast).

### Tester les webhooks avant d'écrire du code

Si vous souhaitez tester comment fonctionnent les webhooks avant d'écrire du code, créez un point de terminaison de test sur [RequestCatcher](https://requestcatcher.com/), et ajoutez l'URL qu'il vous donne en tant que webhook dans votre administration et voyez les requêtes passer.

### Tester les webhooks depuis une instance de production d'Owncast

Si vous avez déjà une instance d'Owncast fonctionnant en production, écoutant le web, vous voudrez peut-être utiliser [ngrok](https://ngrok.com/) pour acheminer les requêtes HTTP vers votre environnement de développement local.
