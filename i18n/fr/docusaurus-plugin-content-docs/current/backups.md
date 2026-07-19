---
title: Sauvegarder vos données et votre configuration de flux
description: Owncast effectue des sauvegardes périodiques de vos données qui peuvent être restaurées.
sidebar_position: 1100
sidebar_label: Sauvegarder vos données et votre configuration de flux
---

Owncast créera une sauvegarde de vos données périodiquement. Cela peut être trouvé dans votre répertoire `backup` sous le nom `owncastdb.bak`. Vous pouvez ajouter cela à vos sauvegardes système normales pour garder vos données Owncast en sécurité.

## Restaurer

Restaurer un fichier de sauvegarde Owncast vous ramènera à l'époque où la sauvegarde a été créée. C'est utile si vous souhaitez transférer des données vers une autre machine, si vous voulez revenir dans le temps pour une raison quelconque ou s'il y a un problème que vous cherchez à résoudre.

:::warning
Restaurer remplace votre base de données actuelle par le contenu de la sauvegarde. Tout ce qui a changé depuis que la sauvegarde a été effectuée est perdu. Si vous pourriez avoir besoin des données actuelles, copiez-les quelque part en sécurité avant de restaurer.
:::

1. Arrêtez Owncast.
2. Depuis votre répertoire Owncast, exécutez `./owncast --restoreDatabase <backupfile>`.
3. Redémarrez Owncast comme vous le feriez normalement. Il utilisera les données restaurées.
