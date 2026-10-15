// @rat/language-server :: elements

/*
tags and attributes through @htx/analyzer, the same knowledge @htx/ts-plugin
uses: html, svg and custom-elements.json of the workspace. rat markup is
close enough to htx for its scanner once everything that is not markup is
cut out: scripts, styles, {…} holes and block heads become holes of the
template, the rest are its static parts.

the rat parser owns the syntax, so only the analyzer's semantic findings are
kept: unknown attributes of custom elements, values outside an enumeration,
lowercase tags that are no element.
*/

import { analyze, classesOf, complete as completeAt, createContext, definition as definitionAt, hover as hoverAt, regionAt, scan } from '@htx/analyzer';

const KEEP = new Set(['htx-attribute', 'htx-element', 'htx-value']);

// rat's own attribute forms, which a manifest cannot know
const RAT_ATTRIBUTE = /^(@|use:|bind:|on:|once:)/;

const SEVERITY   = { error: 1, info: 3, warning: 2 };
const COMPLETION = { attribute: 10, custom: 7, element: 7, event: 23, keyword: 14, property: 10, shorthand: 18, value: 12 };

// the markup of a document as analyzer templates, one per markup area
function templatesOf (model) {
  const cache = templatesOf.cache ??= new WeakMap;
  if (cache.has(model)) return cache.get(model);

  const areas = model.kind === 'rat'
    ? [{ end: model.text.length, start: 0 }]
    : model.templates.map(template => ({ end: template.end, start: template.start }));

  const cut = [
    ...model.holes.map(hole => ({ end: hole.end, start: hole.start })),
    ...model.segments.filter(segment => segment.range).map(segment => segment.range),
    ...model.styles.map(style => style.range),
  ].sort((a, b) => a.start - b.start);

  const out = areas.map(area => {
    const statics = [];
    const holes   = [];
    let at = area.start;
    for (const range of cut) {
      if (range.start < area.start || range.end > area.end || range.start < at) continue;
      statics.push({ start: at, text: model.text.slice(at, range.start) });
      holes.push(range);
      at = range.end;
    }
    statics.push({ start: at, text: model.text.slice(at, area.end) });
    return scan(statics, holes);
  });

  cache.set(model, out);
  return out;
}

const templateAt = (model, offset) => templatesOf(model).find(template => offset >= template.start && offset <= template.end) ?? null;

// manifests: () => [{ manifest, source, time }], classes: () => Set of the workspace's class names
function createElements (manifests, classes = () => new Set) {
  let context = null;
  let stamp   = null;

  // the context follows the manifests and the classes (the workspace's and the document's own
  // <style>): rebuilt when one of them changed
  function contextOf (model) {
    const list  = manifests();
    const names = [...new Set([...classes(), ...(model ? classesOf(model.css) : [])])].sort();
    const key   = list.map(entry => `${entry.source}:${entry.time}`).join('|') + '#' + names.join(' ');
    if (!context || key !== stamp) { context = createContext({ classes: names, manifests: list, partial: true }); stamp = key; }
    return context;
  }

  const range = (document, start, end) => ({ end: document.positionAt(end), start: document.positionAt(start) });

  return {
    diagnostics (model, document) {
      const text = model.text;
      return templatesOf(model)
        .flatMap(template => analyze(template, contextOf(model)))
        .filter(item => KEEP.has(item.code) && !(item.code === 'htx-attribute' && RAT_ATTRIBUTE.test(text.slice(item.start, item.end))))
        .map(item => ({ code: item.code, message: item.message, range: range(document, item.start, item.end), severity: SEVERITY[item.severity], source: 'rat' }));
    },

    complete (model, document, offset) {
      const template = templateAt(model, offset);
      const result   = template && completeAt(template, offset, contextOf(model));
      if (!result) return null;
      return result.items.map(item => ({
        detail        : item.detail,
        documentation : item.documentation ? { kind: 'markdown', value: item.documentation } : undefined,
        kind          : COMPLETION[item.kind] ?? 1,
        label         : item.label,
        sortText      : item.sort,
        textEdit      : { newText: item.insertText ?? item.label, range: range(document, result.start, result.end) },
      }));
    },

    hover (model, document, offset) {
      const template = templateAt(model, offset);
      const result   = template && hoverAt(template, offset, contextOf(model));
      return result ? { contents: { kind: 'markdown', value: result.markdown }, range: range(document, result.start, result.end) } : null;
    },

    definition (model, document, offset) {
      const template = templateAt(model, offset);
      const result   = template && definitionAt(template, offset, contextOf(model));
      if (!result?.module || !result.source) return null;
      const uri = `file://${result.source.replace(/\/[^/]*$/, '')}/${result.module}`;
      return { range: { end: { character: 0, line: 0 }, start: { character: 0, line: 0 } }, uri };
    },

    // what the markup is at an offset: 'attribute' where an attribute name goes,
    // 'tag' in a tag otherwise (name, value, closing tag), 'text' outside of tags
    where (model, offset) {
      const template = templateAt(model, offset);
      const region   = template && regionAt(template, offset);
      if (!region || region.kind === 'text') return 'text';
      if (region.kind === 'attrName' || (region.kind === 'tag' && region.element && offset > region.element.nameRange.end)) return 'attribute';
      return 'tag';
    },
  };
}

export { createElements };
