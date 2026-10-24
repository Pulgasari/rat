import{r as o,p as n}from"./index-BFdBVABv.js";import"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";const s="diamonds",f="Diamonds",i={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:24,min:4,max:100,step:1,bake:!0}};function c(r={}){const e=o(i,r),t=Number(e.size),a=t/2;return n(s,t,`
    <rect width="${t}" height="${t}" fill="${e.bg}"/>
    <path d="M${a},0 L${t},${a} L${a},${t} L0,${a} Z" fill="${e.fg}"/>
  `,e.rotate,r)}export{c as default,s as id,f as name,i as vars};
