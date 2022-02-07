import { Universe, Species } from "../crate/pkg";
import { startWebGL } from "./render";
import { startFluid } from "./fluid";

const canvas = document.getElementById("sand-canvas");

function setup() {
  let n = 300;
  let h = n / 2.0;
  let d = n * 0.9;
  let universe = Universe.new(n, n);
  universe.paint(10, 10, 10, Species.Sand);

  universe.paint(h, h, d + 2, Species.Plant);
  universe.paint(30, n - 10, 15, Species.Fire);
  universe.paint(h - 30, n - 10, 15, Species.Fire);
  universe.paint(h, h, n / 3, Species.Air);
  universe.paint(h, h, n / 3, Species.Fire);

  let fluid = startFluid({ universe });
  let render = startWebGL({ canvas, universe });
  window.f = fluid;
  window.u = universe;
  window.r = render;

  return { universe, fluid, render };
}

function trial(m,{ universe, fluid, render }  ) {

  const t0 = performance.now();
  let cpuTime = 0;
  let fluidTime = 0;
  universe.push_undo();
  for (let i = 0; i < m; i++) {
    const tcpu0 = performance.now();
    universe.tick();
    const tcpu1 = performance.now();
    cpuTime += tcpu1 - tcpu0;

    fluid.update();
    const tFluid = performance.now();
    fluidTime += tFluid - tcpu1;

    render();
  }
  const t1 = performance.now();
  universe.pop_undo();

  let delta = t1 - t0;
  return [delta, cpuTime, fluidTime];
}
function runTest(n, m, log) {
  let min = Infinity;
  let max = 0;
  let sum = 0;
  let cpuSum = 0;
  let cpuMin = Infinity;
  let cpuMax = 0;
  let fluidSum = 0;
  let fluidMin = Infinity;
  let fluidMax = 0;
  log(`Running ${n} trials of ${m} reps`);
  let world = setup();
  for (let i = 0; i < n; i++) {
    let [delta, cpuTime, fluidTime] = trial(m, world);
    min = Math.min(delta, min);
    max = Math.max(delta, max);
    sum += delta;

    cpuMin = Math.min(cpuTime, cpuMin);
    cpuMax = Math.max(cpuTime, cpuMax);
    cpuSum += cpuTime / n;

    fluidMin = Math.min(fluidTime, fluidMin);
    fluidMax = Math.max(fluidTime, fluidMax);
    fluidSum += fluidTime / n;

    let trialResult = ` t${i} ${(delta / m).toPrecision(3)}ms      ${(
      cpuTime / m
    ).toPrecision(3)}ms cpu  ${(fluidTime / m).toPrecision(3)}ms fluid `;
    log(trialResult);
  }
  let avg = sum / n;
  let dev = (max - min) / 2;
  let cDev = (cpuMax - cpuMin) / 2;
  let fDev = (fluidMax - fluidMin) / 2;
  let resultString = `avg:${(avg / m).toPrecision(3)}±${(dev / m).toPrecision(
    2
  )}ms ${(cpuSum / m).toPrecision(3)}±${(cDev / m).toPrecision(2)}ms ${(
    fluidSum / m
  ).toPrecision(3)}±${(fDev / m).toPrecision(2)}ms
  `;
  log(resultString);
}
function runBenchmark(addLogLine) {
  window.paused = true;
  console.log("running test");
  return runTest(50, 20, (line) => {
    console.log(line);
    addLogLine(line);
  });
}
export { runBenchmark };
