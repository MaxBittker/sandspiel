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

const universe = Universe.new(250, 250);
const width = universe.width();
const height = universe.height();

const canvas = document.getElementById("sand-canvas");
const canvas2 = document.getElementById("fluid-canvas");

canvas.height = height * window.devicePixelRatio;
canvas.width = width * window.devicePixelRatio;
document.getElementById("background").addEventListener("touchmove", e => {
  e.preventDefault();
});

const ui = document.getElementById("ui");

let screen_width = window.innerWidth;
let uiheight = ui.offsetHeight;
let screen_height = window.innerHeight - uiheight;

let canvasStyle = "";
if (screen_width > screen_height) {
  if (screen_width - window.innerHeight < 225) {
    canvasStyle = `height: ${window.innerHeight}px; margin:3px`;
    ui.style = `width: ${screen_width -
      window.innerHeight -
      11}px; margin: 3px;`;
  } else {
    canvasStyle = `height: ${window.innerHeight}px`;
    ui.style = `width: ${(screen_width - window.innerHeight) / 2 -
      7}px; margin: 3px;`;
  }
} else {
  canvasStyle = `width: ${screen_width}px; bottom:3px;`;
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
