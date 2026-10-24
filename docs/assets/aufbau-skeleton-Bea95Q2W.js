var r=Object.defineProperty;var c=(t,e,i)=>e in t?r(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var a=(t,e)=>r(t,"name",{value:e,configurable:!0});var n=(t,e,i)=>c(t,typeof e!="symbol"?e+"":e,i);import{a as p}from"./index-CfkG_3cO.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const s=class s extends p{onConnected(){this.setSkeleton(!0)}render(){return null}sync(){const[e,i=e]=String(this.getAttr("size")??"").split(/\s+/).filter(Boolean),o=this.getAttr("shape")!=="text";this.setVar({"--skeleton-width":e,"--skeleton-line":o?i:this.getAttr("line")})}};a(s,"AufbauSkeleton"),n(s,"internals",{ariaHidden:"true"}),n(s,"reflect",["shape"]),n(s,"attr",{gap:{type:String,var:"--skeleton-gap"},line:{type:String,var:"--skeleton-line"},lines:{type:Number,default:1,var:"--skeleton-lines"},shape:{type:String,default:"text",values:["text","rect","circle"]},size:String}),n(s,"styles",`aufbau-skeleton {
    --skeleton-width : 100%;

    display: block;

    &[shape="rect"]   { --skeleton-line: 6em; --skeleton-lines: 1; }
    &[shape="circle"] { --skeleton-line: 2.5em; --skeleton-lines: 1; --skeleton-radius: 50%; --skeleton-width: 2.5em; display: inline-block; }
  }`);let l=s;l.init();export{l as default};
