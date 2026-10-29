var s=Object.defineProperty;var a=(t,e)=>s(t,"name",{value:e,configurable:!0});import{r,d as l,f as n,a as o}from"./app.rat-DGNL4E-g.js";import"./index-DH514loy.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";const p="scanlines",b="Scanlines",f={animate:{type:"boolean",default:!1},gap:{type:"number",default:4,min:2,max:20,step:1,bake:!0},thickness:{type:"number",default:1,min:.5,max:6,step:.5,bake:!0},opacity:{type:"number",default:.35,min:0,max:1,step:.05,bake:!0},speed:{type:"duration",default:"4s",bake:!0}};function v(t={}){const e=r(f,t),i=l(`
    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="${e.gap}">
      <rect width="4" height="${e.thickness}" fill="#000000" fill-opacity="${e.opacity}"/>
    </svg>
  `);return n(p,`
    <feImage href="${i}" x="0" y="0" width="4" height="${e.gap}" result="tile"/>
    <feTile in="tile" result="lines"/>
    <feOffset in="lines" dx="0" dy="0" result="rolled">
      ${o(t,{attributeName:"dy",values:`0; ${e.gap}`,dur:e.speed})}
    </feOffset>
    <feComposite in="rolled" in2="SourceGraphic" operator="over"/>
  `,t)}a(v,"scanlines");export{v as default,p as id,b as name,f as vars};
