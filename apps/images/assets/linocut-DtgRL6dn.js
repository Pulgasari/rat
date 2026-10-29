var s=Object.defineProperty;var o=(e,t)=>s(e,"name",{value:t,configurable:!0});import{r as i,f as l}from"./app.rat-B6yojvoo.js";import"./index-O95SaApO.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";const c="linocut",F="Linocut",m={levels:{type:"integer",default:2,min:2,max:4,step:1,bake:!0}};function g(e={}){const t=i(m,e),n=Math.max(2,Number(t.levels)),r=Array.from({length:n},(u,a)=>(a/(n-1)).toFixed(3)).join(" ");return l(c,`
    <feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 1 0"/>
    <feComponentTransfer>
      <feFuncR type="discrete" tableValues="${r}"/>
      <feFuncG type="discrete" tableValues="${r}"/>
      <feFuncB type="discrete" tableValues="${r}"/>
    </feComponentTransfer>
  `,e)}o(g,"linocut");export{g as default,c as id,F as name,m as vars};
