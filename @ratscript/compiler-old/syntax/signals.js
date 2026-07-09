// @ratscript/compiler/syntax/signals.js

let _sig = str => '__' + str; // ??

export default function (code) {
  // ==========================================
  // 6. Framework Keywords (Signals, Effects, Stylesheets)
  // ==========================================
  const stylesheetRegex = /stylesheet\s+(['"`])(.+?)\1\s*;/g;
  code = code.replace(stylesheetRegex, (match, quote, path) => {
    return `linkStylesheet('${path}');`;
  });

  const signalRegex = /signal\s+\$(\w+)(?:\s*:\s*(\w+))?\s*=\s*(.+?);/g;
  let signalsList = new Set();

  code = code.replace(signalRegex, (match, name, type, value) => {
    signalsList.add(name);
    const className = type === 'bool' ? 'SignalBool' : 'Signal';
    return `const ${_sig(name)} = new ${className}(${value});`;
  });

  const effectRegex = /effect\s*\{([\s\S]*?)\};/g;
  code = code.replace(effectRegex, (match, blockContent) => {
    return `new Effect(() => {${blockContent}});`;
  });

  // ==========================================
  // 7. Framework Dollar-Stripping ($theme -> __theme.value)
  // ==========================================
  signalsList.forEach(signalName => {
    const dollarRegex = new RegExp(`\\$${signalName}\\b`, 'g');
    code = code.replace(dollarRegex, `${_sig(signalName)}.value`);
  });

  return code;
};
