precision highp float;
precision mediump sampler2D;
varying vec2 vUv;
uniform sampler2D uTexture;
void main() {
  vec3 color = texture2D(uTexture, vec2(1.0 - vUv.y,vUv.x)).rgb * 0.1;
  color *= 0.5;
  color = min(color, 0.9);
  color = vec3(1.0) - color;
  color *= vec3(0.95, 0.9, 0.9);
  // color *= 0.5;
  gl_FragColor = vec4(color, 1.0);
}
