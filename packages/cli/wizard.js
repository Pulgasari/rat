// @rat/cli/wizard.js

// :::::: ANSI COLOR CODES MAP

const COLORS = {
  blue    : '\x1b[34m',
  cyan    : '\x1b[36m',
  gray    : '\x1b[90m',
  green   : '\x1b[32m',
  magenta : '\x1b[35m',
  red     : '\x1b[31m',
  yellow  : '\x1b[33m',
  reset   : '\x1b[0m',
};

export const color = {
  blue    : (...args) => COLORS.blue    + args.join(' ') + COLORS.reset,
  cyan    : (...args) => COLORS.cyan    + args.join(' ') + COLORS.reset,
  gray    : (...args) => COLORS.gray    + args.join(' ') + COLORS.reset,
  green   : (...args) => COLORS.green   + args.join(' ') + COLORS.reset,
  magenta : (...args) => COLORS.magenta + args.join(' ') + COLORS.reset,
  red     : (...args) => COLORS.red     + args.join(' ') + COLORS.reset,
  yellow  : (...args) => COLORS.yellow  + args.join(' ') + COLORS.reset,
};

// :::::: PRINTING

export function info    (...args) { console.info(...args); }
export function print   (...args) { console.log (...args); }
export function success (...args) { return print(color.green (...args)); }
export function warn    (...args) { return print(color.yellow(...args)); }

export function list (items, title) {
  if (title) print(title);
  items.forEach(item => print(`  - ${item}`));
}

export function separator ({ color: c }) {
  const line = '────────────────────────────────────────';
  if (c) color[c](line);
  else print(line);
}

export function error (message, options = {}) {
  const prefix = color.red("[ERROR]");
  console.error(`${prefix} ${message}`);
  if (options.exit) Deno.exit(1);
  return undefined;
}

// :::::: PROMPTS

export async function ask (question) {
  await Deno.stdout.write(new TextEncoder().encode(question + " "));
  const buf = new Uint8Array(1024);
  const n   = await Deno.stdin.read(buf);
  return new TextDecoder().decode(buf.subarray(0, n)).trim();
}

export async function select (question, options) {
  print(question);
  options.forEach((o, i) => print(`  ${i + 1}) ${o}`));

  while (true) {
    const answer = await ask("Choose number:");
    const index  = Number(answer) - 1;
    if (options[index]) return options[index];
  }
}

export async function multiselect (question, options) {
  print(question);
  options.forEach((o,i) => print(`  ${i + 1}) ${o}`));
  print("Enter numbers separated by comma (e.g. 1,3,5)");

  const answer  = await ask("Your selection:");
  const indices = answer.split(",").map(n => Number(n.trim()) - 1);

  return indices
    .filter (i => options[i])
    .map    (i => options[i]);
}

// :::::: DEFAULT CLASS EXPORT

export default class Wizard {
  constructor({ prefix = '' } = {}) {
    this.prefix = prefix;

    // Methoden binden
    this.ask         = ask;
    this.select      = select;
    this.multiselect = multiselect;

    this.error     = (message, options) => error (this.prefix + ' ' + message, options);
    this.print     = (...args) => print     (this.prefix, ...args);
    this.success   = (...args) => success   (this.prefix, ...args);
    this.warn      = (...args) => warn      (this.prefix, ...args);
    this.list      = (...args) => list      (...args);
    this.separator = (...args) => separator (...args);

    this.color = color;
  }
}
