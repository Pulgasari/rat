var n=Object.defineProperty;var l=(i,t,e)=>t in i?n(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var o=(i,t)=>n(i,"name",{value:t,configurable:!0});var s=(i,t,e)=>l(i,typeof t!="symbol"?t+"":t,e);import{a as c}from"./index-Ce0Fc_FP.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{l as h}from"./svg-DwW1ho8X.js";import"https://esm.sh/jsr/@pulgasari/logger";const r=class r extends c{async load(){const t=this.getAttr("src");if(!(!t||t===this._loaded)){this._loaded=t;try{const e=await h(t);if(this._loaded!==t)return;this.innerHTML=e??"",this.toggleAttribute("failed",!e)}catch(e){this.innerHTML="",this.setAttribute("failed",""),console.warn(`[media-svg] ${e.message}`)}}}sync(){const{label:t}=this.getAttr();this.internals&&(this.internals.role="img",this.internals.ariaLabel=t||decodeURIComponent(String(this.getAttr("src")??"").split("/").pop())),this.load()}};o(r,"MediaSvg"),s(r,"attr",{checker:Boolean,label:String,src:String}),s(r,"styles",`media-svg {
    display    : block;
    text-align : center;

    > svg {
      block-size      : auto;
      max-block-size  : var(--media-svg-height, 80vh);
      max-inline-size : 100%;
    }

    &[checker] {
      background : repeating-conic-gradient(color-mix(in oklch, currentColor 12%, transparent) 0 25%, transparent 0 50%) 0 0 / 16px 16px;
    }

    &[failed]::before { content: 'not an svg'; opacity: 0.6; }
  }`);let a=r;a.init();export{a as default};
