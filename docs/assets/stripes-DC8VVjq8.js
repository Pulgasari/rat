import{r as a,p as i}from"./index-BFdBVABv.js";import"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";const s="stripes",d="Stripes",n={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:20,min:4,max:100,step:1,bake:!0},width:{type:"number",default:4,min:1,max:20,step:1,bake:!0,unit:"px"}};function f(r={}){const t=a(n,r),e=t.size;return i(s,e,`
    <rect width="${e}" height="${e}" fill="${t.bg}"/>
    <line x1="0" y1="0" x2="0" y2="${e}" stroke="${t.fg}" stroke-width="${t.width}"/>
  `,t.rotate,r)}export{f as default,s as id,d as name,n as vars};
