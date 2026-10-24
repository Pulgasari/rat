import{r as n,p as o}from"./index-BFdBVABv.js";import"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";const i="chevron",$="Chevron",s={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:24,min:4,max:100,step:1,bake:!0},width:{type:"number",default:4,min:1,max:20,step:1,bake:!0,unit:"px"}};function c(a={}){const e=n(s,a),t=Number(e.size),r=t/2;return o(i,t,`
    <rect width="${t}" height="${t}" fill="${e.bg}"/>
    <path d="M0,0 L${r},${r} L${t},0 M0,${t} L${r},${r} L${t},${t}"
          fill="none" stroke="${e.fg}" stroke-width="${e.width}"/>
  `,e.rotate,a)}export{c as default,i as id,$ as name,s as vars};
