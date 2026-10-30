var i=Object.defineProperty;var s=(a,t)=>i(a,"name",{value:t,configurable:!0});import{r as n,p as o}from"./index-CCoECEfW.js";import"./index-Cawse5jJ.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";const u="squares",g="Squares",m={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:20,min:4,max:100,step:1,bake:!0},width:{type:"number",default:2,min:.5,max:12,step:.5,bake:!0,unit:"px"}};function h(a={}){const t=n(m,a),e=Number(t.size),r=Number(t.width);return o(u,e,`
    <rect width="${e}" height="${e}" fill="${t.bg}"/>
    <rect x="${r/2}" y="${r/2}" width="${e-r}" height="${e-r}"
          fill="none" stroke="${t.fg}" stroke-width="${r}"/>
  `,t.rotate,a)}s(h,"squares");export{h as default,u as id,g as name,m as vars};
