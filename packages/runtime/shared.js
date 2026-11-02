// @rat/runtime :: shared

const
isTypeOf = (type) => (value) => typeof value === type;

export const
isFn     = isTypeOf('function'),
isString = isTypeOf('string');

export * from '@rat/signals';
