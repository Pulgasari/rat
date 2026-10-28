var o=Object.defineProperty;var i=(r,t)=>o(r,"name",{value:t,configurable:!0});import{r as n,p as s}from"./index-qboi3IS9.js";import"./withControl-Br8gmZRb.js";import"https://esm.sh/jsr/@pulgasari/logger";import"https://esm.sh/jsr/@pulgasari/str";import"./index-CgHh2HpB.js";import"https://esm.sh/jsr/@pulgasari/is";const p="bricks",g="Bricks",m={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:24,min:6,max:100,step:1,bake:!0},width:{type:"number",default:1,min:.5,max:8,step:.5,bake:!0,unit:"px"}};function h(r={}){const t=n(m,r),e=Number(t.size),a=e/2;return s(p,e,`
    <rect width="${e}" height="${e}" fill="${t.bg}"/>
    <path d="M0,0 H${e} M0,${a} H${e} M0,0 V${a} M${a},${a} V${e}"
          fill="none" stroke="${t.fg}" stroke-width="${t.width}"/>
  `,t.rotate,r)}i(h,"bricks");export{h as default,p as id,g as name,m as vars};
