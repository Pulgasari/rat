// @ratscript/compiler/syntax/guard.js

export default function transform (code) {

  // ==========================================
  // 4. Line Guards: return if (...) do ...
  // ==========================================
  // Variante mit do-Block oder do-Statement: return if (x) do bye();
  code = code.replace(/return\s+if\s*\((.+?)\)\s*do\s*(\{[\s\S]*?\}|[^;\n]+)\s*;/g, (match, cond, action) => {
    const act = formatAction(action);
    return `if (${cond}) {\n  ${act}  return;\n}`;
  });

  // Variante simpel: return if (x);
  code = code.replace(/return\s+if\s*\((.+?)\)\s*;/g, (match, cond) => {
    return `if (${cond}) return;`;
  });

  // ==========================================
  // 5. Assignment Guards (or, ||, ??)
  // ==========================================
  // Variante 1: mit return [wert] AND do [aktion] (or return false do { ... })
  code = code.replace(/(let|const|var)\s+(\w+)\s*=\s*(.+?)\s+(or|\|\||\?\?)\s+return(\s+[^\n;do]+)?\s+do\s*(\{[\s\S]*?\}|[^;\n]+)\s*;/g, (match, dec, name, expr, op, retVal, action) => {
    const cond = getGuardCondition(name, op);
    const act  = formatAction(action);
    const rv   = retVal ? retVal.trim() : '';
    return `${dec} ${name} = ${expr};\nif (${cond}) {\n  ${act}  return ${rv};\n}`;
  });

  // Variante 2: NUR return [wert] (or return false; oder ?? return;)
  code = code.replace(/(let|const|var)\s+(\w+)\s*=\s*(.+?)\s+(or|\|\||\?\?)\s+return(\s+[^\n;]+)?\s*;/g, (match, dec, name, expr, op, retVal) => {
    const cond = getGuardCondition(name, op);
    const rv   = retVal ? retVal.trim() : '';
    return `${dec} ${name} = ${expr};\nif (${cond}) return ${rv};`;
  });

  // Variante 3: NUR do [aktion] (Side-Effect ohne Abbruch: or do bye();)
  code = code.replace(/(let|const|var)\s+(\w+)\s*=\s*(.+?)\s+(or|\|\||\?\?)\s+do\s*(\{[\s\S]*?\}|[^;\n]+)\s*;/g, (match, dec, name, expr, op, action) => {
    const cond = getGuardCondition(name, op);
    const act   = formatAction(action);
    return `${dec} ${name} = ${expr};\nif (${cond}) {\n  ${act}}`;
  });

  return code;
};
