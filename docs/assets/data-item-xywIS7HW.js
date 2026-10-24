var a=Object.defineProperty;var l=(e,i,r)=>i in e?a(e,i,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[i]=r;var n=(e,i)=>a(e,"name",{value:i,configurable:!0});var s=(e,i,r)=>l(e,typeof i!="symbol"?i+"":i,r);import{a as p}from"./index-BcM9qEFI.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{r as h,p as u}from"./itemLook-Brs9pRRz.js";import"https://esm.sh/jsr/@pulgasari/logger";const t=class t extends p{render(){return null}sync(){const{intrinsicSize:i,look:r,shape:c}=this.getAttr();this.setVar({"--item-current-shape":h(c||u(r).shape),"--item-intrinsic-size":i})}};n(t,"DataItem"),s(t,"attr",{eager:Boolean,intrinsicSize:String,look:String,shape:String}),s(t,"styles",`data-item {
    border-radius : var(--item-current-shape, var(--item-shape, 0px));
    box-sizing    : border-box;
    display       : block;
    overflow      : hidden;

    content-visibility           : auto;
    contain-intrinsic-block-size : auto var(--item-intrinsic-size, var(--item-size, 200px));

    transition-behavior : allow-discrete;

    &:is([shape="circle"], [shape="square"], [look~="circle"], [look~="square"]) { aspect-ratio: 1 / 1; }

    &[eager] { content-visibility: visible; }
  }`);let o=t;o.init();export{o as default};
