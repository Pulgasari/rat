// @rat/core
import '@aufbau/elements';
import '@domina/prototype';
import '@htx/js';

const warn = (...args) => console.warn('[RAT] ', ...args);

const rat = { warn };

class CommandRegistry {
  #commands = new Map;

  constructor (rootElement = document) {
    // Listen for native HTML command events globally
    rootElement.addEventListener('command', (event) => {
      const cleanName = toUndashed(event.command);

      // If the command is registered in JS, execute it
      if (this.#commands.has(cleanName)) {
        this.exec(cleanName, { event, source: event.source });
      }
    });
  }

  register (name, handler) {
    this.#commands.set(toUndashed(name), handler);
    return this;
  }

  exec (name, ...args) {
    const handler = this.#commands.get(toUndashed(name));
    
    return handler 
      ? handler(...args)
      : rat.warn(`unknown command: "${name}"`);
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
