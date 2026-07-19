---
title: Plugins
description: Eine Übersicht über die Owncast-Plugins, was sie für deinen Stream tun können und wie man eines vom Admin installiert.
sidebar_position: 250
sidebar_label: Plugins
tags:
  - plugins
  - erweitern
  - Bots
  - Overlays
  - Integrationen
---

Plugins ermöglichen es dir, neues Verhalten zu deinem Owncast-Server hinzuzufügen, ohne selbst Code schreiben zu müssen. Sie sind kleine Add-ons, die innerhalb von Owncast ausgeführt werden und auf Chat, Zuschauer, Streamereignisse und das Fediverse reagieren können. Ein Plugin wird als eine einzelne `.ocpkg`-Datei bereitgestellt, die du vom Admin hochlädst.

Es ist noch sehr früh im Plugin-Ökosystem. Die API ist neu und entwickelt sich weiter, und es gibt heute nur wenige Plugins. Aber es gibt viel, was du mit ihnen tun kannst: Chatbots, Stream-Overlays, benutzerdefinierte Integrationen mit anderen Diensten und mehr. Wenn du eine Idee für ein Plugin hast, das du gerne sehen würdest, teile sie mit der [Community](/chat?tab=community).

## Was kann ein Plugin tun?

Ein Plugin kann:

- Einen **Chatbot** hinzufügen, der auf Befehle antwortet, Erinnerungen postet oder Spam entfernt.
- Ein **Stream-Overlay** hinzufügen, das du als Browsersource (Live-Chat-Overlays, Zuschauerzähler, Benachrichtigungen usw.) in OBS einfügen kannst.
- **Owncast mit anderen Diensten verbinden** wie Discord, dem Fediverse oder deinen eigenen Webhooks, damit das Livegehen oder ein neuer Follower etwas anderes auslöst.
- **Benutzerdefinierte UI-Schaltflächen** hinzufügen, die auf deinen Store, die Spendenseite, den Zeitplan oder etwas anderes verlinken.

Der Plugin-Autor entscheidet, was sein Plugin tut. Du entscheidest, ob du es installieren möchtest.

## Wie ein Plugin um Erlaubnis bittet

Bevor ein Plugin etwas Sensibles tun kann, muss es dies erklären. Wenn du ein Plugin installierst, zeigt dir die Administration eine **Berechtigungs**-Liste, in einfacher Sprache, über jede Fähigkeit, die das Plugin nutzen wird: Dinge wie "Chat-Nachrichten als die Bot-Identität des Plugins posten" oder "Ausgehende HTTP-Anfragen an andere Dienste senden". Du überprüfst diese Liste und entscheidest, ob du das Plugin aktivieren möchtest.

![Das Berechtigungsfenster, das Owncast beim Installieren eines Plugins zeigt](/docs/img/plugins-permissions.png)

Wenn das Plugin später aktualisiert wird und um **mehr** Zugriff als zuvor bittet, pausiert Owncast das Plugin und zeigt ein "Benötigt erneute Genehmigung"-Badge an. Das Plugin wird erst wieder ausgeführt, wenn du die neuen Berechtigungen überprüfst und genehmigst. Deine bestehenden Genehmigungen erweitern sich niemals stillschweigend.

## Ein Plugin installieren

Öffne **Plugins** im Admin-Seitenmenü. Es gibt zwei Möglichkeiten, eines hinzuzufügen.

**Durchsuche den Katalog.** Der **Durchsuchen**-Reiter listet Plugins auf, die im öffentlichen Verzeichnis veröffentlicht sind. Jede Karte zeigt, was das Plugin tut, wer es gebaut hat und welche Berechtigungen es anfordert. Klicke auf **Installieren** bei einem von ihnen, und Owncast lädt es für dich herunter.

![Der Plugin-Katalog im Owncast-Admin-Durchsuchen-Reiter](/docs/img/plugins-browse.png)

**Lade dein eigenes hoch.** Im **Installiert**-Reiter klickst du auf **Plugin hochladen** und wählst eine `.ocpkg`-Datei aus. Verwende dies für ein Plugin, das du selbst erstellt hast oder das du aus einer anderen Quelle als dem Katalog erhalten hast.

Wie auch immer, Owncast zeigt dir die BerechtigungsListe des Plugins an und fragt, ob du es aktivieren möchtest. Aktiviere **Aktiviert**, um es zu laden. Das Plugin überlebt Neustarts, sodass du es nach einem Neustart nicht erneut aktivieren musst.

## Deaktivieren und Entfernen

- **Deaktivieren** hält das Plugin installiert, verhindert jedoch, dass es läuft. Aktiviere **Aktiviert** wieder, um es erneut zu laden.
- **Deinstallieren** entfernt das Plugin vollständig. Klicke auf der **Plugins**-Seite auf das Papierkorbsymbol in seiner Zeile und bestätige. Die Datei des Plugins wird vom Server entfernt und es hört sofort auf, etwas zu tun.

## Chat-Befehle und `!help`

Viele Plugins fügen Chat-Befehle hinzu. Dies sind kurze Nachrichten, die mit einem Präfix beginnen, normalerweise `!`, das einem Plugin sagt, etwas zu tun. Das Timer-Bot-Beispiel unten fügt `!remind`, `!countdown` und ein paar andere hinzu. Ein Zuschauer tippt den Befehl ein, und das Plugin antwortet im Chat.

Du musst dir nicht merken, was jedes Plugin bietet. Owncast hat einen eingebauten `!help`-Befehl. Jeder im Chat kann `!help` (oder `!commands`) eingeben, und Owncast antwortet mit einer einzelnen Nachricht, die jeden Befehl aus deinen aktivierten Plugins auflistet, gruppiert nach Plugin, jeweils mit einer kurzen Beschreibung.

![Chat zeigt den !help-Befehl und das Timer-Bot-Plugin in Benutzung](/docs/img/plugins-chat-help.png)

Einige Dinge, die es wert sind, über `!help` zu wissen:

- **Owncast baut die Liste, nicht ein Plugin.** Kein Plugin kann `!help` überschreiben, und die Liste spiegelt immer genau die Befehle wider, die deine derzeit aktivierten Plugins bereitstellen. Installiere ein Plugin, das Befehle hinzufügt, und sie erscheinen sofort in `!help` . Deaktiviere es, und sie verschwinden.
- **Plugins bewerben ihre eigenen Befehle.** Ein Plugin erklärt seine Befehle und ihre Beschreibungen, sodass du nichts konfigurieren musst. Die Beschreibungen, die du in `!help` siehst, stammen direkt vom Plugin.
- **Moderatorbefehle bleiben verborgen.** Befehle, die ein Plugin als moderator-exklusiv kennzeichnet, erscheinen nur in `!help` für deine Moderatoren.

## Woher kommen Plugins?

Plugins werden von ihren Autoren erstellt und geteilt.

Wenn du ein Drittanbieter-Plugin installierst, ist die **Berechtigungs**-Liste deine Vertrauensgrenze. Wenn ein Plugin um mehr Zugriff als erwartet bittet, ist es empfehlenswert, es vor der Aktivierung noch einmal zu überprüfen.

## Möchtest du eines bauen?

Die vollständige Entwicklerm Dokumentation findest du unter [Benutzerdefinierte Plugins erstellen](/docs/plugins).
