var p=Object.defineProperty;var l=(a,e)=>p(a,"name",{value:e,configurable:!0});import{a as m,h as o}from"./index-DvOBEVLS.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{a as n}from"./template-DXo9HCdj.js";import"https://esm.sh/jsr/@pulgasari/logger";class c extends m{static{l(this,"MediaPdf")}static attr={label:String,page:Number,src:String};static styles=`media-pdf {
    display: block;

    > iframe {
      aspect-ratio : var(--pdf-ratio, 1 / 1.414);
      border       : 0;
      display      : block;
      inline-size  : 100%;
    }

    > a { display: inline-block; font-size: 0.85em; padding-block-start: --space(tiny); }
  }`;render(){const{label:e,page:r,src:t}=this.getAttr();if(!t)return o``;const i=e??decodeURIComponent(t.split(/[?#]/)[0].split("/").pop()),s=r?`${t.split("#")[0]}#page=${r}`:t;return o`
      <iframe ...${n({src:s,title:i})}></iframe>
      <a ...${n({href:s,rel:"noopener",target:"_blank"})}>${i}</a>
    `}}c.init();export{c as default};
