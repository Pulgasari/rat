// @ratscript/runtime/helpers/_assign.js

// +=
export default function _assign (left, right) {
  //
  if (left === undefined || left === null) return right;

  // Number | String
  if (typeof left === 'number' || typeof left === 'string') {
    return left + right;
  }

  // Array
  if (Array.isArray(left)) {
    left.push(right);
    return left;
  }

  // Map
  if (left instanceof Set) {
    left.add(right);
    return left;
  }

  // Map
  if (left instanceof Map) {
    if (Array.isArray(right) && right.length === 2) {
      left.set(right[0], right[1]); // map += ['key', 'value']
    } else if (typeof right === 'object' && right !== null) {
      for (let [k, v] of Object.entries(right)) left.set(k, v); // map += { key: 'value' }
    }
    return left;
  }

  // Object
  if (typeof left === 'object') {
    return Object.assign(left, right);
  }

  // Fallback
  return left + right; 
}
