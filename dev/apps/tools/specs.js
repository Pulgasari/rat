// tools :: specs.js
//
// the data tools that share a view, by slug. a workbench takes text and gives text (execute, with formats
// a format to convert to), an inspector reads data into a tree (parse, format to tidy the input). what a
// tool needs from the cdn is imported when it runs

const data = () => import('./modules/data.js');

const FORMATS = {
  csv  : { ext: 'csv',  id: 'csv',  label: 'CSV' },
  js   : { ext: 'js',   id: 'js',   label: 'JS' },
  json : { ext: 'json', id: 'json', label: 'JSON' },
  toml : { ext: 'toml', id: 'toml', label: 'TOML' },
  yaml : { ext: 'yaml', id: 'yaml', label: 'YAML' },
};

const converter = (from, to) => ({
  action      : 'Convert',
  execute     : async (src, format) => (await data()).convert(src, from, format),
  ext         : from,
  formats     : to.map(id => FORMATS[id]),
  placeholder : `Paste ${from.toUpperCase()} here …`,
});

export const workbenches = {
  'base64-decoder' : { action: 'Decode', ext: 'txt', placeholder: 'Paste Base64 here …', execute: src => new TextDecoder().decode(Uint8Array.from(atob(src.trim()), char => char.charCodeAt(0))) },
  'base64-encoder' : { action: 'Encode', ext: 'txt', placeholder: 'Paste text here …',   execute: src => btoa(String.fromCharCode(...new TextEncoder().encode(src))) },

  'css-minifyer'  : { action: 'Minify', ext: 'css',  placeholder: 'Paste CSS here …',        execute: async src => (await import('csso')).minify(src).css },
  'js-minifyer'   : { action: 'Minify', ext: 'js',   placeholder: 'Paste JavaScript here …', execute: async src => (await (await import('terser')).minify(src, { compress: true, mangle: true })).code },
  'json-minifyer' : { action: 'Minify', ext: 'json', placeholder: 'Paste JSON here …',       execute: src => JSON.stringify(JSON.parse(src)) },

  'html-minifyer' : {
    action : 'Minify', ext: 'html', placeholder: 'Paste HTML here …',
    execute: async src => (await import('html-minifier-terser')).minify(src, {
      collapseWhitespace            : true,
      minifyCSS                     : true,
      minifyJS                      : true,
      removeComments                : true,
      removeRedundantAttributes     : true,
      removeScriptTypeAttributes    : true,
      removeStyleLinkTypeAttributes : true,
    }),
  },

  'xml-minifyer' : {
    action : 'Minify', ext: 'xml', placeholder: 'Paste XML here …',
    execute: src => {
      const doc   = new DOMParser().parseFromString(src, 'application/xml');
      const error = doc.querySelector('parsererror');
      if (error) throw new Error(error.textContent);
      return new XMLSerializer().serializeToString(doc).replace(/>\s+</g, '><').trim();
    },
  },

  'csv-converter'  : converter('csv',  ['json', 'yaml', 'toml', 'js']),
  'json-converter' : converter('json', ['csv', 'yaml', 'toml', 'js']),
  'toml-converter' : converter('toml', ['csv', 'json', 'yaml', 'js']),
  'yaml-converter' : converter('yaml', ['csv', 'json', 'toml', 'js']),
};

export const inspectors = {
  'csv-inspector'  : { icon: 'table', label: 'CSV',  parse: async src => (await data()).csvParse(src) },
  'json-inspector' : { icon: 'braces', label: 'JSON', parse: src => JSON.parse(src), format: value => JSON.stringify(value, null, 2) },
  'toml-inspector' : { icon: 'file-cog', label: 'TOML', parse: async src => (await data()).tomlParse(src) },
  'yaml-inspector' : { icon: 'file-code', label: 'YAML', parse: async src => (await data()).yamlParse(src), format: async value => (await data()).yamlStringify(value) },
};
