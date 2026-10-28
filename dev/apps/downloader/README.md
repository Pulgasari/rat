# downloader

ported from `zugriff/apps/downloader`.

Paste or share links, they become packages: a queue fetches them resumably and
puts the files where they belong. Adding a source is one plugin file.

## features

- **grabber**: links from pasted text, the clipboard, a drop on the app or a
  share into it (the manifest's `share_target`). the plugins say what each one
  is, what belongs together becomes one package (the parts of an archive, the
  files of a release, a directory listing), the user looks and starts
- **queue**: at most n at once and m per host, retries with backoff, `Retry-After`
  honoured, a speed limit for all, pause, resume, cancel, a swipe left removes
- **resume**: the bytes go to the opfs as they arrive, a stop or a crash keeps
  them, the next try asks for the rest with `Range` and `If-Range`
- **hls**: the best variant of a playlist, its segments joined into one file,
  resumed from the first segment not written. encrypted streams are refused
- **check**: a sha hash a plugin knows is compared at the end
- **targets**: the library (the opfs, shown and saved from the app), a granted
  folder, a webdav place, the browser's own download. a folder per package
  if wanted
- **plugins** built in: hls, github releases, archive.org items, link lists,
  feeds (their enclosures), apache and nginx index pages. the user's own by
  url, each in a worker of its own

## a plugin

```js
export default {
  name  : 'github releases',
  match : url => /github\.com\/[^/]+\/[^/]+\/releases/.test(url),

  // the files behind a link. ctx.text and ctx.json go through the app's transport
  async resolve (url, ctx) {
    const release = await ctx.json(api(url));
    return release.assets.map(asset => ({ name: asset.name, size: asset.size, url: asset.browser_download_url }));
  },
};
```

an entry may carry `kind: 'hls'`, `hash: { algorithm: 'SHA-256', value }` and
`group`, the name of the package it goes into.

## transports

| where     | how |
|-----------|-----|
| browser   | `fetch`, streamed with progress. cors decides: a host without cors headers fails, the error says so |
| capacitor | `NativeHttp` (`.github/capacitor/plugins/`), no cors, the body in one piece |

## files

| file | what it is |
|---|---|
| `app.rat.html` | the views, the dock, the context area with the download, the settings |
| `state.rat.js` | the queue and the library as packages, the download shown, links in from share, paste and drop |
| `settings.rat.js` | the queue's settings, the webdav place and the user's plugins, kept |
| `views/` | `QueueView`, `GrabView`, `LibraryView` |
| `components/` | `PackageCard`, `DownloadRow`, `FoundPackage`, `Detail`, `Preferences` |
| `modules/engine.js` | the queue, transports, resume, hls, check, targets. rows and packages are tables of `RAT.app.database`, the folder target is `RAT.app.folders` |
| `modules/grabber.js` | urls to packages |
| `modules/plugins.js` | built-in plugins, the user's in workers |
| `modules/plugin-worker.js` | one user plugin, away from the page |

## open

- segments: a file in a few ranges at once
- background fetch in the browser, android's `DownloadManager` for long downloads
- unzip and rename after a download, dash streams
