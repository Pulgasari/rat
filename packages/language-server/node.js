#!/usr/bin/env node
// @rat/language-server :: node
// started by an editor as rat-language-server --stdio (or over node ipc by vs code)

import server from 'vscode-languageserver/node';

import { start } from './index.js';

const { ProposedFeatures, createConnection } = server;

start(createConnection(ProposedFeatures.all));
