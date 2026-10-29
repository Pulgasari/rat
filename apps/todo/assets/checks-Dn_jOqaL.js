var o=Object.defineProperty;var i=(r,t)=>o(r,"name",{value:t,configurable:!0});import{r as s,p as c}from"./index-BjwKxiz9.js";import"./index-DHOige0I.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";const n="checks",g="Checkerboard",l={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:20,min:4,max:100,step:1,bake:!0}};function $(r={}){const t=s(l,r),a=Number(t.size),e=a/2;return c(n,a,`
    <rect width="${a}" height="${a}" fill="${t.bg}"/>
    <rect width="${e}" height="${e}" fill="${t.fg}"/>
    <rect x="${e}" y="${e}" width="${e}" height="${e}" fill="${t.fg}"/>
  `,t.rotate,r)}i($,"checks");export{$ as default,n as id,g as name,l as vars};
