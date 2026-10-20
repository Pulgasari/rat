// @rat/unplugin
import { createUnplugin } from 'unplugin';
import { compile }        from '@rat/compiler';

export const unplugin = createUnplugin((options = {}) => ({
  name             : 'rat',
  enforce          : 'pre',
  transformInclude : id => /\.rat(\.js)?$/.test(id),
  transform (source, id) { return compile(source, { ...options, filename: id }); },
}));

export const esbuild  = unplugin.esbuild;
export const rolldown = unplugin.rolldown;
export const rollup   = unplugin.rollup;
export const vite     = unplugin.vite;
export const webpack  = unplugin.webpack;
