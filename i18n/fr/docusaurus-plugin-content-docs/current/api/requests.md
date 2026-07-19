---
title: Envoyer des requêtes à l'API Owncast
description: Utilisez un jeton d'accès pour envoyer des messages de chat, définir le titre du flux et effectuer d'autres actions via l'API Owncast.
sidebar_position: 48
sidebar_label: Envoyer des requêtes
---

Nous supportons actuellement les actions suivantes que vous pouvez effectuer via des requêtes depuis votre code.

| Événement                      |                                                                      Point de terminaison                                                                      |                     Portée |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------: | -------------------------: |
| Message de chat système        |                     <a href="/api/release">/api/integrations/chat/system</a>                     | `CAN_SEND_SYSTEM_MESSAGES` |
| Message de chat standard       |                       <a href="/api/release">/api/integrations/chat/send</a>                       |        `CAN_SEND_MESSAGES` |
| Action de chat                 |                     <a href="/api/release">/api/integrations/chat/action</a>                     | `CAN_SEND_SYSTEM_MESSAGES` |
| Supprimer le message de chat   |          <a href="/api/release">/api/integrations/chat/messagevisibility</a>          |         `HAS_ADMIN_ACCESS` |
| Obtenir l'historique des chats |                             <a href="/api/release">/api/integrations/chat</a>                             |         `HAS_ADMIN_ACCESS` |
| Obtenir les clients connectés  |                          <a href="/api/release">/api/integrations/clients</a>                          |         `HAS_ADMIN_ACCESS` |
| Définir le titre du flux       |                      <a href="/api/release">/api/integrations/streamtitle</a>                     |         `HAS_ADMIN_ACCESS` |
| message système au client      | <a href="/api/release">/api/integrations/chat/system/client/`{clientId}`</a> | `CAN_SEND_SYSTEM_MESSAGES` |

Visitez la documentation de l'API pour chaque point de terminaison afin d'en savoir plus sur les valeurs attendues ou qui seront retournées.

Votre serveur Owncast n'acceptera que les actions des requêtes avec un jeton d'accès valide. Suivez les étapes ci-dessous pour créer un jeton d'accès.

1. visitez `/admin/access-tokens` sur votre serveur Owncast.
2. Cliquez sur `Créer un jeton d'accès`.
3. Sélectionnez la portée des autorisations que vous souhaitez donner à ce jeton.
4. Enregistrez ce jeton d'accès.

### Votre code

Envoyez un `POST` authentifié avec votre jeton d'accès dans l'en-tête `Authorization` et un corps JSON. Par exemple, pour envoyer un message de chat système :

```js
const res = await fetch("https://your.owncast.server/api/integrations/chat/system", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + YOUR_ACCESS_TOKEN,
  },
  body: JSON.stringify({ body: "c'est un message de chat système" }),
});

const result = await res.json();
// { "success": true, "message": "sent" }
```

### Tester l'envoi de messages de chat

Changez la commande `curl` suivante pour pointer vers l'URL de votre serveur et utilisez votre jeton d'authentification avec accès "message système". Cela enverra un message système à votre chat.

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOURAUTHTOKEN" \
  -d '{"body": "Je suis un message système!"}' \
  https://your.owncast.server/api/integrations/chat/system
```

Une requête réussie retourne `200` avec un corps JSON :

```json
{ "success": true, "message": "sent" }
```

## Portées

Chaque jeton d'accès se voit attribuer une ou plusieurs portées qui contrôlent ce qu'il peut faire. Les points de terminaison ci-dessus listent la portée requise pour chacun d'eux.

| Portée                     | Accorde                                                                                                                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `CAN_SEND_MESSAGES`        | Envoyez des messages de chat standard en tant qu'utilisateur du jeton.                                                                                               |
| `CAN_SEND_SYSTEM_MESSAGES` | Envoyez des messages de chat en tant que système et envoyez des actions de chat.                                                                                     |
| `HAS_ADMIN_ACCESS`         | Actions administratives : lire l'historique des chats, lister les clients connectés, définir le titre du flux et changer la visibilité des messages. |

## Réponses et erreurs

| Statut | Signification                                                                                                                                                  |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `200`  | La requête a réussi. Le corps JSON a `success: true` et un court `message`.                                                    |
| `400`  | Le corps de la requête était mal formé. Le corps JSON a `success: false` et un `message`.                                      |
| `401`  | Le jeton d'accès est manquant, invalide, ou n'a pas la portée requise par le point de terminaison. Le corps est du texte brut. |
| `500`  | Le serveur a rencontré une erreur lors du traitement de la requête.                                                                            |

Owncast ne retourne pas un `403` séparé pour une portée insuffisante. Un jeton sans la portée requise est rejeté avec `401`, de la même manière qu'un jeton manquant ou invalide.
