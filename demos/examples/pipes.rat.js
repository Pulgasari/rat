// .rat.js: plain js plus sugar. html`…` without ${…} is compiled as rat markup

const double = x => x * 2;
const sum    = list => list.reduce((a, b) => a + b, 0);

let   $numbers = [1, 2, 3];
const $total   = $numbers
  |> (list => list.map(double))
  |> sum;

for (n of [4, 5]) console.log(n |> double);

export default () => html`
  <div.pipes>
    <p>zahlen: {$numbers.join(', ')}</p>
    <p>verdoppelt und summiert: {$total}</p>
    <button onclick={() => $numbers = [...$numbers, $numbers.length + 1]}>+ zahl</button>
  </div.pipes>
`;
