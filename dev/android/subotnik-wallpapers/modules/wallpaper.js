// subotnik-wallpapers :: modules/wallpaper.js
//
// the native side and the config it reads. the Wallpaper plugin (bridge/WallpaperPlugin.java) keeps the
// config in filesDir/wallpaper_config.json, SceneRenderer renders it. in a browser localStorage stands in.
//
// THE INVARIANT: CONFIG and filterOf() mirror config/WpConfig.java (fields, json keys, defaults) and
// FilterEntry. a field added here is added there, and to the renderer that reads it
//
//   wallpaper.load()          the config, older shapes taken over (fromJson does the same natively)
//   wallpaper.save(config)    written for the renderer
//   wallpaper.pick(type)      'image' | 'video' -> the paths of the copies the plugin made
//   wallpaper.apply()         the system's live wallpaper picker

import { plugin } from '../../.shared/native.js';

const Wallpaper = plugin('Wallpaper', {
  applyWallpaper : async () => alert('nur im nativen build: live-wallpaper-auswahl wird geöffnet'),
  getConfig      : async () => JSON.parse(localStorage.getItem('wallpaper') ?? '{}'),
  pickMedia      : async ({ type }) => ({ paths: [`/mock/${Date.now()}_${type === 'image' ? 'demo_image.jpg' : 'demo_video.mp4'}`] }),
  setConfig      : async ({ config }) => localStorage.setItem('wallpaper', JSON.stringify(config)),
});

export const CONFIG = {
  mode              : 'video',   // video | images
  videos            : [],        // [{ path, enabled }]
  videoOrder        : 'loop',    // loop | loop-random | single
  videoScale        : 'cover',   // cover | fit
  videoOffsetX      : 0,
  videoOffsetY      : 0,
  videoSpeed        : 1,
  resumeVideo       : true,
  images            : [],        // [{ path, enabled }]
  imageOrder        : 'loop',
  imageDurationMs   : 8000,
  imageTransitionMs : 800,
  imageScale        : 'cover',
  imageOffsetX      : 0,
  imageOffsetY      : 0,
  flipX             : false,
  flipY             : false,
  filters           : [],        // the chain, in order: filterOf()
  parallaxEnabled   : false,
  parallaxAmount    : 0.15,
  motionType        : 'none',    // none | zoom | breathe | drift | sway | shake
  motionAmount      : 0.5,
  motionSpeed       : 0.5,
};

// a filter entry: every param of every type, the type picks what it reads (WpConfig.FilterEntry)
export const filterOf = type => ({
  type, enabled: true,
  colorA: [18, 20, 42], colorB: [240, 186, 72], colorC: [120, 84, 168],
  scanCount: 320, scanStrength: 0.35, crtMask: 0.3,
  amount: 1, levels: 6, pixelSize: 12, halftone: 90,
  vignette: 0.6, vignetteRadius: 0.6, vignetteColor: [0, 0, 0], chromatic: 0.006,
  grain: 0.15, glitch: 0.5, vhs: 0.6,
  bloom: 0.6, bloomThreshold: 0.7, blurRadius: 2, fisheye: 0.5, noise: 0.15, cycleSec: 6,
});

// alphabetical by label: the list only. the shader's numbers are FILTER_INDEX of preview.js
export const FILTERS = [
  ['bloom', 'Bloom'], ['blur', 'Blur'], ['chromatic', 'Chromatic'], ['crt', 'CRT'],
  ['duotone', 'Duotone'], ['duotone2', 'Duotone Cycle'], ['filmgrain', 'Film Grain'],
  ['fisheye', 'Fisheye'], ['glitch', 'Glitch'], ['gradientmap', 'Gradient Map'],
  ['grain', 'Grain'], ['grayscale', 'Graustufen'], ['halftone', 'Halftone'],
  ['invert', 'Invertieren'], ['noise', 'Noise'], ['pixelate', 'Pixelate'],
  ['posterize', 'Posterize'], ['scanlines', 'Scanlines'], ['sepia', 'Sepia'],
  ['vhs', 'VHS'], ['vignette', 'Vignette'],
];

export const LABEL = Object.fromEntries(FILTERS);

// they read uTime: the wallpaper draws continuously while one is on (SceneRenderer.isAnimated)
export const ANIMATED = ['duotone2', 'filmgrain', 'glitch', 'vhs'];

// the params a type shows. a color: [key, label, 'color'], a range: [key, label, min, max, step, decimals]
export const PARAMS = {
  bloom       : [['bloom', 'Stärke', 0, 2, 0.01, 2], ['bloomThreshold', 'Schwelle', 0, 1, 0.01, 2]],
  blur        : [['blurRadius', 'Radius', 0.5, 8, 0.1, 1]],
  chromatic   : [['chromatic', 'Versatz', 0, 0.03, 0.001, 3]],
  crt         : [['scanCount', 'Linien', 60, 900, 10, 0], ['scanStrength', 'Stärke', 0, 1, 0.01, 2], ['crtMask', 'Maske', 0, 1, 0.01, 2]],
  duotone     : [['colorA', 'Schatten', 'color'], ['colorB', 'Lichter', 'color']],
  duotone2    : [['colorA', 'Schatten', 'color'], ['colorB', 'Licht A', 'color'], ['colorC', 'Licht B', 'color'], ['cycleSec', 'Dauer', 0.5, 20, 0.5, 1]],
  filmgrain   : [['grain', 'Körnung', 0, 0.6, 0.01, 2]],
  fisheye     : [['fisheye', 'Stärke', -1, 1, 0.01, 2]],
  glitch      : [['glitch', 'Stärke', 0, 1, 0.01, 2]],
  gradientmap : [['colorA', 'Dunkel', 'color'], ['colorC', 'Mitte', 'color'], ['colorB', 'Hell', 'color']],
  grain       : [['grain', 'Körnung', 0, 0.6, 0.01, 2]],
  grayscale   : [['amount', 'Stärke', 0, 1, 0.01, 2]],
  halftone    : [['colorA', 'Ink', 'color'], ['colorB', 'Paper', 'color'], ['halftone', 'Raster', 20, 240, 5, 0]],
  invert      : [],
  noise       : [['noise', 'Stärke', 0, 0.6, 0.01, 2]],
  pixelate    : [['pixelSize', 'Blockgröße', 2, 64, 1, 0]],
  posterize   : [['levels', 'Stufen', 2, 16, 1, 0]],
  scanlines   : [['scanCount', 'Linien', 60, 900, 10, 0], ['scanStrength', 'Stärke', 0, 1, 0.01, 2]],
  sepia       : [['amount', 'Stärke', 0, 1, 0.01, 2]],
  vhs         : [['vhs', 'Stärke', 0, 1, 0.01, 2]],
  vignette    : [['vignette', 'Stärke', 0, 1, 0.01, 2], ['vignetteRadius', 'Radius', 0, 1, 0.01, 2], ['vignetteColor', 'Farbe', 'color']],
};

// :::::: THE PLUGIN

// what was kept, on the defaults. the shapes before: imagePaths (strings), one videoPath, the old order names
function adopt (saved = {}) {
  const config = { ...CONFIG };
  for (const key of Object.keys(CONFIG)) if (saved[key] != null) config[key] = saved[key];
  if (Array.isArray(saved.imagePaths) && !config.images.length) config.images = saved.imagePaths.map(path => ({ enabled: true, path }));
  if (saved.videoPath && !config.videos.length) config.videos = [{ enabled: true, path: saved.videoPath }];
  config.imageOrder = { normal: 'loop', random: 'loop-random' }[config.imageOrder] ?? config.imageOrder;
  return config;
}

// a plain copy: what crosses the bridge is json
const plain = value => JSON.parse(JSON.stringify(value));

export const wallpaper = {
  apply : () => Wallpaper.applyWallpaper(),
  load  : async () => adopt(await Wallpaper.getConfig().catch(() => ({}))),
  pick  : async type => (await Wallpaper.pickMedia({ type }))?.paths ?? [],
  save  : config => Wallpaper.setConfig({ config: plain(config) }),
};

// the url the webview loads a picked file from (the capacitor file server)
export const srcOf = path => globalThis.Capacitor?.convertFileSrc?.(path) ?? path;

// the name the native copy step gave, without its timestamp
export function nameOf (path = '') {
  const name = path.split('/').pop();
  const cut  = name.indexOf('_');
  return cut > 0 && /^\d+$/.test(name.slice(0, cut)) ? name.slice(cut + 1) : name;
}

export const toHex = rgb => `#${rgb.map(value => Math.max(0, Math.min(255, value)).toString(16).padStart(2, '0')).join('')}`;
export const toRgb = hex => [0, 2, 4].map(index => parseInt(hex.replace('#', '').slice(index, index + 2), 16));
