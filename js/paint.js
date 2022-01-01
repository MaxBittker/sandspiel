import { height, universe, width } from "./index.js";
import { sizeMap } from "./components/ui";
const canvas = document.getElementById("sand-canvas");

const eventDistance = (a, b) => {
  return Math.sqrt(
    Math.pow(a.clientX - b.clientX, 2) + Math.pow(a.clientY - b.clientY, 2),
    2
  );
};

const magnitude = (a) => {
  return Math.sqrt(Math.pow(a.clientX, 2) + Math.pow(a.clientY, 2), 2);
};

const norm = (a) => {
  let mag = magnitude(a);
  return { clientX: a.clientX / mag, clientY: a.clientY / mag };
};
const scale = (a, s) => {
  return { clientX: a.clientX * s, clientY: a.clientY * s };
};
const add = (a, b) => {
  return { clientX: a.clientX + b.clientX, clientY: a.clientY + b.clientY };
};
const sub = (a, b) => {
  return { clientX: a.clientX - b.clientX, clientY: a.clientY - b.clientY };
};

let painting = false;
let lastPaint = null;
let repeat = null;

canvas.addEventListener("mousedown", (event) => {
  event.preventDefault();
  universe.push_undo();
  painting = true;
  clearInterval(repeat);
  repeat = window.setInterval(() => paint(event), 100);
  paint(event);
  lastPaint = event;
});

document.body.addEventListener("mouseup", (event) => {
  clearInterval(repeat);
  if (painting) {
    event.preventDefault();
    lastPaint = null;
    painting = false;
  }
});

canvas.addEventListener("mousemove", (event) => {
  clearInterval(repeat);
  smoothPaint(event);
});

canvas.addEventListener("mouseleave", (event) => {
  clearInterval(repeat);
  lastPaint = null;
});

canvas.addEventListener("touchstart", (event) => {
  universe.push_undo();
  if (event.cancelable) {
    event.preventDefault();
  }
  painting = true;
  lastPaint = event;
  handleTouches(event);
});

canvas.addEventListener("touchend", (event) => {
  if (event.cancelable) {
    event.preventDefault();
  }
  lastPaint = null;
  painting = false;
  clearInterval(repeat);
});

canvas.addEventListener("touchmove", (event) => {
  if (!window.paused) {
    if (event.cancelable) {
      event.preventDefault();
    }
  }
  clearInterval(repeat);
  handleTouches(event);
});

function smoothPaint(event) {
  clearInterval(repeat);
  repeat = window.setInterval(() => paint(event), 100);
  let startEvent = { clientX: event.clientX, clientY: event.clientY };
  if (!painting) {
    return;
  }
  let size = sizeMap[window.UI.state.size];
  let i = 0;
  let step = Math.max(size / 5, 1);
  if (lastPaint) {
    while (eventDistance(startEvent, lastPaint) > step) {
      let d = eventDistance(startEvent, lastPaint);
      lastPaint = add(
        lastPaint,
        scale(norm(sub(lastPaint, event)), -Math.min(step, d))
      );
      i++;
      if (i > 1000) {
        break;
      }
      paint(lastPaint);
    }
  }
  paint(startEvent);

  lastPaint = event;
}

const handleTouches = (event) => {
  let touches = Array.from(event.touches);
  if (touches.length == 1) {
    smoothPaint(touches[0]);
  } else {
    touches.forEach(paint);
  }
};

const paint = (event) => {
  if (!painting) {
    return;
  }
  const boundingRect = canvas.getBoundingClientRect();

  const scaleX =
    canvas.width / Math.ceil(window.devicePixelRatio) / boundingRect.width;
  const scaleY =
    canvas.height / Math.ceil(window.devicePixelRatio) / boundingRect.height;

  const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
  const canvasTop = (event.clientY - boundingRect.top) * scaleY;

  const x = Math.min(Math.floor(canvasLeft), width - 1);
  const y = Math.min(Math.floor(canvasTop), height - 1);
  if (window.UI.state.selectedElement < 0) return;
  universe.paint(
    x,
    y,
    sizeMap[window.UI.state.size],
    window.UI.state.selectedElement
  );
};
