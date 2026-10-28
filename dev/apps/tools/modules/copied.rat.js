// tools :: modules/copied.rat.js
//
// what was copied last, for a moment: a row shows a check instead of the copy icon

export let $copied = null;

let timer = 0;

export function copyShown (text, key = text) {
  navigator.clipboard.writeText(text);
  $copied = key;
  clearTimeout(timer);
  timer = setTimeout(() => { $copied = null; }, 1500);
}
