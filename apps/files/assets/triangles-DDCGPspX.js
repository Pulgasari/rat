var n=Object.defineProperty;var r=(a,e)=>n(a,"name",{value:e,configurable:!0});import{r as s,p as l}from"./index-f1CGb_xX.js";import"./preload-helper-Cc2_yIPf.js";const i="triangles",g="Triangles",o={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:24,min:4,max:100,step:1,bake:!0}};function m(a={}){const e=s(o,a),t=Number(e.size);return l(i,t,`
    <rect width="${t}" height="${t}" fill="${e.bg}"/>
    <path d="M0,${t} L${t/2},0 L${t},${t} Z" fill="${e.fg}"/>
  `,e.rotate,a)}r(m,"triangles");export{m as default,i as id,g as name,o as vars};
