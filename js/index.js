import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";
import { Wasm as WasmIntegration } from "@sentry/wasm";
import { boot } from "./boot";
if (!window.location.host.startsWith("localhost")) {
  Sentry.init({
    dsn: "https://4bf8c3ab764f40569d573fc4021efe40@o40136.ingest.sentry.io/1331284",

    // Alternatively, use `process.env.npm_package_version` for a dynamic release version
    // if your build tool supports it.
    integrations: [new Integrations.BrowserTracing(), new WasmIntegration()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 0.01,
  });
}

import "./api";
import { Universe } from "../crate/pkg";

import { startWebGL } from "./render";
import { fps } from "./fps";
import {} from "./paint";
import {} from "./app";
import { startFluid } from "./fluid";
import {} from "./layout";

const isBench = window.location.pathname === "/bench";
if (window.safari) {
  history.pushState(null, null, location.href);
  window.onpopstate = function (event) {
    history.go(1);
  };
}

function mobileAndTabletcheck() {
  var check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

if (mobileAndTabletcheck()) {
  window.onbeforeunload = function () {
    return true;
  };
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
        fetch("index.html"); // refresh cache (?)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

let n = 300;
const universe = isBench ? window.u : Universe.new(n, n);

let width = n;
let height = n;
const canvas = document.getElementById("sand-canvas");
const canvas2 = document.getElementById("fluid-canvas");

canvas.height = n * Math.ceil(window.devicePixelRatio);
canvas.width = n * Math.ceil(window.devicePixelRatio);

document.getElementById("background").addEventListener("touchmove", (e) => {
  if (!window.paused) {
    if (e.cancelable) {
      e.preventDefault();
    }
  }
});

let fluid;
let drawSand;
if (!isBench) {
  fluid = startFluid({ universe });
  drawSand = startWebGL({ canvas, universe });
} else {
  fluid = window.f;
  drawSand = window.r;
}
const renderLoop = () => {
  if (!window.paused) {
    fps.render(); // new
    universe.tick();
    fluid.update();
  }
  drawSand();

  window.animationId = requestAnimationFrame(renderLoop);
};
renderLoop();
window.u = universe;

if (!isBench) {
  boot(width, height);
}

function reset() {
  fluid.reset();
  fluid.update();
  fluid.reset();
  fluid.update();

  universe.reset();
}

document.addEventListener("keydown", function (event) {
  if ((event.ctrlKey || event.metaKey) && event.key === "z") {
    reset();
    universe.pop_undo();
  }
});

document.addEventListener("paste", function (event) {
  const text = event.clipboardData.getData("text/plain");
  if (text.includes("<svg")) {
    event.preventDefault();
    window.UI.loadSVG(text);
  }
});

(adsbygoogle = window.adsbygoogle || []).push({});
export { canvas, width, height, universe, reset };
