// @rat/runtime

/*
what compiled components import as $$. common/ runs anywhere (patterns,
ranges, the signals), browser/ needs a dom (rendering, events, styles).
*/

export { $, batch, computed, effect, getOwner, isReactive, isSchema, isSignal, onCleanup, reactive, register, scope, signal, untrack } from '@rat/signals';

export { is, isPattern, pattern, which } from './common/patterns.js';
export { isRange, range }                from './common/range.js';

export { cases }                                                                       from './browser/cases.js';
export { bind, each, html, match, mount, raw, ref, render, sheet, style, unrender, use, when } from './browser/dom.js';
export { commandListener, listener }                                                   from './browser/events.js';
