// cosmonaut :: modules/commands.js
//
// url field commands: `<name>: <text>` or `<name>:<arg> <text>` runs a command
// instead of a navigation, e.g. `tl: katze`, `tl:fr katze`. only registered
// names count, so a url (https://…, mailto:…) never reads as one.
//
// a command turns its text (and optional arg) into the url to open, and
// describes what it will do for the suggestion row.

const COMMANDS = {
  // translate: auto-detected source language, the target from the arg or english
  tl: {
    describe : (text, arg) => `translate → ${arg || 'en'}`,
    url      : (text, arg) => 'https://translate.google.com/?sl=auto&tl=' + encodeURIComponent(arg || 'en')
      + '&text=' + encodeURIComponent(text) + '&op=translate',
  },
};

const SYNTAX = /^([a-z]+):(\S*)\s+(\S.*)$/i;

// { name, arg, text, command } for a command input, null otherwise
export function parseCommand (input) {
  const match = SYNTAX.exec(input.trim());
  const command = match && COMMANDS[match[1].toLowerCase()];
  return command ? { arg: match[2], command, name: match[1].toLowerCase(), text: match[3] } : null;
}

export const commandUrl = ({ arg, command, text }) => command.url(text, arg);

export const describeCommand = ({ arg, command, text }) => command.describe(text, arg);
