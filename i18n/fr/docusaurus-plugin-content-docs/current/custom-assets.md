---
title: Héberger des fichiers publics
description: Rendez vos propres fichiers disponibles au public.
sidebar_position: 200
sidebar_label: Héberger des fichiers publics
---

En créant un répertoire `data/public` et en y mettant vos propres fichiers, vous pouvez servir tous les fichiers que vous souhaitez rendre publics pour n'importe quelle raison.

Ensuite, vous pourrez accéder à ces fichiers via le chemin `/public` sur votre serveur web Owncast. Par exemple :

`https://stream.example.com/public/image.png`

`https://stream.example.com/public/style.css`

Voici quelques exemples de raisons pour lesquelles vous pourriez vouloir profiter de cela :

- Rendre une police CSS disponible afin que vous puissiez la référencer dans votre CSS personnalisé.
- Vous avez des images que vous souhaitez utiliser dans le contenu de votre page.
- Certains fichiers arbitraires que vous souhaitez que les gens téléchargent n'ont pas d'autre endroit où être hébergés.
