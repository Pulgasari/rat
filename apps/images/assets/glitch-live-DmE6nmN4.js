var i=Object.defineProperty;var t=(e,r)=>i(e,"name",{value:r,configurable:!0});import{r as l,f as s,a}from"./app.rat-DGNL4E-g.js";import"./index-DH514loy.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";const n="glitch-live",x="Live Glitch",d={animate:{type:"boolean",default:!0},speed:{type:"duration",default:"2s",bake:!0}};function h(e={}){const r=l(d,e);return s(n,`
    <feOffset dx="0" dy="0" in="SourceGraphic" result="red-channel">
      ${a(e,{attributeName:"dx",values:"0; -8; 2; -10; 0; 5; -2; 0",keyTimes:"0; 0.05; 0.07; 0.1; 0.12; 0.2; 0.25; 1",dur:r.speed})}
    </feOffset>
    <feColorMatrix type="matrix" in="red-channel" result="red-isolated" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"/>
    <feOffset dx="0" dy="0" in="SourceGraphic" result="blue-channel">
      ${a(e,{attributeName:"dx",values:"0; 5; -3; 8; 0; -4; 0",keyTimes:"0; 0.03; 0.08; 0.12; 0.18; 0.22; 1",dur:r.speed})}
    </feOffset>
    <feColorMatrix type="matrix" in="blue-channel"  result="blue-isolated"  values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"/>
    <feColorMatrix type="matrix" in="SourceGraphic" result="green-isolated" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"/>
    <feBlend mode="screen" in="red-isolated" in2="green-isolated" result="red-green"/>
    <feBlend mode="screen" in="red-green"    in2="blue-isolated"/>
  `,e)}t(h,"glitchLive");export{h as default,n as id,x as name,d as vars};
