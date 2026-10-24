# vectorizer

an image to an svg, on the device: nothing is uploaded. pick, drop or paste an image, see it next to
its svg, adjust, download or copy.

the engine is potrace, as webassembly ([esm-potrace-wasm](https://github.com/tomayac/esm-potrace-wasm),
the engine of [svgco.de](https://svgco.de)), in `trace.js`.

| setting | |
|---|---|
| color / black & white | a layer per posterized color, or one dark layer |
| colors | levels per channel, color only |
| speckles | areas up to this many px are dropped |
| smoothness | 0 keeps corners, 1.33 rounds everything |
| curve tolerance | how far curves may be joined: less is closer to the pixels, more is smaller |

an image is traced at 2048 px on its long side at most.
