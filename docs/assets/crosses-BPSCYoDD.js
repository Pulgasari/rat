import{r as n,p as c}from"./index-BFdBVABv.js";import"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";const m="crosses",g="Crosses",p={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:24,min:6,max:100,step:1,bake:!0},thickness:{type:"number",default:4,min:1,max:20,step:1,bake:!0,unit:"px"}};function h(o={}){const t=n(p,o),e=Number(t.size),r=Number(t.thickness),s=e*.6,a=(e-s)/2,i=(e-r)/2;return c(m,e,`
    <rect width="${e}" height="${e}" fill="${t.bg}"/>
    <rect x="${i}" y="${a}" width="${r}" height="${s}" fill="${t.fg}"/>
    <rect x="${a}" y="${i}" width="${s}" height="${r}" fill="${t.fg}"/>
  `,t.rotate,o)}export{h as default,m as id,g as name,p as vars};
