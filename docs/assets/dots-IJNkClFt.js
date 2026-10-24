import{r as a,p as s}from"./index-BFdBVABv.js";import"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";const i="dots",c="Dots",o={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},radius:{type:"number",default:3,min:0,max:10,step:.5,bake:!0},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:20,min:4,max:100,step:1,bake:!0}};function d(e={}){const t=a(o,e),r=Number(t.size)/2;return s(i,t.size,`
    <rect width="${t.size}" height="${t.size}" fill="${t.bg}"/>
    <circle cx="${r}" cy="${r}" r="${t.radius}" fill="${t.fg}"/>
  `,t.rotate,e)}export{d as default,i as id,c as name,o as vars};
