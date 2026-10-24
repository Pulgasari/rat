import{a as i}from"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";class n extends i{static internals={ariaHidden:"true"};static reflect=["shape"];static attr={gap:{type:String,var:"--skeleton-gap"},line:{type:String,var:"--skeleton-line"},lines:{type:Number,default:1,var:"--skeleton-lines"},shape:{type:String,default:"text",values:["text","rect","circle"]},size:String};static styles=`aufbau-skeleton {
    --skeleton-width : 100%;

    display: block;

    &[shape="rect"]   { --skeleton-line: 6em; --skeleton-lines: 1; }
    &[shape="circle"] { --skeleton-line: 2.5em; --skeleton-lines: 1; --skeleton-radius: 50%; --skeleton-width: 2.5em; display: inline-block; }
  }`;onConnected(){this.setSkeleton(!0)}render(){return null}sync(){const[e,t=e]=String(this.getAttr("size")??"").split(/\s+/).filter(Boolean),s=this.getAttr("shape")!=="text";this.setVar({"--skeleton-width":e,"--skeleton-line":s?t:this.getAttr("line")})}}n.init("aufbau-skeleton");export{n as default};
