import React from "react";
import ReactDOM from "react-dom";

import { Species } from "../crate/pkg";
import { ratio } from "./constants";

import { height, renderLoop, universe, width } from "./index.js";
let screen_width = window.innerWidth / ratio;
let screen_height = window.innerHeight / ratio;
let pixels = screen_width * screen_height;

const canvas = document.getElementById("sand-canvas");

const eventDistance = (a, b) => {
  return Math.sqrt(
    Math.pow(a.clientX - b.clientX, 2) + Math.pow(a.clientY - b.clientY, 2),
    2
  );
};

const magnitude = a => {
  return Math.sqrt(Math.pow(a.clientX, 2) + Math.pow(a.clientY, 2), 2);
};

const norm = a => {
  let mag = magnitude(a);
  return { clientX: a.clientX / mag, clientY: a.clientY / mag };
};
const scale = (a, s) => {
  return { clientX: a.clientX * s, clientY: a.clientY * s };
};
const add = (a, b) => {
  return { clientX: a.clientX + b.clientX, clientY: a.clientY + b.clientY };
};
const sub = (a, b) => {
  return { clientX: a.clientX - b.clientX, clientY: a.clientY - b.clientY };
};

let painting = false;
let lastPaint = null;
let repeat = null;
canvas.addEventListener("mousedown", event => {
  event.preventDefault();
  painting = true;
  clearInterval(repeat);
  repeat = window.setInterval(() => paint(event), 100);
  paint(event);
  lastPaint = event;
});
canvas.addEventListener("mouseup", event => {
  event.preventDefault();
  lastPaint = null;
  clearInterval(repeat);
  painting = false;
});
canvas.addEventListener("mousemove", event => {
  clearInterval(repeat);
  repeat = window.setInterval(() => paint(event), 100);
  let startEvent = { clientX: event.clientX, clientY: event.clientY };
  if (!painting) {
    return;
  }
  let size = sizeMap[window.UI.state.size];
  let i = 0;
  paint(startEvent);
  while (eventDistance(startEvent, lastPaint) > size / 2) {
    let d = eventDistance(startEvent, lastPaint);
    startEvent = add(
      startEvent,
      scale(norm(sub(lastPaint, event)), Math.min(size / 2, d))
    );
    i++;
    if (i > 1000) {
      break;
    }
    paint(startEvent);
  }

  lastPaint = event;
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

  const scaleX = canvas.width / window.devicePixelRatio / boundingRect.width;
  const scaleY = canvas.height / window.devicePixelRatio / boundingRect.height;

  const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
  const canvasTop = (event.clientY - boundingRect.top) * scaleY;

  const x = Math.min(Math.floor(canvasLeft), width - 1);
  const y = Math.min(Math.floor(canvasTop), height - 1);
  if (window.UI.state.selectedElement < 0) return;
  universe.paint(
    x,
    y,
    sizeMap[window.UI.state.size],
    window.UI.state.selectedElement
  );
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
    this.state = { paused: false, size: 3, selectedElement: Species.Water };
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
  reset() {
    universe.reset();
  }
  render() {
    let { size, paused, selectedElement } = this.state;
    return (
      <div>
        <button onClick={() => this.reset()}>Reset</button>
        <button onClick={() => this.playPause()}>
          {paused ? "\u25B6\uFE0E" : "⏸\uFE0E"}
        </button>
        {paused && <button onClick={() => universe.tick()}>Tick</button>}
        <button
          style={{
            borderRightWidth: "0.5px",
            marginRight: "-3px",
            borderBottomLeftRadius: "10px"
          }}
          onClick={e => this.bumpSize(e, -1)}
        >
          -
        </button>
        <button
          onClick={e => this.bumpSize(e, 1)}
          onContextMenu={e => this.bumpSize(e, -1)}
          title="brush size"
        >
          {size + 1}
        </button>
        <button
          style={{
            borderLeftWidth: "0.5px",
            marginLeft: "-3px",
            borderBottomRightRadius: "10px"
          }}
          onClick={e => this.bumpSize(e, 1)}
        >
          +
        </button>
        {Object.keys(Species).map(n =>
          ElementButton(n, selectedElement, id =>
            this.setState({ selectedElement: id })
          )
        )}
        <button
          className={-1 == selectedElement ? "selected" : ""}
          key={name}
          onClick={() => {
            this.setState({ selectedElement: -1 });
          }}
        >
          Wind
        </button>
        {/* <button disabled onClick={() => this.save()}>
          Save
        </button>
        <button onClick={() => this.load()}>Load</button> */}
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
