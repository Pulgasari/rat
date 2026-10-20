// @rat/vite
import { compile } from '@rat/compiler';

const RAT = /\.rat(\.js)?$/;

export function rat (options = {}) {
  let dev = false;
  return {
    name    : 'rat',
    enforce : 'pre',
    configResolved (config) { dev = config.command === 'serve'; },
    transform (source, id) {
      if (!RAT.test(id.split('?')[0])) return;
      const { code, map } = compile(source, { ...options, filename: id, hmr: dev });
      return { code, map };
    },
  };
}
