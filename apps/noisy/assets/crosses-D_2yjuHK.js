var c=Object.defineProperty;var n=(r,t)=>c(r,"name",{value:t,configurable:!0});import{r as m,p}from"./index-coDsMHaB.js";import"./index-DWxzXOCc.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";const u="crosses",x="Crosses",f={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:24,min:6,max:100,step:1,bake:!0},thickness:{type:"number",default:4,min:1,max:20,step:1,bake:!0,unit:"px"}};function y(r={}){const t=m(f,r),e=Number(t.size),s=Number(t.thickness),o=e*.6,a=(e-o)/2,i=(e-s)/2;return p(u,e,`
    <rect width="${e}" height="${e}" fill="${t.bg}"/>
    <rect x="${i}" y="${a}" width="${s}" height="${o}" fill="${t.fg}"/>
    <rect x="${a}" y="${i}" width="${o}" height="${s}" fill="${t.fg}"/>
  `,t.rotate,r)}n(y,"crosses");export{y as default,u as id,x as name,f as vars};
