var o=Object.defineProperty;var i=(t,r)=>o(t,"name",{value:r,configurable:!0});import{r as s,d as a,f}from"./app.rat-D9HbBWvG.js";import"./index-D_4DPAKM.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";const l="halftone",y="Half Tone",p={size:{type:"number",default:5,min:3,max:20,step:1,bake:!0}};function x(t={}){const r=s(p,t),e=Number(r.size),n=a(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${e}" height="${e}">
      <rect width="${e}" height="${e}" fill="#000000"/>
      <circle cx="${e/2}" cy="${e/2}" r="${(e*.45).toFixed(2)}" fill="#ffffff"/>
    </svg>
  `);return f(l,`
    <feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 1 0" result="gray"/>
    <feComponentTransfer in="gray" result="contrast">
      <feFuncR type="linear" slope="1.6" intercept="-0.3"/>
      <feFuncG type="linear" slope="1.6" intercept="-0.3"/>
      <feFuncB type="linear" slope="1.6" intercept="-0.3"/>
    </feComponentTransfer>
    <feImage href="${n}" x="0" y="0" width="${e}" height="${e}" result="dot"/>
    <feTile in="dot" result="grid"/>
    <feComposite in="contrast" in2="grid" operator="arithmetic" k1="1" k2="0" k3="0" k4="0"/>
  `,t)}i(x,"halftone");export{x as default,l as id,y as name,p as vars};
