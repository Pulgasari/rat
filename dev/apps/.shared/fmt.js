// apps/.shared/fmt.js

/*
values as the apps show them:

  fmt.ago(ms)         'today', 'yesterday', '3 days ago', then a date
  fmt.bytes(1048576)  '1.0 MB'
  fmt.date(ms)        'Oct 23, 2026'
  fmt.duration(3723)  '1:02:03', below an hour '2:03'
  fmt.since(ms)       'just now', '5 min ago', '3 h ago', '2 d ago', then a date
*/

const DAY  = 86400000;
const DATE = { day: 'numeric', month: 'short', year: 'numeric' };

const timeOf = value => value instanceof Date ? value.getTime() : Number(value);

const date = value => {
  const time = timeOf(value);
  return !value || isNaN(time) ? '' : new Date(time).toLocaleDateString(undefined, DATE);
};

const ago = value => {
  const time = timeOf(value);
  if (!value || isNaN(time)) return '';
  const days = (Date.now() - time) / DAY;
  if (days < 0) return date(time);
  if (days < 1) return 'today';
  if (days < 2) return 'yesterday';
  if (days < 7) return `${Math.floor(days)} days ago`;
  return date(time);
};

const since = value => {
  const time = timeOf(value);
  if (!value || isNaN(time)) return '';
  const minutes = Math.round((Date.now() - time) / 60000);
  if (minutes < 1)    return 'just now';
  if (minutes < 60)   return `${minutes} min ago`;
  if (minutes < 1440) return `${Math.round(minutes / 60)} h ago`;
  if (minutes < 10080) return `${Math.round(minutes / 1440)} d ago`;
  return date(time);
};

const duration = seconds => {
  if (seconds == null || isNaN(seconds) || seconds <= 0) return '';
  const total = Math.round(seconds);
  const h     = Math.floor(total / 3600);
  const mm    = String(Math.floor((total % 3600) / 60)).padStart(h ? 2 : 1, '0');
  const ss    = String(total % 60).padStart(2, '0');
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
};

const bytes = value => {
  if (!value || value < 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const index = Math.min(units.length - 1, Math.floor(Math.log(value) / Math.log(1024)));
  return `${(value / 1024 ** index).toFixed(1)} ${units[index]}`;
};

const fmt = { ago, bytes, date, duration, since };

// :::::: EXPORT

export { ago, bytes, date, duration, since };
export default fmt;
