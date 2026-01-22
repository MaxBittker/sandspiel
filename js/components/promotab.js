import React, { useState } from "react";

export default function PullTab() {
  let [open, setOpen] = useState("");
  return (
    <div id="PullTabContent" className={open}>
      <a href="https://apps.apple.com/app/id6757886943" target="_blank">
        <img src="assets/App_Store_Badge.svg.png" alt="Download on the App Store" className="app-store-badge" />
      </a>
      <p>
        See also: <br></br>
        <a href="https://studio.sandspiel.club/" target="_blank">
          Sandspiel Studio
        </a>
        <br></br>
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
