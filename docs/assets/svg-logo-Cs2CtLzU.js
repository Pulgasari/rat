var s=Object.defineProperty;var n=(t,o)=>s(t,"name",{value:o,configurable:!0});import{a as g}from"./index-CvuAKKlM.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{localUrl as c}from"./svg-icon-CWDg_MnR.js";import"https://esm.sh/jsr/@pulgasari/logger";const u="@aufbau/svg/logos/";class m extends g{static{n(this,"SvgLogo")}static attr={color:String,label:String,logo:String,size:String};static styles=`svg-logo {
    background-color : var(--logo-color, currentColor);
    display          : inline-block;
    flex             : none;
    line-height      : 0;
    mask             : var(--logo-url, linear-gradient(transparent, transparent)) center / contain no-repeat;
    vertical-align   : var(--logo-align, middle);

    img {
      /*
      block-size  : var(--logo-size, 1.5em);
      inline-size : auto;
      */
      visibility  : hidden;
    }

    &:not([logo]) { display: none; }
  }`;render(){return'<img alt="" draggable="false">'}sync(){const{color:o,label:r,logo:e,size:a}=this.getAttr(),i=this.querySelector("img"),l=e?c(u,e):null;this.setVar({"--logo-color":o,"--logo-size":a,"--logo-url":l&&`url("${l}")`}),this.internals&&(this.internals.role=r?"img":null,this.internals.ariaLabel=r||null,this.internals.ariaHidden=r?null:"true"),i&&(l?i.src=l:i.removeAttribute("src"))}}m.init();export{m as default};
