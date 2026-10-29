var a=Object.defineProperty;var t=(e,r)=>a(e,"name",{value:r,configurable:!0});import{r as i,d as s,f}from"./app.rat-DGNL4E-g.js";import"./index-DH514loy.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";const n="barrel-blur",h="Barrel Blur",l={amount:{type:"number",default:8,min:0,max:20,step:.5,unit:"px"},size:{type:"number",default:.4,min:0,max:1,step:.05,bake:!0}};function v(e={}){const r=i(l,e),o=s(`
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <radialGradient id="m" cx="50%" cy="50%" r="75%">
        <stop offset="${r.size}" stop-color="#ffffff" stop-opacity="0"/>
        <stop offset="1" stop-color="#ffffff" stop-opacity="1"/>
      </radialGradient>
      <rect width="100" height="100" fill="url(#m)"/>
    </svg>
  `);return f(n,`
    <feGaussianBlur in="SourceGraphic" stdDeviation="${r.amount}" result="blur"/>
    <feImage href="${o}" preserveAspectRatio="none" result="mask"/>
    <feComposite in="blur" in2="mask" operator="in" result="edge-blur"/>
    <feMerge>
      <feMergeNode in="SourceGraphic"/>
      <feMergeNode in="edge-blur"/>
    </feMerge>
  `,e)}t(v,"barrelBlur");export{v as default,n as id,h as name,l as vars};
