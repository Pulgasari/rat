var s=Object.defineProperty;var n=(r,t)=>s(r,"name",{value:t,configurable:!0});import{r as i,p as o}from"./index-f1CGb_xX.js";import"./preload-helper-Cc2_yIPf.js";const u="bricks",m="Bricks",p={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:24,min:6,max:100,step:1,bake:!0},width:{type:"number",default:1,min:.5,max:8,step:.5,bake:!0,unit:"px"}};function f(r={}){const t=i(p,r),e=Number(t.size),a=e/2;return o(u,e,`
    <rect width="${e}" height="${e}" fill="${t.bg}"/>
    <path d="M0,0 H${e} M0,${a} H${e} M0,0 V${a} M${a},${a} V${e}"
          fill="none" stroke="${t.fg}" stroke-width="${t.width}"/>
  `,t.rotate,r)}n(f,"bricks");export{f as default,u as id,m as name,p as vars};
