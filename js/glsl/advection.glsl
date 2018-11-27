
precision highp float;
precision mediump sampler2D;
varying vec2 vUv;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform sampler2D uWind;
uniform vec2 texelSize;
uniform float dt;
uniform float dissipation;
void main() {
  vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
  vec2 wind = texture2D(uWind, vUv).xy;

  gl_FragColor = dissipation * (texture2D(uSource, coord) + vec4(wind.y));
  gl_FragColor.a = 1.0;
}
