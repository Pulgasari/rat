var c=Object.defineProperty;var m=(i,l,r)=>l in i?c(i,l,{enumerable:!0,configurable:!0,writable:!0,value:r}):i[l]=r;var g=(i,l)=>c(i,"name",{value:l,configurable:!0});var o=(i,l,r)=>m(i,typeof l!="symbol"?l+"":l,r);import{a as d}from"./index-HgPxnqYB.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{localUrl as b}from"./svg-icon-Djk4Scb_.js";import"https://esm.sh/jsr/@pulgasari/logger";const p="@aufbau/svg/logos/",t=class t extends d{render(){return'<img alt="" draggable="false">'}sync(){const{color:l,label:r,logo:s,size:u}=this.getAttr(),n=this.querySelector("img"),e=s?b(p,s):null;this.setVar({"--logo-color":l,"--logo-size":u,"--logo-url":e&&`url("${e}")`}),this.internals&&(this.internals.role=r?"img":null,this.internals.ariaLabel=r||null,this.internals.ariaHidden=r?null:"true"),n&&(e?n.src=e:n.removeAttribute("src"))}};g(t,"SvgLogo"),o(t,"attr",{color:String,label:String,logo:String,size:String}),o(t,"styles",`svg-logo {
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
  }`);let a=t;a.init();export{a as default};
