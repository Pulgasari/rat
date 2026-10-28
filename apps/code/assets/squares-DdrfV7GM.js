var i=Object.defineProperty;var s=(a,t)=>i(a,"name",{value:t,configurable:!0});import{r as o,p as n}from"./index-BL4eRE5A.js";import"./withControl-CDr4_Pqh.js";import"https://esm.sh/jsr/@pulgasari/logger";import"https://esm.sh/jsr/@pulgasari/str";import"./index-CgHh2HpB.js";import"https://esm.sh/jsr/@pulgasari/is";const u="squares",h="Squares",m={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:20,min:4,max:100,step:1,bake:!0},width:{type:"number",default:2,min:.5,max:12,step:.5,bake:!0,unit:"px"}};function $(a={}){const t=o(m,a),e=Number(t.size),r=Number(t.width);return n(u,e,`
    <rect width="${e}" height="${e}" fill="${t.bg}"/>
    <rect x="${r/2}" y="${r/2}" width="${e-r}" height="${e-r}"
          fill="none" stroke="${t.fg}" stroke-width="${r}"/>
  `,t.rotate,a)}s($,"squares");export{$ as default,u as id,h as name,m as vars};
