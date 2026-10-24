import{a as c}from"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{iconUrl as g}from"./svg-icon-CmK-OipF.js";import"https://esm.sh/jsr/@pulgasari/logger";const f={"4x3":{ratio:"4 / 3",set:"flagpack"},circle:{ratio:"1",set:"circle-flags"},square:{ratio:"4 / 3",set:"flagpack"}};let r=null;const p=t=>{try{return r??=new Intl.DisplayNames([document.documentElement.lang||navigator.language],{type:"region"}),r.of(t.toUpperCase())}catch{return t.toUpperCase()}};class u extends c{static internals={role:"img"};static reflect=["variant"];static attr={code:"de",label:String,variant:{type:String,default:"circle",values:["circle","square","4x3"]}};static styles=`svg-flag {
    aspect-ratio   : var(--flag-ratio, 1);
    background     : var(--flag-url, none) center / contain no-repeat;
    display        : inline-block;
    flex           : none;
    inline-size    : var(--flag-size, 1.25em);
    vertical-align : var(--flag-align, -0.15em);
  }`;sync(){const{code:i,label:l,variant:n}=this.getAttr(),{ratio:s,set:o}=f[n],a=String(i).toLowerCase(),e=g(`${o}:${a}`);this.setVar({"--flag-ratio":s,"--flag-url":e&&`url("${e}")`}),this.internals&&(this.internals.ariaLabel=l||p(a))}}u.init("svg-flag");export{u as default};
