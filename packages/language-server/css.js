// @rat/language-server :: css

/*
<style> through vscode-css-languageservice. the service gets the css text
of the document (document.js): the style blocks at their places, everything
else blank. positions are those of the .rat file, nothing is mapped.
<style lang="scss"> gets the scss service, other languages are left alone.
*/

import * as service from 'vscode-css-languageservice';
import { TextDocument } from 'vscode-languageserver-textdocument';

// esm build in a bundler, commonjs in node: the functions sit on the namespace or on its default
const api = service.getCSSLanguageService ? service : service.default;

const languages = { css: api.getCSSLanguageService(), scss: api.getSCSSLanguageService() };

const langOf = attributes => /\blang=["']?(\w+)/.exec(attributes ?? '')?.[1] ?? 'css';

function serviceOf (model) {
  const lang = model.styles.length ? langOf(model.styles[0].attributes) : 'css';
  return languages[lang] ? { lang, language: languages[lang] } : null;
}

// one virtual document per analysis
const documents = new WeakMap;
function virtual (model, uri, lang) {
  let document = documents.get(model);
  if (!document) documents.set(model, document = TextDocument.create(`${uri}.${lang}`, lang, 1, model.css));
  return document;
}

function prepare (model, uri) {
  if (!model.styles.length) return null;
  const found = serviceOf(model);
  if (!found) return null;
  const document = virtual(model, uri, found.lang);
  return { document, language: found.language, sheet: found.language.parseStylesheet(document) };
}

const css = {
  diagnostics (model, uri) {
    const state = prepare(model, uri);
    return state ? state.language.doValidation(state.document, state.sheet).map(item => ({ ...item, source: 'rat:css' })) : [];
  },

  complete (model, uri, position) {
    const state = prepare(model, uri);
    return state ? state.language.doComplete(state.document, position, state.sheet)?.items ?? null : null;
  },

  hover (model, uri, position) {
    const state = prepare(model, uri);
    return state ? state.language.doHover(state.document, position, state.sheet) : null;
  },

  colors (model, uri) {
    const state = prepare(model, uri);
    return state ? state.language.findDocumentColors(state.document, state.sheet) : [];
  },

  presentations (model, uri, color, range) {
    const state = prepare(model, uri);
    return state ? state.language.getColorPresentations(state.document, state.sheet, color, range) : [];
  },
};

export { css };
