// @ratscript/compiler/utils.js

import * as NodeTypes from './nodes.js';

  
function createNode (type, args = {}) {
  const def = NodeTypes[type];
  if (!def) throw new Error(`Unknown node type: ${type}`);

  const node = { type: def.type };

  for (const [key, meta] of Object.entries(def.args)) {
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

export const AST = new Proxy({}, {
  get(_, prop) {
    return (args = {}) => createNode(prop, args);
  }
});
