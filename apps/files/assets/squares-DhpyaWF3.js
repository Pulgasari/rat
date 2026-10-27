var n=Object.defineProperty;var s=(a,t)=>n(a,"name",{value:t,configurable:!0});import{r as u,p as i}from"./index-f1CGb_xX.js";import"./preload-helper-Cc2_yIPf.js";const o="squares",f="Squares",l={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:20,min:4,max:100,step:1,bake:!0},width:{type:"number",default:2,min:.5,max:12,step:.5,bake:!0,unit:"px"}};function c(a={}){const t=u(l,a),e=Number(t.size),r=Number(t.width);return i(o,e,`
    <rect width="${e}" height="${e}" fill="${t.bg}"/>
    <rect x="${r/2}" y="${r/2}" width="${e-r}" height="${e-r}"
          fill="none" stroke="${t.fg}" stroke-width="${r}"/>
  `,t.rotate,a)}s(c,"squares");export{c as default,o as id,f as name,l as vars};
