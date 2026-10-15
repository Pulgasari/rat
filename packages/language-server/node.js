#!/usr/bin/env node
// @rat/language-server :: node
// started by an editor as rat-language-server --stdio (or over node ipc by vs code).
// here the server has a file system: manifests of the workspace and typescript.

import server from 'vscode-languageserver/node';

import { start }              from './index.js';
import { createJavaScript }   from './js.js';
import { manifestsOf }        from './manifests.js';
import { classesOfWorkspace } from './styles.js';

const { ProposedFeatures, createConnection } = server;

start(createConnection(ProposedFeatures.all), { classes: classesOfWorkspace, javascript: createJavaScript, manifests: manifestsOf });
