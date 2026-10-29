var i=Object.defineProperty;var r=(t,e)=>i(t,"name",{value:e,configurable:!0});import{r as l,f as n}from"./app.rat-OJOp9y9T.js";import"./index-Dy2E2FY4.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";const a="glitch-rgb",x="RGB Glitch",o={offsetX:{type:"number",default:3,min:-20,max:20,step:1,bake:!0},offsetY:{type:"number",default:0,min:-20,max:20,step:1,bake:!0}};function b(t={}){const e=l(o,t);return n(a,`
    <feOffset dx="${e.offsetX}" dy="${e.offsetY}" in="SourceGraphic" result="red-channel"/>
    <feColorMatrix type="matrix" in="red-channel" result="red-isolated" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"/>
    <feOffset dx="-${e.offsetX}" dy="-${e.offsetY}" in="SourceGraphic" result="blue-channel"/>
    <feColorMatrix type="matrix" in="blue-channel"  result="blue-isolated"  values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"/>
    <feColorMatrix type="matrix" in="SourceGraphic" result="green-isolated" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"/>
    <feBlend mode="screen" in="red-isolated" in2="green-isolated" result="red-green"/>
    <feBlend mode="screen" in="red-green"    in2="blue-isolated"/>
  `,t)}r(b,"glitchRgb");export{b as default,a as id,x as name,o as vars};
