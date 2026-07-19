---
title: Référence de manifeste
description: Chaque champ que peut contenir le manifeste de votre plugin, avec des exemples.
sidebar_position: 3
sidebar_label: Manifeste
toc_min_heading_level: 2
toc_max_heading_level: 3
tags:
  - plugins
  - manifeste
  - référence
  - configuration
---

Chaque plugin a un fichier `plugin.manifest.json` à sa racine. C'est la source de vérité pour l'identité du plugin, les autorisations dont il a besoin, les destinations réseau qu'il est autorisé à appeler, les pages d'administration qu'il contribue et les boutons d'action qu'il ajoute à l'interface utilisateur du visualiseur.

Le manifeste est ce que l'administrateur examine avant d'installer le plugin. L'hôte l'analyse au moment du chargement et applique chaque déclaration. Rien dans le plugin compilé ne peut accorder une capacité que le manifeste n'a pas demandée.

:::info[Disponible dans chaque SDK]
Le manifeste est un JSON simple qui décrit le plugin à l'hôte, indépendamment du langage dans lequel vous avez écrit le code. Pour les détails spécifiques au langage, voir la référence SDK **[JavaScript](/docs/plugins/sdks/javascript)** ou **[Python](/docs/plugins/sdks/python)**.
:::

## Manifeste minimum

```json
{
  "api": "1",
  "name": "Mon Plugin",
  "version": "0.1.0",
  "description": "Brève description pour les administrateurs",
  "permissions": []
}
```

`api`, `name`, et `version` sont requis. Tout le reste est optionnel et seulement nécessaire lorsque vous utilisez la fonctionnalité correspondante.

## Champs de premier niveau

| Champ              | Type                                                         | Requis | Description                                                                                                                                                                                                      |
| ------------------ | ------------------------------------------------------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `api`              | chaine                                                       | oui    | Version du schéma de manifeste. Actuellement `"1"`.                                                                                                                              |
| `name`             | chaine                                                       | oui    | Nom d'affichage lisible par l'homme affiché dans les listes d'administrateurs et sur les cartes de registre. Exemple : `"Awesome Echo Bot"`.                     |
| `slug`             | chaine                                                       | non    | Identifiant canonique (préfixe d'URL, espace de noms de configuration, nom de fichier). Auto-dérivé de `name` s'il est omis. Voir ci-dessous. |
| `version`          | chaine                                                       | oui    | Votre version de plugin. Semver recommandé. Doit correspondre à ce que le runtime rapporte au moment du chargement.                                              |
| `description`      | chaine                                                       | non    | Résumé d'une phrase que l'administrateur voit dans la liste des plugins et lors de l'installation.                                                                                               |
| `permissions`      | string[] | non    | Liste des capacités dont votre plugin a besoin. Voir [Permissions](/docs/plugins/permissions).                                                                                   |
| `config`           | objet                                                        | non    | Paramètres configurables par l'administrateur que votre plugin lit au moment de l'exécution. Voir [Configuration](/docs/plugins/configuration).                                  |
| `bot`              | objet                                                        | non    | Configuration de chat-bot. Voir [`bot`](#bot-chat-bot-identity).                                                                                                                 |
| `network`          | objet                                                        | non    | Liste blanche HTTP sortante, requise lorsque `network.fetch` est accordé. Voir ci-dessous.                                                                                       |
| `actions`          | objet[]  | non    | Boutons d'action à ajouter à l'interface utilisateur du visualiseur. Voir [UI : Boutons d'action](/docs/plugins/ui#action-buttons).                              |
| `admin`            | objet                                                        | non    | Pages d'administration à ajouter à l'interface utilisateur administrateur d'Owncast. Voir [UI : Pages d'administration](/docs/plugins/ui#admin-pages).           |
| `styles`           | string[] | non    | Fichiers CSS intégrés dans la page du visualiseur. Voir [`styles`](#styles-css-injection).                                                                                       |
| `scripts`          | string[] | non    | Fichiers JavaScript intégrés dans la page du visualiseur. Voir [`scripts`](#scripts-javascript-injection).                                                                       |
| `extraPageContent` | objet                                                        | non    | Un objet déclarant un slug et un fichier HTML optionnel ajouté au bloc de contenu supplémentaire du visualiseur. Voir [`extraPageContent`](#extrapagecontent-html-block).        |
| `tabs`             | objet[]  | non    | Onglets de page du visualiseur que le plugin contribue aux onglets intégrés. Voir [`tabs`](#tabs-viewer-page-tabs).                                                              |

### `name` et `slug`

`name` est le nom d'affichage lisible par l'homme. Il peut contenir n'importe quel caractère, y compris des espaces et de la ponctuation, et est ce que les administrateurs voient dans la liste des plugins, ce qui apparaît sur les cartes de navigation du registre, et l'identité par défaut du chat-bot.

`slug` est l'identifiant canonique. Il contrôle :

- Le préfixe d'URL du plugin : `/plugins/<slug>/...`
- L'espace de noms de configuration (magasin clé-valeur)
- Le nom de fichier de l'artéfact construit (`<slug>.ocpkg`)
- La clé primaire dans le registre des plugins

Les slugs sont des lettres minuscules, des chiffres et des tirets, commençant par une lettre, jusqu'à 64 caractères. Le SDK en dérive un de `name` automatiquement lorsque `slug` est omis : les espaces et la ponctuation fusionnent en tirets simples, les lettres en minuscules. `"Awesome Echo Bot"` devient `awesome-echo-bot`. Épinglez `slug` explicitement lorsque l'auto-dérivation n'est pas ce que vous voulez, ou lorsque votre nom d'affichage utilise des caractères en dehors de l'ASCII (`"Café Helper"` donnerait autrement `caf-helper`).

Évitez de changer le slug après sa sortie : le renommage semblera être un plugin différent pour les administrateurs, avec un nouveau magasin de configuration. Changer `name` (uniquement affichage) est sans danger. Cela ne change pas l'identité.

### `bot` : identité de chat-bot

Les plugins qui postent dans le chat (en utilisant `owncast.chat.send`) apparaissent sous un utilisateur chat-bot. Par défaut, le bot apparaît sous le `name` d'affichage du plugin. Remplacez cela par `bot.displayName` :

```json
{
  "name": "Stream Sidekick",
  "bot": {
    "displayName": "Sidekick"
  }
}
```

Dans le chat, le bot poste en tant que "Sidekick" au lieu de "Stream Sidekick". La première fois que le plugin se charge, Owncast provisionne un utilisateur de chat persistant sur la base du `slug` du plugin (de sorte que l'identité du bot survive aux réinstallations et aux changements de nom d'affichage).

`bot.displayName` n'est pertinent que pour les plugins qui ont l'autorisation `chat.send`. Il est ignoré sinon.

### `config` : paramètres configurables par l'administrateur

Déclarez des paramètres typés ici et Owncast rend un formulaire éditable pour eux dans l'interface admin, que votre plugin lit au moment de l'exécution avec `owncast.config.get`. Chaque entrée a un `type` (`string`, `number`, ou `boolean`), un `default`, et une `description` :

```json
{
  "config": {
    "greeting": { "type": "string", "default": "welcome!", "description": "Message de premier accès" },
    "cooldownMs": { "type": "number", "default": 2000, "description": "Cooldown par utilisateur pour les commandes" },
    "modOnly": { "type": "boolean", "default": false, "description": "Restreindre aux modérateurs" }
  }
}
```

Couverture complète, y compris comment le formulaire se rend, masquage des identifiants, validation, et où les remplacements sont stockés, dans [Configuration](/docs/plugins/configuration).

## `permissions`

Chaque entrée débloque un morceau des API de l'hôte. L'hôte rejette les appels à une méthode dont vous n'avez pas déclaré l'autorisation.

```json
{
  "permissions": ["chat.send", "storage.kv", "network.fetch"]
}
```

Voir [la référence des permissions](/docs/plugins/permissions) pour la liste complète des identifiants et ce que chacun accorde.

## `network` : liste blanche HTTP sortante

`network.fetch` est conditionné par une liste blanche explicite de noms d'hôtes. Si vous déclarez `network.fetch` dans `permissions`, vous avez également besoin d'un champ `network.allowedHosts` listant les hôtes que vous allez appeler :

```json
{
  "permissions": ["network.fetch"],
  "network": {
    "allowedHosts": ["api.discord.com", "*.weather.com"]
  }
}
```

Les entrées sont des globes de noms d'hôtes. Des noms nus comme `api.discord.com` correspondent exactement. `*` est un segment générique, donc `*.weather.com` correspond à `api.weather.com` et `data.weather.com` mais pas à `weather.com` lui-même ou `evil.com`.

Le générique `"*"` correspond à n'importe quel hôte, mais vous devez l'écrire explicitement :

```json
{
  "network": { "allowedHosts": ["*"] }
}
```

C'est intentionnel. Les administrateurs examinant le manifeste voient la portée qu'ils accordent. La plupart des plugins devraient lister les hôtes spécifiques qu'ils appellent à la place.

L'hôte rejette le chargement si `network.fetch` est accordé sans une entrée `allowedHosts`.

## `actions` : boutons d'action

Les boutons d'action sont des entrées cliquables qu'Owncast affiche sous le flux. Tant que votre plugin est activé, l'hôte fusionne ses entrées dans la liste qu'Owncast affiche déjà.

```json
{
  "permissions": ["ui.modify", "http.serve"],
  "actions": [
    {
      "title": "Overlay de chat",
      "description": "Ouvrir l'overlay de chat en direct",
      "url": "/",
      "icon": "/star.png",
      "color": "#3b82f6"
    },
    {
      "title": "Suivi des problèmes",
      "url": "https://github.com/example/my-plugin/issues",
      "openExternally": true
    },
    {
      "title": "À propos de ce flux",
      "html": "<p>En direct tous les jours de la semaine à 20h UTC.</p>"
    }
  ]
}
```

Chaque entrée :

| Champ            | Type    | Notes                                                                                                                 |
| ---------------- | ------- | --------------------------------------------------------------------------------------------------------------------- |
| `title`          | chaine  | Requis. L'étiquette du bouton.                                                        |
| `url`            | chaine  | Soit un URL absolu `https://...` soit un chemin. Mutuellement exclusif avec `html`.   |
| `html`           | chaine  | HTML brut rendu dans une fenêtre modale en ligne. Mutuellement exclusif avec `url`.   |
| `icon`           | chaine  | URL d'image facultative affichée sur le bouton. Les mêmes règles de chemin que `url`. |
| `color`          | chaine  | Couleur hex facultative pour l'arrière-plan du bouton.                                                |
| `description`    | chaîne  | Facultatif. Affiché dans le modal qui s'ouvre pour les actions basées sur des URL.    |
| `openExternally` | booléen | Si `true`, l'URL s'ouvre dans un nouvel onglet au lieu d'un modal en ligne.                           |

Règles que l'hôte applique au moment du chargement :

- La permission `ui.modify` est requise. Sans cela, le manifeste est rejeté.
- Exactement un de `url` ou `html` par entrée.
- Les URL relatives (et les icônes) commençant par `/` sont automatiquement préfixées au nom de votre plugin. `"/"` devient `/plugins/my-plugin/`. `"/star.png"` devient `/plugins/my-plugin/star.png`. Vous évite de coder en dur le nom de votre plugin.
- Les URL (et icônes) qui se résolvent dans votre espace de noms nécessitent `http.serve`, puisque vous êtes celui qui les sert.
- Les URL (et icônes) pointant vers l'espace de noms d'un autre plugin sont rejetées. Attrape les fautes de frappe et empêche un plugin de faire de la publicité pour l'interface utilisateur d'un autre.

Couverture complète dans [UI : Boutons d'action](/docs/plugins/ui#action-buttons).

## `admin` : pages administratives

Les plugins peuvent enregistrer des pages qui apparaissent dans l'interface utilisateur d'administration d'Owncast sous **Plugins** :

```json
{
  "permissions": ["http.serve"],
  "admin": {
    "pages": [
      { "title": "Paramètres", "path": "/admin", "icon": "gear" }
    ]
  }
}
```

Chaque entrée :

| Champ   | Type   | Remarques                                                                                                                                               |
| ------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title` | chaîne | Requis. L'étiquette de l'onglet affichée dans l'interface d'administration.                                             |
| `path`  | chaîne | Requis. Un chemin glob sous l'espace de noms de votre plugin (par exemple `"/admin"`, `"/admin/*"`). |
| `icon`  | chaîne | Facultatif. Un nom sémantique court (`gear`, `wrench`, `user`, etc.).                |

Les demandes sous `/plugins/<your-slug>/<path>` correspondant à tout glob déclaré sont authentifiées par l'hôte : les demandes non authentifiées obtiennent un `401` avant que le code du plugin ne s'exécute. Couverture complète dans [UI : Pages d'administration](/docs/plugins/ui#admin-pages).

## `styles` : injection CSS

Une liste de fichiers CSS que le plugin contribue à la page du visualiseur. Le contenu de chaque fichier est intégré dans le même bloc `<style>` qu'Owncast utilise déjà pour le CSS personnalisé de l'administrateur, de sorte que les plugins peuvent créer des thèmes sans que chaque contribution ait besoin de son propre tag `<link>`.

```json
{
  "permissions": ["ui.modify"],
  "styles": ["theme.css", "overrides.css"]
}
```

Les règles de chemin correspondent aux URL des boutons d'action :

- Les chemins simples comme `"theme.css"` sont automatiquement préfixés à l'espace de noms de votre plugin.
- Les chemins à simple barre comme `"/theme.css"` obtiennent le même traitement.
- Les chemins entièrement qualifiés `/plugins/<your-slug>/...` passent à travers.
- Les chemins dans l'espace de noms d'un autre plugin sont rejetés.
- Les URL `http://` et `https://` sont rejetées. Regroupez les ressources externes (polices, images) et référencez-les avec `@font-face` ou `url(...)` depuis votre CSS, afin qu'un administrateur examinant le manifeste puisse voir chaque fichier qui atterrira sur sa page.
- Chaque entrée doit se terminer par `.css`.

Nécessite uniquement `ui.modify` (le plugin peint à l'intérieur du chrome d'Owncast). `http.serve` n'est pas requis : les octets de chaque fichier sont lus à partir de `assets/` et intégrés dans `customStyles` sur `/api/config`, pas servis à une URL. L'hôte émet un commentaire `/* plugin : <your-slug> ...` \*/\` devant chaque contribution afin qu'un lecteur puisse attribuer une règle à quel que plugin l'a expédié.

Pour un CSS qui dépend de l'état du plugin, un gestionnaire `onPageStyles` le renvoie au moment de la demande, sans champ manifeste. Sa sortie s'ajoute à `customStyles` après ces fichiers statiques.

Couverture complète dans [UI : feuilles de style du visualiseur](/docs/plugins/ui#viewer-stylesheets).

## `scripts` : injection JavaScript

Une liste de fichiers JavaScript que le plugin contribue à la page du visualiseur. Le contenu de chaque fichier est ajouté à la même réponse d'où provient déjà le JavaScript personnalisé de l'administrateur (`/customjavascript`), ainsi les plugins peuvent étendre la page sans que chaque contribution ait besoin de son propre tag `<script>`.

```json
{
  "permissions": ["ui.modify"],
  "scripts": ["client.js"]
}
```

Les règles de chemin et les permissions requises correspondent à `styles`, appliquées aux fichiers `.js` (seul `ui.modify` est requis, et l'hôte lit à partir de `assets/` et intègre dans `/customjavascript`). Enveloppez votre script dans une IIFE pour que les déclarations de niveau supérieur ne se heurtent pas au JavaScript de l'administrateur ou d'autres plugins. L'hôte émet un commentaire `// plugin : <your-slug> ...` devant chaque contribution et enveloppe chaque contribution dans un try/catch pour qu'une erreur d'exécution d'un plugin ne puisse pas casser les autres.

Pour un JavaScript qui dépend de l'état du plugin, un gestionnaire `onPageScripts` le renvoie au moment de la demande, sans champ manifeste. Sa sortie s'ajoute à `/customjavascript` après ces fichiers statiques.

Couverture complète dans [UI : scripts du visualiseur](/docs/plugins/ui#viewer-scripts).

## `extraPageContent` : bloc HTML

Un objet qui contribue un bloc HTML à la zone de contenu supplémentaire du visualiseur, préfixé au texte de l'administrateur sur `/api/config`.

```json
{
  "permissions": ["ui.modify"],
  "extraPageContent": { "slug": "banner", "content": "content.html" }
}
```

| Champ     | Type   | Remarques                                                                                                                                                                                                                                                                          |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `slug`    | chaîne | Requis uniquement lorsque `content` est omis (l'hôte le passe à `onPageContent`). Facultatif sinon. Lettres minuscules, chiffres et tirets, commençant par une lettre.                                          |
| `content` | chaîne | Facultatif. Chemin relatif vers un fichier HTML statique dans `assets/`. Lorsqu'il est présent, les octets de ce fichier sont intégrés directement. Lorsqu'il est omis, l'hôte appelle `onPageContent` à la place. |

**Statique** (avec `content`) : l'hôte lit le fichier au moment de la demande et intègre les octets. Les mêmes règles de chemin que `styles` et `scripts`, appliquées à une seule entrée `.html`. Le HTML du plugin contourne le processeur markdown afin que les balises et attributs passent tels quels.

**Dynamique** (sans `content`) : implémentez `onPageContent({ slug, user? })` dans votre plugin pour renvoyer du HTML au moment de la demande. Utilisez ceci lorsque le contenu doit varier par spectateur ou s'appuyer sur des données en direct (par exemple, des salutations personnalisées ou des statistiques de diffusion actuelles). `user` est l'identité de chat du spectateur, présente lors de l'authentification.

Nécessite `ui.modify`. `http.serve` n'est pas requis car le HTML est intégré dans la réponse de configuration, pas servi en tant qu'URL. Chaque contribution est enveloppée avec un `<!-- plugin : <your-slug> ... -->` commentaire afin qu'un lecteur puisse attribuer le balisage en retour.

Couverture complète dans [UI : Contenu de page supplémentaire](/docs/plugins/ui#extra-page-content).

## `tabs` : onglets de la page du visualiseur

Une liste d'onglets que le plugin contribue à la ligne d'onglets de la page du visualiseur (à côté des onglets intégrés **À propos** et **Abonnés**). Chaque entrée nécessite `title`. `content` est optionnel, et `slug` est requis uniquement lorsque `content` est omis (sinon il est dérivé de `title`).

```json
{
  "permissions": ["ui.modify"],
  "tabs": [
    { "title": "Musique",    "slug": "musique",    "content": "music.html" },
    { "title": "Calendrier", "slug": "calendrier", "content": "schedule.html" }
  ]
}
```

Chaque entrée a :

| Champ     | Remarques                                                                                                                                                                                                                                                                                                                                                                                                           |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`   | Requis. L'étiquette affichée sur l'onglet.                                                                                                                                                                                                                                                                                                                                          |
| `slug`    | Requis uniquement lorsque `content` est omis (dérivé de `title` sinon). Identifiant stable passé à `onTabContent` lorsque l'hôte demande du HTML rendu. Lettres minuscules, chiffres et tirets, commençant par une lettre. Doit être unique dans les onglets du plugin.                                                          |
| `content` | Facultatif. Chemin relatif vers un fichier HTML sous `assets/`. Les mêmes règles de chemin que `extraPageContent` (préfixées automatiquement à votre espace de noms, les chemins entre plugins et les URL `http(s)://` rejetées, doivent se terminer par `.html`). Lorsqu'il est omis, l'hôte appelle `onTabContent` à la place. |

Nécessite `ui.modify`. `http.serve` n'est pas requis : le HTML de chaque onglet est lu à partir de `assets/` et intégré dans le tableau `pluginTabs[]` sur `/api/config`. La page du visualiseur associe chaque entrée à un onglet dont le corps rend le HTML directement.

Couverture complète dans [UI : Onglets de page du visualiseur](/docs/plugins/ui#viewer-page-tabs).

## Contrat manifeste-runtime

Lorsque votre plugin se charge, l'hôte analyse le manifeste et demande au runtime de s'enregistrer. Il compare les deux et rejette le chargement s'ils ne s'accordent pas sur :

- `slug` (l'identifiant canonique)
- `version`
- Toute permission que le runtime utilise et qui n'a pas été déclarée dans le manifeste

Vous n'écrivez pas vous-même l'enregistrement : le SDK le génère à partir des gestionnaires que vous définissez (voir votre [référence SDK](/docs/plugins) pour savoir comment les gestionnaires sont déclarés dans votre langue). Savoir que ce contrat existe est utile lors du débogage. Une erreur "permission demandée à l'exécution non déclarée dans le manifeste" signifie que vous avez ajouté un gestionnaire qui a besoin d'une permission que vous avez oublié de lister.

## Exemple complet

Un manifeste non trivial exerçant la plupart des fonctionnalités :

```json
{
  "api": "1",
  "name": "Stream Sidekick",
  "slug": "stream-sidekick",
  "version": "0.2.0",
  "description": "Publie sur Discord au début du stream, affiche un overlay et ajoute un bouton de don.",
  "permissions": [
    "chat.send",
    "chat.filter",
    "storage.kv",
    "http.serve",
    "http.sse",
    "network.fetch",
    "notifications.send",
    "ui.modify"
  ],
  "bot": {
    "displayName": "Sidekick"
  },
  "network": {
    "allowedHosts": ["api.discord.com", "*.example.com"]
  },
  "actions": [
    {
      "title": "Faire un don",
      "url": "https://example.com/donate",
      "openExternally": true
    }
  ],
  "admin": {
    "pages": [
      { "title": "Paramètres du Sidekick", "path": "/admin", "icon": "gear" }
    ]
  },
  "styles": ["sidekick.css"],
  "scripts": ["sidekick.js"],
  "extraPageContent": { "slug": "intro", "content": "intro.html" },
  "tabs": [
    { "title": "Calendrier", "slug": "calendrier", "content": "schedule.html" }
  ]
}
```
