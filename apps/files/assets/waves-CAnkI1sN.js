var s=Object.defineProperty;var n=(a,t)=>s(a,"name",{value:t,configurable:!0});import{r as o,p as i}from"./index-f1CGb_xX.js";import"./preload-helper-Cc2_yIPf.js";const u="waves",f="Waves",p={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:24,min:6,max:100,step:1,bake:!0},width:{type:"number",default:2,min:.5,max:12,step:.5,bake:!0,unit:"px"}};function $(a={}){const t=o(p,a),e=Number(t.size),r=e/2;return i(u,e,`
    <rect width="${e}" height="${e}" fill="${t.bg}"/>
    <path d="M0,${r} Q ${e*.25},0 ${r},${r} T ${e},${r}"
          fill="none" stroke="${t.fg}" stroke-width="${t.width}"/>
  `,t.rotate,a)}n($,"waves");export{$ as default,u as id,f as name,p as vars};
