var a=Object.defineProperty;var t=(e,i)=>a(e,"name",{value:i,configurable:!0});import{a as o}from"./index-iPtKaZWJ.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{r as n,p as c}from"./itemLook-Brs9pRRz.js";import"https://esm.sh/jsr/@pulgasari/logger";class l extends o{static{t(this,"DataItem")}static attr={eager:Boolean,intrinsicSize:String,look:String,shape:String};static styles=`data-item {
    border-radius : var(--item-current-shape, var(--item-shape, 0px));
    box-sizing    : border-box;
    display       : block;
    overflow      : hidden;

    content-visibility           : auto;
    contain-intrinsic-block-size : auto var(--item-intrinsic-size, var(--item-size, 200px));

    transition-behavior : allow-discrete;

    &:is([shape="circle"], [shape="square"], [look~="circle"], [look~="square"]) { aspect-ratio: 1 / 1; }

    &[eager] { content-visibility: visible; }
  }`;render(){return null}sync(){const{intrinsicSize:i,look:r,shape:s}=this.getAttr();this.setVar({"--item-current-shape":n(s||c(r).shape),"--item-intrinsic-size":i})}}l.init();export{l as default};
