var a=Object.defineProperty;var r=(e,t)=>a(e,"name",{value:t,configurable:!0});import{f as p}from"./app.rat-D60POMxd.js";import"./index-Cd8yxlR_.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";const i="invert",d="Invert",o={amount:{type:"number",default:1,min:0,max:1,step:.05}};function v(e={}){const t=Number(e.amount??o.amount.default),n=(1-2*t).toFixed(3);return p(i,`
    <feComponentTransfer>
      <feFuncR type="linear" slope="${n}" intercept="${t}"/>
      <feFuncG type="linear" slope="${n}" intercept="${t}"/>
      <feFuncB type="linear" slope="${n}" intercept="${t}"/>
    </feComponentTransfer>
  `,e)}r(v,"invert");const y=r((e={})=>`invert(${e.amount??o.amount.default})`,"css");export{y as css,v as default,i as id,d as name,o as vars};
