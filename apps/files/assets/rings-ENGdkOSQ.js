var i=Object.defineProperty;var n=(r,t)=>i(r,"name",{value:t,configurable:!0});import{r as s,p as o}from"./index-f1CGb_xX.js";import"./preload-helper-Cc2_yIPf.js";const u="rings",d="Rings",l={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:24,min:6,max:100,step:1,bake:!0},width:{type:"number",default:2,min:.5,max:12,step:.5,bake:!0,unit:"px"}};function f(r={}){const t=s(l,r),e=Number(t.size),a=e/2-Number(t.width);return o(u,e,`
    <rect width="${e}" height="${e}" fill="${t.bg}"/>
    <circle cx="${e/2}" cy="${e/2}" r="${a}" fill="none" stroke="${t.fg}" stroke-width="${t.width}"/>
  `,t.rotate,r)}n(f,"rings");export{f as default,u as id,d as name,l as vars};
