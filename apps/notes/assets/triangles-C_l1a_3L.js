var n=Object.defineProperty;var a=(r,e)=>n(r,"name",{value:e,configurable:!0});import{r as i,p as o}from"./index-Dcm-gxA2.js";import"./index-BWu-lzjJ.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";const s="triangles",d="Triangles",l={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:24,min:4,max:100,step:1,bake:!0}};function $(r={}){const e=i(l,r),t=Number(e.size);return o(s,t,`
    <rect width="${t}" height="${t}" fill="${e.bg}"/>
    <path d="M0,${t} L${t/2},0 L${t},${t} Z" fill="${e.fg}"/>
  `,e.rotate,r)}a($,"triangles");export{$ as default,s as id,d as name,l as vars};
