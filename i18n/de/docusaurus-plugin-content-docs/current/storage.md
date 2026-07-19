---
title: Verwenden Sie Object Storage, um Bandbreite zu sparen
description: Verwenden Sie einen externen Speicheranbieter, um Ihren Owncast-Videostream zu verteilen.
sidebar_position: 500
sidebar_label: Verwenden Sie Object Storage, um Bandbreite zu sparen
---

Anstatt Videos direkt von Ihrem persönlichen Server aus zu liefern, können Sie einen S3-kompatiblen Speicheranbieter verwenden, um die Bandbreiten- und Speicheranforderungen anderswo zu entlasten. Dies ist nicht für die dauerhafte Speicherung von Aufzeichnungen oder archivarischen Zwecken gedacht, sondern nur für Live-Streams.

Um mehr darüber zu erfahren, wie Ihre Bandbreite durch Ihre Videoeinstellungen betroffen sein kann und wie die Verwendung von Object Storage bei einigen Anwendungsfällen helfen könnte, besuchen Sie die [Ressourcen und Anforderungen](/docs/resources-requirements/) Seite.

Wenn Ihr Speicheranbieter S3-kompatibel ist, funktioniert er wahrscheinlich mit Owncast. Lesen Sie die Dokumentation Ihres Anbieters, um zu lernen, wie Sie einen Object Storage-Bucket einrichten, CORS aktivieren, die Dateien öffentlich machen und die erforderlichen Anmeldeinformationen beschaffen, die Sie in Ihrer Owncast-Konfiguration verwenden müssen.

## Konfiguration

<img src="/docs/img/admin-object-storage.png" alt="Die S3 Object Storage-Registerkarte der Servereinstellungsseite, mit Feldern für Endpunkt, Zugangsschlüssel, geheimen Schlüssel, Bucket und Region" width="75%" />

1. Besuchen Sie die Einrichtungseite Ihres Owncast-Servers im Adminbereich und sehen Sie die Einstellungen für Object Storage an.
2. Aktivieren Sie es.
3. Besuchen Sie Ihren Speicheranbieter und erstellen Sie einen neuen Bucket.
4. Geben Sie den Bucket-Namen, den Zugangsschlüssel, den geheimen Schlüssel und den Endpunkt, die Sie von der Schnittstelle Ihres Object Storage-Anbieters erhalten haben, in die Owncast-Einstellungen ein. Diese müssen korrekt sein, also überprüfen Sie sie doppelt. Kontaktieren Sie den Support Ihres Speicheranbieters, wenn Sie sich nicht sicher sind, was diese sind.
5. Stellen Sie sicher, dass Ihr Bucket öffentlich zugänglich ist und jeder Dateien daraus lesen kann. Einige Speicheranbieter können Ihren Bucket standardmäßig als privat festlegen, sodass Sie diese Einstellung möglicherweise ändern müssen.
6. Wenn Ihr Speicheranbieter von Ihnen verlangt, eine Art von [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)-Richtlinie einzurichten, damit Ihre Dateien zugegriffen werden können, stellen Sie sicher, dass Sie dies tun. Besuchen Sie die Dokumentation Ihres Objekt-Speicheranbieters, um zu erfahren, wie Sie Ihre CORS-Richtlinie konfigurieren, da dies bei jedem Anbieter unterschiedlich ist. Es ist im Allgemeinen eine gute Idee, alle Ursprünge zu erlauben, aber Sie können es auf Ihren Owncast-Server beschränken, wenn Sie einen bestimmten Bedarf dafür haben und nicht antizipieren, dass Sie Ihren Stream auf anderen Webseiten verwenden. Wenn Ihr Stream nicht funktioniert und Ihr Fehlerprotokoll der Browser-Konsole Fehler über `CORS` oder `Access-Control-Allow-Origin` zeigt, ist dies wahrscheinlich das Problem. Dies ist oft sehr verbreitet, also stellen Sie sicher, dass Ihr Bucket korrekt eingerichtet ist.

### Optionale Einstellungen

Die meisten Menschen müssen diese Einstellungen nicht ändern, aber sie sind verfügbar, wenn Sie sie benötigen.

- **ACL**: Wenn Sie aufgefordert werden, eine spezifische Zugriffssteuerungsoption beim Hochladen von Dateien anzugeben, können Sie dies hier angeben. Verweisen Sie auf die Dokumentation Ihres Objekt-Speicheranbieters.
- **Pfad-Präfix**: Wenn Sie Ihre Dateien in einem Unterverzeichnis innerhalb Ihres Buckets speichern möchten, können Sie dies hier angeben. Wenn Sie beispielsweise Ihre Dateien in einem Ordner namens `mystream` speichern möchten, würden Sie `mystream` hier eingeben. Dies ist nur nützlich, wenn Sie einen einzelnen Bucket für mehrere Zwecke verwenden oder mehrere Owncast-Server auf denselben Bucket zeigen.
- **Pfad-Stil-Konfiguration**: Einige Speicheranbieter, wie Oracle Cloud Objects, erfordern, dass die Option "Pfad-Stil" konfiguriert ist. Verweisen Sie auf die Dokumentation Ihres Speicheranbieters, um zu erfahren, ob dies erforderlich ist.

