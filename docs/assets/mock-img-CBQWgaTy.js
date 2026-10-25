var l=Object.defineProperty;var g=(r,t,i)=>t in r?l(r,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):r[t]=i;var c=(r,t)=>l(r,"name",{value:t,configurable:!0});var o=(r,t,i)=>g(r,typeof t!="symbol"?t+"":t,i);import{a as m}from"./index-HgPxnqYB.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const p="https://picsum.photos";let $=0;const s=class s extends m{constructor(){super(),this.index=++$}url(){const{blurred:t,grayscale:i,height:a,seed:e,width:u}=this.getAttr(),n=[];i&&n.push("grayscale"),t&&n.push(`blur=${Math.min(10,Math.max(1,Math.round(t)))}`),e||n.push(`random=${this.index}`);const d=e?`/seed/${encodeURIComponent(e)}`:"";return`${p}${d}/${u}/${a}${n.length?`?${n.join("&")}`:""}`}render(){const{alt:t,height:i,width:a}=this.getAttr(),e=document.createElement("img");return e.alt=t??"",e.decoding="async",e.height=i,e.loading="lazy",e.src=this.url(),e.width=a,e.outerHTML}};c(s,"MockImg"),o(s,"attr",{alt:String,blurred:0,grayscale:Boolean,height:300,seed:String,width:400}),o(s,"styles",`mock-img {
    background  : color-mix(in oklch, currentColor 10%, transparent);
    display     : inline-block;
    line-height : 0;

    img {
      block-size      : auto;
      max-inline-size : 100%;
    }
  }`);let h=s;h.init();export{h as default};
