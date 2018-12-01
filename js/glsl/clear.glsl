precision highp float;
precision mediump sampler2D;
varying vec2 vUv;
uniform sampler2D uTexture;
uniform sampler2D uWind;
uniform float value;
void main() {
  float pressure = texture2D(uWind, vUv).z;
  pressure *= 512.;
  pressure *= pressure;
  gl_FragColor = value * (texture2D(uTexture, vUv) + vec4(pressure));
}