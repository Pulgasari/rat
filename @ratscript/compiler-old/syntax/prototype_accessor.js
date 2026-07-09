// packages/compiler/syntax/prototype_accessor.js

export default function (code) {
  
  // 1. Definitionen abfangen: function Klasse::methode(args) { ... }
  // Transformiert zu: Klasse.prototype.methode = function(args) { ... }
  const definitionRegex = /function\s+([a-zA-Z0-9_$]+)::([a-zA-Z0-9_$]+)\s*\(([^)]*)\)/g;
  code = code.replace(definitionRegex, (match, className, methodName, args) => {
    return `${className}.prototype.${methodName} = function(${args})`;
  });

  // 2. Reine Zugriffe abfangen: Klasse::methode.call(...)
  // Transformiert zu: Klasse.prototype.methode.call(...)
  const usageRegex = /([a-zA-Z0-9_$]+)::([a-zA-Z0-9_$]+)/g;
  code = code.replace(usageRegex, '$1.prototype.$2');

  return code;
}
