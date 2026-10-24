import{a as n}from"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{localUrl as a}from"./svg-icon-CmK-OipF.js";import"https://esm.sh/jsr/@pulgasari/logger";const s="@aufbau/svg/logos/";class g extends n{static attr={color:String,label:String,logo:String,size:String};static styles=`svg-logo {
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
  }`;render(){return'<img alt="" draggable="false">'}sync(){const{color:t,label:o,logo:i,size:e}=this.getAttr(),r=this.querySelector("img"),l=i?a(s,i):null;this.setVar({"--logo-color":t,"--logo-size":e,"--logo-url":l&&`url("${l}")`}),this.internals&&(this.internals.role=o?"img":null,this.internals.ariaLabel=o||null,this.internals.ariaHidden=o?null:"true"),r&&(l?r.src=l:r.removeAttribute("src"))}}g.init("svg-logo");export{g as default};
