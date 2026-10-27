var o=Object.defineProperty;var a=(r,e)=>o(r,"name",{value:e,configurable:!0});import{r as s,p as n}from"./index-9X9STJzB.js";import"./index-CYBe1SfL.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";const i="crosshatch",h="Crosshatch",p={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:20,min:4,max:100,step:1,bake:!0},width:{type:"number",default:1,min:.5,max:8,step:.5,bake:!0,unit:"px"}};function f(r={}){const e=s(p,r),t=Number(e.size);return n(i,t,`
    <rect width="${t}" height="${t}" fill="${e.bg}"/>
    <path d="M-1,1 L1,-1 M0,${t} L${t},0 M${t-1},${t+1} L${t+1},${t-1}
             M-1,${t-1} L1,${t+1} M0,0 L${t},${t} M${t-1},-1 L${t+1},1"
          fill="none" stroke="${e.fg}" stroke-width="${e.width}"/>
  `,e.rotate,r)}a(f,"crosshatch");export{f as default,i as id,h as name,p as vars};
