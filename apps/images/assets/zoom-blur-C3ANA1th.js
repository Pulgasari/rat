var n=Object.defineProperty;var e=(t,o)=>n(t,"name",{value:o,configurable:!0});const m="zoom-blur",s="Zoom Blur",r={strength:{type:"number",default:.2,min:0,max:1,step:.02}},a={fragment:`
    uniform float uStrength;
    void main () {
      vec2 c = vUv - 0.5;
      vec4 sum = vec4(0.0);
      const int N = 16;
      for (int i = 0; i < N; i++) {
        float t = float(i) / float(N - 1);
        sum += texture2D(uSource, vUv - c * t * uStrength);
      }
      gl_FragColor = sum / float(N);
    }`,uniforms:e((t={})=>({uStrength:Number(t.strength??r.strength.default)}),"uniforms")};export{m as id,s as name,r as vars,a as webgl};
