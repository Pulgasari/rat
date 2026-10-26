// @rat/cli :: android-res

/*
the app's own android resources in place of the capacitor template's (after cap add android), from
zugriff's gen-capacitor-res:

  launcher icons   ic_launcher, _round and _foreground.png of every mipmap density from the app's icon, the adaptive
                   background (values/ic_launcher_background.xml) in the app's color
  system bars      status and navigation bar in the app's color instead of black
  launch screen    the app's color instead of the capacitor logo

  android : { icon: './app.svg', color: '#282a36' }   // config.rat.js, both optional

the icon: android.icon, else app.svg, else assets/icon.svg beside the config. the color: android.color,
else theme_color (background_color) of the app's manifest. sharp renders, from the capacitor project's
own node_modules (android.js lists it there).

capacitor 8 targets sdk 36: android 15+ runs edge-to-edge and ignores the bar colors, the page paints
behind the bars itself. the colors are the fallback for older android versions and webviews.
*/

import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';

import { warn } from './wizard.js';

const DENSITIES = { hdpi: 1.5, mdpi: 1, xhdpi: 2, xxhdpi: 3, xxxhdpi: 4 };
const LEGACY_DP = 48;
const LAYER_DP  = 108;

// share of the canvas the glyph's longer side spans: 48 of 108dp keeps an adaptive foreground inside every
// launcher mask, the legacy share matches its visual weight
const FG_SCALE     = 48 / 108;
const LEGACY_SCALE = 0.62;

const MARK = 'rat:bars';

// :::::: WHAT THE APP SAYS

async function colorOf (dir, android) {
  if (android.color) return android.color;
  for (const name of ['manifest.json', 'manifest.webmanifest']) {
    const file = join(dir, name);
    if (!existsSync(file)) continue;
    const manifest = JSON.parse(await readFile(file, 'utf8'));
    if (manifest.theme_color || manifest.background_color) return manifest.theme_color ?? manifest.background_color;
  }
  return '#000000';
}

const iconOf = (dir, android) => [android.icon, 'app.svg', 'assets/icon.svg'].filter(Boolean).map(path => resolve(dir, path)).find(existsSync) ?? null;

// the icon's own background: a first <rect> as large as its viewBox. adaptive icons bring the background as a
// layer of their own, only the glyph is left for the foreground
function withoutBackground (svg) {
  const [, , width, height] = (svg.match(/viewBox="([^"]+)"/)?.[1] ?? '').split(/[\s,]+/);
  const sizes = new Set(['100%', width, height, svg.match(/<svg[^>]*\bwidth="([^"]+)"/)?.[1]].filter(Boolean));
  return svg.replace(/<rect\b[^>]*\/>/, rect => {
    const size = name => rect.match(new RegExp(`\\b${name}="([^"]+)"`))?.[1];
    return sizes.has(size('width')) && sizes.has(size('height')) ? '' : rect;
  });
}

// :::::: ICONS

async function icons (res, svg, color, sharp) {
  // rendered once, large, cropped to its bounding box
  const glyph = await sharp(Buffer.from(withoutBackground(svg)), { density: 1024 })
    .resize(1024, 1024, { background: { alpha: 0, b: 0, g: 0, r: 0 }, fit: 'contain' })
    .trim()
    .png()
    .toBuffer();

  // the glyph centred on a transparent canvas, its longer side scale of the edge
  async function centred (canvas, scale) {
    const box = Math.round(canvas * scale);
    const fit = await sharp(glyph).resize(box, box, { fit: 'inside' }).png().toBuffer({ resolveWithObject: true });
    return sharp({ create: { background: { alpha: 0, b: 0, g: 0, r: 0 }, channels: 4, height: canvas, width: canvas } })
      .composite([{ input: fit.data, left: Math.round((canvas - fit.info.width) / 2), top: Math.round((canvas - fit.info.height) / 2) }])
      .png({ compressionLevel: 9 })
      .toBuffer();
  }

  // the glyph on a rounded square or a circle in the app's color
  async function legacy (canvas, round) {
    const shape = round
      ? `<circle cx="${canvas / 2}" cy="${canvas / 2}" r="${canvas / 2}" fill="${color}"/>`
      : `<rect width="${canvas}" height="${canvas}" rx="${canvas * 0.1875}" fill="${color}"/>`;
    return sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${canvas}" height="${canvas}">${shape}</svg>`))
      .composite([{ input: await centred(canvas, LEGACY_SCALE) }])
      .png({ compressionLevel: 9 })
      .toBuffer();
  }

  for (const [bucket, factor] of Object.entries(DENSITIES)) {
    const dir = join(res, `mipmap-${bucket}`);
    await writeFile(join(dir, 'ic_launcher.png'),            await legacy(Math.round(LEGACY_DP * factor), false));
    await writeFile(join(dir, 'ic_launcher_round.png'),      await legacy(Math.round(LEGACY_DP * factor), true));
    await writeFile(join(dir, 'ic_launcher_foreground.png'), await centred(Math.round(LAYER_DP * factor), FG_SCALE));
  }

  await writeFile(join(res, 'values', 'ic_launcher_background.xml'), `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">${color}</color>
</resources>
`);
}

// :::::: SYSTEM BARS, LAUNCH SCREEN

// bar icons contrast with the bar: dark icons on a light color
function isLight (hex) {
  const digits = hex.replace('#', '');
  const rgb    = (digits.length === 3 ? [...digits].map(digit => digit + digit) : digits.slice(0, 6).match(/../g)).map(pair => parseInt(pair, 16) / 255);
  const linear = rgb.map(value => value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2] > 0.5;
}

async function bars (res, color) {
  const light = isLight(color);
  const items = [
    `<!-- ${MARK} -->`,
    `<item name="android:statusBarColor">${color}</item>`,
    `<item name="android:navigationBarColor">${color}</item>`,
    `<item name="android:windowLightStatusBar">${light}</item>`,
    `<item name="android:windowLightNavigationBar" tools:targetApi="27">${light}</item>`,
    `<item name="android:windowBackground">@color/ic_launcher_background</item>`,
  ];

  const file = join(res, 'values', 'styles.xml');
  let styles = await readFile(file, 'utf8');

  // the webview's theme and the launch theme before it: nothing flashes black
  const patch = (name, extra = []) => {
    const style = new RegExp(`(<style name="${name.replace('.', '\\.')}"[^>]*>)([\\s\\S]*?)(</style>)`);
    if (!style.test(styles)) return warn(`android: no style ${name} in the template, the bars keep their color`);
    styles = styles.replace(style, (_, head, body, tail) => body.includes(MARK) ? head + body + tail
      : `${head}${body.replace(/\s*$/, '')}\n${[...items, ...extra].map(line => `        ${line}`).join('\n')}\n    ${tail}`);
  };

  patch('AppTheme.NoActionBar');
  patch('AppTheme.NoActionBarLaunch', [`<item name="windowSplashScreenBackground">${color}</item>`]);

  styles = styles.replace('<item name="android:background">@drawable/splash</item>', '<item name="android:background">@color/ic_launcher_background</item>');
  if (!styles.includes('xmlns:tools')) styles = styles.replace('<resources>', '<resources xmlns:tools="http://schemas.android.com/tools">');

  await writeFile(file, styles);
  return light;
}

// :::::: EXPORT

export async function resources (project, config, android = {}) {
  const dir   = dirname(config);
  const res   = join(project, 'android', 'app', 'src', 'main', 'res');
  const color = await colorOf(dir, android);
  const icon  = iconOf(dir, android);

  if (icon) {
    const sharp = createRequire(join(project, 'package.json'))('sharp');
    await icons(res, await readFile(icon, 'utf8'), color, sharp);
  }
  else warn('android: no icon (android.icon, app.svg, assets/icon.svg), the capacitor one stays');

  const light = await bars(res, color);
  return { color, icon, light };
}
