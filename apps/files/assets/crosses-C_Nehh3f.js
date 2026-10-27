var c=Object.defineProperty;var i=(s,t)=>c(s,"name",{value:t,configurable:!0});import{r as u,p as f}from"./index-f1CGb_xX.js";import"./preload-helper-Cc2_yIPf.js";const l="crosses",g="Crosses",m={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:24,min:6,max:100,step:1,bake:!0},thickness:{type:"number",default:4,min:1,max:20,step:1,bake:!0,unit:"px"}};function h(s={}){const t=u(m,s),e=Number(t.size),r=Number(t.thickness),a=e*.6,n=(e-a)/2,o=(e-r)/2;return f(l,e,`
    <rect width="${e}" height="${e}" fill="${t.bg}"/>
    <rect x="${o}" y="${n}" width="${r}" height="${a}" fill="${t.fg}"/>
    <rect x="${n}" y="${o}" width="${a}" height="${r}" fill="${t.fg}"/>
  `,t.rotate,s)}i(h,"crosses");export{h as default,l as id,g as name,m as vars};
