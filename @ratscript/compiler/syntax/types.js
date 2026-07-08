// @ratscript/compiler/syntax/types.js

export default function (code) {
  code = transformStruct (code);
  code = transformTuple  (code);
  code = transformUnion  (code);
  return code;
}

// RegExp
const      structRegex = /\bstruct\s+([a-zA-Z0-9_$]+)\s*(\{[\s\S]+?\})/g;
const taggedUnionRegex = /\bunion\s+([a-zA-Z0-9_$]+)\s*\{([\s\S]+?)\}/g;

//
function transformStruct (code) {
  return code.replace(structRegex, (match, name, body) => {
    return `const ${name} = new Struct(${body});`;
  });
}

// #(1, 'cat', true) -> new Tuple(1, 'cat', true)
function transformTuple (code) {
  return code.replace(/#\(([\s\S]*?)\)/g, 'new Tuple($1)');
}

// union Response { Loading, Success(payload) } -> const Response = new Union('Response', { Loading: [], Success: ['payload'] });
function transformUnion (code) {
  
  code = code.replace(taggedUnionRegex, (match, unionName, body) => {
    const variants = body.split(',').map(v => v.trim()).filter(Boolean);
    let defEntries = [];
    
    variants.forEach(variant => {
      // Zerlegt "Success(payload)" in Name und Parameter
      const funcMatch = variant.match(/^([a-zA-Z0-9_$]+)(?:\(([^)]*)\))?$/);
      if (funcMatch) {
        const varName = funcMatch[1];
        // Wenn Parameter existieren, machen wir Strings daraus: ['payload'], sonst []
        const params = funcMatch[2] 
          ? funcMatch[2].split(',').map(p => `'${p.trim()}'`).join(', ') 
          : '';
        defEntries.push(`  ${varName}: [${params}]`);
      }
    });

    //
    return `const ${unionName} = new Union('${unionName}', {\n${defEntries.join(',\n')}\n});`;
  });

  return code;
}
