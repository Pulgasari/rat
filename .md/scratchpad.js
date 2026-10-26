// commands | hotkeys

// a 3rd form (F3)
const count = signal(0);
count;     // read
count(5);  // write

// a 4th form (F4)
$.count = $(0);
$.count;    // read
$.count(5); // write

// a 5th form (F5)
$.count = $(0); // create
$.count.$;      // signal
$.count;        // read
$.count = 5;    // write
$.count.get();  // read
$.count.set(5); // write

// F6
$.set.count = 5; // write + create
$.get.count;     // read
$.sig.count;     // signal
$.count;         // read (short)
$.count = 5;     // write (short)
$.count = $(0);  // create (with schema)

// F7
$['set'].count = $(0); // create
$['set'].count = 5;    // write
$['get'].count;        // read
$['sig'].count;        // signal

$({ set: 0 })['count'];
$({ set })['count'];

$.set({ count: 0, name: 'udo' }); // write (multiple at once)
$.sig('name'); // signal
$.get('name'); // read
$.get('count', 'name');
$.get(['count', 'name']);
$.get({ count, name });


// F7
$.count = $(0);    // create (mit schema: $(0, Num))
$.count;           // read
$.count = 5;       // write, wirft bei unbekanntem key
$.sig.count;       // signal
$.peek.count;      // read, untracked


$['count'] = 0; // create
$['count'](0);  // create






const unable = what => Promise.reject(new Error(`[rat] clipboard: this platform does not let the app ${what} it`));

RAT.PREFIX = '[RAT] ';
RAT.ERROR = function () {};
RAT.ERROR.create = function (message, ...vars) {
  const msg = RAT.PREFIX + message
  return new Error (msg);
}
const NOT_ALLOWED = RAT.ERROR.create(`clipboard: this platform does not let the app ${$0} it`);

const unable = what => Promise.reject(NOT_ALLOWED, what);


//

schema {
  artist : { type: String },
}

// match

case Loading = ...;

const label = match (event) {
  { type: 'user', name }       => `user ${name}`,      // name wird herausgeholt
  { type: 'error', message }   => `error: ${message}`,
  { age } if age >= 18         => 'adult',             // guard
  Num.range(0, 255)            => `byte ${#}`,         // ein schema: # ist der umgewandelte wert
  // fallback
  Loading                      => 'loading …',         // ein benannter case
  'idle' | 'paused'            => 'waiting',           // mehrere in einem fall
  _                            => 'unknown',
};



const label = match {
  { type: 'user', name }     => `user ${name}`,
  { type: 'error', message } => `error: ${message}`,
  { age } if age >= 18       => 'adult',
  Num.range(0, 255)          => `byte ${#}`,
  case Loading               => 'loading …',
  case 'idle' | 'paused'     => 'waiting',
  // fallback
  default                    => 'unknown',
};

const label = match {
  { type: 'user', name }     : `user ${name}`,
  { type: 'error', message } : `error: ${message}`,
  { age } if age >= 18       : 'adult',
  Num.range(0, 255)          : `byte ${#}`,
  case Loading               : 'loading …',
  case 'idle' | 'paused'     : 'waiting',
  // fallback
  default                    : 'unknown',
};

// form 1
const label = match (cond, {
  ...
});

// form 2
const processLabel = match ({
  ...
});
processLabel ('katze');
processLabel (123)|

const processLabel = match ({
  ...
});
