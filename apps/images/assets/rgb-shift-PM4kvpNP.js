var o=Object.defineProperty;var i=(t,e)=>o(t,"name",{value:e,configurable:!0});import{r as l,f as s}from"./app.rat-OJOp9y9T.js";import"./index-Dy2E2FY4.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";const d="rgb-shift",g="RGB Shift",u={amount:{type:"number",default:4,min:0,max:30,step:1,bake:!0},angle:{type:"angle",default:0,min:0,max:360,step:1,unit:"deg",bake:!0}};function y(t={}){const e=l(u,t),r=Number(e.angle)*Math.PI/180,n=Number(e.amount)*Math.cos(r),a=Number(e.amount)*Math.sin(r);return s(d,`
    <feOffset dx="${n.toFixed(2)}" dy="${a.toFixed(2)}" in="SourceGraphic" result="red-channel"/>
    <feColorMatrix type="matrix" in="red-channel" result="red-isolated" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"/>
    <feOffset dx="${(-n).toFixed(2)}" dy="${(-a).toFixed(2)}" in="SourceGraphic" result="blue-channel"/>
    <feColorMatrix type="matrix" in="blue-channel"  result="blue-isolated"  values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"/>
    <feColorMatrix type="matrix" in="SourceGraphic" result="green-isolated" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"/>
    <feBlend mode="screen" in="red-isolated" in2="green-isolated" result="red-green"/>
    <feBlend mode="screen" in="red-green"    in2="blue-isolated"/>
  `,t)}i(y,"rgbShift");export{y as default,d as id,g as name,u as vars};
