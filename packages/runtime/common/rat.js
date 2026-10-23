// @rat/runtime :: RAT

/*
the one global of rat, there as soon as the runtime is loaded: every export of
@rat/types (RAT.Enum, RAT.$Table, RAT.match …), and what @rat/app adds
(RAT.app, RAT.config, RAT.toggle). another name is a line of your own:
globalThis.APP = RAT.
*/

import * as types from '@rat/types';

const RAT = { ...types };

globalThis.RAT = RAT;

// :::::: EXPORT

export { RAT };
