---
title: SDK Python
description: 'Créez des plugins Owncast en Python avec owncast-plugin-py : installez, les décorateurs @plugin, l''interface en ligne de commande owncast-plugin-py, et les tests.'
sidebar_position: 3
sidebar_label: Python
toc_min_heading_level: 2
toc_max_heading_level: 3
tags:
  - plugins
  - sdk
  - python
---

Le SDK Python, `owncast-plugin-py`, vous permet de créer des plugins Owncast en **Python**. Vous écrivez du Python ordinaire avec des décorateurs. Une étape de construction le transforme en un seul plugin installable qui fonctionne en mode isolé à l'intérieur du serveur Owncast : le même format `.ocpkg` et l'ensemble des fonctionnalités que le [SDK JavaScript](/docs/plugins/sdks/javascript), donc un plugin Python est un égal de premier niveau d'un plugin JS.

:::info[Nouveau dans Owncast 0.3.0]
Les SDK de plugins sont tout nouveaux dans Owncast 0.3.0 et l'API est encore en évolution. Si vous rencontrez un bug ou avez une suggestion, veuillez [ouvrir un problème](https://github.com/owncast/plugin-sdk/issues) ou [discuter en direct avec la communauté](/chat?tab=community).
:::

Cette page est la couche spécifique à Python : installation, les décorateurs `@plugin`, l'interface en ligne de commande `owncast-plugin-py`, et les tests. Les gestionnaires, API, permissions et le manifeste fonctionnent de la même manière dans les deux SDK et ont leurs propres pages de référence.

## Comment cela se rapporte aux documents de référence

Les noms de référence partagés des gestionnaires et des API dans leur forme canonique (camelCase). Pour le lire en tant que Python, appliquez une règle : **tout est `snake_case`.** Orientation rapide :

| Dans la référence                                                                       | En Python                                                                                                                                                          |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Définir un gestionnaire                                                                 | une fonction décorée `@plugin.*`                                                                                                                                   |
| Gestionnaire pour un événement (par exemple `chat.message.received`) | `@plugin.on_chat_message`                                                                                                                                          |
| Appeler une API hôte (par exemple `owncast.chat.sendAction`)         | `owncast.chat.send_action(text)` : snake_case                                                                                 |
| Champs de charge utile (par exemple `msg.user.displayName`)          | `msg.user.display_name`, `msg.client_id`. `msg.raw` pour le dict brut                                                                              |
| Résultat de filtre (`filter.pass()`)                                 | `filter.pass_()` (underscore final : `pass` est un mot clé). Aussi `filter.modify(...)` / `filter.drop(reason)` |
| S'abonner à un événement personnalisé                                                   | `@plugin.on("my.event")`                                                                                                                                           |
| Construire / tester votre plugin                                                        | `owncast-plugin-py package` / `owncast-plugin-py test`                                                                                                             |

## Prérequis

- Un serveur Owncast que vous pouvez administrer, version 0.3.0 ou plus récente.
- Python 3.8 ou plus récent.

## Installer

Créer un projet avec `new`, en passant le slug. `uvx` exécute le créateur directement depuis PyPI sans rien installer :

```sh
uvx owncast-plugin-py new my-plugin
cd my-plugin
```

Installez le SDK pour obtenir l'interface en ligne de commande `owncast-plugin-py` dans votre PATH pour les étapes de construction, de test, de service et d'emballage :

```sh
uv tool install owncast-plugin-py      # ou :  pip install owncast-plugin-py
```

Vous obtenez un répertoire prêt à être construit :

```text
my-plugin/
├── plugin.manifest.json     nom, slug, version, permissions
├── README.md                comment construire, tester, emballer et l'installer
├── INSTRUCTIONS.md          optionnel, rendu comme un onglet dans l'admin
├── AGENTS.md                notes pour les agents de codage IA
├── .agents/                 une compétence intégrée pour les agents de codage IA
├── src/plugin.py            votre code, avec un gestionnaire d'exemple
└── __tests__/*.test.json    un test de scénario d'exemple
```

## Écrire un plugin

Importez `plugin`, `owncast` et `filter`, et enregistrez des gestionnaires avec des décorateurs. Chaque décorateur s'abonne à un événement. Le SDK dérive la liste d'abonnement du manifeste à partir des gestionnaires que vous définissez.

```python
from owncast_plugin import plugin, owncast, filter


@plugin.on_chat_message
def greet(msg):
    name = msg.user.display_name if msg.user else "quelqu'un"
    owncast.chat.send(f"{name} a dit : {msg.body}")


@plugin.filter_chat_message
def block_spam(msg):
    return filter.drop("spam") if "spam" in msg.body else filter.pass_()
```

Le module exporte trois choses :

- **`plugin`** : le registre des décorateurs. `@plugin.on_chat_message`, `@plugin.filter_chat_message`, `@plugin.on_stream_started`, `@plugin.on_tick`, `@plugin.on_fediverse_follow`, et les autres reflètent les événements d'exécution dans la [référence des gestionnaires](/docs/plugins/events). Deux prennent une clé : `@plugin.on("custom.event")` pour les événements émis par le plugin et `@plugin.on_tab_content("slug")` / `@plugin.on_page_content("slug")` pour le HTML dynamique de la page du visualiseur. Deux ne prennent pas de clé : `@plugin.on_page_styles` et `@plugin.on_page_scripts` renvoient CSS et JavaScript injectés dans la page du visualiseur au moment de la demande, sous contrôle de `ui.modify`.
- **`owncast`** : l'espace de noms de l'API hôte. Les noms de méthode sont **`snake_case`** (`owncast.chat.send_action`, `owncast.kv.get_json`). Chaque appel est soumis à la permission correspondante que vous déclarez dans votre manifeste. Voir la [référence des API](/docs/plugins/apis).
- **`filter`**, filtre les résultats retournés d'un gestionnaire `filter_chat_message` : `filter.pass_()` (underscore final, `pass` est un mot clé Python), `filter.modify(...)`, `filter.drop(reason)`.

Les charges utiles sont des objets d'attribut avec des accesseurs `snake_case` sur le JSON de transport (`msg.body`, `msg.user.display_name`, `msg.client_id`). Utilisez `msg.raw` pour le dict sous-jacent. Les appels hôtes qui renvoient des objets JSON reviennent en tant que mêmes objets d'attribut (`owncast.server.info().name`). Les listes reviennent sous forme de listes Python.

Deux autres idiomes Python qui valent la peine d'être connus, tous documentés en détail (avec des exemples Python) sur les pages de sujet :

- **Routage HTTP** : les plugins avec `http.serve` déclarent des routes avec des décorateurs : `@plugin.get/post/put/delete/patch(path)`, `@plugin.route(path, methods=[...])`, `@plugin.on_http_request(path)`, et un simple `@plugin.on_http_request` catch-all. Un gestionnaire renvoie un `dict` (`{status, body, headers}`), un `str` (→ 200), ou `None` (→ 204). Voir [Serving HTTP](/docs/plugins/http).
- **Commandes de chat** : `plugin.commands({...})` déclare des commandes avec des alias, un contrôle modérateur et des temps de cooldown par utilisateur. Le `!help` intégré les liste automatiquement. Voir [Commandes de chat](/docs/plugins/commands).

## L'interface en ligne de commande

L'installation du SDK vous donne `owncast-plugin-py`. Construire et empaqueter votre source et ne nécessite pas de compilateur. Les commandes `test` et `serve` récupèrent les binaires hôtes préconstruits (le scénario runner et le serveur de développement) lors de la première utilisation :

| Commande                              | Ce qu'elle fait                                                                                       |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `owncast-plugin-py new my-plugin`     | Créer un nouveau projet de plugin dans `./my-plugin`                                                  |
| `owncast-plugin-py build my-plugin`   | Construire `src/plugin.py` (sans empaquetage)                                      |
| `owncast-plugin-py test my-plugin`    | Construire, puis exécuter les scénarios de `__tests__/`                                               |
| `owncast-plugin-py serve my-plugin`   | Serveur de développement local (`-p/--port` pour changer le port, par défaut 8080) |
| `owncast-plugin-py package my-plugin` | Construire + empaqueter → `<slug>.ocpkg` : le fichier que vous expédiez               |

```sh
owncast-plugin-py package my-plugin    # produit my-plugin.ocpkg
owncast-plugin-py test my-plugin
owncast-plugin-py serve my-plugin      # POST /_dev/chat pour activer les gestionnaires d'événements
```

L'argument répertoire par défaut est `.`, vous pouvez donc `cd` dans le projet et l'omettre. Le `.ocpkg` est l'unique artefact de distribution. Voir [Emballage & distribution](/docs/plugins/packaging) pour ce qui est à l'intérieur et comment l'installer.

## Contraintes à connaître

Quelques choses sur la façon dont les plugins Python sont construits influencent la façon dont vous les écrivez. Vous importez `owncast_plugin` normalement pour le support de l'éditeur et les tests unitaires. La construction s'occupe du reste.

- **Uniquement du Python pur, et pas de `pip`.** Il n'y a pas d'étape `pip install` : vous ajoutez du code tiers en copiant sa source (Python pur) dans votre projet. Les dépendances avec des extensions C (numpy, pandas, et similaires) ne se chargeront pas. Voir [Bibliothèques tierces](#third-party-libraries). Pour HTTP sortant, utilisez `owncast.http.fetch`, pas `requests`.
- **Ne masquez pas les noms de la bibliothèque standard.** Un `def json(...)` de niveau supérieur (ou tout autre nom de stdlib) masque le véritable module et peut briser la construction, et un fichier de module nommé d'après un module stdlib (`src/json.py`) est ignoré au profit du véritable. Nommez-les `json_response` et des choses similaires.
- **L'entrée ne peut pas utiliser d'importations relatives.** Dans `src/plugin.py`, importez vos propres modules de manière absolue (`from helpers import ...`), pas `from . import helpers`. Un import relatif là échoue la construction, bien que les importations relatives à l'intérieur des propres modules d'un package soient acceptables.
- **`snake_case` partout**, par opposition à camelCase du SDK JS : `send_action`, `get_json`, `msg.user.display_name`, `filter.pass_()`.

## Bibliothèques tierces

Il n'y a pas de `pip install` et pas de `requirements.txt`. Une bibliothèque tierce ne fonctionne que si elle est **pure Python et que vous copiez sa source dans `src/`**, où elle devient un de vos propres modules.

:::caution[pip install ne fait rien]
L'installation d'un package dans un virtualenv n'a aucun effet sur ce qui est expédié, et `import requests` échoue à l'exécution. Pour utiliser une bibliothèque, copiez son source `.py` dans `src/` (un seul module ou un répertoire de package) et importez-la.
:::

- **Les extensions C ne fonctionnent jamais.** numpy, pandas, lxml, Pydantic v2, et tout autre code compilé ne se chargera pas.
- **Vous êtes responsable de l'ensemble de l'arbre.** Si une bibliothèque que vous copiez importe d'autres packages tiers, copiez-les aussi, ou choisissez un plus petit.
- **Utilisez `owncast.http.fetch` pour HTTP sortant**, pas `requests`.

La bibliothèque standard est disponible, tant que le module est en Python pur (`json`, `re`, `datetime`, `base64`, et similaires).

Par exemple, l'exemple [`page-content-demo`](https://github.com/owncast/plugin-sdk/tree/main/examples/python/page-content-demo) nécessite une modélisation Mustache. Plutôt que de copier un package de modélisation, il expédie un petit moteur de rendu Mustache-subset qui lui est propre.

## Tests

Les tests sont des fichiers de scénario `__tests__/*.test.json` exécutés avec `owncast-plugin-py test`. Le format est **identique à celui du SDK JS**, donc un port Python d'un plugin peut réutiliser les scénarios de test de la version JS tels quels. Chaque scénario envoie des événements / requêtes HTTP et affirme les effets secondaires observés (`chatSends`, écritures kv, réponses HTTP, …).

```json
[
  {
    "name": "répète le message",
    "events": [
      {
        "event": "chat.message.received",
        "payload": { "user": { "id": "u1", "displayName": "alice" }, "body": "salut" }
      }
    ],
    "expect": { "chatSends": ["alice a dit : salut"] }
  }
]
```

Le modèle de données complet du scénario (types d'étapes, état `given`, assertions `expect`) est sur la page [Testing](/docs/plugins/testing). Notez que le JSON du scénario utilise les noms de champs **wire** (camelCase : `displayName`, `clientId`), car il décrit les événements hôtes, et non votre code Python.

## Statut

L'exécution, l'interface en ligne de commande `owncast-plugin-py` (créer, construire, tester, servir, empaqueter), l'intégralité de l'API hôte, le routage HTTP, et l'emballage `.ocpkg` fonctionnent tous aujourd'hui. Tous les plugins d'exemple JS ont des équivalents Python sous [`examples/python/`](https://github.com/owncast/plugin-sdk/tree/main/examples/python).

## Où aller ensuite

- [Référence des gestionnaires](/docs/plugins/events) : chaque événement auquel vous pouvez vous abonner (lisez les noms en `snake_case`).
- [Référence des API](/docs/plugins/apis) : chaque méthode `owncast.*` et la permission dont elle a besoin.
- [Testing](/docs/plugins/testing) : le modèle de données complet du scénario.
- [Emballage & distribution](/docs/plugins/packaging) : construction du `.ocpkg` et installation.
- [Exemples de plugins Python](https://github.com/owncast/plugin-sdk/tree/main/examples/python) : un par fonctionnalité, chacun un point de départ complet que vous pouvez copier.
- [Source du SDK](https://github.com/owncast/plugin-sdk) : le package et la chaîne d'outils `owncast-plugin-py`.
