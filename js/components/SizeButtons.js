import React from "react";
let sizeMap = [1, 3, 7, 19, 39];

const SizeButtons = ({ size, setSize }) => {
  return (
    <span className="sizes">
      {sizeMap.map((v, i) => (
        <button
          key={i}
          className={i == size ? "selected" : ""}
          onClick={(e) => setSize(e, i)}
          style={{
            padding: "0px",
            marginLeft: -1,
            marginRight: 0,

            borderTopRightRadius: i < sizeMap.length - 1 ? 0 : "",
            borderBottomRightRadius: i < sizeMap.length - 1 ? 0 : "",
            borderTopLeftRadius: i > 0 ? 0 : "",
            borderBottomLeftRadius: i > 0 ? 0 : ""
          }}
        >
          <svg height="23" width="23" id="d" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r={3 + v} />
          </svg>
        </button>
      ))}
    </span>
  );
};

export default SizeButtons;
export { sizeMap };
