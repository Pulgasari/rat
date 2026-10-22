// @rat/types :: Color

/*
Color is a data type and, called, its schema:

  const Accent = Color();                 // the schema: anything that reads as a color

  const accent = new Color('#ff8800');    // also 'rgb(255 136 0)', 'hsl(32 100% 50%)', [255, 136, 0],
                                          // { r, g, b }, { h, s, l }, another Color
  accent.hex;          // '#ff8800'
  accent.l = 70;       // lighter, r g b follow
  accent.a = 0.5;      // '#ffad5c80'
  accent.mix('#000');  // a new color, half way to black

one color, many notations: it holds rgba, hex and hsl are read and written
through it (codecs, see pulgasari.github.io md/webdev/codecs.md). a gray has no
hue, so h read back after s = 0 is 0. named css colors are not read (yet).
$Color, its reactive variant, is in reactive.js.
*/

// :::::: IMPORT

import { reactive, register } from '@rat/signals';
import { Schema, isObject, typed } from './schema.js';

// :::::: HELPERS

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const turn  = hue => (hue % 360 + 360) % 360;

// ::: notations

function hslToRgb (h, s, l) {
  s /= 100; l /= 100;
  const k = n => (n + turn(h) / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => (l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1))) * 255;
  return [f(0), f(8), f(4)];
}

function rgbToHsl (r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l   = (max + min) / 2;
  const d   = max - min;
  if (!d) return [0, 0, l * 100];
  const h = max === r ? (g - b) / d % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [turn(h * 60), d / (1 - Math.abs(2 * l - 1)) * 100, l * 100];
}

const HEX      = /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const FUNCTION = /^(rgba?|hsla?)\((.*)\)$/i;

const channel = part => part.endsWith('%') ? parseFloat(part) * 2.55 : parseFloat(part);
const alpha   = part => part === undefined ? 1 : part.endsWith('%') ? parseFloat(part) / 100 : parseFloat(part);

function fromString (text) {
  text = text.trim();

  const hex = HEX.exec(text)?.[1];
  if (hex) {
    const full = hex.length < 5 ? [...hex].map(digit => digit + digit).join('') : hex;
    const [r, g, b, a = 255] = full.match(/../g).map(pair => parseInt(pair, 16));
    return [r, g, b, a / 255];
  }

  const [, name, body] = FUNCTION.exec(text) ?? [];
  if (!name) return null;
  const parts = body.trim().split(/[\s,/]+/).filter(Boolean);
  if (parts.length < 3 || parts.length > 4) return null;
  if (name[0].toLowerCase() === 'r') return [...parts.slice(0, 3).map(channel), alpha(parts[3])];
  return [...hslToRgb(parseFloat(parts[0]), parseFloat(parts[1]), parseFloat(parts[2])), alpha(parts[3])];
}

// [r, g, b, a] from any notation, null when it is none
function rgba (input) {
  let out = null;
  if (input instanceof ColorType)     out = input.toArray();
  else if (typeof input === 'string') out = fromString(input);
  else if (Array.isArray(input))      out = [input[0], input[1], input[2], input[3] ?? 1];
  else if (isObject(input) && 'r' in input) out = [input.r, input.g, input.b, input.a ?? 1];
  else if (isObject(input) && 'h' in input) out = [...hslToRgb(input.h, input.s, input.l), input.a ?? 1];
  return out?.every(Number.isFinite) ? out : null;
}

// ::: the schema

const colorOf = (...args) => {
  if (args.length) throw new TypeError('[rat] Color() is the schema and takes nothing, a color is new Color(…)');
  return new Schema({
    initial : '#000000',
    kind    : 'color',
    run     : (value, path) => rgba(value) ? { value } : { issues: [{ message: 'expected a color', path }] },
  });
};

// ::: the data type

class ColorType {
  #r; #g; #b; #a;

  constructor (input = '#000000') { this.set(input); }

  set (input) {
    const values = rgba(input);
    if (!values) throw new TypeError(`[rat] not a color: ${input}`);
    [this.#r, this.#g, this.#b, this.#a] = [clamp(values[0], 0, 255), clamp(values[1], 0, 255), clamp(values[2], 0, 255), clamp(values[3], 0, 1)];
    return this;
  }

  get r () { return Math.round(this.#r); }
  get g () { return Math.round(this.#g); }
  get b () { return Math.round(this.#b); }
  get a () { return Math.round(this.#a * 1000) / 1000; }

  set r (value) { this.#r = clamp(value, 0, 255); }
  set g (value) { this.#g = clamp(value, 0, 255); }
  set b (value) { this.#b = clamp(value, 0, 255); }
  set a (value) { this.#a = clamp(value, 0, 1); }

  get h () { return Math.round(this.toHsl()[0]); }
  get s () { return Math.round(this.toHsl()[1]); }
  get l () { return Math.round(this.toHsl()[2]); }

  set h (value) { const [, s, l] = this.toHsl(); this.#hsl(value, s, l); }
  set s (value) { const [h, , l] = this.toHsl(); this.#hsl(h, clamp(value, 0, 100), l); }
  set l (value) { const [h, s]   = this.toHsl(); this.#hsl(h, s, clamp(value, 0, 100)); }

  #hsl (h, s, l) { [this.#r, this.#g, this.#b] = hslToRgb(h, s, l); }

  get hex () {
    const pairs = [this.#r, this.#g, this.#b, ...(this.#a < 1 ? [this.#a * 255] : [])];
    return '#' + pairs.map(value => Math.round(value).toString(16).padStart(2, '0')).join('');
  }

  set hex (value) { this.set(value); }

  // a new color, amount of the way to other (0: this, 1: other)
  mix (other, amount = 0.5) {
    const to = rgba(other);
    if (!to) throw new TypeError(`[rat] not a color: ${other}`);
    return new this.constructor(this.toArray().map((value, index) => value + (to[index] - value) * amount));
  }

  equals (other) { const to = rgba(other); return !!to && this.toArray().every((value, index) => Math.abs(value - to[index]) < 1e-6); }

  toArray  () { return [this.#r, this.#g, this.#b, this.#a]; }
  toHsl    () { return [...rgbToHsl(this.#r, this.#g, this.#b), this.#a]; }
  toJSON   () { return this.hex; }
  toString () { return this.hex; }
}

Object.defineProperty(ColorType, 'name', { value: 'Color' });

// ::: Color + $Color

const differs = name => (color, value) => !Object.is(color[name], value);

const Color = typed(ColorType, colorOf);

const $Color = reactive(Color, {
  reads  : ['r', 'g', 'b', 'a', 'h', 's', 'l', 'hex', 'equals', 'mix', 'toArray', 'toHsl', 'toJSON', 'toString'],
  writes : {
    a   : differs('a'),
    b   : differs('b'),
    g   : differs('g'),
    h   : differs('h'),
    hex : differs('hex'),
    l   : differs('l'),
    r   : differs('r'),
    s   : differs('s'),
    set : (color, input) => !color.equals(input),
  },
});

register(Color,  $Color);

// :::::: EXPORT

export { Color, $Color };
