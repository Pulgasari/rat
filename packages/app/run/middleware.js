// @rat/app :: middleware

/*
vercel edge middleware: a request for a .rat, .rat.html or .rat.js file gets
the compiled module, so the page loads no compiler. the loader sees the header
x-rat-compiled and takes the code as it is; the components the file uses
without an import come along in x-rat-unresolved, for autoImport. a host
without middleware (github pages) keeps compiling in the page.

the project's own middleware.js at its root re-exports it, with the matcher
written there (vercel reads config from that file only):

  // middleware.js
  export { middleware as default } from './rat/packages/app/run/middleware.js';
  export const config = { matcher: ['/:path*.rat', '/:path*.rat.html', '/:path*.rat.js'] };

a page that opens a .rat.html file itself (a document, not a module) gets the
file as it is.
*/

import { compileAsync } from '../../compiler/index.js';

const SKIP = 'x-skip-middleware';

export const config = { matcher: ['/:path*.rat', '/:path*.rat.html', '/:path*.rat.js'] };

const next = () => new Response(null, { headers: { 'x-middleware-next': '1' } });

// the file as it is on the host: the fetch comes back through here, the header lets it pass
const raw = url => fetch(url, { headers: { [SKIP]: '1' } });

export async function middleware (request) {
  if (request.headers.get(SKIP) === '1' || request.headers.get('sec-fetch-dest') === 'document') return next();

  const response = await raw(request.url);
  if (!response.ok) return response;

  // a css file inlined by the component (style inline …) is read from the host too
  const read = path => raw(new URL(path, request.url)).then(file => file.ok ? file.text() : Promise.reject(new Error(`${path}: ${file.status}`)));

  try {
    const name = new URL(request.url).pathname.split('/').pop();
    const { code, unresolved = [] } = await compileAsync(await response.text(), { base: request.url, filename: name, read });
    return new Response(code, {
      headers: {
        'Cache-Control'    : 'public, max-age=0, must-revalidate',
        'Content-Type'     : 'text/javascript; charset=utf-8',
        'x-rat-compiled'   : '1',
        'x-rat-unresolved' : unresolved.join(','),
      },
    });
  }
  // the error goes to the page as a module that throws it, where the error boundary shows it
  catch (error) {
    return new Response(`throw new SyntaxError(${JSON.stringify(error.message)});\n`, {
      headers : { 'Content-Type': 'text/javascript; charset=utf-8', 'x-rat-compiled': '1', 'x-rat-error': '1' },
      status  : 200,
    });
  }
}

export default middleware;
