// @ratscript/compiler/lexer/index_new.js

// :::::: IMPORTS

// @cosmonaut
import Lexer as LexerClass, { makeRulesFromKeywords, makeRulesFromOperators, makeRulesFromPuncts } from '@cosmonaut/lexer';
import { javascript, doubleQuotesString, singleQuotesString } from '@cosmonaut/presets'|

// @ratscript/compiler
import { keywords, puncts, operators, TokenType } from './../meta.js';
import { scanJSXElement, scanTemplateString } from './helpers.js';

// :::::: THE LEXER (MAIN EXPORT)

export const Lexer = new LexerClass ({
  comments : javascript.comments,
  keywords : keywords,
  rules    : [
    makeRulesFromOperators(operators),
    makeRulesFromPuncts(puncts),
    doubleQuotesString,
    singleQuotesString,
    { id: 'number', type: TokenType.NUMBER , regex: /0[xX][0-9a-fA-F](?:_?[0-9a-fA-F])*|0[bB][01](?:_?[01])*|0[oO][0-7](?:_?[0-7])*|(?:\d(?:_?\d)*)?\.\d(?:_?\d)*(?:[eE][+-]?\d+)?|\d(?:_?\d)*\.(?!\.)(?:[eE][+-]?\d+)?|\d(?:_?\d)*(?:[eE][+-]?\d+)?/y },
    // kürzer? /0(?:x[\da-f](?:_?[\da-f])*|b[01](?:_?[01])*|o[0-7](?:_?[0-7])*)|(?:(?:\d(?:_?\d)*)?\.\d(?:_?\d)*|\d(?:_?\d)*(?:\.(?!\.))?)(?:e[+-]?\d+)?/i
  ],
  scanners : [
    scanTemplateString,
    scanJSXElement,
  ],
  skipComments    : true,
  skipWhitespaces : true,
});

default export Lexer;
