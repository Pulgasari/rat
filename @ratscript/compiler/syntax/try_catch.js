// @ratscript/compiler/syntax/try_catch.js

/**
 * Transformiert die modernisierte RatScript try/catch/finally-Syntax in natives JavaScript.
 * Erlaubt blocklose Einzeiler, klammerlose Catches, optionale Finallies und Standalone-Trys (Silent Fails).
 */
export default function transform__try_catch(code) {
  let pos = 0;

  while (true) {
    // 1. Finde das nächste freistehende 'try'
    const match = code.slice(pos).match(/\btry\b/);
    if (!match) break;

    const tryIndex = pos + match.index;
    let startOfBody = tryIndex + 3;
    
    while (startOfBody < code.length && /\s/.test(code[startOfBody])) {
      startOfBody++;
    }

    let tryBody = '';
    let isBraced = code[startOfBody] === '{';
    let endOfTry = startOfBody;

    // TRY-BODY ISOLIEREN
    if (isBraced) {
      let depth = 1;
      endOfTry++;
      while (endOfTry < code.length && depth > 0) {
        if (code[endOfTry] === '{') depth++;
        else if (code[endOfTry] === '}') depth--;
        endOfTry++;
      }
      tryBody = code.slice(startOfBody + 1, endOfTry - 1);
    } else {
      let inlineEnd = startOfBody;
      while (inlineEnd < code.length) {
        if (code[inlineEnd] === ';' || code[inlineEnd] === '\n') {
          inlineEnd++;
          break;
        }
        // Stop, falls direkt das nächste Keyword folgt
        if (code.slice(inlineEnd).match(/^\bcatch\b/) || code.slice(inlineEnd).match(/^\bfinally\b/)) {
          break;
        }
        inlineEnd++;
      }
      tryBody = code.slice(startOfBody, inlineEnd).trim();
      if (!tryBody.endsWith(';')) tryBody += ';';
      endOfTry = inlineEnd;
    }

    // 2. NACH FOLGENDEM CATCH SUCHEN
    let lookAheadCatch = endOfTry;
    while (lookAheadCatch < code.length && /\s/.test(code[lookAheadCatch])) lookAheadCatch++;

    const hasCatch = code.slice(lookAheadCatch).match(/^\bcatch\b/);
    let catchBody = '';
    let catchVar = '';
    let endOfCatchChain = endOfTry;

    if (hasCatch) {
      let startOfCatchBody = lookAheadCatch + 5;
      while (startOfCatchBody < code.length && /\s/.test(code[startOfCatchBody])) startOfCatchBody++;

      if (code[startOfCatchBody] === '(') {
        let closingParen = code.indexOf(')', startOfCatchBody);
        catchVar = code.slice(startOfCatchBody + 1, closingParen).trim();
        startOfCatchBody = closingParen + 1;
        while (startOfCatchBody < code.length && /\s/.test(code[startOfCatchBody])) startOfCatchBody++;
      }

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
        endOfCatchChain = endOfCatch;
      } else {
        let inlineCatchEnd = startOfCatchBody;
        while (inlineCatchEnd < code.length && code[inlineCatchEnd] !== ';' && code[inlineCatchEnd] !== '\n') {
          if (code.slice(inlineCatchEnd).match(/^\bfinally\b/)) break; // Stop vorm finally!
          inlineCatchEnd++;
        }
        if (inlineCatchEnd < code.length && code[inlineCatchEnd] === ';') inlineCatchEnd++;
        catchBody = code.slice(startOfCatchBody, inlineCatchEnd).trim();
        if (!catchBody.endsWith(';')) catchBody += ';';
        endOfCatchChain = inlineCatchEnd;
      }
    }

    // 3. NACH FOLGENDEM FINALLY SUCHEN
    let lookAheadFinally = endOfCatchChain;
    while (lookAheadFinally < code.length && /\s/.test(code[lookAheadFinally])) lookAheadFinally++;

    const hasFinally = code.slice(lookAheadFinally).match(/^\bfinally\b/);
    let finallyBody = '';
    let totalEnd = endOfCatchChain;

    if (hasFinally) {
      let startOfFinallyBody = lookAheadFinally + 7;
      while (startOfFinallyBody < code.length && /\s/.test(code[startOfFinallyBody])) startOfFinallyBody++;

      let isFinallyBraced = code[startOfFinallyBody] === '{';
      if (isFinallyBraced) {
        let depth = 1;
        let endOfFinally = startOfFinallyBody + 1;
        while (endOfFinally < code.length && depth > 0) {
          if (code[endOfFinally] === '{') depth++;
          else if (code[endOfFinally] === '}') depth--;
          endOfFinally++;
        }
        finallyBody = code.slice(startOfFinallyBody + 1, endOfFinally - 1);
        totalEnd = endOfFinally;
      } else {
        let inlineFinallyEnd = startOfFinallyBody;
        while (inlineFinallyEnd < code.length && code[inlineFinallyEnd] !== ';' && code[inlineFinallyEnd] !== '\n') {
          inlineFinallyEnd++;
        }
        if (inlineFinallyEnd < code.length && code[inlineFinallyEnd] === ';') inlineFinallyEnd++;
        finallyBody = code.slice(startOfFinallyBody, inlineFinallyEnd).trim();
        if (!finallyBody.endsWith(';')) finallyBody += ';';
        totalEnd = inlineFinallyEnd;
      }
    }

    // 4. NATIVEN TRY-CATCH-FINALLY BLOCK REKONSTRUIEREN
    let replacement = `try {\n  ${tryBody.trim()}\n}`;
    
    if (hasCatch) {
      const errPart = catchVar ? `(${catchVar})` : '';
      replacement += ` catch ${errPart} {\n  ${catchBody.trim()}\n}`;
    } else if (!hasFinally) {
      // Reines Standalone-Try -> Automatischer Silent Fail
      replacement += ` catch {}`;
    }
    
    if (hasFinally) {
      replacement += ` finally {\n  ${finallyBody.trim()}\n}`;
    }

    code = code.slice(0, tryIndex) + replacement + code.slice(totalEnd);
    pos = tryIndex + replacement.length;
  }

  return code;
      }
