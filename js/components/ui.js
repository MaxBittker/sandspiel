import React from "react";
import { Link } from "react-router-dom";
import * as Sentry from "@sentry/browser";

import { memory } from "../../crate/pkg/sandtable_bg";
import { Species } from "../../crate/pkg/sandtable";

import { height, universe, width, reset } from "../index.js";
import { snapshot, pallette } from "../render.js";
import { functions, storage } from "../api.js";
import SignInButton from "./signinButton.js";
import Promotab from "./promotab";
import { svgToImageData, rgbaToSpecies } from "../convertSVG";

import Menu from "./menu";

window.species = Species;
let pallette_data = pallette();

const ElementButton = (name, selectedElement, setElement) => {
  let elementID = Species[name];

  let color = pallette_data[elementID];
  let selected = elementID == selectedElement;

  let background = "inherit";
  if (elementID == 14) {
    background = `linear-gradient(45deg, 
    rgba(202, 121, 125, 0.25), 
    rgba(169, 120, 200, 0.25), 
    rgba(117, 118, 195, 0.25), 
    rgba(117, 196, 193, 0.25), 
    rgba(122, 203, 168, 0.25), 
    rgba(185, 195, 117, 0.25), 
    rgba(204, 186, 122, 0.25))`;
    if (selected) {
      background = background.replace(/0.25/g, "1.0");
    }
  }
  return (
    <button
      className={selected ? "selected" : ""}
      key={name}
      onClick={() => {
        setElement(elementID);
      }}
      style={{
        background,
        backgroundColor: selected ? color.replace("0.25", "1.5") : color,
      }}
    >
      {"  "}
      {name}
      {"  "}
    </button>
  );
};

let sizeMap = [1, 3, 7, 19, 39];

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submissionMenuOpen: false,
      paused: false,
      submitting: false,
      size: 2,
      dataURL: {},
      currentSubmission: null,
      selectedElement: Species.Water,
    };
    window.UI = this;
    //if we start in the background, pause;
    if (
      this.props.location.pathname !== "/" &&
      this.props.location.pathname !== "/school"
    ) {
      window.setTimeout(() => this.pause(), 50);
    }

    this.load();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.location.pathname === "/" &&
      prevProps.location.pathname !== "/" &&
      this.state.currentSubmission
    ) {
      window.location = `#${this.state.currentSubmission.id}`;
      return;
    }
    if (
      this.props.location.pathname !== "/" &&
      prevProps.location.pathname == "/"
    ) {
      this.pause();
    }
    if (
      prevProps.location.hash === "" ||
      prevProps.location.hash != this.props.location.hash
    ) {
      this.load();
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
      size,
    });
  }
  reset() {
    if (window.confirm("Are you sure you want to reset?")) {
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
    // transpose for historical compatability
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let cell_index = (y + x * height) * 4;
        let img_index = (x + y * width) * 4;
        for (var i = 0; i < 4; i++) {
          if (i % 4 == 3) {
            imgData.data[img_index + i] = 255;
          } else {
            imgData.data[img_index + i] = cells[cell_index + i];
          }
        }
      }
    }
    // put data to context at (0, 0)
    context.putImageData(imgData, 0, 0);

    let cellData = canvas.toDataURL("image/png");

    this.pause();
    this.setState({
      data: { dataURL, cells: cellData },
      submissionMenuOpen: true,
    });
  }
  rateLimited() {
    var postList = JSON.parse(localStorage.getItem("postList") || "[]");
    postList = postList.filter((post) => Date.now() - 1000 * 60 * 5 < post);

    if (postList.length >= 3) {
      Sentry.captureMessage("RATELIMIT");
      return true;
    }
    return false;
  }
  submit() {
    let { title, data, currentSubmission } = this.state;

    let { dataURL, cells } = data;
    let { currentUser } = firebase.auth();
    title = title.replace(
      "[profile]",
      `https://sandspiel.club/browse/search/?user=${currentUser.uid}`
    );

    let payload = {
      title,
      image: dataURL,
      parent_id: currentSubmission?.data?.id,
      cells,
    };

    var postList = JSON.parse(localStorage.getItem("postList") || "[]");

    postList = postList.filter((post) => Date.now() - 1000 * 60 * 3 < post);
    postList.push(Date.now());
    localStorage.setItem("postList", JSON.stringify(postList));

    this.setState({ submitting: true });
    currentUser.getIdToken().then((token) => {
      fetch(functions._url("api/creations"), {
        method: "POST",
        body: JSON.stringify(payload), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((response) => {
          console.log("Success:", JSON.stringify(response));
          this.play();
        })
        .catch((error) => console.error("Error:", error))
        .then(() => {
          this.setState({ submissionMenuOpen: false, submitting: false });
        });
    });
  }

  async loadSVG(svgString) {
    const imgData = await svgToImageData(svgString);

    const cellsData = new Uint8Array(
      memory.buffer,
      universe.cells(),
      width * height * 4
    );

    reset();
    window.stopboot = true;

    for (let i = 0, len = width * height * 4; i < len; i += 4) {
      const species = rgbaToSpecies(
        imgData.data[i],
        imgData.data[i + 1],
        imgData.data[i + 2],
        imgData.data[i + 3]
      );
      cellsData[i] = species; // should be 0 to 19
      cellsData[i + 1] = Math.floor(100 + Math.random() * 50); // register A
      cellsData[i + 2] = 0; // register B
      cellsData[i + 3] = 0; // clock
    }
    universe.flush_undos();
    universe.push_undo();

    this.pause();
  }

  load() {
    let { location } = this.props;
    let id = location.hash.replace(/#/, "");
    if (id === "") {
      return;
    }

    if (this.state.currentSubmission && this.state.currentSubmission.id == id) {
      return;
    }

    fetch(functions._url(`api/creations/${id}`), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        storage
          .refFromURL(
            `gs://sandtable-8d0f7.appspot.com/creations/${data.id}.data.png`
          )
          .getDownloadURL()
          .then((dlurl) => {
            fetch(dlurl, {
              method: "GET",
            })
              .then((res) => res.blob())
              .then((blob) => {
                this.setState({ currentSubmission: { id, data } });

                var url = URL.createObjectURL(blob);
                var img = new Image();
                img.src = url;
                img.onload = () => {
                  var canvas = document.createElement("canvas");
                  canvas.width = width;
                  canvas.height = height;
                  var ctx = canvas.getContext("2d");

                  ctx.translate(canvas.width / 2, canvas.height / 2);
                  ctx.rotate((-90 * Math.PI) / 180);
                  ctx.scale(-1, 1.0);
                  ctx.translate(-canvas.width / 2, -canvas.height / 2);

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
                  window.stopboot = true;

                  for (var i = 0; i < width * height * 4; i++) {
                    cellsData[i] = imgData.data[i];
                  }
                  universe.flush_undos();
                  universe.push_undo();
                  this.pause();
                };
              })
              .catch((error) => console.error("Error:", error));
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  incScore() {
    let { currentSubmission } = this.state;
    let { id } = currentSubmission;
    // creations/:id/vote
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) => {
        fetch(functions._url(`api/creations/${id}/vote`), {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (currentSubmission != null) {
              this.setState({
                currentSubmission: { ...currentSubmission, data },
              });
            }
          })
          .catch((e) => {
            console.error(e);
          });
      });
  }

  render() {
    let { size, paused, selectedElement, currentSubmission } = this.state;
    let hash =
      currentSubmission && currentSubmission.id
        ? `#${currentSubmission.id}`
        : "";
    return (
      <React.Fragment>
        <Promotab />
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

        {!window.location.pathname.includes("school") && (
          <>
            <button onClick={() => this.upload()}>Upload</button>
            <Link
              to={{
                pathname: "/browse/",
                hash,
              }}
            >
              <button>Browse</button>
            </Link>
          </>
        )}

        <button onClick={() => this.reset()}>Reset</button>
        <Link
          to={{
            pathname: "/info/",
            hash,
          }}
        >
          <button>Info</button>
        </Link>

        {/* {paused && <button onClick={() => universe.tick()}>Tick</button>} */}
        <span className="sizes">
          {sizeMap.map((v, i) => (
            <button
              key={i}
              className={i == size ? "selected" : ""}
              onClick={(e) => this.setSize(e, i)}
              style={{ padding: "0px" }}
            >
              <svg height="23" width="23" id="d" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r={3 + v} />
              </svg>
            </button>
          ))}
        </span>
        <button
          onClick={() => {
            reset();
            universe.pop_undo();
          }}
          style={{ fontSize: 35 }}
        >
          ↜
        </button>
        <button
          className={-1 == selectedElement ? "selected" : ""}
          key={name}
          onClick={() => {
            this.setState({ selectedElement: -1 });
          }}
        >
          Wind
        </button>
        {Object.keys(Species)
          .filter((x) => !Number.isInteger(Number.parseInt(x)))
          .map((n) =>
            ElementButton(n, selectedElement, (id) =>
              this.setState({ selectedElement: id })
            )
          )}
        {/* <span className="promo">
          *new*{" "}
          <a href="https://orb.farm" target="_blank">
            orb.farm
          </a>
        </span> */}
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
            <h4>Share your creation with the people! (try using #hashtags)</h4>
            <p>
              Please be nice. Users who post hateful or sexually explicit
              content will be banned.
            </p>
            <img src={this.state.data.dataURL} className="submissionImg" />
            <SignInButton>
              <div style={{ display: "flex" }}>
                <input
                  maxlength="200"
                  placeholder="Title"
                  onChange={(e) => this.setState({ title: e.target.value })}
                />
                <button
                  disabled={this.state.submitting || this.rateLimited()}
                  onClick={() => this.submit()}
                >
                  Submit
                </button>
              </div>
            </SignInButton>
          </Menu>
        )}
      </React.Fragment>
    );
  }
}

export { sizeMap, Index };
