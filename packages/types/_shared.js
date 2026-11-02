import { Schema } from './schema.js';   // circular, read only when isSchema() runs

export const

isArray   = Array.isArray,
isInteger = Number.isInteger,

isBool   = (value) => typeof value === 'boolean',
isFn     = (value) => typeof value === 'function',
isMap    = (value) => value instanceof Map,
isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value),      
isSchema = (value) => value instanceof Schema,
isString = (value) => typeof value === 'string',
isSymbol = (value) => typeof value === 'symbol';
