var n=Object.defineProperty;var o=(r,t)=>n(r,"name",{value:t,configurable:!0});import{r as s,p as i}from"./index-qboi3IS9.js";import"./withControl-Br8gmZRb.js";import"https://esm.sh/jsr/@pulgasari/logger";import"https://esm.sh/jsr/@pulgasari/str";import"./index-CgHh2HpB.js";import"https://esm.sh/jsr/@pulgasari/is";const p="waves",g="Waves",m={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:24,min:6,max:100,step:1,bake:!0},width:{type:"number",default:2,min:.5,max:12,step:.5,bake:!0,unit:"px"}};function h(r={}){const t=s(m,r),e=Number(t.size),a=e/2;return i(p,e,`
    <rect width="${e}" height="${e}" fill="${t.bg}"/>
    <path d="M0,${a} Q ${e*.25},0 ${a},${a} T ${e},${a}"
          fill="none" stroke="${t.fg}" stroke-width="${t.width}"/>
  `,t.rotate,r)}o(h,"waves");export{h as default,p as id,g as name,m as vars};
