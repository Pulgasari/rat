// @ratscript/compiler/syntax/multiline_strings.js

export default function (code) {
  // ==========================================
  // 0. NEW: Smart Multiline Strings (3 Backticks)
  // Erkennt: ```html ... ``` oder ``` ... ```
  // Entfernt das Language-Tag und trimmt relative Einrückungen weg.
  // ==========================================
  code = code.replace(/```(\w*)([\s\S]*?)```/g, (match, langTag, content) => {
    let lines = content.split('\n');
    
    // 1. Falls die erste Zeile direkt nach den öffnenden Backticks leer ist, entfernen
    if (lines.length > 0 && lines[0].trim() === '') {
      lines.shift();
    }
    
    // 2. Einrückung berechnen: Wir orientieren uns an der Einrückung der letzten Zeile
    // (wo die schließenden Backticks stehen)
    let baseIndent = 0;
    if (lines.length > 0 && lines[lines.length - 1].trim() === '') {
      baseIndent = lines[lines.length - 1].length;
      lines.pop(); // Die leere Zeile vor den schließenden Backticks entfernen
    } else {
      // Fallback: Falls die schließenden Backticks auf derselben Zeile stehen,
      // suchen wir nach der minimalen Einrückung aller nicht-leeren Zeilen
      let minIndent = Infinity;
      lines.forEach(line => {
        if (line.trim() === '') return;
        const match = line.match(/^(\s*)/);
        if (match && match[1].length < minIndent) {
          minIndent = match[1].length;
        }
      });
      baseIndent = minIndent === Infinity ? 0 : minIndent;
    }

    // 3. Jede Zeile um den berechneten baseIndent-Wert vorne kürzen
    const trimmedLines = lines.map(line => {
      if (line.length >= baseIndent && line.slice(0, baseIndent).trim() === '') {
        return line.slice(baseIndent);
      }
      return line;
    });

    // 4. Als normalen, einzelnen JS-Template-String zurückgeben
    return "`" + trimmedLines.join('\n') + "`";
  });

  return code;
};
