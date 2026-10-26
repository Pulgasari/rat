// @rat/app :: files
// RAT.app.files: a tree of files (@rat/bunker createFiles). the origin private file system in the browser,
// the app's data folder on android, ios and the desktop, unless root or driver says otherwise

import { createFiles } from '@rat/bunker';

import { bunkerDriverOf } from '../drivers.js';

const files = async ({ driver, ...options }) => createFiles(options.root ? options : { ...options, driver: await bunkerDriverOf('files', driver) });

// :::::: EXPORT

export default files;
