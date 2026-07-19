---
title: Hervorgehobene Streams
description: Heben Sie andere Owncast-Streams auf Ihrem Server hervor, damit Besucher sie entdecken können, und haben Sie Ihren eigenen Stream, der auf anderen Servern hervorgehoben wird.
sidebar_position: 4
sidebar_label: Hervorgehobene Streams
tags:
  - hervorgehobene streams
  - Verzeichnis
  - Entdeckung
  - Föderation
  - Netzwerk
---

Hervorgehobene Streams lassen Ihren Server ein kleines Verzeichnis anderer Owncast-Streams anzeigen. Besucher erhalten eine **Hervorgehobene** Registerkarte auf Ihrer Hauptseite, die die Server auflistet, die Sie hervorheben, mit dem aktuellen oder offline Status jedes einzelnen. Es gibt den Nutzern etwas, wohin sie gehen können, wenn Sie nicht streamen, und eine Möglichkeit, verwandte Streams zu finden.

Das Hervorheben ist auf beiden Seiten freiwillig. Sie wählen aus, welche Server hervorgehoben werden sollen, und der andere Betreiber entscheidet, ob er es zulässt, dass Sie ihn hervorheben. Zwei Server können einander hervorheben, wobei jede Seite die andere unabhängig genehmigt.

:::info[Neu in Owncast 0.3.0]
Hervorgehobene Streams sind eine ganz neue Funktion in Owncast 0.3.0. Wenn Sie auf einen Fehler stoßen oder einen Vorschlag haben, öffnen Sie bitte [ein Problem](https://github.com/owncast/owncast/issues) oder [chaten Sie live mit der Community](/chat?tab=community).
:::

## Bevor Sie beginnen

Hervorgehobene Streams laufen über die gleiche Föderation, die die sozialen Funktionen von Owncast unterstützt [so:](./index.mdx)

- [Soziale Funktionen müssen aktiviert sein](./index.mdx#enabling-social-features) sowohl auf Ihrem Server als auch auf dem, den Sie hervorheben möchten.
- Der andere Server muss ebenfalls Owncast sein, in einer ausreichend aktuellen Version, um hervorgehobene Streams zu unterstützen.
- Er muss über HTTPS am Standardport (443) erreichbar sein. Ein Server, der an einem nicht standardmäßigen Port veröffentlicht ist, kann nicht hervorgehoben werden.

## Heben Sie einen anderen Stream hervor

1. Öffnen Sie im Administrationsseitenbereich **Hervorgehobene Streams**.
2. Klicken Sie auf **Live-Stream hervorheben**.
3. Geben Sie die Adresse des Servers ein, den Sie hervorheben möchten, z. B. `https://otherserver.example.com`.
4. Speichern.

<img src="/docs/img/admin-featured-streams.png" alt="Die Seite der Hervorgehobenen Streams im Adminbereich, mit einem Button Live-Stream hervorheben und Tabs für die Streams, die Sie hervorheben, und die Server, die Sie hervorheben" width="80%" />

Der Server erscheint sofort in Ihrer Liste mit dem Status **Genehmigung ausstehend**, und wird Ihren Besuchern noch nicht angezeigt. Das Hervorheben eines Servers sendet eine Anfrage, und der Betreiber dieses Servers muss sie genehmigen, bevor der Eintrag live geht. Das verhindert, dass jemand einen Server ohne dessen Zustimmung als hervorgehoben auflistet.

## Genehmigen Sie eine Anfrage, um hervorgehoben zu werden

Wenn ein anderer Server Sie hervorhebt, wird eine Anfrage unter **Hervorgehobene Streams** im Admin angezeigt. Der Punkt **Hervorgehobene Streams** im Seitenbereich trägt ein Badge mit der Anzahl der Anfragen, die auf Sie warten, sodass Sie sie bemerken, ohne nachsehen zu müssen. Genehmigen Sie eine Anfrage und dieser Server kann Sie in seinem Verzeichnis auflisten. Bis Sie genehmigen, zeigt der andere Server Ihren Eintrag als ausstehend an und hält ihn vor seinen Besuchern verborgen.

Die Genehmigung einer Anfrage ist vom regulären Follower zu unterscheiden. Ein Server, der Sie hervorhebt, erscheint nicht in Ihrer Follower-Liste oder -Anzahl.

Sie können jedes Verzeichnis sehen, das Sie derzeit hervorhebt, und eines davon entfernen, unter dem Tab **Sie hervorheben** im Adminbereich der Follower. Das Entfernen eines Stops sendet ihm Ihren Stream-Status, sodass Ihr Eintrag aus diesem Verzeichnis entfernt wird.

## Was Ihre Besucher sehen

Sobald ein Server, den Sie hervorheben, die Anfrage genehmigt hat, wird er auf der Registerkarte **Hervorgehoben** Ihrer Hauptseite angezeigt:

- Live-Server zeigen eine Thumbnail des aktuellen Streams zusammen mit seinem Titel und werden nach oben sortiert.
- Offline-Server zeigen das Logo des Servers an.
- Jede Karte zeigt den Servernamen und seine Adresse und verlinkt zu diesem Server, sodass der Besucher ihn anschauen kann.

Die Registerkarte aktualisiert sich etwa einmal pro Minute von selbst, sodass ein hervorgehobener Server, der live oder offline geht, angezeigt wird, ohne dass jemand die Seite neu laden muss.

Der Status eines Servers folgt dem, was tatsächlich passiert:

- Er zeigt sich live innerhalb von etwa einer Minute, nachdem der Stream begonnen hat.
- Er wechselt sofort zurück zu offline, sobald dieser Stream endet.
- Wenn ein hervorgehobener Server ohne das saubere Beenden seines Streams verschwindet, weil er abgestürzt oder die Verbindung verloren hat, fällt sein Eintrag nach etwa zehn Minuten wieder auf offline zurück.

## Hören Sie auf, einen Stream hervorzuheben

Klicken Sie in **Hervorgehobene Streams** auf **Nicht hervorheben** neben dem Server, den Sie nicht mehr auflisten möchten. Er wird aus Ihrem Verzeichnis entfernt und Ihre Besucher sehen ihn nicht mehr.

## Erstellen Sie Ihr eigenes Verzeichnis

Hervorgehobene Streams basieren auf der ActivityPub-Unterstützung von Owncast. Wenn Sie lieber Ihr eigenes Verzeichnis oder Aggregator erstellen möchten, das live Owncast-Server verfolgt, anstatt die integrierte hervorgehobene Registerkarte zu verwenden, siehe [Ein Verzeichnis von Owncast-Streams erstellen](/docs/api/activitypub#building-a-directory-of-owncast-streams) in den ActivityPub-Protokoll-Referenzen.

Für ein vollständiges, ausführbares Beispiel siehe das [owncast-directory-example](https://github.com/owncast/owncast-directory-example) Repository. Es handelt sich um eine kleine Referenzanwendung, die Owncast-Server verfolgt, die anzeigt, welche live sind, Betreibereinreichungen entgegennimmt und eine Webseite bereitstellt, die sie auflistet. Es ist rein ein Konzeptnachweis und nicht für den Produktionsgebrauch gedacht, zeigt aber, wie die ActivityPub-API verwendet werden kann, um ein Verzeichnis von Owncast-Streams zu erstellen.
