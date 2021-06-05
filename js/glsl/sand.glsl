precision highp float;
uniform float t;
uniform float dpi;
uniform vec2 resolution;
uniform bool isSnapshot;
uniform sampler2D backBuffer;
uniform sampler2D data;

varying vec2 uv;

// clang-format off
#pragma glslify: hsv2rgb = require('glsl-hsv2rgb')
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: random = require(glsl-random)

// clang-format on

void main() {
  vec3 color;
  //   float r = abs(sin(t / 25.));
  //   if (length(uv) < r && length(uv) > r - 0.1) {
  // color = hsv2rgb(vec3(sin(t * 0.01), 0.5, 0.5));

  vec2 textCoord = ((uv * vec2(0.5, -0.5)) + vec2(0.5)).yx;
  // vec3 bb = texture2D(backBuffer, (uv * 0.5) + vec2(0.5)).rgb;

  vec4 data = texture2D(data, textCoord);
  int type = int((data.r * 255.) + 0.1);
  float hue = 0.0;
  float saturation = 0.6;
  float lightness = 0.3 + data.g * 0.5;
  float noise = snoise3(vec3(floor(uv * resolution / dpi), t * 0.05));
  float a = 1.0;

  if (type == 0) {
    hue = 0.0;
    saturation = 0.1;
    lightness = 0.1;
    a = 0.1;
    if (isSnapshot) {
      saturation = 0.05;
      lightness = 1.01;
      a = 1.0;
    }
  } else if (type == 1) {
    hue = 0.1;
    saturation = 0.1;
    lightness = 0.4;
  } else if (type == 2) {
    hue = 0.1;
    saturation = 0.5;
    lightness += 0.3;
  } else if (type == 3) { // water
    hue = 0.6;
    lightness = 0.7 + data.g * 0.25 + noise * 0.1;
    int polarity = int( mod(data.g * 255. ,2.) + 0.1);
    if(polarity == 0){
      lightness += 0.01;
    }

  } else if (type == 4) { // gas
    hue = 0.0;
    lightness += 0.4;
    saturation = 0.2 + (data.b * 1.5);
  } else if (type == 5) { // clone
    hue = 0.9;
    saturation = 0.3;
  } else if (type == 6) { // fire
  
    hue = (data.g * 0.1);
    saturation = 0.7;

    lightness = 0.7 + (data.g * 0.3) + ((noise + 0.8) * 0.5);
    if(isSnapshot){
      lightness -=0.2;
    }
  } else if (type == 7) { // wood
    hue = (data.g * 0.1);
    saturation = 0.3;
    lightness = 0.3 + data.g * 0.3;
  } else if (type == 8) { // lava
    hue = (data.g * 0.1);
    lightness = 0.7 + data.g * 0.25 + noise * 0.1;
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
    lightness = 0.8 + data.g * 0.2 + noise * 0.05;
  } else if (type == 13) { // stone
    hue = -0.4 + (data.g * 0.5);
    saturation = 0.1;
    // lightness = 0.2 + data.g * 0.5;
  } else if (type == 14) { // dust
    hue = (data.g * 2.0) + t * .0008;
    saturation = 0.4;
    lightness = 0.8;
  } else if (type == 15) { // mite
    hue = 0.8;
    saturation = 0.9;
    lightness = 0.8;
  } else if (type == 16) { // oil
    hue = (data.g * 5.0) + t * .008;

    saturation = 0.2;
    lightness = 0.3;
  } else if (type == 17) { // Rocket
    hue = 0.0;
    saturation = 0.4 + data.b;
    lightness = 0.9;
  } else if (type == 18) { // fungus
    hue = (data.g * 0.15) - 0.1;
    saturation = (data.g * 0.8) - 0.05;

    // (data.g * 0.00);
    lightness = 1.5 - (data.g * 0.2);
  } else if (type == 19) { // seed/flower

    hue = fract(fract(data.b * 2.) * 0.5) - 0.3;
    saturation = 0.7 * (data.g + 0.4) + data.b * 0.2;
    lightness = 0.9 * (data.g + 0.9);
  }
  if (isSnapshot == false) {
    lightness *= (0.975 + snoise2(floor(uv * resolution / dpi)) * 0.025);
  }
  color = hsv2rgb(vec3(hue, saturation, lightness));
  gl_FragColor = vec4(color, a);
}