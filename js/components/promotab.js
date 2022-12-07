import React, { useState } from "react";
// import "./styles.css";
import YouTube from "react-youtube";

export default function PullTab() {
  let [open, setOpen] = useState("");
  return (
    <div id="PullTabContent" className={open}>
      {/* <img
        id="logo"
        src="assets/SSStudio ColorLined Big.svg"
        alt="SANDSPIEL STUDIO"
      /> */}
      <YouTube
        videoId="ecCVor7mJ6o"
        opts={{
          height: "255",
          width: "455",
          playerVars: {
            // https://developers.google.com/youtube/player_parameters
          },
        }}
      />{" "}
      Explore infinite new elements and create your own worlds in Sandspiel
      Studio!
      <a className="CTA" href="https://studio.sandspiel.club/">
        {" "}
        Try Sandspiel Studio
      </a>
      <br></br>
      <p>
        See also:{" "}
        <a href="https://orb.farm" target="_blank">
          orb.farm
        </a>
        <img src="https://orb.farm/assets/favicon.ico" className="link-icon" />
      </p>
      <div
        id="PullTab"
        onClick={() => {
          if (open == "open") {
            setOpen("dismissed");
          } else {
            setOpen("open");
          }
        }}
      >
        <img src="assets/tab.png"></img>
      </div>
    </div>
  );
}
