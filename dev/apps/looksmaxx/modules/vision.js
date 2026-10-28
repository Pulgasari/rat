// looksmaxx :: modules/vision.js
//
// the on-device vision layer: MediaPipe Tasks Vision, running entirely in the
// browser (WASM + WebGL), no server. two models, both in IMAGE mode since the app
// works on still photos, not a live camera (that was the explicit ask):
//
//   ImageSegmenter (hair_segmenter)  -> a per-pixel category mask; category 1 is
//                                       hair. drives the recolouring.
//   FaceLandmarker                   -> 478 3D face points; we use the eyes and
//                                       forehead to place a 2D hairstyle overlay.
//
// both are lazy singletons — the first call pays the model download, later calls
// reuse it. the JS, its wasm and the model files come from a pinned cdn version,
// so nothing is vendored into the repo.

import { FaceLandmarker, FilesetResolver, ImageSegmenter } from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/vision_bundle.mjs';

const VER   = '0.10.14';
const WASM  = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${VER}/wasm`;
const HAIR  = 'https://storage.googleapis.com/mediapipe-models/image_segmenter/hair_segmenter/float32/latest/hair_segmenter.tflite';
const FACE  = 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task';

let _fileset;
const fileset = () => (_fileset ??= FilesetResolver.forVisionTasks(WASM));

let _segmenter;
export async function getSegmenter () {
  return (_segmenter ??= ImageSegmenter.createFromOptions(await fileset(), {
    baseOptions   : { modelAssetPath: HAIR, delegate: 'GPU' },
    runningMode   : 'IMAGE',
    outputCategoryMask : true,
    outputConfidenceMasks : false,
  }));
}

let _landmarker;
export async function getLandmarker () {
  return (_landmarker ??= FaceLandmarker.createFromOptions(await fileset(), {
    baseOptions : { modelAssetPath: FACE, delegate: 'GPU' },
    runningMode : 'IMAGE',
    numFaces    : 1,
  }));
}

/**
 * segment `source` (an HTMLImageElement / canvas) into a hair mask.
 * returns { mask: Uint8Array, width, height } where mask[i] === 1 marks a hair
 * pixel, row-major at the source's natural resolution. the MediaPipe result is
 * closed before returning, so the caller owns only the plain array.
 */
export async function segmentHair (source) {
  const seg    = await getSegmenter();
  const result = seg.segment(source);
  try {
    const cat   = result.categoryMask;
    const mask  = Uint8Array.from(cat.getAsUint8Array());   // copy out before close()
    return { mask, width: cat.width, height: cat.height };
  } finally {
    result.close?.();
  }
}

/** detect one face; returns its landmark array (normalised 0..1 coords) or null */
export async function detectFace (source) {
  const lm  = await getLandmarker();
  const res = lm.detect(source);
  return res.faceLandmarks?.[0] ?? null;
}
