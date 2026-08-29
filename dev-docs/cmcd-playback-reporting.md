---
title: "CMCD playback reporting"
slug: /cmcd-playback-reporting
displayed_sidebar: devSidebar
custom_edit_url: "https://project.owncast.tv/s/dev-docs/p/cmcd-playback-reporting-wvUvZ716go"
---
Owncast records viewer playback health through Common Media Client Data (CMCD), defined by CTA-5004. Players that expose CMCD contribute their own measurements. Players that do not are observed from completed HLS segment transfers when the observation is trustworthy.

The resulting metrics feed the existing stream health overview and admin video-metrics API. The UI did not need a second reporting model, it simply gained coverage for more viewers.

## Report paths

### Request mode

Owncast reads CMCD from every served HLS playlist and segment request. Both CMCD v1 and v2 can send the dictionary through the URL's `CMCD` query parameter or split it across `CMCD-Request`, `CMCD-Object`, `CMCD-Status`, and `CMCD-Session` headers.

Request mode works without a collector call. It is how hls.js, and other CMCD-capable players, can report while requesting media. CMCD v1 has request mode but no event or response reporting modes.

### CMCD v2 collector

CMCD v2 event and response reports go to `/api/metrics/cmcd`. The endpoint accepts:

- `POST` with one JSON report object or an array of report objects
- `GET` with a CMCD dictionary in the `CMCD` query parameter
- cross-origin requests, including the `OPTIONS` preflight needed by embedded players

The JSON body is limited to 64 KiB. A request with no usable CMCD report returns `400`. This endpoint maps recognized keys from either CMCD version. It does not require a version field before accepting a report.

A player that successfully reports to the collector is treated as self-reporting for 30 seconds. During that interval Owncast does not replace its client measurements with server-side observations from segment delivery.

### Server-side fallback

Safari's native HLS player, VLC, mpv, ffmpeg, and similar clients may not send CMCD. Owncast times completed segment responses for those viewers and records server-observed bandwidth and download duration.

A fallback sample is discarded when any of these conditions apply:

- The segment is smaller than 64 KiB.
- The transfer takes at least three times the segment duration. A paused or backgrounded client can stop reading its socket and looks like a slow connection.
- The calculated rate exceeds 50,000 Kbps. That normally means a reverse proxy, CDN edge, or tunnel drained the server socket instead of the viewer.
- The request was canceled before the segment completed.

Server-observed speed is only meaningful when Owncast terminates the viewer connection directly. A proxy can make the fallback unavailable, but it does not affect client-reported CMCD data.

## Identity and metrics

CMCD's `sid` session identifier is the playback-metrics identity when present. It separates two players behind the same NAT, which an IP address and user agent cannot. Reports without `sid` use Owncast's request-derived client identity.

Owncast consumes the following keys:

| CMCD key | Meaning | Metric use |
| --- | --- | --- |
| `mtp` | Measured throughput in Kbps | Player bandwidth |
| `ltc` | Live latency in milliseconds | Playback latency |
| `ttlb` | Client-measured time to last byte in milliseconds | Segment download duration |
| `br` | Encoded bitrate in Kbps | Current bitrate and quality-variant changes |
| `bs` | Buffer starvation flag | Playback error count |
| `e=e` | Fatal error event | Playback error count |

A changed `br` value for the same client counts as a quality-variant change. The first value establishes a baseline. Bitrate baselines reset at each metrics-harvest window, so a switch that crosses a window boundary is not counted.

Reports with CMCD populate a zero-error entry even when they contain no error. That keeps healthy players in the denominator used by the stream health overview.

## Owncast web player

The built-in Video.js player emits CMCD v2. It gives every playlist and segment request a CMCD query parameter containing its session ID and available measurements, including throughput, selected bitrate, buffer length, and live latency.

It also sends JSON event reports to the collector when playback starts, pauses, ends, stalls, or errors. While playing, it sends a time-interval event every 10 seconds. Event reports include a sequence number and timestamp. When available, they also include media start delay, dropped-frame count, client-measured segment download duration, and the current player-state token.

Metrics reporting must never break media loading. The player catches errors while decorating requests, and the collector request is best-effort.

## Implementation map

- `webserver/handlers/hls.go` parses CMCD on HLS requests, tracks viewer activity, and starts fallback observation.
- `webserver/handlers/hlsMetrics.go` parses CMCD dictionaries, maps fields into playback metrics, and filters fallback samples.
- `webserver/handlers/cmcdCollector.go` handles the v2 collector and its CORS preflight.
- `metrics/playback.go` stores playback reports, self-reporting state, and bitrate-change baselines.
- `web/components/video/metrics/playback.js` is the built-in player's v2 request and event reporter.
- `openapi.yaml` documents `/api/metrics/cmcd`. The older `/api/metrics/playback` endpoint remains available for existing clients and is deprecated.

The implementation shipped in [owncast/owncast#5031](https://github.com/owncast/owncast/pull/5031), following [issue #5030](https://github.com/owncast/owncast/issues/5030).