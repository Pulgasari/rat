// code :: modules/commands.rat.js

/*
everything the palette, the dock, the toolbar and the hotkeys can do, as commands of the app
(RAT.app.commands): a name, a title, what it does. markup fires one by its name (onclick='save'),
code through run('save'). the editor's go to monaco's actions on the live instance.

  $favourites   the names starred in the palette, kept
*/

import { $config, toggle } from '../state.rat.js';

import { $current, $documents, close, save }          from './documents.rat.js';
import { $instance, $options, toggle as toggleOption } from './editor.rat.js';
import { show }                                       from './sources.rat.js';

const { commands, dialogs } = RAT.app;

export let $favourites! = [];

export const run = name => commands.run(name);

const action  = id => () => $instance?.getAction(id)?.run();
const trigger = id => () => $instance?.trigger('keyboard', id, null);
const flip    = key => () => { $config[key] = !$config[key]; };
const panel   = (name, kind) => () => { if (kind) show(kind); toggle(name); };

// a github file asks for its commit message when the settings say so
async function saveDocument (document = $current) {
  if (!document) return;
  if (!$config.commitPrompt || !document.id.startsWith('gh:')) return save(document);
  const message = await dialogs.prompt({ message: 'Commit message', ok: 'Commit', title: document.name, value: `Update ${document.name}` });
  if (message) return save(document, { message });
}

const COMMANDS = {
  // ::: panels and chrome
  'commands'  : { exec: () => toggle('commands'),  title: 'Commands' },
  'files'     : { exec: panel('files', 'local'),   title: 'Folders' },
  'github'    : { exec: panel('files', 'github'),  title: 'GitHub' },
  'settings'  : { exec: () => toggle('settings'),  title: 'Settings' },
  'webdav'    : { exec: panel('files', 'webdav'),  title: 'WebDAV' },

  'toggle-browser'   : { exec: flip('showBrowser'),   title: 'Toggle Browser' },
  'toggle-keyboard'  : { exec: flip('showKeyboard'),  title: 'Toggle Keyboard' },
  'toggle-statusbar' : { exec: flip('showStatusbar'), title: 'Toggle Statusbar' },
  'toggle-toolbar'   : { exec: flip('showToolbar'),   title: 'Toggle Toolbar' },

  // ::: files
  'close-file' : { exec: () => { if ($current) close($current); }, title: 'Close File' },
  'save'       : { exec: () => saveDocument(),                     title: 'Save' },
  'save-all'   : { exec: async () => { for (const document of $documents.filter(document => document.dirty).toArray()) await saveDocument(document); }, title: 'Save All' },

  // ::: history and clipboard
  'copy'  : { exec: action('editor.action.clipboardCopyAction'),  title: 'Copy' },
  'cut'   : { exec: action('editor.action.clipboardCutAction'),   title: 'Cut' },
  'paste' : { exec: action('editor.action.clipboardPasteAction'), title: 'Paste' },
  'redo'  : { exec: () => $instance?.getModel()?.redo(),          title: 'Redo' },
  'undo'  : { exec: () => $instance?.getModel()?.undo(),          title: 'Undo' },

  // ::: selection
  'add-cursor-above'      : { exec: action('editor.action.insertCursorAbove'),           title: 'Add Cursor Above' },
  'add-cursor-below'      : { exec: action('editor.action.insertCursorBelow'),           title: 'Add Cursor Below' },
  'expand-selection'      : { exec: action('editor.action.smartSelect.expand'),          title: 'Expand Selection' },
  'select-all'            : { exec: trigger('editor.action.selectAll'),                  title: 'Select All' },
  'select-next-match'     : { exec: action('editor.action.addSelectionToNextFindMatch'), title: 'Select Next Match' },
  'shrink-selection'      : { exec: action('editor.action.smartSelect.shrink'),          title: 'Shrink Selection' },

  // ::: lines
  'comment-block'   : { exec: action('editor.action.blockComment'),         title: 'Toggle Block Comment' },
  'comment-line'    : { exec: action('editor.action.commentLine'),          title: 'Toggle Line Comment' },
  'delete-lines'    : { exec: action('editor.action.deleteLines'),          title: 'Delete Line' },
  'duplicate-line'  : { exec: action('editor.action.copyLinesDownAction'),  title: 'Duplicate Line' },
  'indent-lines'    : { exec: action('editor.action.indentLines'),          title: 'Indent' },
  'join-lines'      : { exec: action('editor.action.joinLines'),            title: 'Join Lines' },
  'move-line-down'  : { exec: action('editor.action.moveLinesDownAction'),  title: 'Move Line Down' },
  'move-line-up'    : { exec: action('editor.action.moveLinesUpAction'),    title: 'Move Line Up' },
  'outdent-lines'   : { exec: action('editor.action.outdentLines'),         title: 'Outdent' },
  'sort-lines-asc'  : { exec: action('editor.action.sortLinesAscending'),   title: 'Sort Lines Ascending' },
  'sort-lines-desc' : { exec: action('editor.action.sortLinesDescending'),  title: 'Sort Lines Descending' },

  // ::: folding
  'fold'           : { exec: action('editor.fold'),          title: 'Fold' },
  'fold-all'       : { exec: action('editor.foldAll'),       title: 'Fold All' },
  'fold-recursive' : { exec: action('editor.foldRecursive'), title: 'Fold Recursive' },
  'unfold'         : { exec: action('editor.unfold'),        title: 'Unfold' },
  'unfold-all'     : { exec: action('editor.unfoldAll'),     title: 'Unfold All' },

  // ::: search
  'find'         : { exec: action('actions.find'),                          title: 'Find' },
  'find-next'    : { exec: action('editor.action.nextMatchFindAction'),     title: 'Find Next' },
  'find-previous': { exec: action('editor.action.previousMatchFindAction'), title: 'Find Previous' },
  'replace'      : { exec: action('editor.action.startFindReplaceAction'),  title: 'Find and Replace' },

  // ::: code
  'format'           : { exec: action('editor.action.formatDocument'),   title: 'Format Document' },
  'format-selection' : { exec: action('editor.action.formatSelection'),  title: 'Format Selection' },
  'go-to-definition' : { exec: action('editor.action.revealDefinition'), title: 'Go to Definition' },
  'quick-fix'        : { exec: action('editor.action.quickFix'),         title: 'Quick Fix' },
  'rename-symbol'    : { exec: action('editor.action.rename'),           title: 'Rename Symbol' },

  // ::: view
  'font-larger'          : { exec: () => { $options.fontSize = next($options.fontSize, 1); },  title: 'Font Size +' },
  'font-smaller'         : { exec: () => { $options.fontSize = next($options.fontSize, -1); }, title: 'Font Size –' },
  'toggle-line-numbers'  : { exec: () => toggleOption('lineNumbers'), title: 'Toggle Line Numbers' },
  'toggle-minimap'       : { exec: () => toggleOption('minimap'),     title: 'Toggle Minimap' },
  'toggle-word-wrap'     : { exec: () => toggleOption('wordWrap'),    title: 'Toggle Word Wrap' },
};

// the next of the sizes the schema allows, the last one stays
function next (size, step) {
  const sizes = $options.schema.parts.fontSize.describe.values;
  return sizes[Math.min(sizes.length - 1, Math.max(0, sizes.indexOf(size) + step))] ?? size;
}

commands.assign(COMMANDS);

export const all = () => Object.entries(COMMANDS).map(([name, { title }]) => ({ name, title }));

export function star (name) {
  $favourites = $favourites.includes(name) ? $favourites.filter(other => other !== name) : [...$favourites, name];
}
