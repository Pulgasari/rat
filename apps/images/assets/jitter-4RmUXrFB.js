var a=Object.defineProperty;var r=(e,t)=>a(e,"name",{value:t,configurable:!0});import{r as n,f as u,a as s}from"./app.rat-D60POMxd.js";import"./index-Cd8yxlR_.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";const i="jitter",y="Jitter",c={animate:{type:"boolean",default:!0},amount:{type:"number",default:5,min:0,max:40,step:1},frequency:{type:"number",default:.5,min:.05,max:2,step:.05},speed:{type:"duration",default:"0.6s",bake:!0}};function v(e={}){const t=n(c,e);return u(i,`
    <feTurbulence type="turbulence" baseFrequency="${t.frequency}" numOctaves="1" seed="1" result="noise">
      ${s(e,{attributeName:"seed",values:"1;3;5;7;9;11;13;15",dur:t.speed,calcMode:"discrete"})}
    </feTurbulence>
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="${t.amount}" xChannelSelector="R" yChannelSelector="G"/>
  `,e)}r(v,"jitter");export{v as default,i as id,y as name,c as vars};
