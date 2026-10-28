# concept: downloader

the plan the app was built from. what is in it and what is open: README.md. `tools/downloader` (fetch one
url, save it) is the seed, this is what it could grow into.

a jdownloader light: paste or share links, they become packages, a queue
fetches them resumably and puts the files where they belong. not a community
of hoster plugins, but small enough that adding a source is one file.

## what the platform allows

| where     | fetching                                              | in the background |
|-----------|-------------------------------------------------------|-------------------|
| browser   | `fetch`, so cors decides: a host without cors headers needs the proxy (`.shared/js/modules/http.js`), which only suits small public files | only while the tab lives. chrome has background fetch (a service worker api) for exactly this |
| capacitor | `NativeHttp` (`.github/capacitor/plugins/`) knows no cors, any method, any header | the webview pauses with the app. long downloads want android's `DownloadManager` behind a small plugin |

so a download has a **transport**: `fetch`, `native`, `background-fetch`,
`download-manager`. the engine picks the best one the platform has, a plugin
may ask for one (a host that needs cookies, a huge file).

## the engine

- **queue**: the lanes of `apps/files/modules/tasks.js` (queued, running,
  done, failed, cancelled, a history), moved to `.shared/js/modules/tasks.js`
  so both apps share it. a lane per host, so one slow host does not block the
  others, and a limit of parallel downloads overall
- **resume**: parts are written to the opfs (`@bunker/opfs`, a directory per
  download) as they arrive. a stop or a crash keeps what is there, the next
  try asks for the rest with `Range` and `If-Range` (the etag or the last
  modified date), so a file that changed meanwhile starts over instead of
  becoming garbage
- **segments**: a host that answers `Accept-Ranges: bytes` and gives a length
  can be fetched in a few parts at once, each its own range, joined at the end
- **retry**: with backoff, a 429 or 503 honours `Retry-After`
- **limits**: a speed limit (token bucket over the stream), a pause that keeps
  the parts
- **check**: a hash given by the source (sha-256, md5 from a `.md5` next to the
  file) is compared at the end, `crypto.subtle` for sha
- **progress**: bytes, speed, eta per download and per package, from the
  stream, throttled to a few updates a second

## packages

links come in as text: pasted, dropped, from the clipboard, shared into the
app (pwa `share_target`, an android share intent in capacitor). the
**grabber** finds the urls in it, asks the plugins what each one is, and
groups what belongs together (the parts of an archive, the files of one page)
into a package with a name and a target. the user looks at the list, drops
what is not wanted, starts it.

## plugins

a plugin is one es module, loaded by url (a list in the settings), in a
worker. it never touches the page, it gets a narrow context:

```js
export default {
  name  : 'github releases',
  match : url => /github\.com\/[^/]+\/[^/]+\/releases/.test(url),

  // the files behind a link. ctx.fetch goes through the transport the app has
  async resolve (url, ctx) {
    const release = await ctx.json(api(url));
    return release.assets.map(asset => ({ name: asset.name, size: asset.size, url: asset.browser_download_url }));
  },
};
```

kinds, all optional in one module:

- **resolve**: a page or link to the files behind it (a release, an archive.org
  item, a podcast feed, a directory listing, a json api)
- **stream**: a format that is not one file: hls (`.m3u8`, its segments
  fetched and joined, `ts` and fmp4 both just concatenate), dash later
- **after**: what happens once the file is there: unzip (a zip reader over
  `DecompressionStream`), rename by a pattern, move to another target, hash

built in: plain http(s), hls, a link list (`.txt`, `.m3u`), and a directory
listing (an apache/nginx index page). sites that fight downloaders (video
platforms) stay out, yt-dlp territory, at most through a helper on a server.

the worker is the boundary: a plugin can not read the page, the other
downloads or the storage. it is still code the user chose to run, the list
shows where each one comes from.

## targets

where a finished file goes:

- **library**: stays in the opfs, the app is the place to find it again
- **folder**: a folder granted once (file system access api in the browser,
  saf in capacitor, as `apps/files` does)
- **remote**: a webdav place of `apps/files` (`.shared/js/modules/webdav`)
- **save**: the browser's own download, for the one-off file

a package has a target, a single file may differ.

## data

`@bunker/db` tables: `packages`, `downloads` (url, name, size, state, target,
transport, parts done, etag), `plugins`, `history`. the bytes only in the
opfs, `downloader/parts/<id>/`, removed once the file reached its target.

## ui

an `<app-root>` like `apps/files`:

| area      | holds |
|-----------|-------|
| `main`    | views: **queue** (packages, their downloads, progress), **grabber** (pasted links before they start), **library** (what is done) |
| `context` | the selected download: url, headers, parts, log, retry |
| `config`  | limits, targets, transports, plugins |

per row: pause, resume, retry, remove, open. `media-file` shows a finished
file, `data-list` the queue, `dismissable` from `@aufbau/gestures` swipes a
row away.

## open questions

- the name: `downloader`, `fetcher`, `grab`?
- the task queue into `.shared` now, or once a second app needs it?
- background fetch: worth it for the browser, or capacitor first?
- plugins only by url, or also pasted as text (a gist)?
- a captcha or a login: a step that shows the page in a popup, or out of scope?
