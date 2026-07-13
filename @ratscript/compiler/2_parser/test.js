// :::::: ORIGINAL

export function parseBracketedElements (open, close) {
  consumeToken(open);
  const elements = [];

  if (!isToken(close)) {
    do {
      if (isToken(close)) break; // trailing comma erlaubt
      elements.push(parsed.Expression);
    } while (matchToken(','));
  }

  consumeToken(close);
  return elements;
}

export function parseParamList () {
  consumeToken('(');
  const params = [];
  if (!isToken(')')) {
    do {
      params.push(consumeToken('IDENTIFIER').value);
    } while (matchToken(','));
  }
  consumeToken(')');
  return params;
}

export function parseObjectPattern () {
  consumeToken('{');
  const properties = [];

  if (!isToken('}')) {
    do {
      const keyToken = consumeToken('IDENTIFIER');
      let valueName = keyToken.value;

      if (isToken('as')) {
        advance(); // 'as'
        valueName = consumeToken('IDENTIFIER').value;
      }

      properties.push({ key: keyToken.value, value: valueName });
    } while (matchToken(','));
  }

  consumeToken('}');
  return ASTNode.ObjectPattern({ properties });
}


// :::::: TEST / CONCEPT

fn parseListWithTrailingCommaInBrackets (parseFnOrToken, openToken, closeToken) {
  const  openToken = '{';
  const closeToken = '}';
  return parseListWithTrailingCommaInWrapper(parseFnOrToken, openToken, closeToken);
}
fn parseListWithTrailingCommaInBraces (parseFnOrToken, openToken, closeToken) {
  const  openToken = '[';
  const closeToken = ']';
  return parseListWithTrailingCommaInWrapper(parseFnOrToken, openToken, closeToken);
}
fn parseListWithTrailingCommaInParens (parseFnOrToken, openToken, closeToken) {
  const  openToken = '(';
  const closeToken = ')';
  return parseListWithTrailingCommaInWrapper(parseFnOrToken, openToken, closeToken);
}

function parseList (cb, options) {
  const { trailing = true, wrapper = 'parens' } = options;
  const seperatorToken = ',';

  const [openToken, closeToken] = {
    braces   : '{}',
    brackets : '[]',
    parens   : '()',
  }[wrapper] ?? 'parens';


  
  const elements = [];

  // with wrapper
  if (wrapper && openToken && closeToken) {
    consumeToken(openToken);
    if (!isToken(closeToken)) {
      do {
        if (isToken(closeToken)) break;
        elements.push(cb);
      } while (matchToken(seperatorToken));
    }
    consumeToken(closeToken);
  }

  // without wrapper
  else do {
    if (isToken(closeToken)) break;
    elements.push(cb);
  } while (matchToken(seperatorToken));

  // done!
  return elements;
}

fn parseList (cb, options) {
  const { trailing = true, wrapper: 'parens' };

  const [openToken, closeToken] = {
    braces   : '{}',
    brackets : '[]',
    parens   : '()',
  }[wrapper] ?? 'parens';

  return trailing
       ? parseListWithTrailingSeperatorInWrapper (cb, ',', openToken, closeToken)
       : parseListInWrapper ({ cb, seperatorToken: ',', openToken, closeToken }) 
}

parseList (cb, { wrapper: 'brackets' });
parseList (cb, { wrapper: 'parens', trailing: false });

fn parseListWithTrailingCommaInWrapper (parseFnOrToken, openToken, closeToken) {
  const seperatorToken = ',';
  return parseListWithTrailingSeperatorInWrapper (parseFnOrToken, openToken, closeToken, seperatorToken);
}

fn parseistWithTrailingSeperatorInWrapper (parseFnOrToken, openToken, closeToken, seperatorToken) {
  consumeToken(openToken);
  const elements = parseListWithTrailingSeperator (parseFnOrToken, seperatorToken);
  consumeToken(closeToken);
  return elements;
}

fn parseListWithTrailingSeperator (parseFnOrToken, seperatorToken) {
  const elements = [];

  if (!isToken(closeToken)) {
    do {
      if (isToken(closeToken)) break;
      elements.push(parseFnOrToken);
    } while (matchToken(seperatorToken));
  }
  
  return elements;
}

fn parseWrappedListWithTrailingSeperator (parseFnOrToken, openToken, closeToken, seperatorToken) {
  consumeToken(openToken);
  const elements = [];

  if (!isToken(closeToken)) {
    do {
      if (isToken(closeToken)) break;
      elements.push(parseFnOrToken);
    } while (matchToken(seperatorToken));
  }

  consumeToken(closeToken);
  return elements;
}

export function parseObjectPattern () {
  
  const fn = () => {
    const keyToken = consumeToken('IDENTIFIER');
      let valueName = keyToken.value;

      if (isToken('as')) {
        advance(); // 'as'
        valueName = consumeToken('IDENTIFIER').value;
      }

      properties.push({ key: keyToken.value, value: valueName });
  };
  const properties = parseBrackedElements('{', '}', fn, ',');
  return ASTNode.ObjectPattern({ properties });
}

export function parseParamList () {
  return parseBrackedElements('(', ')', 'IDENTIFIER', ',');
  return parseBrackedElements('(', 'IDENTIFIER', ',', ')');
  return parseBrackedElements('( IDENTIFIER , )');
  return parseBrackedElements('(,) IDENTIFIER');
  return parseBrackedElements('(,)', IDENTIFIER);
  return parseBrackedElements('(,) IDENTIFIER');
  return parseBrackedElements('(,)', 'IDENTIFIER');

  return parseBrackedElements('( IDENTIFIER , )');
  return parseBrackedElements('( <fn> , )', fn);
  return parseBrackedElements('(', 'IDENTIFIER', ',', ')');
  return parseBrackedElements('(', fn, ',', ')');

  return parseBrackedElements({ open: '(', do: 'IDENTIFIER', while: ',' close: ')' });
  return parseListInsideBraces({ open: '(', do: 'IDENTIFIER', while: ',' close: ')' });
  
  
  return parser.$.parseBrackedElements('(', ')', consume('IDENTIFIER'));
}




/*
-- expr   ::= term + expr | term
-- term   ::= factor * term | factor
-- factor ::= (expr) | int


parenthesis = ( )
braces      = [ ]
brackets    = { }
*/

