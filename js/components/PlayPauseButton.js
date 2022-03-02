import React from "react";

const PlayPause = ({ paused, togglePause }) => {
  return (
    <button
      onClick={togglePause}
      className={paused ? "selected pauseButton" : "pauseButton"}
    >
      {paused ? (
        <>
          <svg
            width="12"
            height="15"
            viewBox="0 0 12 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 14.5V3.5H3.5V4.5H5V5.5H6.5V6.5H8V7.5H9.5V8.5H10.5V9.5H9.5V10.5H8V11.5H6.5V12.5H5V13.5H3.5V14.5H2Z"
              fill="white"
            />
          </svg>
          Play&nbsp;&nbsp;&nbsp;
        </>
      ) : (
        <>
          <svg height="15" width="12" id="d" viewBox="0 -50 300 300">
            <polygon id="bar2" points="0,0 80,0 80,300 0,300" />
            <polygon id="bar1" points="190,0 270,0 270,300 190,300" />
          </svg>
          Pause
        </>
      )}
    </button>
  );
};

export default PlayPause;
