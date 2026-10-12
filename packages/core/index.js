// @rat/core
import '@aufbau/elements';
import '@domina/prototype';
import '@htx/js';

const $app = document.createElement('rat-app'); 

const warn = (...args) => console.warn('[RAT] ', ...args);

const rat = { warn };

class CommandRegistry {
  #commands = new $Map ({ normalizeKey: toUndashed });

  constructor (ctx = $app) {
    ctx.addEventListener('command', this.exec);
  }

  register ({ name, handler }) {
    this.#commands.set(name, handler);
    return this;
  }

  exec ({ command: name, ...args }) {
    return this.#commands.get(name)?.(...args)
        ?? rat.warn(`unknown command: "${name}"`);
  }
}

// 
class RatApp {
  commands = new CommandRegistry;
};

const createApp = () => new RatApp;

// :::::: EXTEND HTX

function processCmdAttributes (code) {
  // cmd="toggleSidebar"
  // -> commandfor="app-root" command="--toggle-sidebar"
  return code.replace(/\bcmd=["']([^"']+)["']/g, (_, cmdName) => {
    return `commandfor="app-root" command="${toDashed(cmdName)}"`;
  });
}

htx.extend(processCmdAttributes);

// :::::: EXPORT

export { rat, createApp };
export default createApp;
