// @ratscript/runtime/helpers/_fn.js

export function _fn (originalFn, paramNames) {
  const wrappedFn = function (...args) {
    // named call (if flagged as '__isNamed')
    if (args.length === 1 && args[0] && args[0].__isNamed) {
      const namedObj       = args[0];
      const positionalArgs = paramNames.map(name => namedObj[name]); // map params
      
      return originalFn.apply(this, positionalArgs);
    }
    // (regular) positional call
    return originalFn.apply(this, args);
  };

  // apply static metadata
  wrappedFn.$params = paramNames;
  
  return wrappedFn;
}
