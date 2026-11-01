

export const
isArray   = Array.isArray,
isInteger = Number.isInteger,

isFn     = (value) => typeof value === 'function',
isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value),      
isSchema = (value) => value instanceof Schema,
isString = (value) => typeof value === 'string';
