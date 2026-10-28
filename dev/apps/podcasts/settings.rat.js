// podcasts :: settings.rat.js

/*
the app's own settings, kept across visits: where the dock and the player sit. app.css places them by
the data attributes of the page.
*/

import { effect } from '@rat/signals';
import { $Record, Enum } from '@rat/types';

export const $settings! = $Record({ menu: Enum('bottom', 'top'), player: Enum('bottom', 'top') }).create();

effect(() => {
  const { dataset } = document.documentElement;
  dataset.menu   = $settings.menu;
  dataset.player = $settings.player;
});
