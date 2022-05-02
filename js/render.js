const reglBuilder = require("regl");
import { memory } from "../crate/pkg/sandtable_bg";
import { Species } from "../crate/pkg/sandtable";
import { Universe } from "../crate/pkg";

let fsh = require("./glsl/sand.glsl");
let vsh = require("./glsl/sandVertex.glsl");

let startWebGL = ({ canvas, universe, isSnapshot = false }) => {
  const regl = reglBuilder({
    canvas,
    attributes: { preserveDrawingBuffer: isSnapshot },
  });
  // const lastFrame = regl.texture();
  const width = universe.width();
  const height = universe.height();
  let cell_pointer = universe.cells();
  let cells = new Uint8Array(memory.buffer, cell_pointer, width * height * 4);
  const dataTexture = regl.texture({ width, height, data: cells });

  let preview_pointer = universe.preview();
  let preview = new Uint8Array(
    memory.buffer,
    preview_pointer,
    width * height * 4
  );
  const dataTexture2 = regl.texture({ width, height, data: preview });

  let drawSand = regl({
    frag: fsh,
    uniforms: {
      t: ({ tick }) => tick,
      data: () => {
        // if (cell_pointer != universe.cells()) {
        //   console.log(cell_pointer);
        // }
        cell_pointer = universe.cells();
        cells = new Uint8Array(memory.buffer, cell_pointer, width * height * 4);
        // }

        return dataTexture({ width, height, data: cells });
      },
      previewData: () => {
        let preview_pointer = universe.preview();
        let preview = new Uint8Array(
          memory.buffer,
          preview_pointer,
          width * height * 4
        );

        return dataTexture2({ width, height, data: preview });
      },
      resolution: ({ viewportWidth, viewportHeight }) => [
        viewportWidth,
        viewportHeight,
      ],
      dpi: window.devicePixelRatio * 2,
      isSnapshot,
      // backBuffer: lastFrame
    },

    vert: vsh,
    attributes: {
      // Full screen triangle
      position: [
        [-1, 4],
        [-1, -1],
        [4, -1],
      ],
    },
    // Our triangle has 3 vertices
    count: 3,
  });

  return () => {
    regl.poll();
    drawSand();
  };
};

let snapshot = (universe) => {
  let canvas = document.createElement("canvas");
  canvas.width = universe.width() / 2;
  canvas.height = universe.height() / 2;
  let render = startWebGL({ universe, canvas, isSnapshot: true });
  render();

  return canvas.toDataURL("image/png");
};
export const spriteSize = 29;
let sprites = () => {
  let canvas = document.createElement("canvas");
  // window.document.body.appendChild(canvas);
  let species = Object.values(Species).filter((x) => Number.isInteger(x));
  let range = Math.max(...species) + 1;
  let size = spriteSize;
  let universe = Universe.new(range * size, size * range);
  canvas.width = size * range;
  canvas.height = range * size;
  canvas.style = `
  
  position: absolute;
  z-index: 300;`;
  universe.reset();

  species.forEach((id) =>
    universe.paint(Math.floor((id + 0.5) * size), size / 2, size * 0.6, id)
  );

  let render = startWebGL({ universe, canvas, isSnapshot: false });
  render();
  let camera = document.createElement("canvas");
  camera.width = size;
  camera.height = size;
  let cameraCtx = camera.getContext("2d");

  let sprites = {};

  sprites[-1] = camera.toDataURL("image/png");
  species.forEach((id) => {
    let x = Math.floor(id * size);
    cameraCtx.drawImage(canvas, x, 0, size, size, 0, 0, size, size);
    sprites[id] = camera.toDataURL("image/png");
  });
  return sprites;
};

sprites();
let pallette = () => {
  let canvas = document.createElement("canvas");

  let species = Object.values(Species).filter((x) => Number.isInteger(x));
  let range = Math.max(...species) + 1;
  let universe = Universe.new(range, 1);
  canvas.width = 3;
  canvas.height = range;
  universe.reset();

  species.forEach((id) => universe.paint(id, 0, 1, id));

  let render = startWebGL({ universe, canvas, isSnapshot: true });
  render();
  let ctx = canvas.getContext("webgl");
  let data = new Uint8Array(range * 4);
  ctx.readPixels(0, 0, 1, range, ctx.RGBA, ctx.UNSIGNED_BYTE, data);
  let colors = {};
  species.forEach((id) => {
    let index = (range - 1 - id) * 4;
    let color = `rgba(${data[index]},${data[index + 1]}, ${
      data[index + 2]
    }, 0.25)`;
    colors[id] = color;
  });
  return colors;
};

export { startWebGL, snapshot, pallette, sprites };
