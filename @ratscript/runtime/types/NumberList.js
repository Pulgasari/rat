// @ratscript/runtime/types/NumberList.js

import List from './List.js';

export default class NumberList extends List {
  
  constructor (...values) {
    super(...values);
    this._type = 'number';
  }

  //
  _mutate (fn) {
    for (let i = 0; i < this._values.length; i++) {
      let oldValue = this._values[i];
      let newValue = fn(oldValue);
      this._values[i] = newValue;
    }
    return this;
  }

  // methods: mutate
  decrement (n = 1)    { return this._mutate(v => v - n); }
  increment (n = 1)    { return this._mutate(v => v + n); }
  scale     (factor)   { return this._mutate(v => v * factor); }
  clamp     (min, max) { return this._mutate(v => Math.min(max, Math.max(min, v))); }
  round     ()         { return this._mutate(v => Math.round(v)); }
  floor     ()         { return this._mutate(v => Math.floor(v)); }
  ceil      ()         { return this._mutate(v => Math.ceil(v)); }
  abs       ()         { return this._mutate(v => Math.abs(v)); }
  sqrt      ()         { return this._mutate(v => Math.sqrt(v)); }
  log       ()         { return this._mutate(v => Math.log(v)); }

  //
  toDecremented (n = 1)    { return this.clone().decrement(n); }
  toIncremented (n = 1)    { return this.clone().increment(n); }
  toScaled      (factor)   { return this.clone().scale(factor); }
  toClamped     (min, max) { return this.clone().clamp(min, max); }
  toCeiled      ()         { return this.clone().ceil();  }
  toFloored     ()         { return this.clone().floor(); }
  toRounded     ()         { return this.clone().round(); }
  
};
