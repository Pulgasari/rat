import{a as i}from"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{l as a}from"./svg-__0rw8ez.js";import"https://esm.sh/jsr/@pulgasari/logger";class r extends i{static attr={checker:Boolean,label:String,src:String};static styles=`media-svg {
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
  }`;async load(){const t=this.getAttr("src");if(!(!t||t===this._loaded)){this._loaded=t;try{const e=await a(t);if(this._loaded!==t)return;this.innerHTML=e??"",this.toggleAttribute("failed",!e)}catch(e){this.innerHTML="",this.setAttribute("failed",""),console.warn(`[media-svg] ${e.message}`)}}}sync(){const{label:t}=this.getAttr();this.internals&&(this.internals.role="img",this.internals.ariaLabel=t||decodeURIComponent(String(this.getAttr("src")??"").split("/").pop())),this.load()}}r.init("media-svg");export{r as default};
