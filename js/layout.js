export const getLayout = () => {
  let screen_width = window.innerWidth;
  let uiheight = 50;
  let screen_height = window.innerHeight - uiheight;

  let layout = "";
  if (screen_width > screen_height) {
    layout = "landscape";
  } else {
    layout = "portrait";
  }
  return layout;
};
export const resize = () => {
  const canvas = document.getElementById("sand-canvas");
  const canvases = document.getElementById("canvases");
  const canvas2 = document.getElementById("fluid-canvas");
  const ui = document.getElementById("ui");
  const topBar = document.getElementById("topBar");

  let screen_width = window.innerWidth;
  let uiheight = 50;
  let screen_height = window.innerHeight - uiheight;

  let canvasStyle = "";
  let uiStyle = "";
  let topBarStyle = "";
  let bottomBarStyle = "";
  let adStyle = "display:none;";
  let layout = "";
  if (screen_width > screen_height) {
    layout = "landscape";

    if (screen_width - window.innerHeight < 400) {
      // landscape compressed
      canvasStyle = `right:0;
      width: ${window.innerHeight}px;
      height: ${window.innerHeight - 4}px;
       margin:2px`;
      uiStyle = `width: ${screen_width - window.innerHeight - 24}px;
      height: ${window.innerHeight - 4}px;
       margin: 4px; position: absolute`;
    } else {
      // landscape wide
      canvasStyle = `
       height: ${window.innerHeight}px;
       width:${window.innerHeight}px;
       margin:0;
       right: auto;
       left: 206px`;
      uiStyle = `width: 210px; top:0; right:2px`;
      adStyle = `
      right:4px;
      top: 0px;
      width: ${screen_width - window.innerHeight - 250}px;
      height: calc(100vh - 8px) ;
      margin: 0px;
      // background-color: yellow;`;
    }
  } else {
    //portrait (mobile)
    canvasStyle = `width: ${screen_width}px; height: ${screen_width}px; top:40px;`;
    topBarStyle = "top:0; position: fixed; ";
    bottomBarStyle = `top:${screen_width + 46}px; position: fixed; `;
    uiStyle = "bottom:4px; position: absolute;";
    layout = "portrait";
  }
  ui.style = uiStyle;
  topBar.style = topBarStyle;
  bottomBar.style = bottomBarStyle;
  canvases.style = canvasStyle;
  window.layout = layout;
  ui.className = layout;
  // canvas.style = canvasStyle;
  // canvas2.style = canvasStyle;
  document.getElementsByClassName("adslot_1")[0].style = adStyle;
};

window.addEventListener("deviceorientation", resize, true);
window.addEventListener("resize", resize);
