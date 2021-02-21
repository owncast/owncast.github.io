---
title: "Run as a system service"
menu:
  docs:
    parent: "guides"
weight: 200
toc: true
---

You can optionally setup Owncast to run under [systemd](https://systemd.io/) so it's a managed service on your machine that automatically starts when your machine does.

A full example can be found [here](https://github.com/owncast/owncast/blob/master/examples/owncast-sample.service).

{{< highlight ini >}}
[Unit]
Description=Owncast Service
{{< / highlight >}}

This is where the "functional" parts of the service live.<br />
{{< highlight ini >}}
[Service]
Type=simple
WorkingDirectory=[path_to_owncast_root_directory]
ExecStart=[path_to_owncast_executable]
Restart=on-failure
RestartSec=5
{{< / highlight >}}

`WorkingDirectory` should be where you want the owncast folder to live.<br />

**Example:**<br />
```WorkingDirectory=/home/myuser/owncast```

Similarly the `ExecStart` is the actual owncast binary.<br />

**Example:**<br />
```ExecStart=/home/myuser/owncast/owncast```

{{< highlight ini >}}
[Install]
WantedBy=multi-user.target
{{< / highlight >}}

This just means, use runlevel 3 non-graphical.


**INSTALLATION**
Just create the file in your systemd configuration directory (typically /etc/systemd/system/), and update the systemd daemon with:
```sudo systemd daemon-reload```

**USAGE**
Currently the following options work
- Start
- Stop
- Status
