var r=Object.defineProperty;var n=(e,t)=>r(e,"name",{value:t,configurable:!0});import{r as s,f as a}from"./app.rat-g-WvrVtz.js";import"./index-BkWpdP5P.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";const m="brightness",b="Brightness",o={amount:{type:"number",default:1,min:0,max:3,step:.05}};function d(e={}){const t=s(o,e);return a(m,`
    <feComponentTransfer>
      <feFuncR type="linear" slope="${t.amount}"/>
      <feFuncG type="linear" slope="${t.amount}"/>
      <feFuncB type="linear" slope="${t.amount}"/>
    </feComponentTransfer>
  `,e)}n(d,"brightness");const h=n((e={})=>`brightness(${e.amount??o.amount.default})`,"css");export{h as css,d as default,m as id,b as name,o as vars};
