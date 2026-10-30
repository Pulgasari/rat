var s=Object.defineProperty;var r=(e,a)=>s(e,"name",{value:a,configurable:!0});import{r as d,f,a as u}from"./app.rat-CUbL-LLd.js";import"./index-D3GmeVzN.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";const n="shake",k="Shake",m={animate:{type:"boolean",default:!0},amount:{type:"number",default:5,min:0,max:40,step:1,bake:!0},speed:{type:"duration",default:"0.4s",bake:!0}};function v(e={}){const a=d(m,e),t=Number(e.amount??m.amount.default);return f(n,`
    <feOffset dx="0" dy="0" in="SourceGraphic">
      ${u(e,{attributeName:"dx",values:`0; ${t}; -${t}; ${(t/2).toFixed(1)}; 0`,dur:a.speed})}
      ${u(e,{attributeName:"dy",values:`0; -${t}; ${t}; 0`,dur:a.speed})}
    </feOffset>
  `,e)}r(v,"shake");export{v as default,n as id,k as name,m as vars};
