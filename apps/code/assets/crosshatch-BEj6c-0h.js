var o=Object.defineProperty;var a=(r,e)=>o(r,"name",{value:e,configurable:!0});import{r as s,p as i}from"./index-qboi3IS9.js";import"./withControl-Br8gmZRb.js";import"https://esm.sh/jsr/@pulgasari/logger";import"https://esm.sh/jsr/@pulgasari/str";import"./index-CgHh2HpB.js";import"https://esm.sh/jsr/@pulgasari/is";const n="crosshatch",f="Crosshatch",p={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:20,min:4,max:100,step:1,bake:!0},width:{type:"number",default:1,min:.5,max:8,step:.5,bake:!0,unit:"px"}};function b(r={}){const e=s(p,r),t=Number(e.size);return i(n,t,`
    <rect width="${t}" height="${t}" fill="${e.bg}"/>
    <path d="M-1,1 L1,-1 M0,${t} L${t},0 M${t-1},${t+1} L${t+1},${t-1}
             M-1,${t-1} L1,${t+1} M0,0 L${t},${t} M${t-1},-1 L${t+1},1"
          fill="none" stroke="${e.fg}" stroke-width="${e.width}"/>
  `,e.rotate,r)}a(b,"crosshatch");export{b as default,n as id,f as name,p as vars};
