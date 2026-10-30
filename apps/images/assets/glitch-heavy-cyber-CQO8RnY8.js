var s=Object.defineProperty;var r=(e,a)=>s(e,"name",{value:a,configurable:!0});import{r as n,f as u,a as t}from"./app.rat-D60POMxd.js";import"./index-Cd8yxlR_.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";const i="glitch-heavy-cyber",v="Heavy Cyber Glitch",d={animate:{type:"boolean",default:!0},frequency:{type:"text",default:"0.0 0.95",bake:!0},scale:{type:"number",default:40,min:0,max:120,step:5,bake:!0},speed:{type:"duration",default:"1.5s",bake:!0}};function x(e={}){const a=n(d,e),l=Math.round(Number(a.scale)*1.75);return u(i,`
    <feTurbulence type="fractalNoise" baseFrequency="${a.frequency}" numOctaves="1" result="noise">
      ${t(e,{attributeName:"baseFrequency",values:"0.0 0.95; 0.0 0.1; 0.0 0.8; 0.0 0.95",dur:"0.4s"})}
    </feTurbulence>
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" result="displaced">
      ${t(e,{attributeName:"scale",values:`0; ${a.scale}; 0; 0; ${l}; 0; 10; 0`,keyTimes:"0; 0.05; 0.08; 0.4; 0.43; 0.46; 0.8; 1",dur:a.speed})}
    </feDisplacementMap>
    <feOffset dx="0" dy="0" in="displaced" result="red-channel">
      ${t(e,{attributeName:"dx",values:"0; -15; 0; 10; 0",keyTimes:"0; 0.05; 0.1; 0.43; 1",dur:a.speed})}
    </feOffset>
    <feColorMatrix type="matrix" in="red-channel" result="red-isolated" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"/>
    <feOffset dx="0" dy="0" in="displaced" result="blue-channel">
      ${t(e,{attributeName:"dx",values:"0; 15; 0; -10; 0",keyTimes:"0; 0.03; 0.08; 0.45; 1",dur:a.speed})}
    </feOffset>
    <feColorMatrix type="matrix" in="blue-channel" result="blue-isolated" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"/>
    <feColorMatrix type="matrix" in="displaced"    result="green-isolated" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"/>
    <feBlend mode="screen" in="red-isolated" in2="green-isolated" result="red-green"/>
    <feBlend mode="screen" in="red-green"    in2="blue-isolated"/>
  `,e)}r(x,"glitchHeavyCyber");export{x as default,i as id,v as name,d as vars};
