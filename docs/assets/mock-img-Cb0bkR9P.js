var h=Object.defineProperty;var s=(o,e)=>h(o,"name",{value:e,configurable:!0});import{a as l}from"./index-BGz7flLd.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const u="https://picsum.photos";let d=0;class g extends l{static{s(this,"MockImg")}static attr={alt:String,blurred:0,grayscale:Boolean,height:300,seed:String,width:400};static styles=`mock-img {
    background  : color-mix(in oklch, currentColor 10%, transparent);
    display     : inline-block;
    line-height : 0;

    img {
      block-size      : auto;
      max-inline-size : 100%;
    }
  }`;constructor(){super(),this.index=++d}url(){const{blurred:e,grayscale:r,height:n,seed:t,width:a}=this.getAttr(),i=[];r&&i.push("grayscale"),e&&i.push(`blur=${Math.min(10,Math.max(1,Math.round(e)))}`),t||i.push(`random=${this.index}`);const c=t?`/seed/${encodeURIComponent(t)}`:"";return`${u}${c}/${a}/${n}${i.length?`?${i.join("&")}`:""}`}render(){const{alt:e,height:r,width:n}=this.getAttr(),t=document.createElement("img");return t.alt=e??"",t.decoding="async",t.height=r,t.loading="lazy",t.src=this.url(),t.width=n,t.outerHTML}}g.init();export{g as default};
