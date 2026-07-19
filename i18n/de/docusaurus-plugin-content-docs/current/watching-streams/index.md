---
id: watching-streams
title: Auf TVs und Geräten anschauen
slug: /watching-streams
sidebar_label: Überblick & allgemeine Methoden
hide_title: true
sidebar_position: 1
tags:
  - anschauen
  - tv
  - fernsehen
  - geräte
  - streaming
  - iptv
  - m3u8
description: Übersicht über alle unterstützten Geräte und Plattformen für das Anschauen von Owncast-Streams auf Fernsehern und Streaming-Geräten.
---

Es gibt zahlreiche Möglichkeiten, Owncast-Livestreams auf vielen verschiedenen Geräten anzuschauen. Dieser Abschnitt bietet detaillierte Anleitungen für jede unterstützte Plattform und jeden Gerätetyp.

:::note
Die meisten hier aufgeführten Anwendungen werden nicht von Owncast bereitgestellt, unterstützt oder beworben. Sie sollten Ihre eigenen Entscheidungen darüber treffen, welche Anwendungen Sie installieren. Die aufgelisteten Produkte sind Vorschläge, die getestet wurden und mit Owncast funktionieren. Die von Owncast erstellten und bereitgestellten sollten als Nebenprojekte betrachtet werden, um Zuschauern zu helfen.
:::

## Schnellzugriffsmethoden

### Jeder vorhandene Video-Player oder Hardware

Owncast unterstützt Video-Streaming-Standards, sodass Sie jeden Video-Player verwenden können, der HLS (HTTP Live Streaming) unterstützt, um Streams anzuschauen. Das bedeutet, dass viele bestehende Videoanwendungen, Hardware und Smart-TVs bereits Owncast-Streams abspielen können.

Installieren oder öffnen Sie eine beliebige Video-Wiedergabeanwendung für Ihre Plattform und verwenden Sie die URL `https://your-owncast-server.com/hls/stream.m3u8`, um direkt auf den Stream zuzugreifen. Das bedeutet einfach, dass Sie diese URL in den Safari-Webbrowser auf einem iPhone eingeben oder `https://your-owncast-server.com` als Link in einer iMessage an einen Freund senden. Er kann den Stream direkt in der Nachricht abspielen.

### Durchsuchen des Verzeichnisses

Wenn Ihre Anwendung das hat, was oft als "IPTV" oder M3U-Unterstützung bezeichnet wird, können Sie das Verzeichnis direkt aufrufen, indem Sie `https://owncast.directory/api/iptv` zur Anwendung hinzufügen. Nicht alle Apps unterstützen dies.

## Gerätespezifische Anleitungen

### Streaming-Boxen und -Geräte

- **[Apple TV](/docs/watching-streams/apple-tv)** - Owncasts für tvOS, VLC oder AirPlay
- **[Roku](/docs/watching-streams/roku)** - Owncasts für Roku oder AirPlay
- **[Amazon Fire TV](/docs/watching-streams/amazon-fire-tv)** - VLC für Fire TV
- **[Google TV](/docs/watching-streams/google-tv)** - VLC für Android TV

## Empfohlene Einrichtung

Für die beste Erfahrung empfehlen wir:

1. **Dediziertes Streaming-Gerät** (Apple TV, Fire TV, Roku) und eine Streaming-App anstelle von integrierten Smart-TV-Apps
2. **VLC** als universelle Lösung für die meisten Plattformen
3. **Native Owncast-Apps**, wenn verfügbar für Ihre Plattform
4. **Casting/AirPlay** von mobilen Geräten, wenn direkte Apps nicht verfügbar sind

## Brauchen Sie Hilfe?

Wenn Sie Probleme mit einer dieser Methoden haben, treten Sie unserem Community-Chat zur Unterstützung bei.
