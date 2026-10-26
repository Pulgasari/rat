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

mods: `database` (the handle), `dialogs` (new folder, rename, delete), `files` (the index), `thumbnails`,
`offline`.

## not ported yet

- **remote** (WebDAV, Nextcloud): needs zugriff's webdav handles. the tiles say so
- **send** (LAN, LocalSend): needs the native FileSync plugin of zugriff's android app
- the background patterns (`pattern-bg`, `pattern-tile`) of the settings
