// rat for vs code: starts @rat/language-server and connects it to .rat and
// .rat.js files. commonjs, because that is what the extension host loads.

const { LanguageClient, TransportKind } = require('vscode-languageclient/node');

let client = null;

function activate (context) {
  const module = require.resolve('@rat/language-server/node');
  const server = { module, transport: TransportKind.ipc };

  client = new LanguageClient('rat', 'RAT', { debug: server, run: server }, {
    documentSelector: [{ language: 'rat' }, { language: 'ratjs' }],
  });

  context.subscriptions.push(client);
  return client.start();
}

const deactivate = () => client?.stop();

module.exports = { activate, deactivate };
