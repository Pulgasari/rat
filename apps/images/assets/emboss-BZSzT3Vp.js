var s=Object.defineProperty;var o=(t,r)=>s(t,"name",{value:r,configurable:!0});import{r as i,f as m}from"./app.rat-CUbL-LLd.js";import"./index-D3GmeVzN.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";const a="emboss",v="Emboss",n={strength:{type:"number",default:1,min:.2,max:3,step:.1,bake:!0}};function c(t={}){const r=i(n,t),e=Number(r.strength);return m(a,`
    <feConvolveMatrix order="3" preserveAlpha="true" divisor="1" bias="0.5"
      kernelMatrix="${(-2*e).toFixed(2)} ${(-e).toFixed(2)} 0  ${(-e).toFixed(2)} 1 ${e.toFixed(2)}  0 ${e.toFixed(2)} ${(2*e).toFixed(2)}"/>
  `,t)}o(c,"emboss");export{c as default,a as id,v as name,n as vars};
