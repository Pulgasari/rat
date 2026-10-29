var r=Object.defineProperty;var a=(e,t)=>r(e,"name",{value:t,configurable:!0});import{r as o,f as i,a as s}from"./app.rat-DakpQRL4.js";import"./index-oKSG3TSX.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";const u="rainbow",c="Rainbow",n={animate:{type:"boolean",default:!0},speed:{type:"duration",default:"3s",bake:!0}};function w(e={}){const t=o(n,e);return i(u,`
    <feColorMatrix type="hueRotate" values="0">
      ${s(e,{attributeName:"values",values:"0; 360",dur:t.speed})}
    </feColorMatrix>
  `,e)}a(w,"rainbow");export{w as default,u as id,c as name,n as vars};
