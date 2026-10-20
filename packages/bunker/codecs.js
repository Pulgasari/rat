// @rat/bunker :: codecs

/*
a codec turns a value into what a driver holds, and back:

  json       any json value <-> a string            (localStorage, cookies)
  text       a string as it is
  raw        the value as it is                     (IndexedDB: structured clone, Map)
  response   a value <-> a Response                 (the Cache API): a string as text, anything else as json

a driver says what it holds, that picks its codec unless one is given.
decode may return a promise (a Response is read async), the store awaits it.
*/

const json = {
  decode : stored => stored == null ? undefined : JSON.parse(stored),
  encode : value  => JSON.stringify(value),
};

const text = {
  decode : stored => stored ?? undefined,
  encode : value  => String(value),
};

const raw = {
  decode : stored => stored,
  encode : value  => value,
};

const response = {
  decode : async stored => !stored ? undefined : (stored.headers.get('content-type') ?? '').includes('json') ? stored.json() : stored.text(),
  encode : value => value instanceof Response ? value
    : typeof value === 'string' ? new Response(value, { headers: { 'content-type': 'text/plain' } })
    : new Response(JSON.stringify(value), { headers: { 'content-type': 'application/json' } }),
};

const codecs = { json, raw, response, text };

// what a driver holds -> its codec
const BY_HOLDS = { clone: raw, response, string: json };

const codecOf = (codec, driver) => typeof codec === 'string' ? codecs[codec] : codec ?? BY_HOLDS[driver.holds] ?? raw;

// :::::: EXPORT

export { codecOf, codecs };
