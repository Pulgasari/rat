var r=Object.defineProperty;var i=(e,t)=>r(e,"name",{value:t,configurable:!0});import{r as a,f as n,a as s}from"./app.rat-g-WvrVtz.js";import"./index-BkWpdP5P.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";const o="night-vision",v="Night Vision",u={animate:{type:"boolean",default:!0},noise:{type:"number",default:.5,min:0,max:1,step:.05,bake:!0},speed:{type:"duration",default:"0.4s",bake:!0}};function y(e={}){const t=a(u,e);return n(o,`
    <feColorMatrix type="matrix" values="0 0 0 0 0  0.3 0.6 0.1 0 0.05  0 0 0 0 0  0 0 0 1 0" result="tint"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="1" result="noise">
      ${s(e,{attributeName:"seed",values:"1;2;3;4;5",dur:t.speed,calcMode:"discrete"})}
    </feTurbulence>
    <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  1 0 0 0 0  0 0 0 0 0  0 0 0 ${t.noise} 0" result="grain"/>
    <feBlend mode="screen" in="grain" in2="tint"/>
  `,e)}i(y,"nightVision");export{y as default,o as id,v as name,u as vars};
