import{a as r}from"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{r as a,p as s}from"./itemLook-r-ESJBFH.js";import"https://esm.sh/jsr/@pulgasari/logger";class o extends r{static attr={eager:Boolean,intrinsicSize:String,look:String,shape:String};static styles=`data-item {
    border-radius : var(--item-current-shape, var(--item-shape, 0px));
    box-sizing    : border-box;
    display       : block;
    overflow      : hidden;

    content-visibility           : auto;
    contain-intrinsic-block-size : auto var(--item-intrinsic-size, var(--item-size, 200px));

    transition-behavior : allow-discrete;

    &:is([shape="circle"], [shape="square"], [look~="circle"], [look~="square"]) { aspect-ratio: 1 / 1; }

    &[eager] { content-visibility: visible; }
  }`;render(){return null}sync(){const{intrinsicSize:i,look:e,shape:t}=this.getAttr();this.setVar({"--item-current-shape":a(t||s(e).shape),"--item-intrinsic-size":i})}}o.init("data-item");export{o as default};
