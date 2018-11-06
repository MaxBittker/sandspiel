import { Cell, Species, Universe } from "../crate/pkg";

import { startWebGL } from "./render";
import { fps } from "./ui";
import { startFluid } from "./fluid";
import { ratio } from "./constants";
if (window.safari) {
  history.pushState(null, null, location.href);
  window.onpopstate = function(event) {
    history.go(1);
  };
}

const ui = document.getElementById("ui");

let screen_width = window.innerWidth;
let uiheight = ui.offsetHeight;
let screen_height = window.innerHeight - uiheight;

const universe = Universe.new(250, 250);
const width = universe.width();
const height = universe.height();

const canvas = document.getElementById("sand-canvas");
const canvas2 = document.getElementById("fluid-canvas");

canvas.height = height * window.devicePixelRatio;
canvas.width = width * window.devicePixelRatio;

let canvasStyle = "";
if (screen_width > screen_height) {
  canvasStyle = `height: ${screen_height}px`;
} else {
  canvasStyle = `width: ${screen_width}px; bottom: ${(screen_height -
    screen_width) /
    2}px`;
}
canvas.style = canvasStyle;
canvas2.style = canvasStyle;

let fluid_update = startFluid({ universe });

const renderLoop = () => {
  fps.render(); // new
  universe.tick();
  fluid_update();
  window.animationId = requestAnimationFrame(renderLoop);
};

startWebGL({ canvas, universe });
renderLoop();
export { renderLoop, canvas, width, height, universe, ratio };
