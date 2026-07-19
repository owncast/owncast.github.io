---
title: Öffentliche Assets hosten
description: Stellen Sie Ihre eigenen Dateien öffentlich zur Verfügung.
sidebar_position: 200
sidebar_label: Öffentliche Assets hosten
---

Durch die Erstellung eines Verzeichnisses `data/public` und das Ablegen Ihrer eigenen Dateien dort können Sie alle Assets bereitstellen, die Sie aus beliebigen Gründen öffentlich zugänglich machen möchten.

Danach können Sie auf diese Assets über den Pfad `/public` auf Ihrem Owncast-Webserver zugreifen. Zum Beispiel:

`https://stream.example.com/public/image.png`

`https://stream.example.com/public/style.css`

Einige Beispiele für Gründe, warum Sie dies nutzen möchten:

- Ein CSS-Schriftart verfügbar machen, damit Sie sie in Ihrem benutzerdefinierten CSS referenzieren können.
- Sie haben Bilder, die Sie in Ihrem Seiteninhalt verwenden möchten.
- Einige beliebige Dateien, die Sie wünschen, dass die Leute herunterladen, haben keinen anderen Ort, an dem sie gehostet werden können.
