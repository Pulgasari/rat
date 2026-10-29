var o=Object.defineProperty;var e=(u,t)=>o(u,"name",{value:t,configurable:!0});const r="fisheye",a="Fisheye",n={amount:{type:"number",default:1,min:-2,max:2,step:.05}},v={fragment:`
    uniform float uAmount;
    void main () {
      vec2 c  = vUv - 0.5;
      float r = length(c);
      vec2 uv = c * (1.0 + r * r * uAmount) + 0.5;
      gl_FragColor = (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0)
        ? vec4(0.0, 0.0, 0.0, 0.0)
        : texture2D(uSource, uv);
    }`,uniforms:e((u={})=>({uAmount:Number(u.amount??n.amount.default)}),"uniforms")};export{r as id,a as name,n as vars,v as webgl};
