// @rat/cli :: wizard

import { stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline/promises';

const CODES = { blue: 34, cyan: 36, gray: 90, green: 32, magenta: 35, red: 31, yellow: 33 };

const paint = code => (...args) => stdout.isTTY ? `\x1b[${code}m${args.join(' ')}\x1b[0m` : args.join(' ');

export const color = Object.fromEntries(Object.entries(CODES).map(([name, code]) => [name, paint(code)]));

export const print   = (...args) => console.log(...args);
export const success = (...args) => print(color.green(...args));
export const warn    = (...args) => print(color.yellow(...args));
export const error   = (...args) => console.error(color.red(...args));

export const list = (items, title) => {
  if (title) print(title);
  for (const item of items) print(`  - ${item}`);
};

// one reader for every question: its lines are buffered, so answers piped in all at once are not lost
let lines = null;
let next  = null;

export async function ask (question, fallback = '') {
  if (!lines) {
    lines = createInterface({ input: stdin, terminal: false });
    next  = lines[Symbol.asyncIterator]();
  }
  stdout.write(`${question}${fallback ? color.gray(` (${fallback})`) : ''} `);
  const { done, value } = await next.next();
  if (!stdin.isTTY) stdout.write(`${done ? '' : value}\n`);
  return (done ? '' : value.trim()) || fallback;
}

export function close () {
  lines?.close();
  lines = next = null;
}

export async function select (question, options) {
  print(question);
  options.forEach((option, index) => print(`  ${index + 1}) ${option}`));
  while (true) {
    const index = Number(await ask('number:')) - 1;
    if (options[index]) return options[index];
  }
}

export async function multiselect (question, options) {
  print(question);
  options.forEach((option, index) => print(`  ${index + 1}) ${option}`));
  const answer = await ask(color.gray('numbers, separated by commas, or none:'));
  return answer.split(',').map(part => options[Number(part.trim()) - 1]).filter(Boolean);
}
