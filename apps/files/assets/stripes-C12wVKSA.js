var s=Object.defineProperty;var a=(e,t)=>s(e,"name",{value:t,configurable:!0});import{r as i,p as n}from"./index-f1CGb_xX.js";import"./preload-helper-Cc2_yIPf.js";const o="stripes",m="Stripes",p={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:20,min:4,max:100,step:1,bake:!0},width:{type:"number",default:4,min:1,max:20,step:1,bake:!0,unit:"px"}};function f(e={}){const t=i(p,e),r=t.size;return n(o,r,`
    <rect width="${r}" height="${r}" fill="${t.bg}"/>
    <line x1="0" y1="0" x2="0" y2="${r}" stroke="${t.fg}" stroke-width="${t.width}"/>
  `,t.rotate,e)}a(f,"stripes");export{f as default,o as id,m as name,p as vars};
