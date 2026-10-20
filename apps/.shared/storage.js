// apps/.shared/storage.js
//
// a value in localStorage, by hand until persistence is decided (todo.md)
//
//   let $query = read('icons:query', '');
//   effect(() => write('icons:query', $query));

export function read (key, fallback = null) {
  try   { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}

export function write (key, value) {
  if (value == null) localStorage.removeItem(key);
  else localStorage.setItem(key, JSON.stringify(value));
}
