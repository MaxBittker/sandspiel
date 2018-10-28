precision highp float;
precision mediump sampler2D;
varying vec2 vUv;
uniform sampler2D uTexture;
uniform sampler2D uVelocity;
void main() {
  // vec2 velocity = texture2D(uVelocity, vUv).xy;
  gl_FragColor = texture2D(uTexture, vUv);
  // gl_FragColor = texture2D(uVelocity, vUv) / 255.;
  // gl_FragColor.xy += vec2(0.5);
  // gl_FragColor.a = 0.1;
}