var a=Object.defineProperty;var r=(e,o)=>a(e,"name",{value:o,configurable:!0});import{BLUR as u}from"./gaussian-blur-BaH1JSSw.js";const i="bloom",d="Bloom",t={threshold:{type:"number",default:.6,min:0,max:1,step:.02},radius:{type:"number",default:6,min:0,max:20,step:.5},strength:{type:"number",default:1,min:0,max:3,step:.1}},s=`
  uniform float uThreshold;
  void main () {
    vec4 c = texture2D(uSource, vUv);
    float l = dot(c.rgb, vec3(0.299, 0.587, 0.114));
    gl_FragColor = l > uThreshold ? vec4(c.rgb, 1.0) : vec4(0.0, 0.0, 0.0, 1.0);
  }`,n=`
  uniform float uStrength;
  void main () {
    vec4 base = texture2D(uSource0, vUv);   // the untouched original
    vec4 glow = texture2D(uSource, vUv);    // the blurred bright mask
    gl_FragColor = vec4(base.rgb + glow.rgb * uStrength, base.a);
  }`,g={passes:[{fragment:s,uniforms:r(e=>({uThreshold:Number(e.threshold??t.threshold.default)}),"uniforms")},{fragment:u,uniforms:r(e=>({uDir:[1,0],uRadius:Number(e.radius??t.radius.default)}),"uniforms")},{fragment:u,uniforms:r(e=>({uDir:[0,1],uRadius:Number(e.radius??t.radius.default)}),"uniforms")},{fragment:n,uniforms:r(e=>({uStrength:Number(e.strength??t.strength.default)}),"uniforms")}]};export{i as id,d as name,t as vars,g as webgl};
