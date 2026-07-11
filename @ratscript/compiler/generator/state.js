// @ratscript/compiler/generator/state.js

const usedHelpers = new Set;
export const resetHelpers   = ()     => usedHelpers.clear();
export const useHelper      = (name) => usedHelpers.add(name);
export const getUsedHelpers = ()     => [...usedHelpers];







