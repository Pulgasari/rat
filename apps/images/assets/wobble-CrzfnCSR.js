var u=Object.defineProperty;var r=(e,t)=>u(e,"name",{value:t,configurable:!0});import{r as o,f as l,a as s}from"./app.rat-CUbL-LLd.js";import"./index-D3GmeVzN.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";const c="wobble",q="Wobble",n={animate:{type:"boolean",default:!0},amount:{type:"number",default:8,min:0,max:40,step:1},frequency:{type:"number",default:.02,min:.005,max:.1,step:.005},speed:{type:"duration",default:"3s",bake:!0}};function $(e={}){const t=o(n,e),a=Number(e.frequency??n.frequency.default);return l(c,`
    <feTurbulence type="fractalNoise" baseFrequency="${t.frequency}" numOctaves="2" result="noise">
      ${s(e,{attributeName:"baseFrequency",values:`${a}; ${(a*1.6).toFixed(4)}; ${a}`,dur:t.speed})}
    </feTurbulence>
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="${t.amount}" xChannelSelector="R" yChannelSelector="G"/>
  `,e)}r($,"wobble");export{$ as default,c as id,q as name,n as vars};
