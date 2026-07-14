// just a test file to thing about features and syntax

// :::::: parseSequence()

// a pattern like this is a sequence
// most likely seperated by ','

const members = [p.parse('Primary')];
while (p.match('|')) members.push(p.parse('Primary'));
p.match(';');

// could be abstracted to:

function parseSequence (elementSpec, seperatorSpec = ',') (
  const arr = [];
  do { arr.push(elementSpec); } while (seperatorSpec);
  return arr;
}

// which results in:

const members = p.parseSequence('Primary', '|');
match(';');

// :::::: CHAIN ???

// but i wonder if we could make an optional
// chain logic introduced by $ on top of
// the parse- and control-flow-methods
// really kinda good old jQuery like

const members = p.$sequence('Primary', '|').$match(';');
const members = p.$.sequence('Primary', '|').match(';');

// not with the intension to write superlong chains
// but more likely short chains of logical connected operations.

// maybe as importable helper?
// looks better than the syntax examples above at least
// but maybe less efficient from performance standpoint?

const members = $(p).sequence('Primary', '|').match(';');

 
