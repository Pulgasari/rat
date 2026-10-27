var o=Object.defineProperty;var n=(r,e)=>o(r,"name",{value:e,configurable:!0});import{r as i,p as s}from"./index-B73nKEgb.js";import"./index-rnJbweYL.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";const p="chevron",h="Chevron",m={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:24,min:4,max:100,step:1,bake:!0},width:{type:"number",default:4,min:1,max:20,step:1,bake:!0,unit:"px"}};function b(r={}){const e=i(m,r),t=Number(e.size),a=t/2;return s(p,t,`
    <rect width="${t}" height="${t}" fill="${e.bg}"/>
    <path d="M0,0 L${a},${a} L${t},0 M0,${t} L${a},${a} L${t},${t}"
          fill="none" stroke="${e.fg}" stroke-width="${e.width}"/>
  `,e.rotate,r)}n(b,"chevron");export{b as default,p as id,h as name,m as vars};
