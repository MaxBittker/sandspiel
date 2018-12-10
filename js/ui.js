import React from "react";
import ReactDOM from "react-dom";
import { memory } from "../crate/pkg/sandtable_bg";
import { Species } from "../crate/pkg";

import { height, renderLoop, universe, width } from "./index.js";
import { snapshot } from "./render.js";

// let url = "http://localhost:5001/sandtable-8d0f7/us-central1/api/creations";
let endpoint =
  "https://us-central1-sandtable-8d0f7.cloudfunctions.net/api/creations";
let storageUrl =
  "https://firebasestorage.googleapis.com/v0/b/sandtable-8d0f7.appspot.com/o/creations%2F";

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
  smoothPaint(event);
});
canvas.addEventListener("mouseleave", event => {
  clearInterval(repeat);
  lastPaint = null;
});
canvas.addEventListener("touchstart", event => {
  event.preventDefault();
  painting = true;
  lastPaint = event;
  handleTouches(event);
});
canvas.addEventListener("touchend", event => {
  event.preventDefault();
  lastPaint = null;
  painting = false;
  clearInterval(repeat);
});
canvas.addEventListener("touchmove", event => {
  event.preventDefault();
  clearInterval(repeat);
  handleTouches(event);
});
function smoothPaint(event) {
  repeat = window.setInterval(() => paint(event), 100);
  let startEvent = { clientX: event.clientX, clientY: event.clientY };
  if (!painting) {
    return;
  }
  let size = sizeMap[window.UI.state.size];
  let i = 0;
  paint(startEvent);
  if (lastPaint) {
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
  }

  lastPaint = event;
}

const handleTouches = event => {
  let touches = Array.from(event.touches);
  if (touches.length == 1) {
    smoothPaint(touches[0]);
  } else {
    touches.forEach(paint);
  }
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

const Menu = ({ close, children }) => {
  return (
    <div className="menu-scrim">
      <div className={"menu"}>
        {children}

        <button className="x" onClick={close}>
          {" "}
          x
        </button>
      </div>
    </div>
  );
};

const Submissions = ({ submissions }) => {
  return (
    <div className="submissions">
      {submissions.map(submission => {
        return (
          <div key={submission.id}>
            <img src={`${storageUrl}img-${submission.data.id}.png?alt=media`} />
            <h4>{submission.data.title}</h4>
          </div>
        );
      })}
    </div>
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

let sizeMap = [2, 5, 10, 18, 30, 45];

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      paused: false,
      size: 2,
      dataURL: {},
      submissions: null,
      selectedElement: Species.Water
    };
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
  setSize(event, size) {
    event.preventDefault();
    this.setState({
      size
    });
  }
  reset() {
    window.confirm("Reset?") && universe.reset();
  }
  menu() {
    this.playPause();
    this.setState({ menuOpen: true });
  }
  closeMenu() {
    this.playPause();
    this.setState({ menuOpen: false });
  }
  upload() {
    this.playPause();

    console.log("snapping");
    let dataURL = snapshot(universe);
    const cells = new Uint8Array(
      memory.buffer,
      universe.cells(),
      width * height * 4
    );

    // Create canvas
    let canvas = document.createElement("canvas"),
      context = canvas.getContext("2d"),
      imgData = context.createImageData(width, height);

    canvas.height = height;
    canvas.width = width;

    // fill imgData with data from cells
    for (var i = 0; i < width * height * 4; i++) {
      imgData.data[i] = cells[i];
    }
    // put data to context at (0, 0)
    context.putImageData(imgData, 0, 0);

    let cellData = canvas.toDataURL("image/png");

    this.setState({ data: { dataURL, cells: cellData }, menuOpen: true });
    // console.log(dataURL.length);
  }
  submit() {
    let { title, data } = this.state;
    let { dataURL, cells } = data;
    let payload = { title, image: dataURL, cells };

    fetch(endpoint, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(payload), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => console.log("Success:", JSON.stringify(response)))
      .catch(error => console.error("Error:", error));
  }
  load() {
    fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        this.setState({ submissions: response });
      })
      .catch(error => console.error("Error:", error));
    // const burnsData = new Uint8Array(
    //   memory.buffer,
    //   universe.burns(),
    //   width * height * 4
    // );

    // for (var i = 0; i < width * height * 4; i++) {
    //   burnsData[i] = otherdata[i];
    // }
  }
  render() {
    let { size, paused, selectedElement } = this.state;
    return (
      <React.Fragment>
        {/* <button onClick={() => this.menu()}>Menu</button> */}
        <button onClick={() => this.about()}>About</button>
        <button onClick={() => this.upload()}>Upload</button>
        <button onClick={() => this.load()}>Load</button>
        <button onClick={() => this.reset()}>Reset</button>
        <button onClick={() => this.playPause()}>
          {paused ? (
            "\u25B6\uFE0E"
          ) : (
            <svg height="10" width="10" id="d" viewBox="0 0 300 300">
              <polygon id="shape1" points="0,0 110,0 110,300 0,300" />
              <polygon id="shape2" points="190,0 300,0 300,300 190,300" />
            </svg>
          )}
        </button>
        {/* {paused && <button onClick={() => universe.tick()}>Tick</button>} */}
        <span className="sizes">
          {sizeMap.map((v, i) => (
            <button
              key={i}
              className={i == size ? "selected" : ""}
              onClick={e => this.setSize(e, i)}
              style={{ padding: "0px" }}
            >
              <svg height="24" width="24" id="d" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r={2 + v} />
              </svg>
            </button>
          ))}
        </span>

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
        {this.state.menuOpen && (
          <Menu close={() => this.closeMenu()}>
            <h4>Share your creation with the people!</h4>
            <img src={this.state.data.dataURL} />
            <input
              placeholder="title"
              onChange={e => this.setState({ title: e.target.value })}
            />
            <button onClick={() => this.submit()}>Submit</button>
          </Menu>
        )}
        {this.state.submissions && (
          <Menu close={() => this.closeMenu()}>
            <Submissions submissions={this.state.submissions} />
          </Menu>
        )}
        {/* <button disabled onClick={() => this.save()}>
          Save
        </button>
        <button onClick={() => this.load()}>Load</button> */}
      </React.Fragment>
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
    this.fps.textContent = `FPS:${Math.round(mean)}`;
  }
}();

export { fps };
