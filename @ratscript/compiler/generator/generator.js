// @ratscript/compiler/generator/generator.js

export class Generator {
  generate(node) {
    if (!node) return '';

    switch (node.type) {
      case 'Program':
        // Das gesamte Programm besteht aus einer Liste von Statements
        return node.body.map(stmt => this.generate(stmt)).join('\n');

      case 'SiftStatement':
        return this.generateSift(node);

      case 'Expression':
        // Ein einfacher Ausdruck bekommt im JS-Output sein Semikolon
        return `${node.value};`;

      default:
        throw new Error(`[Generator-Fehler]: Unbekannter AST-Knoten-Typ "${node.type}"`);
    }
  }

  generateSift(node) {
    let js = `(() => {\n`;

    // 1. 'init'-Block ausführen (falls vorhanden)
    if (node.init) {
      js += `  // Init\n`;
      node.init.forEach(stmt => {
        js += `  ${this.generate(stmt)}\n`;
      });
    }

    js += `  try {\n`;

    // 2. Die sequentiellen 'if'-Statements für die Bedingungen generieren
    node.cases.forEach(c => {
      js += `    if (${c.condition.value}) {\n`;
      c.body.forEach(stmt => {
        js += `      ${this.generate(stmt)}\n`;
      });
      js += `    }\n`;
    });

    // 3. 'catch'-Block generieren (Fallback auf Standard-Rethrow)
    if (node.catchBlock) {
      js += `  } catch (__err) {\n`;
      node.catchBlock.forEach(stmt => {
        js += `    ${this.generate(stmt)}\n`;
      });
    } else {
      js += `  } catch (__err) { throw __err; }\n`;
    }

    // 4. 'finally'-Block generieren (falls vorhanden)
    if (node.finallyBlock) {
      js += `  finally {\n`;
      node.finallyBlock.forEach(stmt => {
        js += `    ${this.generate(stmt)}\n`;
      });
      js += `  }\n`;
    }

    js += `})();`;
    return js;
  }
  }
