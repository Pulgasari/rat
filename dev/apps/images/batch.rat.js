// images :: batch.rat.js

/*
batch: a pipeline of tasks over many images, in order. a task is { id, params, type }, the pipeline is
kept. each type knows its label, icon, defaults and how it changes a canvas (run gives the canvas on);
convert and quality only set how the result is encoded.
*/

import * as fx from './modules/filters.js';
import { entriesOf, release, runAll } from './files.js';

export let $batch  = [];
export let $tasks! = [];

const canvasOf = (width, height) => Object.assign(document.createElement('canvas'), { height, width });

// a new canvas of the size, the old one drawn by draw (ctx, source)
function redraw (source, width, height, draw) {
  const canvas = canvasOf(width, height);
  draw(canvas.getContext('2d'), source);
  return canvas;
}

function pixels (canvas, fn) {
  const ctx   = canvas.getContext('2d');
  const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data  = image.data;
  for (let index = 0; index < data.length; index += 4) fn(data, index);
  ctx.putImageData(image, 0, 0);
  return canvas;
}

const clamp = value => Math.min(255, Math.max(0, value));

export const TASKS = {
  blur : {
    defaults : { radius: 4 }, icon: 'blur', label: 'Blur',
    run      : (canvas, { radius }) => redraw(canvas, canvas.width, canvas.height, (ctx, source) => { ctx.filter = `blur(${radius}px)`; ctx.drawImage(source, 0, 0); }),
  },
  brightness : {
    defaults : { value: 0 }, icon: 'brightness', label: 'Brightness',
    run      : (canvas, { value }) => pixels(canvas, (data, index) => { for (let channel = 0; channel < 3; channel++) data[index + channel] = clamp(data[index + channel] + value); }),
  },
  contrast : {
    defaults : { value: 0 }, icon: 'contrast', label: 'Contrast',
    run      : (canvas, { value }) => {
      const factor = (259 * (value + 255)) / (255 * (259 - value));
      return pixels(canvas, (data, index) => { for (let channel = 0; channel < 3; channel++) data[index + channel] = clamp(factor * (data[index + channel] - 128) + 128); });
    },
  },
  convert : { defaults: { fmt: 'webp' }, icon: 'convert', label: 'Convert' },
  crop    : {
    defaults : { h: 600, w: 800, x: 0, y: 0 }, icon: 'crop', label: 'Crop',
    run      : (canvas, { h, w, x, y }) => redraw(canvas, w, h, (ctx, source) => ctx.drawImage(source, -x, -y)),
  },
  filter : {
    defaults : { amount: 1, id: 'sepia' }, icon: 'effects', label: 'Filter',
    run      : async (canvas, { amount, id }) => { await fx.bake(canvas, id, { amount }); return canvas; },
  },
  flip : {
    defaults : { axis: 'h' }, icon: 'flip-h', label: 'Flip',
    run      : (canvas, { axis }) => redraw(canvas, canvas.width, canvas.height, (ctx, source) => {
      if (axis === 'h') { ctx.scale(-1, 1); ctx.drawImage(source, -source.width, 0); }
      else              { ctx.scale(1, -1); ctx.drawImage(source, 0, -source.height); }
    }),
  },
  grayscale : {
    defaults : {}, icon: 'grayscale', label: 'Grayscale',
    run      : canvas => pixels(canvas, (data, index) => { data[index] = data[index + 1] = data[index + 2] = 0.299 * data[index] + 0.587 * data[index + 1] + 0.114 * data[index + 2]; }),
  },
  quality : { defaults: { value: 85 }, icon: 'quality', label: 'Quality' },
  resize  : {
    defaults : { h: '', lock: true, w: 800 }, icon: 'resize', label: 'Resize',
    run      : (canvas, { h, w }) => {
      const width  = w ? +w : Math.round(canvas.width * (+h / canvas.height));
      const height = h ? +h : Math.round(canvas.height * (+w / canvas.width));
      return redraw(canvas, width, height, (ctx, source) => ctx.drawImage(source, 0, 0, width, height));
    },
  },
  rotate : {
    defaults : { deg: 90 }, icon: 'rotate-cw', label: 'Rotate',
    run      : (canvas, { deg }) => {
      const turn = ((deg % 360) + 360) % 360;
      const swap = turn === 90 || turn === 270;
      const { height, width } = canvas;
      return redraw(canvas, swap ? height : width, swap ? width : height, (ctx, source) => {
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
        ctx.rotate(turn * Math.PI / 180);
        ctx.drawImage(source, -width / 2, -height / 2);
      });
    },
  },
  watermark : {
    defaults : { opacity: 0.5, pos: 'br', size: 24, text: '© 2026' }, icon: 'watermark', label: 'Watermark',
    run      : (canvas, { opacity, pos, size, text }) => {
      const ctx   = canvas.getContext('2d');
      const pad   = 16;
      ctx.globalAlpha = opacity;
      ctx.font        = `bold ${size}px system-ui`;
      const x = pos.includes('r') ? canvas.width - ctx.measureText(text).width - pad : pad;
      const y = pos.includes('b') ? canvas.height - pad : size + pad;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fillText(text, x + 1, y + 1);
      ctx.fillStyle = '#fff';
      ctx.fillText(text, x, y);
      ctx.globalAlpha = 1;
      return canvas;
    },
  },
};

// :::::: THE PIPELINE

let next = $tasks.reduce((max, task) => Math.max(max, typeof task.id === 'number' ? task.id : -1), -1) + 1;

export const addTask    = type => { $tasks = [...$tasks, { id: next++, params: { ...TASKS[type].defaults }, type }]; };
export const removeTask = id => { $tasks = $tasks.filter(task => task.id !== id); };
export const setTask    = (id, changes) => { $tasks = $tasks.map(task => task.id === id ? { ...task, params: { ...task.params, ...changes } } : task); };

export function moveTask (id, step) {
  const tasks = [...$tasks];
  const from  = tasks.findIndex(task => task.id === id);
  const to    = from + step;
  if (to < 0 || to >= tasks.length) return;
  [tasks[from], tasks[to]] = [tasks[to], tasks[from]];
  $tasks = tasks;
}

// :::::: THE FILES

export const add = files => { $batch = [...$batch, ...entriesOf(files)]; };

export function remove (id) {
  const entry = $batch.find(item => item.id === id);
  if (entry) release(entry);
  $batch = $batch.filter(item => item.id !== id);
}

const MIME = { jpg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };

async function process (file) {
  const bitmap = await createImageBitmap(file);
  let canvas   = canvasOf(bitmap.width, bitmap.height);
  canvas.getContext('2d').drawImage(bitmap, 0, 0);
  bitmap.close?.();

  let type    = file.type || 'image/webp';
  let quality = 92;
  for (const task of $tasks) {
    if (task.type === 'convert') type = MIME[task.params.fmt] ?? type;
    else if (task.type === 'quality') quality = task.params.value;
    else canvas = await TASKS[task.type].run(canvas, task.params);
  }

  const blob = await new Promise(resolve => canvas.toBlob(resolve, type, quality / 100));
  if (!blob) throw new Error('Encoding failed');
  return { blob, outName: `${file.name.replace(/\.[^.]+$/, '')}_processed.${type.split('/')[1].replace('jpeg', 'jpg')}` };
}

export const runBatch = () => runAll(() => $batch, list => { $batch = list; }, process, false);
