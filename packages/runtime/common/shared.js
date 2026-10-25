// @rat/runtime :: shared

const isTypeOf = type => value => typeof value === type;
const isFn     = isTypeOf('function');
const isString = isTypeOf('string');

// :::::: EXPORT

export * from '@rat/signals';

export {
  isFn, isString,
}
