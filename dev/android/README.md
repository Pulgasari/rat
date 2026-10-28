# dev/android

the web layer of the android apps of [wallpaperfx](https://github.com/Pulgasari/wallpaperfx), as rat
apps. separate from the zugriff apps in `dev/apps`: no zugriff config, no shared zugriff css, each app
styles itself and runs offline.

| app                   | what                                              | native plugin |
|-----------------------|---------------------------------------------------|---------------|
| `cosmonaut`           | the chrome of a browser over native content views | `Browser`     |
| `subotnik`            | a home screen launcher                            | `Launcher`    |
| `subotnik-wallpapers` | the config ui of a live wallpaper (gl engine)     | `Wallpaper`   |

the native project of each (java, manifest, gradle) lives in `wallpaperfx/apps/<app>`, a sibling
checkout of this repo. `config.rat.js` names it (`capacitor`) and builds into its `www/`:

```bash
node packages/cli/index.js build dev/android/<app> --target android   # -> ../wallpaperfx/apps/<app>/www, then cap sync
```

the built `www/` is committed in wallpaperfx, its ci builds the apks from it. outside capacitor every app
runs on a mock of its plugin: serve the built `www/` over http.

## shared

- `.shared/native.js`: a plugin of the app's own project (or the mock), native window events
- `.shared/glyphs.js`: an app's own line icons for `<svg-icon>`, offline (`provide`, `aliases`)
- `.shared/toast.js`: toasts through `<pop-toast>`

## conventions

- `store` and `dialogs` take the web driver (localStorage, rat's own `<dialog>`): the capacitor projects
  carry no plugins beyond their own (cosmonaut: `@capacitor/filesystem` for bookmark files).
- what an app kept before rat (one localStorage key) is taken over once, in its `state.rat.js`.
- a bridge contract (plugin methods, config fields) is the native project's: its CLAUDE.md names the
  invariants (subotnik-wallpapers: `modules/wallpaper.js` mirrors `WpConfig.java`, `modules/preview.js`
  keeps the shader identical with `FilterGlsl.java`).
