precision mediump float;
uniform float t;
uniform vec2 resolution;
uniform sampler2D backBuffer;
uniform sampler2D data;

varying vec2 uv;

// clang-format off
#pragma glslify: hsv2rgb = require('glsl-hsv2rgb')
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

// clang-format on

void main() {
  vec3 color;
  //   float r = abs(sin(t / 25.));
  //   if (length(uv) < r && length(uv) > r - 0.1) {
  // color = hsv2rgb(vec3(sin(t * 0.01), 0.5, 0.5));

  vec2 textCoord = (uv * vec2(0.5, -0.5)) + vec2(0.5);
  vec4 data = texture2D(data, textCoord);
  int type = int(floor(data.r * 255.));
  float hue = 0.0;
  float saturation = 0.6;
  float lightness = 0.3 + data.g * 0.5;
  float noise = snoise3(vec3(uv * resolution, t * 0.1));
  float a = 1.0;

  if (type == 0) {
    hue = 0.1;
    saturation = 0.1;
    lightness = 1.0;
    a = 0.2;
  } else if (type == 1) {
    hue = 0.1;
    saturation = 0.1;
    lightness = 0.4;
  } else if (type == 2) {
    hue = 0.1;
  } else if (type == 3) {
    hue = 0.6;
  } else if (type == 4) {
    hue = 0.5;
    saturation = 0.5;
  } else if (type == 5) {
    hue = 0.05;
  } else if (type == 6) { // fire
    hue = (data.g * 0.1);
    lightness = 0.8 + data.g * 0.3;
  } else if (type == 7) { // wood
    hue = (data.g * 0.1);
    saturation = 0.3;
    lightness = 0.3 + data.g * 0.3;
  } else if (type == 8) { // lava
    hue = (data.g * 0.1);
    lightness = 0.7 + data.g * 0.3;
  } else if (type == 9) { // ice
    hue = 0.6;
    saturation = 0.4;
    lightness = 0.7 + data.g * 0.5;
  } else if (type == 10) { // sink
    hue = 0.9;
    saturation = 0.4;
    lightness = 1.0;
  } else if (type == 11) { // plant
    hue = 0.4;
    saturation = 0.4;
  } else if (type == 12) { // acid
    hue = 0.18;
    saturation = 0.9;
    lightness = 0.7 + data.g * 0.5;
  } else if (type == 13) { // acid
    hue = 0.9;
    saturation = 0.1;
    // lightness = 0.2 + data.g * 0.5;
  } else if (type == 14) { // acid
    hue = (data.g * 1.5) + t * .0005;
    saturation = 0.5;
    lightness = 0.8;
  }
  color = hsv2rgb(vec3(hue, saturation, lightness));

  gl_FragColor = vec4(color, a);
}