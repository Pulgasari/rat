var n=Object.defineProperty;var a=(e,o)=>n(e,"name",{value:o,configurable:!0});const f=`
  float hash (vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float vnoise (vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  float fbm (vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * vnoise(p); p *= 2.0; a *= 0.5; }
    return v;
  }
`,c="noise",r="Noise",t={amount:{type:"number",default:.15,min:0,max:1,step:.01},scale:{type:"number",default:1,min:.3,max:4,step:.1}},i={fragment:`
    uniform float uAmount;
    uniform float uScale;
    float hash (vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
    void main () {
      vec4 c = texture2D(uSource, vUv);
      float n = hash(floor(vUv * uResolution / uScale) + uTime * 71.0);
      gl_FragColor = vec4(c.rgb + (n - 0.5) * uAmount, c.a);
    }`,uniforms:a((e={})=>({uAmount:Number(e.amount??t.amount.default),uScale:Number(e.scale??t.scale.default)}),"uniforms")};export{f as NOISE,c as id,r as name,t as vars,i as webgl};
