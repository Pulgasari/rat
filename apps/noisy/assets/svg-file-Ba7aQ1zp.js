var a=Object.defineProperty;var s=(e,i)=>a(e,"name",{value:i,configurable:!0});import{a as l}from"./index-Ar8QsFaM.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{l as n}from"./svg-DwW1ho8X.js";import"https://esm.sh/jsr/@pulgasari/logger";class r extends l{static{s(this,"SvgFile")}static attr={label:String,size:String,src:String};static styles=`svg-file {
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
  }`;async load(){const i=this.getAttr("src");if(!(!i||i===this._loaded)){this._loaded=i;try{const t=await n(i);if(this._loaded!==i)return;this.innerHTML=t??"",this.removeAttribute("failed"),this.emit("svg-file",{src:i})}catch(t){this.innerHTML="",this.setAttribute("failed",""),console.warn(`[svg-file] ${t.message}`)}}}sync(){const{label:i,size:t}=this.getAttr();this.setVar({"--svg-size":t}),this.internals&&(this.internals.role=i?"img":null,this.internals.ariaLabel=i||null,this.internals.ariaHidden=i?null:"true"),this.load()}}r.init();export{r as default};
