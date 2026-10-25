var l=Object.defineProperty;var h=(t,i,e)=>i in t?l(t,i,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[i]=e;var a=(t,i)=>l(t,"name",{value:i,configurable:!0});var n=(t,i,e)=>h(t,typeof i!="symbol"?i+"":i,e);import{a as m,h as o}from"./index-HgPxnqYB.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{a as u}from"./template-DPs-zPIM.js";import"https://esm.sh/jsr/@pulgasari/logger";const s=class s extends m{render(){const{icon:i,src:e,viewbox:c}=this.getAttr();return i?o`<svg aria-hidden="true" ...${u({viewBox:c})}><use href="${e??""}#${i}"></use></svg>`:o``}sync(){const{label:i,size:e}=this.getAttr();this.setVar({"--sprite-size":e}),this.internals&&(this.internals.role=i?"img":null,this.internals.ariaLabel=i||null,this.internals.ariaHidden=i?null:"true")}};a(s,"SvgSprite"),n(s,"attr",{icon:String,label:String,size:String,src:String,viewbox:String}),n(s,"styles",`svg-sprite {
    block-size     : var(--sprite-size, 1em);
    display        : inline-block;
    fill           : currentColor;
    flex           : none;
    inline-size    : var(--sprite-size, 1em);
    line-height    : 0;
    vertical-align : var(--sprite-align, -0.125em);

    > svg { block-size: 100%; inline-size: 100%; }

    &:not([icon]) { display: none; }
  }`);let r=s;r.init();export{r as default};
