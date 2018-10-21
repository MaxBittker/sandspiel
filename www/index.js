import {Cell, Universe} from 'sandtable';

// Import the WebAssembly memory at the top of the file.
import {memory} from 'sandtable/sandtable_bg';

const CELL_SIZE = 1;  // px


// Construct the universe, and get its width and height.
const universe = Universe.new();
const width = universe.width();
const height = universe.height();

// Give the canvas room for all of our cells and a 1px border
// around each of them.
const canvas = document.getElementById('game-of-life-canvas');
canvas.height = (CELL_SIZE) * height;
canvas.width = (CELL_SIZE) * width;

const ctx = canvas.getContext('2d');

let animationId = null;

const isPaused = () => {
  return animationId === null;
};

const playPauseButton = document.getElementById('play-pause');
const tickButton = document.getElementById('tick');

const play = () => {
  playPauseButton.textContent = '⏸';
  renderLoop();
};

const pause = () => {
  playPauseButton.textContent = '▶';
  cancelAnimationFrame(animationId);
  animationId = null;
};

playPauseButton.addEventListener('click', event => {
  if (isPaused()) {
    play();
  } else {
    pause();
  }
});

tickButton.addEventListener('click', event => {
  console.log('tick')
  universe.tick();
  drawCells();
});


canvas.addEventListener('click', event => {
  const boundingRect = canvas.getBoundingClientRect();

  const scaleX = canvas.width / boundingRect.width;
  const scaleY = canvas.height / boundingRect.height;

  const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
  const canvasTop = (event.clientY - boundingRect.top) * scaleY;

  const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
  const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

  //   universe.toggle_cell(row, col);

  drawCells();
});



const getIndex = (row, column) => {
  return row * width + column;
};

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

  animationId = requestAnimationFrame(renderLoop);
};



const fps = new class {
  constructor() {
    this.fps = document.getElementById('fps');
    this.frames = [];
    this.lastFrameTimeStamp = performance.now();
  }

  render() {
    // Convert the delta time since the last frame render into a measure
    // of frames per second.
    const now = performance.now();
    const delta = now - this.lastFrameTimeStamp;
    this.lastFrameTimeStamp = now;
    const fps = 1 / delta * 1000;

    // Save only the latest 100 timings.
    this.frames.push(fps);
    if (this.frames.length > 100) {
      this.frames.shift();
    }

    // Find the max, min, and mean of our 100 latest timings.
    let min = Infinity;
    let max = -Infinity;
    let sum = 0;
    for (let i = 0; i < this.frames.length; i++) {
      sum += this.frames[i];
      min = Math.min(this.frames[i], min);
      max = Math.max(this.frames[i], max);
    }
    let mean = sum / this.frames.length;

    // Render the statistics.
    this.fps.textContent = `
  Frames per Second:
           latest = ${Math.round(fps)}
  avg of last 100 = ${Math.round(mean)}
  max of last 100 = ${Math.round(max)}
  `.trim();
  }
};

play(renderLoop);
