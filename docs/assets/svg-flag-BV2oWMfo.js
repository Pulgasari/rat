var c=Object.defineProperty;var g=(e,t,r)=>t in e?c(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var n=(e,t)=>c(e,"name",{value:t,configurable:!0});var i=(e,t,r)=>g(e,typeof t!="symbol"?t+"":t,r);import{a as d}from"./index-Ce0Fc_FP.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{iconUrl as y}from"./svg-icon-EwbJDvQG.js";import"https://esm.sh/jsr/@pulgasari/logger";const b={"4x3":{ratio:"4 / 3",set:"flagpack"},circle:{ratio:"1",set:"circle-flags"},square:{ratio:"4 / 3",set:"flagpack"}};let f=null;const h=n(e=>{try{return f??=new Intl.DisplayNames([document.documentElement.lang||navigator.language],{type:"region"}),f.of(e.toUpperCase())}catch{return e.toUpperCase()}},"regionName"),a=class a extends d{sync(){const{code:t,label:r,variant:p}=this.getAttr(),{ratio:u,set:m}=b[p],s=String(t).toLowerCase(),o=y(`${m}:${s}`);this.setVar({"--flag-ratio":u,"--flag-url":o&&`url("${o}")`}),this.internals&&(this.internals.ariaLabel=r||h(s))}};n(a,"SvgFlag"),i(a,"internals",{role:"img"}),i(a,"reflect",["variant"]),i(a,"attr",{code:"de",label:String,variant:{type:String,default:"circle",values:["circle","square","4x3"]}}),i(a,"styles",`svg-flag {
    aspect-ratio   : var(--flag-ratio, 1);
    background     : var(--flag-url, none) center / contain no-repeat;
    display        : inline-block;
    flex           : none;
    inline-size    : var(--flag-size, 1.25em);
    vertical-align : var(--flag-align, -0.15em);
  }`);let l=a;l.init();export{l as default};
