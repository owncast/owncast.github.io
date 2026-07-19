---
title: Ändern Sie Ihren Streaming-Schlüssel und das Admin-Passwort
description: Ändern Sie den Schlüssel, den Sie für das Streaming und das Einloggen als Administrator verwenden.
unlisted: true
related:
  excludeFromAll: true
tags:
  - Admin
  - Schlüssel
  - Passwort
---

## Der Admin

Sie können das Admin-Passwort festlegen und Stream-Schlüssel in den Servereinstellungen hinzufügen.

<img src="/docs/img/admin-stream-keys.png" alt="Die Stream-Schlüssel-Registerkarte der Servereinstellungen-Seite, die den Standard-Stream-Schlüssel und einen Button zum Hinzufügen weiterer anzeigt" width="80%" />

## Stream-Schlüssel

### Befehlszeilen-Flag

Sie können zur Laufzeit mit dem Befehlszeilen-Flag `--streamkey` einen einzelnen gültigen Stream-Schlüssel festlegen. Führen Sie Owncast mit `--help` aus, um alle verfügbaren Optionen zu sehen.

1. Stoppen Sie den Dienst.
2. Führen Sie `owncast --streamkey newkey` aus

Dies wird Owncast mit Ihrem neuen Stream-Schlüssel starten.

## Admin-Passwort

Sie können das Admin-Passwort zur Laufzeit mit dem Befehlszeilen-Flag `--adminpassword` festlegen. Führen Sie Owncast mit `--help` aus, um alle verfügbaren Optionen zu sehen.
