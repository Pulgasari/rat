import{r as s,p as i}from"./index-BFdBVABv.js";import"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";const n="squares",f="Squares",o={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:20,min:4,max:100,step:1,bake:!0},width:{type:"number",default:2,min:.5,max:12,step:.5,bake:!0,unit:"px"}};function c(a={}){const t=s(o,a),e=Number(t.size),r=Number(t.width);return i(n,e,`
    <rect width="${e}" height="${e}" fill="${t.bg}"/>
    <rect x="${r/2}" y="${r/2}" width="${e-r}" height="${e-r}"
          fill="none" stroke="${t.fg}" stroke-width="${r}"/>
  `,t.rotate,a)}export{c as default,n as id,f as name,o as vars};
