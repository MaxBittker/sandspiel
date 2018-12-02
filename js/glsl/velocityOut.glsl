precision highp float;
precision mediump sampler2D;
varying vec2 vUv;
uniform sampler2D uTexture;
uniform sampler2D uPressure;
void main() {
  vec2 v = texture2D(uTexture, vUv).rg;
  float p = texture2D(uPressure, vUv).r;
  vec3 vp = vec3(v, p);
  vp = max(vp, vec3(-250.));
  vp = min(vp, vec3(250.));
  vp /= 500.;
  vp += vec3(0.5, 0.5, 0.);
  // v = vec2(0.5);
  gl_FragColor = vec4(vp, 0.0);
}
