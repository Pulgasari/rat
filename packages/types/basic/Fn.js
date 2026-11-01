// @rat/types :: Fn

// :::::: IMPORT

import { Schema, scalar } from './../schema.js';
import { isFn } from './../_shared.js';

// ::: SCHEMA

const Fn = new Schema ({ 
  initial : undefined, 
  kind    : 'fn',
  run     : scalar('a function', isFn)
});

// :::::: EXPORT

export { Fn };
