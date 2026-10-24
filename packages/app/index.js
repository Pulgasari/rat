// @rat/app

// the registry of reactive variants: let $todos = [] in a .rat file is a $Array from here on
import '@rat/types';

export * from './elements/index.js';
export * from './run/loader.js';

// the global RAT as a module: import RAT from '@rat/app'
export { RAT as default } from './elements/index.js';
