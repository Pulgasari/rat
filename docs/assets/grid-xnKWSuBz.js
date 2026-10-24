import{r as a,p as i}from"./index-BFdBVABv.js";import"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";const n="grid",l="Grid",o={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:20,min:4,max:100,step:1,bake:!0},width:{type:"number",default:1,min:.5,max:8,step:.5,bake:!0,unit:"px"}};function f(r={}){const t=a(o,r),e=t.size;return i(n,e,`
    <rect width="${e}" height="${e}" fill="${t.bg}"/>
    <path d="M ${e} 0 L 0 0 0 ${e}" fill="none" stroke="${t.fg}" stroke-width="${t.width}"/>
  `,t.rotate,r)}export{f as default,n as id,l as name,o as vars};
