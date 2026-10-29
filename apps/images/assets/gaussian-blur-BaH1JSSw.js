var a=Object.defineProperty;var e=(u,o)=>a(u,"name",{value:o,configurable:!0});const n="gaussian-blur",m="Gaussian Blur",t={amount:{type:"number",default:4,min:0,max:20,step:.5,unit:"px"}},r=`
  uniform vec2 uDir;
  uniform float uRadius;
  void main () {
    vec2 px = uDir / uResolution * uRadius;
    vec4 sum = texture2D(uSource, vUv) * 0.2270270270;
    sum += (texture2D(uSource, vUv + px * 1.3846153846) + texture2D(uSource, vUv - px * 1.3846153846)) * 0.3162162162;
    sum += (texture2D(uSource, vUv + px * 3.2307692308) + texture2D(uSource, vUv - px * 3.2307692308)) * 0.0702702703;
    gl_FragColor = sum;
  }`,i={passes:[{fragment:r,uniforms:e(u=>({uDir:[1,0],uRadius:Number(u.amount??t.amount.default)}),"uniforms")},{fragment:r,uniforms:e(u=>({uDir:[0,1],uRadius:Number(u.amount??t.amount.default)}),"uniforms")}]};export{r as BLUR,n as id,m as name,t as vars,i as webgl};
