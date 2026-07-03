// @ratscript/runtime/cond.js

/**
 * Die zentrale Registry für alle definierten Bedingungen im System.
 * Dient als globaler Namespace für DevTools oder interne Analysen.
 * @type {Map<string, Function>}
 */
export const condMap = new Map();

/**
 * Erstellt eine RatScript-Bedingung (Condition), registriert sie im Namespace
 * und gibt die aufrufbare Funktion zurück.
 * * @param {string} name - Der eindeutige Name der Bedingung.
 * @param {Function} fn - Die eigentliche Logik (Arrow-Function).
 * @returns {Function} Die registrierte, reaktive Bedingung.
 */
export function createCond (name, fn) {
  // Wir hängen den Namen direkt an das Funktionsobjekt für besseres Debugging
  Object.defineProperty(fn, 'name', { value: name, configurable: true });
  fn.isRatCondition = true;

  // In der zentralen Map registrieren
  condMap.set(name, fn);

  return fn;
}
