// @rat/app :: files
// RAT.app.files: a tree of files (@rat/bunker createFiles), the origin private file system unless root says otherwise

import { createFiles } from '@rat/bunker';

const files = options => createFiles(options);

// :::::: EXPORT

export default files;
