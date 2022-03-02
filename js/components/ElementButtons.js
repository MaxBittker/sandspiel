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
        .map((n) => ElementButton({ name: n, selectedElement, setSelected }))}
      <ElementButton
        name={"Wind"}
        selectedElement={selectedElement}
        setSelected={() => setSelected(-1)}
      />
    </div>
  );
};

export default ElementButtons;
