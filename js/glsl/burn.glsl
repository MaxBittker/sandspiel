precision highp float;
precision mediump sampler2D;
varying vec2 vUv;
uniform sampler2D uTarget;
uniform sampler2D uData;
void main() {
  vec3 base = texture2D(uTarget, vUv).xyz;
  vec2 burn = texture2D(uData, vUv).xy * 0.00;
  //   burn = clamp(burn, 0., 1.);
  // gl_FragColor = vec4(base, 1.0);
  //   gl_FragColor = vec4(texture2D(uData, vUv).rgb / 255., 1.0);
  gl_FragColor = vec4(base + vec3(burn, 0.0), 1.0);
}