// apps/.shared/toast.js
//
// toasts through <pop-toast> of @aufbau/elements
//
//   toast('saved');  toast.error('could not save');  toast.success('copied');

import PopToast from '@aufbau/elements/webcomponents/pop-toast.js';

const notify = type => (input, options) => PopToast.notify(input, { ...options, type });

export const toast = Object.assign(notify('info'), {
  error   : notify('error'),
  info    : notify('info'),
  success : notify('success'),
});

export default toast;
