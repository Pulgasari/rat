// @ratscript/compiler/syntax/named_arguments.js

export default function transform (code) {

  // Define a Function
  const funcDefRegex = /function\s+(\w+)\s*\(([^)]+)\)/g;
  processedCode = processedCode.replace(funcDefRegex, (match, funcName, args) => {
    return (args.trim().startsWith('{'))
      ? match
      : `function ${funcName}({ ${args} } = {})`;
  });

  // Call a Function
  const funcCallNamedRegex = /(\w+)\s*\(([^)]*:[^)]*)\)/g;
  code = code.replace(funcCallNamedRegex, (match, funcName, body) => {
    return (body.trim().startsWith('{'))
      ? match
      : `${funcName}({ ${body} })`;
  });

  return code;
};
