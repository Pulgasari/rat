// @rat/app :: drivers :: dialogs, web: a <dialog class="rat-dialog"> per question, styled by the app.
// deno desktop takes this one as well: its page is a webview

function ask ({ cancel = null, input = false, message = '', ok = 'OK', title = '', value = '' }) {
  return new Promise(resolve => {
    const make   = (tag, props) => Object.assign(document.createElement(tag), props);
    const dialog = make('dialog', { className: 'rat-dialog' });
    const form   = make('form', { method: 'dialog' });
    const field  = input ? make('input', { autofocus: true, value }) : null;
    const menu   = make('menu');

    if (title)   form.append(make('h2', { textContent: title }));
    if (message) form.append(make('p', { textContent: message }));
    if (field)   form.append(field);
    if (cancel)  menu.append(make('button', { onclick: () => dialog.close('cancel'), textContent: cancel, type: 'button' }));
    menu.append(make('button', { autofocus: !field, textContent: ok, type: 'submit', value: 'ok' }));
    form.append(menu);
    dialog.append(form);

    dialog.addEventListener('close', () => {
      const confirmed = dialog.returnValue === 'ok';
      dialog.remove();
      resolve(field ? (confirmed ? field.value : null) : confirmed);
    }, { once: true });

    document.body.append(dialog);
    dialog.showModal();
  });
}

export const alert   = async options => { await ask(options); };
export const confirm = options => ask({ cancel: 'Cancel', ...options });
export const prompt  = options => ask({ cancel: 'Cancel', ...options, input: true });
