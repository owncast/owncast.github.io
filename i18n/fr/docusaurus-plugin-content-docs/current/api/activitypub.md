---
title: ActivityPub & Le protocole Fediverse
description: Une référence au niveau du protocole pour les activités ActivityPub qu'Owncast envoie et reçoit, afin que vous puissiez construire une application Fediverse qui interopère avec les serveurs Owncast.
sidebar_position: 50
sidebar_label: protocole ActivityPub
toc_min_heading_level: 2
toc_max_heading_level: 3
tags:
  - activitypub
  - fédération
  - fediverse
  - protocole
  - mastodon
  - intégration
  - nodeinfo
  - webfinger
---

# ActivityPub & Le protocole Fediverse

Cette page documente l'implémentation de [ActivityPub](https://www.w3.org/TR/activitypub/) dans Owncast au niveau du protocole : quelles activités un serveur **envoie**, lesquelles il **reçoit**, comment il s'identifie, et comment il signe et vérifie les requêtes. Elle s'adresse aux développeurs qui souhaitent construire une application Fediverse qui interopère avec Owncast, que cela signifie suivre un serveur Owncast depuis une autre plateforme, consommer ses notifications en direct, ou créer des outils qui comprennent les extensions personnalisées d'Owncast.

Si vous êtes un opérateur Owncast et que vous souhaitez simplement activer la fédération, consultez [Le Fediverse](/social/the-fediverse) et [Activation des fonctionnalités sociales](/social#enabling-social-features) à la place. Cette page suppose une familiarité avec ActivityPub, ActivityStreams 2.0, JSON-LD et les signatures HTTP.

## Modèle mental

Un serveur Owncast fédère comme un **acteur unique** de type `Service`. Il y a un compte par serveur (nom d'utilisateur par défaut `live`), et cela représente le stream lui-même plutôt qu'une personne. Comparé à un serveur social généraliste, le modèle est intentionnellement étroit :

- L'acteur **envoie** des publications à ses abonnés (le plus important, une notification "en direct") et un "ping" de stream périodique.
- L'acteur **reçoit** des suivis, des likes, des boosts (annonces), et une poignée d'activités serveur à serveur, mais il ne **reste pas** des publications ou des réponses (`Create` est intentionnellement rejeté).
- Il y a exactement un utilisateur, pas d'enregistrement ouvert, et la collection `following` est toujours vide.

Tous les points de terminaison de la fédération renvoient `405 Method Not Allowed` lorsque la fédération est désactivée, donc vérifiez cela d'abord si un serveur semble injoignable.

## Découverte

Une application distante localise et décrit un acteur Owncast à travers les mécanismes de découverte bien connus standard.

### WebFinger

```
GET /.well-known/webfinger?resource=acct:{username}@{host}
```

Le `resource` doit être une URI `acct:` dont l'hôte correspond à l'hôte configuré du serveur (sinon, la demande est rejetée avec `501`/`400`). La réponse est servie en tant que `application/jrd+json` :

```json
{
  "subject": "acct:live@owncast.example.com",
  "aliases": ["https://owncast.example.com/federation/user/live"],
  "links": [
    {
      "rel": "self",
      "type": "application/activity+json",
      "href": "https://owncast.example.com/federation/user/live"
    },
    {
      "rel": "http://webfinger.net/rel/profile-page",
      "type": "text/html",
      "href": "https://owncast.example.com/federation/user/live"
    },
    {
      "rel": "http://webfinger.net/rel/avatar",
      "type": "image/png",
      "href": "https://owncast.example.com/logo/external"
    },
    {
      "rel": "alternate",
      "type": "application/x-mpegURL",
      "href": "https://owncast.example.com/hls/stream.m3u8"
    }
  ]
}
```

Le lien `self` est l'IRI de l'acteur canonique. Notez le lien `alternate` spécifique à Owncast de type `application/x-mpegURL` : il pointe directement vers la liste de lecture HLS pour le stream, permettant aux clients de découvrir la vidéo en direct sans explorer l'interface utilisateur web.

### host-meta

```
GET /.well-known/host-meta
```

Renvoie un document XRD pointant vers le point de terminaison WebFinger, pour les clients qui initialisent depuis host-meta :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0">
  <Link rel="lrdd" type="application/json"
        template="https://owncast.example.com/.well-known/webfinger?resource={uri}"/>
</XRD>
```

### NodeInfo

Owncast expose les métadonnées au niveau du serveur à travers [NodeInfo](https://nodeinfo.diaspora.software/) afin que les robots d'exploration, les annuaires et les sites de statistiques du Fediverse puissent décrire l'instance.

**Découverte NodeInfo** — `GET /.well-known/nodeinfo` :

```json
{
  "links": [
    {
      "rel": "http://nodeinfo.diaspora.software/ns/schema/2.0",
      "href": "https://owncast.example.com/nodeinfo/2.0"
    }
  ]
}
```

**NodeInfo 2.0** — `GET /nodeinfo/2.0` :

```json
{
  "version": "2.0",
  "software": {
    "name": "owncast",
    "version": "0.2.x"
  },
  "protocols": ["activitypub"],
  "services": {
    "inbound": [],
    "outbound": []
  },
  "usage": {
    "users": {
      "total": 1,
      "activeMonth": 1,
      "activeHalfyear": 1
    },
    "localPosts": 42
  },
  "openRegistrations": false,
  "metadata": {
    "chat_enabled": true,
    "federation": {
      "username": "live",
      "featured_streams": 1
    }
  }
}
```

La plupart de cela est le NodeInfo standard, avec quelques signaux spécifiques à Owncast qui valent la peine d'être notés :

- **`software.name`** est toujours `owncast`. C'est le moyen le plus fiable de détecter que vous parlez à un serveur Owncast.
- **`usage.users.total`** est toujours `1` et **`openRegistrations`** est toujours `faux` — une instance Owncast est un serveur à acteur unique, pas une communauté multi-utilisateurs.
- **`usage.localPosts`** est le nombre d'activités que le serveur a envoyées (notifications de mise en service et autres messages publics), ce qui est un proxy utile pour évaluer l'activité du stream.
- **`metadata.chat_enabled`** reflète si le chat intégré d'Owncast est activé.
- **`metadata.federation`** est le bloc spécifique à Owncast :
  - **`username`** est le nom d'utilisateur préféré de l'acteur (défaut `live`). Combiné avec l'hôte, cela vous donne le handle `acct:` sans un tour de WebFinger séparé.
  - **`featured_streams`** indique la participation au flux de streams en vedette / mini-annuaire (voir [Ping de streams](#offer--stream-ping-outbound) ci-dessous). Une valeur de `1` signifie que le serveur annonce son statut en direct aux abonnés via des activités `Offer` périodiques.

**x-nodeinfo2** — `GET /.well-known/x-nodeinfo2` fournit les mêmes informations dans la forme alternative [x-nodeinfo2](https://github.com/jaywink/xnodeinfo2) utilisée par certains annuaires, y compris un bloc `organization` (`name`, `contact`) et un chiffre d'utilisateur `activeWeek`. Ici `services.inbound`/`services.outbound` sont tous deux `["activitypub"]`.

**API d'instance Mastodon** — `GET /api/v1/instance` renvoie une description d'instance compatible Mastodon (`uri`, `title`, `short_description`, `description`, `version`, `thumbnail`, `stats`, et flags d'enregistrement) afin que les outils compatibles Mastodon puissent rendre une carte d'instance familière. `stats.user_count` est `1`, `stats.status_count` est le nombre de publications locales, et les enregistrements / approbations / invitations sont tous désactivés.

## L'acteur

```
GET /federation/user/{username}
Accept: application/activity+json
```

Demander l'IRI d'acteur avec un en-tête `Accept` ActivityStreams renvoie le document de l'acteur. Owncast se représente comme un **`Service`** (pas une `Person`). La structure est :

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    "https://w3id.org/security/v1"
  ],
  "type": "Service",
  "id": "https://owncast.example.com/federation/user/live",
  "preferredUsername": "live",
  "name": "Mon serveur Owncast",
  "summary": "Description du serveur / bio",
  "url": "https://owncast.example.com/federation/user/live",
  "published": "2023-01-01T00:00:00Z",
  "manuallyApprovesFollowers": false,
  "discoverable": true,
  "inbox": "https://owncast.example.com/federation/user/live/inbox",
  "outbox": "https://owncast.example.com/federation/user/live/outbox",
  "followers": "https://owncast.example.com/federation/user/live/followers",
  "icon": {
    "type": "Image",
    "mediaType": "image/png",
    "url": "https://owncast.example.com/logo/external?uc=..."
  },
  "image": {
    "type": "Image",
    "url": "https://owncast.example.com/logo/external?uc=..."
  },
  "tag": [
    {
      "type": "Hashtag",
      "name": "#owncast",
      "href": "https://owncast.directory/tags/owncast"
    }
  ],
  "attachment": [
    {
      "type": "PropertyValue",
      "name": "Website",
      "value": "<a href=\"...\">...</a>"
    }
  ],
  "publicKey": {
    "id": "https://owncast.example.com/federation/user/live#main-key",
    "owner": "https://owncast.example.com/federation/user/live",
    "publicKeyPem": "-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----"
  }
}
```

Points clés pour une implémentation interopérable :

- **La mise en page de l'IRI de l'acteur** est `{server}/federation/user/{username}`, et les collections en dépendent : `{actor}/inbox`, `{actor}/outbox`, `{actor}/followers`.
- **`following`** est demandé à `{actor}/following` mais renvoie toujours `404` — Owncast n'expose jamais une liste de suivi.
- **`manuallyApprovesFollowers`** reflète si le serveur est en mode de fédération _privé_. Lorsque cela est vrai, les suivis ne sont pas acceptés automatiquement.
- **`discoverable`** est toujours `true` (en utilisant les sémantiques du namespace `toot:`).
- La **clef publique** se trouve à `{actor}#main-key`, est une clef RSA-2048 en forme PEM (PKIX), et c'est celle que vous utilisez pour vérifier les signatures HTTP du serveur.

## Signatures HTTP

Owncast signe à la fois ses requêtes sortantes et vérifie celles entrantes en utilisant le schéma d'en-tête HTTP "Signature" ([draft-cavage HTTP signatures](https://datatracker.ietf.org/doc/html/draft-cavage-http-signatures), utilisé dans tout le Fediverse).

### Vérifier les requêtes qu'Owncast vous envoie

Lorsque Owncast POSTe une activité dans votre inbox, elle inclut :

- Un en-tête `Signature` avec `keyId="{actor}#main-key"`, `algorithm="rsa-sha256"`, et la liste des `headers` signés.
- Les en-têtes signés couvrent `(request-target)`, `host`, `date`, et `digest`.
- Un en-tête `Digest` contenant le digest SHA-256 du corps de la requête.
- `Content-Type: application/activity+json` et un `User-Agent` du type `{version}; https://owncast.online`.

Pour vérifier : récupérez l'acteur à `keyId`, lisez `publicKey.publicKeyPem`, et vérifiez à la fois la signature et le digest du corps.

### Signer les requêtes que vous envoyez à Owncast

Owncast vérifie la signature sur chaque activité livrée à sa boîte de réception :

1. Il analyse `keyId` et `algorithm` depuis votre en-tête `Signature`. Le `keyId` **doit** être une URL `https://`.
2. Il résout votre acteur et récupère votre clef publique.
3. Il vérifie que le domaine de votre clef n'est **pas** sur la liste des domaines bloqués de l'instance et que l'acteur lui-même n'est pas bloqué.
4. Il vérifie la signature, essayant l'algorithme stipulé puis revenant à `rsa-sha256` et `rsa-sha512`.
5. Il vérifie l'en-tête `Digest` par rapport au corps de la requête.

Dans la pratique, cela signifie : signer `(request-target) host date digest` avec une clef RSA, publier cette clef dans le champ `publicKey` de votre acteur, inclure un `Digest` SHA-256, et servir votre acteur via HTTPS.

## Activités qu'Owncast envoie (sorties)

Toutes les activités sortantes proviennent de l'acteur du serveur et sont livrées aux inboxs des abonnés (préférant `sharedInbox` où un abonné en fait la publicité). Les activités publiques sont adressées à `https://www.w3.org/ns/activitystreams#Public` dans `to` avec la collection des abonnés dans `cc` ; en mode privé, elles ne sont adressées qu'à la collection des abonnés.

| Activité | Objet            | Quand                                                                                                 | Envoyé à                              |
| -------- | ---------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `Create` | `Note`           | Le stream devient en direct (le message "go live") ; autres publications publiques | Abonnés (+ Public) |
| `Update` | `Service`        | Le profil du serveur (nom, avatar, résumé, etc.) changements       | Abonnés                               |
| `Follow` | iri de l'acteur  | Un opérateur suit un autre serveur Owncast (flux de streams en vedette)            | Le serveur cible                      |
| `Offer`  | url du serveur   | Périodiquement pendant le direct, en tant que "ping" de stream                                        | Abonnés d'annuaire                    |
| `Accept` | inbound `Follow` | En réponse à un `Follow` reçu                                                                         | L'abonné                              |
| `Reject` | inbound `Follow` | Lorsque l'opérateur retire un annuaire qui répertoriait ce serveur                                    | Cet annuaire                          |

### Create / Note — going live

L'activité la plus importante. Lorsque le stream devient en direct, Owncast envoie un `Create` enveloppant un `Note`. Le `Note` contient du HTML `content` (le message de mise en service configurable, titre du stream, liens des hashtags, et un lien vers le serveur), des tags `Hashtag`, et — si disponible — une pièce jointe `Image` avec l'aperçu du stream (`preview.gif` ou `thumbnail.jpg`). Si le serveur est marqué NSFW, la note porte `sensitive: true`. Les hashtags lient à `https://owncast.directory/tags/{tag}`, et un hashtag `#owncast` est toujours ajouté.

C'est l'activité qui intéresse le plus les consommateurs : abonnez-vous en suivant l'acteur, puis surveillez l'inbox pour des activités `Create`/`Note` pour savoir quand un stream commence.

### Offer / ping de stream (sortie)

C'est une extension Owncast qui supporte la fonctionnalité **streams en vedette / mini-annuaire**. Pendant le direct, le serveur envoie périodiquement une activité `Offer` dont l'`object` est l'url du serveur, portant [les métadonnées personnalisées d'Owncast](#owncast-custom-namespace) (état du stream, titre, description, nom du serveur, logo, tags). Cela permet à un annuaire récepteur de garder sa liste de streams en direct fraîche sans polling. Le signal offline correspondant est l'activité inbound [`Leave`](#server-to-server-activities). Owncast envoie `Offer` et `Leave` uniquement aux abonnés qui se sont identifiés comme un annuaire (voir [le namespace personnalisé](#owncast-custom-namespace)), jamais aux abonnés ordinaires.

### Mise à jour, Suivre, Accepter

- **`Update`** de l'acteur `Service` est envoyé aux abonnés lorsque les métadonnées du profil du serveur changent, afin que les caches distants se rafraîchissent.
- **`Follow`** est envoyé lorsqu'un opérateur suit un autre serveur Owncast. Le serveur s'attend alors à un `Accept` (ou `Reject`) en retour.
- **`Accepter`** est envoyé automatiquement en réponse à un `Suivre` entrant lorsque le serveur est en mode public (approbation automatique).

## Activités reçues par Owncast (entrant)

Livrez-les en POSTant une activité signée dans la `boîte de réception` de l'acteur. Owncast met en file d'attente, vérifie la signature et dispatch chacune.

| Activité                               | Gestion                                                                                                                                                                                                                                                                                                                                                                                                                 |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Suivre`                               | Stocke le suiveur; approuve automatiquement et retourne `Accepter` en mode public (mis en attente pour approbation en mode privé). Un suivi portant le marqueur `ns#directory` est toujours mis en attente pour approbation manuelle, peu importe le mode, et n'émet pas l'événement de suivi. Sinon, émet un événement `FediverseEngagementFollow`. |
| `Annuler` → `Suivre`                   | Supprime le suiveur.                                                                                                                                                                                                                                                                                                                                                                                    |
| `Aimer`                                | Enregistre un engagement contre un objet local. Émet `FediverseEngagementLike`.                                                                                                                                                                                                                                                                                                         |
| `Annoncer`                             | Boost/reposter un objet local. Enregistre un engagement et émet `FediverseEngagementRepost`.                                                                                                                                                                                                                                                                                            |
| `Accepter` → `Suivre`                  | Marque un serveur Owncast distant que nous avons suivi comme ayant accepté (flux de streams en vedette).                                                                                                                                                                                                                                                                             |
| `Rejeter` → `Suivre`                   | Marque notre suivi d'un serveur distant comme rejeté.                                                                                                                                                                                                                                                                                                                                                   |
| `Offre`                                | Un ping de flux d'un autre serveur Owncast. S'il porte `streamStatus: "live"`, Owncast marque ce serveur en ligne dans sa table des serveurs fédérés et stocke les métadonnées de flux.                                                                                                                                                                                                 |
| `Quitter`                              | Le pendant hors ligne de l'`Offre`: marque le flux du serveur Owncast distant hors ligne.                                                                                                                                                                                                                                                                                               |
| `Mettre à jour` → `Personne`/`Service` | Met à jour les métadonnées stockées (nom d'affichage, boîte de réception, boîte de réception partagée, avatar) pour un suiveur existant.                                                                                                                                                                                                                                             |
| `Créer`                                | **Non accepté.** Owncast rejette intentionnellement les activités `Créer` entrantes - vous ne pouvez pas publier ou répondre dans un serveur Owncast via ActivityPub.                                                                                                                                                                                                                   |

Deux protections importantes:

- **Limite d'âge des engagements.** Les activités `Aimer` et `Annoncer` ne sont enregistrées que si l'objet référencé a moins de **36 heures**. Les engagements plus vieux sont ignorés. Cela garde les notifications d'engagement liées à des flux récents.
- **Blocage & SSRF.** Les activités entrantes provenant de domaines/acteurs bloqués sont rejetées lors de la vérification de signature. Les livraisons sortantes refusent les URLs de boîte de réception non-HTTPS et internes/loopback.

### Activités serveur à serveur

`Offre`, `Quitter`, `Accepter`, et `Rejeter` forment ensemble le protocole de flux "en vedette" d'Owncast. Si vous construisez un annuaire ou un agrégateur qui souhaite participer, le schéma est:

1. Envoyez un `Suivre` qui définit le marqueur `ns#directory` (voir [l'espace de noms personnalisé](#owncast-custom-namespace)) à l'acteur du serveur Owncast. L'opérateur l'approuve manuellement, puis attend un `Accepter`.
2. Recevoir des activités `Offre` périodiques (avec des métadonnées Owncast) lorsque le serveur est en ligne.
3. Recevez un `Quitter` quand le flux se termine.

Vous pouvez également consommer uniquement les publications `Créer`/`Note` standards si vous n'avez pas besoin de signaux de vivacité en temps réel.

## Espace de noms personnalisé d'Owncast

Owncast ajoute un petit ensemble de propriétés JSON-LD personnalisées sous l'espace de noms **`https://owncast.online/ns#`**. Les propriétés de métadonnées de flux apparaissent comme des champs supplémentaires de niveau supérieur sur les activités `Offre` (et serveur à serveur connexes) et permettent à un récepteur de remplir une entrée d'annuaire à partir d'une seule activité. Le marqueur `ns#directory` apparaît sur un `Suivre` et identifie l'expéditeur comme un annuaire. Tous sont optionnels et sûrs à ignorer si vous vous souciez uniquement des ActivityPub standard.

| Propriété                                     | Type               | Signification                                                                                                  |
| --------------------------------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------- |
| `https://owncast.online/ns#streamStatus`      | chaîne             | `"live"` ou `"offline"`. Toujours présent sur les activités serveur à serveur. |
| `https://owncast.online/ns#streamTitle`       | chaîne             | Titre du flux actuel, s'il est défini.                                                         |
| `https://owncast.online/ns#streamDescription` | chaîne             | Résumé / description du serveur.                                                               |
| `https://owncast.online/ns#serverName`        | chaîne             | Nom lisible par l'homme du serveur.                                                            |
| `https://owncast.online/ns#logoUrl`           | chaîne             | URL absolue vers le logo du serveur.                                                           |
| `https://owncast.online/ns#thumbnailUrl`      | chaîne             | URL absolue vers la vignette du flux actuel.                                                   |
| `https://owncast.online/ns#streamTags`        | tableau de chaînes | Tags de métadonnées du serveur.                                                                |
| `https://owncast.online/ns#directory`         | booléen            | Défini sur `true` sur un `Suivre` pour identifier l'expéditeur comme un annuaire.              |

Un annuaire s'identifie en définissant `ns#directory` à `true` sur le `Suivre` qu'il envoie. Ce marqueur, et seulement ce marqueur, fait en sorte qu'Owncast traite le suivi comme une liste d'annuaire : il met le suivi en attente pour que l'opérateur approuve, et une fois approuvé, livre l'`Offre` et les pings de flux `Quitter` à ce suiveur. Les champs de métadonnées de flux ci-dessus sont uniquement descriptifs et n'identifient pas, à eux seuls, un annuaire.

## Construire un annuaire de flux Owncast

Les activités serveur à serveur qui alimentent la fonction [flux en vedette](/docs/social/featured-streams) d'Owncast sont ouvertes à votre consommation. Si vous souhaitez exécuter un annuaire ou un agrégateur qui suit quels serveurs Owncast sont en ligne, vous suivez chaque serveur comme n'importe quel acteur Fediverse et réagissez alors aux signaux de vivacité qu'il envoie.

Pour un exemple de référence complet et exécutable, consultez le dépôt [owncast-directory-example](https://github.com/owncast/owncast-directory-example). Il s'agit d'une petite application Python qui implémente tout dans cette section : un acteur publié, le suivi `ns#directory`, la gestion de l'`Offre`/`Quitter`/`Rejeter`, et une page web qui liste les serveurs en direct. Considérez-le comme un point de départ plutôt qu'un service de production.

Vous avez besoin d'un acteur publié et de requêtes signées, comme tout suiveur (voir [Signatures HTTP](#http-signatures)). À partir de là:

1. Envoyez un `Suivre` signé qui définit `https://owncast.online/ns#directory` à `true` (voir [l'espace de noms personnalisé](#owncast-custom-namespace)) à chaque acteur de serveur. Ce marqueur vous identifie comme un annuaire, ce qui fait que le serveur vous livre ses pings de flux, et cela rend l'inscription optionnelle : un serveur Owncast met toujours un suivi d'annuaire en attente pour que son opérateur approuve manuellement, peu importe comment la confidentialité de fédération du serveur est configurée. Vous ne recevrez aucun statut tant que l'opérateur n'a pas approuvé, donc attendez-vous à ce que les entrées restent en attente jusqu'à ce que chacune opte pour. Un `Suivre` sans le marqueur est traité comme un suivi de fan ordinaire : il peut être auto-accepté, mais il ne recevra jamais les pings d'`Offre`/`Quitter`.
2. Lorsqu'un serveur est en ligne, il poste une `Offre` dans votre boîte de réception environ toutes les 5 minutes, portant les [métadonnées personnalisées d'Owncast](#owncast-custom-namespace) : statut de flux, titre, description, nom du serveur, logo, vignette, et tags. Créer ou actualiser l'entrée d'annuaire de ce serveur à partir de ces champs.
3. Lorsque le flux se termine proprement, le serveur poste un `Quitter`. Marquer l'entrée hors ligne.
4. Si l'opérateur du serveur supprime votre annuaire de son côté, le serveur poste un `Rejeter` de votre `Suivre` original. Supprimer l'entrée : vous n'êtes plus autorisé à lister ce serveur, et il cessera de vous envoyer des pings.

Il n'y a pas de flux intégré pour qu'un serveur Owncast demande une place dans votre annuaire, donc assembler la liste est le travail de votre côté. Une façon simple de laisser les opérateurs opter pour est de mettre un formulaire de soumission sur votre annuaire où un opérateur entre l'URL de son serveur. Vous et votre annuaire décidez quelles soumissions lister et lesquelles rejeter. Lorsque vous en acceptez une, suivez ce serveur de la même manière que ci-dessus. L'opérateur approuve le suivi, ce que le soumissionnaire s'attendra à faire, et le suivi, l'acceptation, et le flux de pings listent leur flux.

Traitez les pings comme un battement de cœur. Si un serveur cesse d'envoyer des activités `Offre` sans un `Quitter`, parce qu'il a planté, perdu la connectivité, ou était bloqué, rien ne vous indique activement qu'il est tombé. Expire toute entrée dont vous n'avez pas entendu parler durant quelques intervalles de ping. Le propre annuaire d'Owncast marque un pair hors ligne après deux pings manqués, environ 11 minutes, et effectue cette vérification de stagnation une fois par minute.

Quelques choses qu'il vaut mieux bien faire :

- Les champs de métadonnées proviennent du serveur distant, donc traitez-les comme des entrées non fiables. Limitez les longueurs et confirmez que toute URL est `http` ou `https` avant de la rendre. La valeur à laquelle vous pouvez faire confiance est l'URL du serveur que vous avez choisi de suivre, pas le nom d'affichage que le serveur envoie.
- Les URL de vignette et de logo sont stables, donc le navigateur les mettra en cache. Ajoutez une requête de validation de cache changeante lorsque vous actualisez une entrée si vous souhaitez que l'aperçu reste actuel.
- Vous n'êtes pas obligé d'utiliser les pings du tout. Si vous avez juste besoin de savoir qu'un serveur est devenu en direct, plutôt que de garder une vue en cours de qui est actuellement en direct, suivez l'acteur et surveillez les publications de lancement standard `Créer`/`Note` comme tout autre consommateur Fediverse.

Pour que votre service soit reconnu comme un annuaire, définissez `https://owncast.online/ns#directory` à `true` sur le `Suivre` que vous envoyez. Un serveur qui le voit garde le suivi pour son opérateur et, une fois approuvé, vous envoie ses pings de flux.

## Référence d'endpoint

Tous les chemins sont relatifs à l'URL de base du serveur. Chaque point de terminaison retourne `405` lorsque la fédération est désactivée.

| Chemin                                | Méthode | But                                                        |
| ------------------------------------- | ------- | ---------------------------------------------------------- |
| `/.well-known/webfinger`              | GET     | Résoudre `acct:` → acteur IRI                              |
| `/.well-known/host-meta`              | GET     | Pointeur XRD vers WebFinger                                |
| `/.well-known/nodeinfo`               | GET     | Document de découverte NodeInfo                            |
| /nodeinfo/2.0         | GET     | Métadonnées du serveur NodeInfo 2.0        |
| `/.well-known/x-nodeinfo2`            | GET     | Métadonnées du serveur x-nodeinfo2                         |
| /api/v1/instance                      | GET     | Description d'instance compatible Mastodon                 |
| /federation/user/{username}           | GET     | Le document acteur `Service`                               |
| /federation/user/{username}/inbox     | POST    | Livrer des activités au serveur                            |
| /federation/user/{username}/outbox    | GET     | Collection d'activités que le serveur a envoyées           |
| /federation/user/{username}/followers | GET     | Collection paginée de suiveurs                             |
| /federation/user/{username}/following | GET     | Toujours `404` (pas de liste de suivis) |
| /federation/{object-id}               | GET     | Récupérer un seul objet ActivityPub stocké                 |

## Construire une application compatible - liste de contrôle

Pour suivre et consommer un flux Owncast depuis votre propre application :

1. **Résoudre** le handle avec WebFinger (`acct:live@host`) pour obtenir l'acteur IRI, puis récupérer l'acteur avec `Accept: application/activity+json`.
2. **Publiez votre propre acteur** avec une `clé publique`, servie sur HTTPS, avec une `boîte de réception` accessible.
3. **Envoyez un `Follow` signé** à la boîte de réception de l'acteur. Signez `(request-target) hôte date digest` avec RSA et incluez un `Digest` SHA-256.
4. **Gérez l'`Accept`** que Owncast renvoie à votre boîte de réception (mode public) — ou attendez une approbation manuelle (mode privé).
5. **Écoutez les publications de mise en ligne** : les activités `Create`/`Note` arrivant dans votre boîte de réception vous indiquent que le streaming a commencé ; le lien WebFinger `alternate`/`application/x-mpegURL` vous donne l'URL HLS à lire.
6. **Optionnellement** agissez comme un annuaire : définissez `https://owncast.online/ns#directory` sur `true` dans votre `Follow`, faites approuver par l'opérateur, puis consommez les pings `Offer`/`Leave` et les métadonnées `https://owncast.online/ns#*` pour une instantanéité en temps réel et des entrées d'annuaire plus riches.
7. **Vérifiez** la signature de tout ce que Owncast vous envoie contre la `#main-key` de l'acteur.

Rappelez-vous qu'Owncast n'acceptera pas les réponses ou les publications (`Create` est rejeté) et n'expose pas de liste de `following`, donc concevez votre intégration autour des suivis + notifications + likes/boosts plutôt que d'une conversation bilatérale.
