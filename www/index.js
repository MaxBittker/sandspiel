import {Cell, Species, Universe} from 'sandtable';
// Import the WebAssembly memory at the top of the file.
import {memory} from 'sandtable/sandtable_bg';
import {fps, play} from './ui'


let ratio = 2;
let screen_width = window.innerWidth / ratio;
let screen_height = window.innerHeight / ratio;
// let pixels = screen_width * screen_height;

// Construct the universe, and get its width and height.
const universe = Universe.new(screen_width, screen_height);
const width = universe.width();
const height = universe.height();

const canvas = document.getElementById('game-of-life-canvas');
canvas.height = height;
canvas.width = width;

const ctx = canvas.getContext('2d');

const image = ctx.createImageData(width, height);

const drawCells = () => {
  const cellsPtr = universe.cells();
  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height * 4);
  for (let i = 0; i < width * height * 4; i += 1) {
    let ci = i * 4;
    const color = cells[i * 4] ? 0xFF : 0x0;
    const ra = cells[(i * 4) + 1];
    const rb = cells[(i * 4) + 2];
    image.data[i * 4] = color;
    image.data[i * 4 + 1] = ra;
    image.data[i * 4 + 2] = rb;
    image.data[i * 4 + 3] = 0xFF;
  }
  ctx.putImageData(image, 0, 0);
};

const renderLoop = () => {
  fps.render();  // new
  universe.tick();
  drawCells();
  window.animationId = requestAnimationFrame(renderLoop);
};


play();


export {
  renderLoop,
  canvas,
  width,
  height,
  universe,
  drawCells,
  ratio,
}