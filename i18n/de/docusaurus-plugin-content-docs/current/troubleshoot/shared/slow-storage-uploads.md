---
title: ''
description: ''
unlisted: true
related:
  excludeFromAll: true
---

Wenn Sie externen Speicher verwenden, stellen Sie sicher, dass Sie schnell genug auf diesen Speicherdienst hochladen können. Andernfalls wird die Verzögerung, bis Ihre Dateien beim Speicheranbieter angekommen sind, den jeder nutzt, um das Video anzusehen, zu Pufferproblemen führen.

Wenn Sie eine langsame Upload-Verbindung haben oder zu einem externen Speicherdienst hochladen, der zu weit entfernt oder nicht für schnelle Uploads optimiert ist, kann es zu einem Problem kommen, bei dem es zu lange dauert, die Videosegmente hochzuladen, was letztendlich bedeutet, dass sie nicht schnell genug zur Verfügung stehen.

1. Überprüfen Sie, ob es einen anderen Endpunkt für Ihren Speicherdienst gibt, der möglicherweise geografisch näher bei Ihnen ist.
2. Verwenden Sie einen Speicherdienst, der so nah (physisch und logisch) ist wie Ihre Owncast-Instanz. Wenn Sie beispielsweise auf einer AWS-Maschine sind, verwenden Sie einen S3-Bucket in der gleichen Region. Wenn Sie auf Digital Ocean sind, probieren Sie DO Spaces. Aber verwenden Sie vielleicht keine DO Spaces, wenn Sie auf einer Linode-Maschine sind, verwenden Sie stattdessen Linode Object Storage. Führen Sie Owncast mit `--enableVerboseLogging` aus, um zu sehen, ob Sie irgendwelche Warnungen über langsame Uploads erhalten.
3. Versuchen Sie, Ihre Upload-Geschwindigkeit von Ihrem Serveranbieter zu erhöhen.
4. Finden Sie heraus, ob Ihr Speicherdienst etwas wie [AWS's Transfer Acceleration](https://docs.aws.amazon.com/AmazonS3/latest/dev/transfer-acceleration.html) anbietet, um (möglicherweise) die Geschwindigkeit der Uploads zu erhöhen.
5. Reduzieren Sie die Qualität Ihres Videos, damit die Videosegmente kleiner sind und weniger Zeit zum Hochladen benötigen.
