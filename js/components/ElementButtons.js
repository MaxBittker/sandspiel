import React from "react";

import { Species } from "../../crate/pkg/sandtable";

import { pallette, spriteSize } from "../render.js";

window.species = Species;
let pallette_data = pallette();

const ElementButton = ({ name, selectedElement, setSelected }) => {
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
      className={selected ? "ebutton selected" : "ebutton"}
      key={name}
      onClick={() => {
        setSelected(elementID);
      }}
      style={
        {
          // border: "none"
          // background,
          // backgroundColor: selected ? color.replace("0.25", "1.5") : color
        }
      }
    >
      <img
        style={{
          objectFit: "none",
          zoom: 1.5,
          objectPosition: `${(parseInt(elementID) - 1) * -spriteSize}px 0px`,
          width: spriteSize,
          height: spriteSize
        }}
        src={window.sprites}
      />
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
