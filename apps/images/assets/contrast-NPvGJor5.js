var a=Object.defineProperty;var o=(t,e)=>a(t,"name",{value:e,configurable:!0});import{r as m,f as s}from"./app.rat-DYXdaI4o.js";import"./index-Dp03ISzK.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";const c="contrast",F="Contrast",r={amount:{type:"number",default:1,min:0,max:3,step:.05}};function v(t={}){const e=m(r,t),n=((1-Number(t.amount??r.amount.default))/2).toFixed(3);return s(c,`
    <feComponentTransfer>
      <feFuncR type="linear" slope="${e.amount}" intercept="${n}"/>
      <feFuncG type="linear" slope="${e.amount}" intercept="${n}"/>
      <feFuncB type="linear" slope="${e.amount}" intercept="${n}"/>
    </feComponentTransfer>
  `,t)}o(v,"contrast");const x=o((t={})=>`contrast(${t.amount??r.amount.default})`,"css");export{x as css,v as default,c as id,F as name,r as vars};
