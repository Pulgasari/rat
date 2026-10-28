// cosmonaut :: modules/util.js

export const uid = prefix => prefix + Math.random().toString(36).slice(2, 8);

export const domainOf = url => {
  try   { return new URL(url).hostname.replace(/^www\./, ''); }
  catch { return url || ''; }
};

// the letter a row or tile shows in place of a favicon
export const initial = text => (String(text || '')[0] || '?').toUpperCase();

// items in buckets by key, in first-seen order
export function bucketsBy (items, keyOf) {
  const buckets = new Map;
  for (const item of items) {
    const key = keyOf(item);
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(item);
  }
  return buckets;
}
