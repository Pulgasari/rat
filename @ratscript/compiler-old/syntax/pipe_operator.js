// @ratscript/compiler/syntax/pipe_operator.js

export default function (code) {
  // ==========================================
  // X. NEW: The RatScript Pipe Operator (|>)
  // Erkennt: links |> rechts(..., #, ...)
  // Verarbeitet die Kette strikt von links nach rechts
  // ==========================================
  while (code.includes('|>' )) {
    // Regex-Erklärung:
    // Group 1: Alles links von |>, was keine neue Zeile oder ein anderes |> ist
    // Group 2: Alles rechts von |>, bis zum nächsten |>, einer neuen Zeile oder einem Semikolon
    code = code.replace(/([^|>\n]+)\s*\|>\s*([^|>\n;]+)/, (match, leftSide, rightSide) => {
      const left  =  leftSide.trim();
      const right = rightSide.trim();
      
      // Wenn auf der rechten Seite unser Platzhalter # existiert, ersetzen wir ihn durch die linke Seite
      if (right.includes('#')) {
        return right.replace(/#/g, left);
      }
      
      // Fallback-Schutz: Falls der Entwickler das # vergessen hat, 
      // hängen wir es als Funktionsaufruf hinten an (z.B. x |> func -> func(x))
      if (right.endsWith(')')) {
        // Wenn es bereits klammern hat, aber kein #, fügen wir es vorne ein
        return right.replace('(', `(${left}, `).replace(', )', ')');
      }
      return `${right}(${left})`;
    });
  }

  return code;
};
