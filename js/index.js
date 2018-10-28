import { Cell, Species, Universe } from "../crate/pkg";

import { startWebGL } from "./render";
import { fps } from "./ui";
import { startFluid } from "./fluid";
import { ratio } from "./constants";

let screen_width = window.innerWidth / ratio;
let screen_height = window.innerHeight / ratio;
// let pixels = screen_width * screen_height;

// Construct the universe, and get its width and height.

const universe = Universe.new(screen_width, screen_height);
const width = universe.width();
const height = universe.height();

const canvas = document.getElementById("sand-canvas");
canvas.height = height;
canvas.width = width;

const renderLoop = () => {
  fps.render(); // new
  universe.tick();
  window.animationId = requestAnimationFrame(renderLoop);
};

startWebGL({ canvas, universe });
startFluid({ universe });
renderLoop();
export { renderLoop, canvas, width, height, universe, ratio };
