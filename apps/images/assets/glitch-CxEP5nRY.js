var r=Object.defineProperty;var o=(t,u)=>r(t,"name",{value:u,configurable:!0});const n="glitch",l="Glitch",e={intensity:{type:"number",default:.5,min:0,max:1,step:.02},speed:{type:"number",default:1,min:0,max:4,step:.1},blocks:{type:"number",default:40,min:5,max:120,step:1}},s={fragment:`
    uniform float uIntensity;
    uniform float uSpeed;
    uniform float uBlocks;
    float hash (vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
    void main () {
      float t   = floor(uTime * uSpeed * 8.0);
      float row = floor(vUv.y * uBlocks);
      float r   = hash(vec2(row, t));
      // only some rows glitch at any moment; those shift horizontally.
      float shift = r > 0.7 ? (hash(vec2(row, t + 1.0)) - 0.5) * uIntensity * 0.25 : 0.0;
      vec2 uv = vec2(fract(vUv.x + shift), vUv.y);
      float amt = uIntensity * 0.01 * (0.5 + r);
      float cr = texture2D(uSource, uv + vec2(amt, 0.0)).r;
      float cg = texture2D(uSource, uv).g;
      float cb = texture2D(uSource, uv - vec2(amt, 0.0)).b;
      gl_FragColor = vec4(cr, cg, cb, texture2D(uSource, uv).a);
    }`,uniforms:o((t={})=>({uIntensity:Number(t.intensity??e.intensity.default),uSpeed:Number(t.speed??e.speed.default),uBlocks:Number(t.blocks??e.blocks.default)}),"uniforms")};export{n as id,l as name,e as vars,s as webgl};
