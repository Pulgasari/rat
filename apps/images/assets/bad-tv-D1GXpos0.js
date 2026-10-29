var a=Object.defineProperty;var r=(e,t)=>a(e,"name",{value:t,configurable:!0});import{r as s,d as l,f as n,a as o}from"./app.rat-g-WvrVtz.js";import"./index-BkWpdP5P.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";const u="bad-tv",v="Bad TV",d={animate:{type:"boolean",default:!0},distortion:{type:"number",default:8,min:0,max:40,step:1},speed:{type:"duration",default:"2s",bake:!0}};function x(e={}){const t=s(d,e),i=l(`
    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="3">
      <rect width="4" height="1" fill="#000000" fill-opacity="0.35"/>
    </svg>
  `);return n(u,`
    <feTurbulence type="fractalNoise" baseFrequency="0 0.0008" numOctaves="1" seed="3" result="noise">
      ${o(e,{attributeName:"seed",values:"3;7;11;15",dur:t.speed,calcMode:"discrete"})}
    </feTurbulence>
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="${t.distortion}" xChannelSelector="R" yChannelSelector="A" result="warp"/>
    <feOffset in="warp" dx="1.5" dy="0" result="r0"/>
    <feColorMatrix in="r0" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="ri"/>
    <feOffset in="warp" dx="-1.5" dy="0" result="b0"/>
    <feColorMatrix in="b0"   type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="bi"/>
    <feColorMatrix in="warp" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="gi"/>
    <feBlend mode="screen" in="ri" in2="gi" result="rg"/>
    <feBlend mode="screen" in="rg" in2="bi" result="rgb"/>
    <feImage href="${i}" x="0" y="0" width="4" height="3" result="tile"/>
    <feTile in="tile" result="lines"/>
    <feComposite in="lines" in2="rgb" operator="over"/>
  `,e)}r(x,"badTv");export{x as default,u as id,v as name,d as vars};
