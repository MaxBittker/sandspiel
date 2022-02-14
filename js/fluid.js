// MIT License

// Copyright (c) 2017 Pavel Dobryakov

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
"use strict";
import * as dat from "dat.gui";
import { memory } from "../crate/pkg/sandtable_bg";
import { compileShaders } from "./fluidShaders";
const canvas = document.getElementById("fluid-canvas");
const sandCanvas = document.getElementById("sand-canvas");

let fluidColor = [1, 1, 0.8];
function iOS() {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
}

const isIOS = iOS();
function startFluid({ universe }) {
  canvas.width = universe.width();
  canvas.height = universe.height();
  let config = {
    TEXTURE_DOWNSAMPLE: 0,
    DENSITY_DISSIPATION: 0.98,
    VELOCITY_DISSIPATION: 0.99,
    PRESSURE_DISSIPATION: 0.8,
    PRESSURE_ITERATIONS: 25,
    CURL: 15,
    SPLAT_RADIUS: 0.005,
  };

  let pointers = [];
  let splatStack = [];
  let isWebGL2;

  const { gl, ext } = getWebGLContext(canvas);
  let {
    baseVertexShader,
    clearShader,
    displayShader,
    splatShader,
    advectionManualFilteringShader,
    advectionShader,
    divergenceShader,
    curlShader,
    vorticityShader,
    pressureShader,
    gradientSubtractShader,
    velocityOutShader,
  } = compileShaders(gl);
  startGUI();

  function getWebGLContext(canvas) {
    const params = {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false,
    };

    let gl = canvas.getContext("webgl2", params);
    isWebGL2 = !!gl;
    if (!isWebGL2)
      gl =
        canvas.getContext("webgl", params) ||
        canvas.getContext("experimental-webgl", params);

    let halfFloat;
    let supportLinearFiltering;
    if (isWebGL2) {
      halfFloat = gl.getExtension("EXT_color_buffer_float");
      supportLinearFiltering = gl.getExtension("OES_texture_float_linear");
    } else {
      halfFloat = gl.getExtension("OES_texture_half_float");
      supportLinearFiltering = gl.getExtension("OES_texture_half_float_linear");
    }

    gl.clearColor(0.0, 0.0, 0.0, 0.0);

    const halfFloatTexType = isWebGL2
      ? gl.HALF_FLOAT
      : halfFloat.HALF_FLOAT_OES;
    let formatRGBA;
    let formatRG;
    let formatR;

    if (isWebGL2) {
      formatRGBA = getSupportedFormat(
        gl,
        gl.RGBA16F,
        gl.RGBA,
        halfFloatTexType
      );
      formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
      formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
    } else {
      formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
    }

    return {
      gl,
      ext: {
        formatRGBA,
        formatRG,
        formatR,
        halfFloatTexType,
        supportLinearFiltering,
      },
    };
  }

  function getSupportedFormat(gl, internalFormat, format, type) {
    if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
      switch (internalFormat) {
        case gl.R16F:
          return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
        case gl.RG16F:
          return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
        default:
          return null;
      }
    }

    return {
      internalFormat,
      format,
    };
  }

  function supportRenderTextureFormat(gl, internalFormat, format, type) {
    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      internalFormat,
      4,
      4,
      0,
      format,
      type,
      null
    );

    let fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      texture,
      0
    );

    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (status != gl.FRAMEBUFFER_COMPLETE) return false;
    return true;
  }

  function startGUI() {
    var gui = new dat.GUI({ width: 300 });
    gui
      .add(config, "TEXTURE_DOWNSAMPLE", { Full: 0, Half: 1, Quarter: 2 })
      .name("resolution")
      .onFinishChange(initFramebuffers);
    gui.add(config, "DENSITY_DISSIPATION", 0.9, 1.0).name("density diffusion");
    gui
      .add(config, "VELOCITY_DISSIPATION", 0.9, 1.0)
      .name("velocity diffusion");
    gui
      .add(config, "PRESSURE_DISSIPATION", 0.0, 1.0)
      .name("pressure diffusion");
    gui.add(config, "PRESSURE_ITERATIONS", 1, 60).name("iterations");
    gui.add(config, "CURL", 0, 50).name("vorticity").step(1);
    gui.add(config, "SPLAT_RADIUS", 0.0001, 0.01).name("splat radius");

    gui
      .add(
        {
          fun: () => {
            splatStack.push(parseInt(Math.random() * 20) + 5);
          },
        },
        "fun"
      )
      .name("Random splats");

    gui.close();
  }

  function pointerPrototype() {
    this.id = -1;
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.down = false;
    this.moved = false;
    this.color = [30, 300, 30];
  }

  pointers.push(new pointerPrototype());

  class GLProgram {
    constructor(vertexShader, fragmentShader) {
      this.uniforms = {};
      this.program = gl.createProgram();

      gl.attachShader(this.program, vertexShader);
      gl.attachShader(this.program, fragmentShader);
      gl.linkProgram(this.program);

      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS))
        throw gl.getProgramInfoLog(this.program);

      const uniformCount = gl.getProgramParameter(
        this.program,
        gl.ACTIVE_UNIFORMS
      );
      for (let i = 0; i < uniformCount; i++) {
        const uniformName = gl.getActiveUniform(this.program, i).name;
        this.uniforms[uniformName] = gl.getUniformLocation(
          this.program,
          uniformName
        );
      }
    }

    bind() {
      gl.useProgram(this.program);
    }
  }

  let texWidth;
  let texHeight;
  let density;
  let velocity;
  let velocityOut;
  let burns;
  let cells;
  let divergence;
  let curl;
  let pressure;
  initFramebuffers();

  const clearProgram = new GLProgram(baseVertexShader, clearShader);
  const displayProgram = new GLProgram(baseVertexShader, displayShader);
  const velocityOutProgram = new GLProgram(baseVertexShader, velocityOutShader);
  const splatProgram = new GLProgram(baseVertexShader, splatShader);
  const advectionProgram = new GLProgram(
    baseVertexShader,
    ext.supportLinearFiltering
      ? advectionShader
      : advectionManualFilteringShader
  );
  const divergenceProgram = new GLProgram(baseVertexShader, divergenceShader);
  const curlProgram = new GLProgram(baseVertexShader, curlShader);
  const vorticityProgram = new GLProgram(baseVertexShader, vorticityShader);
  const pressureProgram = new GLProgram(baseVertexShader, pressureShader);
  const gradientSubtractProgram = new GLProgram(
    baseVertexShader,
    gradientSubtractShader
  );

  function initFramebuffers() {
    texWidth = gl.drawingBufferWidth >> config.TEXTURE_DOWNSAMPLE;
    texHeight = gl.drawingBufferHeight >> config.TEXTURE_DOWNSAMPLE;

    const texType = ext.halfFloatTexType;
    const rgba = ext.formatRGBA;
    const rg = ext.formatRG;
    const r = ext.formatR;

    velocity = createDoubleFBO(
      0,
      texWidth,
      texHeight,
      rg.internalFormat,
      rg.format,
      texType,
      ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST
    );
    density = createDoubleFBO(
      2,
      texWidth,
      texHeight,
      rgba.internalFormat,
      rgba.format,
      texType,
      ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST
    );
    divergence = createFBO(
      4,
      texWidth,
      texHeight,
      r.internalFormat,
      r.format,
      texType,
      gl.NEAREST
    );
    curl = createFBO(
      5,
      texWidth,
      texHeight,
      r.internalFormat,
      r.format,
      texType,
      gl.NEAREST
    );
    pressure = createDoubleFBO(
      6,
      texWidth,
      texHeight,
      r.internalFormat,
      r.format,
      texType,
      gl.NEAREST
    );
    burns = createFBO(
      8,
      texWidth,
      texHeight,
      rg.internalFormat,
      rg.format,
      texType,
      ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST
    );
    cells = createFBO(
      10,
      texWidth,
      texHeight,
      rg.internalFormat,
      rg.format,
      texType,
      ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST
    );
    velocityOut = createFBO(
      9,
      texWidth,
      texHeight,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST
    );
  }

  function createFBO(texId, w, h, internalFormat, format, type, param) {
    gl.activeTexture(gl.TEXTURE0 + texId);
    let texture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      internalFormat,
      w,
      h,
      0,
      format,
      type,
      null
    );

    let fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      texture,
      0
    );
    gl.viewport(0, 0, w, h);
    gl.clear(gl.COLOR_BUFFER_BIT);

    return [texture, fbo, texId];
  }

  function createDoubleFBO(texId, w, h, internalFormat, format, type, param) {
    let fbo1 = createFBO(texId, w, h, internalFormat, format, type, param);
    let fbo2 = createFBO(texId + 1, w, h, internalFormat, format, type, param);

    return {
      get read() {
        return fbo1;
      },
      get write() {
        return fbo2;
      },
      swap() {
        let temp = fbo1;
        fbo1 = fbo2;
        fbo2 = temp;
      },
    };
  }

  const width = universe.width();
  const height = universe.height();

  const blit = (() => {
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
      gl.STATIC_DRAW
    );
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array([0, 1, 2, 0, 2, 3]),
      gl.STATIC_DRAW
    );

    if (isWebGL2 && !isIOS) {
      const pbo = gl.createBuffer();
      gl.bindBuffer(gl.PIXEL_PACK_BUFFER, pbo);
      gl.bufferData(
        gl.PIXEL_PACK_BUFFER,
        new Uint8Array(width * height * 4),
        gl.STATIC_DRAW
      );
    }

    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    return (destination) => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, destination);
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    };
  })();

  let lastTime = Date.now();

  // multipleSplats(parseInt(Math.random() * 20) + 5);

  let winds = new Uint8Array(
    memory.buffer,
    universe.winds(),
    width * height * 4
  );

  let burnsData = new Uint8Array(
    memory.buffer,
    universe.burns(),
    width * height * 4
  );

  let cellsData = new Uint8Array(
    memory.buffer,
    universe.cells(),
    width * height * 4
  );

  function reset() {
    clearProgram.bind();

    var texUnit = 0;
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, burns[0]);
    gl.uniform1i(clearProgram.uniforms.uWind, texUnit++);

    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, density.read[0]);
    gl.uniform1i(clearProgram.uniforms.uTexture, texUnit++);

    gl.uniform1f(clearProgram.uniforms.value, 0);

    blit(density.write[1]);
    density.swap();

    var texUnit = 0;
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, burns[0]);
    gl.uniform1i(clearProgram.uniforms.uWind, texUnit++);

    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, pressure.read[0]);
    gl.uniform1i(clearProgram.uniforms.uTexture, texUnit++);

    gl.uniform1f(clearProgram.uniforms.value, 0);

    blit(pressure.write[1]);
    pressure.swap();

    texUnit = 0;
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, burns[0]);
    gl.uniform1i(clearProgram.uniforms.uWind, texUnit++);

    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, velocity.read[0]);
    gl.uniform1i(clearProgram.uniforms.uTexture, texUnit++);

    gl.uniform1f(clearProgram.uniforms.value, 0);

    blit(velocity.write[1]);
    velocity.swap();
  }

  let sync = undefined;

  function update() {
    winds = new Uint8Array(memory.buffer, universe.winds(), width * height * 4);

    burnsData = new Uint8Array(
      memory.buffer,
      universe.burns(),
      width * height * 4
    );

    let cell_pointer = universe.cells();
    cellsData = new Uint8Array(memory.buffer, cell_pointer, width * height * 4);

    // resizeCanvas();

    const dt = Math.min((Date.now() - lastTime) / 1000, 0.016);
    lastTime = Date.now();

    gl.viewport(0, 0, texWidth, texHeight);

    if (splatStack.length > 0) multipleSplats(splatStack);
    // multipleSplats(1);

    // ADVECTION
    // velocityRead ->
    // velocityWrite
    advectionProgram.bind();

    var texUnit = 0;
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, velocity.read[0]);
    gl.uniform1i(advectionProgram.uniforms.uVelocity, texUnit++);

    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, velocity.read[0]);
    gl.uniform1i(advectionProgram.uniforms.uSource, texUnit++);

    gl.uniform2f(
      advectionProgram.uniforms.texelSize,
      1.0 / texWidth,
      1.0 / texHeight
    );
    // gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read[2]);
    // gl.uniform1i(advectionProgram.uniforms.uSource, velocity.read[2]);
    gl.uniform1f(advectionProgram.uniforms.dt, dt);
    gl.uniform1f(
      advectionProgram.uniforms.dissipation,
      config.VELOCITY_DISSIPATION
    );
    blit(velocity.write[1]);
    velocity.swap();

    gl.bindTexture(gl.TEXTURE_2D, burns[0]);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      width,
      height,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      burnsData
    );

    gl.bindTexture(gl.TEXTURE_2D, cells[0]);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      width,
      height,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      cellsData
    );

    // ADVECTION
    // burns
    // velocityRead
    // densityRead ->
    // densityWrite

    var texUnit = 0;
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, burns[0]);
    gl.uniform1i(advectionProgram.uniforms.uWind, texUnit++);

    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, velocity.read[0]);
    gl.uniform1i(advectionProgram.uniforms.uVelocity, texUnit++);

    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, density.read[0]);
    gl.uniform1i(advectionProgram.uniforms.uSource, texUnit++);

    // gl.uniform1i(advectionProgram.uniforms.uWind, burns[2]);
    // gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read[2]);
    // gl.uniform1i(advectionProgram.uniforms.uSource, density.read[2]);
    gl.uniform1f(
      advectionProgram.uniforms.dissipation,
      config.DENSITY_DISSIPATION
    );
    blit(density.write[1]);
    density.swap();

    // Splat
    // velocityRead -> velocityWrite
    // densityRead -> velocityWrite
    for (let i = 0; i < pointers.length; i++) {
      const pointer = pointers[i];
      if (pointer.moved && window.UI.state.selectedElement < 0) {
        splat(pointer.x, pointer.y, pointer.dx, pointer.dy, pointer.color);
        pointer.moved = false;
      }
    }

    // CURL
    // velocityRead -> curl
    curlProgram.bind();

    var texUnit = 0;
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, velocity.read[0]);
    gl.uniform1i(curlProgram.uniforms.uVelocity, texUnit++);

    gl.uniform2f(
      curlProgram.uniforms.texelSize,
      1.0 / texWidth,
      1.0 / texHeight
    );
    // gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read[2]);
    blit(curl[1]);

    // VORTICITY
    // velocityRead
    // curl ->
    // velocityWrite

    vorticityProgram.bind();

    var texUnit = 0;
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, velocity.read[0]);
    gl.uniform1i(vorticityProgram.uniforms.uVelocity, texUnit++);

    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, curl[0]);
    gl.uniform1i(vorticityProgram.uniforms.uCurl, texUnit++);

    gl.uniform2f(
      vorticityProgram.uniforms.texelSize,
      1.0 / texWidth,
      1.0 / texHeight
    );

    // gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read[2]);
    // gl.uniform1i(vorticityProgram.uniforms.uCurl, curl[2]);
    gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
    gl.uniform1f(vorticityProgram.uniforms.dt, dt);
    blit(velocity.write[1]);
    velocity.swap();

    // DIVERGENCE
    // velocityRead ->
    // divergence
    divergenceProgram.bind();

    var texUnit = 0;
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, velocity.read[0]);
    gl.uniform1i(divergenceProgram.uniforms.uVelocity, texUnit++);

    gl.uniform2f(
      divergenceProgram.uniforms.texelSize,
      1.0 / texWidth,
      1.0 / texHeight
    );
    // gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read[2]);
    blit(divergence[1]);

    // CLEAR
    // burns
    // pressureRead->
    // pressureWrite
    clearProgram.bind();

    var texUnit = 0;
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, burns[0]);
    gl.uniform1i(clearProgram.uniforms.uWind, texUnit++);

    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, pressure.read[0]);
    gl.uniform1i(clearProgram.uniforms.uTexture, texUnit++);

    let pressureTexId = texUnit - 1;

    // let pressureTexId = pressure.read[2];
    // gl.activeTexture(gl.TEXTURE0 + pressureTexId);
    // gl.bindTexture(gl.TEXTURE_2D, pressure.read[0]);

    // gl.uniform1i(clearProgram.uniforms.uWind, burns[2]);
    // gl.uniform1i(clearProgram.uniforms.uTexture, pressureTexId);
    gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE_DISSIPATION);

    blit(pressure.write[1]);
    pressure.swap();

    // PRESSURE
    // divergence
    // pressureRead->
    // pressureWrite
    pressureProgram.bind();
    //TODO
    var texUnit = 0;
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, divergence[0]);
    gl.uniform1i(pressureProgram.uniforms.uDivergence, texUnit++);

    // gl.activeTexture(gl.TEXTURE0 + texUnit);
    // gl.bindTexture(gl.TEXTURE_2D, pressure.read[0]);
    // gl.uniform1i(clearProgram.uniforms.uTexture, texUnit++);

    gl.uniform2f(
      pressureProgram.uniforms.texelSize,
      1.0 / texWidth,
      1.0 / texHeight
    );
    // gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence[2]);
    pressureTexId = pressure.read[2];
    gl.uniform1i(pressureProgram.uniforms.uPressure, pressureTexId);
    gl.activeTexture(gl.TEXTURE0 + pressureTexId);
    for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
      gl.bindTexture(gl.TEXTURE_2D, pressure.read[0]);
      blit(pressure.write[1]);
      pressure.swap();
    }

    // VELOCITY OUT
    // velocityRead
    // pressureRead ->
    // velocityOut
    velocityOutProgram.bind();

    var texUnit = 0;
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, velocity.read[0]);
    gl.uniform1i(velocityOutProgram.uniforms.uTexture, texUnit++);

    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, pressure.read[0]);
    gl.uniform1i(velocityOutProgram.uniforms.uPressure, texUnit++);

    // gl.uniform1i(velocityOutProgram.uniforms.uTexture, velocity.read[2]);
    // gl.uniform1i(velocityOutProgram.uniforms.uPressure, pressure.read[2]);
    blit(velocityOut[1]);
    if (!isWebGL2 || isIOS) {
      gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, winds);
    } else if (sync === undefined) {
      gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, 0);
      sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
    } else {
      const status = gl.clientWaitSync(sync, 0, 0);

      if (status === gl.ALREADY_SIGNALED || status === gl.CONDITION_SATISFIED) {
        gl.getBufferSubData(gl.PIXEL_PACK_BUFFER, 0, winds);
        gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, 0);
        sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      }
    }

    // GRADIENT SUBTRACT
    // burns
    // pressureRead
    // velocityRead
    // sands ->
    // velocityWrite
    gradientSubtractProgram.bind();

    var texUnit = 0;
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, burns[0]);
    gl.uniform1i(gradientSubtractProgram.uniforms.uWind, texUnit++);

    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, pressure.read[0]);
    gl.uniform1i(gradientSubtractProgram.uniforms.uPressure, texUnit++);

    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, velocity.read[0]);
    gl.uniform1i(gradientSubtractProgram.uniforms.uVelocity, texUnit++);

    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, cells[0]);
    gl.uniform1i(gradientSubtractProgram.uniforms.uCells, texUnit++);

    gl.uniform2f(
      gradientSubtractProgram.uniforms.texelSize,
      1.0 / texWidth,
      1.0 / texHeight
    );

    // gl.uniform1i(gradientSubtractProgram.uniforms.uWind, burns[2]);
    // gl.uniform1i(gradientSubtractProgram.uniforms.uPressure, pressure.read[2]);
    // gl.uniform1i(gradientSubtractProgram.uniforms.uVelocity, velocity.read[2]);
    blit(velocity.write[1]);
    velocity.swap();

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

    // DISPLAY
    // density ->
    // null/renderbuffer?
    displayProgram.bind();

    var texUnit = 0;
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, density.read[0]);
    gl.uniform1i(displayProgram.uniforms.uTexture, texUnit++);

    // gl.uniform1i(displayProgram.uniforms.uTexture, density.read[2]);

    blit(null);
  }

  function splat(x, y, dx, dy, color) {
    splatProgram.bind();

    var texUnit = 0;
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, velocity.read[0]);
    gl.uniform1i(splatProgram.uniforms.uTarget, texUnit++);

    // gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read[2]);
    gl.uniform1f(
      splatProgram.uniforms.aspectRatio,
      canvas.width / canvas.height
    );
    gl.uniform2f(
      splatProgram.uniforms.point,
      y / canvas.height,
      x / canvas.width
    );
    gl.uniform3f(splatProgram.uniforms.color, dy, dx, 1.0);
    gl.uniform1f(
      splatProgram.uniforms.radius,
      (window.UI.state.size + 1) / 600
    );
    blit(velocity.write[1]);
    velocity.swap();

    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, density.read[0]);
    gl.uniform1i(splatProgram.uniforms.uTarget, texUnit++);

    // gl.uniform1i(splatProgram.uniforms.uTarget, density.read[2]);
    gl.uniform3f(splatProgram.uniforms.color, color[0], color[1], color[2]);
    blit(density.write[1]);
    density.swap();
  }

  function multipleSplats(amount) {
    for (let i = 0; i < amount; i++) {
      const color = fluidColor;
      const x = canvas.width * Math.random();
      const y = canvas.height * Math.random();
      const dx = 1000 * (Math.random() - 0.5);
      const dy = 1000 * (Math.random() - 0.5);
      splat(x, y, dx, dy, color);
    }
  }

  let boundingRect;
  let scaleX;
  let scaleY;

  let resize = () => {
    boundingRect = sandCanvas.getBoundingClientRect();
    scaleX =
      sandCanvas.width /
      Math.ceil(window.devicePixelRatio) /
      boundingRect.width;
    scaleY =
      sandCanvas.height /
      Math.ceil(window.devicePixelRatio) /
      boundingRect.height;
  };
  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("deviceorientation", resize, true);

  sandCanvas.addEventListener("mousemove", (e) => {
    const canvasLeft = (e.clientX - boundingRect.left) * scaleX;
    const canvasTop = (e.clientY - boundingRect.top) * scaleY;
    pointers[0].moved = pointers[0].down;
    pointers[0].dx = (canvasLeft - pointers[0].x) * 10.0;
    pointers[0].dy = (canvasTop - pointers[0].y) * 10.0;
    pointers[0].x = canvasLeft;
    pointers[0].y = canvasTop;
  });

  sandCanvas.addEventListener(
    "touchmove",
    (e) => {
      if (!window.paused) {
        if (e.cancelable) {
          e.preventDefault();
        }
      }
      const touches = e.targetTouches;
      for (let i = 0; i < touches.length; i++) {
        let pointer = pointers[i];
        pointer.moved = pointer.down;

        const canvasLeft = (touches[i].clientX - boundingRect.left) * scaleX;
        const canvasTop = (touches[i].clientY - boundingRect.top) * scaleY;

        pointer.dx = (canvasLeft - pointer.x) * 10.0;
        pointer.dy = (canvasTop - pointer.y) * 10.0;
        pointer.x = canvasLeft;
        pointer.y = canvasTop;
      }
    },
    false
  );

  sandCanvas.addEventListener("mousedown", () => {
    pointers[0].down = true;
    pointers[0].color = fluidColor;
  });

  sandCanvas.addEventListener("touchstart", (e) => {
    if (e.cancelable) {
      e.preventDefault();
    }
    const touches = e.targetTouches;
    for (let i = 0; i < touches.length; i++) {
      if (i >= pointers.length) pointers.push(new pointerPrototype());

      const canvasLeft = (touches[i].clientX - boundingRect.left) * scaleX;
      const canvasTop = (touches[i].clientY - boundingRect.top) * scaleY;

      pointers[i].id = touches[i].identifier;
      pointers[i].down = true;
      pointers[i].x = canvasLeft;
      pointers[i].y = canvasTop;
      pointers[i].color = fluidColor;
    }
  });

  window.addEventListener("mouseup", () => {
    pointers[0].down = false;
  });

  window.addEventListener("touchend", (e) => {
    const touches = e.changedTouches;
    for (let i = 0; i < touches.length; i++)
      for (let j = 0; j < pointers.length; j++)
        if (touches[i].identifier == pointers[j].id) pointers[j].down = false;
  });

  return { update, reset };
}

export { startFluid };
