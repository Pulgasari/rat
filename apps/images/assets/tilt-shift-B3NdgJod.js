var a=Object.defineProperty;var f=(t,e)=>a(t,"name",{value:e,configurable:!0});import{r as n,d as p,f as l}from"./app.rat-D9HbBWvG.js";import"./index-D_4DPAKM.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";const m="tilt-shift",y="Tilt Shift",u={amount:{type:"number",default:6,min:0,max:20,step:.5,unit:"px"},band:{type:"number",default:.3,min:.05,max:.9,step:.05,bake:!0}};function w(t={}){const e=n(u,t),o=Number(e.band),r=(.5-o/2).toFixed(3),s=(.5+o/2).toFixed(3),i=p(`
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <linearGradient id="m" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffffff" stop-opacity="1"/>
        <stop offset="${r}" stop-color="#ffffff" stop-opacity="0"/>
        <stop offset="${s}" stop-color="#ffffff" stop-opacity="0"/>
        <stop offset="1" stop-color="#ffffff" stop-opacity="1"/>
      </linearGradient>
      <rect width="100" height="100" fill="url(#m)"/>
    </svg>
  `);return l(m,`
    <feGaussianBlur in="SourceGraphic" stdDeviation="${e.amount}" result="blur"/>
    <feImage href="${i}" preserveAspectRatio="none" result="mask"/>
    <feComposite in="blur" in2="mask" operator="in" result="edge-blur"/>
    <feMerge>
      <feMergeNode in="SourceGraphic"/>
      <feMergeNode in="edge-blur"/>
    </feMerge>
  `,t)}f(w,"tiltShift");export{w as default,m as id,y as name,u as vars};
