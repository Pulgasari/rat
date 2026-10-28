var o=Object.defineProperty;var i=(r,t)=>o(r,"name",{value:t,configurable:!0});import{r as s,p as c}from"./index-BL4eRE5A.js";import"./withControl-CDr4_Pqh.js";import"https://esm.sh/jsr/@pulgasari/logger";import"https://esm.sh/jsr/@pulgasari/str";import"./index-CgHh2HpB.js";import"https://esm.sh/jsr/@pulgasari/is";const n="checks",$="Checkerboard",l={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:20,min:4,max:100,step:1,bake:!0}};function b(r={}){const t=s(l,r),a=Number(t.size),e=a/2;return c(n,a,`
    <rect width="${a}" height="${a}" fill="${t.bg}"/>
    <rect width="${e}" height="${e}" fill="${t.fg}"/>
    <rect x="${e}" y="${e}" width="${e}" height="${e}" fill="${t.fg}"/>
  `,t.rotate,r)}i(b,"checks");export{b as default,n as id,$ as name,l as vars};
