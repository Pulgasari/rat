var s=Object.defineProperty;var a=(t,e)=>s(t,"name",{value:e,configurable:!0});import{r as i,p as n}from"./index-f1CGb_xX.js";import"./preload-helper-Cc2_yIPf.js";const o="dots",m="Dots",u={bg:{type:"color",default:"transparent"},fg:{type:"color",default:"#000000"},radius:{type:"number",default:3,min:0,max:10,step:.5,bake:!0},rotate:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0},size:{type:"number",default:20,min:4,max:100,step:1,bake:!0}};function p(t={}){const e=i(u,t),r=Number(e.size)/2;return n(o,e.size,`
    <rect width="${e.size}" height="${e.size}" fill="${e.bg}"/>
    <circle cx="${r}" cy="${r}" r="${e.radius}" fill="${e.fg}"/>
  `,e.rotate,t)}a(p,"dots");export{p as default,o as id,m as name,u as vars};
