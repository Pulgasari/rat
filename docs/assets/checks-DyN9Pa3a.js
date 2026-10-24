import{r as i,p as o}from"./index-BFdBVABv.js";import"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";const s="checks",m="Checkerboard",c={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:20,min:4,max:100,step:1,bake:!0}};function u(a={}){const e=i(c,a),r=Number(e.size),t=r/2;return o(s,r,`
    <rect width="${r}" height="${r}" fill="${e.bg}"/>
    <rect width="${t}" height="${t}" fill="${e.fg}"/>
    <rect x="${t}" y="${t}" width="${t}" height="${t}" fill="${e.fg}"/>
  `,e.rotate,a)}export{u as default,s as id,m as name,c as vars};
