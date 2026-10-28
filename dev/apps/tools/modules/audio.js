// tools :: modules/audio.js
//
// a file decoded once by the web audio api: its buffer for playback and its peaks for a waveform

let context = null;

export const audioContext = () => context ??= new AudioContext;

export async function decode (file, bars = 600) {
  const buffer  = await audioContext().decodeAudioData(await file.arrayBuffer());
  const channel = buffer.getChannelData(0);
  const size    = Math.max(1, Math.floor(channel.length / bars));
  const peaks   = new Float32Array(bars);
  for (let bar = 0; bar < bars; bar++) {
    let max = 0;
    for (let index = bar * size, end = index + size; index < end; index++) { const value = Math.abs(channel[index] ?? 0); if (value > max) max = value; }
    peaks[bar] = max;
  }
  return { buffer, peaks };
}

// a part of a buffer played; stop() ends it early. onposition gets the time, onend when it is over
export function play (buffer, start, end, { onend, onposition } = {}) {
  const ctx    = audioContext();
  const source = ctx.createBufferSource();
  const began  = ctx.currentTime;
  if (ctx.state === 'suspended') ctx.resume();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.start(0, start, end - start);

  let frame = 0, stopped = false;
  const tick = () => {
    onposition?.(Math.min(end, start + ctx.currentTime - began));
    frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);

  const stop = () => {
    if (stopped) return;
    stopped = true;
    cancelAnimationFrame(frame);
    try { source.stop(); } catch {}
    onend?.();
  };
  source.onended = stop;
  return { stop };
}

export const formatTime = seconds => `${Math.floor(seconds / 60)}:${(seconds % 60).toFixed(1).padStart(4, '0')}`;
