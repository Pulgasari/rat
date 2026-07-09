// @ratscript/compiler/syntax/inc.js

const incRegex = /([^;\n(|&=<>!]+?)\s+\binc\b\s+([a-zA-Z0-9_$.]+)/g;

export default function (code) {  
  code = code.replace(incRegex, (match, needle, haystack) => {
    return `_inc(${needle.trim()}, ${haystack.trim()})`;
  });

  return code;
};
