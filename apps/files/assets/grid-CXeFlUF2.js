var n=Object.defineProperty;var a=(r,t)=>n(r,"name",{value:t,configurable:!0});import{r as i,p as o}from"./index-f1CGb_xX.js";import"./preload-helper-Cc2_yIPf.js";const s="grid",f="Grid",d={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:20,min:4,max:100,step:1,bake:!0},width:{type:"number",default:1,min:.5,max:8,step:.5,bake:!0,unit:"px"}};function m(r={}){const t=i(d,r),e=t.size;return o(s,e,`
    <rect width="${e}" height="${e}" fill="${t.bg}"/>
    <path d="M ${e} 0 L 0 0 0 ${e}" fill="none" stroke="${t.fg}" stroke-width="${t.width}"/>
  `,t.rotate,r)}a(m,"grid");export{m as default,s as id,f as name,d as vars};
