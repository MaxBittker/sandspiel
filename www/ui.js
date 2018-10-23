import React from 'react';
import ReactDOM from 'react-dom';

import {Species} from 'sandtable';

import {height, renderLoop, universe, width} from './index.js';

let ratio = 2;
let screen_width = window.innerWidth / ratio;
let screen_height = window.innerHeight / ratio;
let pixels = screen_width * screen_height;

const canvas = document.getElementById('game-of-life-canvas');

let selectedElement = Species.Water;

const paint = event => {
  event.preventDefault();
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
  universe.paint(x, y, 12, selectedElement);
};

let painting = false;
canvas.addEventListener('mousedown', event => {
  event.preventDefault();
  painting = true;
  paint(event);
});
canvas.addEventListener('mouseup', event => {
  event.preventDefault();

  painting = false;
});
canvas.addEventListener('mousemove', event => {
  paint(event);
});

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
    const fps = (1 / delta) * 1000;

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
}
();

const ElementButton = (name, setElement) => {
  let elementID = Species[name];
  return (
    <button
      className={elementID == selectedElement ? 'selected' : ''}
      key={name}
      onClick={() => {
    selectedElement = elementID;
    setElement(elementID);
      }}
    >
      {name}
    </button>
  );
};
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { paused: false, size: 4, selectedElement: selectedElement };
  }

  playPause() {
    if (this.state.paused) {
      renderLoop();
    } else {
      cancelAnimationFrame(window.animationId);
      window.animationId = null;
    }
    this.setState({ paused: !this.state.paused });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.playPause()}>
          {this.state.paused ? "⏸" : "▶"}
        </button>
        <button onClick={() => universe.tick()}>tick</button>
        {Object.keys(Species).map(n =>
          ElementButton(n, id => this.setState({ selectedElement, id }))
        )}
      </div>
    );
}
}

ReactDOM.render(<Index />, document.getElementById('ui'));

export {fps};
