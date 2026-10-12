// @rat/syntax :: tree-sitter grammar for .rat.js (script first)

import define from '../common.js';

export default define('ratjs', $ => repeat($._script));
