// @ratscript/runtime/helpers/_range.js.js

export default function* _range (from, to, step = null) {
  const isChar = typeof from === 'string' && typeof to === 'string';

  // Falls Buchstaben: In ASCII/Unicode-Zahlen umwandeln
  let start = isChar ? from.charCodeAt(0) : from;
  let end   = isChar ?   to.charCodeAt(0) :   to;

  // Automatische Richtungserkennung, falls kein Step definiert wurde
  if (step === null) {
    step = start <= end ? 1 : -1;
  }

  // Sicherheits-Check gegen Endlosschleifen
  if (step === 0)              throw new Error("Range-Step darf nicht 0 sein.");
  if (start < end && step < 0) throw new Error("Endloser Loop: Vorwärts-Range braucht positiven Step.");
  if (start > end && step > 0) throw new Error("Endloser Loop: Rückwärts-Range braucht negativen Step.");

  // Der inklusive Loop
  if (step > 0) {
    for (let i = start; i <= end; i += step) {
      yield isChar ? String.fromCharCode(i) : i;
    }
  } else {
    for (let i = start; i >= end; i += step) {
      yield isChar ? String.fromCharCode(i) : i;
    }
  }
}
