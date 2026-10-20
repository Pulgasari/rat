// apps/.shared/toast.js
//
// toasts through <pop-toast> of @aufbau/elements, loaded on the first one
//
//   toast('saved');  toast.error('could not save');  toast.success('copied');

import { load } from '@aufbau/elements';

const notify = type => (input, options) => load('pop-toast').then(module => module?.default.notify(input, { ...options, type }));

export const toast = Object.assign(notify('info'), {
  error   : notify('error'),
  info    : notify('info'),
  success : notify('success'),
});

export default toast;
