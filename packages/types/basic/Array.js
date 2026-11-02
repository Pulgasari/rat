// approach 2 :: just expand the prototype pf Array

Array.prototype.swap = function (index_A, index_B) {
  let input = this;
  let temp  = input[index_A];
  input[index_A] = input[index_B];
  input[index_B] = temp;
}

// approach 3 :: creating List from extending Array

class List extends Array {
  swap (index_A, index_B) {
    let input = this;
    let temp = input[index_A];
    input[index_A] = input[index_B];
    input[index_B] = temp;
  }
}
