var o=Object.defineProperty;var r=(e,t)=>o(e,"name",{value:t,configurable:!0});import{r as a,f as n}from"./app.rat-DYXdaI4o.js";import"./index-Dp03ISzK.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";const i="glow",d="Glow",u={amount:{type:"number",default:4,min:0,max:20,step:.5,unit:"px"},strength:{type:"number",default:1.4,min:0,max:4,step:.1,bake:!0}};function x(e={}){const t=a(u,e);return n(i,`
    <feGaussianBlur stdDeviation="${t.amount}" result="blur"/>
    <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${t.strength} 0" result="glow"/>
    <feMerge>
      <feMergeNode in="glow"/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  `,e)}r(x,"glow");export{x as default,i as id,d as name,u as vars};
