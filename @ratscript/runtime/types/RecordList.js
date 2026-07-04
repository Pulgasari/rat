// @ratscript/runtime/types/RecordList.js

import ObjectList from './ObjectList.js';
import Record     from './Record.js';

export default class RecordList extends ObjectList {

  // init
  constructor (struct, ...records) {
    super(...records);
    this.struct = struct;

    for (let r of this._values) {
      this._validateRecord(r);
    }
  }
  
  // mutate
  push (record) {
    this._validateRecord(record);
    return super.push(record);
  }
  set (index, record) {
    this._validateRecord(record);
    return super.set(index, record);
  }
  unshift (record) {
    this._validateRecord(record);
    return super.unshift(record);
  }

  // internals
  _validateRecord (record) {
    if (!(record instanceof Record))   throw new TypeError("RecordList expects Record instances");
    if (record.struct !== this.struct) throw new TypeError("RecordList expects Records of the same Struct");
  }
  
}
