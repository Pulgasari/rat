var o=Object.defineProperty;var r=(a,e)=>o(a,"name",{value:e,configurable:!0});import{r as i,p as n}from"./index-CISUiGhG.js";import"./index-zRU6UDoC.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";const p="diagonal",$="Diagonal",s={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:20,min:4,max:100,step:1,bake:!0},width:{type:"number",default:4,min:1,max:20,step:1,bake:!0,unit:"px"}};function c(a={}){const e=i(s,a),t=Number(e.size);return n(p,t,`
    <rect width="${t}" height="${t}" fill="${e.bg}"/>
    <path d="M-1,1 L1,-1 M0,${t} L${t},0 M${t-1},${t+1} L${t+1},${t-1}"
          stroke="${e.fg}" stroke-width="${e.width}"/>
  `,e.rotate,a)}r(c,"diagonal");export{c as default,p as id,$ as name,s as vars};
