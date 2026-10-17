// @rat/import
// @ts-self-types="./index.d.ts"

export { configure }            from './core.js';
export { importFile, register } from './file.js';
export { resolveMode }          from './modes.js';

export { importJS, importJSX, importTS, importTSX, importWASM } from './code.js';
export {
  importCSV, importENV, importINI, importJSON, importJSON5,
  importJSONC, importJSONL, importTOML, importXML, importYAML,
} from './data.js';
export { importHTML, importMD, importSVG, importText, renderMD } from './markup.js';
export { importCSS, importLESS, importSASS, importSCSS }         from './styles.js';

export { importFile as default } from './file.js';
