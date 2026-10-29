var i=Object.defineProperty;var a=(e,t)=>i(e,"name",{value:t,configurable:!0});import{r as s,f as p}from"./app.rat-DYXdaI4o.js";import"./index-Dp03ISzK.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";const m="instacolor",y="InstaColor",c={warmth:{type:"number",default:.08,min:0,max:.3,step:.01,bake:!0},contrast:{type:"number",default:1.15,min:.5,max:2,step:.05,bake:!0}};function F(e={}){const t=s(c,e),o=Number(t.warmth),r=Number(t.contrast),n=((1-r)/2).toFixed(3);return p(m,`
    <feColorMatrix type="matrix" values="1 0 0 0 ${o}  0 1 0 0 ${(o*.4).toFixed(3)}  0 0 1 0 ${(-o).toFixed(3)}  0 0 0 1 0"/>
    <feComponentTransfer>
      <feFuncR type="linear" slope="${r}" intercept="${n}"/>
      <feFuncG type="linear" slope="${r}" intercept="${n}"/>
      <feFuncB type="linear" slope="${r}" intercept="${n}"/>
    </feComponentTransfer>
  `,e)}a(F,"instacolor");export{F as default,m as id,y as name,c as vars};
