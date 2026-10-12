// @rat/syntax :: acode plugin
// bundled into dist/main.js by build.js. acode loads it as a classic script

import { parser } from '../targets/codemirror.js';
import { files }  from '../spec.js';

const ID = 'dev.pulgasari.rat';

const { StreamLanguage } = acode.require('@codemirror/language');
const languages          = acode.require('editorLanguages');

acode.setPluginInit(ID, () => {
  for (const [id, { extensions, name }] of Object.entries(files)) {
    languages.register(id, extensions.join('|'), name, () => StreamLanguage.define(parser(id)));
  }
});

acode.setPluginUnmount(ID, () => {
  for (const id of Object.keys(files)) languages.unregister(id);
});
