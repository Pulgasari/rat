var g=Object.defineProperty;var e=(t,a)=>g(t,"name",{value:a,configurable:!0});import{a as f}from"./index-mP1PGphD.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{iconUrl as p}from"./svg-icon-CSjC2kdZ.js";import"https://esm.sh/jsr/@pulgasari/logger";const u={"4x3":{ratio:"4 / 3",set:"flagpack"},circle:{ratio:"1",set:"circle-flags"},square:{ratio:"4 / 3",set:"flagpack"}};let n=null;const m=e(t=>{try{return n??=new Intl.DisplayNames([document.documentElement.lang||navigator.language],{type:"region"}),n.of(t.toUpperCase())}catch{return t.toUpperCase()}},"regionName");class v extends f{static{e(this,"SvgFlag")}static internals={role:"img"};static reflect=["variant"];static attr={code:"de",label:String,variant:{type:String,default:"circle",values:["circle","square","4x3"]}};static styles=`svg-flag {
    aspect-ratio   : var(--flag-ratio, 1);
    background     : var(--flag-url, none) center / contain no-repeat;
    display        : inline-block;
    flex           : none;
    inline-size    : var(--flag-size, 1.25em);
    vertical-align : var(--flag-align, -0.15em);
  }`;sync(){const{code:a,label:l,variant:s}=this.getAttr(),{ratio:o,set:c}=u[s],r=String(a).toLowerCase(),i=p(`${c}:${r}`);this.setVar({"--flag-ratio":o,"--flag-url":i&&`url("${i}")`}),this.internals&&(this.internals.ariaLabel=l||m(r))}}v.init();export{v as default};
