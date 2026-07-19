---
title: Möglichkeiten, Owncast zu erweitern
description: Bauen Sie auf Owncast mit Plugins auf, die im Server laufen, oder mit Web-APIs und Webhooks für Code, den Sie anderswo ausführen.
---

Es gibt zwei Möglichkeiten, auf Owncast aufzubauen, und die richtige hängt davon ab, wo Ihr Code ausgeführt wird.

[**Plugins**](/docs/plugins) laufen im Owncast-Server. Der Server lädt sie zur Laufzeit, sandboxt sie und übergibt ihnen Ereignisse, während sie auftreten: Chatnachrichten, Stream-Start und -Stopp, Fediverse-Aktivitäten und HTTP-Anfragen. Ein Plugin kann seine eigene Admin-Oberfläche hinzufügen und Endpunkte bereitstellen, ohne dass Sie etwas separat hosten müssen. Greifen Sie zu einem Plugin, wenn das Verhalten zum Server gehört, wie zum Beispiel ein Chatbot, eine Moderationsregel oder ein benutzerdefiniertes Admin-Panel.

[**Web-APIs und Webhooks**](/docs/api) verbinden Owncast mit Code, den Sie irgendwo anders ausführen. [Webhooks](/docs/api/webhooks) leiten Ereignisse an Ihre Anwendung weiter, wenn etwas im Stream passiert. Die Web-APIs ermöglichen es Ihrer Anwendung, Aktionen zurückzusenden, wie das Posten einer Chatnachricht, authentifiziert mit einem Zugriffstoken. Greifen Sie auf diese zurück, wenn Sie bereits einen Dienst betreiben, wenn Sie Owncast in ein Drittanbieter-Tool integrieren oder wenn die Integration außerhalb des Servers stattfinden sollte.

Beide können gleichzeitig ausgeführt werden und auf dieselben Ereignisse reagieren. Owncast spricht auch ActivityPub, sodass Ihr Server ohne zusätzlichen Code mit dem Fediverse föderiert.
