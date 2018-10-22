import {Cell, Universe} from 'sandtable';

// Import the WebAssembly memory at the top of the file.
import {memory} from 'sandtable/sandtable_bg';


let t = 0;
let ratio = 2;
let screen_width = window.innerWidth / ratio;
let screen_height = window.innerHeight / ratio;
let pixels = screen_width * screen_height;

// Construct the universe, and get its width and height.
const universe = Universe.new(screen_width, screen_height);
const width = universe.width();
const height = universe.height();



const canvas = document.getElementById('game-of-life-canvas');
canvas.height = height;
canvas.width = width;

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
  console.log('tick: ' + t)
  t += 1;
  universe.tick();
  drawCells();
});


const paint = (event) => {
  if (!painting) {
    return;
  }
  const boundingRect = canvas.getBoundingClientRect();

  const scaleX = canvas.width / boundingRect.width;
  const scaleY = canvas.height / boundingRect.height;

  const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
  const canvasTop = (event.clientY - boundingRect.top) * scaleY;

  const x = Math.min(Math.floor(canvasLeft), width - 1);
  const y = Math.min(Math.floor(canvasTop), height - 1);
  universe.paint(x, y, 5);
  drawCells();
};

let painting = false
canvas.addEventListener('mousedown', event => {
  painting = true;
  paint(event)
});
canvas.addEventListener('mouseup', event => {painting = false});
canvas.addEventListener('mousemove', event => {paint(event)});


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
  t += 1;

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
    #Pixels: ${pixels.toLocaleString()}
  FPS:      latest = ${Math.round(fps)}
  avg of last 100 = ${Math.round(mean)}
  max of last 100 = ${Math.round(max)}
  `.trim();
  }
};

play(renderLoop);
