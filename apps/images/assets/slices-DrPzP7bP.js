var u=Object.defineProperty;var a=(e,t)=>u(e,"name",{value:t,configurable:!0});import{r as s,f as c,a as l}from"./app.rat-g-WvrVtz.js";import"./index-BkWpdP5P.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";const o="slices",v="Slices",n={animate:{type:"boolean",default:!1},amount:{type:"number",default:20,min:0,max:80,step:1},count:{type:"number",default:8,min:2,max:40,step:1,bake:!0},speed:{type:"duration",default:"0.5s",bake:!0}};function x(e={}){const t=s(n,e),r=(Number(e.count??n.count.default)*.012).toFixed(4);return c(o,`
    <feTurbulence type="turbulence" baseFrequency="0.00001 ${r}" numOctaves="1" seed="2" result="noise">
      ${l(e,{attributeName:"seed",values:"0;4;8;12",dur:t.speed,calcMode:"discrete"})}
    </feTurbulence>
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="${t.amount}" xChannelSelector="R" yChannelSelector="A"/>
  `,e)}a(x,"slices");export{x as default,o as id,v as name,n as vars};
