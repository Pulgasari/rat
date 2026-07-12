// @ratscript/compiler/utils.js

import * as NodeTypes from './nodes.js';

  
function normalizeArgs (rawArgs) {
  if (Array.isArray(rawArgs)) {
    // Kurzform: ['from', 'to'] -> { from: {}, to: {} }
    return Object.fromEntries(rawArgs.map(key => [key, {}]));
  }
  return rawArgs;
}

function createNode (type, args = {}) {
  const def     = NodeTypes[type]; if (!def) throw new Error(`Unknown node type: ${type}`);
  const node    = { type: def.type };
  const argDefs = normalizeArgs(def.args);

  for (const [key, meta] of Object.entries(argDefs)) {
    if (args[key] !== undefined) {
      node[key] = args[key];
    } else if (meta.default !== undefined) {
      node[key] = meta.default;
    } else if (meta.required) {
      throw new Error(`Missing required argument '${key}' for node '${type}'`);
    } else {
      node[key] = null;
    }
  }

  return node;
}

export const ASTNode = new Proxy({}, {
  get (_, prop) {
    return (args = {}) => createNode(prop, args);
  }
});

// :::::: Evil Factory

export function createEvilFactory ({ prefix, source, applyCaller = true }) {
  const sources   = Array.isArray(source) ? source : [source];
  const targetObj = {};
  sources.forEach( sourceObj => {
    for (const [key, body] of Object.entries(sourceObj)) {
      const prefix = 'generate';
      const name   = key.replace(new RegExp(`^${prefix}`), '');
      
      Object.defineProperty(targetObj, name, { 
        get () { return body(); },
        enumerable: true
      });
      
      //delete sourceObj[key];
    });
  }

  // apply caller
  if (applyCaller) targetObj.call = name => targetObj[name];

  // done!
  return targetObj;
};
