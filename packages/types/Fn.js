// @rat/types :: Fn

/*
Fn is the schema of a function: Record({ exec: Fn }). nothing is coerced.
*/

import { Schema, scalar } from './schema.js';

// ::: SCHEMA

const Fn = new Schema({ initial: undefined, kind: 'fn', run: scalar('a function', value => typeof value === 'function') });

// :::::: EXPORT

export { Fn };
