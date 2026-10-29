var m=Object.defineProperty;var o=(e,t)=>m(e,"name",{value:t,configurable:!0});import{r as f,f as p}from"./app.rat-DakpQRL4.js";import"./index-oKSG3TSX.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";const u="solarize",T="Solarize",c={intensity:{type:"number",default:1,min:0,max:1,step:.05,bake:!0}};function V(e={}){const t=f(c,e),a=Number(t.intensity),r=[0,.5,1],s=[0,1,0],n=r.map((i,l)=>((1-a)*i+a*s[l]).toFixed(3)).join(" ");return p(u,`
    <feComponentTransfer>
      <feFuncR type="table" tableValues="${n}"/>
      <feFuncG type="table" tableValues="${n}"/>
      <feFuncB type="table" tableValues="${n}"/>
    </feComponentTransfer>
  `,e)}o(V,"solarize");export{V as default,u as id,T as name,c as vars};
