// subotnik :: modules/launcher.js
//
// the native side: the Launcher plugin (bridge/LauncherPlugin.java) lists the launchable apps and starts
// one, and lets the system wallpaper show behind a translucent page. in a browser a fixed demo set.
// what an app is shown as: a glyph guessed from its name, the category of that glyph, its first letter
//
//   launcher.apps()            [{ packageName, label }], label-sorted
//   launcher.launch(pkg)       starts it
//   launcher.showWallpaper(b)  FLAG_SHOW_WALLPAPER on the window
//   glyphOf(app), categoryOf(app), letterOf(app), norm(text)

import { plugin } from '../../.shared/native.js';

import { toast } from '../../.shared/toast.js';

const DEMO = [
  ['com.android.calculator2', 'Rechner'], ['com.android.camera', 'Kamera'], ['com.android.chrome', 'Chrome'],
  ['com.android.deskclock', 'Uhr'], ['com.android.dialer', 'Telefon'], ['com.android.gallery3d', 'Galerie'],
  ['com.android.settings', 'Einstellungen'], ['com.android.vending', 'Play Store'], ['com.example.files', 'Dateien'],
  ['com.example.notes', 'Notizen'], ['com.google.android.apps.maps', 'Maps'], ['com.google.android.apps.messaging', 'Nachrichten'],
  ['com.google.android.calendar', 'Kalender'], ['com.google.android.gm', 'Gmail'], ['com.google.android.youtube', 'YouTube'],
  ['com.spotify.music', 'Spotify'],
].map(([packageName, label]) => ({ label, packageName }));

const Launcher = plugin('Launcher', {
  getApps          : async () => ({ apps: [...DEMO].sort((a, b) => a.label.localeCompare(b.label)) }),
  launchApp        : async ({ packageName }) => toast(`nur im nativen build: startet ${packageName}`),
  setShowWallpaper : async () => {},
});

export const launcher = {
  apps          : async () => (await Launcher.getApps())?.apps ?? [],
  launch        : packageName => Launcher.launchApp({ packageName }),
  showWallpaper : show => Launcher.setShowWallpaper({ show }).catch(() => {}),
};

// :::::: GLYPHS, monochrome line icons (svg bodies, viewBox 0 0 24 24), tinted by one color

export const GLYPHS = {
  add        : '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  app        : '<rect x="4" y="4" width="16" height="16" rx="4"/>',
  back       : '<path d="M15 5l-7 7 7 7"/>',
  bank       : '<rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3.5" y1="10.5" x2="20.5" y2="10.5"/><line x1="6.5" y1="14.5" x2="10.5" y2="14.5"/>',
  browser    : '<circle cx="12" cy="12" r="8"/><ellipse cx="12" cy="12" rx="4" ry="8"/><line x1="4" y1="12" x2="20" y2="12"/>',
  calculator : '<rect x="5" y="3" width="14" height="18" rx="2"/><line x1="8" y1="7.5" x2="16" y2="7.5"/><line x1="9" y1="12" x2="9" y2="12"/><line x1="12" y1="12" x2="12" y2="12"/><line x1="15" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="9" y2="16"/><line x1="12" y1="16" x2="12" y2="16"/><line x1="15" y1="16" x2="15" y2="16"/>',
  calendar   : '<rect x="4" y="5" width="16" height="16" rx="2"/><line x1="4" y1="9.5" x2="20" y2="9.5"/><line x1="8.5" y1="3" x2="8.5" y2="6.5"/><line x1="15.5" y1="3" x2="15.5" y2="6.5"/>',
  camera     : '<rect x="3" y="7.5" width="18" height="11.5" rx="2"/><rect x="8.5" y="4.5" width="7" height="3" rx="1"/><circle cx="12" cy="13" r="3.2"/>',
  clock      : '<circle cx="12" cy="12" r="8"/><path d="M12 7.5v5l3.2 2"/>',
  close      : '<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>',
  down       : '<path d="M6 9l6 6 6-6"/>',
  edit       : '<path d="M4 20h4L18 10l-4-4L4 16z"/><line x1="13" y1="7" x2="17" y2="11"/>',
  files      : '<path d="M3 7.5a2 2 0 012-2h4l2 2h8a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>',
  folder     : '<path d="M3 7.5a2 2 0 012-2h4l2 2h8a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>',
  game       : '<rect x="3" y="8" width="18" height="8.5" rx="4.2"/><line x1="7.5" y1="10.5" x2="7.5" y2="14"/><line x1="5.8" y1="12.2" x2="9.2" y2="12.2"/><circle cx="16" cy="11.5" r="1"/><circle cx="18" cy="13.5" r="1"/>',
  grid       : '<rect x="4.5" y="4.5" width="6" height="6" rx="1.5"/><rect x="13.5" y="4.5" width="6" height="6" rx="1.5"/><rect x="4.5" y="13.5" width="6" height="6" rx="1.5"/><rect x="13.5" y="13.5" width="6" height="6" rx="1.5"/>',
  mail       : '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3.6 7.2l8.4 6 8.4-6"/>',
  maps       : '<path d="M12 21s6-5.6 6-11a6 6 0 10-12 0c0 5.4 6 11 6 11z"/><circle cx="12" cy="10" r="2.2"/>',
  message    : '<path d="M4.5 5.5h15v10h-9l-6 4z"/>',
  music      : '<circle cx="7.5" cy="17" r="2.5"/><circle cx="17" cy="15" r="2.5"/><path d="M10 17V6.5l9-2v9"/>',
  notes      : '<rect x="5" y="3" width="14" height="18" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="13" y2="16"/>',
  open       : '<path d="M14 4h6v6"/><line x1="20" y1="4" x2="11" y2="13"/><path d="M18 14v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h4"/>',
  phone      : '<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><line x1="10" y1="18.5" x2="14" y2="18.5"/>',
  photos     : '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10" r="1.7"/><path d="M4.5 18l5-5 4 4 2.5-2.5 3.5 3.5"/>',
  pin        : '<path d="M9 4h6l-1 6 3 3H7l3-3z"/><line x1="12" y1="13" x2="12" y2="20"/>',
  settings   : '<circle cx="12" cy="12" r="3.2"/><path d="M12 3.5v2.4M12 18.1v2.4M20.5 12h-2.4M5.9 12H3.5M18 6l-1.7 1.7M7.7 16.3L6 18M18 18l-1.7-1.7M7.7 7.7L6 6"/>',
  store      : '<path d="M6 8.5h12l-1 11.5H7z"/><path d="M9 8.5a3 3 0 016 0"/>',
  trash      : '<path d="M6 7.5h12l-1 12.5H7z"/><line x1="4.5" y1="7.5" x2="19.5" y2="7.5"/><path d="M9.5 7.5V4.5h5v3"/>',
  up         : '<path d="M6 15l6-6 6 6"/>',
  video      : '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M10.5 9.5l4.5 2.5-4.5 2.5z"/>',
  weather    : '<path d="M7.5 18a4 4 0 01-.3-8 5 5 0 019.6-1 3.5 3.5 0 01.2 9z"/>',
};

// a keyword of the label or the package -> the glyph, the first rule that matches
const RULES = [
  [/dial|phone|call|contact|telefon|anruf/, 'phone'],
  [/messag|sms|chat|whatsapp|telegram|signal|nachricht/, 'message'],
  [/mail|gmail|email|outlook|posteingang/, 'mail'],
  [/camera|kamera/, 'camera'],
  [/photo|gallery|galerie|image|bilder|fotos/, 'photos'],
  [/music|spotify|deezer|tidal|audio|musik/, 'music'],
  [/video|youtube|netflix|movie|film|kino/, 'video'],
  [/map|maps|karte|navigation|waze|gps/, 'maps'],
  [/clock|alarm|timer|uhr|wecker/, 'clock'],
  [/calendar|kalender|agenda|termin/, 'calendar'],
  [/calc|rechner/, 'calculator'],
  [/store|market|shop|vending|play|amazon/, 'store'],
  [/game|spiel|arcade/, 'game'],
  [/bank|wallet|pay|finance|geld|karte|card/, 'bank'],
  [/note|memo|keep|todo|task|notiz/, 'notes'],
  [/file|explorer|manager|drive|dokument|datei/, 'files'],
  [/browser|chrome|firefox|brave|opera|vivaldi|internet/, 'browser'],
  [/weather|wetter|climate/, 'weather'],
  [/setting|config|einstell/, 'settings'],
];

const glyphs = new Map;   // packageName -> glyph, guessed once

export function glyphOf (app) {
  if (!glyphs.has(app.packageName)) {
    const text = `${app.label ?? ''} ${app.packageName ?? ''}`.toLowerCase();
    glyphs.set(app.packageName, RULES.find(([pattern]) => pattern.test(text))?.[1] ?? 'app');
  }
  return glyphs.get(app.packageName);
}

// the categories of the drawer follow the glyph: no second classifier. the order is the chips'
export const CATEGORIES = [
  ['comm',   'Kommunikation', ['browser', 'mail', 'message', 'phone']],
  ['media',  'Medien',        ['camera', 'music', 'photos', 'video']],
  ['org',    'Organisation',  ['calculator', 'calendar', 'clock', 'files', 'notes']],
  ['travel', 'Unterwegs',     ['maps', 'weather']],
  ['money',  'Shop & Geld',   ['bank', 'store']],
  ['games',  'Spiele',        ['game']],
  ['system', 'System',        ['settings']],
  ['other',  'Sonstige',      ['app']],
];

const CATEGORY = new Map(CATEGORIES.flatMap(([id, , names]) => names.map(name => [name, id])));

export const categoryOf = app => CATEGORY.get(glyphOf(app)) ?? 'other';

// lowercase without diacritics: the search and the letters
export const norm = text => String(text ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export const LETTERS = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'];

export function letterOf (app) {
  const char = norm(app.label).trim().charAt(0).toUpperCase();
  return char >= 'A' && char <= 'Z' ? char : '#';
}
