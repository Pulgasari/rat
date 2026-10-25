var r=Object.defineProperty;var o=(s,t,i)=>t in s?r(s,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):s[t]=i;var l=(s,t)=>r(s,"name",{value:t,configurable:!0});var a=(s,t,i)=>o(s,typeof t!="symbol"?t+"":t,i);import{a as d}from"./index-Ce0Fc_FP.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{l as h}from"./svg-DwW1ho8X.js";import"https://esm.sh/jsr/@pulgasari/logger";const e=class e extends d{async load(){const t=this.getAttr("src");if(!(!t||t===this._loaded)){this._loaded=t;try{const i=await h(t);if(this._loaded!==t)return;this.innerHTML=i??"",this.removeAttribute("failed"),this.emit("svg-file",{src:t})}catch(i){this.innerHTML="",this.setAttribute("failed",""),console.warn(`[svg-file] ${i.message}`)}}}sync(){const{label:t,size:i}=this.getAttr();this.setVar({"--svg-size":i}),this.internals&&(this.internals.role=t?"img":null,this.internals.ariaLabel=t||null,this.internals.ariaHidden=t?null:"true"),this.load()}};l(e,"SvgFile"),a(e,"attr",{label:String,size:String,src:String}),a(e,"styles",`svg-file {
    display        : inline-block;
    flex           : none;
    line-height    : 0;
    vertical-align : var(--svg-align, middle);

    > svg {
      block-size      : var(--svg-size, auto);
      inline-size     : auto;
      max-inline-size : 100%;
    }

    &:not([src]) { display: none; }
  }`);let n=e;n.init();export{n as default};
