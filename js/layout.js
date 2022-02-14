const canvas = document.getElementById("sand-canvas");
const canvases = document.getElementById("canvases");
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
      canvasStyle = `right:0;
      width: ${window.innerHeight}px;
      height: ${window.innerHeight}px;
       margin:2px`;
      uiStyle = `width: ${
        screen_width - window.innerHeight - 24
      }px; margin: 4px; position: absolute`;
    } else {
      // landscape wide
      canvasStyle = `
       height: ${window.innerHeight}px;
       width:${window.innerHeight}px;
       margin:0;
       right: auto;
       left: 206px`;
      uiStyle = `width: 200px;  right:2px`;
      adStyle = `width: ${
        screen_width - window.innerHeight - (206 + 150)
      }px; margin: 1px;`;
    }
  } else {
    //portrait (mobile)
    canvasStyle = `width: ${screen_width}px; height: ${screen_width}px; top:40px;`;
    uiStyle = "bottom:0; position: absolute;";
  }
  ui.style = uiStyle;
  canvases.style = canvasStyle;
  // canvas.style = canvasStyle;
  // canvas2.style = canvasStyle;
  document.getElementsByClassName("adslot_1")[0].style = adStyle;
};

resize();
window.addEventListener("deviceorientation", resize, true);
window.addEventListener("resize", resize);
