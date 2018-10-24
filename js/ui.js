import React from "react";
import ReactDOM from "react-dom";

import { Species } from "../crate/pkg";

import { height, renderLoop, universe, width } from "./index.js";

let ratio = 2;
let screen_width = window.innerWidth / ratio;
let screen_height = window.innerHeight / ratio;
let pixels = screen_width * screen_height;

const canvas = document.getElementById("game-of-life-canvas");

let painting = false;
let lastPaint = null;
canvas.addEventListener("mousedown", event => {
  event.preventDefault();
  painting = true;
  paint(event);
});
canvas.addEventListener("mouseup", event => {
  event.preventDefault();
  lastPaint = null;
  painting = false;
});
canvas.addEventListener("mousemove", event => {
  event.preventDefault();
  paint(event);
});

canvas.addEventListener("touchstart", event => {
  painting = true;
  handleTouches(event);
});
canvas.addEventListener("touchend", event => {
  lastPaint = null;
  painting = false;
});
canvas.addEventListener("touchmove", event => {
  handleTouches(event);
});
const handleTouches = event => {
  event.preventDefault();
  Array.from(event.touches).forEach(paint);
};

const paint = event => {
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
  universe.paint(
    x,
    y,
    sizeMap[window.UI.state.size],
    window.UI.state.selectedElement
  );
  lastPaint = { x, y };
};

const ElementButton = (name, selectedElement, setElement) => {
  let elementID = Species[name];
  return (
    <button
      className={elementID == selectedElement ? "selected" : ""}
      key={name}
      onClick={() => {
        setElement(elementID);
      }}
    >
      {"  "}
      {name}
      {"  "}
    </button>
  );
};

let sizeMap = [1, 3, 5, 8, 13, 21, 34, 55, 89];

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { paused: false, size: 4, selectedElement: Species.Water };
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
  bumpSize(event, d) {
    event.preventDefault();
    this.setState({
      size: (this.state.size + d + sizeMap.length) % sizeMap.length
    });
  }
  render() {
    let { size, paused, selectedElement } = this.state;
    return (
      <div>
        <button onClick={() => this.playPause()}>
          {paused ? "\u25B6\uFE0F" : "\u23F8\uFE0F"}
        </button>
        {paused && <button onClick={() => universe.tick()}>tick</button>}
        <button
          style={{ minWidth: "80px" }}
          onClick={e => this.bumpSize(e, 1)}
          onContextMenu={e => this.bumpSize(e, -1)}
        >
          Size:
          {sizeMap[size]}
        </button>
        {Object.keys(Species).map(n =>
          ElementButton(n, selectedElement, id =>
            this.setState({ selectedElement: id })
          )
        )}
      </div>
    );
  }
}

ReactDOM.render(
  <Index
    ref={UI => {
      window.UI = UI;
    }}
  />,
  document.getElementById("ui")
);

const fps = new class {
  constructor() {
    this.fps = document.getElementById("fps");
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
    if (this.frames.length > 30) {
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
 ${(pixels / 1000).toFixed(0)}Kpx
 FPS:${Math.round(mean)}
    `.trim();
  }
}();

export { fps };
