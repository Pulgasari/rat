// @rat/runtime/shared.js

const isTypeOf = (v) => (sth) => typeof v === sth;
const isFn     = isTypeOf('function');
const isString = isTypeOf('string');

// :::::: EXPORT

export {
  isFn, isString,
}
