import{a as o,h as i}from"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{a as s}from"./template-CbX1Mzd8.js";import"https://esm.sh/jsr/@pulgasari/logger";class p extends o{static attr={label:String,page:Number,src:String};static styles=`media-pdf {
    display: block;

    > iframe {
      aspect-ratio : var(--pdf-ratio, 1 / 1.414);
      border       : 0;
      display      : block;
      inline-size  : 100%;
    }

    > a { display: inline-block; font-size: 0.85em; padding-block-start: --space(tiny); }
  }`;render(){const{label:l,page:e,src:t}=this.getAttr();if(!t)return i``;const a=l??decodeURIComponent(t.split(/[?#]/)[0].split("/").pop()),r=e?`${t.split("#")[0]}#page=${e}`:t;return i`
      <iframe ...${s({src:r,title:a})}></iframe>
      <a ...${s({href:r,rel:"noopener",target:"_blank"})}>${a}</a>
    `}}p.init("media-pdf");export{p as default};
