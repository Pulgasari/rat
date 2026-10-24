import{a as r,h as t}from"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{a as n}from"./template-CbX1Mzd8.js";import"https://esm.sh/jsr/@pulgasari/logger";class l extends r{static attr={icon:String,label:String,size:String,src:String,viewbox:String};static styles=`svg-sprite {
    block-size     : var(--sprite-size, 1em);
    display        : inline-block;
    fill           : currentColor;
    flex           : none;
    inline-size    : var(--sprite-size, 1em);
    line-height    : 0;
    vertical-align : var(--sprite-align, -0.125em);

    > svg { block-size: 100%; inline-size: 100%; }

    &:not([icon]) { display: none; }
  }`;render(){const{icon:i,src:e,viewbox:s}=this.getAttr();return i?t`<svg aria-hidden="true" ...${n({viewBox:s})}><use href="${e??""}#${i}"></use></svg>`:t``}sync(){const{label:i,size:e}=this.getAttr();this.setVar({"--sprite-size":e}),this.internals&&(this.internals.role=i?"img":null,this.internals.ariaLabel=i||null,this.internals.ariaHidden=i?null:"true")}}l.init("svg-sprite");export{l as default};
