//

Array.prototype.swap = function (index_A, index_B) {
  let input = this;
  let temp  = input[index_A];
  input[index_A] = input[index_B];
  input[index_B] = temp;
}
