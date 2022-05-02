import React from "react";

import { Species } from "../../crate/pkg/sandtable";

import { pallette, sprites, spriteSize } from "../render.js";

window.species = Species;
let pallette_data = pallette();

let spriteImages = sprites();

const ElementButton = ({ name, selectedElement, setSelected }) => {
  let elementID = Species[name];
  if (name === "Wind") {
    elementID = -1;
  }

  let selected = elementID == selectedElement;

  return (
    <button
      className={selected ? "ebutton selected" : "ebutton"}
      key={name}
      onClick={() => {
        setSelected(elementID);
      }}
      style={{}}
    >
      <img style={{}} src={spriteImages[parseInt(elementID)]} />
      {"  "}
      {name}
      {"  "}
    </button>
  );
};

const ElementButtons = ({ selectedElement, setSelected }) => {
  return (
    <div className="pallette">
      {Object.keys(Species)
        .filter((x) => !Number.isInteger(Number.parseInt(x)))
        .map((n) =>
          ElementButton({
            name: n,
            selectedElement,
            setSelected: (e) => {
              window.u.set_stamp_state(0);
              setSelected(e);
            },
          })
        )}
      {/* <ElementButton
        name={"Wind"}
        selectedElement={selectedElement}
        setSelected={() => setSelected(-1)}
      /> */}
      <button
        className={-1 == selectedElement ? "selected" : ""}
        key={name}
        onClick={() => {
          console.log(window.u.stamp_state());
          window.u.set_stamp_state(1);

          window.setTimeout(() => {
            setSelected(-1);
          }, 10);
        }}
      >
        Stamp
        {window.u?.stamp_state() === 1 && "GRAB AREA"}
        {window.u?.stamp_state() === 2 && "READY!"}
      </button>
    </div>
  );
};

export default ElementButtons;
