let baseVertex = require("./glsl/baseVertex.glsl");
let clearShaderString = require("./glsl/clear.glsl");
let displayShaderString = require("./glsl/display.glsl");
let splatShaderString = require("./glsl/splat.glsl");
let advectionManualFilteringShaderString = require("./glsl/advectionManualFilter.glsl");
let advectionShaderString = require("./glsl/advection.glsl");
let divergenceShaderString = require("./glsl/divergence.glsl");
let curlShaderString = require("./glsl/curl.glsl");
let vorticityShaderString = require("./glsl/vorticity.glsl");
let pressureShaderString = require("./glsl/pressure.glsl");
let gradientSubtractShaderString = require("./glsl/gradientSubtract.glsl");
let velocityOutShaderString = require("./glsl/velocityOut.glsl");

function compileShaders(gl) {
  function compileShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
      throw gl.getShaderInfoLog(shader);

    return shader;
  }

  const baseVertexShader = compileShader(gl.VERTEX_SHADER, baseVertex);
  const clearShader = compileShader(gl.FRAGMENT_SHADER, clearShaderString);
  const displayShader = compileShader(gl.FRAGMENT_SHADER, displayShaderString);
  const splatShader = compileShader(gl.FRAGMENT_SHADER, splatShaderString);
  const advectionManualFilteringShader = compileShader(
    gl.FRAGMENT_SHADER,
    advectionManualFilteringShaderString
  );
  const advectionShader = compileShader(
    gl.FRAGMENT_SHADER,
    advectionShaderString
  );
  const divergenceShader = compileShader(
    gl.FRAGMENT_SHADER,
    divergenceShaderString
  );
  const curlShader = compileShader(gl.FRAGMENT_SHADER, curlShaderString);
  const vorticityShader = compileShader(
    gl.FRAGMENT_SHADER,
    vorticityShaderString
  );
  const pressureShader = compileShader(
    gl.FRAGMENT_SHADER,
    pressureShaderString
  );
  const gradientSubtractShader = compileShader(
    gl.FRAGMENT_SHADER,
    gradientSubtractShaderString
  );
  const velocityOutShader = compileShader(
    gl.FRAGMENT_SHADER,
    velocityOutShaderString
  );

  return {
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
    velocityOutShader
  };
}

export { compileShaders };
