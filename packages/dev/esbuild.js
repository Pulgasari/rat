// @rat/esbuild

import { readFile } from 'node:fs/promises';
import { compile }  from '@rat/compiler';

export function rat (options = {}) {
  return {
    name: 'rat',
    setup (build) {
      build.onLoad({ filter: /\.rat(\.js)?$/ }, async ({ path }) => {
        const source = await readFile(path, 'utf8');
        try {
          const { code, map } = compile(source, { ...options, filename: path });
          return { contents: map ? `${code}\n//# sourceMappingURL=data:application/json;base64,${btoa(JSON.stringify(map))}` : code, loader: 'js' };
        } catch (error) {
          if (!error.line) throw error;
          return { errors: [{ text: error.reason, location: { file: path, line: error.line, column: error.column - 1, lineText: source.split('\n')[error.line - 1] } }] };
        }
      });
    },
  };
}
