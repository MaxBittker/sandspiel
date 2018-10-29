precision highp float;
precision mediump sampler2D;
varying vec2 vUv;
uniform sampler2D uTexture;
void main() {
  vec3 color = texture2D(uTexture, vUv).rgb;
  color -= vec3(0.05);
  // gl_FragColor = texture2D(uVelocity, vUv) / 255.;
  // gl_FragColor.xy += vec2(0.5);
  gl_FragColor = vec4(color, 1.0);
}