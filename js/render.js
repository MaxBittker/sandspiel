const reglBuilder = require("regl");
import { memory } from "../crate/pkg/sandtable_bg";

let fsh = require("./glsl/sand.glsl");
let vsh = require("./glsl/sandVertex.glsl");

let startWebGL = ({ canvas, universe }) => {
  const regl = reglBuilder({ canvas });
  const lastFrame = regl.texture();
  const cellsPtr = universe.cells();
  const width = universe.width();
  const height = universe.height();
  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height * 4);
  const dataTexture = regl.texture({ width, height, data: cells });

  let drawTriangle = regl({
    frag: fsh,
    uniforms: {
      t: ({ tick }) => tick,
      data: () => dataTexture({ width, height, data: cells }),
      resolution: ({ viewportWidth, viewportHeight }) => [
        viewportWidth,
        viewportHeight
      ],
      dpi: window.devicePixelRatio * 2,
      backBuffer: lastFrame
    },

    vert: vsh,
    attributes: {
      // Full screen triangle
      position: [[-1, 4], [-1, -1], [4, -1]]
    },
    // Our triangle has 3 vertices
    count: 3
  });

  regl.frame(function(context) {
    regl.clear({ color: [0, 0, 0, 0] });
    drawTriangle();
    lastFrame({ copy: true });
  });
};

export { startWebGL, universe };
