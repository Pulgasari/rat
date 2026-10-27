var n=Object.defineProperty;var r=(a,e)=>n(a,"name",{value:e,configurable:!0});import{r as o,p as i}from"./index-f1CGb_xX.js";import"./preload-helper-Cc2_yIPf.js";const s="diagonal",m="Diagonal",u={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:20,min:4,max:100,step:1,bake:!0},width:{type:"number",default:4,min:1,max:20,step:1,bake:!0,unit:"px"}};function f(a={}){const e=o(u,a),t=Number(e.size);return i(s,t,`
    <rect width="${t}" height="${t}" fill="${e.bg}"/>
    <path d="M-1,1 L1,-1 M0,${t} L${t},0 M${t-1},${t+1} L${t+1},${t-1}"
          stroke="${e.fg}" stroke-width="${e.width}"/>
  `,e.rotate,a)}r(f,"diagonal");export{f as default,s as id,m as name,u as vars};
