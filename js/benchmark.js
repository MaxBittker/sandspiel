import { Universe, Species } from "../crate/pkg";

// function clear() {
//   u.paint(150, 150, 600, 0);
// }
// let
function setup() {
  let n = 300;
  let h = n / 2;
  let d = n - 6;
  let universe = Universe.new(n, n);
  universe.paint(h, h, d + 2, Species.Plant);
  universe.paint(h - 30, d - 3, 20, Species.Fire);
  universe.paint(h + 30, d - 3, 20, Species.Fire);
  universe.paint(h, h, n / 3, Species.Air);
  universe.paint(h, h, n / 3, Species.Fire);
  return universe;
}
function functionUnderTest(u) {
  u.tick();
}
function trial(m) {
  let input = setup();
  const t0 = performance.now();
  for (let i = 0; i < m; i++) {
    functionUnderTest(input);
  }

  const t1 = performance.now();
  let delta = t1 - t0;
  return delta;
}
function runTest(n, m) {
  let min = Infinity;
  let max = 0;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    let delta = trial(m);
    min = Math.min(delta, min);
    max = Math.max(delta, max);
    sum += delta;
    console.log(`${i}/${n}`);
  }
  let avg = sum / n;
  let dev = max - min;
  // ${min.toPrecision(3)}ms - ${max.toPrecision(3)}ms
  console.log(`Ran ${n} trials
Range per ${m}: 
avg: ${(avg / m).toPrecision(3)}ms ± ${(dev / m).toPrecision(2)}ms
  `);
}
function runBenchmark() {
  runTest(10, 10);
}
export { runBenchmark };
