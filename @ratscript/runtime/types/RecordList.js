// @ratscript/runtime/types/RecordList.js

import List from './List.js';

export default class RecordList extends List {
  
  constructor(struct, ...records) {
    super(...records);
    this.struct = struct;
    this._type  = 'object';
  }

  push (record) {
    if (record.struct !== this.struct) {
      throw new TypeError("RecordList expects same Struct");
    }
    return super.push(record);
  }

  pluck (key) {
    const result = new List();
    for (let r of this._values) {
      result._values.push(r.get(key));
    }
    return result;
  }

  where (fn) {
    const result = new RecordList(this.struct);
    for (let r of this._values) {
      if (fn(r)) result._values.push(r);
    }
    return result;
  }
  
}
