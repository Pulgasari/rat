import{r as i,p as n}from"./index-BFdBVABv.js";import"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";const o="bricks",d="Bricks",s={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:24,min:6,max:100,step:1,bake:!0},width:{type:"number",default:1,min:.5,max:8,step:.5,bake:!0,unit:"px"}};function f(a={}){const e=i(s,a),t=Number(e.size),r=t/2;return n(o,t,`
    <rect width="${t}" height="${t}" fill="${e.bg}"/>
    <path d="M0,0 H${t} M0,${r} H${t} M0,0 V${r} M${r},${r} V${t}"
          fill="none" stroke="${e.fg}" stroke-width="${e.width}"/>
  `,e.rotate,a)}export{f as default,o as id,d as name,s as vars};
