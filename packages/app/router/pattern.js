// @rat/app :: router :: pattern

/*
route patterns, matched segment by segment:

  /notes/:id       a param, one segment
  /notes/:id?      an optional one
  /files/*         the rest, any number of segments (params['*'])
  /notes           a literal

matchRoute(pattern, path) gives { params, rest } or null. a nested route
matches the start of the path and hands the rest to its children:

  matchRoute('/settings', '/settings/profile')            { params: {}, rest: '/profile' }
  matchRoute('/settings', '/settings/profile', { exact })  null

a pattern without a leading slash is relative, the same as with one: the
caller decides what it is relative to.
*/

const segmentsOf = path => String(path ?? '').split('/').filter(Boolean);

const compiled = new Map;

function compile (pattern) {
  if (!compiled.has(pattern)) {
    compiled.set(pattern, segmentsOf(pattern).map(segment =>
        segment === '*'          ? { kind: 'rest' }
      : segment.startsWith(':')  ? { kind: 'param', name: segment.slice(1).replace(/\?$/, ''), optional: segment.endsWith('?') }
      :                            { kind: 'literal', value: decodeURIComponent(segment) }));
  }
  return compiled.get(pattern);
}

function matchRoute (pattern, path, { exact = false } = {}) {
  const parts    = compile(pattern);
  const segments = segmentsOf(path);
  const params   = {};
  let   at       = 0;

  for (const part of parts) {
    if (part.kind === 'rest') {
      params['*'] = segments.slice(at).map(decodeURIComponent).join('/');
      return { params, rest: '' };
    }
    const segment = segments[at];
    if (part.kind === 'literal') {
      if (segment === undefined || decodeURIComponent(segment) !== part.value) return null;
      at++;
    }
    else if (segment === undefined) {
      if (!part.optional) return null;
    }
    else {
      params[part.name] = decodeURIComponent(segment);
      at++;
    }
  }

  const rest = at < segments.length ? '/' + segments.slice(at).join('/') : '';
  return exact && rest ? null : { params, rest };
}

// '/notes/:id' with { id: 3 } -> '/notes/3'
const fill = (pattern, params = {}) => '/' + compile(pattern).map(part =>
    part.kind === 'literal' ? encodeURIComponent(part.value)
  : part.kind === 'rest'    ? params['*'] ?? ''
  :                           params[part.name] == null ? '' : encodeURIComponent(params[part.name])).filter(Boolean).join('/');

// '/settings' + 'profile' -> '/settings/profile'
const join = (...paths) => '/' + paths.flatMap(segmentsOf).join('/');

// :::::: EXPORT

export { fill, join, matchRoute, segmentsOf };
