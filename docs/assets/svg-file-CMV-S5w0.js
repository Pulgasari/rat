import{a as e}from"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{l as s}from"./svg-__0rw8ez.js";import"https://esm.sh/jsr/@pulgasari/logger";class l extends e{static attr={label:String,size:String,src:String};static styles=`svg-file {
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
  }`;async load(){const i=this.getAttr("src");if(!(!i||i===this._loaded)){this._loaded=i;try{const t=await s(i);if(this._loaded!==i)return;this.innerHTML=t??"",this.removeAttribute("failed"),this.emit("svg-file",{src:i})}catch(t){this.innerHTML="",this.setAttribute("failed",""),console.warn(`[svg-file] ${t.message}`)}}}sync(){const{label:i,size:t}=this.getAttr();this.setVar({"--svg-size":t}),this.internals&&(this.internals.role=i?"img":null,this.internals.ariaLabel=i||null,this.internals.ariaHidden=i?null:"true"),this.load()}}l.init("svg-file");export{l as default};
