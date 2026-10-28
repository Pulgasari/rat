var n=Object.defineProperty;var a=(r,e)=>n(r,"name",{value:e,configurable:!0});import{r as i,p}from"./index-qboi3IS9.js";import"./withControl-Br8gmZRb.js";import"https://esm.sh/jsr/@pulgasari/logger";import"https://esm.sh/jsr/@pulgasari/str";import"./index-CgHh2HpB.js";import"https://esm.sh/jsr/@pulgasari/is";const s="chevron",b="Chevron",m={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:24,min:4,max:100,step:1,bake:!0},width:{type:"number",default:4,min:1,max:20,step:1,bake:!0,unit:"px"}};function g(r={}){const e=i(m,r),t=Number(e.size),o=t/2;return p(s,t,`
    <rect width="${t}" height="${t}" fill="${e.bg}"/>
    <path d="M0,0 L${o},${o} L${t},0 M0,${t} L${o},${o} L${t},${t}"
          fill="none" stroke="${e.fg}" stroke-width="${e.width}"/>
  `,e.rotate,r)}a(g,"chevron");export{g as default,s as id,b as name,m as vars};
