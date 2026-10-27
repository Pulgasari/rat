var o=Object.defineProperty;var n=(a,t)=>o(a,"name",{value:t,configurable:!0});import{r as s,p as i}from"./index-f1CGb_xX.js";import"./preload-helper-Cc2_yIPf.js";const d="diamonds",f="Diamonds",l={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:24,min:4,max:100,step:1,bake:!0}};function c(a={}){const t=s(l,a),e=Number(t.size),r=e/2;return i(d,e,`
    <rect width="${e}" height="${e}" fill="${t.bg}"/>
    <path d="M${r},0 L${e},${r} L${r},${e} L0,${r} Z" fill="${t.fg}"/>
  `,t.rotate,a)}n(c,"diamonds");export{c as default,d as id,f as name,l as vars};
