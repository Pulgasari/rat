// @ratscript/compiler/syntax/try_catch.js

/**
 * Transformiert die modernisierte RatScript try/catch-Syntax in natives JavaScript.
 * Erlaubt blocklose Einzeiler, klammerlose Catches und Standalone-Trys (Silent Fails).
 */
export default function (code) {
  let pos = 0;

  while (true) {
    // Finde das nächste freistehende 'try'
    const match = code.slice(pos).match(/\btry\b/);
    if (!match) break;

    const tryIndex = pos + match.index;
    let startOfBody = tryIndex + 3;
    
    // Whitespace überspringen
    while (startOfBody < code.length && /\s/.test(code[startOfBody])) {
      startOfBody++;
    }

    let tryBody  = '';
    let isBraced = code[startOfBody] === '{';
    let endOfTry = startOfBody;

    // 1. TRY-BODY ISOLIEREN
    if (isBraced) {
      // Klassischer Block { ... }: Klammer-Tiefe tracken
      let depth = 1;
      endOfTry++;
      while (endOfTry < code.length && depth > 0) {
        if (code[endOfTry] === '{') depth++;
        else if (code[endOfTry] === '}') depth--;
        endOfTry++;
      }
      tryBody = code.slice(startOfBody + 1, endOfTry - 1);
    } else {
      // Modernes Inline-Statement: Lesen bis Semicolon, Newline oder dem 'catch'-Keyword
      let inlineEnd = startOfBody;
      while (inlineEnd < code.length) {
        if (code[inlineEnd] === ';' || code[inlineEnd] === '\n') {
          inlineEnd++;
          break;
        }
        if (code.slice(inlineEnd).match(/^\bcatch\b/)) {
          break; // Stop direkt vor dem catch-Keyword!
        }
        inlineEnd++;
      }
      tryBody = code.slice(startOfBody, inlineEnd).trim();
      if (!tryBody.endsWith(';')) tryBody += ';';
      endOfTry = inlineEnd;
    }

    // 2. NACH FOLGENDEM CATCH SUCHEN
    let lookAhead = endOfTry;
    while (lookAhead < code.length && /\s/.test(code[lookAhead])) {
      lookAhead++;
    }

    const hasCatch = code.slice(lookAhead).match(/^\bcatch\b/);
    let catchBody = '';
    let catchVar  = '';
    let totalEnd  = endOfTry;

    if (hasCatch) {
      let startOfCatchBody = lookAhead + 5;
      while (startOfCatchBody < code.length && /\s/.test(code[startOfCatchBody])) {
        startOfCatchBody++;
      }

      // Prüfen, ob eine optionale Fehler-Variable existiert, z.B. (e)
      if (code[startOfCatchBody] === '(') {
        let closingParen = code.indexOf(')', startOfCatchBody);
        catchVar = code.slice(startOfCatchBody + 1, closingParen).trim();
        startOfCatchBody = closingParen + 1;
        while (startOfCatchBody < code.length && /\s/.test(code[startOfCatchBody])) {
          startOfCatchBody++;
        }
      }

      // CATCH-BODY ISOLIEREN
      let isCatchBraced = code[startOfCatchBody] === '{';
      if (isCatchBraced) {
        let depth = 1;
        let endOfCatch = startOfCatchBody + 1;
        while (endOfCatch < code.length && depth > 0) {
          if (code[endOfCatch] === '{') depth++;
          else if (code[endOfCatch] === '}') depth--;
          endOfCatch++;
        }
        catchBody = code.slice(startOfCatchBody + 1, endOfCatch - 1);
        totalEnd = endOfCatch;
      } else {
        let inlineCatchEnd = startOfCatchBody;
        while (inlineCatchEnd < code.length && code[inlineCatchEnd] !== ';' && code[inlineCatchEnd] !== '\n') {
          inlineCatchEnd++;
        }
        if (inlineCatchEnd < code.length && code[inlineCatchEnd] === ';') inlineCatchEnd++;
        catchBody = code.slice(startOfCatchBody, inlineCatchEnd).trim();
        if (!catchBody.endsWith(';')) catchBody += ';';
        totalEnd = inlineCatchEnd;
      }
    }

    // 3. NATIVEN TRY-CATCH-BLOCK REKONSTRUIEREN
    let replacement = '';
    if (hasCatch) {
      const errPart = catchVar ? `(${catchVar})` : '';
      replacement = `try {\n  ${tryBody.trim()}\n} catch ${errPart} {\n  ${catchBody.trim()}\n}`;
    } else {
      // Wenn catch fehlt -> automatischer Silent Fail via nativem ES2019 Optional Catch Binding
      replacement = `try {\n  ${tryBody.trim()}\n} catch {}`;
    }

    code = code.slice(0, tryIndex) + replacement + code.slice(totalEnd);
    pos = tryIndex + replacement.length;
  }

  return code;
}
