const reglBuilder = require("regl");
import { memory } from "../crate/pkg/sandtable_bg";

let fsh = require("./glsl/sand.glsl");
let vsh = require("./glsl/sandVertex.glsl");

let startWebGL = ({ canvas, universe, isSnapshot = false }) => {
  const regl = reglBuilder({
    canvas,
    attributes: { preserveDrawingBuffer: isSnapshot }
  });
  // const lastFrame = regl.texture();
  const width = universe.width();
  const height = universe.height();
  const cells = new Uint8Array(
    memory.buffer,
    universe.cells(),
    width * height * 4
  );
  const dataTexture = regl.texture({ width, height, data: cells });

  let drawSand = regl({
    frag: fsh,
    uniforms: {
      t: ({ tick }) => tick,
      data: () => dataTexture({ width, height, data: cells }),
      resolution: ({ viewportWidth, viewportHeight }) => [
        viewportWidth,
        viewportHeight
      ],
      dpi: window.devicePixelRatio * 2,
      isSnapshot
      // backBuffer: lastFrame
    },

    vert: vsh,
    attributes: {
      // Full screen triangle
      position: [[-1, 4], [-1, -1], [4, -1]]
    },
    // Our triangle has 3 vertices
    count: 3
  });

  return () => {
    regl.poll();
    drawSand();
  };
};

let snapshot = (universe, cb) => {
  let canvas = document.createElement("canvas");
  canvas.width = universe.width() / 2;
  canvas.height = universe.height() / 2;
  let render = startWebGL({ universe, canvas, isSnapshot: true });
  render();

  return canvas.toDataURL("image/png");
};

export { startWebGL, universe, snapshot };
