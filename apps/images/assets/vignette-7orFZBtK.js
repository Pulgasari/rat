var i=Object.defineProperty;var o=(t,e)=>i(t,"name",{value:e,configurable:!0});import{r as s,d as n,f as m}from"./app.rat-B6yojvoo.js";import"./index-O95SaApO.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";const f="vignette",v="Vignette",p={amount:{type:"number",default:.6,min:0,max:1,step:.05,bake:!0},size:{type:"number",default:.5,min:0,max:1,step:.05,bake:!0}};function w(t={}){const e=s(p,t),r=Math.round((1-Number(e.amount))*255).toString(16).padStart(2,"0"),a=n(`
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <radialGradient id="g" cx="50%" cy="50%" r="75%">
        <stop offset="${e.size}" stop-color="#ffffff"/>
        <stop offset="1" stop-color="#${r}${r}${r}"/>
      </radialGradient>
      <rect width="100" height="100" fill="url(#g)"/>
    </svg>
  `);return m(f,`
    <feImage href="${a}" preserveAspectRatio="none" result="mask"/>
    <feComposite in="SourceGraphic" in2="mask" operator="arithmetic" k1="1" k2="0" k3="0" k4="0"/>
  `,t)}o(w,"vignette");export{w as default,f as id,v as name,p as vars};
