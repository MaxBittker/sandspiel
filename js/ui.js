import React from "react";
import ReactDOM from "react-dom";
// import * as UPNG from "upng-js";

import { memory } from "../crate/pkg/sandtable_bg";
import { Species } from "../crate/pkg";

import { height, universe, width } from "./index.js";
import { snapshot } from "./render.js";
var storage;
var functions;
try {
  storage = firebase.storage();
  functions = firebase.functions();
} catch (e) {}
window.onload = () => {
  functions = firebase.functions();
  storage = firebase.storage();
};
// let url = "http://localhost:5001/sandtable-8d0f7/us-central1/api/creations";
// let endpoint =
// "https://us-central1-sandtable-8d0f7.cloudfunctions.net/api/creations";
let storageUrl =
  "https://firebasestorage.googleapis.com/v0/b/sandtable-8d0f7.appspot.com/o/creations%2F";

// const canvas = document.getElementById("sand-canvas");

const Menu = ({ close, children }) => {
  return (
    <div className="menu-scrim">
      <div className={"menu"}>
        {children}

        <button className="x" onClick={close}>
          x
        </button>
      </div>
    </div>
  );
};

const Submissions = ({ submissions, loadId }) => {
  return (
    <div className="submissions">
      {submissions.map(submission => {
        return (
          <div key={submission.id} className="submission">
            <img src={`${storageUrl}img-${submission.data.id}.png?alt=media`} />
            <div>
              <h2>{submission.data.title}</h2>
              <button
                className="load"
                onClick={() => loadId(submission.data.id)}
              >
                Load
              </button>
            </div>
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
      // renderLoop();
      window.paused = false;
    } else {
      window.paused = true;
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
      if (i % 4 == 3) {
        imgData.data[i] = 255;
      } else {
        imgData.data[i] = cells[i];
      }
    }
    // put data to context at (0, 0)
    context.putImageData(imgData, 0, 0);

    let cellData = canvas.toDataURL("image/png");

    this.setState({ data: { dataURL, cells: cellData }, menuOpen: false });
  }
  submit() {
    let { title, data } = this.state;
    let { dataURL, cells } = data;
    let payload = { title, image: dataURL, cells };
    fetch(functions._url("creations"), {
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
  loadSubmissions() {
    fetch(functions._url("creations"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        this.setState({ submissions: response });
        this.playPause();
      })
      .catch(error => console.error("Error:", error));
  }
  load(id) {
    storage
      .refFromURL(`gs://sandtable-8d0f7.appspot.com/creations/data-${id}.png`)
      .getDownloadURL()
      .then(dlurl => {
        fetch(dlurl, {
          method: "GET"
          // headers: {
          //   "Content-Type": "image/png"
          // }
        })
          .then(res => res.blob())
          .then(blob => {
            // console.log(response);
            var url = URL.createObjectURL(blob);
            var img = new Image();
            img.src = url;
            img.onload = () => {
              var canvas = document.createElement("canvas");
              canvas.width = width;
              canvas.height = height;
              var ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0);
              var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

              // var dataURL = canvas.toDataURL("image/png");
              // document.body.appendChild(img);

              const cellsData = new Uint8Array(
                memory.buffer,
                universe.cells(),
                width * height * 4
              );

              for (var i = 0; i < width * height * 4; i++) {
                // debugger;
                cellsData[i] = imgData.data[i];
              }
              this.setState({ submissions: null });
            };
          })
          .catch(error => console.error("Error:", error));
      });
  }
  render() {
    let { size, paused, selectedElement } = this.state;
    return (
      <React.Fragment>
        {/* <button onClick={() => this.menu()}>Menu</button> */}
        <button onClick={() => this.about()}>About</button>
        <button onClick={() => this.upload()}>Upload</button>
        <button onClick={() => this.loadSubmissions()}>Load</button>
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
          <Menu close={() => this.setState({ submissions: null })}>
            <Submissions
              submissions={this.state.submissions}
              loadId={id => this.load(id)}
            />
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

export { fps, sizeMap };
