var o=Object.defineProperty;var n=(r,e)=>o(r,"name",{value:e,configurable:!0});import{r as s,p as i}from"./index-f1CGb_xX.js";import"./preload-helper-Cc2_yIPf.js";const u="chevron",$="Chevron",p={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:24,min:4,max:100,step:1,bake:!0},width:{type:"number",default:4,min:1,max:20,step:1,bake:!0,unit:"px"}};function c(r={}){const e=s(p,r),t=Number(e.size),a=t/2;return i(u,t,`
    <rect width="${t}" height="${t}" fill="${e.bg}"/>
    <path d="M0,0 L${a},${a} L${t},0 M0,${t} L${a},${a} L${t},${t}"
          fill="none" stroke="${e.fg}" stroke-width="${e.width}"/>
  `,e.rotate,r)}n(c,"chevron");export{c as default,u as id,$ as name,p as vars};
