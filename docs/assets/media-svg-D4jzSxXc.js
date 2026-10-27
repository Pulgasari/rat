var r=Object.defineProperty;var a=(i,t)=>r(i,"name",{value:t,configurable:!0});import{a as s}from"./index-mP1PGphD.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{l as n}from"./svg-DwW1ho8X.js";import"https://esm.sh/jsr/@pulgasari/logger";class o extends s{static{a(this,"MediaSvg")}static attr={checker:Boolean,label:String,src:String};static styles=`media-svg {
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
  }`;async load(){const t=this.getAttr("src");if(!(!t||t===this._loaded)){this._loaded=t;try{const e=await n(t);if(this._loaded!==t)return;this.innerHTML=e??"",this.toggleAttribute("failed",!e)}catch(e){this.innerHTML="",this.setAttribute("failed",""),console.warn(`[media-svg] ${e.message}`)}}}sync(){const{label:t}=this.getAttr();this.internals&&(this.internals.role="img",this.internals.ariaLabel=t||decodeURIComponent(String(this.getAttr("src")??"").split("/").pop())),this.load()}}o.init();export{o as default};
