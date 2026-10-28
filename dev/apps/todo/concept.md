# concept: todo

the plan the app was built from. what is in it and what is open: README.md.

tasks for one person, offline, fast to add and fast to tick. no accounts, the
data lives on the device, sync comes through what zugriff already has.

## the task

```js
{
  id, title,
  notes    : '',          // markdown
  done     : null,        // when it was ticked, null while open
  list     : 'inbox',     // one list (a project)
  tags     : [],
  priority : 0,           // 0 none, 1 low, 2 medium, 3 high
  due      : null,        // a date, or a date and time
  remind   : null,        // when to tell, may differ from due
  repeat   : null,        // see below
  parent   : null,        // a subtask points to its task
  order    : 0,           // the place in its list
  created, changed,
}
```

repeat stays small: `{ every: 2, unit: 'day' | 'week' | 'month' | 'year', on: [1, 3] }`
(weekdays or days of the month), and whether the next one counts from the due
date or from the day it was done. ticking a repeating task makes the next one.

## adding

one field, a line of text, read as it is typed:

```
call anna tomorrow 9:00 #family !2 every week
```

becomes the title `call anna`, due tomorrow at 9, the tag `family`, priority 2,
weekly. the words for days and times come from the language of the page
(`Intl` for the names of weekdays and months, a small table for "tomorrow",
"next week"). what was read shows as chips under the field, a chip can be
removed before saving.

## views

- **today**: due today and overdue, then what is starred
- **upcoming**: by day, the next weeks
- **lists**: one per list, sortable by hand
- **tags**, **done** (the history), **search**
- **someday**: no date, not in a list

## working with it

- swipe right ticks, left schedules or deletes (`dismissable` of
  `@aufbau/gestures`), a long press lifts a row to sort it (`sortable`)
- the keyboard: `n` new, `x` tick, `e` edit, `t` today, `/` search
  (`.shared/js/modules/hotkeys.js`)
- edit in the `context` area: `input-date`, `input-time`, `input-chips` for
  tags, `write-md` for notes, subtasks as a list below
- undo for the last tick and delete (a `pop-toast` with an undo button)

## reminders

- browser: the notifications api through the service worker, shown when the
  app is open or the worker wakes. without a push server that is unreliable,
  so a reminder is also shown at the next start
- capacitor: the local notifications plugin, reliable, scheduled when a task
  is saved

## storage and sync

`@bunker/db`, a table `tasks`, one `lists`. `onChange` keeps two open tabs in
step. sync, in this order:

1. **export / import**: json, and plain text in the todo.txt format
   (`x 2026-10-07 (A) call anna +family due:2026-10-08`), which other apps read
2. **a file in a granted folder or on webdav**: the json written there after a
   change, read at start, merged by `changed` per task (the newer one wins, a
   deleted task leaves a tombstone)
3. maybe **markdown**: a list as a `.md` file with `- [ ]` lines, so `apps/notes`
   shows the same tasks. nice, but a second format to keep in step

## open questions

- todo.txt as the file format right away, or own json first?
- the markdown bridge to notes: worth it?
- one list per task, or several (like tags)?
- calendar: a `widget-calendar` for picking and an upcoming month view, now or later?
