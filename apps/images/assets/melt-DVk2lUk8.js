var u=Object.defineProperty;var a=(e,t)=>u(e,"name",{value:t,configurable:!0});import{r as m,f as l,a as s}from"./app.rat-B6yojvoo.js";import"./index-O95SaApO.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";const o="melt",v="Melt",n={animate:{type:"boolean",default:!0},amount:{type:"number",default:15,min:0,max:60,step:1},speed:{type:"duration",default:"4s",bake:!0}};function h(e={}){const t=m(n,e),r=Number(e.amount??n.amount.default);return l(o,`
    <feTurbulence type="fractalNoise" baseFrequency="0.008 0.05" numOctaves="2" result="noise"/>
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="${t.amount}" xChannelSelector="A" yChannelSelector="G">
      ${s(e,{attributeName:"scale",values:`0; ${r}; 0`,dur:t.speed})}
    </feDisplacementMap>
  `,e)}a(h,"melt");export{h as default,o as id,v as name,n as vars};
