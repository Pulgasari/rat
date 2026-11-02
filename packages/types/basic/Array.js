import { is } from './match.js';

// approach 2 :: just expand the prototype pf Array

const P = Array.prototype;
P.where   = function (test) { return this.filter (item =>  is(item, test)); }
P.without = function (test) { return this.filter (item => !is(item, test)); }
P.one     = function (test) { return this.find   (item =>  is(item, test)); }
P.has     = function (test) { return this.some   (item =>  is(item, test)); }
P.pluck   = function (key)  { return this.map    (item => item[key]); }
P.swap    = function (a,b)  { let temp = this[a]; this[a] = this[b]; this[b] = temp; }

// keyBy
// sortBy
// toSortedBy

// every key of criteria has to match, or at least one
const matchesAll = (item) => (criteria) => Object.keys(criteria).every(key => item?.[key] === criteria[key]);
const matchesAny = (item) => (criteria) => Object.keys(criteria).some (key => item?.[key] === criteria[key]);

P.dropByAnyCriteria   = function (criteria = {}) { return this.filter (!matchesAny(criteria) };
P.dropByCriteria      = function (criteria = {}) { return this.filter (!matchesAll(criteria) };
P.filterByAnyCriteria = function (criteria = {}) { return this.filter  (matchesAny(criteria) };
P.filterByCriteria    = function (criteria = {}) { return this.filter  (matchesAll(criteria) };
P.findByAnyCriteria   = function (criteria = {}) { return this.find    (matchesAny(criteria) };
P.findByCriteria      = function (criteria = {}) { return this.find    (matchesAll(criteria) };

P.mapByKey  = function (key) { return this.map(item => item?.[key]) };
P.mapValues = function (fn)  { return this.map(fn) };

/*
books.where({ sourceId: folder })        // all that match
books.without({ id })                    // all that do not
books.one({ id })                        // the first that matches
books.has({ status: 'reading' })         // is there one
books.all({ year: year => year > 1900 }) // do all
books.pluck('title')                     // the value of a key of every item
books.keyBy('id')                        // { [id]: book }
books.search(query, ['title', 'author']) // case insensitive, an empty query finds all
books.sortBy('title')                    //

books.sortBy('title')              // ascending by default
books.sortBy('title', 'desc')
books.sortBy(['author', 'title'])  // ascending by each, in order
books.sortBy({ year: 'desc', title: 'asc' })
books.sortBy(book => book.title.length)

books.where({ sourceId: folder }).search(query, ['title', 'author']).pluck('id');
*/

// approach 3 :: creating List from extending Array

class List extends Array {
  swap (index_A, index_B) {
    let input = this;
    let temp = input[index_A];
    input[index_A] = input[index_B];
    input[index_B] = temp;
  }
}






