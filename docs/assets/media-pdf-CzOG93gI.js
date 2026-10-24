var p=Object.defineProperty;var f=(r,t,e)=>t in r?p(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var m=(r,t)=>p(r,"name",{value:t,configurable:!0});var s=(r,t,e)=>f(r,typeof t!="symbol"?t+"":t,e);import{a as g,h as c}from"./index-CJDrpzke.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{a as b}from"./template-BbaYBheU.js";import"https://esm.sh/jsr/@pulgasari/logger";const a=class a extends g{render(){const{label:t,page:e,src:i}=this.getAttr();if(!i)return c``;const o=t??decodeURIComponent(i.split(/[?#]/)[0].split("/").pop()),n=e?`${i.split("#")[0]}#page=${e}`:i;return c`
      <iframe ...${b({src:n,title:o})}></iframe>
      <a ...${b({href:n,rel:"noopener",target:"_blank"})}>${o}</a>
    `}};m(a,"MediaPdf"),s(a,"attr",{label:String,page:Number,src:String}),s(a,"styles",`media-pdf {
    display: block;

    > iframe {
      aspect-ratio : var(--pdf-ratio, 1 / 1.414);
      border       : 0;
      display      : block;
      inline-size  : 100%;
    }

    > a { display: inline-block; font-size: 0.85em; padding-block-start: --space(tiny); }
  }`);let l=a;l.init();export{l as default};
