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

// approach 3 :: creating List from extending Array

class List extends Array {
  swap (index_A, index_B) {
    let input = this;
    let temp = input[index_A];
    input[index_A] = input[index_B];
    input[index_B] = temp;
  }
}
