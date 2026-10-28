# code

a code editor for the phone.

monaco, akeyboard made for code, a command palette, and three sources to edit: 
- folders of the device,
- github repositories
- webdav servers.

nothing is uploaded, a server or github is reached directly.

## how it is built

every source is a **directory handle**:
- a granted folder (`RAT.app.folders`, more than one),
- a webdav server (`.shared/webdav/handles.js`)
- and a github branch (`modules/github/handles.js`).

so there is one tree (`Tree`), one way to open and save (`modules/documents.rat.js`) and one set of changes (`modules/tree.rat.js`: new, rename, delete, cut, copy, paste), for all three. copy and paste work across sources. a github change is a commit, a webdav one a request.

what is kept (`stored`, `.md/persistence.md`):
- the settings (`$config!`),
- the editor's options (`$options!`),
- the starred commands,
- the source shown,
- the github token, repo, branch and pinned repos.

the folders' handles sit in the database (folders mod), 
the servers in `remotes.json` (`RAT.app.files`).

| file | |
|---|---|
| `app.rat.html` | the shell: main (statusbar, tabs, editor, toolbar, keyboard, taps), the areas files, config and commands |
| `state.rat.js` | the app's settings, which panel is out (`$panel`, the areas follow it) |
| `modules/commands.rat.js` | every action as a command of `RAT.app.commands`: markup fires one by name (`onclick='save'`), the hotkeys of the config too |
| `modules/documents.rat.js` | the open files, opened from a handle, saved through its writable |
| `modules/editor.rat.js` | monaco's options as a `$Record` of a schema (the settings render from it), the themes, the live editor |
| `modules/github.rat.js`, `modules/github/` | the token, the repos, the branch; the api client and the handles |
| `modules/monaco.js` | monaco through its amd loader from a cdn, rat's highlighting from `@rat/syntax` |
| `modules/sources.rat.js` | the roots: folders, servers, which one the files area shows |
| `modules/tree.rat.js` | what a tree changes, the clipboard, `$version` that lists every open folder again |
| `modules/keyboard.js` | keeps android's keyboard away while the app's is there |

## github

a fine-grained personal access token with *contents: read and write* reaches your own repos (the oauth exchange needs a server, the token stands in). a public repo pins without a token and reads only. saving commits, the message is `Update <path>` or asked for (settings: commit prompt).

## webdav

the browser talks to the server directly, so it has to send cors headers: nextcloud or owncloud with cors on, `rclone serve webdav --cors`, a caddy or nginx that adds them. an app password where the server has one.

## not ported

`Plugins` and `Workspaces` were placeholders: more than one folder is the workspace now. 

`Browser` is a preview of the current html document.
