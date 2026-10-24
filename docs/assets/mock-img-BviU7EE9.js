import{a}from"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const c="https://picsum.photos";let h=0;class l extends a{static attr={alt:String,blurred:0,grayscale:Boolean,height:300,seed:String,width:400};static styles=`mock-img {
    background  : color-mix(in oklch, currentColor 10%, transparent);
    display     : inline-block;
    line-height : 0;

    img {
      block-size      : auto;
      max-inline-size : 100%;
    }
  }`;constructor(){super(),this.index=++h}url(){const{blurred:i,grayscale:r,height:n,seed:t,width:o}=this.getAttr(),e=[];r&&e.push("grayscale"),i&&e.push(`blur=${Math.min(10,Math.max(1,Math.round(i)))}`),t||e.push(`random=${this.index}`);const s=t?`/seed/${encodeURIComponent(t)}`:"";return`${c}${s}/${o}/${n}${e.length?`?${e.join("&")}`:""}`}render(){const{alt:i,height:r,width:n}=this.getAttr(),t=document.createElement("img");return t.alt=i??"",t.decoding="async",t.height=r,t.loading="lazy",t.src=this.url(),t.width=n,t.outerHTML}}l.init("mock-img");export{l as default};
