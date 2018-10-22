precision mediump float;
uniform float t;
uniform vec2 resolution;
uniform sampler2D backBuffer;
uniform sampler2D data;

varying vec2 uv;

// clang-format off
#pragma glslify: hsv2rgb = require('glsl-hsv2rgb')
// clang-format on

void main() {
  vec3 color;
  //   float r = abs(sin(t / 25.));
  //   if (length(uv) < r && length(uv) > r - 0.1) {
  // color = hsv2rgb(vec3(sin(t * 0.01), 0.5, 0.5));

  vec2 textCoord = (uv * vec2(0.5, -0.5)) + vec2(0.5);
  vec4 data = texture2D(data, textCoord);
  float type = data.r * 255.;
  float hue = 0.0;
  if (type == 1.) {
    hue = 0.1;
  } else if (type == 2.) {
    hue = 0.1;
  } else if (type == 3.) {
    hue = 0.6;
  }
  color = hsv2rgb(vec3(hue, 0.9, 0.2 + data.g * 0.8));

  gl_FragColor = vec4(color, 1.0);
}