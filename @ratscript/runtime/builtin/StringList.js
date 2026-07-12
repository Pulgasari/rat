// @ratscript/runtime/types/StringList.js

import List from './List.js';

export default class StringList extends List {
  
  constructor (...values) {
    super(...values);
    this._type = 'string';
  }

  _mutate (fn) {
    for (let i = 0; i < this._values.length; i++) {
      let oldValue = this._values[i];
      let newValue = fn(oldValue);
      this._values[i] = newValue;
    }
    return this;
  }

  // methods: mutate
  toLowerCase () { return this._mutate(v => v.toLowerCase()); }
  toUpperCase () { return this._mutate(v => v.toUpperCase()); }
  trim        () { return this._mutate(v => v.trim()); }
  replaceAll (search, replacement) { return this._mutate(v => v.replaceAll(search, replacement)); }
  padStart   (len, char = ' ')     { return this._mutate(v => v.padStart (len, char)); }
  padEnd     (len, char = ' ')     { return this._mutate(v => v.padEnd   (len, char)); }

  // methods: non-mutating clones
  toLowerCased () { return this.clone().toLowerCase(); }
  toUpperCased () { return this.clone().toUpperCase(); }
  toTrimmed    () { return this.clone().trim(); }
  
  // naming ?
  toReplacedAll (search, replacement) { return this.clone().replaceAll(search, replacement); }
  
  /*
  substring (start, end) {
    return this.mutateItems(v => v.substring(start, end));
  }
  toSubstringed (start, end) {
    return this.clone().substring(start, end);
  }
  split(separator) {
    const result = new List();
    result._type = "object";

    for (let v of this._values) {
      result._values.push(new StringList(...v.split(separator)));
    }

    return result;
  }
  */
  
};
