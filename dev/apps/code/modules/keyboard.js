// code :: modules/keyboard.js
// native (Android) keyboard suppression. where the browser supports the
// VirtualKeyboard API, inputs are marked manual and the OS keyboard is hidden so the
// on-screen code keyboard is the only one. shared by the app-wide effect (app.js) and
// the Keyboard component's unmount cleanup.

const KB_SELECTOR = 'input, textarea, [contenteditable]';
const setManual   = el => el.setAttribute('virtualkeyboardpolicy', 'manual');
const setAuto     = el => el.removeAttribute('virtualkeyboardpolicy');
const onFocusIn   = () => navigator.virtualKeyboard?.hide();
let   observer    = null;

export const disableAndroidKeyboard = () => {
  if (!navigator.virtualKeyboard) return;
  navigator.virtualKeyboard.overlaysContent = true;
  document.querySelectorAll(KB_SELECTOR).forEach(setManual);
  observer = new MutationObserver(mutations => {
    for (const { addedNodes } of mutations) {
      for (const node of addedNodes) {
        if (node.nodeType !== 1) continue;
        if (node.matches?.(KB_SELECTOR)) setManual(node);
        node.querySelectorAll?.(KB_SELECTOR).forEach(setManual);
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  document.addEventListener('focusin', onFocusIn, true);
};

export const enableAndroidKeyboard = () => {
  if (!navigator.virtualKeyboard) return;
  navigator.virtualKeyboard.overlaysContent = false;
  document.querySelectorAll(KB_SELECTOR).forEach(setAuto);
  observer?.disconnect();
  observer = null;
  document.removeEventListener('focusin', onFocusIn, true);
};
