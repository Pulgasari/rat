var l=Object.defineProperty;var e=(t,r)=>l(t,"name",{value:r,configurable:!0});const a="mirror",o="Mirror",u={vertical:{type:"boolean",default:!1},flip:{type:"boolean",default:!1}},f={fragment:`
    uniform float uVertical;
    uniform float uFlip;
    void main () {
      vec2 uv = vUv;
      float t = uVertical > 0.5 ? uv.y : uv.x;
      // keep the first half and mirror it, or the second half when flipped.
      t = uFlip > 0.5 ? (t < 0.5 ? 1.0 - t : t) : (t < 0.5 ? t : 1.0 - t);
      if (uVertical > 0.5) uv.y = t; else uv.x = t;
      gl_FragColor = texture2D(uSource, uv);
    }`,uniforms:e((t={})=>({uVertical:t.vertical===!0,uFlip:t.flip===!0}),"uniforms")};export{a as id,o as name,u as vars,f as webgl};
