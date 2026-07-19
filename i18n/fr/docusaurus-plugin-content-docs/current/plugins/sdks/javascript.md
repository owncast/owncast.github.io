---
title: SDK JavaScript
description: 'Créez des plugins Owncast en JavaScript ou TypeScript avec @owncast/plugin-sdk : création de la structure, l''API definePlugin, la CLI, et le cadre de test de scénarios.'
sidebar_position: 2
sidebar_label: JavaScript
toc_min_heading_level: 2
toc_max_heading_level: 3
tags:
  - plugins
  - sdk
  - javascript
  - typescript
  - nodejs
---

Le SDK JavaScript, [`@owncast/plugin-sdk`](https://www.npmjs.com/package/@owncast/plugin-sdk), est le moyen le plus courant d'écrire un plugin Owncast. Vous écrivez en JavaScript ou TypeScript, et la CLI l'assemble en un seul plugin installable qui s'exécute en sandbox sur le serveur Owncast. Si vous hésitez entre cela et le SDK Python, consultez le [vue d'ensemble des plugins](/docs/plugins#two-sdks).

:::info[Nouveau dans Owncast 0.3.0]
Les SDK de plugins sont tout nouveaux dans Owncast 0.3.0 et l'API est encore en évolution. Si vous rencontrez un bug ou avez une suggestion, veuillez [ouvrir un problème](https://github.com/owncast/plugin-sdk/issues) ou [discuter en direct avec la communauté](/chat?tab=community).
:::

Cette page est la couche spécifique à JavaScript : création de la structure, `definePlugin`, la CLI, et TypeScript. Les gestionnaires, API, permissions, et le manifeste fonctionnent de la même manière dans les deux SDK et disposent de leurs propres pages de référence.

## Comment cela s'aligne avec la documentation de référence

Les noms des API de référence partagées sont dans leur forme canonique, qui est la forme JavaScript : vous pouvez donc les lire tels quels. Orientation rapide :

| Dans la référence                                                                        | En JavaScript                                                        |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Définir un gestionnaire                                                                  | une méthode sur `definePlugin({ ... })`                              |
| Gestionnaire pour un événement (par exemple, `chat.message.received`) | `onChatMessage(msg)` : camelCase, `on` + l'événement |
| Appeler une API hôte (par exemple, `owncast.chat.sendAction`)         | identique : `owncast.chat.sendAction(text)`          |
| Champs de charges utiles                                                                 | camelCase : `msg.user.displayName`, `msg.clientId`   |
| Filtrer le résultat                                                                      | `filter.pass()` / `filter.modify(payload)` / `filter.drop(reason)`   |
| S'abonner à un événement personnalisé                                                    | `on: { "my.event"(payload) { … } }`                                  |
| Construire / tester votre plugin                                                         | `npm run package` / `npm test`                                       |

## Prérequis

- Un serveur Owncast que vous pouvez administrer, version 0.3.0 ou plus récente.
- Node.js 18 ou plus récent (`node --version` pour vérifier).

## Créer un nouveau plugin

Vous n'installez pas le SDK manuellement. Créez une structure de projet avec `create-owncast-plugin` et le `package.json` généré liste déjà `@owncast/plugin-sdk` comme dépendance :

```sh
npx create-owncast-plugin@latest my-plugin
cd my-plugin
npm install     # télécharge les helpers tests et serve
```

Passez le slug que vous souhaitez comme argument. La structure l'utilise pour le nom du répertoire, le nom de fichier de sortie, et le préfixe de l'URL. Les slugs sont des lettres minuscules, des chiffres, et des tirets, commençant par une lettre.

Vous avez maintenant :

```text
my-plugin/
├── package.json
├── plugin.manifest.json     nom d'affichage, slug, version, permissions
├── README.md                comment construire, tester, empaqueter, et l'installer
├── INSTRUCTIONS.md          optionnel, rendu comme un onglet dans l'admin
├── AGENTS.md                notes pour les agents de codage AI
├── .agents/                 une compétence regroupée pour les agents de codage AI
├── src/
│   └── plugin.js            votre code, avec un gestionnaire d'exemple
└── __tests__/
    └── plugin.test.js       un test de scénario d'exemple
```

`npm install` crée également `node_modules/`. Aucun de ces éléments n'est créé pour vous, mais vous pouvez ajouter un `icon.png` (affiché dans la liste des plugins de l'admin), un répertoire `public/` (fichiers statiques servis à `/plugins/my-plugin/`), et un répertoire `assets/` (fichiers que l'hôte inclut pour les champs du manifeste).

`npm install` exécute une étape post-installation qui télécharge les binaires hôtes préconstruits pour le test et le serveur (le runner de scénario et le serveur dev). Construire et empaqueter un plugin ne nécessite aucun téléchargement. Cette post-installation est la seule étape réseau, et tout ce qui suit est local.

## Écrire un plugin

Un plugin est l'objet que vous passez à `definePlugin`. Définissez une méthode pour chaque événement auquel vous souhaitez réagir : le SDK dérive la liste des abonnements du manifeste en fonction des méthodes présentes, donc il n'y a pas de liste séparée à maintenir à jour.

```js
const { definePlugin, owncast, filter } = require('@owncast/plugin-sdk');

module.exports = definePlugin({
  onChatMessage(msg) {
    owncast.chat.send(`echo: ${msg.body}`);
  },

  filterChatMessage(msg) {
    return msg.body.includes('spam') ? filter.drop('spam') : filter.pass();
  },
});
```

Le paquet exporte trois choses :

- **`definePlugin(handlers)`** : enregistre vos gestionnaires et retourne l'objet plugin à exporter.
- **`owncast`** : l'espace de noms de l'API hôte (`owncast.chat.send(...)`, `owncast.kv.get(...)`, et le reste). Les noms de méthodes sont **camelCase**. Chaque appel est contrôlé par la permission correspondante que vous déclarez dans votre manifeste. Consultez la [référence des API](/docs/plugins/apis).
- **`filter`** : le constructeur pour les résultats de filtre : `filter.pass()`, `filter.modify(payload)`, `filter.drop(reason)`. Utilisé uniquement depuis `filterChatMessage`.

Les noms de gestionnaire sont camelCase et correspondent aux événements d'exécution répertoriés dans la [référence des gestionnaires](/docs/plugins/events) : `onChatMessage`, `filterChatMessage`, `onChatUserJoined`, `onStreamStarted`, `onTick`, `onFediverseFollow`, `onHttpRequest`, et ainsi de suite. Les champs de charge utile sont également camelCase (`msg.user.displayName`, `msg.clientId`).

Au-delà des méthodes de premier niveau, deux groupes de gestionnaires prennent une clé et sont passés comme objets imbriqués : `on: { "my.event"(payload) {} }` pour les événements personnalisés et `onTabContent: { slug(ctx) {} }` / `onPageContent` pour les pages de visionnage dynamiques. Deux autres ne prennent pas de clé : `onPageStyles()` et `onPageScripts()` retournent du CSS et du JavaScript injectés dans la page de visionnage lors de la demande, contrôlés sur `ui.modify`. Et plutôt que de gérer manuellement l'analyse des préfixes dans `onChatMessage`, vous pouvez déclarer un tableau de `commands` que le `!help` intégré de l'hôte récupère automatiquement. Les deux sont montrés pour JavaScript sur les pages sujettes : [Gestionnaires](/docs/plugins/events), [Commandes](/docs/plugins/commands), et [UI](/docs/plugins/ui).

## TypeScript

Le paquet expédie `index.d.ts`, vous obtenez donc la complétion automatique et la vérification des types sur chaque charge utile d'événement et API hôte sans configuration supplémentaire. Nommez votre entrée `src/plugin.ts` et la CLI le compile de la même manière :

```ts
import { definePlugin, owncast, filter, ChatMessage } from '@owncast/plugin-sdk';

export default definePlugin({
  onChatMessage(msg: ChatMessage) {
    owncast.chat.send(`echo: ${msg.body}`);
  },
});
```

La compilation détecte `src/plugin.ts`, `src/plugin.js`, `plugin.ts`, ou `plugin.js` dans cet ordre. Les types sont des déclarations uniquement : il n'y a pas d'étape de compilation séparée ou de `tsconfig` requis.

## La CLI

Le SDK installe un CLI `owncast-plugin`, exposé par les scripts `package.json` que la structure écrit :

| Commande                 | Script            | Ce que cela fait                                                                                    |
| ------------------------ | ----------------- | --------------------------------------------------------------------------------------------------- |
| `owncast-plugin build`   | `npm run build`   | Regroupe `src/plugin.{js,ts}` dans un artefact de construction intermédiaire                        |
| `owncast-plugin test`    | `npm test`        | Construit, puis exécute les scénarios `__tests__/` à travers le véritable environnement d'exécution |
| `owncast-plugin serve`   | `npm run serve`   | Serveur de développement local à `http://localhost:8080/plugins/<slug>/`                            |
| `owncast-plugin package` | `npm run package` | Construit et regroupe tout dans `<slug>.ocpkg` : le fichier que vous expédiez       |

```sh
npm run package   # produit my-plugin.ocpkg
npm test          # exécute vos scénarios
npm run serve     # itérer contre un serveur de développement local
```

Le `.ocpkg` est l'artefact de distribution unique : il contient votre manifeste, le code groupé, vos répertoires `public/` et `assets/`, et un `icon.png` et `INSTRUCTIONS.md` optionnels. Consultez [Emballage & distribution](/docs/plugins/packaging) pour savoir ce qui à l'intérieur et comment l'installer.

En JavaScript, `npm test` exécute des fichiers `__tests__/*.test.js` appelant `runScenarios` (construisez le tableau avec des boucles, helpers, et fixtures), ou des fichiers statiques `__tests__/*.test.json`. Le modèle complet de données de scénario et le serveur de développement local (`npm run serve`) sont sur la page [Test](/docs/plugins/testing).

## Contraintes à connaître

La CLI regroupe votre code en un seul fichier qui s'exécute à l'intérieur du sandbox du serveur, pas dans Node. Ce sandbox façonne la manière dont vous écrivez un plugin :

- **Utilisez `owncast.http.fetch` pour HTTP sortant**, pas le `fetch` global, `axios`, ou un paquet qui enveloppe le `http` de Node. L'accès réseau passe par l'API hôte et est contrôlé par la permission `network.fetch`. Consultez la [référence des API](/docs/plugins/apis).
- **Tous les paquets npm ne fonctionnent pas.** Les paquets JavaScript pur s'empaquettent bien. Tout ce qui nécessite le runtime Node.js ne fonctionne pas. Consultez [Bibliothèques tierces](#third-party-libraries).

## Bibliothèques tierces

:::caution[Lisez ceci avant d'ajouter une dépendance]
Les paquets npm fonctionnent uniquement s'ils sont **pure JavaScript**. Un plugin s'exécute dans un sandbox, pas Node, donc un paquet qui touche `fs`, `net`, `http`/`https`, `path`, `crypto`, `process`, ou `child_process` s'empaquette proprement puis se bloque lorsque ce code s'exécute.
:::

Un paquet peut également toucher à un intégré Node sur un chemin que vous n'exercez jamais, donc testez les parties que vous utilisez. Pour HTTP sortant, utilisez [`owncast.http.fetch`](/docs/plugins/apis), pas un paquet client HTTP.

L'exemple [`page-content-demo`](https://github.com/owncast/plugin-sdk/tree/main/examples/js/page-content-demo) utilise le paquet `mustache` de cette manière.

## Qu'y a-t-il dans le paquet

- `index.js` : le runtime avec `definePlugin`, les gestionnaires de commandes, les wrappers hôtes `owncast.*`, et les helpers de filtre.
- `index.d.ts` : déclarations TypeScript pour chaque charge utile d'événement et API hôte.
- `testing.js` : l'API de test `runScenarios` / `runScenarioFiles`.
- `bin/owncast-plugin` : la CLI (`build`, `test`, `serve`, `package`).
- `scripts/postinstall.js` : télécharge les binaires hôtes préconstruits lors de l'installation, utilisés par `npm test` et `npm run serve`.

## Où aller ensuite

- [Référence des gestionnaires](/docs/plugins/events) : chaque événement auquel vous pouvez vous abonner et sa forme de charge utile.
- [Référence des API](/docs/plugins/apis) : chaque méthode `owncast.*` et la permission dont elle a besoin.
- [Test](/docs/plugins/testing) : le modèle complet de données de scénario.
- [Emballage & distribution](/docs/plugins/packaging) : construction de la `.ocpkg` et de son installation.
- [Plugins d'exemple](https://github.com/owncast/plugin-sdk/tree/main/examples/js) : un par fonctionnalité, chacun étant un point de départ complet que vous pouvez copier.
- [Source du SDK](https://github.com/owncast/plugin-sdk) : le paquet `@owncast/plugin-sdk` et l'outil.
