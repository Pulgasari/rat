// looksmaxx :: modules/hairstyles.js
//
// the built-in hairstyle overlays: transparent images authored to sit over a head, with a face-shaped
// hole (fill-rule evenodd) so the face shows through. simple svg silhouettes that exercise the overlay
// (overlay.js); real cut-out pngs, or the "Your PNG" button, for photoreal try-ons. a url of the
// module, so a build takes the files along

export const HAIRSTYLES = [
  { id: 'bob',   name: 'Bob',   src: new URL('../hairstyles/bob.svg', import.meta.url).href },
  { id: 'long',  name: 'Long',  src: new URL('../hairstyles/long.svg', import.meta.url).href },
  { id: 'curly', name: 'Curly', src: new URL('../hairstyles/curly.svg', import.meta.url).href },
  { id: 'buzz',  name: 'Short', src: new URL('../hairstyles/buzz.svg', import.meta.url).href },
];
