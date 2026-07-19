---
title: Owncast als Hintergrunddienst ausführen
description: Richten Sie Owncast ein, damit es als Systemdienst läuft und beim Start Ihres Servers automatisch gestartet wird.
sidebar_position: 200
sidebar_label: Owncast als Hintergrunddienst ausführen
---

Sie können Owncast unter [systemd](https://systemd.io/) ausführen, sodass es automatisch startet, wenn Ihre Maschine bootet, und von selbst neu startet, falls es abstürzt. Diese Seite ist für Linux-Server, die systemd ausführen. Wenn Sie Owncast in einem Container ausführen, verwenden Sie stattdessen die Docker-Richtlinie `restart: unless-stopped` (siehe [Owncast in einem Container ausführen](/docs/getting-started/install/container)). Unter macOS entspricht dies einem `launchd`-Agenten.

## Die Dienstdatei erstellen

Erstellen Sie eine Datei unter `/etc/systemd/system/owncast.service` mit folgendem Inhalt. Ändern Sie `WorkingDirectory`, `ExecStart`, `User` und `Group`, um mit dem Speicherort von Owncast und dem Konto, unter dem es ausgeführt werden soll, übereinzustimmen.

```ini
[Unit]
Description=Owncast
After=network.target

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

`WorkingDirectory` ist der Ordner, der die `owncast`-Binary und das Verzeichnis `data/` enthält. `ExecStart` ist der vollständige Pfad zur Binary. Führen Sie Owncast nicht als `root` aus. Erstellen Sie einen dedizierten Benutzer (zum Beispiel `sudo useradd --system --home-dir /opt/owncast owncast`) und weisen Sie `User`/`Group` darauf hin.

## Aktivieren und starten Sie es

Laden Sie systemd neu, damit es die neue Datei erkennt, und aktivieren und starten Sie den Dienst in einem Schritt:

```sh
sudo systemctl daemon-reload
sudo systemctl enable --now owncast
```

`enable --now` startet Owncast sofort und legt fest, dass es bei jedem Boot startet.

## Bestätigen Sie, dass es läuft

```sh
systemctl status owncast
```

Sie sollten `active (running)` sehen. Um die Protokolle live zu verfolgen:

```sh
journalctl -u owncast -f
```

Sobald es läuft, laden Sie Ihren Server in einem Browser auf Port `8080`, um zu bestätigen, dass es dient.

## Härtung (optional)

Das Projekt liefert eine [Beispiel-Dienstdatei](https://github.com/owncast/owncast/blob/develop/contrib/owncast-sample.service), die systemd-Sandboxing-Optionen hinzufügt:

```ini
ReadWritePaths=/opt/owncast
NoNewPrivileges=true
SecureBits=noroot
ProtectSystem=strict
ProtectHome=read-only
```

`ProtectSystem=strict` macht den größten Teil des Dateisystems schreibgeschützt, sodass `ReadWritePaths` auf Ihr Owncast-Verzeichnis verweisen muss oder der Server kann sein `data/` nicht schreiben. Fügen Sie diese zum Abschnitt `[Service]` hinzu, wenn Sie dies wünschen.

:::tip

Das [contrib-Verzeichnis](https://github.com/owncast/owncast/tree/develop/contrib) enthält weitere von Benutzern bereitgestellte Beispiele (einschließlich Notizen für Windows). Diese Dateien werden von der Community bereitgestellt und nicht offiziell unterstützt, sind jedoch ein guter Ausgangspunkt für Setups, die diese Seite nicht behandelt.

:::
