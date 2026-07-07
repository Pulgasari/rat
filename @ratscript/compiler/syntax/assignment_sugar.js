// @ratscript/compiler/syntax/assignment_sugar.js

const plusAssignRegex = /([a-zA-Z0-9_$.[\]]+)\s*\+=\s*([^;\n]+)/g;

export default function (code) {
  code = code.replace(plusAssignRegex, (match, left, right) => {
    const l = left.trim();
    const r = right.trim();
    return `${l} = _assign(${l}, ${r})`;
  });

  return code;
};
