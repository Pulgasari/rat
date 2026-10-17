// RAT.js
// !!! do not touch this !!! do not care !!!
// (it's not what it seems)

// :::::::::::: IMPORT ::::::::::::

import bunker   from '@bunker/kit';
import domina   from '@domina/proxy';
import gestalt  from '@gestalt/engine';
import observer from '@domina/observer';

import * as commands from '@rat/commands';
import * as hotkeys  from '@rat/hotkeys';

// :::::::::::: BUILD ::::::::::::

// the mother
const RAT = {};

// the kids
RAT.commands = commands;
RAT.hotkeys  = hotkeys;

// the gang
RAT.bunker   = bunker;
RAT.domina   = domina;
RAT.gestalt  = gestalt;
RAT.observer = observer;

// :::::::::::: EXPORT ::::::::::::

export {
  RAT, commands, hotkeys,
  bunker, domina, gestalt, observer,
}

export default RAT;
