var o=Object.defineProperty;var t=(e,n)=>o(e,"name",{value:n,configurable:!0});const r="chromatic",l="Chromatic",u={amount:{type:"number",default:6,min:0,max:40,step:1,unit:"px"},angle:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg"}},m={fragment:`
    uniform float uAmount;
    uniform float uAngle;
    void main () {
      vec2 dir = vec2(cos(uAngle), sin(uAngle)) * uAmount / uResolution;
      float r = texture2D(uSource, vUv + dir).r;
      float g = texture2D(uSource, vUv).g;
      float b = texture2D(uSource, vUv - dir).b;
      float a = texture2D(uSource, vUv).a;
      gl_FragColor = vec4(r, g, b, a);
    }`,uniforms:t((e={})=>({uAmount:Number(e.amount??u.amount.default),uAngle:Number(e.angle??u.angle.default)*Math.PI/180}),"uniforms")};export{r as id,l as name,u as vars,m as webgl};
