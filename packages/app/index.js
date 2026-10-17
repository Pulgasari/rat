// @rat/app

// the registry of reactive variants: let $todos = [] in a .rat file is a $List from here on
import '@rat/types';

export { RatApp, RatPart }               from './elements.js';
export { compileFile, componentOf, load } from './loader.js';
