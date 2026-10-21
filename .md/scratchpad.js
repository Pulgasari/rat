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
