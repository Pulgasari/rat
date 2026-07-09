// @ratscript/compiler/syntax/cond.js

export default function transform (code) {
  const condsList = new Set;

  // 1. Definitionen parsen: cond name = ...;
  // Erkennt: cond isSomething = $bla === true;
  // Macht daraus: const isSomething = createCond('isSomething', () => $bla === true);
  const condDefinitionRegex = /cond\s+(\w+)\s*=\s*(.+?)\s*;/g;
  code = code.replace(condDefinitionRegex, (match, name, body) => {
    condsList.add(name); // Namen für später merken!
  
    // Prüfen, ob das Body bereits eine Funktion ist (z.B. sth => ...)
    // Wenn nicht, verpacken wir es automatisch in eine Lazy-Arrow-Function () => body
    let finalBody = body.trim();
    if (!finalBody.includes('=>') && !finalBody.startsWith('function')) {
      finalBody = `() => ${finalBody}`;
    }
  
    return `const ${name} = createCond('${name}', ${finalBody});`;
  });

  // 2. Den "is"-Operator für Predicates auflösen (input is nullish -> nullish(input))
  code = code.replace(/(\w+)\s+is\s+(\w+)/g, (match, variable, condName) => {
    return `${condName}(${variable})`;
  });

  // 3. Automatische Klammern für klammerlose Conds in "return if" und "match"
  // Wenn der Compiler im Code auf einen Namen aus der condsList stößt, der ohne () genutzt wird,
  // fixen wir das für das valide JavaScript.
  condsList.forEach(condName => {
    // Findet den Namen, solange KEINE Klammer danach kommt und es kein Variablen-Präfix ist
    const klammerlosRegex = new RegExp(`\\b${condName}\\b(?!\\s*\\()`, 'g');
    
    // Wir mutieren das aber nur in Kontrollstrukturen (z.B. im return if oder match)
    // Für ein einfaches Suchen-und-Ersetzen reicht das hier vollkommen:
    code = code.replace(klammerlosRegex, `${condName}()`);
  });

  return code;
};
