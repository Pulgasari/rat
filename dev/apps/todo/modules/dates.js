// todo :: modules/dates.js
// days as local 'YYYY-MM-DD' strings, a due as the day or 'YYYY-MM-DDTHH:MM'.
// strings sort as they should and say the same in every time zone the device
// moves to: a task due monday stays due monday.

const pad = value => String(value).padStart(2, '0');

export const dayOf = (date = new Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

// the day as a local date at noon, so a change of daylight saving never moves it
export const dateOf = day => {
  const [year, month, date] = day.slice(0, 10).split('-').map(Number);
  return new Date(year, month - 1, date, 12);
};

export const addDays = (day, count) => {
  const date = dateOf(day);
  date.setDate(date.getDate() + count);
  return dayOf(date);
};

export const addMonths = (day, count) => {
  const date   = dateOf(day);
  const target = date.getDate();
  date.setDate(1);
  date.setMonth(date.getMonth() + count);
  const last = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  date.setDate(Math.min(target, last));   // jan 31 + 1 month is feb 28
  return dayOf(date);
};

// the next day with that weekday, today counts unless `strict`
export const nextWeekday = (day, weekday, strict = false) => {
  const current = dateOf(day).getDay();
  let diff = (weekday - current + 7) % 7;
  if (diff === 0 && strict) diff = 7;
  return addDays(day, diff);
};

export const dueDay  = due => due ? due.slice(0, 10) : null;
export const dueTime = due => due?.length > 10 ? due.slice(11, 16) : null;

// the moment of a due, the end of the day without a time
export const dueStamp = due => {
  if (!due) return null;
  const date = dateOf(due);
  const time = dueTime(due);
  if (time) date.setHours(...time.split(':').map(Number), 0, 0);
  else      date.setHours(23, 59, 59, 0);
  return date.getTime();
};

// :::::: REPEAT ::::::::::::::::::::::::::::::::::::::::::::::

// the due after this one. `from: 'done'` counts from the day it was ticked
export function nextDue ({ due, repeat }, doneAt = new Date) {
  if (!repeat) return null;
  const { every = 1, unit = 'day', on = null, from = 'due' } = repeat;
  const base = from === 'done' || !due ? dayOf(doneAt) : dueDay(due);
  const time = dueTime(due);
  let day;

  if (unit === 'week' && on?.length) {
    // the next listed weekday, a new week skips `every - 1` weeks
    const sorted  = [...on].sort();
    const weekday = dateOf(base).getDay();
    const later   = sorted.find(value => value > weekday);
    day = later != null
      ? addDays(base, later - weekday)
      : addDays(base, 7 * (every - 1) + (7 - weekday) + sorted[0]);
  }
  else if (unit === 'month' && on?.length) {
    const sorted = [...on].sort((a, b) => a - b);
    const date   = dateOf(base).getDate();
    const later  = sorted.find(value => value > date);
    day = later != null ? `${base.slice(0, 8)}${pad(later)}` : `${addMonths(base, every).slice(0, 8)}${pad(sorted[0])}`;
  }
  else if (unit === 'day')   day = addDays(base, every);
  else if (unit === 'week')  day = addDays(base, every * 7);
  else if (unit === 'month') day = addMonths(base, every);
  else if (unit === 'year')  day = addMonths(base, every * 12);

  // a due long past moves on until it is ahead again
  const today = dayOf(doneAt);
  if (from === 'due' && day < today) return nextDue({ due: time ? `${day}T${time}` : day, repeat }, doneAt);
  return time ? `${day}T${time}` : day;
}

// :::::: LABELS ::::::::::::::::::::::::::::::::::::::::::::::

const languageOf = () => document.documentElement.lang || navigator.language || 'en';

// today, tomorrow, monday, 12 oct
export function dayLabel (day, now = new Date) {
  const lang  = languageOf();
  const diff  = Math.round((dateOf(day) - dateOf(dayOf(now))) / 86_400_000);
  if (Math.abs(diff) <= 1) return new Intl.RelativeTimeFormat(lang, { numeric: 'auto' }).format(diff, 'day');
  if (diff > 1 && diff < 7) return new Intl.DateTimeFormat(lang, { weekday: 'long' }).format(dateOf(day));
  const sameYear = day.slice(0, 4) === dayOf(now).slice(0, 4);
  return new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'short', year: sameYear ? undefined : 'numeric' }).format(dateOf(day));
}

export const dueLabel = due => due ? [dayLabel(dueDay(due)), dueTime(due)].filter(Boolean).join(' ') : '';

export function repeatLabel (repeat) {
  if (!repeat) return '';
  const { every = 1, unit, on, from } = repeat;
  const lang  = languageOf();
  const names = unit === 'week' && on?.length
    ? on.map(day => new Intl.DateTimeFormat(lang, { weekday: 'short' }).format(new Date(2023, 0, 1 + day))).join(', ')
    : null;
  const base = every === 1 ? `every ${unit}` : `every ${every} ${unit}s`;
  return [base, names && `on ${names}`, from === 'done' && 'after done'].filter(Boolean).join(' ');
}
