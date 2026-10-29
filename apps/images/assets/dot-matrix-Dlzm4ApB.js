var s=Object.defineProperty;var r=(i,e)=>s(i,"name",{value:e,configurable:!0});import{r as a,d as f,f as m}from"./app.rat-DYXdaI4o.js";import"./index-Dp03ISzK.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";const c="dot-matrix",x="Dot Matrix",d={size:{type:"number",default:6,min:3,max:24,step:1,bake:!0}};function w(i={}){const e=a(d,i),t=Number(e.size),o=f(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${t}">
      <rect width="${t}" height="${t}" fill="#000000"/>
      <circle cx="${t/2}" cy="${t/2}" r="${(t*.42).toFixed(2)}" fill="#ffffff"/>
    </svg>
  `);return m(c,`
    <feImage href="${o}" x="0" y="0" width="${t}" height="${t}" result="dot"/>
    <feTile in="dot" result="grid"/>
    <feComposite in="SourceGraphic" in2="grid" operator="arithmetic" k1="1" k2="0" k3="0" k4="0"/>
  `,i)}r(w,"dotMatrix");export{w as default,c as id,x as name,d as vars};
