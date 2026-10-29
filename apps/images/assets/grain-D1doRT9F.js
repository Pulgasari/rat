var a=Object.defineProperty;var r=(t,e)=>a(t,"name",{value:e,configurable:!0});import{r as n,f as o}from"./app.rat-DakpQRL4.js";import"./index-oKSG3TSX.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";const i="grain",v="Grain",s={frequency:{type:"number",default:.8,min:0,max:2,step:.05},octaves:{type:"integer",default:2,min:1,max:5,step:1},opacity:{type:"number",default:.15,min:0,max:1,step:.01}};function d(t={}){const e=n(s,t);return o(i,`
    <feTurbulence type="fractalNoise" baseFrequency="${e.frequency}" numOctaves="${e.octaves}" stitchTiles="stitch" result="noise"/>
    <feColorMatrix in="noise" type="saturate" values="0"/>
    <feComponentTransfer>
      <feFuncA type="linear" slope="${e.opacity}"/>
    </feComponentTransfer>
    <feComposite operator="over" in2="SourceGraphic"/>
  `,t)}r(d,"grain");export{d as default,i as id,v as name,s as vars};
