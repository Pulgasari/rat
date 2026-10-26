var o=Object.defineProperty;var n=(a,t)=>o(a,"name",{value:t,configurable:!0});import{r as s,p as i}from"./index-ZP-HeORE.js";import"./index-rsTt0D-I.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";const p="waves",b="Waves",m={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:24,min:6,max:100,step:1,bake:!0},width:{type:"number",default:2,min:.5,max:12,step:.5,bake:!0,unit:"px"}};function g(a={}){const t=s(m,a),e=Number(t.size),r=e/2;return i(p,e,`
    <rect width="${e}" height="${e}" fill="${t.bg}"/>
    <path d="M0,${r} Q ${e*.25},0 ${r},${r} T ${e},${r}"
          fill="none" stroke="${t.fg}" stroke-width="${t.width}"/>
  `,t.rotate,a)}n(g,"waves");export{g as default,p as id,b as name,m as vars};
