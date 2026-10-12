// @rat/syntax :: tree-sitter grammar for .rat (markup first)

import define from '../common.js';

export default define('rat', $ => repeat($._markup));
