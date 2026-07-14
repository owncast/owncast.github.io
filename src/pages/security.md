---
title: Security
description: Report an Owncast security issue and see the researchers who have helped make Owncast safer.
---

# Security

Report suspected security issues privately to [security@owncast.online](mailto:security@owncast.online). Do not open a public GitHub issue.

Include the affected Owncast version, steps to reproduce the issue, its potential impact, and any proof of concept that helps explain the report. Test only systems you own or have permission to test. Do not access other people's data or disrupt a service.

Please allow time for the issue to be investigated and fixed before sharing it publicly. Reports made in good faith and within this scope are welcome.

## In scope

- Security vulnerabilities in the latest stable Owncast release or the current `develop` branch.
- The Owncast server, viewer and admin interfaces, bundled APIs, chat, federation, authentication, and streaming features.
- Vulnerabilities in third-party dependencies that can be exploited through Owncast.
- Owncast-operated services under `owncast.online` when tested without disrupting the service or accessing other people's data.

## Out of scope

- Independently operated Owncast instances and the content they stream. Contact that server's operator instead.
- Issues that only affect an outdated Owncast version and are already fixed in the latest release.
- Expected actions available to an authorized server administrator that do not cross a security boundary.
- Self-XSS, best-practice suggestions, or automated scanner output without a reproducible security impact.
- Vulnerabilities in third-party software that cannot be exploited through Owncast.
- Social engineering, phishing, physical attacks, denial-of-service testing, or high-volume automated scanning.

## Credit

With the reporter's permission, Owncast credits valid security reports after a fix is available. Credit can include the reporter's chosen name and one link. Reporters may remain anonymous.

Owncast handles new reports by email and does not publish new GitHub Security Advisories as part of this process. CVEs may be requested when the severity and impact warrant one, at the project's discretion.

## Acknowledgments

Thank you to the people and teams who have responsibly reported security issues and helped make Owncast safer.

- [intrigus-lgtm](https://github.com/intrigus-lgtm), unsafe inline content in chat ([CVE-2021-39183](https://www.cve.org/CVERecord?id=CVE-2021-39183))
- [Oxeye Security](https://www.ox.security/), server-side request forgery ([CVE-2023-3188](https://www.cve.org/CVERecord?id=CVE-2023-3188))
- [Kevin Stubbings](https://github.com/Kwstubbs), cross-origin request handling ([CVE-2024-29026](https://www.cve.org/CVERecord?id=CVE-2024-29026))
- [Tony Torralba](https://github.com/atorralba), arbitrary file deletion ([CVE-2024-31450](https://www.cve.org/CVERecord?id=CVE-2024-31450))
