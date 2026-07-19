---
title: Konfiguration über Runtime-Flags
description: >-
  Die Konfiguration erfolgt in der Regel über die Owncast-Verwaltungsseite, die sich auf Ihrem Server unter `/admin` befindet. Es gibt jedoch eine Reihe von Runtime-Flags, die Sie beim Starten von Owncast festlegen können, um sein Verhalten zu ändern.
sidebar_position: 100
sidebar_label: Konfiguration über Runtime-Flags
---

Die Konfiguration erfolgt in der Regel über die Owncast-Verwaltungsseite, die sich auf Ihrem Server unter `/admin` befindet. Es gibt jedoch eine Reihe von Runtime-Flags, die Sie beim Starten von Owncast festlegen können, um sein Verhalten zu ändern.

Die meisten Administratoren benötigen diese niemals. Verwenden Sie die Admin-Oberfläche für die normale Konfiguration. Die hier angegebenen Flags sind hauptsächlich für die Wiederherstellung gedacht, z. B. zum Zurücksetzen eines verlorenen Administratorkennworts oder für automatisierte Startvorgänge.

Sie können Owncast mit `--help` ausführen, um eine vollständige Liste der verfügbaren Runtime-Flags anzuzeigen.

## Admin-Kennwort

Sie können das Administratorkennwort beim Start über das Flag `--adminpassword` zurücksetzen. Dies ist die übliche Methode, um den Zugriff wiederherzustellen, wenn Sie Ihr Administratorkennwort verloren haben. Zum Beispiel:

```bash
owncast --adminpassword mynewpassword
```

## Stream-Schlüssel

Sie können beim Start einen temporären Stream-Schlüssel über das Flag `--streamkey` festlegen. Zum Beispiel:

```bash
owncast --streamkey mystreamkey
```

## Benutzerdefinierte Ports

Im Normalfall führt Owncast einen `http` Webserver auf Port `8080` und einen RTMP-Server auf Port `1935` aus. Sie können die Ports in der Admin-Oberfläche ändern. Sie müssen Owncast neu starten, damit diese Änderungen wirksam werden.

Sie können den Port auch über die Befehlszeile über die Flags `--webserverport` und `--rtmpport` festlegen. Zum Beispiel:

```bash
owncast --webserverport 9090 --rtmpport 2945
```

## Backups

Sie können angeben, wo Backups über das Flag `--backupdir` gespeichert werden. Zum Beispiel:

```bash
owncast --backupdir /path/to/backup/directory
```