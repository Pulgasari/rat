// @ratscript/compiler/syntax/named_arguments.js

export default function transform (code) {
  const regexPattern = /(\w+)\s*\(([^)]*:[^)]*)\)/g;
  
  code = code.replace(regexPattern, (match, funcName, body) => {  
    return (body.trim().startsWith('{'))
      ? match
      : `${funcName}({ ${body} })`;
  });

  return code;
};
