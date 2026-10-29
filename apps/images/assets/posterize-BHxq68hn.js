var a=Object.defineProperty;var s=(e,t)=>a(e,"name",{value:t,configurable:!0});import{r as i,f as l}from"./app.rat-B6yojvoo.js";import"./index-O95SaApO.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";const m="posterize",F="Posterize",p={levels:{type:"integer",default:4,min:2,max:12,step:1,bake:!0}};function g(e={}){const t=i(p,e),o=Math.max(2,Number(t.levels)),r=Array.from({length:o},(f,n)=>(n/(o-1)).toFixed(3)).join(" ");return l(m,`
    <feComponentTransfer>
      <feFuncR type="discrete" tableValues="${r}"/>
      <feFuncG type="discrete" tableValues="${r}"/>
      <feFuncB type="discrete" tableValues="${r}"/>
    </feComponentTransfer>
  `,e)}s(g,"posterize");export{g as default,m as id,F as name,p as vars};
