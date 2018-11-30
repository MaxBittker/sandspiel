precision highp float;
precision mediump sampler2D;
varying vec2 vUv;
uniform sampler2D uTexture;
void main() {
  vec2 color = texture2D(uTexture, vUv).rg;
  color = max(color, vec2(-250.));
  color = min(color, vec2(250.));
  color /= 500.;
  color += vec2(0.5);
  // color = vec2(0.5);
  gl_FragColor = vec4(color, 0.0, 0.0);
}
