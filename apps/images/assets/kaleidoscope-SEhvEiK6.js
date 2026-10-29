var s=Object.defineProperty;var a=(e,n)=>s(e,"name",{value:n,configurable:!0});const o="kaleidoscope",g="Kaleidoscope",t={segments:{type:"integer",default:6,min:2,max:24,step:1},angle:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg"}},u={fragment:`
    #define PI 3.14159265359
    uniform float uSegments;
    uniform float uAngle;
    void main () {
      vec2 c = vUv - 0.5;
      float r = length(c);
      float a = atan(c.y, c.x) + uAngle;
      float seg = PI * 2.0 / uSegments;
      a = mod(a, seg);
      a = abs(a - seg * 0.5);              // fold the wedge back on itself
      vec2 uv = vec2(cos(a), sin(a)) * r + 0.5;
      gl_FragColor = texture2D(uSource, clamp(uv, 0.0, 1.0));
    }`,uniforms:a((e={})=>({uSegments:Math.max(2,Math.round(e.segments??t.segments.default)),uAngle:Number(e.angle??t.angle.default)*Math.PI/180}),"uniforms")};export{o as id,g as name,t as vars,u as webgl};
