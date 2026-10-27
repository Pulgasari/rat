var s=Object.defineProperty;var r=(a,e)=>s(a,"name",{value:e,configurable:!0});import{r as n,p as o}from"./index-f1CGb_xX.js";import"./preload-helper-Cc2_yIPf.js";const i="crosshatch",l="Crosshatch",$={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:20,min:4,max:100,step:1,bake:!0},width:{type:"number",default:1,min:.5,max:8,step:.5,bake:!0,unit:"px"}};function d(a={}){const e=n($,a),t=Number(e.size);return o(i,t,`
    <rect width="${t}" height="${t}" fill="${e.bg}"/>
    <path d="M-1,1 L1,-1 M0,${t} L${t},0 M${t-1},${t+1} L${t+1},${t-1}
             M-1,${t-1} L1,${t+1} M0,0 L${t},${t} M${t-1},-1 L${t+1},1"
          fill="none" stroke="${e.fg}" stroke-width="${e.width}"/>
  `,e.rotate,a)}r(d,"crosshatch");export{d as default,i as id,l as name,$ as vars};
