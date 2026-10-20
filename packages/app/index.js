// @rat/app

// the registry of reactive variants: let $todos = [] in a .rat file is a $List from here on
import '@rat/types';

export * from './elements/index.js';
export * from './loader.js';

// RAT without the global: import RAT from '@rat/app'
export { rat as default } from './elements/index.js';
