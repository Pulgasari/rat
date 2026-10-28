// todo :: modules/parse.js
// one line of text read as a task, while it is typed:
//
//   parse('call anna tomorrow 9:00 #family !2 every week +home')
//   -> { title: 'call anna', due: '2026-10-08T09:00', tags: ['family'], priority: 2,
//        repeat: { every: 1, unit: 'week', on: null, from: 'due' }, list: 'home', tokens: [...] }
//
// a token is what was read: { kind, text, label, start, end }, start and end in
// words. a token whose text is in `ignore` stays part of the title, so a chip
// removed under the field gives its words back.
//
// the words for days come from Intl in the language of the page, the rest from
// a small table per language. english is always understood.

import { addDays, dayOf, nextWeekday } from './dates.js';

// :::::: WORDS :::::::::::::::::::::::::::::::::::::::::::::::

const WORDS = {
  en: {
    after    : ['after'],
    at       : ['at'],
    every    : ['every', 'each'],
    in       : ['in'],
    next     : ['next'],
    relative : { today: 0, tonight: 0, tomorrow: 1, tmrw: 1 },
    pairs    : { 'day after tomorrow': 2, 'next week': 7 },
    repeats  : { daily: 'day', weekly: 'week', monthly: 'month', yearly: 'year', annually: 'year' },
    someday  : ['someday'],
    units    : { day: 'day', days: 'day', week: 'week', weeks: 'week', month: 'month', months: 'month', year: 'year', years: 'year' },
  },
  de: {
    after    : ['nach'],
    at       : ['um'],
    every    : ['jeden', 'jede', 'jedes', 'alle'],
    in       : ['in'],
    next     : ['nächsten', 'nächste', 'nächstes', 'kommenden', 'kommende'],
    relative : { heute: 0, morgen: 1, übermorgen: 2 },
    pairs    : { 'nächste woche': 7 },
    repeats  : { täglich: 'day', wöchentlich: 'week', monatlich: 'month', jährlich: 'year' },
    someday  : ['irgendwann'],
    units    : { tag: 'day', tage: 'day', tagen: 'day', woche: 'week', wochen: 'week', monat: 'month', monate: 'month', monaten: 'month', jahr: 'year', jahre: 'year', jahren: 'year' },
  },
};

const languageOf = () => (globalThis.document?.documentElement?.lang || globalThis.navigator?.language || 'en').slice(0, 2).toLowerCase();

// the english words and those of the page, merged
function wordsFor (lang = languageOf()) {
  const own = WORDS[lang];
  if (!own || lang === 'en') return WORDS.en;
  const merged = {};
  for (const key of Object.keys(WORDS.en)) {
    const a = WORDS.en[key];
    const b = own[key] ?? (Array.isArray(a) ? [] : {});
    merged[key] = Array.isArray(a) ? [...a, ...b] : { ...a, ...b };
  }
  return merged;
}

// weekday name -> 0 (sunday) to 6, long and short, english and the page's language
const weekdayCache = new Map;

function weekdaysFor (lang = languageOf()) {
  if (weekdayCache.has(lang)) return weekdayCache.get(lang);
  const names = new Map;
  for (const locale of new Set(['en', lang])) {
    for (const style of ['long', 'short']) {
      const format = new Intl.DateTimeFormat(locale, { weekday: style, timeZone: 'UTC' });
      for (let day = 0; day < 7; day++) {
        // 2023-01-01 was a sunday
        const name = format.format(new Date(Date.UTC(2023, 0, 1 + day))).toLowerCase().replace(/\.$/, '');
        names.set(name, day);
      }
    }
  }
  weekdayCache.set(lang, names);
  return names;
}

// :::::: PATTERNS ::::::::::::::::::::::::::::::::::::::::::::

const TIME     = /^(\d{1,2})(?::(\d{2}))?\s*(am|pm|h|uhr)?$/i;
const ISO      = /^(\d{4})-(\d{2})-(\d{2})$/;
const DOTTED   = /^(\d{1,2})\.(\d{1,2})\.(\d{2,4})?$/;
const TAG      = /^#([\p{L}\p{N}_-]+)$/u;
const LIST     = /^\+([\p{L}\p{N}_-]+)$/u;
const PRIORITY = /^(?:!([1-3])|(!{1,3}))$/;

const pad = value => String(value).padStart(2, '0');

function clockOf (text, needsMark) {
  const match = TIME.exec(text);
  if (!match) return null;
  let hours = Number(match[1]);
  const minutes = Number(match[2] ?? 0);
  const mark    = match[3]?.toLowerCase();
  if (needsMark && !match[2] && !mark) return null;   // a bare number is no time
  if (mark === 'pm' && hours < 12) hours += 12;
  if (mark === 'am' && hours === 12) hours = 0;
  if (hours > 23 || minutes > 59) return null;
  return `${pad(hours)}:${pad(minutes)}`;
}

function dateOf (text, today) {
  let match = ISO.exec(text);
  if (match) return `${match[1]}-${match[2]}-${match[3]}`;

  match = DOTTED.exec(text);
  if (match) {
    const day   = Number(match[1]);
    const month = Number(match[2]);
    if (day < 1 || day > 31 || month < 1 || month > 12) return null;
    let year = match[3] ? Number(match[3]) : Number(today.slice(0, 4));
    if (year < 100) year += 2000;
    let date = `${year}-${pad(month)}-${pad(day)}`;
    if (!match[3] && date < today) date = `${year + 1}-${pad(month)}-${pad(day)}`;   // the next one
    return date;
  }
  return null;
}

// :::::: PARSE :::::::::::::::::::::::::::::::::::::::::::::::

export function parse (text, { ignore = [], lang, now = new Date } = {}) {
  const words    = String(text ?? '').trim().split(/\s+/).filter(Boolean);
  const lower    = words.map(word => word.toLowerCase());
  const table    = wordsFor(lang);
  const weekdays = weekdaysFor(lang);
  const today    = dayOf(now);
  const skip     = new Set(ignore);
  const tokens   = [];
  const taken    = new Array(words.length).fill(false);

  const result = { title: '', due: null, list: null, priority: 0, repeat: null, someday: false, tags: [], tokens };

  const take = (kind, start, end, label, apply) => {
    const text = words.slice(start, end).join(' ');
    if (skip.has(text)) return false;
    for (let index = start; index < end; index++) taken[index] = true;
    tokens.push({ kind, text, label, start, end });
    apply();
    return true;
  };

  let date = null;
  let time = null;

  const setDate = value => { date = value; };
  const setTime = value => { time = value; };

  for (let index = 0; index < words.length; index++) {
    if (taken[index]) continue;
    const word  = lower[index];
    const two   = lower.slice(index, index + 2).join(' ');
    const three = lower.slice(index, index + 3).join(' ');

    // #tag, +list, !2
    let match = TAG.exec(words[index]);
    if (match) { take('tag', index, index + 1, match[1], () => result.tags.push(match[1].toLowerCase())); continue; }

    match = LIST.exec(words[index]);
    if (match) { take('list', index, index + 1, match[1], () => { result.list = match[1].toLowerCase(); }); continue; }

    match = PRIORITY.exec(word);
    if (match) {
      const level = Number(match[1] ?? match[2].length);
      take('priority', index, index + 1, '!'.repeat(level), () => { result.priority = level; });
      continue;
    }

    // repeat: daily, every week, every 2 days, every monday, alle 2 wochen
    if (word in table.repeats) {
      const unit = table.repeats[word];
      take('repeat', index, index + 1, word, () => { result.repeat = { every: 1, unit, on: null, from: 'due' }; });
      continue;
    }
    if (table.every.includes(word) && index + 1 < words.length) {
      const count = /^\d+$/.test(lower[index + 1]) ? Number(lower[index + 1]) : null;
      const at    = index + (count ? 2 : 1);
      const unit  = table.units[lower[at]];
      const day   = weekdays.get(lower[at]);
      if (unit) {
        take('repeat', index, at + 1, count > 1 ? `every ${count} ${unit}s` : `every ${unit}`, () => { result.repeat = { every: count ?? 1, unit, on: null, from: 'due' }; });
        continue;
      }
      if (day != null && !count) {
        take('repeat', index, at + 1, `every ${words[at]}`, () => {
          result.repeat = { every: 1, unit: 'week', on: [day], from: 'due' };
          if (!date) date = nextWeekday(today, day, true);
        });
        continue;
      }
    }
    if (table.after.includes(word) && result.repeat && /done|erledigt|fertig/.test(lower[index + 1] ?? '')) {
      take('repeat', index, index + 2, 'after done', () => { result.repeat.from = 'done'; });
      continue;
    }

    // dates: phrases first, then single words
    const phrase = [three, two].find(candidate => candidate in table.pairs);
    if (phrase) {
      const length = phrase.split(' ').length;
      take('date', index, index + length, phrase, () => setDate(addDays(today, table.pairs[phrase])));
      continue;
    }
    if (word in table.relative) {
      take('date', index, index + 1, word, () => {
        setDate(addDays(today, table.relative[word]));
        if (word === 'tonight' && !time) time = '20:00';
      });
      continue;
    }
    if (table.someday.includes(word)) { take('date', index, index + 1, word, () => { result.someday = true; }); continue; }

    // in 3 days
    if (table.in.includes(word) && /^\d+$/.test(lower[index + 1] ?? '') && table.units[lower[index + 2]]) {
      const count = Number(lower[index + 1]);
      const unit  = table.units[lower[index + 2]];
      const days  = { day: 1, week: 7, month: 30, year: 365 }[unit] * count;
      take('date', index, index + 3, `in ${count} ${unit}${count > 1 ? 's' : ''}`, () => setDate(addDays(today, days)));
      continue;
    }

    // monday, next monday
    const weekdayAt = table.next.includes(word) ? index + 1 : index;
    const weekday   = weekdays.get(lower[weekdayAt]);
    if (weekday != null) {
      take('date', index, weekdayAt + 1, words.slice(index, weekdayAt + 1).join(' '), () => setDate(nextWeekday(today, weekday, weekdayAt > index)));
      continue;
    }

    const exact = dateOf(word, today);
    if (exact) { take('date', index, index + 1, word, () => setDate(exact)); continue; }

    // at 9, um 9, 9:00, 9pm
    if (table.at.includes(word) && index + 1 < words.length) {
      const clock = clockOf(lower[index + 1], false);
      if (clock) { take('time', index, index + 2, clock, () => setTime(clock)); continue; }
    }
    const clock = clockOf(word, true);
    if (clock) { take('time', index, index + 1, clock, () => setTime(clock)); continue; }
  }

  if (time && !date) date = time > `${pad(now.getHours())}:${pad(now.getMinutes())}` ? today : addDays(today, 1);
  if (date) result.due = time ? `${date}T${time}` : date;
  if (result.repeat && !result.due) result.due = today;

  result.title = words.filter((_, index) => !taken[index]).join(' ');
  return result;
}

export default parse;
