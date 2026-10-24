import{r as n,p as o}from"./index-BFdBVABv.js";import"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";const s="waves",f="Waves",i={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:24,min:6,max:100,step:1,bake:!0},width:{type:"number",default:2,min:.5,max:12,step:.5,bake:!0,unit:"px"}};function $(r={}){const e=n(i,r),t=Number(e.size),a=t/2;return o(s,t,`
    <rect width="${t}" height="${t}" fill="${e.bg}"/>
    <path d="M0,${a} Q ${t*.25},0 ${a},${a} T ${t},${a}"
          fill="none" stroke="${e.fg}" stroke-width="${e.width}"/>
  `,e.rotate,r)}export{$ as default,s as id,f as name,i as vars};
