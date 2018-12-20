import React from "react";
import ReactDOM from "react-dom";
import { withUrlState } from "with-url-state";

import { memory } from "../crate/pkg/sandtable_bg";
import { Species } from "../crate/pkg";

import { height, universe, width, reset } from "./index.js";
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

let storageUrl =
  "https://firebasestorage.googleapis.com/v0/b/sandtable-8d0f7.appspot.com/o/creations%2F";

const Info = () => {
  return (
    <div className="Info">
      <h1>sandspiel </h1>
      <p>
        Created by <a href="https://maxbittker.com">max bittker</a>
      </p>
      <p>
        Welcome, and thanks for coming by! I hope that you enjoy exploring this
        small game, and it brings you some calm.{" "}
      </p>
      <p>
        Growing up, "falling sand" games like this one provided me hours of
        entertainment and imagination. I want to particularly thank ha55ii's{" "}
        <a href="https://dan-ball.jp/en/javagame/dust/">Powder Game</a> as the
        primary inspiration for sandspiel.
      </p>
      <br />
      <p>
        You can follow sandspiel on twitter for updates and new uploads:
        <a href="https://twitter.com/sandspiel_feed">@sandspiel_feed</a>
      </p>
      <br />
      <p>
        If you'd like, you can view the{" "}
        <a href="https://github.com/maxbittker/sandspiel">source code</a> or{" "}
        <a href="https://github.com/maxbittker/sandspiel/issues">report bugs</a>{" "}
        on github
      </p>
      <h2>FAQs</h2>
      <p>(TODO: write some FAQs)</p>
      If you have any other questions, feel free to reach out on twitter and
      I'll try to answer!
      <h2>Element Information:</h2>
      <h4>Wall </h4>
      Indestructible
      <h4>Sand </h4>
      Sinks in water
      <h4>Water </h4>
      Puts out fire
      <h4>Stone </h4>
      Forms arches, folds under pressure
      <h4>Ice </h4>
      Freezes Water, slippery!
      <h4>Gas </h4>
      Highly Flammable!
      <h4>Cloner </h4>
      Copies the first element it touches
      <h4>Mite </h4>
      Eats wood and plant, but loves dust! Slides on ice
      <h4>Wood </h4>
      Sturdy, but biodegradable
      <h4>Plant </h4>
      Thrives in wet enviroments
      <h4>Fungus </h4>
      Spreads over everything
      <h4>Seed </h4>
      Grows in sand
      <h4>Fire </h4>
      Hot!
      <h4>Lava </h4>
      Flammable and heavy
      <h4>Acid </h4>
      Corrodes other elements
      <h4>Dust </h4>
      Pretty, but dangerously explosive
      <h4>Oil </h4>
      Produces smoke
      <h4>Firework </h4>
      Explodes into copies of the first element it touches
    </div>
  );
};

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

const Submissions = ({ submissions, loadSubmission }) => {
  if (submissions.length == 0) {
    return <div style={{ height: "90vh" }}>Loading Submissions...</div>;
  }
  return (
    <div className="submissions">
      {submissions.map(submission => {
        return (
          <div key={submission.id} className="submission">
            <img src={`${storageUrl}${submission.data.id}.png?alt=media`} />
            <div>
              <h3 style={{ flexGrow: 1 }}>{submission.data.title}</h3>
              <h3>♡{submission.data.score}</h3>
              <h4>
                {new Date(submission.data.timestamp).toLocaleDateString()}
              </h4>
              <button
                className="load"
                onClick={() => loadSubmission(submission)}
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
    let initialId = window.location.hash.replace(/#/, "");
    this.state = {
      submissionMenuOpen: false,
      infoOpen: false,
      paused: false,
      submitting: false,
      size: 2,
      dataURL: {},
      submissions: null,
      selectedElement: Species.Water
    };
    if (initialId.length > 0) {
      this.load(initialId);
    }
  }
  togglePause() {
    window.paused = !this.state.paused;
    this.setState({ paused: !this.state.paused });
  }
  play() {
    window.paused = false;
    this.setState({ paused: false });
  }
  pause() {
    window.paused = true;
    this.setState({ paused: true });
  }
  setSize(event, size) {
    event.preventDefault();
    this.setState({
      size
    });
  }
  reset() {
    if (window.confirm("Reset?")) {
      this.play();
      window.location = "#";
      this.setState({ currentSubmission: null });
      reset();
    }
  }
  menu() {
    this.pause();
    this.setState({ submissionMenuOpen: true });
  }
  info() {
    this.pause();
    this.setState({ infoOpen: true });
  }
  closeMenu() {
    this.play();
    this.setState({ submissionMenuOpen: false });
  }
  upload() {
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

    this.pause();
    this.setState({
      data: { dataURL, cells: cellData },
      submissionMenuOpen: true
    });
  }
  submit() {
    let { title, data } = this.state;
    let { dataURL, cells } = data;
    let payload = { title, image: dataURL, cells };
    this.setState({ submitting: true });

    fetch(functions._url("api/creations"), {
      method: "POST", // or 'PUT'
      body: JSON.stringify(payload), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log("Success:", JSON.stringify(response));
        this.play();
      })
      .catch(error => console.error("Error:", error))
      .then(() => {
        this.setState({ submissionMenuOpen: false, submitting: false });
      });
  }
  loadSubmissions(q) {
    this.setState({ submissions: [] });
    fetch(functions._url("api/creations") + `?q=${q}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        this.setState({ submissions: response });
        this.pause();
      })
      .catch(error => {
        this.setState({ submissions: false });
        console.error("Error:", error);
      });
  }
  load(id) {
    window.location = `#${id}`;

    fetch(functions._url(`api/creations/${id}`), {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        storage
          .refFromURL(
            `gs://sandtable-8d0f7.appspot.com/creations/${data.id}.data.png`
          )
          .getDownloadURL()
          .then(dlurl => {
            fetch(dlurl, {
              method: "GET"
            })
              .then(res => res.blob())
              .then(blob => {
                // console.log(response);
                this.setState({ currentSubmission: { id, data } });

                var url = URL.createObjectURL(blob);
                var img = new Image();
                img.src = url;
                img.onload = () => {
                  var canvas = document.createElement("canvas");
                  canvas.width = width;
                  canvas.height = height;
                  var ctx = canvas.getContext("2d");
                  ctx.drawImage(img, 0, 0);
                  var imgData = ctx.getImageData(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                  );

                  const cellsData = new Uint8Array(
                    memory.buffer,
                    universe.cells(),
                    width * height * 4
                  );

                  reset();

                  for (var i = 0; i < width * height * 4; i++) {
                    cellsData[i] = imgData.data[i];
                  }
                  this.pause();
                  this.setState({ submissions: null });
                };
              })
              .catch(error => console.error("Error:", error));
          });
      })
      .catch(error => {
        this.setState({ submissions: false });
        console.error("Error:", error);
      });
  }
  incScore() {
    let { currentSubmission } = this.state;
    let { id } = currentSubmission;
    // creations/:id/vote
    fetch(functions._url(`api/creations/${id}/vote`), {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (currentSubmission != null) {
          console.log(data);
          this.setState({ currentSubmission: { ...currentSubmission, data } });
        }
      });
  }
  render() {
    let { size, paused, selectedElement } = this.state;
    return (
      <React.Fragment>
        <button
          onClick={() => this.togglePause()}
          className={paused ? "selected" : ""}
        >
          {paused ? (
            <svg height="20" width="20" id="d" viewBox="0 0 300 300">
              <polygon id="play" points="0,0 , 300,150 0,300" />
            </svg>
          ) : (
            <svg height="20" width="20" id="d" viewBox="0 0 300 300">
              <polygon id="bar2" points="0,0 110,0 110,300 0,300" />
              <polygon id="bar1" points="190,0 300,0 300,300 190,300" />
            </svg>
          )}
        </button>
        <button onClick={() => this.upload()}>Upload</button>
        <button onClick={() => this.loadSubmissions()}>Browse</button>
        <button onClick={() => this.reset()}>Reset</button>
        <button onClick={() => this.info()}>Info</button>

        {/* {paused && <button onClick={() => universe.tick()}>Tick</button>} */}
        <span className="sizes">
          {sizeMap.map((v, i) => (
            <button
              key={i}
              className={i == size ? "selected" : ""}
              onClick={e => this.setSize(e, i)}
              style={{ padding: "0px" }}
            >
              <svg height="23" width="23" id="d" viewBox="0 0 100 100">
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
        {this.state.currentSubmission && (
          <div className="submission-title">
            <button onClick={() => this.incScore()}>
              +♡{this.state.currentSubmission.data.score}{" "}
            </button>
            {this.state.currentSubmission.data.title}
          </div>
        )}
        {this.state.submissionMenuOpen && (
          <Menu close={() => this.closeMenu()}>
            <h4>Share your creation with the people!</h4>
            <img src={this.state.data.dataURL} />
            <div style={{ display: "flex" }}>
              <input
                placeholder="title"
                onChange={e => this.setState({ title: e.target.value })}
              />
              <button
                disabled={this.state.submitting}
                onClick={() => this.submit()}
              >
                Submit
              </button>
            </div>
          </Menu>
        )}
        {this.state.submissions && (
          <Menu close={() => this.setState({ submissions: null })}>
            <button onClick={() => this.loadSubmissions()}>Recent</button>
            <button onClick={() => this.loadSubmissions("score")}>Top</button>
            <Submissions
              submissions={this.state.submissions}
              loadSubmission={submission => this.load(submission.id)}
            />
          </Menu>
        )}

        {this.state.infoOpen && (
          <Menu close={() => this.setState({ infoOpen: false })}>
            <Info />
          </Menu>
        )}
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
