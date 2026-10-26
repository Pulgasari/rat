# files

A file manager over a folder of your **own disk**, from `zugriff/apps/files`, rebuilt on rat. You grant one
folder and it becomes the root. Nothing is uploaded and nothing is copied, only the handle is kept (table
`root` of the database), so a returning visit just asks for permission again. On android and the desktop the
folder comes from the shell's folders driver of `@rat/app`.

## frame

| area      | dock   | what it holds |
|-----------|--------|---------------|
| main      |        | the views |
| `menu`    | start  | the views, what is coming back |
| `config`  | end    | the app's settings, the folder, the shared appearance |
| `context` | bottom | the tasks, an entry, the open file, the folder on screen, the folder as a whole |

## views

| view        | route        | what it is |
|-------------|--------------|------------|
| `dashboard` | `#/`         | recent files, bookmarks, categories, the folder; a search over the whole folder |
| `library`   | `#/library`  | the folder in tabs: crumbs, filter, list or grid, a new-folder button, the clipboard |
| `preview`   | `#/preview`  | one file, an image inline. its details are in the context area |

## how it's built

| file | what it is |
|---|---|
| `app.rat.html` | the areas and the views |
| `state.js` | the state (tabs, listing, selection, settings) and the actions (open, write, paste, the folder) |
| `modules/root.js` | the granted folder: picked and kept through `@rat/app`'s folders driver |
| `modules/fs.js` | listing, reading, a new folder, rename, delete, copy over any root handle |
| `modules/scan.js` | the index of the whole folder, kept in `RAT.app.files` |
| `modules/tasks.js` | the task lanes and their history |
| `modules/places.js` | bookmarks and folder types |
| `modules/transfer.js` | the clipboard, copying and moving |
| `components/` | the views and their parts |
| `modules/remotes.js` | the webdav servers, each a root handle (`.shared/webdav/`), kept in `RAT.app.files` |
| `modules/sync.js` | sending over the lan (LocalSend v2) through the native FileSync plugin |

mods: `database` (the handle), `dialogs` (new folder, rename, delete), `files` (the index, the servers),
`thumbnails`, `offline`.

## remote

WebDAV servers (Nextcloud and ownCloud included) are connected from the dashboard and open in a tab of their
own. A connection is a root handle like the folder (`.shared/webdav/handles.js`), so browsing, preview,
thumbnails, copy and move work on it and between it and the folder. In a browser the server has to allow cors
for this app; in the android app the requests are native (`request()` of `.shared/http.js`, the NativeHttp
plugin). The credentials stay on the device.

## send (lan)

The `#/sync` view sends files to a device on the local network over LocalSend v2. The network part is native:
udp multicast and https to a lan address with a self-signed certificate are nothing a web page may do. In a
browser the view says so; it works in the android app with the FileSync plugin.

## settings

open with (a tap, a double click, auto), the search bar and the tabs at the top or the bottom, a pattern behind
the app and on the tiles (`input-pattern`, painted by `app.css`).
