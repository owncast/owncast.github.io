---
title: Zeigen Sie, woher Ihre Zuschauer kommen
description: Anzeige von hochrangigen geografischen Informationen darüber, woher Ihre aktuellen Zuschauer sich verbinden.
sidebar_position: 600
sidebar_label: Zeigen Sie, woher Ihre Zuschauer kommen
---

Owncast kann hochrangige geografische Informationen über Ihre aktuellen Zuschauer anzeigen, wenn Sie es in Ihrer Instanz aktivieren.

Ihr Server kann optional die [MaxMind GeoLite2 Datenbank](https://dev.maxmind.com/geoip/geolocate-an-ip/databases/) verwenden. Wenn Sie Ihre eigene kostenlose Kopie der Datenbank bereitstellen, wird diese verwendet. Führen Sie Folgendes aus, um dieses Feature hinzuzufügen.

1. [Erstellen Sie ein kostenloses Konto](https://www.maxmind.com/en/geolite2/signup) bei MaxMind.
2. Warten Sie auf eine E-Mail und folgen Sie dem Link zu Ihrem Konto.
3. Unter `Datenbankprodukte und Abonnements` klicken Sie auf `Datenbanken herunterladen`.
4. Laden Sie `GeoLite2 City (GeoIP2 Binary .mmdb)` herunter.
5. Entpacken Sie die Datei und legen Sie die `GeoLite2-City.mmdb`-Datei in das `data`-Verzeichnis Ihres Owncast-Servers. Erstellen Sie dieses Verzeichnis bei Bedarf.
6. Starten Sie Ihren Owncast-Dienst neu.

