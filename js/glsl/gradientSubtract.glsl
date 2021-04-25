precision highp float;
precision mediump sampler2D;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
uniform sampler2D uWind;
uniform sampler2D uCells;

vec2 boundary(in vec2 uv) {
  uv = min(max(uv, 0.0), 1.0);
  return uv;
}
void main() {
  float L = texture2D(uPressure, boundary(vL)).x;
  float R = texture2D(uPressure, boundary(vR)).x;
  float T = texture2D(uPressure, boundary(vT)).x;
  float B = texture2D(uPressure, boundary(vB)).x;
  vec2 velocity = texture2D(uVelocity, vUv).xy;
  vec2 wind = texture2D(uWind, vUv).xy;
  vec2 cell = texture2D(uCells, vUv).xy;
  velocity.xy -= vec2(R - L, T - B);
  velocity.yx += wind * -25.; // hack, probably wrong for X

  int type = int((cell.r * 255.) + 0.1);

  // || type == 7 || type == 9
  if (type == 1 || type == 5) {
    velocity = vec2(0.);
  }
  if (type == 0 || type == 4 || type == 6) {

  } else {
    velocity = velocity * 0.95;
  }
  // velocity = cell.rg * 100.;
  gl_FragColor = vec4(velocity, 0.0, 1.0);
}