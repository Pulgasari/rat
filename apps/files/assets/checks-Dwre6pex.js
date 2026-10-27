var c=Object.defineProperty;var s=(r,t)=>c(r,"name",{value:t,configurable:!0});import{r as i,p as n}from"./index-f1CGb_xX.js";import"./preload-helper-Cc2_yIPf.js";const o="checks",d="Checkerboard",l={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:20,min:4,max:100,step:1,bake:!0}};function g(r={}){const t=i(l,r),a=Number(t.size),e=a/2;return n(o,a,`
    <rect width="${a}" height="${a}" fill="${t.bg}"/>
    <rect width="${e}" height="${e}" fill="${t.fg}"/>
    <rect x="${e}" y="${e}" width="${e}" height="${e}" fill="${t.fg}"/>
  `,t.rotate,r)}s(g,"checks");export{g as default,o as id,d as name,l as vars};
