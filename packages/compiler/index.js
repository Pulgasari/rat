// Transformer logic for HTX JS blocks
function transformHTXJavaScript(code) {
  // 1. Transform implicit for..of declarations: for (x of y) -> for (const x of y)
  // Matches "for (" followed by optional whitespace and a variable/destructuring pattern, then "of "
  let transformed = code.replace(
    /\bfor\s*\(\s*(?!(?:const|let|var)\s+)([{[\w\s,$]+)\s+of\b/g,
    'for (const $1 of'
  );

  // 2. Transform simple F#-style pipe operator: x |> fn -> fn(x)
  // Handles chaining: a |> b |> c  =>  c(b(a))
  const pipeRegex = /([\w$.()]+)\s*\|>\s*([\w$.]+)(?:\(([^)]*)\))?/g;
  while (pipeRegex.test(transformed)) {
    transformed = transformed.replace(
      pipeRegex,
      (match, expr, fn, args) => {
        return args ? `${fn}(${expr},${args})` : `${fn}(${expr})`;
      }
    );
  }

  return transformed;
}
