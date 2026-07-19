---
title: Exécuter Owncast en tant que service d'arrière-plan
description: Configurez Owncast pour qu'il s'exécute en tant que service système, démarrant automatiquement lorsque votre serveur démarre.
sidebar_position: 200
sidebar_label: Exécuter Owncast en tant que service d'arrière-plan
---

Vous pouvez exécuter Owncast sous [systemd](https://systemd.io/) afin qu'il démarre automatiquement lorsque votre machine s'allume et redémarre par elle-même en cas de plantage. Cette page est destinée aux serveurs Linux exécutant systemd. Si vous exécutez Owncast dans un conteneur, utilisez la politique `restart: unless-stopped` de Docker à la place (voir [Exécuter Owncast dans un conteneur](/docs/getting-started/install/container)). Sur macOS, l'équivalent est un agent `launchd`.

## Créer le fichier de service

Créer un fichier à `/etc/systemd/system/owncast.service` avec ce qui suit. Changez `WorkingDirectory`, `ExecStart`, `User` et `Group` pour correspondre à l'endroit où Owncast est installé et au compte sous lequel il doit s'exécuter.

```ini
[Unit]
Description=Owncast
Après=network.target

[Service]
Type=simple
WorkingDirectory=/opt/owncast
ExecStart=/opt/owncast/owncast
User=owncast
Group=owncast
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

`WorkingDirectory` est le dossier contenant le binaire `owncast` et son répertoire `data/`. `ExecStart` est le chemin complet vers le binaire. Ne pas exécuter Owncast en tant que `root`. Créez un utilisateur dédié (par exemple `sudo useradd --system --home-dir /opt/owncast owncast`) et pointez `User`/`Group` vers celui-ci.

## Activez et démarrez-le

Rechargez systemd pour qu'il prenne en compte le nouveau fichier, puis activez et démarrez le service en une seule étape :

```sh
sudo systemctl daemon-reload
sudo systemctl enable --now owncast
```

`enable --now` démarre Owncast immédiatement et le configure pour démarrer à chaque démarrage.

## Confirmez qu'il fonctionne

```sh
systemctl status owncast
```

Vous devriez voir `actif (en cours d'exécution)`. Pour suivre les journaux en direct :

```sh
journalctl -u owncast -f
```

Une fois qu'il fonctionne, chargez votre serveur dans un navigateur sur le port `8080` pour confirmer qu'il sert.

## Renforcement (optionnel)

Le projet propose un [fichier de service d'exemple](https://github.com/owncast/owncast/blob/develop/contrib/owncast-sample.service) qui ajoute des options de sandboxing systemd :

```ini
ReadWritePaths=/opt/owncast
NoNewPrivileges=true
SecureBits=noroot
ProtectSystem=strict
ProtectHome=read-only
```

`ProtectSystem=strict` rend la plupart du système de fichiers en lecture seule, donc `ReadWritePaths` doit pointer vers votre répertoire Owncast ou le serveur ne pourra pas écrire ses `data/`. Ajoutez-les à la section `[Service]` si vous les souhaitez.

:::tip

Le [répertoire contrib](https://github.com/owncast/owncast/tree/develop/contrib) contient davantage d'exemples fournis par les utilisateurs (y compris des notes pour Windows). Ces fichiers sont contribué par la communauté et ne sont pas officiellement supportés, mais ils constituent un bon point de départ pour les configurations que cette page ne couvre pas.

:::
