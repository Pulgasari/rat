// packages/runtime/types/Trait.js

export default class Trait {
  
  // init
  constructor (name, definition) {
    this._name = name;

    if (typeof definition === 'function') {
      this._factory = definition;
    } else if (typeof definition === 'object' && definition !== null) {
      this._factory = () => Object.assign({}, definition);
    } else {
      throw new Error(`[Trait ${name}] Definition muss eine Funktion oder ein Objekt sein.`);
    }

    Object.freeze(this);
  }
  
  //
  apply (target) {
    if (!target) return target;

    const properties = this._factory();

    // Reibungslose Erkennung: Handelt es sich um eine moderne ES6+ Klasse?
    const isClass = typeof target === 'function' && target.prototype && /^\s*class\s+/.test(target.toString());

    // Wenn es eine Klasse ist, erweitern wir den Prototyp (damit alle Instanzen es haben)
    // Bei normalen Funktionen und Objekten patchen wir direkt das Ziel.
    const receiver = isClass ? target.prototype : target;

    // Eigenschaften reinkopieren
    Object.assign(receiver, properties);

    // Registrierung für den 'is'-Operator (Typen-Check) hinterlegen
    if (!receiver.__traits) receiver.__traits = new Set();
    
    receiver.__traits.add(this);

    return target;
  }

  // access (by getter)
  get name () { return this._name; }

  // debug
  toString () {
    return `[Trait ${this._name}]`;
  }

  // static
  static isTrait (value) {
    return value instanceof Trait;
  }
  static has (target, trait) {
    if (!target || !trait) return false;

    // Prüfe direkt auf dem Objekt/der Funktion
    if (target.__traits && target.__traits.has(trait)) return true;

    // Prüfe auf dem Prototyp (falls das Ziel die Instanz einer Klasse ist)
    const proto = Object.getPrototypeOf(target);
    if (proto && proto.__traits && proto.__traits.has(trait)) return true;

    return false;
  }
  
}
