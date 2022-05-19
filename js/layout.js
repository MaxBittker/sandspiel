const canvas = document.getElementById("sand-canvas");
const canvas2 = document.getElementById("fluid-canvas");
const ui = document.getElementById("ui");

let resize = () => {
  let screen_width = window.innerWidth;
  let uiheight = 50;
  let screen_height = window.innerHeight - uiheight;

  let canvasStyle = "";
  let uiStyle = "";
  let adStyle = "display:none;";

  if (screen_width > screen_height) {
    if (screen_width - window.innerHeight < 400) {
      // landscape compressed
      canvasStyle = `height: ${window.innerHeight}px; margin:3px`;
      uiStyle = `width: ${
        screen_width - window.innerHeight - 12
      }px; margin: 2px;`;
    } else {
      // landscape wide
      canvasStyle = `
       height: ${window.innerHeight}px;
       width:${window.innerHeight}px;
       margin:0;
       left: auto;
       right: 206px`;
      uiStyle = `width: 200px; margin: 2px;`;
      adStyle = `width: ${
        screen_width - window.innerHeight - (206 + 150)
      }px; margin: 1px;`;
    }
  } else {
    //portrait (mobile)
    canvasStyle = `width: ${screen_width}px; bottom:3px;`;
    uiStyle = "";
  }
  ui.style = uiStyle;
  canvas.style = canvasStyle;
  canvas2.style = canvasStyle;
  document.getElementsByClassName("adslot_1")[0].style = adStyle;
  let btnHeight = ui.getBoundingClientRect().height;
  document.getElementById("PullTab").style.top = btnHeight + "px";
};

resize();
window.addEventListener("deviceorientation", resize, true);
window.addEventListener("resize", resize);
