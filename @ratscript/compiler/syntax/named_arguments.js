// @ratscript/compiler/syntax/named_arguments.js

export default function transform (code) {

  // Define a Function
  const regexPattern = /(\w+)\s*\(([^)]*:[^)]*)\)/g;
  code = code.replace(regexPattern, (match, funcName, body) => {  
    return (body.trim().startsWith('{'))
      ? match
      : `${funcName}({ ${body} })`;
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
