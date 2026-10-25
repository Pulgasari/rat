var n=Object.defineProperty;var i=(r,t)=>n(r,"name",{value:t,configurable:!0});import{r as o,p as s}from"./index-DhmXL2nY.js";import"./index-CLscBhfk.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";const p="bricks",b="Bricks",m={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:24,min:6,max:100,step:1,bake:!0},width:{type:"number",default:1,min:.5,max:8,step:.5,bake:!0,unit:"px"}};function g(r={}){const t=o(m,r),e=Number(t.size),a=e/2;return s(p,e,`
    <rect width="${e}" height="${e}" fill="${t.bg}"/>
    <path d="M0,0 H${e} M0,${a} H${e} M0,0 V${a} M${a},${a} V${e}"
          fill="none" stroke="${t.fg}" stroke-width="${t.width}"/>
  `,t.rotate,r)}i(g,"bricks");export{g as default,p as id,b as name,m as vars};
