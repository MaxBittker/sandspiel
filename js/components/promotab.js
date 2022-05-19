import React, { useState } from "react";
// import "./styles.css";

export default function PullTab() {
  let [open, setOpen] = useState("");
  return (
    <div id="PullTabContent" className={open}>
      <img
        id="logo"
        src="assets/SSStudio ColorLined Big.svg"
        alt="SANDSPIEL STUDIO"
      />
      <p>
        {" "}
        Explore infinite new elements and create your own worlds in Sandspiel
        Studio™, releasing this summer!
      </p>
      {/* <br></br>
      <a href="example.com" className="discord">
        <img className="arrow-icon" src="assets/arrow.png"></img> Early access
        discord server!
        <img className="price-icon" src="assets/price.png"></img>
      </a> */}
      {/* <img className="arrow-icon reversed" src="assets/arrow.png"></img> */}
      {/* <br></br> */}

      <br></br>
      <span>Sign up for updates:</span>
      <iframe
        width="100%"
        height="300px"
        style={{ overflow: "hidden", border: "none", marginTop: -30 }}
        src="https://cdn.forms-content.sg-form.com/a073cf1c-d71c-11ec-9afb-3ada83737b45"
      />

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
