import{r as a,p as n}from"./index-BFdBVABv.js";import"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";const i="triangles",f="Triangles",o={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:24,min:4,max:100,step:1,bake:!0}};function g(r={}){const e=a(o,r),t=Number(e.size);return n(i,t,`
    <rect width="${t}" height="${t}" fill="${e.bg}"/>
    <path d="M0,${t} L${t/2},0 L${t},${t} Z" fill="${e.fg}"/>
  `,e.rotate,r)}export{g as default,i as id,f as name,o as vars};
