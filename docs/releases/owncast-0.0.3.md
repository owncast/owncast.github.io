---
slug: /releases/owncast-0.0.3
title: Owncast v0.0.3
date: 2020-12-14
description: "0.0.3 has a new admin dashboard to help get an overview of the configuration and performance of your Owncast server along with handfuls of additional updates."
contributors: ["Gabe Kangas"]
---

[v0.0.3](https://github.com/owncast/owncast/milestone/3?closed=1) has a new admin dashboard to help get an overview of the configuration and performance of your Owncast server along with handfuls of additional updates.

## Owncast Admin

![](/images/owncast-admin-0.0.3.png)

[v0.0.3](https://github.com/owncast/owncast/milestone/3?closed=1) introduces the web admin dashboard that you can use to get an overview of your owncast server.

Visit `/admin` and login with `admin` as the username and your stream key as the password.

We will continue to add functionality to this over time, so please [let us know how it works for you and if you have any feedback](https://github.com/owncast/owncast/discussions).

## Upgrade instructions from 0.0.2

1. Stop the service from running.
1. Backup your `config.yaml` and any other files you may have customized and want to save or refer to later.
1. Move the zip file of 0.0.3 to your previous install location.
1. Unzip the file, allowing it to overwrite old files.
1. Edit your `config.yaml` file and change the `logo` entry to be a single item, no longer a `small` and `large`. If you're using the default then it should look like the following: `logo: /img/logo.svg`. Take note the old `logo` images have been changed to `logo.svg`.
1. Move the `stats.json` file to `data`.
1. Move your `content.md` file to `data` if you have one.
1. Restart the service.

## Breaking changes

- How your logo is set in the config file has changed. See upgrade instructions.
- `chat.db` has been renamed to `owncast.db` and moved to the `data` directory. You should delete your old `chat.db` file.
- `content.md` has moved to to `/data`.
- `stats.json` has moved to `/data`.
- Optional `chatDatabase` command line flag is moved to `database`. `chatDatabaseFile` in config changed to `databaseFile`.


## Changelog

* Fixes for possible bugs in username highlighting in chat. [#156](https://github.com/owncast/owncast/issues/156)
* Logo requirements have been simplified to only require a single logo to be specified in the config. [#373](https://github.com/owncast/owncast/issues/373)
* Viewer counts are now limited to the number of people viewing from the owncast web interface. [#323](https://github.com/owncast/owncast/issues/323)
* Stream length can now specify "days". [#307](https://github.com/owncast/owncast/issues/307)
* Fix for the video thumbnail flickering as it updates. [#205](https://github.com/owncast/owncast/issues/205)
* Placing a copy of `ffmpeg` into the same directory as owncast will now use that copy. [#276](https://github.com/owncast/owncast/issues/276)
* Updated chat message design with removed avatars. [#253](https://github.com/owncast/owncast/issues/253) [#222](https://github.com/owncast/owncast/issues/222) [#119](https://github.com/owncast/owncast/issues/119)
* Removed need for client-side markdown parsing. [#235](https://github.com/owncast/owncast/issues/235)
* Fix for an exception being thrown when zero `socialHandles` are supplied. [#202](https://github.com/owncast/owncast/issues/202)
* Video player volume is now saved when changing it. [#175](https://github.com/owncast/owncast/issues/175)
* The web app Javascript assets are no longer being pulled from a remote CDN. [#189](https://github.com/owncast/owncast/issues/189) 
* Fix for video getting cut off on Firefox. [#210](https://github.com/owncast/owncast/issues/210) 
* Large play button is re-displayed when the video player is paused. [#201](https://github.com/owncast/owncast/issues/201) 
* Seek bar has been removed from the player. [#171](https://github.com/owncast/owncast/issues/171)
* Fix for crash when some RTMP sources send unexpected payloads. [#340](https://github.com/owncast/owncast/issues/340) 
* An internal refactor of the video pipeline. [#151](https://github.com/owncast/owncast/issues/151)
* `offlineContent` is no longer specified in the config file.

## APIs

This release added some basic read-only APIs for use in the new admin dashboards. They are authenticated against your stream key just like the admin site is.

You can find the complete set of APIs by visiting the API documentation.

API Documentation
