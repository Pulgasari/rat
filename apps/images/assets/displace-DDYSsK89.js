var m=Object.defineProperty;var t=(e,a)=>m(e,"name",{value:a,configurable:!0});import{NOISE as n}from"./noise-CBPG_68T.js";const f="displace",r="Displace",u={amount:{type:"number",default:20,min:0,max:100,step:1,unit:"px"},scale:{type:"number",default:3,min:.5,max:12,step:.5},speed:{type:"number",default:.3,min:0,max:2,step:.05}},c={fragment:`
    uniform float uAmount;
    uniform float uScale;
    uniform float uSpeed;
    ${n}
    void main () {
      float t = uTime * uSpeed;
      float nx = fbm(vUv * uScale + t);
      float ny = fbm(vUv * uScale + vec2(5.2, 1.3) + t);
      vec2 uv = vUv + (vec2(nx, ny) - 0.5) * uAmount / uResolution;
      gl_FragColor = texture2D(uSource, clamp(uv, 0.0, 1.0));
    }`,uniforms:t((e={})=>({uAmount:Number(e.amount??u.amount.default),uScale:Number(e.scale??u.scale.default),uSpeed:Number(e.speed??u.speed.default)}),"uniforms")};export{f as id,r as name,u as vars,c as webgl};
